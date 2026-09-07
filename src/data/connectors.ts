export interface PinDefinition {
  pin: number;
  pairT568A: number;
  pairT568B: number;
  colorT568A: string;
  colorT568B: string;
  hexColorT568A: string;
  hexColorT568B: string;
  signal10_100: string; // TX+, TX-, RX+, RX-, Not used
  signalGigabit: string; // BI_DA+, BI_DA-, etc.
}

export const RJ45_PINS: PinDefinition[] = [
  {
    pin: 1,
    pairT568A: 3,
    pairT568B: 2,
    colorT568A: 'Blanco / Verde',
    colorT568B: 'Blanco / Naranja',
    hexColorT568A: '#86efac',
    hexColorT568B: '#fed7aa',
    signal10_100: 'TX+ (Transmit Data + en T568B)',
    signalGigabit: 'BI_DA+ (Bidirectional Pair A +)'
  },
  {
    pin: 2,
    pairT568A: 3,
    pairT568B: 2,
    colorT568A: 'Verde',
    colorT568B: 'Naranja',
    hexColorT568A: '#22c55e',
    hexColorT568B: '#f97316',
    signal10_100: 'TX- (Transmit Data - en T568B)',
    signalGigabit: 'BI_DA- (Bidirectional Pair A -)'
  },
  {
    pin: 3,
    pairT568A: 2,
    pairT568B: 3,
    colorT568A: 'Blanco / Naranja',
    colorT568B: 'Blanco / Verde',
    hexColorT568A: '#fed7aa',
    hexColorT568B: '#86efac',
    signal10_100: 'RX+ (Receive Data + en T568B)',
    signalGigabit: 'BI_DB+ (Bidirectional Pair B +)'
  },
  {
    pin: 4,
    pairT568A: 1,
    pairT568B: 1,
    colorT568A: 'Azul',
    colorT568B: 'Azul',
    hexColorT568A: '#3b82f6',
    hexColorT568B: '#3b82f6',
    signal10_100: 'Sin uso (o PoE DC +)',
    signalGigabit: 'BI_DC+ (Bidirectional Pair C +)'
  },
  {
    pin: 5,
    pairT568A: 1,
    pairT568B: 1,
    colorT568A: 'Blanco / Azul',
    colorT568B: 'Blanco / Azul',
    hexColorT568A: '#bfdbfe',
    hexColorT568B: '#bfdbfe',
    signal10_100: 'Sin uso (o PoE DC +)',
    signalGigabit: 'BI_DC- (Bidirectional Pair C -)'
  },
  {
    pin: 6,
    pairT568A: 2,
    pairT568B: 3,
    colorT568A: 'Naranja',
    colorT568B: 'Verde',
    hexColorT568A: '#f97316',
    hexColorT568B: '#22c55e',
    signal10_100: 'RX- (Receive Data - en T568B)',
    signalGigabit: 'BI_DB- (Bidirectional Pair B -)'
  },
  {
    pin: 7,
    pairT568A: 4,
    pairT568B: 4,
    colorT568A: 'Blanco / Marrón',
    colorT568B: 'Blanco / Marrón',
    hexColorT568A: '#d6d3d1',
    hexColorT568B: '#d6d3d1',
    signal10_100: 'Sin uso (o PoE DC -)',
    signalGigabit: 'BI_DD+ (Bidirectional Pair D +)'
  },
  {
    pin: 8,
    pairT568A: 4,
    pairT568B: 4,
    colorT568A: 'Marrón',
    colorT568B: 'Marrón',
    hexColorT568A: '#78350f',
    hexColorT568B: '#78350f',
    signal10_100: 'Sin uso (o PoE DC -)',
    signalGigabit: 'BI_DD- (Bidirectional Pair D -)'
  }
];

export const RJ8_ANALYSIS = {
  title: 'Desmitificando el término "RJ8": Rigor Académico',
  summary: 'En ingeniería de telecomunicaciones rigurosa, no existe un estándar formal de red de datos denominado "RJ8". Es una confusión o deformación coloquial.',
  points: [
    {
      topic: '¿Qué significa "RJ"?',
      detail: 'Registered Jack (RJ) es un estándar del sistema Bell y la FCC (EE.UU.) codificado en el Código de Regulaciones Federales (47 CFR Parte 68). No define un conector físico per se, sino un patrón de cableado para conectar equipos terminales a la red telefónica pública.'
    },
    {
      topic: 'El conector físico real: 8P8C',
      detail: 'El conector comúnmente llamado "RJ45" es físicamente un conector modular 8P8C (8 Positions, 8 Contacts). El verdadero RJ45 original (RJ45S) era un conector telefónico con pestaña con clave (keyed) y una resistencia de programación que hoy es incompatible con los puertos Ethernet modernos.'
    },
    {
      topic: 'Origen de la confusión con "RJ8"',
      detail: 'Surge de dos factores: 1) Comerciantes o técnicos que asumen erróneamente que porque tiene 8 pines debe llamarse "RJ8" (en analogía a que RJ11 tiene menos posiciones), y 2) Ciertas especificaciones propietarias antiguas de cableado serie de 8 pines (como conectores modulares de consolas Cisco o cableados USOC RJ48 para líneas T1/E1).'
    },
    {
      topic: 'Conclusión para Ingenieros de Software',
      detail: 'En especificaciones técnicas y documentación de infraestructura, utiliza "conector modular 8P8C según ANSI/TIA-568" o el universalmente aceptado "RJ45 (8P8C)". Evita utilizar "RJ8" en un contexto formal de redes Ethernet.'
    }
  ]
};

export const BNC_SPECS = {
  name: 'BNC (Bayonet Neill-Concelman)',
  inventors: 'Paul Neill (Bell Labs) y Carl Concelman (Amphenol)',
  coupling: 'Bayoneta de fijación rápida con giro de 1/4 de vuelta',
  types: [
    {
      impedance: '50 Ohmios',
      frequency: 'DC hasta 4 GHz',
      dielectric: 'Dieléctrico completo / aire',
      uses: ['Redes Ethernet heredadas 10BASE2 (Thinnet)', 'Transmisión de RF y radioafición', 'Equipos de prueba de laboratorio (Osciloscopios, Generadores)']
    },
    {
      impedance: '75 Ohmios',
      frequency: 'DC hasta 2-3 GHz (con variantes de precisión hasta 12 GHz para 4K UHD)',
      dielectric: 'Dieléctrico reducido o ausencia de teflón en la punta para mantener impedancia constante',
      uses: ['Video digital profesional (SDI, HD-SDI, 3G-SDI, 12G-SDI)', 'Distribución de televisión por cable (CATV)', 'Sistemas de videovigilancia analógica CCTV']
    }
  ],
  advantages: [
    'Conexión mecánica firme e inmune a desconexiones accidentales por tirones longitudinales',
    'Excelente blindaje electromagnético coaxial continuo de 360 grados',
    'Baja pérdida de inserción en altas frecuencias'
  ],
  cautions: [
    'Nunca forzar la conexión entre conectores BNC de 50Ω y 75Ω de marcas no compatibles, pues el pin central del conector de 50Ω es ligeramente más grueso y puede deformar permanentemente el zócalo hembra de 75Ω.'
  ]
};

export const FIBER_CONNECTORS = [
  {
    name: 'LC (Lucent Connector)',
    type: 'Push-Pull (Small Form Factor - SFF)',
    ferrule: '1.25 mm cerámica de circonio',
    density: 'Alta densidad (estándar indiscutible en SFP/SFP+ y Datacenters modernos)',
    loss: '0.1 - 0.2 dB típicamente'
  },
  {
    name: 'SC (Subscriber Connector)',
    type: 'Push-Pull cuadrado',
    ferrule: '2.5 mm cerámica',
    density: 'Media (ampliamente usado en FTTH, GPON y paneles ODF de distribución)',
    loss: '0.2 - 0.3 dB'
  },
  {
    name: 'ST (Straight Tip)',
    type: 'Bayoneta similar a BNC',
    ferrule: '2.5 mm cerámica o metal',
    density: 'Baja (instalaciones industriales y redes de campus heredadas)',
    loss: '0.25 - 0.4 dB'
  },
  {
    name: 'MPO / MTP (Multi-fiber Push-On)',
    type: 'Pestillo Push-Pull multifibra',
    ferrule: 'Matriz lineal de 8, 12, 16 o 24 fibras en una sola férula',
    density: 'Ultra alta densidad para enlaces troncales 40G / 100G / 400G en Datacenters (QSFP+)',
    loss: '0.35 - 0.5 dB'
  }
];
