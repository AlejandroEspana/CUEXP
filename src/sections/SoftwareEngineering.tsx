import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { WebTrafficJourney } from '../components/network/WebTrafficJourney';
import { Card } from '../components/ui/Card';
import { Laptop, Server, Cpu } from 'lucide-react';

export const SoftwareEngineering = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="19 • EL ESLABÓN CLAVE"
        badgeColor="cyan"
        icon={<Laptop size={28} className="text-cyan" />}
        title="Ingeniería de Software e Infraestructura de Red"
        subtitle="Cómo el código de aplicación, las APIs distribuidas y la computación en la nube dependen de las propiedades físicas del canal"
      />

      {/* Complete Real-World Web Application Packet Journey */}
      <div className="space-y-4">
        <div className="border-b border-slate-200/90 pb-4">
          <span className="text-xs font-mono uppercase text-sky-700 font-black tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200 inline-block mb-2">
            Simulador de Arquitectura End-to-End
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">
            Recorrido Real de una Petición Web: Del Click a la Base de Datos
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 font-medium">
            Sigue cada uno de los 12 pasos físicos y de software que ocurren en milisegundos cuando un usuario interactúa con tu app.
          </p>
        </div>

        <WebTrafficJourney />
      </div>

      {/* Software Architecture to Physical Stack Mapping */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-200/90">
        <Card className="lg:col-span-5 p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md rounded-3xl flex flex-col justify-between">
          <div>
            <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900 mb-5 flex items-center gap-2.5">
              <Cpu size={24} className="text-sky-600" />
              La Pila del Desarrollador vs. El Medio Físico
            </h4>

            <div className="space-y-2.5 font-mono text-xs sm:text-sm">
              {[
                { layer: 'Capa de Aplicación', detail: 'React / FastAPI / GraphQL / JSON', bg: 'bg-purple-50 border-purple-200 text-purple-950', titleColor: 'text-purple-700' },
                { layer: 'Protocolo de Aplicación', detail: 'HTTPS / HTTP 2 / gRPC sobre TLS 1.3', bg: 'bg-indigo-50 border-indigo-200 text-indigo-950', titleColor: 'text-indigo-700' },
                { layer: 'Transporte Confiable', detail: 'TCP Sockets / Control de Congestión BBR', bg: 'bg-sky-50 border-sky-200 text-sky-950', titleColor: 'text-sky-700' },
                { layer: 'Red & Enrutamiento', detail: 'Paquetes IPv4 / IPv6 / Reglas BGP / NAT', bg: 'bg-blue-50 border-blue-200 text-blue-950', titleColor: 'text-blue-700' },
                { layer: 'Enlace Local', detail: 'Tramas Ethernet 802.3 / Tramas Wi-Fi 802.11', bg: 'bg-emerald-50 border-emerald-200 text-emerald-950', titleColor: 'text-emerald-700' },
                { layer: 'Medio Físico Real', detail: 'Fibra Óptica / Cable UTP Cat 6 / Antenas RF', bg: 'bg-amber-50 border-2 border-amber-400 text-amber-950', titleColor: 'text-amber-800' }
              ].map((item, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border flex flex-col justify-between shadow-xs ${item.bg}`}>
                  <span className={`font-black text-xs uppercase tracking-wider ${item.titleColor}`}>{item.layer}</span>
                  <span className="text-xs sm:text-sm font-sans mt-1 font-semibold opacity-95">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs sm:text-sm font-mono text-slate-600 mt-5 pt-4 border-t border-slate-200 font-medium">
            💡 Sin la base física inferior, ninguna de las capas de abstracción superiores puede existir ni ejecutar instrucciones.
          </div>
        </Card>

        {/* Distributed Software Relationships Grid (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <Card className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md rounded-3xl">
            <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900 mb-3 flex items-center gap-2.5">
              <Server size={24} className="text-purple-600" />
              "Una aplicación distribuida es tan dependiente de la red como del código"
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans mb-6">
              En la era de los microservicios y la computación en la nube, el mito del "servidor único" desapareció. Una sola solicitud de un usuario dispara en cascada decenas de llamadas RPC de red internas:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs hover:border-sky-300 transition-colors">
                <span className="text-sky-700 font-black block mb-1.5 text-xs sm:text-sm">Microservicio A ➔ Red ➔ Microservicio B</span>
                <span className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed block">
                  La latencia entre pods en Kubernetes se suma acumulativamente al tiempo de respuesta HTTP de la API.
                </span>
              </div>

              <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
                <span className="text-emerald-700 font-black block mb-1.5 text-xs sm:text-sm">Replicación Raft en Bases de Datos</span>
                <span className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed block">
                  Los clústeres de CockroachDB o Cassandra requieren confirmación de quórum por fibra antes de confirmar el commit.
                </span>
              </div>

              <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-300 transition-colors">
                <span className="text-purple-700 font-black block mb-1.5 text-xs sm:text-sm">Edge Computing & CDNs</span>
                <span className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed block">
                  Ejecutar funciones serverless en el "borde" (Edge) busca físicamente acortar los kilómetros de fibra óptica hacia el usuario.
                </span>
              </div>

              <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 transition-colors">
                <span className="text-amber-800 font-black block mb-1.5 text-xs sm:text-sm">IoT & Telemetría Masiva</span>
                <span className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed block">
                  Adaptar los serializadores (Protobuf vs JSON) a las restricciones extremas de canales inalámbricos sub-GHz.
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="La Tesis Central de la Exposición"
        takeaway="El software moderno no es un ente etéreo: vive, respira y escala condicionado por los electrones, fotones y ondas electromagnéticas que viajan por el medio físico."
      >
        <p>
          Los programadores que ignoran la infraestructura física diseñan aplicaciones frágiles que sufren de <em>cascading failures</em> cuando la red tiene micro-latencias. Los ingenieros de software senior que entienden los medios de transmisión diseñan arquitecturas resilientes con caching local, llamadas asíncronas con colas (Kafka/RabbitMQ), reintentos exponenciales con jitter y compresión eficiente, logrando sistemas robustos que toleran las imperfecciones del mundo real.
        </p>
      </EngineeringConnection>
    </div>
  );
};
