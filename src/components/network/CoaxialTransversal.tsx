import { useState } from 'react';
import { Card } from '../ui/Card';
import { COAXIAL_LAYERS } from '../../data/rf';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Layers, Box } from 'lucide-react';
import { cn } from '../layout/Layout';

export const CoaxialTransversal = () => {
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    jacket: true,
    shield: true,
    dielectric: true,
    core: true
  });
  const [hoveredLayer, setHoveredLayer] = useState<string | null>('core');
  const [viewMode, setViewMode] = useState<'concentric' | '3d-exploded'>('3d-exploded');

  const toggleLayer = (id: string) => {
    setActiveLayers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentLayer = COAXIAL_LAYERS.find(l => l.id === (hoveredLayer || 'core'))!;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Visual Canvas & Layer Controls (7 cols) */}
      <Card className="lg:col-span-7 p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md flex flex-col justify-between rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/90 pb-4 mb-6 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
              <Layers size={22} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight">
                Análisis Físico del Cable Coaxial
              </h3>
              <span className="text-xs sm:text-sm font-mono text-slate-500 font-semibold">
                Estructura de Transmisión RF 50Ω / 75Ω
              </span>
            </div>
          </div>

          {/* Toggle View Mode (3D Exploded vs 2D Transversal) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('3d-exploded')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border",
                viewMode === '3d-exploded' ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-sm ring-2 ring-sky-400/40" : "border-transparent text-slate-600 hover:text-slate-900"
              )}
            >
              <Box size={14} className={viewMode === '3d-exploded' ? "text-sky-700" : "text-slate-600"} />
              Vista 3D
            </button>
            <button
              onClick={() => setViewMode('concentric')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border",
                viewMode === 'concentric' ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-sm ring-2 ring-sky-400/40" : "border-transparent text-slate-600 hover:text-slate-900"
              )}
            >
              <Layers size={14} className={viewMode === 'concentric' ? "text-sky-700" : "text-slate-600"} />
              Corte 2D
            </button>
          </div>
        </div>

        {/* View Canvas */}
        <div className="relative h-80 flex items-center justify-center my-auto bg-slate-50 rounded-2xl border border-slate-200/80 p-6 overflow-hidden">
          {viewMode === 'concentric' ? (
            /* Concentric Circle 2D Canvas */
            <svg className="w-72 h-72 overflow-visible" viewBox="0 0 300 300">
              {/* Guidelines */}
              <line x1="0" y1="150" x2="300" y2="150" stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="1.5" />
              <line x1="150" y1="0" x2="150" y2="300" stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="1.5" />

              {/* Layer 1: Jacket */}
              {activeLayers.jacket && (
                <motion.circle
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  cx="150"
                  cy="150"
                  r="135"
                  fill="#475569"
                  stroke={hoveredLayer === 'jacket' ? '#0284c7' : '#334155'}
                  strokeWidth={hoveredLayer === 'jacket' ? 4 : 2}
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredLayer('jacket')}
                />
              )}

              {/* Layer 2: Shield / Braid */}
              {activeLayers.shield && (
                <motion.circle
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  cx="150"
                  cy="150"
                  r="115"
                  fill="#64748b"
                  stroke={hoveredLayer === 'shield' ? '#0284c7' : '#94a3b8'}
                  strokeWidth={hoveredLayer === 'shield' ? 4 : 2}
                  strokeDasharray="6 3"
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredLayer('shield')}
                />
              )}

              {/* Layer 3: Dielectric */}
              {activeLayers.dielectric && (
                <motion.circle
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  cx="150"
                  cy="150"
                  r="85"
                  fill="#e2e8f0"
                  stroke={hoveredLayer === 'dielectric' ? '#0284c7' : '#cbd5e1'}
                  strokeWidth={hoveredLayer === 'dielectric' ? 4 : 2}
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredLayer('dielectric')}
                />
              )}

              {/* Layer 4: Center Core */}
              {activeLayers.core && (
                <motion.circle
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  cx="150"
                  cy="150"
                  r="30"
                  fill="#d97706"
                  stroke={hoveredLayer === 'core' ? '#0284c7' : '#b45309'}
                  strokeWidth={hoveredLayer === 'core' ? 4 : 2}
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredLayer('core')}
                />
              )}

              <text x="150" y="155" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="monospace">
                Cu
              </text>
            </svg>
          ) : (
            /* 3D Exploded Isometric Perspective */
            <div className="relative w-full h-full flex items-center justify-center perspective-1000">
              <svg className="w-full max-w-lg h-64 overflow-visible" viewBox="0 0 500 240">
                <defs>
                  <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="50%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                  <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#64748b" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>
                  <linearGradient id="dielectricGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#f1f5f9" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                  <linearGradient id="coreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#92400e" />
                  </linearGradient>
                </defs>

                {/* Layer 1: Outer Jacket Tube */}
                {activeLayers.jacket && (
                  <g 
                    className="cursor-pointer transition-transform" 
                    onMouseEnter={() => setHoveredLayer('jacket')}
                  >
                    <path d="M 40 40 L 160 40 L 160 200 L 40 200 Z" fill="url(#jacketGrad)" stroke="#334155" strokeWidth="2" />
                    <ellipse cx="40" cy="120" rx="20" ry="80" fill="#334155" stroke="#475569" />
                    <ellipse cx="160" cy="120" rx="20" ry="80" fill="#475569" stroke="#38bdf8" strokeWidth={hoveredLayer === 'jacket' ? 3 : 1} />
                    <text x="100" y="30" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold" fontFamily="monospace">
                      Cubierta PVC (1)
                    </text>
                  </g>
                )}

                {/* Layer 2: Mesh Shield Tube */}
                {activeLayers.shield && (
                  <g 
                    className="cursor-pointer" 
                    onMouseEnter={() => setHoveredLayer('shield')}
                  >
                    <path d="M 160 60 L 260 60 L 260 180 L 160 180 Z" fill="url(#shieldGrad)" stroke="#475569" strokeWidth="1.5" />
                    <ellipse cx="260" cy="120" rx="16" ry="60" fill="#64748b" stroke="#38bdf8" strokeWidth={hoveredLayer === 'shield' ? 3 : 1} />
                    {/* Braid Pattern Lines */}
                    <line x1="170" y1="65" x2="250" y2="175" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                    <line x1="170" y1="175" x2="250" y2="65" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                    <text x="210" y="50" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold" fontFamily="monospace">
                      Malla Faraday (2)
                    </text>
                  </g>
                )}

                {/* Layer 3: Dielectric Insulator */}
                {activeLayers.dielectric && (
                  <g 
                    className="cursor-pointer" 
                    onMouseEnter={() => setHoveredLayer('dielectric')}
                  >
                    <path d="M 260 80 L 370 80 L 370 160 L 260 160 Z" fill="url(#dielectricGrad)" stroke="#94a3b8" strokeWidth="1.5" />
                    <ellipse cx="370" cy="120" rx="14" ry="40" fill="#f8fafc" stroke="#38bdf8" strokeWidth={hoveredLayer === 'dielectric' ? 3 : 1} />
                    <text x="315" y="70" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold" fontFamily="monospace">
                      Dieléctrico PTFE (3)
                    </text>
                  </g>
                )}

                {/* Layer 4: Copper Core */}
                {activeLayers.core && (
                  <g 
                    className="cursor-pointer" 
                    onMouseEnter={() => setHoveredLayer('core')}
                  >
                    <path d="M 370 105 L 470 105 L 470 135 L 370 135 Z" fill="url(#coreGrad)" stroke="#92400e" strokeWidth="1.5" />
                    <ellipse cx="470" cy="120" rx="8" ry="15" fill="#f59e0b" stroke="#38bdf8" strokeWidth={hoveredLayer === 'core' ? 3 : 1} />
                    <text x="420" y="95" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="bold" fontFamily="monospace">
                      Núcleo Cu (4)
                    </text>
                  </g>
                )}
              </svg>
            </div>
          )}
        </div>

        {/* Layer Visibility Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-slate-200">
          {COAXIAL_LAYERS.map((layer) => {
            const isVisible = activeLayers[layer.id];
            return (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                className={cn(
                  "p-3 rounded-2xl border text-xs sm:text-sm font-mono flex items-center justify-between transition-all font-bold shadow-xs",
                  isVisible
                    ? "bg-sky-50 border-sky-300 text-sky-950"
                    : "bg-slate-100/60 border-slate-200 text-slate-400 opacity-60"
                )}
              >
                <span className="truncate mr-1">{layer.name.split(' ')[0]}</span>
                {isVisible ? <Eye size={16} className="text-sky-600 flex-shrink-0" /> : <EyeOff size={16} className="text-slate-400 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Layer Details & Physics Panel (5 cols) */}
      <Card glowColor="primary" className="lg:col-span-5 p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md flex flex-col justify-between rounded-3xl">
        <div className="space-y-5">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono text-sky-700 uppercase tracking-wider font-extrabold block">
              Capa Seleccionada
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">
              {currentLayer.name}
            </h3>
            <div className="text-sm font-mono text-slate-600 mt-1.5">
              Espesor típico: <strong className="text-slate-900 font-bold">{currentLayer.thickness}</strong>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase text-slate-500 font-extrabold mb-1.5">
              Material de Construcción
            </h5>
            <p className="text-slate-800 text-sm sm:text-base font-mono bg-slate-50 p-3 rounded-xl border border-slate-200 font-semibold">
              {currentLayer.material}
            </p>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase text-sky-700 font-extrabold mb-1.5">
              Función Física en la Transmisión
            </h5>
            <p className="text-slate-700 text-base leading-relaxed bg-sky-50/60 p-4 rounded-xl border border-sky-200/80 font-normal">
              {currentLayer.function}
            </p>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase text-amber-700 font-extrabold mb-1.5">
              Ecuación de Impedancia Característica RF
            </h5>
            <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-300 text-base font-mono font-bold text-amber-950 shadow-xs">
              Z₀ = (138 / √εr) · log₁₀(D / d)
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Donde <strong className="text-slate-900">D</strong> es el diámetro interior del blindaje, <strong className="text-slate-900">d</strong> el diámetro del núcleo conductor y <strong className="text-slate-900">εr</strong> la permitividad dieléctrica.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 text-sm font-mono text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <strong className="text-sky-700 font-extrabold">Efecto Pelicular (Skin Effect): </strong>
          A altas frecuencias de RF (MHz/GHz), la corriente electromagnética viaja confinada a una profundidad micrométrica superficial en la piel del conductor.
        </div>
      </Card>
    </div>
  );
};
