import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Filter,
  Activity,
  CheckCircle2,
  Eye,
  ShieldAlert,
  X,
  SlidersHorizontal,
  Plus
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { CowCard } from '../components/CowCard'

export const CowHealth = () => {
  const { cows, breeds, loading } = useData()
  const { isAdmin } = useAuth()

  // Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedBreed, setSelectedBreed] = useState('all')
  const [selectedGender, setSelectedGender] = useState('all')
  const [selectedAgeRange, setSelectedAgeRange] = useState('all')

  const statusOptions = [
    { value: 'all', label: 'All Statuses', count: cows.length },
    { value: 'healthy', label: 'Healthy', count: cows.filter(c => c.health_status === 'healthy').length, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { value: 'under_observation', label: 'Observation', count: cows.filter(c => c.health_status === 'under_observation').length, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { value: 'under_treatment', label: 'Treatment', count: cows.filter(c => c.health_status === 'under_treatment').length, color: 'text-orange-700 bg-orange-50 border-orange-200' },
    { value: 'critical', label: 'Critical Care', count: cows.filter(c => c.health_status === 'critical').length, color: 'text-rose-700 bg-rose-50 border-rose-200' },
  ]

  // Filter logic
  const filteredCows = useMemo(() => {
    return cows.filter((cow) => {
      // Search term
      const query = searchTerm.toLowerCase().trim()
      const matchesSearch = !query || 
        cow.name?.toLowerCase().includes(query) || 
        cow.cow_id?.toLowerCase().includes(query) ||
        cow.breed?.toLowerCase().includes(query)

      // Status
      const matchesStatus = selectedStatus === 'all' || cow.health_status === selectedStatus

      // Breed
      const matchesBreed = selectedBreed === 'all' || cow.breed?.toLowerCase() === selectedBreed.toLowerCase()

      // Gender
      const matchesGender = selectedGender === 'all' || cow.gender?.toLowerCase() === selectedGender.toLowerCase()

      // Age Range
      let matchesAge = true
      if (selectedAgeRange === 'calf') matchesAge = cow.age < 3
      else if (selectedAgeRange === 'adult') matchesAge = cow.age >= 3 && cow.age <= 7
      else if (selectedAgeRange === 'senior') matchesAge = cow.age > 7

      return matchesSearch && matchesStatus && matchesBreed && matchesGender && matchesAge
    })
  }, [cows, searchTerm, selectedStatus, selectedBreed, selectedGender, selectedAgeRange])

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedStatus('all')
    setSelectedBreed('all')
    setSelectedGender('all')
    setSelectedAgeRange('all')
  }

  const isFiltered = searchTerm || selectedStatus !== 'all' || selectedBreed !== 'all' || selectedGender !== 'all' || selectedAgeRange !== 'all'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gau-green-100 text-gau-green-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5 text-gau-green-700" />
            <span>Veterinary Health Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Gaushala Cow Health Monitoring
          </h1>
          <p className="text-stone-600 text-sm mt-1">
            Real-time condition monitoring, bi-weekly veterinary screenings, and specialized geriatric care.
          </p>
        </div>

        {isAdmin && (
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gau-green-700 hover:bg-gau-green-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add / Edit Cow Records</span>
          </Link>
        )}
      </div>

      {/* Quick Status Badges Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {statusOptions.map((opt) => {
          const isActive = selectedStatus === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => setSelectedStatus(opt.value)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
                isActive
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-50 border-stone-200'
              }`}
            >
              <span>{opt.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-700'
              }`}>
                {opt.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Cow by ID or Name (e.g. Nandini, GS-2024-001)..."
              className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            />
          </div>

          {/* Breed Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            >
              <option value="all">All Breeds ({breeds.length})</option>
              {breeds.map(b => (
                <option key={b.id || b.name} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Age Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedAgeRange}
              onChange={(e) => setSelectedAgeRange(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            >
              <option value="all">All Ages</option>
              <option value="calf">Calves (&lt; 3 yrs)</option>
              <option value="adult">Adults (3 - 7 yrs)</option>
              <option value="senior">Seniors (7+ yrs)</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            >
              <option value="all">All Genders</option>
              <option value="female">Cow (Female)</option>
              <option value="male">Bull / Nandi (Male)</option>
            </select>
          </div>

          {/* Reset button */}
          <div className="md:col-span-1 flex items-center justify-end">
            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="w-full py-2.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
                title="Reset all filters"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Active results counter */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
          <span>
            Showing <strong>{filteredCows.length}</strong> of <strong>{cows.length}</strong> sanctuary cows
          </span>
          <span className="hidden sm:inline text-stone-400">
            Click any cow profile to inspect clinical charts & vaccine history
          </span>
        </div>
      </div>

      {/* Cows Grid or Empty State */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-gau-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-stone-600">Loading cow health records...</p>
        </div>
      ) : filteredCows.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl font-bold">
            🐄
          </div>
          <h3 className="text-xl font-bold text-stone-800">No cows found</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            No cow matches your current filter criteria. Try adjusting the search term or resetting the filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-gau-green-700 text-white text-xs font-bold rounded-xl hover:bg-gau-green-800 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCows.map((cow) => (
            <CowCard key={cow.id} cow={cow} />
          ))}
        </div>
      )}
    </div>
  )
}
