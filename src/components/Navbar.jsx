import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, Menu, X, Shield, LogOut, PhoneCall } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { GAUSHALA_CONTACT } from '../data/gaushalaContact'

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user, isAdmin, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Gaushala', path: '/about' },
    { name: 'Donate', path: '/donate' },
    { name: 'Donate a Cow', path: '/donate-a-cow' },
    { name: 'Find Us', path: '/find-me' },
    { name: 'Cow Breeds', path: '/breeds' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gau-brown-100 py-2.5' 
        : 'bg-gau-bg/90 backdrop-blur-sm border-b border-stone-200/60 py-3.5'
    }`}>
      {/* Top Banner helpline on desktop */}
      <div className="hidden lg:block border-b border-stone-200/50 pb-1.5 mb-2 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center text-[11px] text-stone-600 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gau-green-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              24x7 Sick/Injured Cow Rescue & Care Available
            </span>
            <span className="text-stone-300">•</span>
            <span>Roorkee, Uttarakhand</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-gau-brown-600" />
              <a href={GAUSHALA_CONTACT.phoneNumbers[0].href} className="hover:text-gau-green-800">Call the Gaushala: <strong>{GAUSHALA_CONTACT.phoneNumbers[0].display}</strong></a>
            </span>
            {isAdmin && (
              <span className="bg-gau-green-100 text-gau-green-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                Admin Mode Active
              </span>
            )}
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gau-green-700 to-gau-green-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
            {/* Sacred cow SVG icon */}
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M19.5 8.5c-.28 0-.5.22-.5.5v1.5c0 .28.22.5.5.5s.5-.22.5-.5V9c0-.28-.22-.5-.5-.5zm-15 0c-.28 0-.5.22-.5.5v1.5c0 .28.22.5.5.5s.5-.22.5-.5V9c0-.28-.22-.5-.5-.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold font-serif tracking-tight text-gau-green-900">
                Gau<span className="text-amber-600">Seva</span>
              </span>
            </div>
            <p className="text-[10px] tracking-wider uppercase font-semibold text-stone-500">Gaushala Sanctuary</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'text-gau-green-800 bg-gau-green-100/60 font-bold'
                    : 'text-stone-700 hover:text-gau-green-700 hover:bg-stone-100/60'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Action Buttons & Admin */}
        <div className="hidden md:flex items-center gap-3">
          {isAdmin && (
            <div className="flex items-center gap-2">
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-amber-700" />
                <span>Admin Panel</span>
              </Link>
              <button
                onClick={logout}
                title="Logout"
                className="p-1.5 text-stone-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Prominent Donate Now Button */}
          <Link
            to="/donate"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 hover:from-amber-700 hover:to-orange-600 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
            <span>Donate Now</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/donate"
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 flex items-center gap-1"
          >
            <Heart className="w-3 h-3 fill-white" />
            <span>Donate</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 shadow-xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-base font-semibold ${
                    isActive
                      ? 'text-gau-green-800 bg-gau-green-50 font-bold border-l-4 border-gau-green-600'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200/80 flex flex-col gap-2">
            {isAdmin && (
              <div className="flex items-center justify-between bg-amber-50 p-3 rounded-xl">
                <Link to="/admin" className="font-bold text-amber-900 text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <span>Go to Admin Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs font-bold text-rose-600 px-2 py-1 bg-white rounded-lg shadow-sm"
                >
                  Logout
                </button>
              </div>
            )}

            <Link
              to="/donate"
              className="flex items-center justify-center gap-2 py-3 text-base font-bold text-white bg-gradient-to-r from-amber-600 to-orange-500 rounded-xl shadow-md"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate Now</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
