import React, { useState } from 'react'
import {
  Heart,
  QrCode,
  Copy,
  Check,
  Download,
  ShieldCheck,
  Sparkles,
  FileCheck,
  HelpCircle,
  TrendingUp,
  User
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { useData } from '../context/DataContext'
import { Modal } from '../components/Modal'
import { DonationReceiptModal } from '../components/DonationReceiptModal'

export const Donate = () => {
  const { settings, donations, submitDonation, showToast } = useData()
  
  const [selectedAmount, setSelectedAmount] = useState(501)
  const [customAmount, setCustomAmount] = useState('')
  const [copiedUPI, setCopiedUPI] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [createdDonation, setCreatedDonation] = useState(null)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)

  // Form fields for "I Have Donated"
  const [formData, setFormData] = useState({
    donor_name: '',
    amount: '501',
    transaction_id: '',
    date: new Date().toISOString().split('T')[0],
    message: '',
    category: 'Gau-Gras (Green Fodder)'
  })

  const presetAmounts = [101, 501, 1001, 2501]

  const upiId = settings?.upi_id || 'gaushala@upi'
  const qrImageUrl = settings?.qr_code_image || `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=${encodeURIComponent(upiId)}&pn=GauSeva%20Gaushala&cu=INR`

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId)
    setCopiedUPI(true)
    showToast('UPI ID copied to clipboard!')
    setTimeout(() => setCopiedUPI(false), 2500)
  }

  const handleDownloadQR = () => {
    const link = document.createElement('a')
    link.href = qrImageUrl
    link.download = 'GauSeva_Gaushala_UPI_QR.png'
    link.target = '_blank'
    link.click()
    showToast('QR Code download started.')
  }

  const handleSelectPreset = (amount) => {
    setSelectedAmount(amount)
    setCustomAmount('')
    setFormData(prev => ({ ...prev, amount: amount.toString() }))
  }

  const handleCustomAmountChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '')
    setCustomAmount(val)
    setSelectedAmount(null)
    setFormData(prev => ({ ...prev, amount: val }))
  }

  const handleOpenDonateModal = () => {
    const finalAmount = selectedAmount || Number(customAmount) || 501
    setFormData(prev => ({
      ...prev,
      amount: finalAmount.toString(),
      transaction_id: prev.transaction_id || `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`
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
        date: formData.date,
        message: formData.message.trim(),
        category: formData.category
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
          <span>Charitable Giving & 80G Tax Exemption</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">
          Support Our Gaushala
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Your voluntary donation feeds pure green napier grass, provides hospital medicines for injured cows, and expands compassionate sanctuary shelter.
        </p>
      </div>

      {/* Main Donation Grid: Left Amount Choice / Right QR Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Col: Choose Amount & Seva Type (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-8">
          <div>
            <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-600 fill-amber-600" />
              <span>Select Contribution Amount</span>
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Choose a predefined seva amount or enter your custom prayer contribution.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {presetAmounts.map((amt) => {
              const isSelected = selectedAmount === amt
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleSelectPreset(amt)}
                  className={`py-4 px-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-gau-green-700 text-white border-gau-green-800 shadow-md ring-2 ring-gau-green-500/30 font-bold scale-[1.02]'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200 hover:border-gau-green-400'
                  }`}
                >
                  <span className="text-xs uppercase font-semibold opacity-75">Gau-Sewa</span>
                  <span className="text-xl font-extrabold font-sans">₹{amt.toLocaleString('en-IN')}</span>
                </button>
              )
            })}
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Or Enter Custom Amount (₹)
            </label>
            <div className="relative rounded-2xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 font-bold text-lg">
                ₹
              </div>
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="e.g. 5,001 or 11,000"
                className="w-full pl-9 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 font-bold text-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Impact Breakdown Table */}
          <div className="bg-gau-cream/40 p-4 rounded-2xl border border-gau-brown-200/50 space-y-2 text-xs">
            <p className="font-bold text-stone-800 uppercase tracking-wide text-[11px]">Your Seva Impact</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gau-green-600" />
                <span>₹101 = 1 Full Day Green Fodder</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gau-green-600" />
                <span>₹501 = Fodder + Jaggery for 5 Cows</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span>₹1,001 = Emergency Wound & Fracture Kit</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span>₹2,501 = 1 Month Senior Cow Sponsorship</span>
              </div>
            </div>
          </div>

          {/* Large CTA Button */}
          <button
            type="button"
            onClick={handleOpenDonateModal}
            className="w-full py-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 hover:from-amber-700 hover:to-orange-600 shadow-warm hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Heart className="w-6 h-6 fill-white text-white animate-pulse" />
            <span>
              Proceed to Donate ₹{Number(selectedAmount || customAmount || 501).toLocaleString('en-IN')}
            </span>
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Tax Deductible (80G)
            </span>
            <span>Direct Bank & UPI Transfer</span>
          </div>
        </div>

        {/* Right Col: QR Code Section (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-gau-cream/70 to-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-soft space-y-6 text-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Direct Zero-Fee UPI
            </span>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mt-2">
              Scan & Donate
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Use Google Pay, PhonePe, Paytm, BHIM, or any banking UPI app.
            </p>
          </div>

          {/* QR Code Container */}
          <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-md inline-block mx-auto max-w-[280px] w-full">
            <img
              src={qrImageUrl}
              alt="GauSeva Official UPI QR Code"
              className="w-full aspect-square object-contain rounded-xl"
            />
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-center gap-1.5 text-xs font-bold text-gau-green-800">
              <span>BHIM UPI Verified</span>
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

          {/* Actions: Download QR & "I Have Donated" */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleDownloadQR}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download QR</span>
            </button>

            <button
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  amount: (selectedAmount || customAmount || 501).toString()
                }))
                setIsSubmitModalOpen(true)
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gau-green-700 hover:bg-gau-green-800 shadow-sm transition-colors"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>I Have Donated</span>
            </button>
          </div>

          {/* Verification Disclaimer */}
          <p className="text-[11px] text-stone-500 italic bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
            * Payments submitted via the form are logged into our public donor ledger. Official automated payment gateways can also be connected seamlessly.
          </p>
        </div>

      </div>

      {/* Transparent Donation Ledger / Recent Benefactors */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gau-green-700">Transparency & Seva</span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">Recent Contributors & Donors</h3>
            <p className="text-xs text-stone-500">Every single rupee is utilized directly for cow food, veterinary medicine, and shelter.</p>
          </div>
          <div className="bg-emerald-50 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl border border-emerald-200 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Total Raised: ₹{donations.reduce((sum, d) => sum + Number(d.amount || 0), 0).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donations.slice(0, 6).map((d) => (
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
              {d.message && (
                <p className="text-xs text-stone-600 italic bg-white p-2 rounded-lg border border-stone-100 line-clamp-2">
                  "{d.message}"
                </p>
              )}
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-stone-500">{d.category || 'General Seva'}</span>
                <span className={`font-semibold capitalize px-2 py-0.5 rounded-full ${
                  d.verification_status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {d.verification_status || 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "I Have Donated" Submission Modal Form */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Record Your Donation & Claim Receipt"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <p className="text-xs text-stone-600 leading-relaxed bg-amber-50 p-3 rounded-xl border border-amber-200">
            Please enter your transfer details after completing your payment via UPI. We will generate your official acknowledgment receipt instantly.
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Amount Donated (₹) *
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
                Date of Transfer *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              UPI Reference / Transaction ID (UTR) *
            </label>
            <input
              type="text"
              required
              value={formData.transaction_id}
              onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
              placeholder="12-digit UTR from your bank/UPI app"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Purpose / Seva Type
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
            >
              <option value="Gau-Gras (Green Fodder)">Gau-Gras (Fresh Green Fodder)</option>
              <option value="Medical & Surgery Fund">Medical & Surgery Hospital Care</option>
              <option value="Senior Cow Adoption">Senior / Disabled Cow Adoption</option>
              <option value="Shed Infrastructure">Shed & Drinking Water Tank Expansion</option>
              <option value="General Seva">General Sanctuary Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Personal Prayer / Message (Optional)
            </label>
            <textarea
              rows="2"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="e.g. Dedicated to my parents, or prayer for peace"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gau-green-500"
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
              Confirm & Generate Receipt
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
