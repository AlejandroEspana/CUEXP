import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { HeliaxDiagram } from '../components/network/HeliaxDiagram';
import { Radio } from 'lucide-react';

export const Heliax = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="15 • LÍNEAS DE TRANSMISIÓN CELULAR"
        badgeColor="orange"
        icon={<Radio size={28} className="text-orange" />}
        title="Líneas de Transmisión Heliax®"
        subtitle="Cables coaxiales de alta potencia con blindaje exterior de cobre sólido corrugado para mástiles y torres de telefonía 4G/5G"
      />

      {/* Interactive Heliax Diagram */}
      <HeliaxDiagram />

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Aplicaciones Móviles & Resiliencia en Redes Celulares"
        takeaway="La calidad de la línea de transmisión en la torre celular determina si los paquetes WebSocket de tu app móvil sufren desconexión."
      >
        <p>
          Como desarrollador de aplicaciones móviles (iOS / Android), diseñas features en tiempo real: chats, geolocalización de repartidores en vivo y notificaciones push. Todas estas funciones dependen de conexiones persistentes (HTTP/2 multiplexado o WebSocket).
        </p>
        <p>
          En la estación base celular, la potencia radiada de la antena depende críticamente de que la línea coaxial corrugada <strong>Heliax®</strong> no sufra degradación por humedad ni desajustes de impedancia (ROE/SWR). Si el enlace físico se degrada, la relación señal/ruido (SINR) cae en el smartphone del usuario, el transceptor del teléfono se ve forzado a cambiar a una modulación más lenta (QPSK en lugar de 256-QAM) y las peticiones de tu aplicación empezarán a fallar por timeout.
        </p>
      </EngineeringConnection>
    </div>
  );
};
