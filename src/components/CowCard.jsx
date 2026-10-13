import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, MapPin, Tag } from 'lucide-react'

export const CowCard = ({ cow }) => {
  const breed = cow.breed || cow.breed_name || 'Breed not recorded'

  return (
    <article className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-soft hover:shadow-soft-lg hover:border-gau-green-200 transition-all duration-300 flex flex-col group">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={cow.photo_url || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80'}
          alt={cow.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide bg-black/60 text-white backdrop-blur-md">
            <Tag className="w-3 h-3" />
            {cow.cow_id}
          </span>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-4 text-white">
          <h3 className="text-xl font-bold font-serif tracking-wide drop-shadow-sm">{cow.name}</h3>
          <p className="text-xs text-stone-200 font-medium">{breed} · {cow.age} yrs · {cow.gender}</p>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <p className="flex items-center gap-1.5 text-xs text-stone-600">
          <MapPin className="w-3.5 h-3.5 text-gau-green-700 shrink-0" />
          <span className="truncate">{cow.location || 'GauSeva sanctuary'}</span>
        </p>
        <Link
          to={`/cow/${cow.id}`}
          className="mt-2 w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-gau-green-700 bg-gau-green-50 hover:bg-gau-green-600 hover:text-white transition-colors duration-200"
        >
          <span>View Cow Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  )
}
