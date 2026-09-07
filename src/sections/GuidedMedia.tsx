import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { GuidedVsUnguidedDiagram } from '../components/network/GuidedVsUnguidedDiagram';
import { MediaComparator } from '../components/network/MediaComparator';
import { UtpStpTransversal } from '../components/network/UtpStpTransversal';
import { Cable, Scale, Layers } from 'lucide-react';

export const GuidedMedia = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="02 • TAXONOMÍA DE MEDIOS"
        badgeColor="cyan"
        icon={<Cable size={28} />}
        title="Medios Guiados vs. No Guiados"
        subtitle="Diferencias físicas entre señales confinadas en sólidos conductores y ondas radiadas en el espacio libre"
      />

      {/* Guided vs Unguided Comparison Panels */}
      <GuidedVsUnguidedDiagram />

      {/* Interactive UTP/STP Cutaway & Differential Physics Model */}
      <div className="space-y-6 pt-6 border-t-2 border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase text-sky-700 font-black tracking-wider">
              Anatomía Física de Medios Confinados
            </span>
            <h3 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mt-1 flex items-center gap-2.5">
              <Layers size={26} className="text-sky-600" />
              Estructura Microscópica y Física del Cableado UTP / STP / FTP
            </h3>
          </div>
          <span className="text-sm font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Exploración 3D Escalonada y Corte 2D Concéntrico
          </span>
        </div>

        <UtpStpTransversal />
      </div>

      {/* The Great Media Comparator */}
      <div className="space-y-6 pt-6 border-t-2 border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase text-sky-700 font-black tracking-wider">
              Herramienta de Decisión Técnica
            </span>
            <h3 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mt-1 flex items-center gap-2.5">
              <Scale size={26} className="text-sky-600" />
              "¿Qué medio de transmisión debería utilizar en mi proyecto?"
            </h3>
          </div>
          <span className="text-sm font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Ajusta los filtros para ver la recomendación en tiempo real
          </span>
        </div>

        <MediaComparator />
      </div>

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Sistemas Distribuidos & Latencia Predecible"
        takeaway="Los medios guiados ofrecen latencia determinista (jitter casi cero), esencial para clústeres de bases de datos y microservicios."
      >
        <p>
          En la nube y en Datacenters empresariales, los ingenieros de backend siempre eligen <strong>medios guiados (fibra óptica y cables DAC/cobre)</strong> para conectar servidores de bases de datos y nodos de clúster. La razón principal no es solo la velocidad bruta, sino el <strong>determinismo</strong>: un medio confinado no sufre interferencias repentinas ni contienda por el medio como el Wi-Fi o la radio.
        </p>
        <p>
          Un jitter de apenas 5 milisegundos en la red puede provocar que un algoritmo de consenso distribuido (como Raft en Kubernetes o Paxos en Google Spanner) asuma que el nodo líder ha muerto, iniciando elecciones innecesarias que degradan severamente la disponibilidad de tu aplicación.
        </p>
      </EngineeringConnection>
    </div>
  );
};
