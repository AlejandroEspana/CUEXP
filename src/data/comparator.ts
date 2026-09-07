export interface MediaProfile {
  id: string;
  name: string;
  type: 'guided' | 'unguided';
  category: 'Cobre' | 'Fibra' | 'RF' | 'Inalámbrico';
  maxDistanceMeters: number;
  maxDistanceLabel: string;
  maxThroughputGbps: number;
  maxThroughputLabel: string;
  emiImmunity: 1 | 2 | 3 | 4 | 5; // 1 = poor, 5 = immune
  costScore: 1 | 2 | 3 | 4 | 5; // 1 = very cheap, 5 = extremely expensive
  flexibilityScore: 1 | 2 | 3 | 4 | 5; // 1 = rigid, 5 = ultra flexible
  latencyScore: 1 | 2 | 3 | 4 | 5; // 5 = ultra low latency
  environment: ('indoor' | 'outdoor' | 'industrial' | 'datacenter')[];
  primaryUse: string;
  pros: string[];
  cons: string[];
  bestSuitedFor: string;
}

export const MEDIA_PROFILES: MediaProfile[] = [
  {
    id: 'utp-cat6',
    name: 'UTP / STP Cobre (Cat 6 / 6A)',
    type: 'guided',
    category: 'Cobre',
    maxDistanceMeters: 100,
    maxDistanceLabel: '100 metros',
    maxThroughputGbps: 10,
    maxThroughputLabel: '1 - 10 Gbps',
    emiImmunity: 3,
    costScore: 1,
    flexibilityScore: 5,
    latencyScore: 4,
    environment: ['indoor', 'datacenter'],
    primaryUse: 'Cableado horizontal de oficinas, puestos de trabajo, telefonía IP y PoE.',
    pros: ['Muy bajo costo de cable y conectores RJ45', 'Fácil de crimpar y manipular', 'Soporta alimentación PoE (hasta 90W)'],
    cons: ['Distancia limitada rígidamente a 100m', 'Susceptible a interferencias electromagnéticas fuertes y bucles de tierra'],
    bestSuitedFor: 'Conexión de estaciones de trabajo, impresoras de red y cámaras de seguridad dentro de un edificio.'
  },
  {
    id: 'coax-rg8',
    name: 'Coaxial RG-8 / Líneas RF de 50Ω',
    type: 'guided',
    category: 'RF',
    maxDistanceMeters: 500,
    maxDistanceLabel: 'Hasta 500 metros (10BASE5 legacy)',
    maxThroughputGbps: 0.01, // 10 Mbps
    maxThroughputLabel: '10 Mbps (digital) / RF analógica',
    emiImmunity: 4,
    costScore: 2,
    flexibilityScore: 3,
    latencyScore: 3,
    environment: ['indoor', 'outdoor'],
    primaryUse: 'Históricamente Ethernet 10BASE5; actualmente líneas de RF para radiocomunicaciones y antenas fijas.',
    pros: ['Excelente blindaje concéntrico frente a par trenzado sin blindaje', 'Buena impedancia controlada de 50Ω'],
    cons: ['Obsoleto para redes de datos de alta velocidad modernas', 'Cable grueso y rígido con conectores pesados'],
    bestSuitedFor: 'Sistemas de radiofrecuencia de dos vías, estaciones de radioaficionados y laboratorios analógicos.'
  },
  {
    id: 'heliax',
    name: 'Línea de Transmisión Coaxial Corrugada Heliax®',
    type: 'guided',
    category: 'RF',
    maxDistanceMeters: 200,
    maxDistanceLabel: '50 - 200 metros (vertical en mástiles)',
    maxThroughputGbps: 5, // RF signal capacity
    maxThroughputLabel: 'Alta potencia RF en GHz',
    emiImmunity: 5,
    costScore: 4,
    flexibilityScore: 2,
    latencyScore: 4,
    environment: ['outdoor'],
    primaryUse: 'Línea de alimentación de antenas en torres de telefonía celular 4G/5G y radiodifusión FM/TV.',
    pros: ['Blindaje absoluto de cobre continuo corrugado', 'Pérdida de señal mínima a frecuencias de GHz', 'Resistencia climática extrema en torres'],
    cons: ['Costo muy elevado por metro', 'Requiere herramientas de pelado y conectorización especializadas de alta precisión'],
    bestSuitedFor: 'Conexión entre las radios base y las antenas en lo alto de torres de telecomunicaciones.'
  },
  {
    id: 'fiber-smf',
    name: 'Fibra Óptica Monomodo (SMF - OS2)',
    type: 'guided',
    category: 'Fibra',
    maxDistanceMeters: 100000, // 100 km
    maxDistanceLabel: '40 a 120 km (sin repetidor)',
    maxThroughputGbps: 400,
    maxThroughputLabel: '100 Gbps a > 10 Terabits (DWDM)',
    emiImmunity: 5,
    costScore: 3,
    flexibilityScore: 3,
    latencyScore: 5,
    environment: ['outdoor', 'datacenter', 'indoor'],
    primaryUse: 'Backbone de telecomunicaciones, cables submarinos, interconexión de campus y Datacenter Interconnect (DCI).',
    pros: ['Cero dispersión modal y alcance kilométrico', 'Inmunidad total a interferencias electromagnéticas y descargas eléctricas', 'Ancho de banda casi ilimitado'],
    cons: ['Transceptores ópticos láser (LR/ER) más caros', 'Radio de curvatura delicado y empalmes por fusión de precisión micrónica'],
    bestSuitedFor: 'Troncales de campus, interconexión de edificios y redes WAN de alta capacidad.'
  },
  {
    id: 'fiber-mmf',
    name: 'Fibra Óptica Multimodo (MMF - OM3 / OM4)',
    type: 'guided',
    category: 'Fibra',
    maxDistanceMeters: 550,
    maxDistanceLabel: '100 a 550 metros',
    maxThroughputGbps: 100,
    maxThroughputLabel: '10 a 100 Gbps (SR4)',
    emiImmunity: 5,
    costScore: 2,
    flexibilityScore: 3,
    latencyScore: 5,
    environment: ['datacenter', 'indoor'],
    primaryUse: 'Cableado vertical interno de edificios, SAN (Storage Area Network) e interconexión Spine-Leaf en Datacenters.',
    pros: ['Transceptores ópticos tipo VCSEL (SR) mucho más económicos que los láseres de monomodo', 'Inmune a EMI y bucles de tierra'],
    cons: ['Distancia severamente limitada por dispersión modal en altas velocidades', 'No apta para enlaces interurbanos'],
    bestSuitedFor: 'Enlaces de alta velocidad (10G/40G/100G) entre racks de servidores en un mismo piso o centro de datos.'
  },
  {
    id: 'waveguide',
    name: 'Guía de Onda Metálica (Waveguide)',
    type: 'guided',
    category: 'RF',
    maxDistanceMeters: 50,
    maxDistanceLabel: '1 a 50 metros (bocina a transmisor)',
    maxThroughputGbps: 40,
    maxThroughputLabel: 'Gigavatios de potencia en microondas',
    emiImmunity: 5,
    costScore: 5,
    flexibilityScore: 1,
    latencyScore: 5,
    environment: ['outdoor', 'industrial'],
    primaryUse: 'Alimentación de antenas de radar militar/aéreo, enlaces terrestres de microondas y transmisores satelitales.',
    pros: ['Sin conductor central: no sufre pérdidas dieléctricas ni arcos voltaicos', 'Soporta potencias de pico gigantescas en microondas'],
    cons: ['Estructuras metálicas completamente rígidas', 'Corte inferior estricto de frecuencia (no transmite frecuencias bajas ni DC)', 'Costo y mecanizado de ultra precisión'],
    bestSuitedFor: 'Sistemas de radar de alta potencia y bocinas alimentadoras de antenas parabólicas de microondas.'
  },
  {
    id: 'wifi-7',
    name: 'Inalámbrico Wi-Fi 6 / 7 (802.11ax / 802.11be)',
    type: 'unguided',
    category: 'Inalámbrico',
    maxDistanceMeters: 40,
    maxDistanceLabel: '15 a 40 metros (interior)',
    maxThroughputGbps: 5,
    maxThroughputLabel: 'Hasta 9.6 - 46 Gbps teóricos',
    emiImmunity: 1,
    costScore: 2,
    flexibilityScore: 5,
    latencyScore: 2,
    environment: ['indoor', 'outdoor'],
    primaryUse: 'Movilidad de usuarios, dispositivos móviles, laptops, tablets e Internet de las Cosas (IoT).',
    pros: ['Cero cables hasta el dispositivo final', 'Despliegue rápido y soporte de miles de clientes móviles'],
    cons: ['Medio compartido en half-duplex con colisiones y contienda CSMA/CA', 'Vulnerable a atenuación por paredes, desvanecimiento multitrayecto e interferencias'],
    bestSuitedFor: 'Conectividad inalámbrica móvil para usuarios finales en oficinas, universidades y hogares.'
  }
];
