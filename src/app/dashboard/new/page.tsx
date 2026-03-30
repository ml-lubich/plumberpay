'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SERVICE_TYPES, TAX_RATE } from '@/lib/services'
import type { LineItem } from '@/lib/types'

function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

export default function NewInvoicePage() {
  const router = useRouter()
  const [step, setStep] = useState<'service' | 'items' | 'customer' | 'review'>('service')
  const [selectedService, setSelectedService] = useState('')
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [notes, setNotes] = useState('')

  const service = SERVICE_TYPES.find((s) => s.id === selectedService)

  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  function handleSelectService(serviceId: string) {
    const svc = SERVICE_TYPES.find((s) => s.id === serviceId)
    setSelectedService(serviceId)
    if (svc) {
      setLineItems(
        svc.defaultItems.map((item) => ({
          id: generateId(),
          description: item.description,
          quantity: 1,
          unitPrice: item.unitPrice,
        }))
      )
    }
    setStep('items')
  }

  function updateItem(id: string, field: keyof LineItem, value: string | number) {
    setLineItems((items) =>
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  function removeItem(id: string) {
    setLineItems((items) => items.filter((item) => item.id !== id))
  }

  function addCustomItem() {
    setLineItems((items) => [
      ...items,
      { id: generateId(), description: '', quantity: 1, unitPrice: 0 },
    ])
  }

  function handleCreateInvoice() {
    // In a real app, this would save to Supabase
    // For demo, just navigate to a sample invoice
    router.push('/invoice/new-demo')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        {(['service', 'items', 'customer', 'review'] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s
                  ? 'bg-[#2563eb] text-white'
                  : ['service', 'items', 'customer', 'review'].indexOf(step) > i
                    ? 'bg-[#10b981] text-white'
                    : 'bg-gray-200 text-gray-400'
              }`}
            >
              {['service', 'items', 'customer', 'review'].indexOf(step) > i ? '✓' : i + 1}
            </div>
            {i < 3 && (
              <div
                className={`flex-1 h-1 rounded ${
                  ['service', 'items', 'customer', 'review'].indexOf(step) > i
                    ? 'bg-[#10b981]'
                    : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Service */}
      {step === 'service' && (
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">What&apos;s the job?</h1>
          <p className="text-gray-500 text-sm mb-6">Tap the service — prices auto-fill</p>
          <div className="grid grid-cols-2 gap-3">
            {SERVICE_TYPES.map((svc) => (
              <button
                key={svc.id}
                onClick={() => handleSelectService(svc.id)}
                className="card hover:shadow-md hover:border-[#2563eb] border-2 border-transparent transition-all text-left active:scale-[0.97] min-h-[100px]"
              >
                <div className="text-4xl mb-2">{svc.icon}</div>
                <div className="font-bold text-[#1e3a5f]">{svc.name}</div>
                <div className="text-xs text-gray-400 mt-1">
                  from ${Math.min(...svc.defaultItems.map(i => i.unitPrice))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Line Items */}
      {step === 'items' && (
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">
            {service?.icon} {service?.name}
          </h1>
          <p className="text-gray-500 text-sm mb-6">Adjust quantities and prices. Remove what you don&apos;t need.</p>

          <div className="space-y-3 mb-4">
            {lineItems.map((item) => (
              <div key={item.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="input !p-2 !text-sm font-medium flex-1 mr-2"
                    placeholder="Description"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-300 hover:text-red-400 text-lg p-1 transition"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-400 block mb-1">Qty</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateItem(item.id, 'quantity', Math.max(1, item.quantity - 1))
                        }
                        className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.id, 'quantity', Math.max(1, parseInt(e.target.value) || 1))
                        }
                        className="input !p-2 !text-center w-16 text-sm"
                      />
                      <button
                        onClick={() => updateItem(item.id, 'quantity', item.quantity + 1)}
                        className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-400 block mb-1">Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)
                        }
                        className="input !p-2 !pl-7 text-sm"
                      />
                    </div>
                  </div>
                  <div className="text-right min-w-[70px]">
                    <label className="text-xs text-gray-400 block mb-1">Total</label>
                    <div className="font-semibold text-[#1e3a5f] text-sm pt-2">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addCustomItem}
            className="btn-touch btn-secondary w-full mb-6"
          >
            + Add Custom Item
          </button>

          {/* Totals */}
          <div className="card bg-gray-50 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
              <span className="font-medium">{formatCurrency(tax)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-bold text-[#1e3a5f]">Total</span>
              <span className="font-bold text-[#1e3a5f] text-xl">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep('service')} className="btn-touch btn-secondary flex-1">
              Back
            </button>
            <button
              onClick={() => setStep('customer')}
              disabled={lineItems.length === 0}
              className="btn-touch btn-primary flex-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Customer Info */}
      {step === 'customer' && (
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">Customer info</h1>
          <p className="text-gray-500 text-sm mb-4">Who is this invoice for?</p>

          {/* Quick-pick recent customers */}
          <div className="mb-4">
            <div className="text-xs text-gray-400 font-medium mb-2">RECENT CUSTOMERS</div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { name: 'Sarah Johnson', phone: '(555) 123-4567', email: 'sarah@email.com' },
                { name: 'Mike Torres', phone: '(555) 234-5678', email: 'mike.t@email.com' },
                { name: 'Linda Chen', phone: '(555) 345-6789', email: 'linda.chen@email.com' },
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setCustomerName(c.name)
                    setCustomerEmail(c.email)
                    setCustomerPhone(c.phone)
                  }}
                  className={`shrink-0 px-3 py-2 rounded-xl text-sm font-medium border-2 transition active:scale-[0.97] ${
                    customerName === c.name
                      ? 'border-[#2563eb] bg-blue-50 text-[#2563eb]'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {c.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
              <input
                type="text"
                className="input"
                placeholder="John Smith"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="input"
                placeholder="john@email.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                className="input"
                placeholder="(555) 123-4567"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea
                className="input min-h-[80px]"
                placeholder="Job details, special instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep('items')} className="btn-touch btn-secondary flex-1">
              Back
            </button>
            <button
              onClick={() => setStep('review')}
              disabled={!customerName.trim()}
              className="btn-touch btn-primary flex-1 disabled:opacity-50"
            >
              Review Invoice
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 'review' && (
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">Review & Send</h1>
          <p className="text-gray-500 text-sm mb-6">Make sure everything looks good</p>

          <div className="card mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#1e3a5f]">Customer</h3>
              <button
                onClick={() => setStep('customer')}
                className="text-[#2563eb] text-sm font-medium"
              >
                Edit
              </button>
            </div>
            <div className="text-sm">
              <div className="font-medium">{customerName}</div>
              {customerEmail && <div className="text-gray-500">{customerEmail}</div>}
              {customerPhone && <div className="text-gray-500">{customerPhone}</div>}
            </div>
          </div>

          <div className="card mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#1e3a5f]">
                {service?.icon} {service?.name}
              </h3>
              <button
                onClick={() => setStep('items')}
                className="text-[#2563eb] text-sm font-medium"
              >
                Edit
              </button>
            </div>
            <div className="space-y-2">
              {lineItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.description} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(item.quantity * item.unitPrice)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-[#1e3a5f]">
                <span>Total</span>
                <span className="text-xl">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {notes && (
            <div className="card mb-6">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Notes</h3>
              <p className="text-sm text-gray-600">{notes}</p>
            </div>
          )}

          <div className="flex gap-3 mb-4">
            <button onClick={() => setStep('customer')} className="btn-touch btn-secondary flex-1">
              Back
            </button>
            <button
              onClick={handleCreateInvoice}
              className="btn-touch btn-primary flex-1 shadow-md"
            >
              🚀 Send Invoice
            </button>
          </div>

          <p className="text-center text-xs text-gray-400">
            A shareable payment link will be generated
          </p>
        </div>
      )}
    </div>
  )
}
