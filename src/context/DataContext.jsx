import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import * as api from '../services/dataService'

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const [cows, setCows] = useState([])
  const [breeds, setBreeds] = useState([])
  const [missingCows, setMissingCows] = useState([])
  const [sightings, setSightings] = useState([])
  const [donations, setDonations] = useState([])
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => {
      setToast(null)
    }, 4500)
  }, [])

  const hideToast = useCallback(() => {
    setToast(null)
  }, [])

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      api.initializeDataStore()

      const [cowsData, breedsData, missingData, sightingsData, donationsData, settingsData] = await Promise.all([
        api.fetchCows(),
        api.fetchBreeds(),
        api.fetchMissingCows(),
        api.fetchSightings(),
        api.fetchDonations(),
        api.fetchSettings()
      ])

      setCows(cowsData)
      setBreeds(breedsData)
      setMissingCows(missingData)
      setSightings(sightingsData)
      setDonations(donationsData)
      setSettings(settingsData)
    } catch (err) {
      console.error('Failed to load initial Gaushala data:', err)
      setError('Unable to load Gaushala records. Please refresh or try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAllData()
  }, [loadAllData])

  // Cow Operations
  const addCow = async (newCow) => {
    try {
      const added = await api.saveCow(newCow)
      setCows(prev => [added, ...prev])
      showToast(`Cow "${added.name}" registered successfully!`)
      return added
    } catch (err) {
      showToast(err.message || 'Failed to add cow', 'error')
      throw err
    }
  }

  const updateCow = async (id, updatedFields) => {
    try {
      const updated = await api.updateCowRecord(id, updatedFields)
      setCows(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c))
      showToast(`Cow details for "${updated.name || 'ID ' + id}" updated!`)
      return updated
    } catch (err) {
      showToast(err.message || 'Failed to update cow', 'error')
      throw err
    }
  }

  const deleteCow = async (id) => {
    try {
      await api.deleteCowRecord(id)
      setCows(prev => prev.filter(c => c.id !== id))
      showToast('Cow record deleted successfully.', 'info')
    } catch (err) {
      showToast(err.message || 'Failed to delete cow record', 'error')
      throw err
    }
  }

  // Missing Cow Operations
  const reportMissing = async (missingData) => {
    try {
      const added = await api.saveMissingCow(missingData)
      setMissingCows(prev => [added, ...prev])
      showToast(`Missing cow alert for "${added.cow_name || added.name}" created.`)
      return added
    } catch (err) {
      showToast(err.message || 'Failed to report missing cow', 'error')
      throw err
    }
  }

  const updateMissingStatus = async (id, status) => {
    try {
      const updated = await api.updateMissingStatus(id, status)
      setMissingCows(prev => prev.map(m => m.id === id ? { ...m, status } : m))
      showToast(`Status updated to "${status.toUpperCase()}".`)
      return updated
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error')
      throw err
    }
  }

  // Sighting Operations
  const reportSighting = async (sightingData) => {
    try {
      const added = await api.saveSighting(sightingData)
      setSightings(prev => [added, ...prev])
      showToast('Sighting reported! Thank you for helping us locate our cow.', 'success')
      return added
    } catch (err) {
      showToast(err.message || 'Failed to submit sighting', 'error')
      throw err
    }
  }

  // Donation Operations
  const submitDonation = async (donationData) => {
    try {
      const added = await api.submitDonationClaim(donationData)
      setDonations(prev => [added, ...prev])
      showToast(`Thank you ${added.donor_name}! Your donation claim of ₹${added.amount.toLocaleString('en-IN')} has been received.`, 'success')
      return added
    } catch (err) {
      showToast(err.message || 'Failed to submit donation claim', 'error')
      throw err
    }
  }

  const verifyDonation = async (id, status) => {
    try {
      await api.updateDonationVerification(id, status)
      setDonations(prev => prev.map(d => d.id === id ? { ...d, verification_status: status } : d))
      showToast(`Donation marked as ${status}.`)
    } catch (err) {
      showToast(err.message || 'Failed to update donation', 'error')
      throw err
    }
  }

  // Settings
  const updateSettings = async (newSettings) => {
    try {
      const saved = await api.saveSettings(newSettings)
      setSettings(saved)
      showToast('Gaushala settings updated successfully!')
      return saved
    } catch (err) {
      showToast(err.message || 'Failed to save settings', 'error')
      throw err
    }
  }

  const resetAllData = () => {
    api.resetDataStore()
    loadAllData()
    showToast('Database reset to original sample records.', 'info')
  }

  // Computed statistics
  const stats = {
    totalCows: cows.length,
    healthyCows: cows.filter(c => c.health_status === 'healthy').length,
    underObservation: cows.filter(c => c.health_status === 'under_observation').length,
    underTreatment: cows.filter(c => c.health_status === 'under_treatment').length,
    criticalCows: cows.filter(c => c.health_status === 'critical').length,
    missingCowsCount: missingCows.filter(m => m.status === 'missing').length,
    foundCowsCount: missingCows.filter(m => m.status === 'found').length,
    breedsCount: breeds.length,
    totalDonationsAmount: donations.reduce((sum, d) => sum + Number(d.amount || 0), 0),
    verifiedDonationsCount: donations.filter(d => d.verification_status === 'verified').length
  }

  return (
    <DataContext.Provider value={{
      cows,
      breeds,
      missingCows,
      sightings,
      donations,
      settings,
      stats,
      loading,
      error,
      toast,
      showToast,
      hideToast,
      addCow,
      updateCow,
      deleteCow,
      reportMissing,
      updateMissingStatus,
      reportSighting,
      submitDonation,
      verifyDonation,
      updateSettings,
      resetAllData,
      refreshData: loadAllData
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within a DataProvider')
  return ctx
}
