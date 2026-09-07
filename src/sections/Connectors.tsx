import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { Rj45Diagram } from '../components/connectors/Rj45Diagram';
import { Rj8Clarification } from '../components/connectors/Rj8Clarification';
import { Cable } from 'lucide-react';

export const Connectors = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="05 • CONECTORES MODULARES"
        badgeColor="cyan"
        icon={<Cable size={28} className="text-cyan" />}
        title="Conectores de Red: RJ45 y Clarificación de RJ8"
        subtitle="Anatomía mecánica del conector modular 8P8C, asignación de los 8 contactos y desmitificación técnica del término RJ8"
      />

      {/* Interactive RJ45 Anatomical Diagram */}
      <Rj45Diagram />

      {/* Academic Clarification of RJ8 */}
      <div className="pt-6 border-t-2 border-slate-200">
        <Rj8Clarification />
      </div>

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Integridad Física del Enlace & Calidad del Conector"
        takeaway="Un mal crimpado o contactos de baja calidad generan micro-desconexiones físicas que el kernel del SO registra como flapping de interfaz."
      >
        <p>
          En conectores RJ45 (8P8C), los contactos metálicos están bañados en oro (típicamente 50 micropulgadas de oro puro sobre níquel). Este baño no es estético: el oro no se oxida ni corroe, garantizando una resistencia de contacto inferior a 20 miliohmios durante más de 1,000 ciclos de inserción.
        </p>
        <p>
          Un conector económico de mala calidad o un cable mal ponchado por un técnico causará <strong>Interface Flapping</strong> (la tarjeta de red se desconecta y reconecta por milisegundos). Para el software, esto destruye instantáneamente todas las conexiones de socket TCP activas (HTTP/2, WebSocket y gRPC), forzando a los clientes web a reconectar y saturando el servidor con nuevos handshakes TLS.
        </p>
      </EngineeringConnection>
    </div>
  );
};
