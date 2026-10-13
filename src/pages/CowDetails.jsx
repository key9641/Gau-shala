import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart, MapPin, Scale, Tag } from 'lucide-react'
import { useData } from '../context/DataContext'

export const CowDetails = () => {
  const { id } = useParams()
  const { cows, loading } = useData()
  const cow = cows.find(record => record.id === id || record.cow_id === id)

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-gau-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-stone-600 mt-4">Loading cow profile…</p>
      </div>
    )
  }

  if (!cow) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-serif text-stone-800">Cow Profile Not Found</h2>
        <p className="text-sm text-stone-500">The requested cow record does not exist in our sanctuary directory.</p>
        <Link
          to="/#featured-residents"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gau-green-700 text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cow Profiles</span>
        </Link>
      </div>
    )
  }

  const breed = cow.breed || cow.breed_name || 'Breed not recorded'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/#featured-residents"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-gau-green-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cow Profiles</span>
        </Link>
        <Link
          to="/donate-a-cow"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 shadow-md transition-all"
        >
          <Heart className="w-3.5 h-3.5 fill-white" />
          <span>Support {cow.name}</span>
        </Link>
      </div>

      <section className="bg-white rounded-3xl border border-stone-200 shadow-soft overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[340px] bg-stone-100">
            <img
              src={cow.photo_url || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=80'}
              alt={cow.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold tracking-wide bg-black/70 text-white backdrop-blur-md">
              <Tag className="w-3.5 h-3.5" />
              {cow.cow_id}
            </span>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-8">
            <div className="space-y-3">
              <p className="text-xs font-bold tracking-widest uppercase text-gau-green-700">GauSeva Resident</p>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">{cow.name}</h1>
              <p className="text-sm font-semibold text-amber-700">{breed}</p>
              <p className="text-sm text-stone-600 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gau-green-700" />
                {cow.location || 'GauSeva sanctuary'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-bold">Age</span>
                <p className="text-lg font-bold text-stone-900 mt-0.5">{cow.age} years</p>
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

            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 space-y-2">
              <h2 className="font-serif font-bold text-lg text-stone-900">Help care for {cow.name}</h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Your support helps provide food, shelter, and daily care for the cows at GauSeva.
              </p>
              <Link to="/donate-a-cow" className="inline-flex items-center gap-2 text-sm font-bold text-gau-green-800 hover:underline">
                Learn how to support a cow
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
