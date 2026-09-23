import React from 'react'
import { Link } from 'react-router-dom'
import {
  Heart,
  ShieldCheck,
  Award,
  Sparkles,
  Stethoscope,
  Wheat,
  Syringe,
  Home as HomeIcon,
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { useData } from '../context/DataContext'

export const About = () => {
  const { stats } = useData()

  const pillars = [
    {
      icon: Stethoscope,
      title: '24x7 Veterinary Hospital',
      desc: 'Equipped with digital surgical theatres, ultrasound, portable X-ray, and ICU stalls for treating critical trauma, plastic ingestion rumenotomies, and fractures.'
    },
    {
      icon: Wheat,
      title: 'Organic Food & Fodder',
      desc: 'Over 40 acres of dedicated green fodder farming producing fresh Hybrid Napier, Lucerne, jaggery energy mash, and calcium-fortified nutritional premixes daily.'
    },
    {
      icon: Syringe,
      title: 'Rigorous Vaccination',
      desc: 'Complete seasonal immunization protocols covering Foot & Mouth Disease (FMD), HS, Black Quarter (BQ), Brucellosis, and prophylactic deworming schedules.'
    },
    {
      icon: HomeIcon,
      title: 'Dignified Elder Sanctuary',
      desc: 'A permanent peaceful haven for elderly, non-lactating, blind, and rescued dairy cows who receive cushioned sand bedding, shade misting, and daily affection.'
    }
  ]

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-gau-cream/70 to-gau-bg py-16 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gau-green-100 text-gau-green-900 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Serving Since 2012</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">
            About GauSeva Gaushala
          </h1>
          <p className="text-stone-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Founded with the eternal Vedic principle of <em>"Gavo Vishvasya Matarah"</em> (The Cow is the Mother of the Universe), our sanctuary provides unconditional care, medical rehabilitation, and lifelong dignity to every sacred cow.
          </p>
        </div>
      </section>

      {/* Mission & Vision Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gau-green-100 text-gau-green-800 flex items-center justify-center font-bold">
              🎯
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">Our Mission</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              To rescue, heal, and preserve India's indigenous bovine breeds by running state-of-the-art charitable veterinary care, fostering sustainable organic agriculture through cow dung compost (Gau-Kripa Amritam), and ending animal abandonment through community awareness.
            </p>
            <ul className="space-y-2 text-xs text-stone-600 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gau-green-600 shrink-0" />
                <span>Zero-refusal emergency hospital intake for injured highway cows</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gau-green-600 shrink-0" />
                <span>Pure A2 indigenous cattle breed lineage conservation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gau-green-600 shrink-0" />
                <span>100% transparent open donor ledger and 80G tax exemptions</span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              🌟
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">Our Vision</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              A compassionate society where every cow is respected as a living embodiment of motherly love, where no elder cattle are left on highway traffic medians to consume plastic waste, and where Vedic knowledge harmonizes with modern veterinary science.
            </p>
            <ul className="space-y-2 text-xs text-stone-600 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Expansion to shelter over 500+ resident cows across clean pavilions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Mobile veterinary clinic ambulance reaching 50 surrounding villages</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Center for natural zero-budget organic farming training</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* How We Care For Cows Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gau-green-700">Holistic Welfare</span>
          <h2 className="text-3xl font-serif font-bold text-stone-900">How We Care for Our Sacred Herd</h2>
          <p className="text-stone-600 text-sm">Every detail of our Gaushala is designed for animal comfort, hygienic health, and loving companionship.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon
            return (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-soft hover:shadow-soft-lg transition-all space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gau-cream text-gau-green-800 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">{p.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{p.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Facility Image Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-md relative group">
            <img
              src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80"
              alt="Green Sanctuary Pasture"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5 text-white">
              <span className="font-bold font-serif text-base">Open Pasture Grazing Grounds</span>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-md relative group">
            <img
              src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80"
              alt="Clean Sheds with Mist Fans"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5 text-white">
              <span className="font-bold font-serif text-base">Hygienic Ventilated Sheds</span>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-md relative group">
            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80"
              alt="Veterinary Hospital Ward"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5 text-white">
              <span className="font-bold font-serif text-base">Surgical & Recovery Units</span>
            </div>
          </div>
        </div>
      </section>

      {/* Adoption / Support CTA Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold">Adopt a Cow Virtually or In-Person</h2>
            <p className="text-amber-100 text-sm max-w-xl leading-relaxed">
              Support an elderly or injured cow with monthly fodder and medical sponsorship. You receive personalized quarterly updates, photos, and are welcome to visit whenever your heart calls.
            </p>
          </div>
          <Link
            to="/donate"
            className="px-8 py-4 bg-white text-stone-900 hover:bg-stone-50 font-bold text-sm rounded-2xl shadow-md transition-transform transform hover:scale-105 shrink-0"
          >
            Start Monthly Sponsorship
          </Link>
        </div>
      </section>

    </div>
  )
}
