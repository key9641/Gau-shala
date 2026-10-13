import React, { useState } from 'react'
import {
  Heart,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  FileCheck,
  TrendingUp
} from 'lucide-react'
import { Link } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { useData } from '../context/DataContext'
import { GAUSHALA_CONTACT } from '../data/gaushalaContact'
import { Modal } from '../components/Modal'
import { DonationReceiptModal } from '../components/DonationReceiptModal'

export const Donate = () => {
  const { settings, donations, submitDonation, showToast } = useData()
  
  const [copiedUPI, setCopiedUPI] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [createdDonation, setCreatedDonation] = useState(null)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const verifiedDonations = donations.filter(d => d.verification_status === 'verified')

  // Donor-submitted UPI details for an acknowledgement receipt.
  const [formData, setFormData] = useState({
    donor_name: '',
    amount: '',
    transaction_id: ''
  })

  const upiId = settings?.upi_id && settings.upi_id !== 'gaushala@upi' ? settings.upi_id : GAUSHALA_CONTACT.upiId

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId)
    setCopiedUPI(true)
    showToast('UPI ID copied to clipboard!')
    setTimeout(() => setCopiedUPI(false), 2500)
  }

  const handleOpenDonateModal = () => {
    setFormData(prev => ({
      ...prev,
      amount: '',
      transaction_id: ''
    }))
    setIsSubmitModalOpen(true)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!formData.donor_name || !formData.amount || !formData.transaction_id) {
      showToast('Please fill in Name, Amount, and Transaction ID / UTR.', 'error')
      return
    }

    try {
      const newDonation = await submitDonation({
        donor_name: formData.donor_name.trim(),
        amount: Number(formData.amount),
        transaction_id: formData.transaction_id.trim(),
        date: new Date().toISOString().split('T')[0]
      })

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      })

      setIsSubmitModalOpen(false)
      setCreatedDonation(newDonation)
      setIsReceiptModalOpen(true)
    } catch (err) {
      // Handled in context
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Top Title Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/70 border border-amber-200 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Direct UPI Donations</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">
          Support Our Gaushala
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Your contribution supports food, medical care, and shelter for the cows.
        </p>
        <Link to="/donate-a-cow" className="inline-flex items-center gap-2 text-sm font-bold text-gau-green-800 hover:text-gau-green-950">
          <span>Want to donate a cow instead?</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Official QR and UPI donation */}
      <div className="max-w-xl mx-auto bg-gradient-to-b from-gau-cream/70 to-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-soft space-y-6 text-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Gaushala UPI
            </span>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mt-2">
              Scan & Donate
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Use Google Pay, PhonePe, Paytm, BHIM, or any banking UPI app.
            </p>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-3xl border-2 border-stone-200 shadow-md mx-auto max-w-[420px] w-full">
            <img
              src="/images/gaushala-upi-qr.jpeg"
              alt="Official UPI QR code for Gau Shala Sabha Roorkee"
              className="block h-auto w-full rounded-xl"
              loading="eager"
              decoding="async"
            />
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-center gap-1.5 text-xs font-bold text-gau-green-800">
              <span>Scan with any UPI app</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          {/* UPI ID Display & Copy Button */}
          <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 flex items-center justify-between gap-3 text-left">
            <div>
              <p className="text-[10px] text-stone-500 uppercase font-bold">Gaushala Official UPI ID</p>
              <p className="font-mono font-extrabold text-stone-900 text-sm tracking-wide">{upiId}</p>
            </div>
            <button
              onClick={handleCopyUPI}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                copiedUPI
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {copiedUPI ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUPI ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Submit payment details to request an acknowledgement. */}
          <div>
            <button
              onClick={handleOpenDonateModal}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gau-green-700 hover:bg-gau-green-800 shadow-sm transition-colors"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Paid — get acknowledgement</span>
            </button>
          </div>

          {/* Verification Disclaimer */}
          <p className="text-[11px] text-stone-500 italic bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
            Your details are marked pending until the Gaushala checks the UTR. This form does not verify payment automatically.
          </p>
      </div>

      {/* Verified Donation Ledger */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gau-green-700">Transparency & Seva</span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">Verified Donations</h3>
            <p className="text-xs text-stone-500">Only donations checked by the Gaushala are included here.</p>
          </div>
          <div className="bg-emerald-50 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl border border-emerald-200 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Verified total: ₹{verifiedDonations.reduce((sum, d) => sum + Number(d.amount || 0), 0).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {verifiedDonations.slice(0, 6).map((d) => (
            <div key={d.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 hover:border-gau-green-300 transition-colors flex flex-col justify-between space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gau-green-100 text-gau-green-800 font-bold flex items-center justify-center text-xs">
                    {d.donor_name ? d.donor_name.charAt(0).toUpperCase() : 'G'}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{d.donor_name}</h4>
                    <p className="text-[11px] text-stone-500">{d.date}</p>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-gau-green-800">
                  ₹{Number(d.amount).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-emerald-800 font-semibold">Verified by the Gaushala</span>
              </div>
            </div>
          ))}
          {verifiedDonations.length === 0 && (
            <p className="col-span-full rounded-2xl bg-stone-50 p-5 text-sm text-stone-600">Verified donation records will appear here.</p>
          )}
        </div>
      </div>

      {/* Donor UTR Submission Form */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit UPI payment details"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <p className="text-xs text-stone-600 leading-relaxed bg-amber-50 p-3 rounded-xl border border-amber-200">
            After paying, enter the amount and UTR shown in your UPI app. We will create an acknowledgement while the Gaushala checks the payment.
          </p>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.donor_name}
              onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
              placeholder="e.g. Ramesh Chandra Sharma"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Amount you paid (₹) *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              UPI transaction reference (UTR) *
            </label>
            <input
              type="text"
              required
              value={formData.transaction_id}
              onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
              placeholder="Copy the reference number from your UPI app"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-gau-green-700 hover:bg-gau-green-800 rounded-xl shadow-md transition-colors"
            >
              Submit & generate acknowledgement
            </button>
          </div>
        </form>
      </Modal>

      {/* Printable Receipt Modal */}
      <DonationReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        donation={createdDonation}
      />
    </div>
  )
}
