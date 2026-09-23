import React from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useData } from '../context/DataContext'

export const Toast = () => {
  const { toast, hideToast } = useData()

  if (!toast) return null

  const typeConfig = {
    success: {
      bg: 'bg-emerald-900/90 text-white border-emerald-700',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400'
    },
    error: {
      bg: 'bg-rose-900/90 text-white border-rose-700',
      icon: AlertCircle,
      iconColor: 'text-rose-400'
    },
    info: {
      bg: 'bg-stone-900/90 text-white border-stone-700',
      icon: Info,
      iconColor: 'text-amber-400'
    }
  }

  const conf = typeConfig[toast.type] || typeConfig.success
  const Icon = conf.icon

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 pointer-events-auto animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`p-4 rounded-xl shadow-2xl border backdrop-blur-md flex items-start gap-3 ${conf.bg}`}>
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${conf.iconColor}`} />
        <div className="flex-1 text-sm font-medium leading-snug">
          {toast.message}
        </div>
        <button
          onClick={hideToast}
          className="p-1 rounded-md text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
