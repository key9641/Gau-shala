import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin, Phone, Mail, Clock, Shield, ArrowUpRight } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-gau-brown-900 text-stone-300 pt-16 pb-8 border-t border-gau-brown-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: About GauSeva */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gau-green-600 flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19.5 8.5c-.28 0-.5.22-.5.5v1.5c0 .28.22.5.5.5s.5-.22.5-.5V9c0-.28-.22-.5-.5-.5zm-15 0c-.28 0-.5.22-.5.5v1.5c0 .28.22.5.5.5s.5-.22.5-.5V9c0-.28-.22-.5-.5-.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold font-serif text-white tracking-tight">
                Gau<span className="text-amber-500">Seva</span>
              </span>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed">
              Dedicated to the compassionate protection, medical treatment, and peaceful shelter of indigenous Indian cows. Operating 24x7 with specialized veterinary surgeons, ICU wards, and organic green pastures.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {/* Social links */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-gau-green-600 hover:text-white flex items-center justify-center transition-colors text-stone-400"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors text-stone-400"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors text-stone-400"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-serif text-lg font-semibold mb-4 border-l-2 border-amber-500 pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> About Gaushala
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-semibold text-amber-300">
                  <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Donate Now
                </Link>
              </li>
              <li>
                <Link to="/health" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> Cow Health Tracker
                </Link>
              </li>
              <li>
                <Link to="/find-me" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> Find Me (Missing Cows)
                </Link>
              </li>
              <li>
                <Link to="/breeds" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> Indigenous Breeds
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> Contact & Visiting
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div>
            <h4 className="text-white font-serif text-lg font-semibold mb-4 border-l-2 border-amber-500 pl-2.5">
              Contact & Shelter
            </h4>
            <ul className="space-y-3 text-sm text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                <span>GauSeva Sanctuary, Vedic Marg, Mathura-Vrindavan Road, UP 281001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+91 98765 43210 / 1800-120-4287</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>seva@gauseva.org</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Visiting Timings:</p>
                  <p className="text-xs text-stone-400">Daily 6:00 AM – 12:00 PM & 3:30 PM – 7:30 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Transparency */}
          <div className="space-y-4">
            <h4 className="text-white font-serif text-lg font-semibold mb-4 border-l-2 border-amber-500 pl-2.5">
              Tax Exemption & Trust
            </h4>
            <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700/60 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Shield className="w-4 h-4" />
                <span>Registered Trust & 80G Certified</span>
              </div>
              <p className="text-stone-400 leading-relaxed">
                All donations to GauSeva are eligible for tax deductions under Section 80G of the Indian Income Tax Act.
              </p>
              <div className="pt-2 border-t border-stone-700 text-[11px] text-amber-300">
                Reg No: GAUSEVA/80G/2021/UP-091
              </div>
            </div>

            <Link
              to="/donate"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gau-green-700 hover:bg-gau-green-600 transition-colors shadow-md"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Sponsor Daily Grass (Gau-Gras)</span>
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 GauSeva. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-stone-400">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-stone-400">Terms of Seva</Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-stone-400 text-stone-400">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
