import React from 'react'
import { Modal } from './Modal'
import { Printer, Clock, Heart } from 'lucide-react'

export const DonationReceiptModal = ({ isOpen, onClose, donation }) => {
  if (!donation) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Donation Acknowledgement" maxWidth="max-w-2xl">
      <div id="receipt-print-area" className="p-6 bg-[#FCFAF6] border-2 border-dashed border-gau-brown-200 rounded-2xl space-y-6">
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gau-brown-200 pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gau-green-700 flex items-center justify-center text-white text-xl font-bold shadow-md">
              🐄
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-gau-green-950">GauSeva Gaushala</h2>
              <p className="text-xs text-stone-600">UPI donation details acknowledgement</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
              <Clock className="w-3.5 h-3.5" />
              Pending verification
            </span>
            <p className="text-[11px] text-stone-500 mt-1">Acknowledgement #{donation.transaction_id ? donation.transaction_id.slice(-8) : Date.now().toString().slice(-8)}</p>
          </div>
        </div>

        {/* Amount Banner */}
        <div className="bg-gradient-to-r from-gau-green-700 to-gau-green-800 text-white p-5 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Amount reported by donor</p>
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
            <p className="text-stone-500 uppercase font-semibold text-[10px]">Payment status</p>
            <p className="font-bold text-amber-800 mt-0.5">Pending Gaushala verification</p>
          </div>
        </div>

        <div className="border-t border-gau-brown-200/80 pt-4 text-[11px] leading-relaxed text-stone-600">
          This acknowledges the UPI details you submitted. The payment is not confirmed until the Gaushala verifies the UTR. This is not a tax receipt.
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
