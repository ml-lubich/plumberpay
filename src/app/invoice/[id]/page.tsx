'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchInvoiceById } from '@/lib/supabase/queries'
import { updateInvoiceStatus } from '@/lib/actions'
import { DEMO_INVOICES } from '@/lib/demo-data'
import type { Invoice } from '@/lib/types'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function InvoiceViewPage() {
  const params = useParams()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [copied, setCopied] = useState(false)
  const [markingPaid, setMarkingPaid] = useState(false)

  useEffect(() => {
    async function load() {
      const id = params.id as string

      // Try fetching from Supabase first
      try {
        const fetched = await fetchInvoiceById(id)
        if (fetched) {
          setInvoice(fetched)
          setLoading(false)
          return
        }
      } catch {
        // Fall through to demo data
      }

      // Check demo data
      const demo = DEMO_INVOICES.find((i) => i.id === id)
      if (demo) {
        setInvoice(demo)
      } else {
        setNotFound(true)
      }
      setLoading(false)
    }
    load()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a]">
        <header className="bg-[#1e293b] border-b border-[#334155]">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="h-6 bg-[#334155] rounded w-24 animate-pulse" />
          </div>
        </header>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-[#1e293b] rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (notFound || !invoice) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h1 className="text-xl font-bold text-white mb-2">Invoice not found</h1>
          <Link href="/dashboard" className="text-[#3b82f6] font-medium hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const statusConfig = {
    paid: { badge: 'badge-paid', label: 'Paid', icon: '✅' },
    unpaid: { badge: 'badge-unpaid', label: 'Unpaid', icon: '⏳' },
    overdue: { badge: 'badge-overdue', label: 'Overdue', icon: '⚠️' },
  }

  const status = statusConfig[invoice.status]

  function handleCopyLink() {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleMarkPaid() {
    if (!invoice) return
    setMarkingPaid(true)
    try {
      const result = await updateInvoiceStatus(invoice.id, 'paid')
      if (!result.error) {
        setInvoice({ ...invoice, status: 'paid', paidAt: new Date().toISOString() })
      }
    } catch {
      // Silently fail for demo invoices
    } finally {
      setMarkingPaid(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Header */}
      <header className="bg-[#1e293b] border-b border-[#334155]">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-[#94a3b8] hover:text-white transition">
            <span>←</span>
            <span className="font-medium">Back</span>
          </Link>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status.badge}`}>
            {status.icon} {status.label}
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
        {/* Invoice header */}
        <div className="card mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🔧</span>
                <span className="font-bold text-white text-lg">PlumberPay</span>
              </div>
              <div className="text-xs text-[#64748b]">Professional Plumbing Services</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-white text-lg">{invoice.invoiceNumber}</div>
              <div className="text-xs text-[#64748b]">{formatDate(invoice.createdAt)}</div>
            </div>
          </div>

          <div className="border-t border-[#334155] pt-4">
            <div className="text-xs text-[#64748b] font-medium mb-1">BILL TO</div>
            <div className="font-semibold text-white">{invoice.customerName}</div>
            {invoice.customerEmail && (
              <div className="text-sm text-[#94a3b8]">{invoice.customerEmail}</div>
            )}
            {invoice.customerPhone && (
              <div className="text-sm text-[#94a3b8]">{invoice.customerPhone}</div>
            )}
          </div>
        </div>

        {/* Service & Line Items */}
        <div className="card mb-4">
          <div className="text-xs text-[#64748b] font-medium mb-3">
            SERVICE: {invoice.serviceType.toUpperCase()}
          </div>

          <div className="space-y-3">
            {invoice.lineItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{item.description}</div>
                  <div className="text-xs text-[#64748b]">
                    {item.quantity} x {formatCurrency(item.unitPrice)}
                  </div>
                </div>
                <div className="font-semibold text-sm text-white ml-3">
                  {formatCurrency(item.quantity * item.unitPrice)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#334155] mt-4 pt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#94a3b8]">Subtotal</span>
              <span className="text-white">{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#94a3b8]">Tax</span>
              <span className="text-white">{formatCurrency(invoice.tax)}</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-[#334155] pt-2">
              <span className="font-bold text-white">Total Due</span>
              <span className="font-extrabold text-2xl text-white">
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="card mb-4">
            <div className="text-xs text-[#64748b] font-medium mb-2">NOTES</div>
            <p className="text-sm text-[#94a3b8]">{invoice.notes}</p>
          </div>
        )}

        {/* Payment info */}
        <div className="card mb-6">
          <div className="text-xs text-[#64748b] font-medium mb-2">PAYMENT DETAILS</div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#94a3b8]">Due Date</span>
            <span className="font-medium text-white">{formatDate(invoice.dueDate)}</span>
          </div>
          {invoice.paidAt && (
            <div className="flex justify-between text-sm">
              <span className="text-[#94a3b8]">Paid On</span>
              <span className="font-medium text-[#10b981]">{formatDate(invoice.paidAt)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        {invoice.status !== 'paid' && (
          <div className="space-y-3">
            <button
              onClick={handleMarkPaid}
              disabled={markingPaid}
              className="btn-touch btn-primary w-full text-lg py-4 shadow-lg shadow-blue-500/25 disabled:opacity-50"
            >
              {markingPaid ? 'Processing...' : `💳 Mark Paid — ${formatCurrency(invoice.total)}`}
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopyLink}
                className="btn-touch btn-secondary"
              >
                {copied ? '✓ Copied!' : '🔗 Copy Link'}
              </button>
              <button className="btn-touch btn-secondary">
                📧 Send Reminder
              </button>
            </div>
          </div>
        )}

        {invoice.status === 'paid' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#10b981]/15 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">✅</div>
            <div className="font-bold text-[#10b981] text-xl mb-1">Payment Received</div>
            <div className="text-sm text-[#94a3b8]">Thank you for your prompt payment!</div>
            <div className="mt-4">
              <button
                onClick={handleCopyLink}
                className="btn-touch btn-secondary text-sm"
              >
                {copied ? '✓ Link Copied' : '🔗 Copy Invoice Link'}
              </button>
            </div>
          </div>
        )}

        {/* Footer watermark */}
        <div className="text-center py-6 mt-4">
          <div className="text-xs text-[#334155]">
            Powered by <span className="font-semibold">PlumberPay</span> — invoicing built for plumbers
          </div>
        </div>
      </div>
    </div>
  )
}
