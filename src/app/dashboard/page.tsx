'use client'

import Link from 'next/link'
import { DEMO_INVOICES, getDemoStats } from '@/lib/demo-data'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function StatusBadge({ status }: { status: string }) {
  const classes = {
    paid: 'badge-paid',
    unpaid: 'badge-unpaid',
    overdue: 'badge-overdue',
  }[status] || 'badge-unpaid'

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${classes}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function DashboardPage() {
  const stats = getDemoStats()
  const invoices = DEMO_INVOICES

  const unpaidInvoices = invoices.filter((i) => i.status !== 'paid')
  const paidInvoices = invoices.filter((i) => i.status === 'paid')

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Good morning! 👋</h1>
        <p className="text-gray-500 text-sm">Here&apos;s your business at a glance</p>
      </div>

      {/* Quick action */}
      <Link
        href="/dashboard/new"
        className="btn-touch btn-primary w-full text-lg mb-6 py-4 shadow-md"
      >
        ➕ New Invoice
      </Link>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="card">
          <div className="text-xs text-gray-400 font-medium mb-1">Revenue</div>
          <div className="text-xl font-bold text-[#10b981]">{formatCurrency(stats.totalRevenue)}</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-400 font-medium mb-1">Unpaid</div>
          <div className="text-xl font-bold text-[#f59e0b]">{formatCurrency(stats.unpaidTotal)}</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-400 font-medium mb-1">Invoices</div>
          <div className="text-xl font-bold text-[#1e3a5f]">{stats.invoiceCount}</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-400 font-medium mb-1">Avg. Job</div>
          <div className="text-xl font-bold text-[#1e3a5f]">{formatCurrency(stats.avgJobSize)}</div>
        </div>
      </div>

      {/* Unpaid invoices */}
      {unpaidInvoices.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#1e3a5f] mb-3">
            Needs Attention ({unpaidInvoices.length})
          </h2>
          <div className="space-y-3">
            {unpaidInvoices.map((invoice) => (
              <Link
                key={invoice.id}
                href={`/invoice/${invoice.id}`}
                className="card block hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[#1e3a5f] truncate">
                        {invoice.customerName}
                      </span>
                      <StatusBadge status={invoice.status} />
                    </div>
                    <div className="text-sm text-gray-400">
                      {invoice.serviceType} · {invoice.invoiceNumber}
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <div className="font-bold text-[#1e3a5f]">
                      {formatCurrency(invoice.total)}
                    </div>
                    <div className="text-xs text-gray-400">
                      Due {formatDate(invoice.dueDate)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Paid invoices */}
      {paidInvoices.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-[#1e3a5f] mb-3">
            Recently Paid ({paidInvoices.length})
          </h2>
          <div className="space-y-3">
            {paidInvoices.map((invoice) => (
              <Link
                key={invoice.id}
                href={`/invoice/${invoice.id}`}
                className="card block hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[#1e3a5f] truncate">
                        {invoice.customerName}
                      </span>
                      <StatusBadge status={invoice.status} />
                    </div>
                    <div className="text-sm text-gray-400">
                      {invoice.serviceType} · {invoice.invoiceNumber}
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <div className="font-bold text-[#10b981]">
                      {formatCurrency(invoice.total)}
                    </div>
                    <div className="text-xs text-gray-400">
                      Paid {formatDate(invoice.paidAt!)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
