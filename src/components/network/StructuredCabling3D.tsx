import { useState } from 'react';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { Building2, Server, Shuffle, Network, Cable, Zap } from 'lucide-react';
import { cn } from '../layout/Layout';

type CablingComponent = 'rack' | 'patchpanel' | 'switch' | 'backbone' | 'horizontal' | 'faceplate' | 'workarea';

interface ComponentDetail {
  id: CablingComponent;
  title: string;
  category: string;
  norm: string;
  specs: string;
  description: string;
  maintenanceTip: string;
  softwareConnection: string;
}

const DETAILS: Record<CablingComponent, ComponentDetail> = {
  rack: {
    id: 'rack',
    title: 'Gabinete / Rack de Telecomunicaciones (TR - Telecom Room)',
    category: 'Infraestructura Central',
    norm: 'EIA/ECA-310-E (19 pulgadas estándar)',
    specs: 'Alturas estándar de 12U a 45U, profundidad de 800mm a 1200mm para servidores.',
    description: 'Armario metálico ventilado que centraliza los equipos activos (switches, routers) y pasivos (patch panels, ODFs). Permite la administración, ordenamiento y seguridad física de todo el cableado del piso.',
    maintenanceTip: 'Mantener organizadores verticales y horizontales de cables (D-rings) para no estrangular el radio de curvatura y permitir circulación de aire frío.',
    softwareConnection: 'Aquí se alojan los servidores locales o micro-datacenters on-premise que ejecutan tus clústeres de pruebas o proxies inversos locales.'
  },
  patchpanel: {
    id: 'patchpanel',
    title: 'Patch Panel (Panel de Parcheo)',
    category: 'Elemento Pasivo',
    norm: 'ANSI/TIA-568.2-D',
    specs: '24 o 48 puertos RJ45 en 1U o 2U, bloques IDC tipo 110 o Krone por detrás.',
    description: 'Matriz pasiva donde terminan de forma fija y permanente los cables horizontales que vienen empotrados por canaletas y ductos desde las tomas de pared (faceplates). Evita conectar y desconectar el cable de obra directamente al switch.',
    maintenanceTip: 'Cada puerto debe estar rotulado rigurosamente (ej. P2-D04 = Piso 2, Datos, toma 04) para que cualquier mantenimiento no requiera rastreo con generador de tonos.',
    softwareConnection: 'Protege las tarjetas de red de tus servidores caros: cualquier desgaste mecánico ocurre en los patch cords económicos ($2) y no en el cableado estructural permanente.'
  },
  switch: {
    id: 'switch',
    title: 'Switch de Distribución / Acceso',
    category: 'Elemento Activo (Capa 2)',
    norm: 'IEEE 802.3 (Ethernet) / IEEE 802.3at/bt (PoE)',
    specs: '24/48 puertos 10/100/1000 Mbps + uplinks 10G SFP+, tabla CAM de direcciones MAC, VLANs.',
    description: 'Dispositivo activo inteligente que recibe tramas Ethernet y las conmuta con latencia de microsegundos hacia el puerto destino según la dirección MAC, segmentando dominios de colisión.',
    maintenanceTip: 'Monitorear la temperatura interna, ventiladores y saturación de ancho de banda mediante SNMP / Prometheus.',
    softwareConnection: 'Gestiona la calidad de servicio (QoS) y prioriza paquetes de VoIP o peticiones API críticas sobre descargas pesadas de backups.'
  },
  backbone: {
    id: 'backbone',
    title: 'Cableado Troncal (Backbone Riser / Campus)',
    category: 'Troncal Vertical',
    norm: 'ANSI/TIA-568.1-D',
    specs: 'Fibra óptica Monomodo OS2 o Multimodo OM4 (10 Gbps a 100 Gbps). Distancia máxima de 300m a 2000m.',
    description: 'La autopista vertical que interconecta el cuarto de equipos principal (MDF) con los cuartos de telecomunicaciones de cada piso (IDF), o entre distintos edificios del campus.',
    maintenanceTip: 'Debe transcurrir por ductos verticales contra-incendios (Riser rated - CMR/CMP) y contar con fibras de respaldo (dark fiber) para redundancia inmediata.',
    softwareConnection: 'Un fallo en el backbone incomunica pisos enteros. Es la razón por la cual los desarrolladores implementan arquitecturas tolerantes a fallos (Multi-AZ).'
  },
  horizontal: {
    id: 'horizontal',
    title: 'Cableado Horizontal',
    category: 'Distribución al Puesto',
    norm: 'ANSI/TIA-568.2-D',
    specs: 'Cable UTP Cat 6 / 6A de 4 pares trenzados (100Ω). Límite rígido de 90 metros de enlace permanente + 10m de patch cords.',
    description: 'Tendido físico de cables desde el patch panel del cuarto de telecomunicaciones hasta la toma modular en la estación de trabajo. Ningún cable puede tener derivaciones en puente (bridge taps) ni empalmes intermedios.',
    maintenanceTip: 'Nunca instalar paralelo a cables eléctricos de 220V/440V sin una separación mínima de 20 a 30 cm o blindaje metálico para evitar inducción electromagnética.',
    softwareConnection: 'Garantiza el canal full-duplex de 1 Gbps / 10 Gbps que alimenta tu computadora de desarrollo con cero contienda de red.'
  },
  faceplate: {
    id: 'faceplate',
    title: 'Toma de Pared y Jack Modular (Faceplate & Keystone)',
    category: 'Área de Trabajo',
    norm: 'ANSI/TIA-568 con jack hembra RJ45 (8P8C)',
    specs: 'Jack Keystone Cat 6 crimpado según T568A o T568B con contactos bañados en oro de 50 micropulgadas.',
    description: 'Punto de conexión final montado en pared o canaleta de piso que expone los conectores hembra RJ45 para datos, telefonía VoIP o alimentación PoE.',
    maintenanceTip: 'No destrenzar más de 13 mm (0.5 pulgadas) de cable al crimpar el Keystone para evitar diafonía en el extremo.',
    softwareConnection: 'El punto de contacto físico tangible donde conectas tu laptop para trabajar en la oficina.'
  },
  workarea: {
    id: 'workarea',
    title: 'Área de Trabajo (Work Area)',
    category: 'Puesto de Usuario',
    norm: 'Cables de parcheo flexibles de hasta 5 metros',
    specs: 'Conductores trenzados multifilar (stranded) para máxima flexibilidad mecánica.',
    description: 'Componentes que se extienden desde la toma de pared hasta los equipos finales: patch cord flexible RJ45, PC de escritorio, teléfono IP, Access Point o impresora de red.',
    maintenanceTip: 'Utilizar cables con protectores de pestaña (snagless boots) para no quebrar el pestillo plástico al jalar cables debajo de mesas.',
    softwareConnection: 'Donde corre el navegador web, IDEs y herramientas que generan las peticiones de software.'
  }
};

export const StructuredCabling3D = () => {
  const [selectedComponent, setSelectedComponent] = useState<CablingComponent>('rack');

  const detail = DETAILS[selectedComponent];

  return (
    <div className="flex flex-col gap-8">
      {/* Visual Building Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Schematic Building Canvas (7 cols) */}
        <Card className="lg:col-span-7 bg-white p-6 sm:p-8 border border-slate-200/90 shadow-md relative overflow-hidden flex flex-col justify-between rounded-3xl">
          <div className="flex items-center justify-between border-b border-slate-200/90 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
                <Building2 size={22} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight">
                  Topología de Cableado Estructurado
                </h3>
                <span className="text-xs sm:text-sm font-mono text-slate-500 font-semibold">
                  Normas ANSI/TIA-568-D / ISO/IEC 11801
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-sky-700 font-bold bg-sky-50 border border-sky-200 px-3 py-1 rounded-full hidden sm:inline">
              Haz clic para inspeccionar
            </span>
          </div>

          {/* Building Schematic Cutaway */}
          <div className="relative flex-1 min-h-[400px] bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
            {/* FLOOR 2 */}
            <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-4 bg-white shadow-sm">
              <div className="text-xs font-mono font-black text-slate-700 mb-3 flex justify-between items-center">
                <span className="tracking-wide">PISO 2: ÁREA DE USUARIOS & LABS</span>
                <span className="text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-lg">IDF Piso 2</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => setSelectedComponent('patchpanel')}
                  className={cn(
                    "p-3 rounded-xl border-2 text-xs sm:text-sm font-mono text-left transition-all font-bold shadow-xs",
                    selectedComponent === 'patchpanel' ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-md ring-2 ring-sky-400/40" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <Shuffle size={16} className={cn("mb-1", selectedComponent === 'patchpanel' ? "text-sky-700" : "text-sky-600")} />
                  Patch Panel P2
                </button>

                <button
                  onClick={() => setSelectedComponent('switch')}
                  className={cn(
                    "p-3 rounded-xl border-2 text-xs sm:text-sm font-mono text-left transition-all font-bold shadow-xs",
                    selectedComponent === 'switch' ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-md ring-2 ring-sky-400/40" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <Network size={16} className={cn("mb-1", selectedComponent === 'switch' ? "text-sky-700" : "text-sky-600")} />
                  Switch Acceso
                </button>

                <button
                  onClick={() => setSelectedComponent('horizontal')}
                  className={cn(
                    "p-3 rounded-xl border-2 text-xs sm:text-sm font-mono text-left transition-all font-bold shadow-xs",
                    selectedComponent === 'horizontal' ? "bg-amber-100 border-amber-600 text-amber-950 font-black shadow-md ring-2 ring-amber-400/40" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <Cable size={16} className={cn("mb-1", selectedComponent === 'horizontal' ? "text-amber-700" : "text-amber-600")} />
                  Cat 6 (&lt;90m)
                </button>
              </div>

              <div className="mt-3 flex justify-end gap-2.5">
                <button
                  onClick={() => setSelectedComponent('faceplate')}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono border-2 transition-all font-bold",
                    selectedComponent === 'faceplate' ? "bg-emerald-100 border-emerald-600 text-emerald-950 font-black shadow-sm ring-2 ring-emerald-400/40" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/60"
                  )}
                >
                  Faceplate RJ45
                </button>
                <button
                  onClick={() => setSelectedComponent('workarea')}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono border-2 transition-all font-bold",
                    selectedComponent === 'workarea' ? "bg-purple-100 border-purple-600 text-purple-950 font-black shadow-sm ring-2 ring-purple-400/40" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/60"
                  )}
                >
                  PC / Workstation
                </button>
              </div>
            </div>

            {/* VERTICAL RISER BACKBONE CONNECTOR */}
            <div className="my-3 flex items-center justify-between px-6">
              <button
                onClick={() => setSelectedComponent('backbone')}
                className={cn(
                  "w-full py-3 px-5 rounded-2xl text-xs sm:text-sm font-mono font-black flex items-center justify-center gap-2.5 border-2 transition-all relative overflow-hidden shadow-sm",
                  selectedComponent === 'backbone'
                    ? "bg-purple-100 border-purple-600 text-purple-950 shadow-md ring-2 ring-purple-400/40"
                    : "bg-white border-purple-300 text-purple-800 hover:bg-purple-50"
                )}
              >
                <Zap size={18} className={selectedComponent === 'backbone' ? "text-purple-700" : "text-purple-600"} />
                <span>BACKBONE VERTICAL DE FIBRA ÓPTICA RISER (10G/40G)</span>
                <motion.div
                  animate={{ left: ['-20%', '100%'] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
                />
              </button>
            </div>

            {/* FLOOR 1 & MAIN EQUIPMENT ROOM */}
            <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-4 bg-white shadow-sm">
              <div className="text-xs font-mono font-black text-slate-700 mb-3 flex justify-between items-center">
                <span className="tracking-wide">PISO 1 / DATA CENTER: CUARTO PRINCIPAL (MDF)</span>
                <span className="text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-lg">MDF Central</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => setSelectedComponent('rack')}
                  className={cn(
                    "p-3 rounded-xl border-2 text-xs sm:text-sm font-mono text-left transition-all font-bold shadow-xs",
                    selectedComponent === 'rack' ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-md ring-2 ring-sky-400/40" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <Server size={18} className={cn("mb-1", selectedComponent === 'rack' ? "text-sky-700" : "text-sky-600")} />
                  Rack Central 42U
                </button>

                <button
                  onClick={() => setSelectedComponent('switch')}
                  className={cn(
                    "p-3 rounded-xl border-2 text-xs sm:text-sm font-mono text-left transition-all font-bold shadow-xs",
                    selectedComponent === 'switch' ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-md ring-2 ring-sky-400/40" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <Network size={18} className={cn("mb-1", selectedComponent === 'switch' ? "text-sky-700" : "text-sky-600")} />
                  Switch Core / L3
                </button>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-100/70 text-xs sm:text-sm font-mono text-slate-600">
                  <div className="text-xs uppercase font-extrabold text-slate-700">Acometida ISP</div>
                  Fibra WAN Externa
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Selected Component Technical Spec (5 cols) */}
        <Card glowColor="primary" className="lg:col-span-5 p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md flex flex-col justify-between rounded-3xl">
          <div className="space-y-5">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-700 font-extrabold block">
                {detail.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">
                {detail.title}
              </h3>
              <div className="text-sm font-mono text-slate-600 mt-1.5">
                Norma aplicable: <strong className="text-slate-900 font-bold">{detail.norm}</strong>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase text-slate-500 font-extrabold mb-1.5">
                Función en la Infraestructura
              </h5>
              <p className="text-slate-700 text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-normal">
                {detail.description}
              </p>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase text-sky-700 font-extrabold mb-1.5">
                Especificaciones Clave
              </h5>
              <p className="text-sky-950 text-sm font-mono bg-sky-50 p-3 rounded-xl border border-sky-200/80 font-bold">
                {detail.specs}
              </p>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase text-emerald-700 font-extrabold mb-1.5">
                Regla de Mantenimiento / Instalación
              </h5>
              <p className="text-emerald-950 text-sm leading-relaxed bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200/80 font-medium">
                {detail.maintenanceTip}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-sm font-mono text-slate-700 bg-purple-50/70 p-3.5 rounded-xl border border-purple-200">
            <strong className="text-purple-800 font-extrabold">Impacto en Software: </strong>
            {detail.softwareConnection}
          </div>
        </Card>
      </div>

      {/* Structured Cabling Sub-Services Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'Datos de Alta Velocidad', desc: 'Ethernet 1G/10G sobre par trenzado y fibra. Tráfico TCP/IP para aplicaciones y microservicios.', tag: '10GBASE-T' },
          { title: 'Telefonía IP (VoIP)', desc: 'Reemplazó el cableado telefónico separado. Los teléfonos IP se conectan al mismo switch de datos corporativo.', tag: 'SIP / RTP' },
          { title: 'Power over Ethernet (PoE)', desc: 'Alimentación eléctrica simultánea (15W a 90W) para APs, cámaras y sensores sobre el mismo cable UTP.', tag: '802.3bt (90W)' },
          { title: 'Sistemas de Control / IoT', desc: 'Control de acceso biométrico, climatización (HVAC) y sensores integrados al cableado unificado del edificio.', tag: 'BMS / Modbus' }
        ].map((srv, idx) => (
          <Card key={idx} className="p-5 sm:p-6 bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-display font-black text-slate-900">{srv.title}</h4>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200 font-bold">{srv.tag}</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">{srv.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
