import React from 'react'
import { Link } from 'react-router-dom'
import { HealthBadge } from './HealthBadge'
import { Calendar, UserCheck, Stethoscope, ChevronRight, Tag } from 'lucide-react'

export const CowCard = ({ cow }) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-soft hover:shadow-soft-lg hover:border-gau-green-200 transition-all duration-300 flex flex-col group">
      {/* Image & Badges */}
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
        <div className="absolute top-3 right-3">
          <HealthBadge status={cow.health_status} />
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex items-end justify-between text-white">
          <div>
            <h3 className="text-xl font-bold font-serif tracking-wide drop-shadow-sm">{cow.name}</h3>
            <p className="text-xs text-stone-200 font-medium">{cow.breed} • {cow.age} yrs • {cow.gender}</p>
          </div>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2 text-xs text-stone-600">
          <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
            <span className="flex items-center gap-1.5 text-stone-500">
              <Calendar className="w-3.5 h-3.5 text-gau-green-600" />
              Last Checkup:
            </span>
            <span className="font-semibold text-stone-700">{cow.last_checkup || 'Recently checked'}</span>
          </div>

          <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
            <span className="flex items-center gap-1.5 text-stone-500">
              <UserCheck className="w-3.5 h-3.5 text-gau-brown-600" />
              Assigned Vet:
            </span>
            <span className="font-medium text-stone-700 truncate max-w-[150px]">{cow.assigned_vet || 'Hospital Vet'}</span>
          </div>

          <div className="pt-1">
            <span className="flex items-center gap-1.5 text-stone-500 font-medium mb-1">
              <Stethoscope className="w-3.5 h-3.5 text-orange-500" />
              Current Care / Diet:
            </span>
            <p className="text-xs text-stone-600 line-clamp-2 bg-stone-50 p-2 rounded-lg border border-stone-100 italic">
              "{cow.treatment || 'Balanced organic green fodder & regular vitamins'}"
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/cow/${cow.id}`}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-gau-green-700 bg-gau-green-50 hover:bg-gau-green-600 hover:text-white transition-colors duration-200"
        >
          <span>View Full Medical History</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
