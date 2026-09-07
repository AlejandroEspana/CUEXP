import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { DirectVsCrossover } from '../components/connectors/DirectVsCrossover';
import { ArrowLeftRight } from 'lucide-react';

export const CableTypes = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="07 • CONFIGURACIÓN DE ENLACES"
        badgeColor="cyan"
        icon={<ArrowLeftRight size={28} className="text-cyan" />}
        title="Cable Directo vs. Cable Cruzado"
        subtitle="Polaridad de pares de transmisión y recepción (TX/RX), interfaces MDI / MDI-X y la tecnología Auto MDI-X"
      />

      {/* Interactive Straight vs Crossover Component */}
      <DirectVsCrossover />

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Interconexión de Nodos & Configuración de Clústeres"
        takeaway="Auto MDI-X resuelve el cruce de pines en hardware, pero saber cómo opera TX/RX es crucial para diagnosticar fallas en tarjetas NIC embebidas o IoT."
      >
        <p>
          Históricamente, si querías interconectar dos computadoras directamente para probar una aplicación cliente-servidor o replicar datos sin un switch, necesitabas obligatoriamente fabricar un cable cruzado (T568A en un extremo y T568B en el otro) para que los pines transmisores (TX) de la PC 1 coincidieran con los receptores (RX) de la PC 2.
        </p>
        <p>
          Gracias a <strong>Auto MDI/MDI-X</strong> (estandarizado en Gigabit Ethernet), el transceptor físico conmuta internamente las líneas. No obstante, en placas de desarrollo embebidas (sistemas industriales, PLC antiguos o ciertos microcontroladores ARM) Auto MDI-X puede no estar soportado; si utilizas el cable incorrecto, la comunicación simplemente morirá sin enviar un solo paquete a nivel de software.
        </p>
      </EngineeringConnection>
    </div>
  );
};
