import React from 'react'
import { Clock, ExternalLink, HeartHandshake, MapPin, Navigation, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GAUSHALA_LOCATION } from '../data/gaushalaLocation'

export const FindMe = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gau-green-900 via-gau-green-800 to-emerald-700 px-6 py-10 sm:px-10 sm:py-14 text-white shadow-soft">
      <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[36px] border-white/5" />
      <div className="relative max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-50">
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span>Visit us in Roorkee</span>
        </div>
        <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">Find our Gaushala</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-emerald-50 sm:text-base">
          We welcome you to visit, meet the cows, and learn about the care they receive. Use the map below to plan your route to our Roorkee gaushala.
        </p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <a
            href={GAUSHALA_LOCATION.directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-stone-950 shadow-md transition-colors hover:bg-amber-300"
          >
            <Navigation className="h-4 w-4" />
            <span>Get directions</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15"
          >
            <HeartHandshake className="h-4 w-4" />
            <span>Contact the gaushala</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="grid gap-6 lg:grid-cols-12">
      <div className="space-y-5 lg:col-span-4">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-soft sm:p-7">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
            <MapPin className="h-5 w-5" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Our address</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-stone-900">GauSeva Gaushala</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">{GAUSHALA_LOCATION.address}</p>
          <p className="mt-3 text-xs font-bold text-stone-500">{GAUSHALA_LOCATION.city}</p>
          <a
            href={GAUSHALA_LOCATION.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gau-green-800 hover:text-gau-green-950"
          >
            <span>Open location in Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-800">Visiting hours</p>
              <p className="mt-0.5 text-lg font-bold text-stone-900">Every day, 6 AM–8 PM</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-stone-600">Plan your visit during these hours. We look forward to welcoming you.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft lg:col-span-8">
        <iframe
          title="Map to GauSeva Gaushala in Roorkee"
          src={GAUSHALA_LOCATION.embedUrl}
          className="h-[420px] w-full sm:h-[520px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>

    <section className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-stone-200 bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Support the cows</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-stone-900">Can’t visit in person?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">You can still support their food, shelter, and care from wherever you are.</p>
      </div>
      <Link to="/donate" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gau-green-800 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-gau-green-950">
        <HeartHandshake className="h-4 w-4" />
        <span>Support the Gaushala</span>
      </Link>
    </section>
  </div>
)
