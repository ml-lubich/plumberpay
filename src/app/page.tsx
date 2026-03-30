'use client'

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
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="bg-brand-gradient pipe-pattern">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
              🔧
            </div>
            <span className="text-white text-xl font-bold">PlumberPay</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-white/90 hover:text-white font-medium px-4 py-2 rounded-lg transition"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-white text-[#1e3a5f] font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-brand-gradient pipe-pattern relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-blue-100 text-sm font-medium mb-6">
            Built for plumbers, not accountants
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Get Paid Faster.<br />
            <span className="text-blue-200">Invoice On-Site.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Stop scribbling receipts and chasing payments. Create professional invoices
            in 30 seconds and get paid via link — right from the job site.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="btn-touch btn-primary bg-white !text-[#1e3a5f] hover:bg-blue-50 text-lg px-8 py-4 shadow-lg"
            >
              Start Free — No Card Needed
            </Link>
            <a
              href="#features"
              className="btn-touch btn-secondary !border-white/30 !text-white hover:!bg-white/10 text-lg px-8 py-4"
            >
              See How It Works
            </a>
          </div>
          <p className="text-blue-200/70 text-sm mt-6">
            Join 2,000+ plumbers already using PlumberPay
          </p>
        </div>
        {/* Decorative water drops */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-blue-300/20 rounded-full" />
        <div className="absolute top-40 right-20 w-5 h-5 bg-blue-300/15 rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-blue-300/10 rounded-full" />
      </section>

      {/* Social proof bar */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap items-center justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-[#1e3a5f]">$2.4M+</div>
            <div className="text-sm text-gray-500">Invoiced this month</div>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-[#1e3a5f]">30 sec</div>
            <div className="text-sm text-gray-500">Avg. invoice creation</div>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-[#1e3a5f]">1.2 days</div>
            <div className="text-sm text-gray-500">Avg. payment time</div>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-[#1e3a5f]">4.9 ★</div>
            <div className="text-sm text-gray-500">App Store rating</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
              Everything you need. Nothing you don&apos;t.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              QuickBooks is overkill. A notepad is not enough. PlumberPay is the sweet spot.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-brand-gradient-subtle py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
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
                <div className="w-14 h-14 bg-[#2563eb] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">{s.title}</h3>
                <p className="text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
              Simple, honest pricing
            </h2>
            <p className="text-gray-500 text-lg">No hidden fees. No contracts. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`card relative ${
                  plan.highlighted
                    ? 'border-2 border-[#2563eb] shadow-xl scale-105'
                    : 'border border-gray-100'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563eb] text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-[#1e3a5f]">{plan.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold text-[#1e3a5f]">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-400 text-sm">{plan.period}</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
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

      {/* Testimonial */}
      <section className="bg-[#1e3a5f] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-4xl mb-6">💬</div>
          <blockquote className="text-xl md:text-2xl text-white font-medium mb-6 leading-relaxed">
            &ldquo;I used to spend Sunday nights doing invoices. Now I send them before I leave the job site.
            Got paid $4,200 last week without a single follow-up call.&rdquo;
          </blockquote>
          <div className="text-blue-200">
            <span className="font-semibold">Mike R.</span> — Solo plumber, Austin TX
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            Ready to stop chasing payments?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Join thousands of plumbers who invoice on-site and get paid faster.
          </p>
          <Link
            href="/signup"
            className="btn-touch btn-primary text-lg px-10 py-4 shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔧</span>
            <span className="font-bold text-[#1e3a5f]">PlumberPay</span>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} PlumberPay. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-[#2563eb]">Privacy</a>
            <a href="#" className="hover:text-[#2563eb]">Terms</a>
            <a href="#" className="hover:text-[#2563eb]">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
