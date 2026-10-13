import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Toast } from './components/Toast'
import { ProtectedRoute } from './components/ProtectedRoute'

// Pages
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Donate } from './pages/Donate'
import { DonateCow } from './pages/DonateCow'
import { CowDetails } from './pages/CowDetails'
import { FindMe } from './pages/FindMe'
import { Breeds } from './pages/Breeds'
import { Contact } from './pages/Contact'
import { AdminLogin } from './pages/AdminLogin'
import { AdminDashboard } from './pages/AdminDashboard'

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gau-bg text-slate-800 antialiased selection:bg-amber-200 selection:text-amber-900">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate-a-cow" element={<DonateCow />} />
          <Route path="/health" element={<Navigate to="/" replace />} />
          <Route path="/cow/:id" element={<CowDetails />} />
          <Route path="/find-me" element={<FindMe />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="max-w-md mx-auto my-24 p-8 text-center bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
                <div className="text-4xl font-bold text-amber-600">404</div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">Page Not Found</h2>
                <p className="text-xs text-stone-500">The sacred path you are looking for does not exist.</p>
                <Link
                  to="/"
                  className="inline-block px-5 py-2.5 bg-gau-green-700 text-white rounded-xl text-xs font-bold shadow-md hover:bg-gau-green-800 transition-colors"
                >
                  Return to Home Sanctuary
                </Link>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
      <Toast />
    </div>
  )
}

export default App
