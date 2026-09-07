import { useState } from 'react';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { Cable, Radio } from 'lucide-react';
import { cn } from '../layout/Layout';

export const GuidedVsUnguidedDiagram = () => {
  const [selectedGuided, setSelectedGuided] = useState<'utp' | 'coaxial' | 'rg8' | 'heliax' | 'fiber' | 'waveguide'>('utp');
  const [selectedUnguided, setSelectedUnguided] = useState<'wifi' | 'radio' | 'microwave'>('wifi');

  const guidedItems = [
    { id: 'utp', name: 'UTP / STP', speed: '1 - 10 Gbps', distance: '100 m', desc: 'Pares de cobre trenzados diferenciales.' },
    { id: 'coaxial', name: 'Coaxial Estándar', speed: '100 Mbps - 1 Gbps', distance: '500 m', desc: 'Conductores concéntricos apantallados.' },
    { id: 'rg8', name: 'RG-8 (10BASE5)', speed: '10 Mbps / RF', distance: '500 m', desc: 'Coaxial grueso histórico para Ethernet y RF.' },
    { id: 'heliax', name: 'Heliax® Corrugado', speed: 'Alta potencia RF', distance: '100 m en mástil', desc: 'Cobre macizo corrugado para torres celulares.' },
    { id: 'fiber', name: 'Fibra Óptica (SMF/MMF)', speed: '10G - 400 Gbps', distance: 'Hasta 120 km', desc: 'Vidrio de sílice con pulsos de luz.' },
    { id: 'waveguide', name: 'Guía de Onda Metálica', speed: 'Microondas / Radar', distance: 'Decenas de metros', desc: 'Tubo hueco metálico sin pérdidas dieléctricas.' },
  ];

  const unguidedItems = [
    { id: 'wifi', name: 'Wi-Fi (802.11ax/be)', speed: 'Hasta 9.6 - 46 Gbps', distance: '15 - 50 m', desc: 'LAN inalámbrica en 2.4, 5 y 6 GHz.' },
    { id: 'radio', name: 'Radiofrecuencia Terrestre', speed: 'Kbps - Mbps', distance: 'Cientos de km', desc: 'Propagación ionosférica y de superficie.' },
    { id: 'microwave', name: 'Microondas Terrestres / Satélite', speed: '100 Mbps - 10 Gbps', distance: '10 - 50 km (LOS)', desc: 'Enlaces directos punto a punto con parábolas.' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* PANEL 1: GUIADOS */}
      <Card glowColor="cyan" className="flex flex-col gap-6 p-6 sm:p-8 bg-white border-2 border-sky-200 shadow-lg rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-sky-100 text-sky-700 shadow-inner">
              <Cable size={26} />
            </div>
            <div>
              <h3 className="text-2xl font-display font-black text-slate-900">Medios Guiados (Confinados)</h3>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Las ondas están físicamente contenidas dentro de un sólido conductor o dieléctrico</p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-300 font-bold whitespace-nowrap self-start sm:self-auto">
            Point-to-Point Físico
          </span>
        </div>

        {/* Guided Signal Animation Visualizer */}
        <div className="relative h-32 bg-slate-50 rounded-2xl border-2 border-slate-200 overflow-hidden flex items-center justify-between px-6 shadow-xs">
          <div className="text-xs font-mono font-black text-sky-800 z-10 bg-white px-3 py-1 rounded-xl border border-sky-300 shadow-sm">TX</div>
          
          {/* Signal wave depending on selected medium */}
          <div className="absolute inset-x-16 top-0 bottom-0 flex items-center justify-center">
            {selectedGuided === 'fiber' ? (
              // Sharp light pulses traversing full channel
              <div className="w-full h-3 bg-sky-100 relative overflow-hidden rounded-full border border-sky-300">
                <motion.div
                  animate={{ left: ['-30%', '105%'] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_#0284c7] rounded-full"
                />
              </div>
            ) : selectedGuided === 'waveguide' ? (
              // Waveguide TE10 electromagnetic standing wave simulation
              <svg className="w-full h-20 overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 60">
                <motion.path
                  d="M 0 30 Q 50 5, 100 30 T 200 30 T 300 30 T 400 30"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3.5"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -200 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                  strokeDasharray="20 8"
                  className="drop-shadow-[0_0_8px_rgba(2,132,199,0.7)]"
                />
              </svg>
            ) : (
              // Electrical differential wave
              <div className="w-full flex items-center justify-between px-4">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [0.4, 2.8, 0.4], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
                    className="w-2.5 h-8 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="text-xs font-mono font-black text-emerald-800 z-10 bg-white px-3 py-1 rounded-xl border border-emerald-300 shadow-sm">RX</div>
        </div>

        {/* Guided list selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {guidedItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedGuided(item.id as any)}
              className={cn(
                "p-3.5 rounded-xl border-2 text-left transition-all",
                selectedGuided === item.id
                  ? "bg-sky-100 border-sky-600 text-sky-950 ring-2 ring-sky-400/40 shadow-md font-black"
                  : "bg-slate-50 border-slate-200 hover:border-sky-300 hover:bg-white text-slate-700"
              )}
            >
              <div className="text-sm font-mono font-black">{item.name}</div>
              <div className="text-xs text-sky-700 font-bold mt-1">{item.speed}</div>
              <div className="text-xs text-slate-500 font-medium">{item.distance}</div>
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="text-sm sm:text-base text-slate-800 bg-sky-50/80 p-4 rounded-xl border-2 border-sky-200 font-sans leading-relaxed">
          <strong className="text-sky-950 font-black">Detalle técnico: </strong>
          {guidedItems.find(g => g.id === selectedGuided)?.desc}
        </div>
      </Card>

      {/* PANEL 2: NO GUIADOS */}
      <Card glowColor="purple" className="flex flex-col gap-6 p-6 sm:p-8 bg-white border-2 border-purple-200 shadow-lg rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-100 text-purple-700 shadow-inner">
              <Radio size={26} />
            </div>
            <div>
              <h3 className="text-2xl font-display font-black text-slate-900">Medios No Guiados (Inalámbricos)</h3>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Las ondas electromagnéticas se radian libremente por la atmósfera o el vacío</p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-300 font-bold whitespace-nowrap self-start sm:self-auto">
            Medio Compartido
          </span>
        </div>

        {/* Unguided Signal Animation Visualizer */}
        <div className="relative h-36 bg-slate-50 rounded-2xl border-2 border-slate-200 overflow-hidden flex items-center justify-between px-5 sm:px-8 shadow-xs">
          {/* Antena TX Node */}
          <div className="flex flex-col items-center z-20 bg-white px-3 py-1.5 rounded-xl border-2 border-purple-300 shadow-sm">
            <span className="text-xs font-mono font-black text-purple-900">Antena TX</span>
            <span className="text-[10px] font-mono text-purple-700 font-bold">Emisión RF</span>
          </div>

          {/* Directional Wavefield Animation responding to selected unguided media */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {selectedUnguided === 'wifi' ? (
              // Wi-Fi: Directional spherical wavefront arcs expanding from TX (left) to RX (right)
              <svg className="w-full h-full" viewBox="0 0 500 140" preserveAspectRatio="none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.path
                    key={i}
                    d="M 120 20 A 70 70 0 0 1 120 120"
                    fill="none"
                    stroke="#9333ea"
                    strokeWidth="3"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M 90 55 A 18 18 0 0 1 90 85",
                        "M 220 25 A 90 90 0 0 1 220 115",
                        "M 390 10 A 150 150 0 0 1 390 130"
                      ],
                      opacity: [0.95, 0.6, 0]
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.44,
                      ease: "easeOut"
                    }}
                  />
                ))}
                {/* Modulated carrier RF photons */}
                <motion.circle
                  r="5"
                  fill="#7e22ce"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  animate={{ cx: [95, 405], cy: [70, 70], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                />
              </svg>
            ) : selectedUnguided === 'microwave' ? (
              // Microwave: Collimated directional pencil beam between dishes
              <svg className="w-full h-full" viewBox="0 0 500 140">
                <path d="M 95 70 L 405 45 L 405 95 Z" fill="#9333ea" fillOpacity="0.08" stroke="#c084fc" strokeWidth="1" strokeDasharray="4 2" />
                <motion.path
                  d="M 95 70 Q 130 50, 165 70 T 235 70 T 305 70 T 375 70 T 405 70"
                  fill="none"
                  stroke="#7e22ce"
                  strokeWidth="3.5"
                  strokeDasharray="16 8"
                  animate={{ strokeDashoffset: [0, -96] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                />
                <text x="250" y="30" fill="#6b21a8" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="900">
                  HAZ DIRECTIVO COLIMADO (PUNTO A PUNTO)
                </text>
              </svg>
            ) : (
              // Radio Terrestre: Ground wave and sky wave reflection
              <svg className="w-full h-full" viewBox="0 0 500 140">
                <motion.path
                  d="M 95 95 Q 250 80, 405 95"
                  fill="none"
                  stroke="#9333ea"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                  animate={{ strokeDashoffset: [0, -48] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                />
                <path d="M 95 65 L 250 25 L 405 65" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
                <text x="250" y="20" fill="#6b21a8" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                  PROPAGACIÓN IONOSFÉRICA / SUPERFICIAL
                </text>
              </svg>
            )}
          </div>

          {/* Antena RX Node */}
          <div className="flex flex-col items-center z-20 bg-white px-3 py-1.5 rounded-xl border-2 border-emerald-300 shadow-sm">
            <span className="text-xs font-mono font-black text-emerald-900">Antena RX</span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">Recepción</span>
          </div>
        </div>

        {/* Unguided list selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {unguidedItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedUnguided(item.id as any)}
              className={cn(
                "p-3.5 rounded-xl border-2 text-left transition-all",
                selectedUnguided === item.id
                  ? "bg-purple-100 border-purple-600 text-purple-950 ring-2 ring-purple-400/40 shadow-md font-black"
                  : "bg-slate-50 border-slate-200 hover:border-purple-300 hover:bg-white text-slate-700"
              )}
            >
              <div className="text-sm font-mono font-black">{item.name}</div>
              <div className="text-xs text-purple-700 font-bold mt-1">{item.speed}</div>
              <div className="text-xs text-slate-500 font-medium">{item.distance}</div>
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="text-sm sm:text-base text-slate-800 bg-purple-50/80 p-4 rounded-xl border-2 border-purple-200 font-sans leading-relaxed">
          <strong className="text-purple-950 font-black">Detalle técnico: </strong>
          {unguidedItems.find(u => u.id === selectedUnguided)?.desc}
        </div>
      </Card>
    </div>
  );
};
