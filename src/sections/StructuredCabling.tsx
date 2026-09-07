import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { StructuredCabling3D } from '../components/network/StructuredCabling3D';
import { CABLE_CATEGORIES, type CableCategory } from '../data/cables';
import { Card } from '../components/ui/Card';
import { Building2, Layers } from 'lucide-react';

export const StructuredCabling = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="04 • INFRAESTRUCTURA DE EDIFICIOS"
        badgeColor="cyan"
        icon={<Building2 size={28} className="text-cyan" />}
        title="Cableado Estructurado y Redes de Edificio"
        subtitle="Normas internacionales (ANSI/TIA-568 e ISO/IEC 11801) para la organización modular, escalable y mantenible de redes corporativas"
      />

      {/* 3D-Like Hierarchical Building Simulation */}
      <StructuredCabling3D />

      {/* Categories of Twisted Pair Comparison Table */}
      <Card className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md rounded-3xl">
        <div className="border-b border-slate-200/90 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900 flex items-center gap-2.5">
              <Layers size={24} className="text-sky-600" />
              Evolución de Categorías de Cable de Par Trenzado (Cat 5e a Cat 8)
            </h4>
            <p className="text-sm sm:text-base text-slate-600 mt-1 font-medium">
              Comparativa técnica de anchos de banda, velocidades máximas y límites físicos de distancia
            </p>
          </div>
          <span className="self-start sm:self-auto text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
            Norma ANSI/TIA-568
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left font-mono border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-200 text-slate-700 text-xs sm:text-sm font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Categoría</th>
                <th className="py-3.5 px-4 text-sky-700">Velocidad Máx.</th>
                <th className="py-3.5 px-4">Ancho de Banda</th>
                <th className="py-3.5 px-4 text-amber-700">Distancia Máx.</th>
                <th className="py-3.5 px-4">Blindaje Típico</th>
                <th className="py-3.5 px-4">Aplicación Principal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 text-xs sm:text-sm">
              {CABLE_CATEGORIES.map((cat: CableCategory) => (
                <tr key={cat.id} className="hover:bg-sky-50/50 transition-colors">
                  <td className="py-3 px-4 font-black text-slate-900 text-sm sm:text-base">{cat.name}</td>
                  <td className="py-3 px-4 text-sky-700 font-extrabold text-sm sm:text-base">{cat.maxSpeed}</td>
                  <td className="py-3 px-4 font-bold text-slate-700">{cat.bandwidth}</td>
                  <td className="py-3 px-4 text-amber-700 font-black">{cat.maxDistance}</td>
                  <td className="py-3 px-4 text-slate-600 font-semibold">{cat.shielding}</td>
                  <td className="py-3 px-4 text-xs sm:text-sm text-slate-600 font-sans">{cat.applications[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Datacenters, Servidores & DevOps"
        takeaway="Un software escalable requiere una infraestructura física que no sufra cuellos de botella en el enlace permanente ni caídas por cables mal rotulados."
      >
        <p>
          Cuando un ingeniero DevOps diseña la arquitectura física para un clúster on-premise (Bare-Metal Kubernetes) o un cuarto de servidores, el cableado estructurado es la primera línea de defensa.
        </p>
        <p>
          Si no se respetan las normas (como el límite estricto de 90 metros de cableado horizontal permanente o el radio de curvatura), el cable sufrirá <strong>Alien Crosstalk</strong> y atenuación resistiva. El switch descartará tramas silenciosamente en Capa 2 y los servidores experimentarán retransmisiones TCP severas, haciendo que tu aplicación responda lento sin que ningún log de software explique por qué.
        </p>
      </EngineeringConnection>
    </div>
  );
};
