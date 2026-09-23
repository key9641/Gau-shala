import React, { useState, useMemo } from 'react'
import {
  Search,
  MapPin,
  Calendar,
  Phone,
  Eye,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Upload,
  User,
  Plus,
  ShieldAlert,
  ArrowRight
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { HealthBadge } from '../components/HealthBadge'
import { MapPlaceholder } from '../components/MapPlaceholder'
import { Modal } from '../components/Modal'

export const FindMe = () => {
  const { missingCows, sightings, reportSighting, showToast } = useData()
  const { isAdmin } = useAuth()

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCowOnMap, setSelectedCowOnMap] = useState(null)

  // Report Sighting Modal Form State
  const [isSightingModalOpen, setIsSightingModalOpen] = useState(false)
  const [sightingForm, setSightingForm] = useState({
    cow_id: '',
    reported_by: '',
    phone: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    photo_url: ''
  })
  const [photoPreview, setPhotoPreview] = useState(null)

  // Filter missing cows
  const filteredMissing = useMemo(() => {
    return missingCows.filter((cow) => {
      const q = searchTerm.toLowerCase().trim()
      const matchesSearch = !q ||
        cow.name?.toLowerCase().includes(q) ||
        cow.cow_id?.toLowerCase().includes(q) ||
        cow.breed?.toLowerCase().includes(q) ||
        cow.last_seen_location?.toLowerCase().includes(q)

      const matchesStatus = selectedStatus === 'all' || cow.status === selectedStatus
      return matchesSearch && matchesStatus
    })
  }, [missingCows, searchTerm, selectedStatus])

  const handleOpenReportModal = (cowId = '') => {
    setSightingForm(prev => ({
      ...prev,
      cow_id: cowId || (missingCows[0] ? missingCows[0].cow_id : '')
    }))
    setIsSightingModalOpen(true)
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setPhotoPreview(previewUrl)
      setSightingForm(prev => ({ ...prev, photo_url: previewUrl }))
    }
  }

  const handleSubmitSighting = async (e) => {
    e.preventDefault()
    if (!sightingForm.reported_by || !sightingForm.phone || !sightingForm.location) {
      showToast('Please provide your name, phone number, and sighting location.', 'error')
      return
    }

    try {
      const matchedCow = missingCows.find(c => c.cow_id === sightingForm.cow_id)
      await reportSighting({
        ...sightingForm,
        cow_name: matchedCow ? matchedCow.name : 'Sanctuary Cow',
        photo_url: photoPreview || 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80'
      })

      setIsSightingModalOpen(false)
      setPhotoPreview(null)
      setSightingForm({
        cow_id: '',
        reported_by: '',
        phone: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        photo_url: ''
      })
    } catch (err) {
      // Handled in context
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-stone-200 pb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
            <span>Community Rescue & Recovery Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            "Find Me" — Missing Cow Tracker
          </h1>
          <p className="text-stone-600 text-sm leading-relaxed">
            Help us locate cows that have strayed outside sanctuary boundaries or need rescue. Check current alerts, inspect last-seen coordinates, and report sightings immediately.
          </p>
        </div>

        <button
          onClick={() => handleOpenReportModal()}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white text-sm font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          <Camera className="w-4 h-4" />
          <span>Report a Sighting</span>
        </button>
      </div>

      {/* Interactive Geolocation Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-600" />
            <span>Interactive Last-Seen Geolocation Map</span>
          </h3>
          <span className="text-xs text-stone-500">Click any marker pin to focus details</span>
        </div>
        <MapPlaceholder
          locations={missingCows}
          selectedId={selectedCowOnMap?.id}
          onSelectLocation={(loc) => setSelectedCowOnMap(loc)}
          height="h-[400px]"
        />
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-soft flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, Cow Name, Breed, or Location..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {['all', 'missing', 'sighted', 'found'].map((status) => {
            const count = status === 'all' 
              ? missingCows.length 
              : missingCows.filter(m => m.status === status).length
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors flex items-center gap-1.5 ${
                  selectedStatus === status
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>{status === 'all' ? 'All Alerts' : status}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-white/20 rounded-full">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Missing Cow Cards Grid */}
      {filteredMissing.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-xl font-bold text-stone-800">No Missing Cows Reported</h3>
          <p className="text-sm text-stone-500">All registered cows are accounted for or no records matched your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissing.map((cow) => {
            const isSelected = selectedCowOnMap?.id === cow.id
            return (
              <div
                key={cow.id}
                className={`bg-white rounded-3xl border overflow-hidden shadow-soft transition-all duration-300 flex flex-col justify-between ${
                  isSelected ? 'ring-2 ring-rose-500 shadow-xl border-rose-300' : 'border-stone-200 hover:shadow-soft-lg'
                }`}
              >
                {/* Photo & Status */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={cow.photo_url || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80'}
                    alt={cow.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-mono font-bold">
                    {cow.cow_id}
                  </div>
                  <div className="absolute top-3 right-3">
                    <HealthBadge status={cow.status} />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent p-4 text-white">
                    <h3 className="text-xl font-bold font-serif">{cow.name}</h3>
                    <p className="text-xs text-amber-200">{cow.breed} • {cow.age} yrs • {cow.gender || 'Female'}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 text-xs text-stone-600">
                    <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200/70">
                      <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-stone-800">Last Seen Location:</span>
                        <p className="text-stone-600 mt-0.5">{cow.last_seen_location}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-stone-600 py-1 border-b border-stone-100">
                      <span className="flex items-center gap-1.5 text-stone-500">
                        <Calendar className="w-3.5 h-3.5 text-gau-green-600" /> Date Missing:
                      </span>
                      <span className="font-semibold text-stone-800">{cow.last_seen_date}</span>
                    </div>

                    <div>
                      <span className="font-semibold text-stone-800 block mb-1">Color / Distinguishing Marks:</span>
                      <p className="text-xs text-stone-600 bg-amber-50/60 p-2 rounded-lg border border-amber-100 italic">
                        {cow.color_marks || 'Distinctive sanctuary ear tag'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-stone-600">
                      <span className="flex items-center gap-1.5 text-stone-500">
                        <Phone className="w-3.5 h-3.5 text-blue-600" /> Helpline:
                      </span>
                      <span className="font-bold text-stone-900">{cow.contact_number || '+91 98765 43210'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-stone-100 flex gap-2">
                    <button
                      onClick={() => handleOpenReportModal(cow.cow_id)}
                      className="flex-1 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>I Saw This Cow</span>
                    </button>
                    <button
                      onClick={() => setSelectedCowOnMap(cow)}
                      className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors"
                      title="View on Map"
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Community Sightings Feed */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Community Action</span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">Recent Citizen Sighting Reports</h3>
          </div>
          <span className="text-xs text-stone-500 font-semibold">{sightings.length} Reports Logged</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sightings.map((s) => (
            <div key={s.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex gap-4 items-start">
              {s.photo_url && (
                <img
                  src={s.photo_url}
                  alt="Sighting submission"
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-stone-200"
                />
              )}
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-stone-900 text-sm">{s.cow_name || s.cow_id}</span>
                  <span className="text-[11px] text-stone-400">{s.date}</span>
                </div>
                <p className="text-stone-600 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  {s.location}
                </p>
                <p className="text-stone-600 italic bg-white p-2 rounded-lg border border-stone-100">
                  "{s.description}"
                </p>
                <p className="text-[11px] text-stone-400">
                  Reported by <strong>{s.reported_by}</strong> ({s.phone})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Sighting Modal Form */}
      <Modal
        isOpen={isSightingModalOpen}
        onClose={() => setIsSightingModalOpen(false)}
        title="Report a Missing Cow Sighting"
      >
        <form onSubmit={handleSubmitSighting} className="space-y-4">
          <p className="text-xs text-stone-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
            Thank you for being the eyes of our sanctuary. Please provide accurate location details so our rescue van can reach in time.
          </p>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Select Cow (If Known)
            </label>
            <select
              value={sightingForm.cow_id}
              onChange={(e) => setSightingForm({ ...sightingForm, cow_id: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            >
              {missingCows.map(c => (
                <option key={c.id} value={c.cow_id}>{c.name} ({c.cow_id}) - {c.breed}</option>
              ))}
              <option value="UNKNOWN">Unidentified Cow (Needs Urgent Rescue)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={sightingForm.reported_by}
                onChange={(e) => setSightingForm({ ...sightingForm, reported_by: e.target.value })}
                placeholder="e.g. Anand Kumar"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={sightingForm.phone}
                onChange={(e) => setSightingForm({ ...sightingForm, phone: e.target.value })}
                placeholder="+91 98765 00000"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Exact Sighting Location & Landmark *
            </label>
            <input
              type="text"
              required
              value={sightingForm.location}
              onChange={(e) => setSightingForm({ ...sightingForm, location: e.target.value })}
              placeholder="e.g. Near Shiv Mandir tea stall, NH-8 bypass mile 14"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Date & Approximate Time
            </label>
            <input
              type="text"
              value={sightingForm.date}
              onChange={(e) => setSightingForm({ ...sightingForm, date: e.target.value })}
              placeholder="e.g. 2026-09-22 17:30"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Description & Condition
            </label>
            <textarea
              rows="2"
              value={sightingForm.description}
              onChange={(e) => setSightingForm({ ...sightingForm, description: e.target.value })}
              placeholder="What was the cow doing? Did she look injured or thirsty?"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            />
          </div>

          {/* Upload Photo with preview */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Upload Sighting Photo (Optional)
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Choose Photo File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              {photoPreview && (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Upload preview"
                    className="w-12 h-12 object-cover rounded-xl border border-stone-300 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setIsSightingModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              Report Sighting
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
