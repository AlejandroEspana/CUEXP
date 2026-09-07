import { useState } from 'react';
import { Card } from '../ui/Card';
import { BNC_SPECS } from '../../data/connectors';
import { motion } from 'framer-motion';
import { Lock, Unlock, AlertTriangle } from 'lucide-react';
import { cn } from '../layout/Layout';

export const BncBayonetDiagram = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [activeImpedance, setActiveImpedance] = useState<'50' | '75'>('50');

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Bayonet Lock Mechanism (7 cols) */}
        <Card className="lg:col-span-7 p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-2xl flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 mb-4">
            <div>
              <h3 className="text-xl font-display font-black text-slate-900 uppercase tracking-wider">
                Mecanismo de Acoplamiento Bayoneta
              </h3>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Bayonet Neill-Concelman: Conexión firme por 1/4 de giro</p>
            </div>
            <button
              onClick={() => setIsLocked(l => !l)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-black transition-all border-2 self-start sm:self-auto",
                isLocked 
                  ? "bg-emerald-50 text-emerald-900 border-emerald-500 shadow-md ring-2 ring-emerald-400/40" 
                  : "bg-amber-50 text-amber-900 border-amber-500 ring-2 ring-amber-400/40"
              )}
            >
              {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
              <span>{isLocked ? 'ACOPLADO (LOCKED)' : 'DESACOPLADO (CLICK PARA BLOQUEAR)'}</span>
            </button>
          </div>

          {/* SVG BNC Bayonet Coupling Simulation */}
          <div className="relative h-72 bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 flex items-center justify-center overflow-hidden shadow-xs">
            <svg className="w-full max-w-md h-52" viewBox="0 0 400 150">
              {/* Coaxial Cable entry on left */}
              <rect x="10" y="65" width="70" height="20" fill="#475569" stroke="#334155" rx="4" />
              <text x="45" y="79" fill="#f8fafc" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">COAXIAL</text>

              {/* BNC Male Connector Body (Moves right and rotates when locking) */}
              <motion.g
                animate={{
                  x: isLocked ? 100 : 20,
                  rotate: isLocked ? [0, -15, 0] : 0
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              >
                {/* Connector metal sleeve */}
                <rect x="80" y="55" width="55" height="40" fill="#cbd5e1" rx="4" stroke="#64748b" strokeWidth="2" />
                {/* Rotating Bayonet Ring with Knurled Grip */}
                <rect x="95" y="50" width="30" height="50" fill="#94a3b8" rx="3" stroke="#475569" strokeWidth="1.5" />
                {/* Slotted bayonet ramp slot */}
                <path d="M 105 60 L 115 60 L 120 70" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Gold central pin protruding */}
                <rect x="135" y="73" width="25" height="4" fill="#f59e0b" rx="1" />
                <text x="110" y="80" fill="#1e293b" fontSize="8" textAnchor="middle" fontWeight="black" fontFamily="monospace">BNC MACHO</text>
              </motion.g>

              {/* BNC Female Jack Mounted on Chassis / Equipment (Right side) */}
              <g transform="translate(240, 0)">
                {/* Chassis Wall */}
                <rect x="80" y="20" width="15" height="110" fill="#64748b" stroke="#475569" strokeWidth="2" />
                {/* Female outer collar */}
                <rect x="40" y="55" width="40" height="40" fill="#cbd5e1" rx="2" stroke="#64748b" strokeWidth="1.5" />
                {/* Bayonet locking lug */}
                <circle cx="58" cy="50" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                <circle cx="58" cy="100" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                {/* Central socket contact */}
                <rect x="40" y="72" width="20" height="6" fill="#64748b" />
                <circle cx="42" cy="75" r="2.5" fill="#334155" />
                <text x="100" y="80" fill="#0284c7" fontSize="10" fontWeight="bold" fontFamily="monospace">EQUIPO (RX)</text>
              </g>

              {/* Status banner */}
              {isLocked && (
                <motion.text
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  x="200"
                  y="138"
                  textAnchor="middle"
                  fill="#10b981"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  ✓ Conexión coaxial de 360° asegurada contra tirones
                </motion.text>
              )}
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm font-mono text-slate-700 mt-5 pt-4 border-t-2 border-slate-100 font-bold">
            <div>Inventores: <span className="text-slate-900 font-black">{BNC_SPECS.inventors}</span></div>
            <div>Tipo de Fijación: <span className="text-sky-700 font-black">{BNC_SPECS.coupling}</span></div>
          </div>
        </Card>

        {/* Impedance & Rigorous Warning (5 cols) */}
        <Card glowColor="cyan" className="lg:col-span-5 p-6 sm:p-8 bg-white border-2 border-sky-200 shadow-lg rounded-2xl flex flex-col justify-between">
          <div className="space-y-5">
            <div className="border-b-2 border-slate-100 pb-3">
              <span className="text-xs font-mono text-sky-700 uppercase tracking-wider font-black">
                Variantes de Impedancia
              </span>
              <h3 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mt-1">
                50 Ohmios vs. 75 Ohmios
              </h3>
            </div>

            {/* Impedance selector */}
            <div className="flex gap-3">
              <button
                onClick={() => setActiveImpedance('50')}
                className={cn(
                  "flex-1 p-3 rounded-xl border-2 text-xs sm:text-sm font-mono font-black transition-all",
                  activeImpedance === '50' ? "bg-sky-100 border-sky-600 text-sky-950 ring-2 ring-sky-400/40 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                )}
              >
                50 Ω (Redes & RF)
              </button>
              <button
                onClick={() => setActiveImpedance('75')}
                className={cn(
                  "flex-1 p-3 rounded-xl border-2 text-xs sm:text-sm font-mono font-black transition-all",
                  activeImpedance === '75' ? "bg-purple-100 border-purple-600 text-purple-950 ring-2 ring-purple-400/40 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                )}
              >
                75 Ω (Video SDI / TV)
              </button>
            </div>

            {/* Impedance Details */}
            {(() => {
              const spec = BNC_SPECS.types.find(t => t.impedance.includes(activeImpedance))!;
              return (
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border-2 border-slate-200 text-sm font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-bold">Rango de Frecuencia:</span>
                    <span className="text-slate-900 font-black">{spec.frequency}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-bold">Dieléctrico:</span>
                    <span className="text-slate-900 font-bold">{spec.dielectric}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 font-bold block mb-1.5">Aplicaciones Clave:</span>
                    <ul className="text-slate-800 space-y-1 list-disc list-inside font-sans text-xs sm:text-sm font-medium">
                      {spec.uses.map((u, i) => <li key={i}>{u}</li>)}
                    </ul>
                  </div>
                </div>
              );
            })()}

            {/* Warning Alert */}
            <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-400 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
              <AlertTriangle size={22} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-900 font-black text-sm block">¡Precaución Mecánica de Laboratorio!</strong>
                <p className="mt-1 text-slate-800 text-xs leading-relaxed font-sans font-medium">
                  {BNC_SPECS.cautions[0]}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t-2 border-slate-100 text-sm font-mono text-slate-700">
            <strong className="text-sky-700 font-bold">Uso en Software: </strong>
            Tarjetas de adquisición de señales en tiempo real (National Instruments, LabVIEW) que alimentan software embebido.
          </div>
        </Card>
      </div>
    </div>
  );
};
