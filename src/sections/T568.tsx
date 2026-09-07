import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { T568Comparison } from '../components/connectors/T568Comparison';
import { T568Lab } from '../components/connectors/T568Lab';
import { Network } from 'lucide-react';

export const T568 = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="06 • ESTÁNDARES DE ASIGNACIÓN DE PINES"
        badgeColor="cyan"
        icon={<Network size={28} className="text-cyan" />}
        title="Estándares TIA/EIA: T568A y T568B"
        subtitle="Patrones estandarizados de colores y asignación de pares trenzados para la eliminación de diafonía en conectores RJ45"
      />

      {/* Side by Side Comparison and Swap Animation */}
      <T568Comparison />

      {/* Interactive Virtual Crimping Lab */}
      <div className="pt-6 border-t-2 border-slate-200">
        <T568Lab />
      </div>

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Diafonía (Crosstalk) & Retransmisiones TCP Ocultas"
        takeaway="El orden de los pines no es una convención estética: mantiene los pares trenzados emparejados electromagnéticamente para anular el ruido."
      >
        <p>
          Un error común de programadores novatos al armar cables en laboratorios es inventar su propio orden de colores (por ejemplo: Azul, Blanco/Azul, Verde, Blanco/Verde...) asumiendo que "mientras el orden sea idéntico en ambos extremos, la electricidad pasará igual".
        </p>
        <p>
          Si bien un tester básico de continuidad con luces LED indicará que los 8 hilos hacen contacto, ese cable sufrirá <strong>Split Pairs (Pares Divididos)</strong>: las señales de transmisión (TX) y recepción (RX) viajarán por hilos que no están trenzados entre sí. A altas frecuencias (Gigabit), el campo electromagnético inducirá un crosstalk descomunal que corromperá los paquetes en Capa 2, provocando que tu backend sufra pérdidas del 40% de paquetes y un throughput que caerá de 1 Gbps a menos de 10 Mbps.
        </p>
      </EngineeringConnection>
    </div>
  );
};
