import { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Layout, 
  Lock, 
  Cpu, 
  Globe, 
  Layers, 
  Network, 
  Zap, 
  Router, 
  Cloud, 
  Server, 
  Database,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { cn } from '../layout/Layout';

interface JourneyStep {
  id: number;
  label: string;
  sublabel: string;
  icon: typeof User;
  medium: string;
  protocol: string;
  osiLayer: string;
  description: string;
  softwareDetail: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    label: 'Usuario',
    sublabel: 'Interacción en UI',
    icon: User,
    medium: 'Mano / Pantalla táctil',
    protocol: 'Eventos DOM (onClick)',
    osiLayer: 'Capa 7+',
    description: 'El usuario hace clic en el botón "Pagar Pedido" en su aplicación web React.',
    softwareDetail: 'El hilo principal del navegador procesa el evento y despacha un thunk o handler asíncrono.'
  },
  {
    id: 2,
    label: 'Frontend (React)',
    sublabel: 'Ejecución JavaScript',
    icon: Layout,
    medium: 'Memoria RAM / CPU de la laptop',
    protocol: 'Fetch / Axios API',
    osiLayer: 'Capa 7 (Aplicación)',
    description: 'El código crea un objeto JSON con los datos de la compra y llama a fetch("/api/checkout").',
    softwareDetail: 'Se genera el payload JSON serializado listo para transmitirse por el socket.'
  },
  {
    id: 3,
    label: 'Capa HTTPS / TLS',
    sublabel: 'Cifrado de Seguridad',
    icon: Lock,
    medium: 'Aceleración criptográfica CPU',
    protocol: 'TLS 1.3 (AES-256-GCM)',
    osiLayer: 'Capa 6 (Presentación)',
    description: 'La biblioteca criptográfica cifra el cuerpo JSON con la clave simétrica negociada.',
    softwareDetail: 'Protege contra espionaje Man-in-the-Middle (MitM) en el cable o Wi-Fi.'
  },
  {
    id: 4,
    label: 'Segmento TCP',
    sublabel: 'Control de Transporte',
    icon: Cpu,
    medium: 'Buffer de kernel del SO',
    protocol: 'TCP (Puerto 443)',
    osiLayer: 'Capa 4 (Transporte)',
    description: 'El sistema operativo añade cabecera TCP con número de secuencia y cálculo de checksum.',
    softwareDetail: 'Si el cable pierde un fragmento, TCP retransmitirá automáticamente el segmento.'
  },
  {
    id: 5,
    label: 'Paquete IP',
    sublabel: 'Direccionamiento Lógico',
    icon: Globe,
    medium: 'Stack TCP/IP del kernel',
    protocol: 'IPv4 / IPv6',
    osiLayer: 'Capa 3 (Red)',
    description: 'Se empaqueta con la IP origen local (192.168.1.15) y la IP pública del servidor cloud (104.22.8.9).',
    softwareDetail: 'El Time To Live (TTL) se inicializa en 64 para evitar bucles de enrutamiento infinitos.'
  },
  {
    id: 6,
    label: 'Trama Ethernet',
    sublabel: 'Entramado Físico L2',
    icon: Layers,
    medium: 'Tarjeta de Red (NIC)',
    protocol: 'IEEE 802.3 MAC Frame',
    osiLayer: 'Capa 2 (Enlace)',
    description: 'La NIC genera la trama con la MAC del router por defecto (Default Gateway) y código CRC-32.',
    softwareDetail: 'El MTU estándar limita la trama a 1500 bytes de carga útil sin fragmentar.'
  },
  {
    id: 7,
    label: 'Switch Local',
    sublabel: 'Conmutación por Hardware',
    icon: Network,
    medium: 'Cable UTP Cat 6 (Cobre 100Ω)',
    protocol: 'Ethernet Conmutado',
    osiLayer: 'Capa 2 / 1',
    description: 'Pasa por el cable de red hacia el switch del edificio; se conmuta en 2 microsegundos.',
    softwareDetail: 'La latencia de switching ASIC es prácticamente despreciable frente a la propagación WAN.'
  },
  {
    id: 8,
    label: 'Router Gateway',
    sublabel: 'Enrutamiento WAN',
    icon: Router,
    medium: 'Cable de Parcheo Óptico LC',
    protocol: 'BGP / NAT / OSPF',
    osiLayer: 'Capa 3',
    description: 'Traduce la IP privada a IP pública mediante NAT y decide el siguiente salto hacia el ISP.',
    softwareDetail: 'Aquí se aplican reglas de firewall y posibles políticas de calidad de servicio (QoS).'
  },
  {
    id: 9,
    label: 'Internet & Dorsal',
    sublabel: 'Backbone de Telecomunicaciones',
    icon: Zap,
    medium: 'Fibra Óptica Monomodo (DWDM)',
    protocol: 'Fotones a 1550nm por vidrio',
    osiLayer: 'Capa 1 (Física)',
    description: 'Los fotones de luz recorren 800 kilómetros de fibra óptica a 204,000 km/s por cables subterráneos.',
    softwareDetail: 'Es la mayor componente fija de latencia (RTT): ~4 milisegundos por cada 1,000 km recorridos.'
  },
  {
    id: 10,
    label: 'Data Center Cloud',
    sublabel: 'AWS / GCP / Azure',
    icon: Cloud,
    medium: 'Fibra Óptica Multimodo OM4',
    protocol: 'Red Spine-Leaf 100GbE',
    osiLayer: 'Capa 2 / 3',
    description: 'Llega al Edge Router del centro de datos y se distribuye por switches Top-of-Rack.',
    softwareDetail: 'Balanceador de carga (ALB) termina la sesión TLS y envía el tráfico al pod de Kubernetes.'
  },
  {
    id: 11,
    label: 'Backend Microservice',
    sublabel: 'Procesamiento de Negocio',
    icon: Server,
    medium: 'Socket Unix / DAC Twinax',
    protocol: 'Node.js / Go / Java',
    osiLayer: 'Capa 7 (Aplicación)',
    description: 'El framework lee la petición HTTP, valida el token JWT y ejecuta la lógica de cobro.',
    softwareDetail: 'El microservicio abre una conexión de pool hacia la base de datos distribuida.'
  },
  {
    id: 12,
    label: 'Base de Datos',
    sublabel: 'Persistencia ACID',
    icon: Database,
    medium: 'SSD NVMe / Red SAN',
    protocol: 'PostgreSQL / Raft consensus',
    osiLayer: 'Capa 7 / Disco',
    description: 'Se confirma la transacción en el motor transaccional y se replica al nodo secundario.',
    softwareDetail: 'Comienza el camino de respuesta de vuelta con el status 200 OK hacia el navegador del usuario.'
  }
];

export const WebTrafficJourney = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => (prev < JOURNEY_STEPS.length ? prev + 1 : 1));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const active = JOURNEY_STEPS[currentStep - 1];

  return (
    <div className="flex flex-col gap-6">
      {/* Player Header */}
      <Card className="p-4 sm:p-5 bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(p => !p)}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-sky-600 text-white font-black text-xs sm:text-sm hover:bg-sky-700 transition-colors shadow-md shadow-sky-600/20"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            <span>{isPlaying ? 'Pausar Simulación' : 'Reproducir Recorrido Automático'}</span>
          </button>
          <button
            onClick={() => { setIsPlaying(false); setCurrentStep(1); }}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Reiniciar"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm font-mono text-slate-600">
          <span>Paso Actual: </span>
          <span className="text-sky-700 font-black text-base px-2.5 py-0.5 bg-sky-50 rounded-lg border border-sky-200">{currentStep}</span>
          <span className="font-semibold">/ {JOURNEY_STEPS.length}</span>
        </div>
      </Card>

      {/* Progress Track Across 12 Hops */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {JOURNEY_STEPS.map((s) => {
          const isCurrent = s.id === currentStep;
          const isPassed = s.id < currentStep;
          return (
            <button
              key={s.id}
              onClick={() => { setIsPlaying(false); setCurrentStep(s.id); }}
              className={cn(
                "flex-shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all flex items-center gap-1.5 border-2 shadow-xs",
                isCurrent 
                  ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-md ring-2 ring-sky-400/40" 
                  : isPassed 
                    ? "bg-sky-50 border-sky-200 text-sky-900 font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              )}
            >
              <span>{s.id}.</span>
              <span className="truncate max-w-[110px]">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Showcase */}
      <Card glowColor="primary" className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Big Step Callout (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 bg-sky-50/70 rounded-3xl border border-sky-200 text-center shadow-xs">
              <div className="p-5 rounded-2xl bg-white border border-sky-200 text-sky-600 mb-4 shadow-sm">
                <active.icon size={50} />
              </div>
              <span className="text-xs font-mono text-sky-700 font-black uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-sky-200">
                Paso {active.id} de 12
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-2">
                {active.label}
              </h3>
              <span className="text-sm font-mono text-slate-600 mt-1 font-semibold">
                {active.sublabel}
              </span>
            </div>

            {/* Right Technical Specs (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-mono text-slate-500 uppercase font-bold block mb-1">Medio Físico:</span>
                  <span className="text-sm font-mono text-amber-800 font-extrabold">{active.medium}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-mono text-slate-500 uppercase font-bold block mb-1">Protocolo:</span>
                  <span className="text-sm font-mono text-sky-800 font-extrabold">{active.protocol}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-mono text-slate-500 uppercase font-bold block mb-1">Capa OSI:</span>
                  <span className="text-sm font-mono text-purple-800 font-extrabold">{active.osiLayer}</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase text-slate-500 font-extrabold mb-1.5">
                  ¿Qué sucede exactamente en este punto?
                </h5>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 font-normal">
                  {active.description}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase text-sky-800 font-extrabold mb-1.5">
                  Relevancia Crítica para el Ingeniero de Software
                </h5>
                <p className="text-sm sm:text-base text-sky-950 leading-relaxed bg-sky-50 p-4 rounded-2xl border border-sky-200 font-mono font-medium shadow-xs">
                  {active.softwareDetail}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};
