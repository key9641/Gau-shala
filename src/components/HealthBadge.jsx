import React from 'react'
import { Activity, AlertCircle, CheckCircle2, Eye, ShieldAlert, HeartPulse } from 'lucide-react'

export const HealthBadge = ({ status, size = 'md' }) => {
  const normalized = (status || '').toLowerCase().trim().replace(/ /g, '_')

  const configs = {
    healthy: {
      label: 'Healthy',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
      emoji: '🟢'
    },
    under_observation: {
      label: 'Under Observation',
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-500',
      icon: Eye,
      emoji: '🟡'
    },
    under_treatment: {
      label: 'Under Treatment',
      bg: 'bg-orange-50 text-orange-700 border-orange-200',
      dot: 'bg-orange-500',
      icon: Activity,
      emoji: '🟠'
    },
    critical: {
      label: 'Critical Care',
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-500 animate-pulse',
      icon: ShieldAlert,
      emoji: '🔴'
    },
    // Missing cow statuses
    missing: {
      label: 'Missing Alert',
      bg: 'bg-rose-100 text-rose-800 border-rose-300',
      dot: 'bg-rose-600 animate-ping',
      icon: AlertCircle,
      emoji: '🔴'
    },
    sighted: {
      label: 'Sighted',
      bg: 'bg-amber-100 text-amber-800 border-amber-300',
      dot: 'bg-amber-500',
      icon: Eye,
      emoji: '🟡'
    },
    found: {
      label: 'Found & Safe',
      bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      dot: 'bg-emerald-600',
      icon: CheckCircle2,
      emoji: '🟢'
    }
  }

  const conf = configs[normalized] || {
    label: status || 'Unknown',
    bg: 'bg-gray-100 text-gray-700 border-gray-200',
    dot: 'bg-gray-400',
    icon: Activity,
    emoji: '⚪'
  }

  const Icon = conf.icon
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs font-medium gap-1' 
    : size === 'lg'
    ? 'px-3.5 py-1.5 text-sm font-semibold gap-2'
    : 'px-2.5 py-1 text-xs font-semibold gap-1.5'

  return (
    <span className={`inline-flex items-center rounded-full border shadow-sm ${conf.bg} ${sizeClasses}`}>
      <span className={`w-2 h-2 rounded-full ${conf.dot}`} />
      <Icon className="w-3.5 h-3.5 opacity-80" />
      <span>{conf.label}</span>
    </span>
  )
}
