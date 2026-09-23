import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  UserCheck,
  Stethoscope,
  ShieldCheck,
  Heart,
  Scale,
  Clock,
  MapPin,
  Tag,
  AlertTriangle,
  Syringe,
  CheckCircle2
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { HealthBadge } from '../components/HealthBadge'

export const CowDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cows, loading } = useData()

  const cow = cows.find(c => c.id === id || c.cow_id === id)

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-gau-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-stone-600 mt-4">Loading cow details...</p>
      </div>
    )
  }

  if (!cow) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-serif text-stone-800">Cow Profile Not Found</h2>
        <p className="text-sm text-stone-500">The requested cow record ID does not exist in our sanctuary database.</p>
        <Link
          to="/health"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gau-green-700 text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Health Dashboard</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-gau-green-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Previous Page</span>
        </button>

        <Link
          to="/donate"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 shadow-md transition-all"
        >
          <Heart className="w-3.5 h-3.5 fill-white" />
          <span>Sponsor {cow.name}'s Care</span>
        </Link>
      </div>

      {/* Main Profile Header Hero */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-soft overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Large Photo */}
          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[350px]">
            <img
              src={cow.photo_url || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=80'}
              alt={cow.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold tracking-wide bg-black/70 text-white backdrop-blur-md">
                <Tag className="w-3.5 h-3.5" />
                {cow.cow_id}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <HealthBadge status={cow.health_status} size="lg" />
            </div>
          </div>

          {/* Quick Details & Stats */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">{cow.name}</h1>
                  <p className="text-sm font-semibold text-amber-700">{cow.breed} Indigenous Breed</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-stone-400 uppercase font-bold">Sanctuary Location</p>
                  <p className="text-xs font-bold text-stone-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gau-green-600" />
                    {cow.location || 'Shed A - Sanctuary Main'}
                  </p>
                </div>
              </div>

              {/* Vitals Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Age</span>
                  <p className="text-lg font-bold text-stone-900 mt-0.5">{cow.age} Years</p>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Gender</span>
                  <p className="text-lg font-bold text-stone-900 mt-0.5">{cow.gender}</p>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Weight</span>
                  <p className="text-lg font-bold text-stone-900 mt-0.5 flex items-center gap-1">
                    <Scale className="w-4 h-4 text-stone-400" />
                    {cow.weight ? `${cow.weight} kg` : 'N/A'}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Color / Markings</span>
                  <p className="text-xs font-bold text-stone-900 mt-1 truncate" title={cow.color}>{cow.color || 'Natural'}</p>
                </div>
              </div>

              {/* Current Care / Treatment Note */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Stethoscope className="w-4 h-4 text-amber-700" />
                  <span>Current Clinical Treatment & Nutritional Regimen</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {cow.treatment || 'Balanced organic napier green fodder, wheat bran mash, and digestive minerals.'}
                </p>
              </div>
            </div>

            {/* Checkup dates strip */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-4">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-gau-brown-600" />
                <span>Supervising Vet: <strong className="text-stone-900">{cow.assigned_vet || 'Hospital Resident Doctor'}</strong></span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gau-green-600" />
                  Last Exam: <strong>{cow.last_checkup || 'N/A'}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Next Due: <strong>{cow.next_checkup || 'Next month'}</strong>
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Two Column Layout: Timeline Medical History & Vaccination Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Timeline-style Medical History (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">Clinical Medical Timeline</h3>
                <p className="text-xs text-stone-500">Historical veterinary observations and recovery reports</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-stone-400">
              {(cow.medicalHistory || []).length} Logged Entries
            </span>
          </div>

          {/* Timeline List */}
          <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {(cow.medicalHistory && cow.medicalHistory.length > 0 ? cow.medicalHistory : [
              { date: cow.last_checkup || '2026-09-15', status: cow.health_status, notes: 'Routine bi-monthly health screening. Vital signs normal, rumen sound.' }
            ]).map((entry, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-gau-green-600 ring-4 ring-white shadow-sm" />
                
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-2 group-hover:border-gau-green-300 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gau-green-700" />
                      {entry.date}
                    </span>
                    <HealthBadge status={entry.status} size="sm" />
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {entry.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Vaccination Schedule & Prevention (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
            <div className="flex items-center gap-2.5 border-b border-stone-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <Syringe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">Vaccination History</h3>
                <p className="text-xs text-stone-500">Preventive immunization and booster status</p>
              </div>
            </div>

            <div className="space-y-3">
              {(cow.vaccinations && cow.vaccinations.length > 0 ? cow.vaccinations : [
                { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' },
                { vaccine: 'Haemorrhagic Septicaemia (HS)', date: '2026-05-12', nextDue: '2027-05-12' },
                { vaccine: 'Black Quarter (BQ)', date: '2026-05-12', nextDue: '2027-05-12' }
              ]).map((vax, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-stone-900">{vax.vaccine}</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">Administered: {vax.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      Protected
                    </span>
                    <p className="text-[10px] text-stone-400 mt-0.5">Due: {vax.nextDue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Cow Adoption Sponsorship Banner */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-3xl shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 fill-white" />
              <h3 className="font-serif font-bold text-xl">Adopt / Sponsor {cow.name}</h3>
            </div>
            <p className="text-xs text-amber-100 leading-relaxed">
              Help cover {cow.name}'s specialized medical supplements, fresh grass, and shelter bedding for only ₹1,001/month. Receive monthly video darshan updates.
            </p>
            <Link
              to="/donate"
              className="inline-block w-full py-3 bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs uppercase tracking-wider text-center rounded-xl shadow-md transition-colors"
            >
              Sponsor This Cow Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
