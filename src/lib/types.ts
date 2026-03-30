// Database row types (snake_case matching Supabase)
export interface DbProfile {
  id: string
  email: string | null
  full_name: string | null
  company_name: string | null
  phone: string | null
  address: string | null
  created_at: string
  updated_at: string
}

export interface DbCustomer {
  id: string
  user_id: string
  name: string
  phone: string | null
  email: string | null
  address: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface DbInvoice {
  id: string
  user_id: string
  customer_id: string | null
  invoice_number: string
  status: 'unpaid' | 'paid' | 'overdue'
  subtotal: number
  tax_rate: number
  tax_amount: number
  total: number
  due_date: string
  paid_date: string | null
  notes: string | null
  service_type: string | null
  customer_name: string
  customer_email: string | null
  customer_phone: string | null
  created_at: string
  updated_at: string
}

export interface DbInvoiceItem {
  id: string
  invoice_id: string
  description: string
  quantity: number
  unit_price: number
  total: number
  sort_order: number
  created_at: string
}

// App-level types (used in components)
export interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  status: 'unpaid' | 'paid' | 'overdue'
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceType: string
  lineItems: LineItem[]
  subtotal: number
  tax: number
  total: number
  notes: string
  createdAt: string
  paidAt: string | null
  dueDate: string
  userId: string
}

export interface ServiceType {
  id: string
  name: string
  icon: string
  defaultItems: { description: string; unitPrice: number }[]
}

export interface DashboardStats {
  totalRevenue: number
  unpaidTotal: number
  invoiceCount: number
  paidCount: number
  avgJobSize: number
  avgPaymentDays: number
}

// Convert DB row to app-level Invoice
export function dbInvoiceToInvoice(
  row: DbInvoice,
  items: DbInvoiceItem[]
): Invoice {
  return {
    id: row.id,
    invoiceNumber: row.invoice_number,
    status: row.status,
    customerName: row.customer_name,
    customerEmail: row.customer_email ?? '',
    customerPhone: row.customer_phone ?? '',
    serviceType: row.service_type ?? '',
    lineItems: items
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((item) => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unit_price,
      })),
    subtotal: Number(row.subtotal),
    tax: Number(row.tax_amount),
    total: Number(row.total),
    notes: row.notes ?? '',
    createdAt: row.created_at,
    paidAt: row.paid_date,
    dueDate: row.due_date,
    userId: row.user_id,
  }
}
