import { T568Lab } from '../components/connectors/T568Lab';
import { Card } from '../components/ui/Card';
import { Network } from 'lucide-react';

export const T568 = () => {
  return (
    <div className="h-full flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-cyan/20 text-cyan border border-cyan/30">
          <Network size={28} />
        </div>
        <div>
          <h1 className="text-3xl text-white">T568A y T568B</h1>
          <p className="text-slate-400">Estándares de cableado para pares trenzados</p>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <T568Lab />
        </div>
        
        <div className="flex flex-col gap-6">
          <Card glowColor="cyan">
            <h3 className="text-lg text-white mb-2 font-display">¿Qué son estos estándares?</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              TIA/EIA-568-A y TIA/EIA-568-B son estándares que dictan la disposición de los pines para cables UTP/STP al crimpar conectores RJ45.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              La única diferencia entre ambos es que los pares naranja y verde están intercambiados (Pines 1, 2, 3 y 6).
            </p>
          </Card>
          
          <Card glowColor="slate" className="border-l-4 border-l-cyan">
            <h4 className="text-sm uppercase font-bold tracking-wider text-slate-400 mb-2">💻 Ingeniería de Software</h4>
            <h3 className="text-lg text-white mb-2">El impacto en la transmisión</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              El orden no es aleatorio. Mantener los pares trenzados correctos minimiza el <strong>Crosstalk</strong> (diafonía) y la interferencia. Si armas un cable ignorando el estándar, aunque haya continuidad eléctrica de extremo a extremo, los paquetes sufrirán alta atenuación y ruido, resultando en retransmisiones TCP severas o pérdida de conexión.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
