import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { WaveguideDiagram } from '../components/network/WaveguideDiagram';
import { Radio } from 'lucide-react';

export const Waveguides = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="17 • ESTRUCTURAS DE MICROONDAS"
        badgeColor="orange"
        icon={<Radio size={28} className="text-orange" />}
        title="Guías de Onda Electromagnéticas"
        subtitle="Conducción de ondas de microondas y milimétricas en tubos metálicos huecos mediante modos transversales sin pérdidas dieléctricas"
      />

      {/* Interactive Waveguide and Coaxial Comparison */}
      <WaveguideDiagram />

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Comunicaciones Satelitales, Starlink & Software Aeroespacial"
        takeaway="Las guías de onda son la infraestructura física que conecta los módems de alta frecuencia con las antenas parabólicas de satélite."
      >
        <p>
          Las plataformas web globales modernas dependen cada vez más de enlaces satelitales de órbita baja (LEO como Starlink o Kuiper) para conectar sucursales remotas, barcos y centros de datos de contingencia.
        </p>
        <p>
          En los terminales de tierra y gateways satelitales, las frecuencias operan en bandas extremas (Ka/Ku entre 12 y 40 GHz). A estas frecuencias, ningún cable de cobre convencional puede transportar la señal sin quemarse o atenuarla en pocos centímetros. Las <strong>guías de onda de cobre o aluminio maquinadas al micrómetro</strong> son las únicas capaces de llevar la señal de microondas hacia la bocina alimentadora de la antena parabólica.
        </p>
      </EngineeringConnection>
    </div>
  );
};
