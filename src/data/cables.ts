export interface CableCategory {
  id: string;
  name: string;
  standard: string;
  maxSpeed: string;
  bandwidth: string;
  maxDistance: string;
  shielding: string;
  gauge: string;
  applications: string[];
  features: string[];
}

export interface TransmissionProperty {
  id: string;
  name: string;
  iconName: string;
  definition: string;
  unit: string;
  impactOnSoftware: string;
  example: string;
  formula?: string;
}

export const CABLE_CATEGORIES: CableCategory[] = [
  {
    id: 'cat5e',
    name: 'Categoría 5e',
    standard: 'TIA/EIA-568-B.2',
    maxSpeed: '1 Gbps (1000BASE-T)',
    bandwidth: '100 MHz',
    maxDistance: '100 metros',
    shielding: 'UTP / STP',
    gauge: '24 AWG',
    applications: ['Redes LAN corporativas heredadas', 'Telefonía IP básica', 'Cámaras de seguridad 1080p'],
    features: ['Económico y altamente flexible', 'Paso mínimo para Gigabit Ethernet', 'Sensible a diafonía externa en canalizaciones densas']
  },
  {
    id: 'cat6',
    name: 'Categoría 6',
    standard: 'ANSI/TIA-568-C.2',
    maxSpeed: '10 Gbps (hasta 55m) / 1 Gbps (100m)',
    bandwidth: '250 MHz',
    maxDistance: '100 metros (1G) / 55 metros (10G)',
    shielding: 'UTP (con cruceta central) / F/UTP',
    gauge: '23-24 AWG',
    applications: ['Estándar actual en edificios comerciales', 'PoE+ (802.3at) hasta 30W', 'Oficinas modernas'],
    features: ['Separador longitudinal plástico (cruceta) para mitigar NEXT', 'Mejor relación señal/ruido que Cat5e']
  },
  {
    id: 'cat6a',
    name: 'Categoría 6A (Augmented)',
    standard: 'ANSI/TIA-568-C.2 / ISO/IEC 11801',
    maxSpeed: '10 Gbps (10GBASE-T)',
    bandwidth: '500 MHz',
    maxDistance: '100 metros completos',
    shielding: 'F/UTP o S/FTP recomendado',
    gauge: '23 AWG',
    applications: ['Datacenters Top-of-Rack', 'Hospitales y entornos con alta interferencia', 'PoE++ (802.3bt) hasta 90W'],
    features: ['Inmunidad crítica a Alien Crosstalk (ANEXT)', 'Mayor grosor y radio de curvatura más rígido']
  },
  {
    id: 'cat7',
    name: 'Categoría 7',
    standard: 'ISO/IEC 11801 Clase F',
    maxSpeed: '10 Gbps / 40 Gbps (hasta 15m)',
    bandwidth: '600 MHz',
    maxDistance: '100 metros',
    shielding: 'S/FTP (blindaje individual por par + malla global)',
    gauge: '23 AWG',
    applications: ['Entornos industriales severos', 'Subestaciones eléctricas', 'Datacenters de alta densidad'],
    features: ['Requiere blindaje riguroso en ambos extremos a tierra', 'No está formalmente reconocido por TIA/EIA americana para RJ45 común']
  },
  {
    id: 'cat8',
    name: 'Categoría 8 (8.1 / 8.2)',
    standard: 'ANSI/TIA-568-C.2-1 / ISO/IEC 11801-1',
    maxSpeed: '25 Gbps / 40 Gbps (25G/40GBASE-T)',
    bandwidth: '2000 MHz (2 GHz)',
    maxDistance: '30 metros (canal corto para Data Center)',
    shielding: 'S/FTP apantallado completo',
    gauge: '22-24 AWG',
    applications: ['Interconexión switch-a-servidor en Datacenters', 'Reemplazo de fibra óptica en distancias de rack a rack'],
    features: ['Rendimiento extremo en cobre', 'Limitado estrictamente a 30m de canal', 'Conector RJ45 blindado (8.1) o TERA/GG45 (8.2)']
  }
];

export const TRANSMISSION_PROPERTIES: TransmissionProperty[] = [
  {
    id: 'bandwidth',
    name: 'Ancho de Banda',
    iconName: 'Activity',
    definition: 'Capacidad máxima de transporte de frecuencias o volumen de información por unidad de tiempo a través del canal.',
    unit: 'Hz (Frecuencia analógica) o bps (Tasa digital)',
    impactOnSoftware: 'Determina el throughput máximo que tu backend puede emitir antes de que se llenen los buffers de salida (bufferbloat).',
    example: 'Cat6 ofrece 250 MHz; una fibra OM4 multimodo ofrece hasta 4700 MHz·km.',
    formula: 'C = B \\log_2(1 + SNR) \\text{ (Teorema de Shannon-Hartley)}'
  },
  {
    id: 'speed',
    name: 'Velocidad de Propagación',
    iconName: 'Zap',
    definition: 'Velocidad a la que la señal electromagnética o de luz se desplaza por el material físico respecto a la velocidad de la luz en el vacío (c).',
    unit: 'm/s o % de c (Nominal Velocity of Propagation - NVP)',
    impactOnSoftware: 'Fija el límite físico irreductible del tiempo de ida y vuelta (RTT) en llamadas API entre continentes.',
    example: 'En cable de cobre la NVP es ~65-70% de c (~200,000 km/s). En fibra de vidrio es ~67% de c.',
    formula: 'v = \\frac{c}{n} \\text{ (donde } n \\text{ es el índice de refracción)}'
  },
  {
    id: 'latency',
    name: 'Latencia',
    iconName: 'Clock',
    definition: 'Tiempo transcurrido desde que el primer bit sale del emisor hasta que llega y es interpretado por el receptor.',
    unit: 'Milisegundos (ms) / Microsegundos (µs)',
    impactOnSoftware: 'Crítico para microservicios y bases de datos distribuidas. Una latencia de 10ms en un loop de 100 consultas SQL añade 1 segundo entero a la respuesta HTTP.',
    example: 'Entre dos servidores en el mismo rack: <0.1 ms; entre Frankfurt y São Paulo: ~120 ms.',
    formula: 'Latencia = Retardo_{Propagación} + Retardo_{Transmisión} + Retardo_{Cola} + Retardo_{Procesamiento}'
  },
  {
    id: 'attenuation',
    name: 'Atenuación',
    iconName: 'TrendingDown',
    definition: 'Pérdida progresiva de potencia de la señal a medida que viaja por el medio de transmisión debido a resistencia óhmica, absorción y dispersión.',
    unit: 'Decibeles por metro (dB/m o dB/km)',
    impactOnSoftware: 'Si la atenuación sobrepasa el umbral del receptor, se pierden tramas a nivel de Capa 2 y TCP debe retransmitir paquetes, degradando drásticamente el rendimiento.',
    example: 'El cable UTP no debe exceder 100 metros; la fibra monomodo a 1550nm pierde apenas ~0.2 dB/km.',
    formula: 'A(dB) = 10 \\log_{10}\\left(\\frac{P_{in}}{P_{out}}\\right)'
  },
  {
    id: 'noise',
    name: 'Ruido e Interferencia',
    iconName: 'Radio',
    definition: 'Energía electromagnética no deseada introducida al medio desde fuentes externas (motores, fluorescentes, radiofrecuencia) o internas (térmico).',
    unit: 'Relación Señal/Ruido (SNR en dB)',
    impactOnSoftware: 'Genera inversión de bits en la Capa Física, provocando que los algoritmos de verificación CRC descarten tramas completas.',
    example: 'Un cable de red Cat5e sin blindaje colocado junto a un cable eléctrico de 220V sufre inducción electromagnética severa.',
    formula: 'SNR = 10 \\log_{10}\\left(\\frac{P_{señal}}{P_{ruido}}\\right)'
  },
  {
    id: 'crosstalk',
    name: 'Crosstalk (Diafonía)',
    iconName: 'Share2',
    definition: 'Acoplamiento electromagnético no intencionado entre pares de hilos adyacentes dentro del mismo cable (NEXT/FEXT) o entre cables vecinos (Alien NEXT).',
    unit: 'Decibeles (dB)',
    impactOnSoftware: 'Provoca errores de transmisión aleatorios que se manifiestan en la aplicación como timeouts esporádicos o caídas repentinas de throughput.',
    example: 'Los cables UTP trenzan cada par a un paso (trenzados por metro) diferente precisamente para anular el crosstalk mutuo.',
    formula: 'NEXT = 10 \\log_{10}\\left(\\frac{P_{emitida}}{P_{inducida\\ en\\ par\\ vecino}}\\right)'
  },
  {
    id: 'ber',
    name: 'Tasa de Error de Bit (BER)',
    iconName: 'AlertTriangle',
    definition: 'Proporción de bits recibidos con error respecto al total de bits transmitidos durante un intervalo de tiempo.',
    unit: 'Adimensional (ej. 10⁻⁹, 10⁻¹²)',
    impactOnSoftware: 'A mayor BER, el protocolo TCP activa algoritmos de control de congestión (como Cubic o BBR) asumiendo erróneamente que la red está congestionada y reduciendo la ventana de emisión.',
    example: 'Enlaces de fibra óptica modernos garantizan un BER inferior a 10⁻¹² (menos de un bit erróneo por cada billón transmitido).',
    formula: 'BER = \\frac{\\text{Bits con error}}{\\text{Total de bits transmitidos}}'
  },
  {
    id: 'emi_immunity',
    name: 'Inmunidad Electromagnética',
    iconName: 'ShieldCheck',
    definition: 'Capacidad del medio de transmisión de ser inmune a las perturbaciones electromagnéticas del entorno.',
    unit: 'Cualitativa / Coeficiente de apantallamiento (dB)',
    impactOnSoftware: 'La fibra óptica posee 100% de inmunidad a EMI (conduce fotones dieléctricos, no electrones), permitiendo comunicaciones seguras en centros industriales y sin bucles de tierra.',
    example: 'Tendido de comunicación a lo largo de líneas de alta tensión o subestaciones eléctricas requiere exclusivamente fibra óptica.',
    formula: 'SE(dB) = 20 \\log_{10}\\left(\\frac{E_{incidente}}{E_{transmitido}}\\right)'
  }
];
