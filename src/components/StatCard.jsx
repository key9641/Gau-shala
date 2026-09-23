import React from 'react'

export const StatCard = ({ icon: Icon, title, value, subtext, color = 'green', trend }) => {
  const colorMap = {
    green: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      iconBg: 'bg-emerald-600 text-white',
      accent: 'text-emerald-800'
    },
    amber: {
      bg: 'bg-amber-50 text-amber-800 border-amber-100',
      iconBg: 'bg-amber-500 text-white',
      accent: 'text-amber-900'
    },
    brown: {
      bg: 'bg-stone-50 text-stone-800 border-stone-200',
      iconBg: 'bg-[#7F4F24] text-white',
      accent: 'text-[#43281C]'
    },
    rose: {
      bg: 'bg-rose-50 text-rose-800 border-rose-100',
      iconBg: 'bg-rose-600 text-white',
      accent: 'text-rose-900'
    },
    saffron: {
      bg: 'bg-orange-50 text-orange-800 border-orange-100',
      iconBg: 'bg-orange-500 text-white',
      accent: 'text-orange-900'
    }
  }

  const theme = colorMap[color] || colorMap.green

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-0.5 bg-white border-gau-brown-200/50 shadow-soft`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-stone-500 uppercase">{title}</p>
          <h3 className={`text-2xl sm:text-3xl font-bold mt-1 font-sans ${theme.accent}`}>
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl shadow-sm ${theme.iconBg}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
      {(subtext || trend) && (
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>{subtext}</span>
          {trend && <span className="font-semibold text-emerald-600">{trend}</span>}
        </div>
      )}
    </div>
  )
}
