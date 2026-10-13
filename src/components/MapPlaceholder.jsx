import React, { useState } from 'react'
import { MapPin, Navigation, ExternalLink, Layers, ZoomIn, ZoomOut } from 'lucide-react'

export const MapPlaceholder = ({
  locations = [],
  selectedId = null,
  onSelectLocation = () => {},
  centerLocation = 'Roorkee, Uttarakhand',
  height = 'h-96'
}) => {
  const [zoom, setZoom] = useState(13)
  const [mapType, setMapType] = useState('street') // 'street', 'satellite'

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden border border-stone-200 bg-[#E8ECE9] shadow-inner flex flex-col`}>
      {/* Map Header / Controls Overlay */}
      <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-2 text-xs">
        <Navigation className="w-3.5 h-3.5 text-gau-green-600" />
        <span className="font-semibold text-stone-700">{centerLocation}</span>
        <span className="text-stone-300">|</span>
        <span className="text-[11px] text-stone-500">Live Geolocation Grid</span>
      </div>

      {/* Map Tools */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        <button
          onClick={() => setZoom(z => Math.min(z + 1, 16))}
          className="p-2 bg-white rounded-lg shadow-sm hover:bg-stone-50 border border-stone-200 text-stone-700"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(z => Math.max(z - 1, 10))}
          className="p-2 bg-white rounded-lg shadow-sm hover:bg-stone-50 border border-stone-200 text-stone-700"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => setMapType(t => t === 'street' ? 'satellite' : 'street')}
          className="p-2 bg-white rounded-lg shadow-sm hover:bg-stone-50 border border-stone-200 text-stone-700"
          title="Toggle Satellite / Terrain"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Visual Cartographic Canvas */}
      <div className={`w-full h-full relative flex items-center justify-center select-none ${
        mapType === 'satellite' 
          ? 'bg-stone-800' 
          : 'bg-[#E3EBDD]'
      }`}>
        {/* Stylized road & river grid */}
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={mapType === 'satellite' ? '#555' : '#CAD2C5'} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Stylized River Yamuna */}
          <path
            d="M -50,300 C 150,220 300,320 500,240 C 700,160 850,280 1200,180"
            fill="none"
            stroke="#A3CEF1"
            strokeWidth="28"
            strokeLinecap="round"
          />
          {/* Stylized Highway */}
          <path
            d="M 100,-50 L 350,500"
            fill="none"
            stroke="#FFF"
            strokeWidth="10"
          />
          <path
            d="M 100,-50 L 350,500"
            fill="none"
            stroke="#FFB703"
            strokeWidth="3"
            strokeDasharray="6,6"
          />
          {/* Secondary road */}
          <path
            d="M 0,180 L 800,210"
            fill="none"
            stroke="#FFF"
            strokeWidth="6"
          />
        </svg>

        {/* Sanctuary Sanctuary Base Pin */}
        <div className="absolute top-[45%] left-[46%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
          <div className="w-9 h-9 rounded-full bg-gau-green-700 text-white border-2 border-white shadow-lg flex items-center justify-center animate-bounce">
            <span className="text-sm font-bold">🏠</span>
          </div>
          <span className="mt-1 px-2 py-0.5 rounded bg-gau-green-900 text-white text-[10px] font-bold shadow-md whitespace-nowrap">
            GauSeva Sanctuary HQ
          </span>
        </div>

        {/* Dynamic Location Markers for Missing Cows */}
        {locations.map((loc, idx) => {
          const isSelected = selectedId === loc.id
          // Spread pins organically across coordinates or mock grid positions
          const positions = [
            { top: '30%', left: '32%' },
            { top: '25%', left: '68%' },
            { top: '65%', left: '60%' },
            { top: '70%', left: '25%' },
            { top: '40%', left: '78%' }
          ]
          const pos = positions[idx % positions.length]

          const isFound = loc.status === 'found'
          const isSighted = loc.status === 'sighted'

          const markerBg = isFound 
            ? 'bg-emerald-600' 
            : isSighted 
            ? 'bg-amber-500' 
            : 'bg-rose-600 animate-pulse'

          return (
            <div
              key={loc.id || idx}
              onClick={() => onSelectLocation(loc)}
              style={{ top: pos.top, left: pos.left }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 group ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
            >
              <div className={`p-2 rounded-full text-white border-2 border-white shadow-xl ${markerBg}`}>
                <MapPin className="w-4 h-4" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 pointer-events-none z-30">
                <div className="bg-stone-900 text-white text-xs px-2.5 py-1 rounded-lg shadow-xl whitespace-nowrap font-medium">
                  <p className="font-bold">{loc.cow_name || loc.name || 'Missing Cow'}</p>
                  <p className="text-[10px] text-stone-300 truncate max-w-[160px]">{loc.last_seen_location}</p>
                  <p className="text-[10px] text-amber-300 font-semibold uppercase">{loc.status}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Integration note footer */}
      <div className="bg-white/95 border-t border-stone-200 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-stone-500 z-10">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500" />
          <span>Missing Marker</span>
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 ml-2" />
          <span>Sighted</span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 ml-2" />
          <span>Recovered</span>
        </div>
        <a
          href="https://maps.app.goo.gl/hzwPvoyDu5nW9D9A9"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-gau-green-700 hover:text-gau-green-800"
        >
          <span>Open Gaushala in Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}
