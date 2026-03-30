'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchInvoices, fetchDashboardStats } from '@/lib/supabase/queries'
import { DEMO_INVOICES, getDemoStats } from '@/lib/demo-data'
import type { Invoice, DashboardStats } from '@/lib/types'

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
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [fetchedInvoices, fetchedStats] = await Promise.all([
          fetchInvoices(),
          fetchDashboardStats(),
        ])
        if (fetchedInvoices.length > 0) {
          setInvoices(fetchedInvoices)
          setStats(fetchedStats)
        } else {
          // Fallback to demo data if no invoices in DB
          setInvoices(DEMO_INVOICES)
          setStats(getDemoStats())
        }
      } catch {
        setInvoices(DEMO_INVOICES)
        setStats(getDemoStats())
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const unpaidInvoices = invoices.filter((i) => i.status !== 'paid')
  const paidInvoices = invoices.filter((i) => i.status === 'paid')

  const greeting =
    new Date().getHours() < 12
      ? 'Good morning'
      : new Date().getHours() < 17
        ? 'Good afternoon'
        : 'Good evening'

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#1e293b] rounded-lg w-48" />
          <div className="h-14 bg-[#1e293b] rounded-xl" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-[#1e293b] rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          {greeting}! 👋
        </h1>
        <p className="text-[#94a3b8] text-sm">Here&apos;s your business at a glance</p>
      </div>

      {/* Quick action */}
      <Link
        href="/dashboard/new"
        className="btn-touch btn-primary w-full text-lg mb-6 py-5 shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-transform"
      >
        <span className="text-2xl mr-2">➕</span> New Invoice
      </Link>

      {/* Stats cards */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="card">
            <div className="text-xs text-[#64748b] font-medium mb-1">Revenue</div>
            <div className="text-xl font-bold text-[#10b981]">{formatCurrency(stats.totalRevenue)}</div>
          </div>
          <div className="card">
            <div className="text-xs text-[#64748b] font-medium mb-1">Unpaid</div>
            <div className="text-xl font-bold text-[#f59e0b]">{formatCurrency(stats.unpaidTotal)}</div>
          </div>
          <div className="card">
            <div className="text-xs text-[#64748b] font-medium mb-1">Invoices</div>
            <div className="text-xl font-bold text-white">{stats.invoiceCount}</div>
          </div>
          <div className="card">
            <div className="text-xs text-[#64748b] font-medium mb-1">Avg. Job</div>
            <div className="text-xl font-bold text-white">{formatCurrency(stats.avgJobSize)}</div>
          </div>
        </div>
      )}

      {/* Unpaid invoices */}
      {unpaidInvoices.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            Needs Attention ({unpaidInvoices.length})
          </h2>
          <div className="space-y-3">
            {unpaidInvoices.map((invoice) => (
              <Link
                key={invoice.id}
                href={`/invoice/${invoice.id}`}
                className="card block hover:border-[#3b82f6]/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white truncate">
                        {invoice.customerName}
                      </span>
                      <StatusBadge status={invoice.status} />
                    </div>
                    <div className="text-sm text-[#64748b]">
                      {invoice.serviceType} · {invoice.invoiceNumber}
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <div className="font-bold text-white">
                      {formatCurrency(invoice.total)}
                    </div>
                    <div className="text-xs text-[#64748b]">
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
          <h2 className="text-lg font-bold text-white mb-3">
            Recently Paid ({paidInvoices.length})
          </h2>
          <div className="space-y-3">
            {paidInvoices.map((invoice) => (
              <Link
                key={invoice.id}
                href={`/invoice/${invoice.id}`}
                className="card block hover:border-[#3b82f6]/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white truncate">
                        {invoice.customerName}
                      </span>
                      <StatusBadge status={invoice.status} />
                    </div>
                    <div className="text-sm text-[#64748b]">
                      {invoice.serviceType} · {invoice.invoiceNumber}
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <div className="font-bold text-[#10b981]">
                      {formatCurrency(invoice.total)}
                    </div>
                    <div className="text-xs text-[#64748b]">
                      Paid {invoice.paidAt ? formatDate(invoice.paidAt) : ''}
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
