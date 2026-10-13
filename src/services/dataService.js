import { supabase, isSupabaseConfigured } from './supabase'
import {
  initialCows,
  initialBreeds,
  initialMissingCows,
  initialSightings,
  initialDonations,
  initialSettings
} from '../data/mockData'

const STORAGE_KEYS = {
  COWS: 'gauseva_cows',
  BREEDS: 'gauseva_breeds',
  MISSING: 'gauseva_missing_cows',
  SIGHTINGS: 'gauseva_sightings',
  DONATIONS: 'gauseva_donations',
  ENQUIRIES: 'gauseva_enquiries',
  SETTINGS: 'gauseva_settings'
}

// Helper to get from localStorage with fallback
const getLocal = (key, fallback) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err)
    return fallback
  }
}

// Helper to save to localStorage
const setLocal = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err)
  }
}

// Initialize default data if not existing
export const initializeDataStore = () => {
  if (!localStorage.getItem(STORAGE_KEYS.COWS)) {
    setLocal(STORAGE_KEYS.COWS, initialCows)
  }
  if (!localStorage.getItem(STORAGE_KEYS.BREEDS)) {
    setLocal(STORAGE_KEYS.BREEDS, initialBreeds)
  }
  if (!localStorage.getItem(STORAGE_KEYS.MISSING)) {
    setLocal(STORAGE_KEYS.MISSING, initialMissingCows)
  }
  if (!localStorage.getItem(STORAGE_KEYS.SIGHTINGS)) {
    setLocal(STORAGE_KEYS.SIGHTINGS, initialSightings)
  }
  if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
    setLocal(STORAGE_KEYS.DONATIONS, initialDonations)
  }
  if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
    setLocal(STORAGE_KEYS.ENQUIRIES, [])
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    setLocal(STORAGE_KEYS.SETTINGS, initialSettings)
  }
}

// ---- COWS API ----
export const fetchCows = async () => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('cows').select('*')
    if (error) throw error
    return data
  }
  return getLocal(STORAGE_KEYS.COWS, initialCows)
}

export const fetchCowById = async (id) => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('cows').select('*').eq('id', id).single()
    if (error) throw error
    return data
  }
  const cows = getLocal(STORAGE_KEYS.COWS, initialCows)
  return cows.find(c => c.id === id || c.cow_id === id) || null
}

export const saveCow = async (cowData) => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('cows').insert([cowData]).select()
    if (error) throw error
    return data[0]
  }
  const cows = getLocal(STORAGE_KEYS.COWS, initialCows)
  const newCow = {
    ...cowData,
    id: cowData.id || `c_${Date.now()}`,
    medicalHistory: cowData.medicalHistory || [
      { date: new Date().toISOString().split('T')[0], status: cowData.health_status, notes: 'Registered into GauSeva sanctuary.' }
    ],
    vaccinations: cowData.vaccinations || [
      { vaccine: 'Intake Health Screening', date: new Date().toISOString().split('T')[0], nextDue: 'Standard 6 Month' }
    ]
  }
  const updated = [newCow, ...cows]
  setLocal(STORAGE_KEYS.COWS, updated)
  return newCow
}

export const updateCowRecord = async (id, cowData) => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('cows').update(cowData).eq('id', id).select()
    if (error) throw error
    return data[0]
  }
  const cows = getLocal(STORAGE_KEYS.COWS, initialCows)
  const index = cows.findIndex(c => c.id === id)
  if (index !== -1) {
    cows[index] = { ...cows[index], ...cowData }
    setLocal(STORAGE_KEYS.COWS, cows)
    return cows[index]
  }
  throw new Error('Cow not found')
}

export const deleteCowRecord = async (id) => {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('cows').delete().eq('id', id)
    if (error) throw error
    return true
  }
  const cows = getLocal(STORAGE_KEYS.COWS, initialCows)
  const filtered = cows.filter(c => c.id !== id)
  setLocal(STORAGE_KEYS.COWS, filtered)
  return true
}

// ---- BREEDS API ----
export const fetchBreeds = async () => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('breeds').select('*')
    if (error) throw error
    return data
  }
  return getLocal(STORAGE_KEYS.BREEDS, initialBreeds)
}

// ---- MISSING COWS API ----
export const fetchMissingCows = async () => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('missing_cows').select('*')
    if (error) throw error
    return data
  }
  return getLocal(STORAGE_KEYS.MISSING, initialMissingCows)
}

export const saveMissingCow = async (missingData) => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('missing_cows').insert([missingData]).select()
    if (error) throw error
    return data[0]
  }
  const items = getLocal(STORAGE_KEYS.MISSING, initialMissingCows)
  const newItem = {
    ...missingData,
    id: missingData.id || `m_${Date.now()}`,
    status: 'missing'
  }
  const updated = [newItem, ...items]
  setLocal(STORAGE_KEYS.MISSING, updated)
  return newItem
}

export const updateMissingStatus = async (id, status) => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('missing_cows').update({ status }).eq('id', id).select()
    if (error) throw error
    return data[0]
  }
  const items = getLocal(STORAGE_KEYS.MISSING, initialMissingCows)
  const idx = items.findIndex(m => m.id === id)
  if (idx !== -1) {
    items[idx].status = status
    setLocal(STORAGE_KEYS.MISSING, items)
    return items[idx]
  }
  throw new Error('Record not found')
}

// ---- SIGHTINGS API ----
export const fetchSightings = async () => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('sightings').select('*')
    if (error) throw error
    return data
  }
  return getLocal(STORAGE_KEYS.SIGHTINGS, initialSightings)
}

export const saveSighting = async (sightingData) => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('sightings').insert([sightingData]).select()
    if (error) throw error
    return data[0]
  }
  const items = getLocal(STORAGE_KEYS.SIGHTINGS, initialSightings)
  const newItem = {
    ...sightingData,
    id: `s_${Date.now()}`,
    date: new Date().toISOString().replace('T', ' ').slice(0, 16)
  }
  const updated = [newItem, ...items]
  setLocal(STORAGE_KEYS.SIGHTINGS, updated)
  return newItem
}

// ---- DONATIONS API ----
export const fetchDonations = async () => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('donations').select('*').order('date', { ascending: false })
    if (error) throw error
    return data
  }
  return getLocal(STORAGE_KEYS.DONATIONS, initialDonations)
}

export const submitDonationClaim = async (donationData) => {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('donations').insert([donationData])
    if (error) throw error
    return { ...donationData, verification_status: 'pending' }
  }
  const items = getLocal(STORAGE_KEYS.DONATIONS, initialDonations)
  const newDonation = {
    ...donationData,
    id: `d_${Date.now()}`,
    verification_status: 'pending',
    date: donationData.date || new Date().toISOString().split('T')[0]
  }
  const updated = [newDonation, ...items]
  setLocal(STORAGE_KEYS.DONATIONS, updated)
  return newDonation
}

export const updateDonationVerification = async (id, status) => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('donations').update({ verification_status: status }).eq('id', id).select()
    if (error) throw error
    return data[0]
  }
  const items = getLocal(STORAGE_KEYS.DONATIONS, initialDonations)
  const idx = items.findIndex(d => d.id === id)
  if (idx !== -1) {
    items[idx].verification_status = status
    setLocal(STORAGE_KEYS.DONATIONS, items)
    return items[idx]
  }
  throw new Error('Donation record not found')
}

// ---- ENQUIRIES API ----
export const fetchEnquiries = async () => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  }
  return getLocal(STORAGE_KEYS.ENQUIRIES, [])
}

export const saveEnquiry = async (enquiryData) => {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('enquiries').insert([enquiryData])
    if (error) throw error
    return { ...enquiryData, status: 'new' }
  }

  const enquiries = getLocal(STORAGE_KEYS.ENQUIRIES, [])
  const newEnquiry = {
    ...enquiryData,
    id: `e_${Date.now()}`,
    status: 'new',
    created_at: new Date().toISOString()
  }
  setLocal(STORAGE_KEYS.ENQUIRIES, [newEnquiry, ...enquiries])
  return newEnquiry
}

export const updateEnquiryStatus = async (id, status) => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const enquiries = getLocal(STORAGE_KEYS.ENQUIRIES, [])
  const index = enquiries.findIndex(enquiry => enquiry.id === id)
  if (index === -1) throw new Error('Enquiry not found')
  enquiries[index] = { ...enquiries[index], status }
  setLocal(STORAGE_KEYS.ENQUIRIES, enquiries)
  return enquiries[index]
}

// ---- SETTINGS API ----
export const fetchSettings = async () => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('settings').select('*')
    if (error) throw error
    return data ? data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {}) : initialSettings
  }
  return getLocal(STORAGE_KEYS.SETTINGS, initialSettings)
}

export const saveSettings = async (newSettings) => {
  if (isSupabaseConfigured) {
    // In Supabase, can update rows in settings
  }
  setLocal(STORAGE_KEYS.SETTINGS, newSettings)
  return newSettings
}

export const resetDataStore = () => {
  setLocal(STORAGE_KEYS.COWS, initialCows)
  setLocal(STORAGE_KEYS.BREEDS, initialBreeds)
  setLocal(STORAGE_KEYS.MISSING, initialMissingCows)
  setLocal(STORAGE_KEYS.SIGHTINGS, initialSightings)
  setLocal(STORAGE_KEYS.DONATIONS, initialDonations)
  setLocal(STORAGE_KEYS.ENQUIRIES, [])
  setLocal(STORAGE_KEYS.SETTINGS, initialSettings)
}
