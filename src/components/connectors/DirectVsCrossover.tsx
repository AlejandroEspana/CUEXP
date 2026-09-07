import { useState } from 'react';
import { Card } from '../ui/Card';
import { cn } from '../layout/Layout';

export const DirectVsCrossover = () => {
  const [cableType, setCableType] = useState<'straight' | 'crossover'>('straight');

  return (
    <div className="flex flex-col gap-8">
      {/* Type Selector */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-200 max-w-lg mx-auto w-full shadow-sm">
        <button
          onClick={() => setCableType('straight')}
          className={cn(
            "flex-1 py-3 rounded-xl text-xs sm:text-sm font-mono font-black transition-all text-center border-2",
            cableType === 'straight'
              ? "bg-sky-100 border-sky-600 text-sky-950 shadow-md ring-2 ring-sky-400/40"
              : "border-transparent text-slate-600 hover:text-slate-900"
          )}
        >
          CABLE DIRECTO (Straight-Through)
        </button>
        <button
          onClick={() => setCableType('crossover')}
          className={cn(
            "flex-1 py-3 rounded-xl text-xs sm:text-sm font-mono font-black transition-all text-center border-2",
            cableType === 'crossover'
              ? "bg-amber-100 border-amber-600 text-amber-950 shadow-md ring-2 ring-amber-400/40"
              : "border-transparent text-slate-600 hover:text-slate-900"
          )}
        >
          CABLE CRUZADO (Crossover)
        </button>
      </div>

      {/* Visual Wiring Map Diagram */}
      <Card glowColor={cableType === 'straight' ? 'cyan' : 'orange'} className="p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 mb-6">
          <div>
            <span className="text-xs font-mono text-sky-700 uppercase font-black tracking-wider">
              {cableType === 'straight' ? 'Extremo A (T568B) ─── Extremo B (T568B)' : 'Extremo A (T568A) ─── Extremo B (T568B)'}
            </span>
            <h3 className="text-2xl font-display font-black text-slate-900 mt-1">
              {cableType === 'straight' ? 'Cable Directo: Dispositivos Heterogéneos' : 'Cable Cruzado: Dispositivos Homogéneos'}
            </h3>
          </div>

          <div className="text-left sm:text-right text-xs sm:text-sm font-mono bg-slate-50 p-2.5 px-4 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-bold block">Escenario Típico:</span>
            <span className="text-slate-900 font-black">{cableType === 'straight' ? 'PC ↔ Switch / Router ↔ Switch' : 'PC ↔ PC / Switch ↔ Switch'}</span>
          </div>
        </div>

        {/* Pin-to-Pin Visual SVG Wiring */}
        <div className="relative h-72 bg-slate-50 rounded-2xl border-2 border-slate-200 p-5 flex items-center justify-between shadow-xs">
          {/* Left Pins (Host 1 - MDI) */}
          <div className="w-36 space-y-1.5 font-mono text-xs z-10">
            <div className="text-xs font-black text-sky-800 uppercase tracking-wider mb-2">Extremo A (MDI)</div>
            {[
              { p: 1, signal: 'TX+ (1)', c: '#ea580c' },
              { p: 2, signal: 'TX- (2)', c: '#ea580c' },
              { p: 3, signal: 'RX+ (3)', c: '#16a34a' },
              { p: 4, signal: 'P4 (Azul)', c: '#2563eb' },
              { p: 5, signal: 'P5 (Bl/Azul)', c: '#93c5fd' },
              { p: 6, signal: 'RX- (6)', c: '#16a34a' },
              { p: 7, signal: 'P7 (Bl/Mar)', c: '#d6d3d1' },
              { p: 8, signal: 'P8 (Marrón)', c: '#854d0e' }
            ].map(pin => (
              <div key={pin.p} className="p-1 px-2.5 rounded-lg bg-white border border-slate-200 shadow-xs flex justify-between text-slate-800 font-bold">
                <span>{pin.signal}</span>
                <span className="w-3 h-3 rounded-full my-auto shadow-sm" style={{ backgroundColor: pin.c }}></span>
              </div>
            ))}
          </div>

          {/* SVG Connection Paths */}
          <svg className="absolute inset-x-36 inset-y-8 w-[calc(100%-18rem)] h-[calc(100%-4rem)] pointer-events-none" viewBox="0 0 300 200" preserveAspectRatio="none">
            {cableType === 'straight' ? (
              // Straight lines 1->1, 2->2, 3->3, 6->6
              <>
                <line x1="0" y1="20" x2="300" y2="20" stroke="#ea580c" strokeWidth="3" />
                <line x1="0" y1="44" x2="300" y2="44" stroke="#ea580c" strokeWidth="3" />
                <line x1="0" y1="68" x2="300" y2="68" stroke="#16a34a" strokeWidth="3" />
                <line x1="0" y1="140" x2="300" y2="140" stroke="#16a34a" strokeWidth="3" />
              </>
            ) : (
              // Crossed lines: 1->3, 2->6, 3->1, 6->2
              <>
                <path d="M 0 20 C 150 20, 150 68, 300 68" fill="none" stroke="#ea580c" strokeWidth="3" />
                <path d="M 0 44 C 150 44, 150 140, 300 140" fill="none" stroke="#ea580c" strokeWidth="3" />
                <path d="M 0 68 C 150 68, 150 20, 300 20" fill="none" stroke="#16a34a" strokeWidth="3" />
                <path d="M 0 140 C 150 140, 150 44, 300 44" fill="none" stroke="#16a34a" strokeWidth="3" />
              </>
            )}
          </svg>

          {/* Right Pins (Host 2 - MDI or MDI-X) */}
          <div className="w-36 space-y-1.5 font-mono text-xs z-10 text-right">
            <div className="text-xs font-black text-sky-800 uppercase tracking-wider mb-2">Extremo B</div>
            {[
              { p: 1, signal: cableType === 'straight' ? 'RX+ (1)' : 'TX+ (1)', c: cableType === 'straight' ? '#ea580c' : '#16a34a' },
              { p: 2, signal: cableType === 'straight' ? 'RX- (2)' : 'TX- (2)', c: cableType === 'straight' ? '#ea580c' : '#16a34a' },
              { p: 3, signal: cableType === 'straight' ? 'TX+ (3)' : 'RX+ (3)', c: cableType === 'straight' ? '#16a34a' : '#ea580c' },
              { p: 4, signal: 'P4 (Azul)', c: '#2563eb' },
              { p: 5, signal: 'P5 (Bl/Azul)', c: '#93c5fd' },
              { p: 6, signal: cableType === 'straight' ? 'TX- (6)' : 'RX- (6)', c: cableType === 'straight' ? '#16a34a' : '#ea580c' },
              { p: 7, signal: 'P7 (Bl/Mar)', c: '#d6d3d1' },
              { p: 8, signal: 'P8 (Marrón)', c: '#854d0e' }
            ].map(pin => (
              <div key={pin.p} className="p-1 px-2.5 rounded-lg bg-white border border-slate-200 shadow-xs flex justify-between text-slate-800 font-bold">
                <span className="w-3 h-3 rounded-full my-auto shadow-sm" style={{ backgroundColor: pin.c }}></span>
                <span>{pin.signal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Explanations of MDI, MDI-X and Auto MDI-X */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200">
            <h5 className="text-xs font-mono font-black text-sky-800 uppercase mb-1.5">
              ¿Qué es MDI? (Media Dependent Interface)
            </h5>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
              Es la configuración estándar de computadores y tarjetas de red (NIC): transmiten en los pines 1 y 2 y reciben en los pines 3 y 6.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200">
            <h5 className="text-xs font-mono font-black text-amber-800 uppercase mb-1.5">
              ¿Qué es MDI-X? (Crossover)
            </h5>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
              Configuración en puertos de switches y hubs donde los pines están internamente invertidos: reciben en 1-2 y transmiten en 3-6 para usar cables directos.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200">
            <h5 className="text-xs font-mono font-black text-emerald-800 uppercase mb-1.5">
              ¿Qué es Auto MDI/MDI-X?
            </h5>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
              El chip PHY detecta automáticamente el tipo de cable conectado y conmuta los circuitos electrónicos internamente. Hace innecesarios los cables cruzados en redes modernas.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
