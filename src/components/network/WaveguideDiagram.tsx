import { useState } from 'react';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { WAVEGUIDES_DATA } from '../../data/rf';
import { Radio, Layers } from 'lucide-react';
import { cn } from '../layout/Layout';

export const WaveguideDiagram = () => {
  const [activeMode, setActiveMode] = useState<'TE10' | 'TE20'>('TE10');

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Animated Rectangular Waveguide Canvas (7 cols) */}
        <Card className="lg:col-span-7 p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-2xl flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                <Radio size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-display font-black text-slate-900 uppercase tracking-wider">
                Campo E.M. en Guía Rectangular
              </h3>
            </div>
            {/* Mode toggle */}
            <div className="flex bg-slate-100 rounded-xl p-1.5 border border-slate-200">
              <button
                onClick={() => setActiveMode('TE10')}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border",
                  activeMode === 'TE10' ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-sm ring-2 ring-sky-400/40" : "border-transparent text-slate-600 hover:text-slate-900"
                )}
              >
                Modo TE₁₀ (Dominante)
              </button>
              <button
                onClick={() => setActiveMode('TE20')}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border",
                  activeMode === 'TE20' ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-sm ring-2 ring-sky-400/40" : "border-transparent text-slate-600 hover:text-slate-900"
                )}
              >
                Modo TE₂₀
              </button>
            </div>
          </div>

          {/* Perspective 3D-like Rectangular Waveguide Cutaway */}
          <div className="relative h-72 bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 flex items-center justify-center overflow-hidden shadow-xs">
            <svg className="w-full h-full" viewBox="0 0 500 200">
              {/* Metallic walls (Gold/Brass interior) */}
              <defs>
                <linearGradient id="wall-metal" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.85" />
                </linearGradient>
              </defs>

              {/* Top metallic plate */}
              <polygon points="40,40 460,40 480,20 60,20" fill="url(#wall-metal)" stroke="#d97706" strokeWidth="2" />
              {/* Bottom metallic plate */}
              <polygon points="40,160 460,160 480,140 60,140" fill="url(#wall-metal)" stroke="#d97706" strokeWidth="2" />
              {/* Left back wall */}
              <polygon points="40,40 40,160 60,140 60,20" fill="#b45309" opacity="0.6" />
              {/* Right front opening */}
              <polygon points="460,40 460,160 480,140 480,20" fill="#92400e" opacity="0.4" />

              {/* Electromagnetic Field Lines (Electric Field Vector E) */}
              {[80, 140, 200, 260, 320, 380, 440].map((x, i) => (
                <motion.g
                  key={i}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: 'easeInOut'
                  }}
                >
                  {/* Vertical E-field arrows */}
                  <line x1={x} y1="50" x2={x} y2="150" stroke="#0284c7" strokeWidth="3" />
                  <polygon points={`${x-5},62 ${x},48 ${x+5},62`} fill="#0284c7" />
                  <polygon points={`${x-5},138 ${x},152 ${x+5},138`} fill="#0284c7" />
                </motion.g>
              ))}

              {/* Microwave propagation direction indicator */}
              <line x1="80" y1="100" x2="420" y2="100" stroke="#0369a1" strokeWidth="2" strokeDasharray="6 4" />
              <polygon points="425,100 415,94 415,106" fill="#0369a1" />
              <text x="250" y="92" textAnchor="middle" fill="#0369a1" fontSize="12" fontFamily="monospace" fontWeight="900">
                Dirección de propagación (Vector de Poynting S)
              </text>
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm font-mono text-slate-700 mt-5 pt-4 border-t-2 border-slate-100 font-bold">
            <div>Frecuencia de Corte: <span className="text-sky-700 font-black">fc = c / (2 · a)</span></div>
            <div>Modo Actual: <span className="text-amber-700 font-black">{activeMode} (Transverse Electric)</span></div>
          </div>
        </Card>

        {/* Technical Concepts (5 cols) */}
        <Card glowColor="cyan" className="lg:col-span-5 p-6 sm:p-8 bg-white border-2 border-sky-200 shadow-lg rounded-2xl flex flex-col justify-between">
          <div className="space-y-5">
            <div className="border-b-2 border-slate-100 pb-3">
              <span className="text-xs font-mono text-sky-700 uppercase tracking-wider font-black">
                Fundamentos Físicos
              </span>
              <h3 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mt-1">
                Guías de Onda de Microondas
              </h3>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase text-slate-600 font-black mb-1.5">
                ¿Cómo funcionan sin conductor central?
              </h5>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border-2 border-slate-200 font-sans">
                Al ser un tubo conductor hueco cerrado, las ondas electromagnéticas se reflejan repetidamente en las paredes internas metálicas según las condiciones de frontera de Maxwell. La señal no puede propagarse si su longitud de onda es mayor que el doble del ancho de la guía (frecuencia de corte).
              </p>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase text-sky-800 font-black mb-1.5">
                ¿Por qué soportan Megavatios de potencia?
              </h5>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed bg-sky-50/80 p-4 rounded-xl border-2 border-sky-200 font-sans">
                Al no tener dieléctrico sólido que se degrade térmicamente ni un delgado alambre central que se funda por efecto Joule, las guías de onda son el único medio capaz de alimentar radares de defensa aérea, satélites y hornos industriales.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t-2 border-slate-100 text-sm font-mono text-slate-700">
            <strong className="text-purple-700 font-bold">Aplicación moderna: </strong>
            Las constelaciones de satélites Starlink y O3b utilizan guías de onda y bocinas en banda Ka/Ku para comunicarse con las estaciones terrestres de internet.
          </div>
        </Card>
      </div>

      {/* Comparison Table: Coaxial vs Waveguide */}
      <Card className="p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-2xl">
        <h4 className="text-xl font-display font-black text-slate-900 mb-5 flex items-center gap-2.5">
          <Layers size={24} className="text-sky-600" />
          Comparación Rigurosa: Cable Coaxial vs. Guía de Onda
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-700 bg-slate-50">
                <th className="py-3 px-4 font-black">Parámetro Técnico</th>
                <th className="py-3 px-4 text-sky-800 font-black">Cable Coaxial</th>
                <th className="py-3 px-4 text-amber-800 font-black">Guía de Onda Metálica</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100 text-slate-800 font-sans">
              {WAVEGUIDES_DATA.comparisonVsCoaxial.map((row, idx) => (
                <tr key={idx} className="hover:bg-sky-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 font-mono text-xs sm:text-sm">{row.parameter}</td>
                  <td className="py-3.5 px-4 text-xs sm:text-sm">{row.coaxial}</td>
                  <td className="py-3.5 px-4 text-xs sm:text-sm font-medium">{row.waveguide}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
