import React from 'react'
import { Link } from 'react-router-dom'
import {
  Heart,
  Stethoscope,
  Search,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  PhoneCall,
  ChevronRight
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { StatCard } from '../components/StatCard'
import { CowCard } from '../components/CowCard'

export const Home = () => {
  const { stats, cows, loading } = useData()

  // Highlight 3 featured cows needing support or special care
  const featuredCows = cows.slice(0, 3)

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gau-cream/60 via-gau-bg to-gau-bg pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/60">
        {/* Subtle decorative background blurbs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-gau-green-200/30 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gau-green-100/80 border border-gau-green-200 text-gau-green-900 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Vedic Cow Sanctuary & 24x7 Specialized Hospital</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-[1.15] tracking-tight">
                Serving Cows, <br />
                <span className="text-gau-green-800 bg-gradient-to-r from-gau-green-800 to-gau-green-600 bg-clip-text text-transparent">
                  Serving Humanity
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                Together, we can provide care, shelter and a better life for every cow. Join our mission to rescue injured, abandoned, and elder cows with world-class veterinary surgery, pure green fodder, and sacred love.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/donate"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 hover:from-amber-700 hover:to-orange-600 shadow-warm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
                  <span>Donate Now</span>
                </Link>

                <Link
                  to="/health"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold text-gau-green-900 bg-white border border-gau-brown-200 hover:bg-stone-50 hover:border-gau-green-600 shadow-soft transition-all duration-200"
                >
                  <span>Explore Our Cows</span>
                  <ArrowRight className="w-4 h-4 text-gau-green-700" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gau-green-600" />
                  100% Tax Exemption (80G)
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  Awarded Sanctuary of Excellence
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Open for Visitor Darshan
                </span>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=85"
                  alt="Gaushala Cow at GauSeva"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                
                {/* Floating card on image */}
                <div className="absolute bottom-6 inset-x-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase font-bold tracking-wider text-amber-600">Sanctuary Resident #001</p>
                      <h4 className="font-serif font-bold text-stone-900 text-lg">Nandini (Pure Gir)</h4>
                      <p className="text-xs text-stone-500">Rescued 2 years ago • Mother of Krishna</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                      Healthy & Loved
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="text-center mb-6">
          <p className="text-xs font-bold tracking-widest uppercase text-gau-green-700">Live Sanctuary Dashboard</p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Current Gaushala Statistics</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard
            icon={Heart}
            title="Total Cows"
            value={loading ? '...' : stats.totalCows}
            subtext="In Sanctuary"
            color="green"
          />
          <StatCard
            icon={ShieldCheck}
            title="Healthy Cows"
            value={loading ? '...' : stats.healthyCows}
            subtext="Thriving & fit"
            color="green"
          />
          <StatCard
            icon={Stethoscope}
            title="Under Treatment"
            value={loading ? '...' : stats.underTreatment + stats.underObservation + stats.criticalCows}
            subtext="Active medical care"
            color="saffron"
          />
          <StatCard
            icon={Search}
            title="Missing Cows"
            value={loading ? '...' : stats.missingCowsCount}
            subtext="Active alerts"
            color="rose"
          />
          <StatCard
            icon={BookOpen}
            title="Cow Breeds"
            value={loading ? '...' : stats.breedsCount}
            subtext="Desi & protected"
            color="amber"
          />
          <StatCard
            icon={Award}
            title="Total Donations"
            value={loading ? '...' : `₹${stats.totalDonationsAmount.toLocaleString('en-IN')}`}
            subtext="Crowd funded"
            color="brown"
          />
        </div>
      </section>

      {/* 3. FOUR MAJOR FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Core Pillars of GauSeva
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Everything You Need to Connect & Serve
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            From seamless transparent UPI donations to individual health logs and community-driven missing cow tracking, explore our platform features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Donate */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-soft hover:shadow-soft-lg hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Heart className="w-7 h-7 fill-current" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">1. Donate & Sponsor</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Support our Gaushala financially. Feed cows with nutritious green fodder (Gau-Gras), sponsor ICU medicines, and download instant 80G tax receipts.
              </p>
            </div>
            <Link
              to="/donate"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 group-hover:translate-x-1 transition-transform"
            >
              <span>Scan QR & Donate</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Cow Health */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-soft hover:shadow-soft-lg hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">2. Cow Health Tracker</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Monitor individual health conditions, view veterinary timeline records, vaccination status, and checkup schedules with clear color-coded badges.
              </p>
            </div>
            <Link
              to="/health"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-1 transition-transform"
            >
              <span>View Health Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: Find Me */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-soft hover:shadow-soft-lg hover:border-rose-400 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">3. Find Me (Missing Cows)</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Help locate missing cows through GPS coordinate markers, photo cards, and report public sightings directly with instant photo uploads.
              </p>
            </div>
            <Link
              to="/find-me"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-800 group-hover:translate-x-1 transition-transform"
            >
              <span>Search & Report Sightings</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 4: Cow Breeds */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-soft hover:shadow-soft-lg hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">4. Breeds & AI ID</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Explore indigenous breeds like Gir, Sahiwal, and Tharparkar. View population distribution charts and test the AI breed identification upload interface.
              </p>
            </div>
            <Link
              to="/breeds"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 group-hover:translate-x-1 transition-transform"
            >
              <span>Explore Breeds & AI Tool</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. FEATURED RESIDENTS SPOTLIGHT */}
      <section className="bg-gau-cream/50 py-16 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-gau-green-700">Resident Spotlights</span>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">Cows Under Loving Care</h2>
              <p className="text-stone-600 text-sm mt-1">Explore profiles, daily diets, and medical recovery notes.</p>
            </div>
            <Link
              to="/health"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-gau-green-800 hover:text-gau-green-900"
            >
              <span>View All {cows.length} Cows</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCows.map((cow) => (
              <CowCard key={cow.id} cow={cow} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gau-green-900 via-gau-green-800 to-gau-brown-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left z-10">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/30">
              Gau-Seva Mahadan
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
              "The cow is the mother of all beings, providing peace, purity and life."
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Every ₹101 feeds a cow fresh nutritious green grass and jaggery for an entire day. Make an immediate impact with our direct UPI QR code.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 z-10 w-full lg:w-auto">
            <Link
              to="/donate"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg text-center transition-all duration-200 transform hover:scale-105"
            >
              Donate via UPI Now
            </Link>
            <Link
              to="/contact"
              className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 text-center transition-colors"
            >
              Visit Our Gaushala
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
