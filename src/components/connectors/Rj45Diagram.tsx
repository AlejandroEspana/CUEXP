import { useState } from 'react';
import { Card } from '../ui/Card';
import { RJ45_PINS, type PinDefinition } from '../../data/connectors';
import { cn } from '../layout/Layout';

export const Rj45Diagram = () => {
  const [selectedPin, setSelectedPin] = useState<PinDefinition>(RJ45_PINS[0]);
  const [activeStandard, setActiveStandard] = useState<'T568A' | 'T568B'>('T568B');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* SVG RJ45 Modular Plug (7 cols) */}
      <Card className="lg:col-span-7 p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-2xl flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 mb-4">
          <div>
            <h3 className="text-xl font-display font-black text-slate-900 uppercase tracking-wider">
              Conector Modular RJ45 (8P8C)
            </h3>
            <p className="text-sm text-slate-600 font-medium mt-0.5">8 Posiciones, 8 Contactos metálicos bañados en oro de 50µin</p>
          </div>

          <div className="flex bg-slate-100 rounded-xl p-1.5 border border-slate-200">
            <button
              onClick={() => setActiveStandard('T568A')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border",
                activeStandard === 'T568A' ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-sm ring-2 ring-sky-400/40" : "border-transparent text-slate-600 hover:text-slate-900"
              )}
            >
              T568A
            </button>
            <button
              onClick={() => setActiveStandard('T568B')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border",
                activeStandard === 'T568B' ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-sm ring-2 ring-sky-400/40" : "border-transparent text-slate-600 hover:text-slate-900"
              )}
            >
              T568B
            </button>
          </div>
        </div>

        {/* Realistic SVG RJ45 Plug Anatomy */}
        <div className="relative h-72 bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 flex items-center justify-center overflow-hidden shadow-xs">
          <svg className="w-full max-w-md h-56" viewBox="0 0 320 220">
            {/* Plastic transparent body */}
            <rect x="40" y="50" width="240" height="140" rx="12" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" fillOpacity="0.9" />

            {/* Plastic retention clip / tab at bottom */}
            <path d="M 120 190 L 120 210 L 200 210 L 200 190" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            <text x="160" y="204" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace" fontWeight="bold">PESTAÑA DE RETENCIÓN</text>

            {/* 8 Golden Contacts at top */}
            {RJ45_PINS.map((p, idx) => {
              const xPos = 60 + idx * 26;
              const isSelected = selectedPin.pin === p.pin;
              const colorHex = activeStandard === 'T568A' ? p.hexColorT568A : p.hexColorT568B;

              return (
                <g 
                  key={p.pin} 
                  className="cursor-pointer"
                  onClick={() => setSelectedPin(p)}
                >
                  {/* Pin wire trace */}
                  <rect
                    x={xPos}
                    y="80"
                    width="18"
                    height="90"
                    rx="3"
                    fill={colorHex}
                    stroke={isSelected ? '#0284c7' : '#cbd5e1'}
                    strokeWidth={isSelected ? 3 : 1}
                    className="transition-all hover:opacity-90"
                  />

                  {/* Gold contact teeth at top edge */}
                  <rect
                    x={xPos + 2}
                    y="52"
                    width="14"
                    height="24"
                    rx="2"
                    fill="#f59e0b"
                    stroke={isSelected ? '#0284c7' : '#b45309'}
                    strokeWidth={isSelected ? 2 : 1}
                  />

                  {/* Pin number */}
                  <text
                    x={xPos + 9}
                    y="69"
                    textAnchor="middle"
                    fill="#78350f"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="black"
                  >
                    {p.pin}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm font-mono text-slate-700 mt-5 pt-4 border-t-2 border-slate-100 font-bold">
          <div>Haz clic en un pin para ver su función eléctrica</div>
          <div className="text-sky-700 font-black">Estándar Activo: {activeStandard}</div>
        </div>
      </Card>

      {/* Selected Pin Details (5 cols) */}
      <Card glowColor="cyan" className="lg:col-span-5 p-6 sm:p-8 bg-white border-2 border-sky-200 shadow-lg rounded-2xl flex flex-col justify-between">
        <div className="space-y-5">
          <div className="border-b-2 border-slate-100 pb-3">
            <span className="text-xs font-mono text-sky-700 uppercase tracking-wider font-black">
              Pin #{selectedPin.pin} de 8
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">
              {activeStandard === 'T568A' ? selectedPin.colorT568A : selectedPin.colorT568B}
            </h3>
            <div className="text-sm font-mono text-slate-600 mt-1 font-bold">
              Par correspondiente: <strong className="text-slate-900 font-black">Par {activeStandard === 'T568A' ? selectedPin.pairT568A : selectedPin.pairT568B}</strong>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase text-slate-600 font-black mb-1.5">
              Función en Fast Ethernet (10/100BASE-T)
            </h5>
            <div className="p-3.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-sm font-mono text-sky-800 font-black">
              {selectedPin.signal10_100}
            </div>
            <p className="text-xs text-slate-600 mt-1.5 font-sans font-medium">
              En redes 10/100 Mbps solo se utilizan los pines 1, 2 (TX) y 3, 6 (RX). Los pines 4, 5, 7, 8 quedan sin uso de datos.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase text-emerald-700 font-black mb-1.5">
              Función en Gigabit Ethernet (1000BASE-T)
            </h5>
            <div className="p-3.5 bg-emerald-50 rounded-xl border-2 border-emerald-300 text-sm font-mono text-emerald-900 font-black">
              {selectedPin.signalGigabit}
            </div>
            <p className="text-xs text-slate-600 mt-1.5 font-sans font-medium">
              Gigabit utiliza los 4 pares simultáneamente en modo full-duplex bidireccional (híbrido-echo canceler).
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t-2 border-slate-100 text-sm font-mono text-slate-700">
          <strong className="text-sky-700 font-bold">Pares Trenzados: </strong>
          El color blanco rayado y el sólido forman un par diferencial que anula el ruido magnético por simetría.
        </div>
      </Card>
    </div>
  );
};
