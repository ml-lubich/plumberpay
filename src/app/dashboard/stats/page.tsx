'use client'

import { DEMO_INVOICES, getDemoStats } from '@/lib/demo-data'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export default function StatsPage() {
  const stats = getDemoStats()
  const invoices = DEMO_INVOICES

  // Revenue by service type
  const revenueByService: Record<string, number> = {}
  const countByService: Record<string, number> = {}
  invoices.forEach((inv) => {
    revenueByService[inv.serviceType] = (revenueByService[inv.serviceType] || 0) + inv.total
    countByService[inv.serviceType] = (countByService[inv.serviceType] || 0) + 1
  })

  const serviceStats = Object.entries(revenueByService)
    .map(([service, revenue]) => ({
      service,
      revenue,
      count: countByService[service],
    }))
    .sort((a, b) => b.revenue - a.revenue)

  const maxRevenue = Math.max(...serviceStats.map((s) => s.revenue))

  // Monthly breakdown (simulated)
  const monthlyData = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 5800 },
    { month: 'Mar', revenue: stats.totalRevenue },
  ]
  const maxMonthly = Math.max(...monthlyData.map((m) => m.revenue))

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">Business Stats</h1>
      <p className="text-gray-500 text-sm mb-6">Your performance at a glance</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="card">
          <div className="text-xs text-gray-400 font-medium mb-1">Total Revenue</div>
          <div className="text-2xl font-bold text-[#10b981]">{formatCurrency(stats.totalRevenue)}</div>
          <div className="text-xs text-[#10b981] mt-1">↑ 23% vs last month</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-400 font-medium mb-1">Outstanding</div>
          <div className="text-2xl font-bold text-[#f59e0b]">{formatCurrency(stats.unpaidTotal)}</div>
          <div className="text-xs text-gray-400 mt-1">{stats.invoiceCount - stats.paidCount} unpaid</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-400 font-medium mb-1">Avg. Job Size</div>
          <div className="text-2xl font-bold text-[#1e3a5f]">{formatCurrency(stats.avgJobSize)}</div>
          <div className="text-xs text-gray-400 mt-1">Per paid invoice</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-400 font-medium mb-1">Payment Speed</div>
          <div className="text-2xl font-bold text-[#2563eb]">{stats.avgPaymentDays} days</div>
          <div className="text-xs text-[#10b981] mt-1">↓ 0.5 days faster</div>
        </div>
      </div>

      {/* Monthly Revenue */}
      <div className="card mb-6">
        <h2 className="font-bold text-[#1e3a5f] mb-4">Monthly Revenue</h2>
        <div className="space-y-3">
          {monthlyData.map((m) => (
            <div key={m.month}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">{m.month} 2026</span>
                <span className="font-semibold text-[#1e3a5f]">{formatCurrency(m.revenue)}</span>
              </div>
              <div className="h-6 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa] rounded-lg transition-all duration-500"
                  style={{ width: `${(m.revenue / maxMonthly) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue by Service */}
      <div className="card mb-6">
        <h2 className="font-bold text-[#1e3a5f] mb-4">Revenue by Service</h2>
        <div className="space-y-3">
          {serviceStats.map((s) => (
            <div key={s.service}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">
                  {s.service}
                  <span className="text-gray-400 ml-1">({s.count} job{s.count > 1 ? 's' : ''})</span>
                </span>
                <span className="font-semibold text-[#1e3a5f]">{formatCurrency(s.revenue)}</span>
              </div>
              <div className="h-5 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] rounded-lg"
                  style={{ width: `${(s.revenue / maxRevenue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick insights */}
      <div className="card">
        <h2 className="font-bold text-[#1e3a5f] mb-3">Quick Insights</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-lg">💰</span>
            <div>
              <div className="font-medium text-[#1e3a5f]">Top earner: Water Heater</div>
              <div className="text-gray-500">Water heater jobs bring in the most revenue per invoice</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">⏱️</span>
            <div>
              <div className="font-medium text-[#1e3a5f]">Faster payments this month</div>
              <div className="text-gray-500">Average payment turnaround improved by 0.5 days</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">📈</span>
            <div>
              <div className="font-medium text-[#1e3a5f]">Revenue trending up</div>
              <div className="text-gray-500">23% increase compared to last month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
