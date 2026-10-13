import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../services/supabase'

export const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/admin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please verify your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-warm">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gau-green-700 text-white flex items-center justify-center mx-auto shadow-md">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Admin Staff Portal
          </h2>
          <p className="text-xs text-stone-500">
            Authorized management login for cow registrations, veterinary records, and donations.
          </p>
        </div>

        {/* Admin access requires Supabase Auth and an approved admin_users entry. */}
        {!isSupabaseConfigured ? (
          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs text-amber-900">
            Admin sign-in is disabled until Supabase Auth is configured for this site.
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl space-y-1.5 text-xs text-emerald-900">
            <p className="font-bold">Supabase admin sign-in</p>
            <p>Use the email and password for an account created in Supabase. The account must also be listed in the <code className="font-mono">admin_users</code> table.</p>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gauseva.org"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !isSupabaseConfigured}
            className="w-full py-3 bg-gau-green-700 hover:bg-gau-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-stone-500 hover:text-gau-green-700">
            ← Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  )
}
