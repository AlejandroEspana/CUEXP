import { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '../layout/Layout';
import { RefreshCcw, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const T568A = [
  { id: 1, name: 'Blanco/Verde', color: 'bg-green-100 border-green-500', stripe: true },
  { id: 2, name: 'Verde', color: 'bg-green-500 border-green-600', stripe: false },
  { id: 3, name: 'Blanco/Naranja', color: 'bg-orange-100 border-orange-500', stripe: true },
  { id: 4, name: 'Azul', color: 'bg-blue-500 border-blue-600', stripe: false },
  { id: 5, name: 'Blanco/Azul', color: 'bg-blue-100 border-blue-500', stripe: true },
  { id: 6, name: 'Naranja', color: 'bg-orange-500 border-orange-600', stripe: false },
  { id: 7, name: 'Blanco/Marrón', color: 'bg-amber-100 border-amber-700', stripe: true },
  { id: 8, name: 'Marrón', color: 'bg-amber-700 border-amber-800', stripe: false },
];

const T568B = [
  { id: 1, name: 'Blanco/Naranja', color: 'bg-orange-100 border-orange-500', stripe: true },
  { id: 2, name: 'Naranja', color: 'bg-orange-500 border-orange-600', stripe: false },
  { id: 3, name: 'Blanco/Verde', color: 'bg-green-100 border-green-500', stripe: true },
  { id: 4, name: 'Azul', color: 'bg-blue-500 border-blue-600', stripe: false },
  { id: 5, name: 'Blanco/Azul', color: 'bg-blue-100 border-blue-500', stripe: true },
  { id: 6, name: 'Verde', color: 'bg-green-500 border-green-600', stripe: false },
  { id: 7, name: 'Blanco/Marrón', color: 'bg-amber-100 border-amber-700', stripe: true },
  { id: 8, name: 'Marrón', color: 'bg-amber-700 border-amber-800', stripe: false },
];

export const T568Lab = () => {
  const [standard, setStandard] = useState<'A' | 'B'>('B');
  const [placed, setPlaced] = useState<(typeof T568A[0] | null)[]>(Array(8).fill(null));
  const [available, setAvailable] = useState(() => [...T568B].sort(() => Math.random() - 0.5));
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const targetStandard = standard === 'A' ? T568A : T568B;

  const handleSelect = (wire: typeof T568A[0]) => {
    if (status !== 'idle') return;
    const nextEmptyIdx = placed.findIndex(p => p === null);
    if (nextEmptyIdx !== -1) {
      const newPlaced = [...placed];
      newPlaced[nextEmptyIdx] = wire;
      setPlaced(newPlaced);
      setAvailable(available.filter(w => w.id !== wire.id));
    }
  };

  const handleRemove = (index: number) => {
    if (status !== 'idle') return;
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
    const isCorrect = placed.every((w, i) => w?.name === targetStandard[i].name);
    setStatus(isCorrect ? 'success' : 'error');
  };

  const reset = () => {
    setPlaced(Array(8).fill(null));
    setAvailable([...(standard === 'A' ? T568A : T568B)].sort(() => Math.random() - 0.5));
    setStatus('idle');
  };

  const changeStandard = (std: 'A' | 'B') => {
    setStandard(std);
    setPlaced(Array(8).fill(null));
    setAvailable([...(std === 'A' ? T568A : T568B)].sort(() => Math.random() - 0.5));
    setStatus('idle');
  };

  return (
    <Card className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-display text-white">Laboratorio de Crimpado</h3>
        <div className="flex bg-dark-900 rounded-lg p-1">
          <button 
            onClick={() => changeStandard('A')}
            className={cn("px-4 py-1 rounded text-sm font-bold transition-colors", standard === 'A' ? "bg-cyan text-dark-900" : "text-slate-400 hover:text-white")}
          >
            T568A
          </button>
          <button 
            onClick={() => changeStandard('B')}
            className={cn("px-4 py-1 rounded text-sm font-bold transition-colors", standard === 'B' ? "bg-cyan text-dark-900" : "text-slate-400 hover:text-white")}
          >
            T568B
          </button>
        </div>
      </div>

      <div className="text-slate-300 text-sm">
        Ordena los cables para formar el estándar seleccionado. Haz clic en los cables disponibles para insertarlos, o en los colocados para removerlos.
      </div>

      {/* RJ45 Connector Mock */}
      <div className="relative h-48 bg-dark-900 border-2 border-dark-600 rounded-t-xl rounded-b-sm p-4 flex justify-between items-end overflow-hidden mx-auto w-full max-w-lg">
        {/* Metal contacts overlay */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-yellow-500/20 to-transparent flex justify-between px-6">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="w-2 h-12 bg-yellow-600/50 rounded-b"></div>
          ))}
        </div>
        
        {placed.map((wire, idx) => (
          <div 
            key={idx}
            onClick={() => handleRemove(idx)}
            className="w-10 h-32 flex flex-col justify-end items-center cursor-pointer relative z-10"
          >
            <div className="text-xs text-slate-500 font-mono mb-2">{idx + 1}</div>
            <div className={cn(
              "w-6 h-full rounded-t-sm border-2 transition-all duration-300",
              wire ? wire.color : "bg-dark-800 border-dark-700 border-dashed hover:border-cyan/50",
              wire?.stripe && "relative overflow-hidden before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] before:bg-repeat"
            )}></div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center min-h-[60px]">
        {available.map((wire) => (
          <motion.div
            layoutId={\wire-\\}
            key={wire.id}
            onClick={() => handleSelect(wire)}
            className={cn(
              "w-12 h-12 rounded cursor-pointer border-2 hover:scale-105 transition-transform",
              wire.color,
              wire.stripe && "relative overflow-hidden before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] before:bg-repeat"
            )}
            title={wire.name}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button onClick={reset} className="p-2 text-slate-400 hover:text-white transition-colors" title="Reiniciar">
          <RefreshCcw size={20} />
        </button>
        
        <div className="flex-1 flex justify-center">
          {status === 'success' && (
            <Badge color="green"><Check size={14} className="mr-1"/> ¡Orden Correcto!</Badge>
          )}
          {status === 'error' && (
            <Badge color="red"><X size={14} className="mr-1"/> Orden Incorrecto</Badge>
          )}
        </div>

        <button 
          onClick={verify} 
          disabled={placed.includes(null)}
          className="px-6 py-2 bg-primary text-white rounded font-bold disabled:opacity-50 transition-colors"
        >
          Verificar
        </button>
      </div>
    </Card>
  );
};
