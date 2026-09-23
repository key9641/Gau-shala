import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('gauseva_auth')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const login = async (email, password) => {
    // Standard secure-looking authentication check (and Supabase Auth ready)
    if (email === 'admin@gauseva.org' && password === 'admin123') {
      const authUser = {
        id: 'u_admin_1',
        email,
        name: 'GauSeva Administrator',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        loginTime: new Date().toISOString()
      }
      setUser(authUser)
      localStorage.setItem('gauseva_auth', JSON.stringify(authUser))
      return { success: true }
    } else {
      throw new Error('Invalid email or password. Use demo credentials.')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('gauseva_auth')
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin: Boolean(user && user.role === 'admin'), login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
