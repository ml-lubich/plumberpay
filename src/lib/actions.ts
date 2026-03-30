'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { DbInvoice, DbInvoiceItem } from '@/lib/types'

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    throw new Error('Unauthorized')
  }
  return { supabase, user }
}

// ─── Invoice CRUD ───

export async function createInvoice(formData: {
  serviceType: string
  customerName: string
  customerEmail: string
  customerPhone: string
  notes: string
  lineItems: { description: string; quantity: number; unitPrice: number }[]
  taxRate: number
}): Promise<{ id: string } | { error: string }> {
  const { supabase, user } = await getAuthUser()

  const subtotal = formData.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  )
  const taxAmount = subtotal * formData.taxRate
  const total = subtotal + taxAmount
  const dueDate = new Date(Date.now() + 14 * 86400000).toISOString()

  // Get next invoice number
  const { data: invoiceNumData, error: rpcError } = await supabase.rpc(
    'get_next_invoice_number',
    { p_user_id: user.id }
  )

  if (rpcError) {
    return { error: 'Failed to generate invoice number: ' + rpcError.message }
  }

  const invoiceNumber = invoiceNumData as string

  // Insert invoice
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert({
      user_id: user.id,
      invoice_number: invoiceNumber,
      status: 'unpaid',
      service_type: formData.serviceType,
      customer_name: formData.customerName,
      customer_email: formData.customerEmail || null,
      customer_phone: formData.customerPhone || null,
      notes: formData.notes || null,
      subtotal,
      tax_rate: formData.taxRate,
      tax_amount: taxAmount,
      total,
      due_date: dueDate,
    } satisfies Partial<DbInvoice>)
    .select('id')
    .single()

  if (invoiceError || !invoice) {
    return { error: 'Failed to create invoice: ' + (invoiceError?.message ?? 'Unknown error') }
  }

  // Insert line items
  const items = formData.lineItems.map((item, index) => ({
    invoice_id: invoice.id,
    description: item.description,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    total: item.quantity * item.unitPrice,
    sort_order: index,
  } satisfies Partial<DbInvoiceItem>))

  const { error: itemsError } = await supabase
    .from('invoice_items')
    .insert(items)

  if (itemsError) {
    return { error: 'Failed to create line items: ' + itemsError.message }
  }

  // Also upsert customer for quick-pick
  if (formData.customerName.trim()) {
    await supabase
      .from('customers')
      .upsert(
        {
          user_id: user.id,
          name: formData.customerName,
          email: formData.customerEmail || null,
          phone: formData.customerPhone || null,
        },
        { onConflict: 'user_id,name', ignoreDuplicates: true }
      )
      .select()
  }

  revalidatePath('/dashboard')
  return { id: invoice.id }
}

export async function updateInvoiceStatus(
  invoiceId: string,
  status: 'unpaid' | 'paid' | 'overdue'
): Promise<{ error?: string }> {
  const { supabase } = await getAuthUser()

  const update: Partial<DbInvoice> = { status }
  if (status === 'paid') {
    update.paid_date = new Date().toISOString()
  }

  const { error } = await supabase
    .from('invoices')
    .update(update)
    .eq('id', invoiceId)

  if (error) {
    return { error: 'Failed to update invoice: ' + error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/invoice/${invoiceId}`)
  return {}
}

export async function deleteInvoice(invoiceId: string): Promise<{ error?: string }> {
  const { supabase } = await getAuthUser()

  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', invoiceId)

  if (error) {
    return { error: 'Failed to delete invoice: ' + error.message }
  }

  revalidatePath('/dashboard')
  return {}
}

// ─── Auth ───

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
