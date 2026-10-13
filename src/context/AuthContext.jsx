import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../services/supabase'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured)

  const loadApprovedAdmin = useCallback(async (authUser) => {
    if (!authUser) return null

    const { data, error } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', authUser.id)
      .maybeSingle()

    if (error) {
      console.error('Could not verify admin access:', error)
      return null
    }
    if (!data) return null

    return {
      ...authUser,
      name: authUser.user_metadata?.full_name || authUser.email,
      role: 'admin'
    }
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false)
      return undefined
    }

    let mounted = true
    const applySessionUser = async (authUser) => {
      const approvedAdmin = await loadApprovedAdmin(authUser)
      if (mounted) {
        setUser(approvedAdmin)
        setAuthLoading(false)
      }
    }

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error('Could not restore Supabase session:', error)
      return applySessionUser(data?.session?.user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer the database lookup until after the auth callback completes.
      setTimeout(() => applySessionUser(session?.user), 0)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [loadApprovedAdmin])

  const login = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Admin sign-in is unavailable until Supabase Auth is configured.')
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    const approvedAdmin = await loadApprovedAdmin(data.user)
    if (!approvedAdmin) {
      await supabase.auth.signOut()
      throw new Error('This Supabase account is not approved for the admin panel. Add its user ID to the admin_users table first.')
    }

    setUser(approvedAdmin)
    return { success: true }
  }

  const logout = async () => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signOut()
      if (error) console.error('Could not sign out of Supabase:', error)
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin: Boolean(user && user.role === 'admin'),
      authLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
