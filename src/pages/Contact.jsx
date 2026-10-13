import React, { useState } from 'react'
import {
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Navigation
} from 'lucide-react'
import { GAUSHALA_CONTACT } from '../data/gaushalaContact'
import { GAUSHALA_LOCATION } from '../data/gaushalaLocation'
import { useData } from '../context/DataContext'
import { isSupabaseConfigured } from '../services/supabase'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const INDIAN_MOBILE_PATTERN = /^\+91[6-9]\d{9}$/

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { submitEnquiry } = useData()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = formData.email.trim()
    const normalizedPhone = formData.phone.replace(/[\s().-]/g, '')

    if (!EMAIL_PATTERN.test(email)) {
      setFormError('Enter a valid email address, such as name@example.com.')
      return
    }

    if (!INDIAN_MOBILE_PATTERN.test(normalizedPhone)) {
      setFormError('Enter +91 followed by a valid 10-digit Indian mobile number.')
      return
    }

    setFormError('')
    setSubmitting(true)
    try {
      await submitEnquiry({
        name: formData.name.trim(),
        email: email.toLowerCase(),
        phone: normalizedPhone,
        subject: formData.subject.trim() || 'General Inquiry',
        message: formData.message.trim()
      })
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      console.error('Failed to submit contact enquiry:', err)
      setFormError(err.message || 'We could not save your enquiry. Please try again or call the Gaushala.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gau-green-100 text-gau-green-900 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-gau-green-700" />
          <span>Connect With Us</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">
          Contact & Visit Our Gaushala
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          We warmly invite devotees, families, researchers, and volunteers to experience Gau-Seva firsthand. Reach out for sanctuary visits, ambulance dispatch, or sponsorship inquiries.
        </p>
      </div>

      {/* Grid: Form & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-soft space-y-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">Send an Inquiry or Prayer Note</h2>
            <p className="text-xs text-stone-500 mt-1">Our administrative seva team responds within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-900">Your enquiry has been recorded</h3>
              <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                The Gaushala team can review it in the Admin Panel under Enquiries. It is not sent by email.
              </p>
              {!isSupabaseConfigured && (
                <p className="text-[11px] text-amber-800 max-w-sm mx-auto">
                  This preview is saving data in this browser only. Connect Supabase to share enquiries across devices.
                </p>
              )}
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                  {formError}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Radhika Iyer"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      setFormError('')
                    }}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    maxLength={20}
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value })
                      setFormError('')
                    }}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">Use +91 followed by 10 digits. Spaces and hyphens are okay.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
                  >
                    <option value="">Select a reason</option>
                    <option value="Sanctuary Visit">Planning a Gaushala Visit</option>
                    <option value="Cow Adoption">Cow Adoption & Sponsorship</option>
                    <option value="Emergency Rescue">Injured Cow Rescue Alert</option>
                    <option value="Donation Query">Donation or Payment Query</option>
                    <option value="Volunteering">Volunteering Opportunities</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us how we can help or how you'd like to support..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-gau-green-700 hover:bg-gau-green-800 disabled:opacity-60 disabled:cursor-wait text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting…' : 'Submit Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Col: Details & Schedule (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-5">
            <h3 className="text-xl font-serif font-bold text-stone-900">Sanctuary Details</h3>

            <ul className="space-y-4 text-xs text-stone-600">
              <li className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-sm">Physical Address</p>
                  <p className="text-stone-600 mt-0.5">
                    {GAUSHALA_LOCATION.address}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-sm">Call the Gaushala</p>
                  <div className="mt-1.5 space-y-1">
                    {GAUSHALA_CONTACT.phoneNumbers.map((phone) => (
                      <a key={phone.href} href={phone.href} className="block text-stone-600 hover:text-gau-green-800">{phone.display}</a>
                    ))}
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-sm">Visiting & Darshan Hours</p>
                  <p className="text-stone-600 mt-0.5">
                    Daily: 6:00 AM – 8:00 PM
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Map Location Card */}
          <div className="bg-stone-900 text-white rounded-3xl p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-emerald-400" />
                <h4 className="font-serif font-bold text-lg">Sanctuary Directions</h4>
              </div>
              <span className="text-[10px] uppercase font-bold text-stone-400">GPS Coords</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Find us in Roorkee, Uttarakhand. Open the map for the exact pin and directions to the gaushala.
            </p>
            <a
              href={GAUSHALA_LOCATION.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              <span>Open in Google Maps / Directions</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  )
}
