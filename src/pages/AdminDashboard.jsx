import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Heart,
  Stethoscope,
  Search,
  BookOpen,
  DollarSign,
  Settings as SettingsIcon,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Save,
  RotateCcw,
  Check,
  X,
  ExternalLink,
  Shield,
  FileText
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { HealthBadge } from '../components/HealthBadge'
import { StatCard } from '../components/StatCard'
import { Modal } from '../components/Modal'

export const AdminDashboard = () => {
  const {
    cows,
    breeds,
    missingCows,
    sightings,
    donations,
    settings,
    stats,
    addCow,
    updateCow,
    deleteCow,
    updateMissingStatus,
    verifyDonation,
    updateSettings,
    resetAllData,
    showToast
  } = useData()

  const { user, logout } = useAuth()

  // Active Tab: 'overview' | 'cows' | 'health' | 'missing' | 'breeds' | 'donations' | 'settings'
  const [activeTab, setActiveTab] = useState('overview')

  // Search & Filter within Admin Tables
  const [searchQuery, setSearchQuery] = useState('')

  // Cow Modal State (Add or Edit)
  const [isCowModalOpen, setIsCowModalOpen] = useState(false)
  const [editingCowId, setEditingCowId] = useState(null)
  const [cowFormData, setCowFormData] = useState({
    cow_id: '',
    name: '',
    breed: 'Gir',
    age: '4',
    gender: 'Female',
    color: 'Reddish Dun',
    weight: '380',
    photo_url: '',
    health_status: 'healthy',
    location: 'Shed A - Main Sanctuary',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    treatment: 'Regular organic green fodder and vitamins',
    last_checkup: new Date().toISOString().split('T')[0],
    next_checkup: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  })
  const [cowPhotoPreview, setCowPhotoPreview] = useState('')

  // Delete Confirmation Dialog
  const [deleteConfirmCow, setDeleteConfirmCow] = useState(null)

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(() => ({
    gaushala_name: settings?.gaushala_name || 'Shree Krishna GauSeva Ashram & Hospital',
    upi_id: settings?.upi_id || 'gaushala@upi',
    phone: settings?.phone || '+91 98765 43210',
    email: settings?.email || 'seva@gauseva.org',
    address: settings?.address || 'VV9H+2JP, BSM College Road, near Kaushik Pathology Clinic - Best Pathology Lab in Roorkee | Pathology Lab in Roorkee| Blood Test in Roorkee, Chow Mandi, Chand Puri Nagar, Roorkee, Uttarakhand 247667'
  }))

  // Handle Opening Cow Add Modal
  const handleOpenAddCow = () => {
    setEditingCowId(null)
    const nextNum = (cows.length + 1).toString().padStart(3, '0')
    setCowFormData({
      cow_id: `GS-2024-${nextNum}`,
      name: '',
      breed: 'Gir',
      age: '3.5',
      gender: 'Female',
      color: 'Reddish Dun',
      weight: '360',
      photo_url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
      health_status: 'healthy',
      location: 'Shed A - Main Sanctuary',
      assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
      treatment: 'Standard green napier grass & mineral block',
      last_checkup: new Date().toISOString().split('T')[0],
      next_checkup: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
    setCowPhotoPreview('https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80')
    setIsCowModalOpen(true)
  }

  // Handle Opening Cow Edit Modal
  const handleOpenEditCow = (cow) => {
    setEditingCowId(cow.id)
    setCowFormData({
      cow_id: cow.cow_id,
      name: cow.name,
      breed: cow.breed,
      age: cow.age.toString(),
      gender: cow.gender,
      color: cow.color || '',
      weight: (cow.weight || '').toString(),
      photo_url: cow.photo_url || '',
      health_status: cow.health_status,
      location: cow.location || '',
      assigned_vet: cow.assigned_vet || '',
      treatment: cow.treatment || '',
      last_checkup: cow.last_checkup || '',
      next_checkup: cow.next_checkup || ''
    })
    setCowPhotoPreview(cow.photo_url || '')
    setIsCowModalOpen(true)
  }

  // Handle Photo input preview
  const handlePhotoFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      setCowPhotoPreview(preview)
      setCowFormData(prev => ({ ...prev, photo_url: preview }))
    }
  }

  // Submit Cow Form (Add or Edit)
  const handleSaveCow = async (e) => {
    e.preventDefault()
    if (!cowFormData.name || !cowFormData.cow_id) {
      showToast('Please specify Name and Cow ID', 'error')
      return
    }

    const payload = {
      ...cowFormData,
      age: Number(cowFormData.age) || 3,
      weight: Number(cowFormData.weight) || 350,
      photo_url: cowPhotoPreview || cowFormData.photo_url
    }

    try {
      if (editingCowId) {
        await updateCow(editingCowId, payload)
      } else {
        await addCow(payload)
      }
      setIsCowModalOpen(false)
    } catch (err) {
      // handled
    }
  }

  // Confirm Delete
  const handleExecuteDeleteCow = async () => {
    if (!deleteConfirmCow) return
    try {
      await deleteCow(deleteConfirmCow.id)
      setDeleteConfirmCow(null)
    } catch (err) {
      // handled
    }
  }

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault()
    await updateSettings({
      ...settings,
      ...settingsForm,
      qr_code_image: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=${encodeURIComponent(settingsForm.upi_id)}&pn=GauSeva%20Gaushala&cu=INR`
    })
  }

  // Filtered cows for table
  const tableCows = cows.filter(c =>
    !searchQuery ||
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.cow_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.breed?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const navTabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'cows', label: `Manage Cows (${cows.length})`, icon: Heart },
    { id: 'health', label: 'Cow Health & Records', icon: Stethoscope },
    { id: 'missing', label: `Missing Alerts (${missingCows.length})`, icon: Search },
    { id: 'breeds', label: `Breeds (${breeds.length})`, icon: BookOpen },
    { id: 'donations', label: `Donations (${donations.length})`, icon: DollarSign },
    { id: 'settings', label: 'Settings & UPI', icon: SettingsIcon },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Bar */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gau-green-700 text-white flex items-center justify-center font-bold shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-stone-900">GauSeva Admin Panel</h1>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-bold uppercase tracking-wider">
                Full Access
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Logged in as <strong>{user?.email || 'Administrator'}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetAllData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
            title="Reset to default 18 cows sample data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo DB</span>
          </button>
          <button
            onClick={handleOpenAddCow}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gau-green-700 hover:bg-gau-green-800 shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Cow</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
        {navTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setSearchQuery('')
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-gau-green-800 text-white shadow-md'
                  : 'bg-white hover:bg-stone-50 text-stone-600 border border-stone-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <StatCard icon={Heart} title="Total Cows" value={stats.totalCows} color="green" />
            <StatCard icon={CheckCircle2} title="Healthy" value={stats.healthyCows} color="green" />
            <StatCard icon={Stethoscope} title="Under Treatment" value={stats.underTreatment} color="saffron" />
            <StatCard icon={Search} title="Missing" value={stats.missingCowsCount} color="rose" />
            <StatCard icon={CheckCircle2} title="Found" value={stats.foundCowsCount} color="green" />
            <StatCard icon={BookOpen} title="Breeds" value={stats.breedsCount} color="amber" />
            <StatCard icon={DollarSign} title="Total Donations" value={`₹${stats.totalDonationsAmount.toLocaleString('en-IN')}`} color="brown" />
          </div>

          {/* Quick Management Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Quick Cows summary */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-stone-900">Recent Registrations</h3>
                <button
                  onClick={() => setActiveTab('cows')}
                  className="text-xs text-gau-green-700 font-bold hover:underline"
                >
                  View All ({cows.length})
                </button>
              </div>
              <div className="space-y-2">
                {cows.slice(0, 4).map(c => (
                  <div key={c.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-stone-50 border border-stone-100">
                    <div>
                      <strong className="text-stone-900">{c.name}</strong>
                      <span className="text-stone-400 ml-1.5">({c.cow_id})</span>
                    </div>
                    <HealthBadge status={c.health_status} size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Alerts summary */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-stone-900">Missing Alert Status</h3>
                <button
                  onClick={() => setActiveTab('missing')}
                  className="text-xs text-rose-700 font-bold hover:underline"
                >
                  Manage ({missingCows.length})
                </button>
              </div>
              <div className="space-y-2">
                {missingCows.map(m => (
                  <div key={m.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-stone-50 border border-stone-100">
                    <div>
                      <strong className="text-stone-900">{m.cow_name || m.name}</strong>
                      <span className="text-stone-400 ml-1.5">({m.cow_id})</span>
                    </div>
                    <HealthBadge status={m.status} size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Donation Verification Queue */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-stone-900">Donations Verification</h3>
                <button
                  onClick={() => setActiveTab('donations')}
                  className="text-xs text-amber-700 font-bold hover:underline"
                >
                  View Ledger
                </button>
              </div>
              <div className="space-y-2">
                {donations.slice(0, 4).map(d => (
                  <div key={d.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-stone-50 border border-stone-100">
                    <div>
                      <strong className="text-stone-900">{d.donor_name}</strong>
                      <span className="text-gau-green-700 font-bold ml-1.5">₹{Number(d.amount).toLocaleString('en-IN')}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      d.verification_status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {d.verification_status || 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: MANAGE COWS */}
      {activeTab === 'cows' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Sanctuary Cows Directory</h2>
              <p className="text-xs text-stone-500 mt-0.5">Register, modify health tags, and manage cow profiles.</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search table by name or ID..."
                className="px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none"
              />
              <button
                onClick={handleOpenAddCow}
                className="flex items-center gap-1.5 px-4 py-2 bg-gau-green-700 hover:bg-gau-green-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Cow</span>
              </button>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-stone-50 text-stone-800 uppercase text-[10px] font-bold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Cow / ID</th>
                  <th className="py-3 px-4">Breed</th>
                  <th className="py-3 px-4">Age / Gender</th>
                  <th className="py-3 px-4">Health Status</th>
                  <th className="py-3 px-4">Assigned Location</th>
                  <th className="py-3 px-4">Last Checkup</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {tableCows.map((cow) => (
                  <tr key={cow.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cow.photo_url || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=200&q=80'}
                          alt={cow.name}
                          className="w-9 h-9 rounded-xl object-cover border border-stone-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-stone-900 text-sm">{cow.name}</p>
                          <p className="text-[10px] font-mono text-stone-400">{cow.cow_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-800">{cow.breed}</td>
                    <td className="py-3 px-4">{cow.age} yrs • {cow.gender}</td>
                    <td className="py-3 px-4">
                      <HealthBadge status={cow.health_status} size="sm" />
                    </td>
                    <td className="py-3 px-4 truncate max-w-[150px]">{cow.location || 'Shed A'}</td>
                    <td className="py-3 px-4">{cow.last_checkup || 'N/A'}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/cow/${cow.id}`}
                          className="p-1.5 text-stone-500 hover:text-gau-green-700 hover:bg-stone-100 rounded-lg transition-colors"
                          title="View Public Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenEditCow(cow)}
                          className="p-1.5 text-stone-500 hover:text-blue-600 hover:bg-stone-100 rounded-lg transition-colors"
                          title="Edit Cow Details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmCow(cow)}
                          className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Cow Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: COW HEALTH & CLINICAL TIMELINE */}
      {activeTab === 'health' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">Veterinary Hospital Registry</h2>
            <p className="text-xs text-stone-500 mt-0.5">Quickly update health status tags or log doctor examinations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cows.map(cow => (
              <div key={cow.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900">{cow.name}</h4>
                    <span className="text-[11px] font-mono text-stone-500">{cow.cow_id}</span>
                  </div>
                  <HealthBadge status={cow.health_status} size="sm" />
                </div>

                <div className="text-xs text-stone-600 space-y-1">
                  <p><strong>Vet:</strong> {cow.assigned_vet || 'Resident Vet'}</p>
                  <p><strong>Last Exam:</strong> {cow.last_checkup || 'Recently'}</p>
                  <p className="italic text-stone-500 bg-white p-2 rounded border border-stone-100">
                    "{cow.treatment || 'Standard fodder and checkup'}"
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between gap-2">
                  <select
                    value={cow.health_status}
                    onChange={(e) => updateCow(cow.id, { health_status: e.target.value })}
                    className="text-xs px-2 py-1 bg-white border border-stone-300 rounded-lg font-semibold"
                  >
                    <option value="healthy">Healthy</option>
                    <option value="under_observation">Under Observation</option>
                    <option value="under_treatment">Under Treatment</option>
                    <option value="critical">Critical Care</option>
                  </select>

                  <button
                    onClick={() => handleOpenEditCow(cow)}
                    className="text-xs font-bold text-gau-green-700 hover:underline"
                  >
                    Edit History
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MISSING COWS & SIGHTINGS */}
      {activeTab === 'missing' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-8 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">Missing Cows & Citizens Sighting Reports</h2>
            <p className="text-xs text-stone-500 mt-0.5">Change rescue status or inspect reported locations.</p>
          </div>

          {/* Missing Alerts Table */}
          <div className="space-y-3">
            <h3 className="font-bold text-stone-800 text-sm">Active Missing Alerts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-600">
                <thead className="bg-stone-50 text-stone-800 uppercase text-[10px] font-bold border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Cow</th>
                    <th className="py-3 px-4">Last Seen Location</th>
                    <th className="py-3 px-4">Date Reported</th>
                    <th className="py-3 px-4">Helpline Contact</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {missingCows.map((m) => (
                    <tr key={m.id}>
                      <td className="py-3 px-4 font-bold text-stone-900">{m.cow_name || m.name} ({m.cow_id})</td>
                      <td className="py-3 px-4">{m.last_seen_location}</td>
                      <td className="py-3 px-4">{m.last_seen_date}</td>
                      <td className="py-3 px-4">{m.contact_number}</td>
                      <td className="py-3 px-4">
                        <HealthBadge status={m.status} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <select
                          value={m.status}
                          onChange={(e) => updateMissingStatus(m.id, e.target.value)}
                          className="px-2 py-1 bg-stone-50 border border-stone-300 rounded-lg text-xs font-semibold"
                        >
                          <option value="missing">Missing</option>
                          <option value="sighted">Sighted</option>
                          <option value="found">Found & Recovered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Citizen Sightings Table */}
          <div className="space-y-3 pt-6 border-t border-stone-200">
            <h3 className="font-bold text-stone-800 text-sm">Public Sightings Submitted</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sightings.map(s => (
                <div key={s.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span>{s.cow_name || s.cow_id}</span>
                    <span className="text-stone-400 text-[11px]">{s.date}</span>
                  </div>
                  <p className="text-stone-700"><strong>Location:</strong> {s.location}</p>
                  <p className="italic text-stone-600 bg-white p-2 rounded border border-stone-100">
                    "{s.description}"
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Reported by: {s.reported_by} ({s.phone})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BREEDS */}
      {activeTab === 'breeds' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Indigenous Breeds Management</h2>
              <p className="text-xs text-stone-500 mt-0.5">Census and breed characteristics directory.</p>
            </div>
            <Link
              to="/breeds"
              className="text-xs font-bold text-gau-green-700 hover:underline flex items-center gap-1"
            >
              <span>View Public Analytics</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {breeds.map(b => {
              const inHerd = cows.filter(c => c.breed?.toLowerCase() === b.name?.toLowerCase()).length
              return (
                <div key={b.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex gap-4 items-start">
                  <img
                    src={b.image || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=200&q=80'}
                    alt={b.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200"
                  />
                  <div className="space-y-1 text-xs flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-stone-900 text-sm">{b.name}</h4>
                      <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full text-[10px]">
                        {inHerd || b.cowsCount} Cows Sheltered
                      </span>
                    </div>
                    <p className="text-stone-500">{b.origin}</p>
                    <p className="text-stone-600 line-clamp-2">{b.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 6: DONATIONS */}
      {activeTab === 'donations' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Donations Ledger & Verification</h2>
              <p className="text-xs text-stone-500 mt-0.5">Review UPI claims submitted by benefactors and mark verified.</p>
            </div>
            <div className="bg-gau-green-50 px-4 py-2 rounded-xl text-xs font-bold text-gau-green-900">
              Total Raised: ₹{donations.reduce((sum, d) => sum + Number(d.amount || 0), 0).toLocaleString('en-IN')}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-stone-50 text-stone-800 uppercase text-[10px] font-bold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Donor Name</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Transaction UTR</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-stone-50/80">
                    <td className="py-3 px-4 font-bold text-stone-900">{d.donor_name}</td>
                    <td className="py-3 px-4 font-extrabold text-gau-green-700">₹{Number(d.amount).toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">{d.date}</td>
                    <td className="py-3 px-4 font-mono">{d.transaction_id}</td>
                    <td className="py-3 px-4">{d.category || 'General Seva'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        d.verification_status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {d.verification_status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {d.verification_status === 'verified' ? (
                        <button
                          onClick={() => verifyDonation(d.id, 'pending')}
                          className="px-2.5 py-1 text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                        >
                          Mark Pending
                        </button>
                      ) : (
                        <button
                          onClick={() => verifyDonation(d.id, 'verified')}
                          className="px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                        >
                          Verify & Confirm
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6 max-w-3xl animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">Gaushala Platform Settings</h2>
            <p className="text-xs text-stone-500 mt-0.5">Customize Gaushala identity, UPI ID, and official contacts.</p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Gaushala Name
              </label>
              <input
                type="text"
                value={settingsForm.gaushala_name}
                onChange={(e) => setSettingsForm({ ...settingsForm, gaushala_name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Official UPI ID (Used for Dynamic QR Code generation)
              </label>
              <input
                type="text"
                value={settingsForm.upi_id}
                onChange={(e) => setSettingsForm({ ...settingsForm, upi_id: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm font-mono font-bold focus:bg-white focus:outline-none"
              />
              <p className="text-[11px] text-stone-400 mt-1">Changing this updates the donation QR code and copy button across the entire website immediately.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Helpline Phone Number
                </label>
                <input
                  type="text"
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Administrative Email
                </label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Sanctuary Address
              </label>
              <textarea
                rows="2"
                value={settingsForm.address}
                onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-gau-green-700 hover:bg-gau-green-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </form>
        </div>
      )}

      {/* ADD / EDIT COW MODAL */}
      <Modal
        isOpen={isCowModalOpen}
        onClose={() => setIsCowModalOpen(false)}
        title={editingCowId ? `Edit Record for ${cowFormData.name}` : 'Register New Cow into Gaushala'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSaveCow} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Assigned Cow ID *
              </label>
              <input
                type="text"
                required
                value={cowFormData.cow_id}
                onChange={(e) => setCowFormData({ ...cowFormData, cow_id: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Cow Name *
              </label>
              <input
                type="text"
                required
                value={cowFormData.name}
                onChange={(e) => setCowFormData({ ...cowFormData, name: e.target.value })}
                placeholder="e.g. Nandini"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Breed
              </label>
              <select
                value={cowFormData.breed}
                onChange={(e) => setCowFormData({ ...cowFormData, breed: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold"
              >
                {breeds.map(b => (
                  <option key={b.id || b.name} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Age (Years)
              </label>
              <input
                type="number"
                step="0.5"
                value={cowFormData.age}
                onChange={(e) => setCowFormData({ ...cowFormData, age: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Gender
              </label>
              <select
                value={cowFormData.gender}
                onChange={(e) => setCowFormData({ ...cowFormData, gender: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
              >
                <option value="Female">Female (Cow)</option>
                <option value="Male">Male (Bull / Nandi)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Health Status *
              </label>
              <select
                value={cowFormData.health_status}
                onChange={(e) => setCowFormData({ ...cowFormData, health_status: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-emerald-800"
              >
                <option value="healthy">🟢 Healthy</option>
                <option value="under_observation">🟡 Under Observation</option>
                <option value="under_treatment">🟠 Under Treatment</option>
                <option value="critical">🔴 Critical Care</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Approx Weight (kg)
              </label>
              <input
                type="number"
                value={cowFormData.weight}
                onChange={(e) => setCowFormData({ ...cowFormData, weight: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Color & Markings
              </label>
              <input
                type="text"
                value={cowFormData.color}
                onChange={(e) => setCowFormData({ ...cowFormData, color: e.target.value })}
                placeholder="e.g. Reddish with white spot"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Sanctuary Location / Shed
              </label>
              <input
                type="text"
                value={cowFormData.location}
                onChange={(e) => setCowFormData({ ...cowFormData, location: e.target.value })}
                placeholder="e.g. Shed B - Amrit Vatika"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Assigned Veterinarian
              </label>
              <input
                type="text"
                value={cowFormData.assigned_vet}
                onChange={(e) => setCowFormData({ ...cowFormData, assigned_vet: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Current Treatment / Diet Instructions
            </label>
            <input
              type="text"
              value={cowFormData.treatment}
              onChange={(e) => setCowFormData({ ...cowFormData, treatment: e.target.value })}
              placeholder="e.g. Napier grass, mustard oil massage, antibiotic wound dressing"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
            />
          </div>

          {/* Photo URL / Upload with Preview */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Cow Photograph (Upload or Image URL)
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl text-xs font-bold text-stone-700">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Photo</span>
                <input type="file" accept="image/*" onChange={handlePhotoFileChange} className="hidden" />
              </label>
              {cowPhotoPreview && (
                <img
                  src={cowPhotoPreview}
                  alt="Cow Preview"
                  className="w-12 h-12 rounded-xl object-cover border border-stone-300 shadow-sm"
                />
              )}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setIsCowModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gau-green-700 hover:bg-gau-green-800 text-white text-xs font-bold rounded-xl shadow-md"
            >
              {editingCowId ? 'Update Record' : 'Save New Cow'}
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={Boolean(deleteConfirmCow)}
        onClose={() => setDeleteConfirmCow(null)}
        title="Confirm Cow Record Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-stone-600 leading-relaxed">
            Are you sure you want to permanently delete the profile for{' '}
            <strong>{deleteConfirmCow?.name}</strong> ({deleteConfirmCow?.cow_id})? This will also remove medical and vaccination history for this cow.
          </p>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setDeleteConfirmCow(null)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleExecuteDeleteCow}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Yes, Delete Record
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
