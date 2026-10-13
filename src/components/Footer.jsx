import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin, Phone, Clock, Shield, ArrowUpRight } from 'lucide-react'
import { GAUSHALA_CONTACT } from '../data/gaushalaContact'

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
                <Link to="/donate-a-cow" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> Donate a Cow
                </Link>
              </li>
              <li>
                <Link to="/find-me" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" /> Find Our Gaushala
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
                <span>Roorkee, Uttarakhand 247667</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="flex flex-col">{GAUSHALA_CONTACT.phoneNumbers.map((phone) => <a key={phone.href} href={phone.href} className="hover:text-white">{phone.display}</a>)}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Visiting Timings:</p>
                  <p className="text-xs text-stone-400">Daily 6:00 AM – 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Transparency */}
          <div className="space-y-4">
            <h4 className="text-white font-serif text-lg font-semibold mb-4 border-l-2 border-amber-500 pl-2.5">
              Donation Information
            </h4>
            <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700/60 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Shield className="w-4 h-4" />
                <span>UPI donations</span>
              </div>
              <p className="text-stone-400 leading-relaxed">
                Donation acknowledgements remain pending until the Gaushala verifies the submitted UPI reference number.
              </p>
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
          </div>
        </div>
      </div>
    </footer>
  )
}
