'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { DEMO_INVOICES } from '@/lib/demo-data'
import { useState } from 'react'

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
  const [copied, setCopied] = useState(false)

  // Handle demo invoice or a new demo
  const invoice =
    params.id === 'new-demo'
      ? {
          id: 'new-demo',
          invoiceNumber: 'PP-007',
          status: 'unpaid' as const,
          customerName: 'Demo Customer',
          customerEmail: 'demo@email.com',
          customerPhone: '(555) 000-0000',
          serviceType: 'Drain Cleaning',
          lineItems: [
            { id: '1', description: 'Drain snake / augering', quantity: 1, unitPrice: 150 },
            { id: '2', description: 'Service call fee', quantity: 1, unitPrice: 75 },
          ],
          subtotal: 225,
          tax: 18,
          total: 243,
          notes: 'Demo invoice created from Quick Invoice flow.',
          createdAt: new Date().toISOString(),
          paidAt: null,
          dueDate: new Date(Date.now() + 14 * 86400000).toISOString(),
          userId: 'demo',
        }
      : DEMO_INVOICES.find((i) => i.id === params.id)

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h1 className="text-xl font-bold text-[#1e3a5f] mb-2">Invoice not found</h1>
          <Link href="/dashboard" className="text-[#2563eb] font-medium">
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

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-brand-gradient">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-white">
            <span>←</span>
            <span className="font-medium">Back</span>
          </Link>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status.badge}`}>
            {status.icon} {status.label}
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Invoice header */}
        <div className="card mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🔧</span>
                <span className="font-bold text-[#1e3a5f] text-lg">PlumberPay</span>
              </div>
              <div className="text-xs text-gray-400">Professional Plumbing Services</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-[#1e3a5f] text-lg">{invoice.invoiceNumber}</div>
              <div className="text-xs text-gray-400">{formatDate(invoice.createdAt)}</div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="text-xs text-gray-400 font-medium mb-1">BILL TO</div>
            <div className="font-semibold text-[#1e3a5f]">{invoice.customerName}</div>
            {invoice.customerEmail && (
              <div className="text-sm text-gray-500">{invoice.customerEmail}</div>
            )}
            {invoice.customerPhone && (
              <div className="text-sm text-gray-500">{invoice.customerPhone}</div>
            )}
          </div>
        </div>

        {/* Service & Line Items */}
        <div className="card mb-4">
          <div className="text-xs text-gray-400 font-medium mb-3">
            SERVICE: {invoice.serviceType.toUpperCase()}
          </div>

          <div className="space-y-3">
            {invoice.lineItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#1e3a5f]">{item.description}</div>
                  <div className="text-xs text-gray-400">
                    {item.quantity} × {formatCurrency(item.unitPrice)}
                  </div>
                </div>
                <div className="font-semibold text-sm text-[#1e3a5f] ml-3">
                  {formatCurrency(item.quantity * item.unitPrice)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Subtotal</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Tax</span>
              <span>{formatCurrency(invoice.tax)}</span>
            </div>
            <div className="flex justify-between items-baseline border-t pt-2">
              <span className="font-bold text-[#1e3a5f]">Total Due</span>
              <span className="font-extrabold text-2xl text-[#1e3a5f]">
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="card mb-4">
            <div className="text-xs text-gray-400 font-medium mb-2">NOTES</div>
            <p className="text-sm text-gray-600">{invoice.notes}</p>
          </div>
        )}

        {/* Payment info */}
        <div className="card mb-6">
          <div className="text-xs text-gray-400 font-medium mb-2">PAYMENT DETAILS</div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Due Date</span>
            <span className="font-medium">{formatDate(invoice.dueDate)}</span>
          </div>
          {invoice.paidAt && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Paid On</span>
              <span className="font-medium text-[#10b981]">{formatDate(invoice.paidAt)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        {invoice.status !== 'paid' && (
          <div className="space-y-3">
            <button className="btn-touch btn-primary w-full text-lg py-4 shadow-md">
              💳 Pay Now — {formatCurrency(invoice.total)}
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
          <div className="text-center py-6">
            <div className="text-4xl mb-2">✅</div>
            <div className="font-bold text-[#10b981] text-lg">Payment Received</div>
            <div className="text-sm text-gray-500">Thank you for your prompt payment!</div>
          </div>
        )}
      </div>
    </div>
  )
}
