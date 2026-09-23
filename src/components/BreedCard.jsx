import React from 'react'
import { Award, Compass, Droplet, Sun, CheckCircle } from 'lucide-react'

export const BreedCard = ({ breed, totalCows = 100 }) => {
  const count = breed.cowsCount || 0
  const percentage = totalCows > 0 ? Math.round((count / totalCows) * 100) : 0

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-soft hover:shadow-soft-lg hover:border-amber-300 transition-all duration-300 flex flex-col group">
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={breed.image || breed.image_url || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80'}
          alt={breed.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-amber-500 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
          <Award className="w-3.5 h-3.5" />
          <span>{count} Cows ({percentage}%)</span>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
          <h3 className="text-xl font-bold font-serif">{breed.name}</h3>
          <p className="text-xs text-amber-200 flex items-center gap-1">
            <Compass className="w-3 h-3" />
            {breed.origin}
          </p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-xs text-stone-600 leading-relaxed mb-3">
            {breed.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
            <div className="flex items-start gap-2 text-stone-700">
              <CheckCircle className="w-3.5 h-3.5 text-gau-green-600 shrink-0 mt-0.5" />
              <span><strong className="text-stone-900">Traits:</strong> {breed.characteristics}</span>
            </div>

            {breed.milkYield && (
              <div className="flex items-center gap-2 text-stone-700">
                <Droplet className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span><strong className="text-stone-900">Milk Yield:</strong> {breed.milkYield}</span>
              </div>
            )}

            {breed.climateAdaptability && (
              <div className="flex items-center gap-2 text-stone-700">
                <Sun className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span><strong className="text-stone-900">Resilience:</strong> {breed.climateAdaptability}</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="pt-2">
          <div className="flex justify-between text-[11px] text-stone-500 mb-1">
            <span>Shelter Share</span>
            <span className="font-semibold text-gau-brown-700">{count} of {totalCows} cows</span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gau-green-500 to-amber-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, Math.max(8, percentage))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
