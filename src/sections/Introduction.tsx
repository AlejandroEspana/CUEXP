import { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { NetworkTransmissionHero } from '../components/network/NetworkTransmissionHero';
import { TransmissionPropsGrid } from '../components/network/TransmissionPropsGrid';
import { Card } from '../components/ui/Card';
import { Network, Activity } from 'lucide-react';

export const Introduction = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const modelElements = [
    { id: 'emisor', name: 'FUENTE / EMISOR', desc: 'Dispositivo o proceso que genera los datos brutos a comunicar (ej. proceso de software, navegador web).' },
    { id: 'transmisor', name: 'TRANSMISOR (PHY)', desc: 'Transductor que convierte la secuencia lógica de bits en señales analógicas o pulsos físicos adecuados para el medio (ej. transceptor de cobre, diodo láser).' },
    { id: 'medio', name: 'CANAL / MEDIO FÍSICO', desc: 'Soporte físico o espacio por donde viaja la energía de la señal electromagnética (cables de cobre, hilos de vidrio o el aire).' },
    { id: 'receptor', name: 'RECEPTOR', desc: 'Dispositivo físico que detecta la señal atenuada del medio y la reconvierte en una secuencia discreta de ceros y unos.' },
    { id: 'destino', name: 'DESTINO', desc: 'Proceso o servidor final que procesa y consume la información recibida (ej. base de datos, backend API).' }
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="01 • INTRODUCCIÓN Y FUNDAMENTOS"
        badgeColor="cyan"
        icon={<Network size={28} />}
        title="Medios de Transmisión de Datos"
        subtitle="Cómo viajan los datos desde la infraestructura física de telecomunicaciones hasta nuestras aplicaciones de software"
      />

      {/* Cinematic Hero Transmission Diagram */}
      <NetworkTransmissionHero />

      {/* Classic Shannon-Weaver Communication Model */}
      <Card className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-2">
          <div>
            <span className="text-xs font-mono uppercase text-sky-700 font-extrabold tracking-wider">
              Modelo Canónico de Telecomunicaciones (Shannon-Weaver)
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">
              La Cadena Universal de Comunicación de Datos
            </h3>
          </div>
          <span className="text-xs sm:text-sm font-mono text-slate-500 font-medium">Pasa el cursor sobre cada eslabón</span>
        </div>

        {/* Horizontal Chain Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
          {modelElements.map((elem, idx) => {
            const isHovered = hoveredNode === elem.id;
            return (
              <div
                key={elem.id}
                onMouseEnter={() => setHoveredNode(elem.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-center ${
                  isHovered
                    ? 'bg-sky-100 border-sky-600 text-sky-950 shadow-lg ring-2 ring-sky-400/40 scale-105'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50/50'
                }`}
              >
                <div className={`text-xs font-mono font-black mb-1 ${isHovered ? 'text-sky-800' : 'text-sky-700'}`}>
                  Paso 0{idx + 1}
                </div>
                <div className={`font-display font-black text-sm sm:text-base ${isHovered ? 'text-sky-950' : 'text-slate-900'}`}>
                  {elem.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="mt-5 p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sm font-mono text-slate-800 flex items-center gap-3 min-h-[60px] shadow-xs">
          <span className="text-sky-700 font-black flex-shrink-0">DESCRIPCIÓN:</span>
          <span className="font-medium">
            {hoveredNode
              ? modelElements.find(m => m.id === hoveredNode)?.desc
              : 'Pasa el cursor o toca cualquiera de los 5 bloques superiores para ver su función técnica detallada.'}
          </span>
        </div>
      </Card>

      {/* Grid of Key Transmission Properties */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Activity size={22} className="text-sky-600" />
          <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900">
            Propiedades Físicas Fundamentales de una Transmisión
          </h3>
        </div>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl font-sans">
          Cualquier medio de red está regido por estas variables físicas que fijan los límites matemáticos del rendimiento de tus aplicaciones. Haz clic en cada tarjeta para ver su fórmula y detalles.
        </p>
        <TransmissionPropsGrid />
      </div>

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Fundamentos de Redes para Desarrolladores"
        takeaway="La velocidad de una API no es infinita; está acotada por el tiempo de viaje de electrones o fotones a través del canal físico."
      >
        <p>
          Como ingenieros de software, tendemos a asumir que la red es un canal abstracto, confiable e instantáneo (una de las famosas <em>8 falacias de la computación distribuida</em>). Sin embargo, <strong>el software no viaja por el aire de forma mágica</strong>: cada llamada a una API REST, cada mensaje en un broker Kafka y cada transacción en PostgreSQL se traduce en pulsos electromagnéticos o de luz.
        </p>
        <p>
          Si no comprendes las limitaciones del medio físico (atenuación, ancho de banda y latencia irreducible), diseñarás sistemas con acoplamiento temporal excesivo, consultas SQL secuenciales tipo N+1 en red y timeouts mal calculados que colapsarán tus servicios en producción.
        </p>
      </EngineeringConnection>
    </div>
  );
};
