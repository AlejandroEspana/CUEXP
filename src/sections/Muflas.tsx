import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { MuflaDiagram } from '../components/network/MuflaDiagram';
import { ShieldCheck } from 'lucide-react';

export const Muflas = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="12 • PLANTA EXTERNA DE FIBRA"
        badgeColor="cyan"
        icon={<ShieldCheck size={28} className="text-cyan" />}
        title="Muflas de Fibra Óptica (FOSC)"
        subtitle="Cajas de empalme herméticas de alta resistencia mecánica (IP68) para la continuidad y ramificación de cables ópticos en exteriores"
      />

      {/* Interactive Mufla Cutaway & Comparison */}
      <MuflaDiagram />

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Cortes de Fibra, Disaster Recovery & Redundancia"
        takeaway="La rotura de una mufla o un corte de cable subterráneo por obras civiles es la causa física #1 de cortes de servicio masivos en internet."
      >
        <p>
          En el desarrollo de software confiable existe un lema: <em>"Siempre asume que un retroexcavador cortará la fibra óptica"</em> (el conocido <em>backhoe incident</em>).
        </p>
        <p>
          Aunque las muflas de polímero soportan inundaciones y presiones mecánicas de toneladas, accidentes de construcción o vandalismo ocurren a diario en las ciudades. Por esta razón, los arquitectos de software diseñan arquitecturas <strong>Multi-Region Activo-Activo</strong>: si una mufla principal es destruida en una autopista, los protocolos de enrutamiento dinámico (BGP) desvían el tráfico TCP/IP por rutas alternativas en cuestión de segundos, evitando que los usuarios finales perciban una caída del servicio.
        </p>
      </EngineeringConnection>
    </div>
  );
};
