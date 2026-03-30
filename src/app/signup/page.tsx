'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      })

      if (authError) {
        setError(authError.message)
        return
      }

      router.push('/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]">
      <nav className="border-b border-[#1e293b]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#3b82f6]/20 rounded-xl flex items-center justify-center text-xl">
              🔧
            </div>
            <span className="text-white text-xl font-bold">PlumberPay</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-[#94a3b8]">Start invoicing in under a minute</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#94a3b8] mb-1">
                Business / Your Name
              </label>
              <input
                id="name"
                type="text"
                className="input"
                placeholder="Mike's Plumbing"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="organization"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#94a3b8] mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#94a3b8] mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="8+ characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            {error && (
              <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 text-[#ef4444] text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-touch btn-primary w-full"
            >
              {loading ? 'Creating account...' : 'Create Account — It\'s Free'}
            </button>
          </form>

          <p className="text-center text-xs text-[#64748b] mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>

          <p className="text-center text-sm text-[#94a3b8] mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#3b82f6] font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
