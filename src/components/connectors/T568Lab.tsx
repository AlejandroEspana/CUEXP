import { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '../layout/Layout';
import { RefreshCcw, Check, X } from 'lucide-react';

const T568A_WIRES = [
  { id: 'gw', name: 'Blanco/Verde', color: 'bg-emerald-100 border-emerald-500', hex: '#86efac', stripe: true },
  { id: 'g', name: 'Verde', color: 'bg-emerald-500 border-emerald-600', hex: '#22c55e', stripe: false },
  { id: 'ow', name: 'Blanco/Naranja', color: 'bg-orange-100 border-orange-500', hex: '#fed7aa', stripe: true },
  { id: 'b', name: 'Azul', color: 'bg-blue-500 border-blue-600', hex: '#3b82f6', stripe: false },
  { id: 'bw', name: 'Blanco/Azul', color: 'bg-blue-100 border-blue-500', hex: '#bfdbfe', stripe: true },
  { id: 'o', name: 'Naranja', color: 'bg-orange-500 border-orange-600', hex: '#f97316', stripe: false },
  { id: 'brw', name: 'Blanco/Marrón', color: 'bg-stone-200 border-amber-800', hex: '#d6d3d1', stripe: true },
  { id: 'br', name: 'Marrón', color: 'bg-amber-800 border-amber-900', hex: '#78350f', stripe: false },
];

const T568B_WIRES = [
  { id: 'ow', name: 'Blanco/Naranja', color: 'bg-orange-100 border-orange-500', hex: '#fed7aa', stripe: true },
  { id: 'o', name: 'Naranja', color: 'bg-orange-500 border-orange-600', hex: '#f97316', stripe: false },
  { id: 'gw', name: 'Blanco/Verde', color: 'bg-emerald-100 border-emerald-500', hex: '#86efac', stripe: true },
  { id: 'b', name: 'Azul', color: 'bg-blue-500 border-blue-600', hex: '#3b82f6', stripe: false },
  { id: 'bw', name: 'Blanco/Azul', color: 'bg-blue-100 border-blue-500', hex: '#bfdbfe', stripe: true },
  { id: 'g', name: 'Verde', color: 'bg-emerald-500 border-emerald-600', hex: '#22c55e', stripe: false },
  { id: 'brw', name: 'Blanco/Marrón', color: 'bg-stone-200 border-amber-800', hex: '#d6d3d1', stripe: true },
  { id: 'br', name: 'Marrón', color: 'bg-amber-800 border-amber-900', hex: '#78350f', stripe: false },
];

export const T568Lab = () => {
  const [standard, setStandard] = useState<'A' | 'B'>('B');
  const [placed, setPlaced] = useState<(typeof T568A_WIRES[0] | null)[]>(Array(8).fill(null));
  const [available, setAvailable] = useState(() => [...T568B_WIRES].sort(() => Math.random() - 0.5));
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorDetails, setErrorDetails] = useState<string>('');

  const targetStandard = standard === 'A' ? T568A_WIRES : T568B_WIRES;

  const handleSelect = (wire: typeof T568A_WIRES[0]) => {
    if (status !== 'idle') setStatus('idle');
    const nextEmptyIdx = placed.findIndex(p => p === null);
    if (nextEmptyIdx !== -1) {
      const newPlaced = [...placed];
      newPlaced[nextEmptyIdx] = wire;
      setPlaced(newPlaced);
      setAvailable(available.filter(w => w.id !== wire.id));
    }
  };

  const handleRemove = (index: number) => {
    if (status !== 'idle') setStatus('idle');
    const wire = placed[index];
    if (wire) {
      const newPlaced = [...placed];
      newPlaced[index] = null;
      setPlaced(newPlaced);
      setAvailable([...available, wire]);
    }
  };

  const verify = () => {
    if (placed.includes(null)) return;
    const isCorrect = placed.every((w, i) => w?.id === targetStandard[i].id);
    if (isCorrect) {
      setStatus('success');
      setErrorDetails('');
    } else {
      setStatus('error');
      const mistakes = placed
        .map((w, i) => (w?.id !== targetStandard[i].id ? i + 1 : null))
        .filter(n => n !== null);
      setErrorDetails(`Los pines ${mistakes.join(', ')} no corresponden al estándar T568${standard}.`);
    }
  };

  const reset = () => {
    setPlaced(Array(8).fill(null));
    setAvailable([...(standard === 'A' ? T568A_WIRES : T568B_WIRES)].sort(() => Math.random() - 0.5));
    setStatus('idle');
    setErrorDetails('');
  };

  const changeStandard = (std: 'A' | 'B') => {
    setStandard(std);
    setPlaced(Array(8).fill(null));
    setAvailable([...(std === 'A' ? T568A_WIRES : T568B_WIRES)].sort(() => Math.random() - 0.5));
    setStatus('idle');
    setErrorDetails('');
  };

  return (
    <Card className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-xl rounded-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-slate-100 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-sky-700 font-black tracking-wider">
            Simulador Práctico Interactivo
          </span>
          <h3 className="text-2xl font-display font-black text-slate-900 mt-0.5">
            Laboratorio Virtual de Crimpado RJ45
          </h3>
        </div>

        <div className="flex bg-slate-100 rounded-xl p-1.5 border border-slate-200">
          <button 
            onClick={() => changeStandard('A')}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-mono font-black transition-all border",
              standard === 'A' ? "bg-emerald-100 border-emerald-600 text-emerald-950 shadow-md ring-2 ring-emerald-400/40" : "border-transparent text-slate-600 hover:text-slate-900"
            )}
          >
            Estándar T568A
          </button>
          <button 
            onClick={() => changeStandard('B')}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-mono font-black transition-all border",
              standard === 'B' ? "bg-sky-100 border-sky-600 text-sky-950 shadow-md ring-2 ring-sky-400/40" : "border-transparent text-slate-600 hover:text-slate-900"
            )}
          >
            Estándar T568B
          </button>
        </div>
      </div>

      <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans font-medium">
        Haz clic en los hilos sueltos inferiores para insertarlos en orden en los 8 pines del conector modular. Haz clic sobre un hilo colocado si deseas retirarlo y reintentar.
      </p>

      {/* RJ45 Connector Mockup with 8 Pins */}
      <div className="relative h-64 bg-slate-100 border-2 border-slate-300 rounded-t-3xl rounded-b-2xl p-5 flex justify-between items-end overflow-hidden mx-auto w-full max-w-xl shadow-md">
        {/* Metal contacts overlay teeth */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-amber-400/25 to-transparent flex justify-between px-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="w-3.5 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-b shadow-md border-x border-amber-300"></div>
          ))}
        </div>

        {placed.map((wire, idx) => (
          <div 
            key={idx}
            onClick={() => handleRemove(idx)}
            className="w-12 h-44 flex flex-col justify-end items-center cursor-pointer relative z-10 group"
          >
            <div className="text-xs text-slate-700 font-mono font-black mb-2 group-hover:text-sky-600">
              Pin {idx + 1}
            </div>
            <div className={cn(
              "w-7 h-full rounded-t-md border-2 transition-all duration-200 shadow-xs",
              wire ? wire.color : "bg-white border-slate-300 border-dashed hover:border-sky-500 hover:bg-sky-50/50",
              wire?.stripe && "relative overflow-hidden before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] before:bg-repeat"
            )}></div>
          </div>
        ))}
      </div>

      {/* Available Wires to Pick */}
      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-mono text-slate-600 font-bold">Hilos disponibles para crimpar:</span>
        <div className="flex flex-wrap gap-3 justify-center min-h-[72px] p-4 bg-slate-50 rounded-2xl border-2 border-slate-200">
          {available.length === 0 ? (
            <span className="text-sm font-mono font-bold text-slate-600 self-center">
              ✓ Todos los 8 hilos han sido colocados en el conector. Presiona "Verificar Crimpado".
            </span>
          ) : (
            available.map((wire) => (
              <button
                key={wire.id}
                onClick={() => handleSelect(wire)}
                className={cn(
                  "px-3.5 py-2.5 rounded-xl cursor-pointer border-2 hover:scale-105 transition-transform text-xs sm:text-sm font-mono text-slate-900 font-black flex items-center gap-2 shadow-sm",
                  wire.color,
                  wire.stripe && "relative overflow-hidden before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] before:bg-repeat"
                )}
                title={`Colocar ${wire.name}`}
              >
                <span className="relative z-10 bg-black/60 text-white px-2 py-0.5 rounded text-xs">
                  {wire.name}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Verification Feedback & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-5 border-t-2 border-slate-100">
        <button 
          onClick={reset} 
          className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-mono font-bold text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 rounded-xl" 
          title="Reiniciar conector"
        >
          <RefreshCcw size={16} />
          <span>Reiniciar</span>
        </button>

        <div className="flex-1 flex justify-center text-center">
          {status === 'success' && (
            <Badge color="green">
              <Check size={16} className="mr-2" />
              ¡Excelente! El estándar T568{standard} fue armado con éxito sin errores de pares.
            </Badge>
          )}
          {status === 'error' && (
            <Badge color="red">
              <X size={16} className="mr-2" />
              {errorDetails}
            </Badge>
          )}
        </div>

        <button 
          onClick={verify} 
          disabled={placed.includes(null)}
          className="px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-black text-sm sm:text-base font-mono disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg"
        >
          Verificar Crimpado
        </button>
      </div>
    </Card>
  );
};
