import { createClient } from './client'
import type { DbInvoice, DbInvoiceItem, DbCustomer, Invoice, DashboardStats } from '@/lib/types'
import { dbInvoiceToInvoice } from '@/lib/types'

const supabase = createClient()

export async function fetchInvoices(): Promise<Invoice[]> {
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !invoices) return []

  // Fetch all items for these invoices
  const invoiceIds = invoices.map((i: DbInvoice) => i.id)
  const { data: items } = await supabase
    .from('invoice_items')
    .select('*')
    .in('invoice_id', invoiceIds)
    .order('sort_order', { ascending: true })

  const itemsByInvoice = (items ?? []).reduce(
    (acc: Record<string, DbInvoiceItem[]>, item: DbInvoiceItem) => {
      if (!acc[item.invoice_id]) acc[item.invoice_id] = []
      acc[item.invoice_id].push(item)
      return acc
    },
    {}
  )

  return invoices.map((inv: DbInvoice) =>
    dbInvoiceToInvoice(inv, itemsByInvoice[inv.id] ?? [])
  )
}

export async function fetchInvoiceById(id: string): Promise<Invoice | null> {
  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !invoice) return null

  const { data: items } = await supabase
    .from('invoice_items')
    .select('*')
    .eq('invoice_id', id)
    .order('sort_order', { ascending: true })

  return dbInvoiceToInvoice(invoice as DbInvoice, (items ?? []) as DbInvoiceItem[])
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const invoices = await fetchInvoices()

  const paid = invoices.filter((i) => i.status === 'paid')
  const unpaid = invoices.filter((i) => i.status !== 'paid')
  const totalRevenue = paid.reduce((sum, i) => sum + i.total, 0)
  const unpaidTotal = unpaid.reduce((sum, i) => sum + i.total, 0)

  // Calculate avg payment days from paid invoices
  let avgPaymentDays = 0
  if (paid.length > 0) {
    const totalDays = paid.reduce((sum, inv) => {
      if (inv.paidAt) {
        const created = new Date(inv.createdAt).getTime()
        const paidAt = new Date(inv.paidAt).getTime()
        return sum + (paidAt - created) / 86400000
      }
      return sum
    }, 0)
    avgPaymentDays = Math.round((totalDays / paid.length) * 10) / 10
  }

  return {
    totalRevenue,
    unpaidTotal,
    invoiceCount: invoices.length,
    paidCount: paid.length,
    avgJobSize: paid.length > 0 ? totalRevenue / paid.length : 0,
    avgPaymentDays,
  }
}

export async function fetchCustomers(): Promise<DbCustomer[]> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(10)

  if (error || !data) return []
  return data as DbCustomer[]
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
