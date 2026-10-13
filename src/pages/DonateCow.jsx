import React from 'react'
import { ArrowLeft, ArrowUpRight, HeartHandshake, Phone, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GAUSHALA_CONTACT } from '../data/gaushalaContact'

export const DonateCow = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-100 via-orange-50 to-gau-cream px-6 py-10 sm:px-10 sm:py-14">
      <div className="absolute -right-10 -top-16 h-60 w-60 rounded-full border-[32px] border-amber-200/40" />
      <div className="relative max-w-3xl space-y-5">
        <Link to="/donate" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to money donations</span>
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-900">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span>Give a cow a safe home</span>
        </div>
        <h1 className="font-serif text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">Donate a Cow</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-stone-700 sm:text-base">
          If you would like to donate a cow to the gaushala, please call us. Our team can speak with you about the cow and the next steps.
        </p>
        <a href={GAUSHALA_CONTACT.phoneNumbers[0].href} className="inline-flex items-center gap-2 rounded-xl bg-gau-green-800 px-5 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-gau-green-950">
          <Phone className="h-4 w-4" />
          <span>Call the Gaushala</span>
        </a>
      </div>
    </section>

    <section className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
          <HeartHandshake className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Speak with our team</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-stone-900">Contact the Gaushala</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">Call any of these numbers to discuss donating a cow.</p>
        </div>
        <div className="space-y-3">
          {GAUSHALA_CONTACT.phoneNumbers.map((phone) => (
            <a key={phone.href} href={phone.href} className="group flex items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-soft">
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800"><Phone className="h-4 w-4" /></span>
                <span className="font-bold text-stone-900">{phone.display}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-stone-400 transition-colors group-hover:text-emerald-700" />
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-soft sm:p-8 lg:col-span-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800"><ShieldCheck className="h-5 w-5" /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-800">Before you call</p>
            <h2 className="font-serif text-xl font-bold text-stone-900">Let’s talk about the cow</h2>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-stone-600">
          Please share what you know about the cow and where it is currently. The gaushala team will discuss care and arrangements with you directly.
        </p>
        <div className="mt-7 rounded-2xl bg-stone-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Also support the gaushala</p>
          <p className="mt-1 text-sm leading-relaxed text-stone-700">If you meant to contribute toward food, medicine, or shelter, you can make a money donation instead.</p>
          <Link to="/donate" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gau-green-800 hover:text-gau-green-950">
            <span>Donate money via UPI</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </div>
)
