import Link from 'next/link'

const features = [
  {
    icon: '⚡',
    title: 'Invoice in 30 Seconds',
    description: 'Pre-filled service types and prices. Tap, customize, send. No typing essays on your phone.',
  },
  {
    icon: '💸',
    title: 'Get Paid by Link',
    description: 'Generate a shareable payment link. Send it via text or email. Customers pay instantly.',
  },
  {
    icon: '📱',
    title: 'Built for the Field',
    description: 'Big buttons, minimal typing, works on any phone. Built by plumbers, for plumbers.',
  },
  {
    icon: '📊',
    title: 'Know Your Numbers',
    description: 'Track revenue, average job size, and payment turnaround. See what services make you the most.',
  },
  {
    icon: '🧾',
    title: 'Professional Invoices',
    description: 'Clean, branded invoices your customers trust. Line items, taxes, notes — all included.',
  },
  {
    icon: '🔔',
    title: 'Payment Reminders',
    description: 'Automatic nudges for unpaid invoices. Stop chasing payments, start doing jobs.',
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'For getting started',
    features: ['5 invoices per month', 'Payment links', 'Basic dashboard', 'Email support'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For busy plumbers',
    features: [
      'Unlimited invoices',
      'SMS + email sending',
      'Revenue analytics',
      'Custom branding',
      'Payment reminders',
      'Priority support',
    ],
    cta: 'Start 14-Day Trial',
    highlighted: true,
  },
  {
    name: 'Business',
    price: '$59',
    period: '/mo',
    description: 'For plumbing companies',
    features: [
      'Everything in Pro',
      'Team accounts (up to 10)',
      'Crew scheduling',
      'QuickBooks sync',
      'API access',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Nav */}
      <nav className="border-b border-[#1e293b]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#3b82f6]/20 rounded-xl flex items-center justify-center text-xl">
              🔧
            </div>
            <span className="text-white text-xl font-bold">PlumberPay</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-[#94a3b8] hover:text-white font-medium px-4 py-2 rounded-lg transition"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-[#3b82f6] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#2563eb] transition shadow-lg shadow-blue-500/20"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 via-transparent to-[#1e40af]/10" />
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 text-center relative z-10">
          <div className="inline-block bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full px-4 py-1.5 text-[#60a5fa] text-sm font-medium mb-6">
            Built for plumbers, not accountants
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Get Paid Faster.<br />
            <span className="text-[#3b82f6]">Invoice On-Site.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-10">
            Stop scribbling receipts and chasing payments. Create professional invoices
            in 30 seconds and get paid via link — right from the job site.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="btn-touch btn-primary text-lg px-8 py-4 shadow-lg shadow-blue-500/25"
            >
              Start Free — No Card Needed
            </Link>
            <a
              href="#features"
              className="btn-touch btn-secondary text-lg px-8 py-4"
            >
              See How It Works
            </a>
          </div>
          <p className="text-[#64748b] text-sm mt-6">
            Join 2,000+ plumbers already using PlumberPay
          </p>
        </div>
        {/* Phone mockup */}
        <div className="hidden md:block absolute right-8 lg:right-16 bottom-0 w-64 lg:w-72">
          <div className="bg-[#1e293b] border border-[#334155] rounded-t-3xl shadow-2xl shadow-blue-500/10 p-4 pb-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#3b82f6] rounded-md flex items-center justify-center text-xs text-white">🔧</div>
              <span className="text-xs font-bold text-white">PlumberPay</span>
            </div>
            <div className="bg-[#0f172a] rounded-xl p-3 mb-2">
              <div className="text-[10px] text-[#64748b] mb-1">INVOICE PP-001</div>
              <div className="text-sm font-bold text-white">$1,242.00</div>
              <div className="text-[10px] text-[#94a3b8]">Sarah Johnson - Water Heater</div>
            </div>
            <div className="bg-[#10b981] text-white text-center py-2 rounded-lg text-xs font-semibold mb-2">
              Paid
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-[#1e293b] bg-[#1e293b]/50">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap items-center justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-white">$2.4M+</div>
            <div className="text-sm text-[#64748b]">Invoiced this month</div>
          </div>
          <div className="w-px h-10 bg-[#334155] hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-white">30 sec</div>
            <div className="text-sm text-[#64748b]">Avg. invoice creation</div>
          </div>
          <div className="w-px h-10 bg-[#334155] hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-white">1.2 days</div>
            <div className="text-sm text-[#64748b]">Avg. payment time</div>
          </div>
          <div className="w-px h-10 bg-[#334155] hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-white">4.9 ★</div>
            <div className="text-sm text-[#64748b]">App Store rating</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need. Nothing you don&apos;t.
            </h2>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
              QuickBooks is overkill. A notepad is not enough. PlumberPay is the sweet spot.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card hover:border-[#3b82f6]/30 transition-colors">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#1e293b]/50 border-y border-[#1e293b] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Three taps to get paid
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Pick the service',
                desc: 'Tap the service type — drain cleaning, water heater, pipe repair. Prices auto-fill.',
              },
              {
                step: '2',
                title: 'Add customer info',
                desc: 'Name, phone, email. That\'s it. Add notes if you want.',
              },
              {
                step: '3',
                title: 'Send & get paid',
                desc: 'Share the payment link via text or email. Customer pays. You get notified.',
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-[#3b82f6] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-blue-500/25">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-[#94a3b8]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, honest pricing
            </h2>
            <p className="text-[#94a3b8] text-lg">No hidden fees. No contracts. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`card relative ${
                  plan.highlighted
                    ? 'border-[#3b82f6] shadow-xl shadow-blue-500/10 scale-105'
                    : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3b82f6] text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="text-sm text-[#64748b] mb-3">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-[#64748b] text-sm">{plan.period}</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                      <span className="text-[#10b981] mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`btn-touch w-full text-center ${
                    plan.highlighted ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Why plumbers switch to PlumberPay</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card border-[#ef4444]/20 bg-[#ef4444]/5">
              <h3 className="font-bold text-[#ef4444] mb-4">Before PlumberPay</h3>
              <ul className="space-y-3 text-sm text-[#94a3b8]">
                <li className="flex items-start gap-2"><span className="text-[#ef4444]">✗</span> Scribble a receipt at the job site</li>
                <li className="flex items-start gap-2"><span className="text-[#ef4444]">✗</span> &ldquo;I&apos;ll send you an invoice later&rdquo;</li>
                <li className="flex items-start gap-2"><span className="text-[#ef4444]">✗</span> Chase payments for weeks</li>
                <li className="flex items-start gap-2"><span className="text-[#ef4444]">✗</span> Sunday night invoice marathons</li>
                <li className="flex items-start gap-2"><span className="text-[#ef4444]">✗</span> Lost receipts, missed revenue</li>
              </ul>
            </div>
            <div className="card border-[#10b981]/20 bg-[#10b981]/5">
              <h3 className="font-bold text-[#10b981] mb-4">After PlumberPay</h3>
              <ul className="space-y-3 text-sm text-[#94a3b8]">
                <li className="flex items-start gap-2"><span className="text-[#10b981]">✓</span> Professional invoice in 30 seconds</li>
                <li className="flex items-start gap-2"><span className="text-[#10b981]">✓</span> Send payment link before you leave</li>
                <li className="flex items-start gap-2"><span className="text-[#10b981]">✓</span> Get paid in 1-2 days, not weeks</li>
                <li className="flex items-start gap-2"><span className="text-[#10b981]">✓</span> Zero bookkeeping headaches</li>
                <li className="flex items-start gap-2"><span className="text-[#10b981]">✓</span> Every dollar tracked automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#1e293b]/50 border-y border-[#1e293b] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <blockquote className="text-lg text-[#f1f5f9] font-medium mb-4 leading-relaxed">
                &ldquo;I used to spend Sunday nights doing invoices. Now I send them before I leave the job site.
                Got paid $4,200 last week without a single follow-up call.&rdquo;
              </blockquote>
              <div className="text-[#94a3b8]">
                <span className="font-semibold text-white">Mike R.</span> — Solo plumber, Austin TX
              </div>
            </div>
            <div className="card">
              <blockquote className="text-lg text-[#f1f5f9] font-medium mb-4 leading-relaxed">
                &ldquo;My guys hated QuickBooks. Too many steps. With PlumberPay they actually send invoices
                now. Revenue is up 30% just from not forgetting to bill.&rdquo;
              </blockquote>
              <div className="text-[#94a3b8]">
                <span className="font-semibold text-white">Dave K.</span> — Owner, K&amp;Sons Plumbing, Denver CO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to stop chasing payments?
          </h2>
          <p className="text-[#94a3b8] text-lg mb-8">
            Join thousands of plumbers who invoice on-site and get paid faster.
          </p>
          <Link
            href="/signup"
            className="btn-touch btn-primary text-lg px-10 py-4 shadow-lg shadow-blue-500/25"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e293b] py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔧</span>
            <span className="font-bold text-white">PlumberPay</span>
          </div>
          <div className="text-sm text-[#64748b]">
            &copy; {new Date().getFullYear()} PlumberPay. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-[#94a3b8]">
            <a href="#" className="hover:text-[#3b82f6] transition">Privacy</a>
            <a href="#" className="hover:text-[#3b82f6] transition">Terms</a>
            <a href="#" className="hover:text-[#3b82f6] transition">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
