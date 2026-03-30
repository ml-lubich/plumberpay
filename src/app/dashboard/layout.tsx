'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/lib/actions'

const navItems = [
  { href: '/dashboard', label: 'Home', icon: '🏠' },
  { href: '/dashboard/new', label: 'New Invoice', icon: '➕' },
  { href: '/dashboard/stats', label: 'Stats', icon: '📊' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]">
      {/* Top bar */}
      <header className="bg-[#1e293b] border-b border-[#334155] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3b82f6]/20 rounded-lg flex items-center justify-center text-sm">
              🔧
            </div>
            <span className="text-white font-bold">PlumberPay</span>
          </Link>
          <button
            onClick={() => signOut()}
            className="text-[#94a3b8] hover:text-white text-sm font-medium transition"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pb-24">
        {children}
      </main>

      {/* Bottom nav (mobile) */}
      <nav className="fixed bottom-0 inset-x-0 bg-[#1e293b] border-t border-[#334155] z-50 safe-area-bottom">
        <div className="max-w-md mx-auto flex justify-around py-2">
          {navItems.map((item) => {
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition min-w-[64px] ${
                  isActive
                    ? 'text-[#3b82f6]'
                    : 'text-[#64748b] hover:text-[#94a3b8]'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
