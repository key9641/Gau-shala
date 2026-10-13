import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Heart,
  Search,
  BookOpen,
  DollarSign,
  Settings as SettingsIcon,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Upload,
  Save,
  RotateCcw,
  Check,
  X,
  ExternalLink,
  Shield,
  Mail
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { GAUSHALA_CONTACT } from '../data/gaushalaContact'
import { GAUSHALA_LOCATION } from '../data/gaushalaLocation'
import { isSupabaseConfigured, supabase } from '../services/supabase'
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
    enquiries,
    settings,
    stats,
    addCow,
    updateCow,
    deleteCow,
    updateMissingStatus,
    verifyDonation,
    refreshEnquiries,
    changeEnquiryStatus,
    updateSettings,
    resetAllData,
    showToast
  } = useData()

  const { user, logout } = useAuth()

  useEffect(() => {
    refreshEnquiries().catch((err) => {
      console.error('Failed to load enquiries:', err)
      showToast(err.message || 'Could not load enquiries. Check the Supabase setup and admin access.', 'error')
    })
  }, [refreshEnquiries, showToast])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      const handleLocalEnquiryChange = (event) => {
        if (event.key === 'gauseva_enquiries') {
          refreshEnquiries().catch(err => console.error('Could not refresh local enquiries:', err))
        }
      }
      window.addEventListener('storage', handleLocalEnquiryChange)
      return () => window.removeEventListener('storage', handleLocalEnquiryChange)
    }

    const channel = supabase
      .channel('admin-enquiries')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enquiries' }, () => {
        refreshEnquiries().catch(err => console.error('Could not refresh Supabase enquiries:', err))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [refreshEnquiries])

  // Active Tab: 'overview' | 'cows' | 'missing' | 'breeds' | 'donations' | 'enquiries' | 'settings'
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
    location: 'Shed A - Main Sanctuary',
  })
  const [cowPhotoPreview, setCowPhotoPreview] = useState('')

  // Delete Confirmation Dialog
  const [deleteConfirmCow, setDeleteConfirmCow] = useState(null)

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(() => ({
    gaushala_name: settings?.gaushala_name || 'Shree Krishna GauSeva Ashram & Hospital',
    upi_id: settings?.upi_id && settings.upi_id !== 'gaushala@upi' ? settings.upi_id : GAUSHALA_CONTACT.upiId,
    phone: settings?.phone && settings.phone !== '+91 98765 43210' ? settings.phone : GAUSHALA_CONTACT.phoneNumbers[0].display,
    email: settings?.email === 'seva@gauseva.org' ? '' : settings?.email || '',
    address: settings?.address || GAUSHALA_LOCATION.address
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
      location: 'Shed A - Main Sanctuary',
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
      location: cow.location || '',
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
      ...settingsForm
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
    { id: 'missing', label: `Missing Alerts (${missingCows.length})`, icon: Search },
    { id: 'breeds', label: `Breeds (${breeds.length})`, icon: BookOpen },
    { id: 'donations', label: `Donations (${donations.length})`, icon: DollarSign },
    { id: 'enquiries', label: `Enquiries (${enquiries.filter(enquiry => enquiry.status === 'new').length})`, icon: Mail },
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
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            <StatCard icon={Heart} title="Total Cows" value={stats.totalCows} color="green" />
            <StatCard icon={Search} title="Missing" value={stats.missingCowsCount} color="rose" />
            <StatCard icon={CheckCircle2} title="Found" value={stats.foundCowsCount} color="green" />
            <StatCard icon={BookOpen} title="Breeds" value={stats.breedsCount} color="amber" />
            <StatCard icon={DollarSign} title="Total Donations" value={`₹${stats.totalDonationsAmount.toLocaleString('en-IN')}`} color="brown" />
          </div>

          {/* Quick Management Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            
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
                    <span className="text-[11px] text-stone-500">{c.breed || c.breed_name || `${c.age} years`}</span>
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

            {/* Recent Contact Enquiries */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif font-bold text-lg text-stone-900">Recent Enquiries</h3>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs text-gau-green-700 font-bold hover:underline whitespace-nowrap"
                >
                  View All ({enquiries.length})
                </button>
              </div>
              {enquiries.length ? (
                <div className="space-y-2">
                  {enquiries.slice(0, 3).map(enquiry => (
                    <button
                      key={enquiry.id}
                      onClick={() => setActiveTab('enquiries')}
                      className="w-full text-left p-3 rounded-xl bg-stone-50 border border-stone-100 hover:border-gau-green-200 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <strong className="text-stone-900 truncate">{enquiry.name}</strong>
                        <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          enquiry.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-600'
                        }`}>{enquiry.status || 'new'}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-stone-500 truncate">{enquiry.subject || 'General Inquiry'} · {enquiry.message}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-500">No enquiries received yet.</p>
              )}
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
              <p className="text-xs text-stone-500 mt-0.5">Register, update, and manage cow profiles.</p>
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
                  <th className="py-3 px-4">Assigned Location</th>
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
                    <td className="py-3 px-4 truncate max-w-[150px]">{cow.location || 'Shed A'}</td>
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

      {/* TAB: MISSING COWS & SIGHTINGS */}
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

      {/* TAB 7: CONTACT ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Contact Enquiries</h2>
              <p className="text-xs text-stone-500 mt-0.5">Messages submitted through the Contact page. Reply by phone or email.</p>
            </div>
            <button
              onClick={() => refreshEnquiries().catch(err => showToast(err.message || 'Could not refresh enquiries.', 'error'))}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors"
            >
              Refresh enquiries
            </button>
          </div>

          {enquiries.length ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {enquiries.map(enquiry => (
                <article key={enquiry.id} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-stone-900">{enquiry.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          enquiry.status === 'new' ? 'bg-amber-100 text-amber-800' :
                          enquiry.status === 'replied' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-stone-200 text-stone-700'
                        }`}>{enquiry.status || 'new'}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        {enquiry.created_at ? new Date(enquiry.created_at).toLocaleString() : 'Date unavailable'}
                      </p>
                    </div>
                    <select
                      aria-label={`Update status for ${enquiry.name}'s enquiry`}
                      value={enquiry.status || 'new'}
                      onChange={(e) => changeEnquiryStatus(enquiry.id, e.target.value).catch(() => {})}
                      className="px-2.5 py-2 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-700"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>
                  <p className="text-sm font-semibold text-gau-green-900">{enquiry.subject || 'General Inquiry'}</p>
                  <p className="text-sm text-stone-700 whitespace-pre-wrap break-words">{enquiry.message}</p>
                  <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-xs">
                    <a href={`mailto:${enquiry.email}`} className="text-gau-green-800 hover:underline break-all">{enquiry.email}</a>
                    <a href={`tel:${enquiry.phone}`} className="text-gau-green-800 hover:underline">{enquiry.phone}</a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center rounded-2xl border border-dashed border-stone-300 bg-stone-50">
              <Mail className="w-8 h-8 mx-auto text-stone-400" />
              <p className="mt-3 font-semibold text-stone-700">No enquiries yet</p>
              <p className="mt-1 text-xs text-stone-500">New messages from the Contact page will appear here.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 8: SETTINGS */}
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
                Official UPI ID (Shown beside the QR code)
              </label>
              <input
                type="text"
                value={settingsForm.upi_id}
                onChange={(e) => setSettingsForm({ ...settingsForm, upi_id: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm font-mono font-bold focus:bg-white focus:outline-none"
              />
              <p className="text-[11px] text-stone-400 mt-1">This changes the displayed UPI ID. If the linked payment account changes, replace the static QR image as well.</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <strong>{deleteConfirmCow?.name}</strong> ({deleteConfirmCow?.cow_id})? This also removes any records linked to this cow.
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
