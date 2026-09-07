import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { PracticalCases } from '../components/cases/PracticalCases';
import { Briefcase } from 'lucide-react';

export const Cases = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="20 • TOMA DE DECISIONES DE INGENIERÍA"
        badgeColor="cyan"
        icon={<Briefcase size={28} className="text-cyan" />}
        title="Casos Prácticos de Aplicación Real"
        subtitle="5 escenarios del mundo profesional donde deberás analizar las restricciones físicas y elegir el medio de transmisión óptimo"
      />

      {/* Practical Cases Interactive Workspace */}
      <PracticalCases />

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Trade-offs de Arquitectura & Costo-Beneficio"
        takeaway="En ingeniería no existe 'la mejor tecnología universal', sino la tecnología adecuada para las restricciones físicas, económicas y ambientales del proyecto."
      >
        <p>
          Un error recurrente es asumir que "siempre debemos poner fibra óptica monomodo porque es la más rápida". Como vimos en los casos prácticos, instalar fibra monomodo para unir servidores en el mismo rack multiplica el costo por cinco sin aportar ningún beneficio frente a un cable de cobre pasivo Twinax DAC.
        </p>
        <p>
          De igual forma, intentar tender cables físicos para conectar sensores agrícolas en 12 km² es un despropósito logístico frente a LoRaWAN. El verdadero criterio de un ingeniero de software es saber balancear <strong>latencia, ancho de banda, distancia, inmunidad al ruido y presupuesto de hardware</strong>.
        </p>
      </EngineeringConnection>
    </div>
  );
};
