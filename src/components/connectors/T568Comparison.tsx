import { useState } from 'react';
import { Card } from '../ui/Card';
import { RJ45_PINS } from '../../data/connectors';
import { ArrowLeftRight } from 'lucide-react';
import { cn } from '../layout/Layout';

export const T568Comparison = () => {
  const [highlightSwap, setHighlightSwap] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      {/* Top Controls Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-md">
        <div>
          <h3 className="text-xl font-display font-black text-slate-900">
            Comparativa Frente a Frente: T568A vs. T568B
          </h3>
          <p className="text-sm text-slate-600 font-medium mt-0.5">
            Observa el intercambio de los pares Verde (Pines 1-2 vs 3-6) y Naranja (Pines 3-6 vs 1-2)
          </p>
        </div>

        <button
          onClick={() => setHighlightSwap(h => !h)}
          className={cn(
            "px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-black transition-all flex items-center gap-2 border-2 self-start sm:self-auto",
            highlightSwap
              ? "bg-sky-100 border-sky-600 text-sky-950 shadow-md ring-2 ring-sky-400/40"
              : "bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-300"
          )}
        >
          <ArrowLeftRight size={16} className={highlightSwap ? "text-sky-700" : "text-slate-600"} />
          <span>{highlightSwap ? 'Resaltar Intercambio: ACTIVO' : 'Resaltar Intercambio: INACTIVO'}</span>
        </button>
      </div>

      {/* Side-by-Side Wire Maps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* T568A Column */}
        <Card glowColor="green" className="p-6 sm:p-8 bg-white border-2 border-emerald-200 shadow-lg rounded-2xl flex flex-col justify-between">
          <div className="border-b-2 border-slate-100 pb-4 mb-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-700 font-black">Estándar TIA/EIA</span>
              <h4 className="text-2xl sm:text-3xl font-display font-black text-slate-900">T568A</h4>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border-2 border-emerald-300 font-bold">
              Compatible USOC
            </span>
          </div>

          <div className="space-y-2 font-mono text-sm">
            {RJ45_PINS.map((pin) => {
              const isSwappedPin = [1, 2, 3, 6].includes(pin.pin);
              return (
                <div
                  key={pin.pin}
                  className={cn(
                    "p-3 rounded-xl border-2 flex items-center justify-between transition-all",
                    highlightSwap && isSwappedPin
                      ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 font-medium"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-sm">
                      {pin.pin}
                    </span>
                    <span className="font-bold text-slate-900">{pin.colorT568A}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-slate-500 font-bold">Par {pin.pairT568A}</span>
                    <div
                      className="w-5 h-5 rounded-full border-2 border-slate-400 shadow-sm"
                      style={{ backgroundColor: pin.hexColorT568A }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* T568B Column */}
        <Card glowColor="orange" className="p-6 sm:p-8 bg-white border-2 border-amber-200 shadow-lg rounded-2xl flex flex-col justify-between">
          <div className="border-b-2 border-slate-100 pb-4 mb-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-amber-700 font-black">Estándar Dominante</span>
              <h4 className="text-2xl sm:text-3xl font-display font-black text-slate-900">T568B</h4>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-lg bg-amber-50 text-amber-800 border-2 border-amber-300 font-bold">
              Más Usado Comercial
            </span>
          </div>

          <div className="space-y-2 font-mono text-sm">
            {RJ45_PINS.map((pin) => {
              const isSwappedPin = [1, 2, 3, 6].includes(pin.pin);
              return (
                <div
                  key={pin.pin}
                  className={cn(
                    "p-3 rounded-xl border-2 flex items-center justify-between transition-all",
                    highlightSwap && isSwappedPin
                      ? "bg-amber-50 border-amber-500 text-amber-950 font-bold shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 font-medium"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-sm">
                      {pin.pin}
                    </span>
                    <span className="font-bold text-slate-900">{pin.colorT568B}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-slate-500 font-bold">Par {pin.pairT568B}</span>
                    <div
                      className="w-5 h-5 rounded-full border-2 border-slate-400 shadow-sm"
                      style={{ backgroundColor: pin.hexColorT568B }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Rationale and Pair Rules Card */}
      <Card className="p-6 sm:p-8 bg-sky-50/80 border-2 border-sky-200 rounded-2xl shadow-sm">
        <h4 className="text-base font-mono uppercase font-black text-sky-900 mb-3">
          Regla Mnemotécnica Fundamental de Ingeniería:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base text-slate-800 leading-relaxed font-sans font-medium">
          <p>
            • <strong>Los pares Azul (Pines 4 y 5) y Marrón (Pines 7 y 8) NUNCA cambian:</strong> Permanecen exactamente en la misma posición física tanto en T568A como en T568B.
          </p>
          <p>
            • <strong>La única variación es el intercambio de Naranja ↔ Verde:</strong> El par verde se ubica en los pines 1-2 en T568A, y pasa a los pines 3-6 en T568B.
          </p>
        </div>
      </Card>
    </div>
  );
};
