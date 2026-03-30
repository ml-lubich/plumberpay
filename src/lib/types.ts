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
