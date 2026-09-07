import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { OsiStack } from '../components/osi/OsiStack';
import { OsiLab } from '../components/osi/OsiLab';
import { Card } from '../components/ui/Card';
import { Network, ArrowDownUp } from 'lucide-react';

export const OsiModel = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="03 • ARQUITECTURA DE PROTOCOLOS"
        badgeColor="purple"
        icon={<Network size={28} className="text-purple-400" />}
        title="El Modelo OSI y la Capa Física"
        subtitle="El marco conceptual de 7 capas que estandariza la comunicación de datos y desacopla el software de la infraestructura física"
      />

      {/* 7 Layers Interactive Stack with Inspector */}
      <Card className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md rounded-3xl">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <span className="text-xs font-mono uppercase text-sky-700 font-extrabold tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Explorador de Arquitectura OSI (ISO/IEC 7498-1)
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-2">
            Las 7 Capas del Modelo de Referencia
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 font-normal">
            Selecciona la Capa 1 para ver su relación directa con los medios de transmisión físicos estudiados en esta exposición.
          </p>
        </div>

        <OsiStack interactive showDetails />
      </Card>

      {/* Interactive Encapsulation / Decapsulation Virtual Lab */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
            <ArrowDownUp size={22} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
            Laboratorio Interactivo de Encapsulación y Desencapsulación
          </h3>
        </div>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl font-sans leading-relaxed">
          Observa cómo una petición web se envuelve en cabeceras de transporte (TCP), red (IP) y enlace (Ethernet) hasta convertirse en bits en la Capa 1, y cómo el receptor invierte el proceso.
        </p>

        <OsiLab />
      </div>

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Troubleshooting Sistemático para Desarrolladores"
        takeaway="Cuando una API falla, el modelo OSI te permite aislar si el problema es de código (L7), puertos bloqueados (L4), enrutamiento (L3) o cable roto (L1)."
      >
        <p>
          Los mejores ingenieros de software utilizan el modelo OSI como una <strong>heurística de depuración mental</strong>. Cuando un servicio no responde:
        </p>
        <ul className="text-sm sm:text-base font-mono space-y-2.5 my-3 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-slate-800">
          <li><strong className="text-purple-700 font-black">• ¿Falla L7?</strong> El backend arrojó un HTTP 500 Internal Server Error (error en tu código / lógica de negocio).</li>
          <li><strong className="text-sky-700 font-black">• ¿Falla L4?</strong> El servidor rechaza la conexión con `ECONNREFUSED` (el proceso no está escuchando en el puerto TCP).</li>
          <li><strong className="text-blue-700 font-black">• ¿Falla L3?</strong> La petición arroja `No route to host` o timeout (problema de subredes, tablas de enrutamiento o VPN).</li>
          <li><strong className="text-emerald-700 font-black">• ¿Falla L2/L1?</strong> El cable de red está desconectado, el transceptor SFP falló o la fibra óptica se rompió.</li>
        </ul>
        <p>
          Entender estas capas te ahorra horas de intentar "arreglar código" cuando el problema real es una pérdida física de paquetes o una MTU mal configurada en el enlace de red.
        </p>
      </EngineeringConnection>
    </div>
  );
};
