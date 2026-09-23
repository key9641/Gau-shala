import React from 'react'
import { Modal } from './Modal'
import { Download, Printer, CheckCircle, ShieldCheck, Heart } from 'lucide-react'

export const DonationReceiptModal = ({ isOpen, onClose, donation }) => {
  if (!donation) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Official Donation Receipt & 80G Acknowledgment" maxWidth="max-w-2xl">
      <div id="receipt-print-area" className="p-6 bg-[#FCFAF6] border-2 border-dashed border-gau-brown-200 rounded-2xl space-y-6">
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gau-brown-200 pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gau-green-700 flex items-center justify-center text-white text-xl font-bold shadow-md">
              🐄
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-gau-green-950">GauSeva Gaushala Trust</h2>
              <p className="text-xs text-stone-600">Registered Sanctuary & Animal Welfare Charitable Trust</p>
              <p className="text-[11px] text-amber-700 font-semibold">Income Tax 80G Exemption Ref: GAUSEVA/80G/2021/UP-091</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
              <CheckCircle className="w-3.5 h-3.5" />
              Acknowledged
            </span>
            <p className="text-[11px] text-stone-500 mt-1">Receipt #{donation.transaction_id ? donation.transaction_id.slice(-8) : Date.now().toString().slice(-8)}</p>
          </div>
        </div>

        {/* Amount Banner */}
        <div className="bg-gradient-to-r from-gau-green-700 to-gau-green-800 text-white p-5 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Donation Amount Received</p>
            <h1 className="text-3xl font-extrabold mt-0.5">₹{Number(donation.amount || 0).toLocaleString('en-IN')}</h1>
          </div>
          <Heart className="w-10 h-10 fill-amber-400 text-amber-400 opacity-90" />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-stone-200">
            <p className="text-stone-500 uppercase font-semibold text-[10px]">Donor Name</p>
            <p className="font-bold text-stone-900 text-sm mt-0.5">{donation.donor_name || 'Generous Gau-Bhakt'}</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-stone-200">
            <p className="text-stone-500 uppercase font-semibold text-[10px]">Date of Seva</p>
            <p className="font-bold text-stone-900 text-sm mt-0.5">{donation.date || new Date().toISOString().split('T')[0]}</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-stone-200">
            <p className="text-stone-500 uppercase font-semibold text-[10px]">Transaction ID / UTR</p>
            <p className="font-mono font-bold text-stone-900 mt-0.5 truncate">{donation.transaction_id || 'N/A'}</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-stone-200">
            <p className="text-stone-500 uppercase font-semibold text-[10px]">Purpose / Seva Type</p>
            <p className="font-bold text-stone-900 mt-0.5">{donation.category || 'Green Fodder & Medical Care'}</p>
          </div>
        </div>

        {donation.message && (
          <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 text-xs italic text-amber-900">
            "{donation.message}"
          </div>
        )}

        {/* Trust Stamp & Note */}
        <div className="border-t border-gau-brown-200/80 pt-4 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5 text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Eligible for 50% Tax Deduction under 80G</span>
          </div>
          <div className="text-right">
            <p className="font-serif italic font-bold text-gau-brown-800">Authorized Signatory</p>
            <p className="text-[10px] text-stone-400">GauSeva Sanctuary Trust</p>
          </div>
        </div>
      </div>

      {/* Modal Actions */}
      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors"
        >
          Close
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-gau-green-700 hover:bg-gau-green-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save Receipt</span>
        </button>
      </div>
    </Modal>
  )
}
