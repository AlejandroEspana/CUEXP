export interface CoaxialLayer {
  id: string;
  name: string;
  material: string;
  function: string;
  color: string;
  thickness: string;
}

export const COAXIAL_LAYERS: CoaxialLayer[] = [
  {
    id: 'jacket',
    name: 'Cubierta Exterior (Jacket)',
    material: 'PVC, Polietileno (PE) resistente a UV o LSZH (baja emisión de humos)',
    function: 'Protege las capas internas contra abrasión mecánica, humedad, aceites, radiación solar y factores ambientales.',
    color: '#334155',
    thickness: '1.0 - 1.5 mm'
  },
  {
    id: 'shield',
    name: 'Blindaje Exterior (Malla y Lámina)',
    material: 'Trenza de alambres de cobre estañado y lámina de aluminio (Foil)',
    function: 'Actúa como conductor de retorno de tierra y como jaula de Faraday continua que confina el campo electromagnético dentro del dieléctrico, eliminando la radiación externa y el ruido EMI/RFI.',
    color: '#94a3b8',
    thickness: '0.2 - 0.4 mm'
  },
  {
    id: 'dielectric',
    name: 'Aislante Dieléctrico',
    material: 'Polietileno espumado (Foam PE), PTFE (Teflón) o polietileno sólido',
    function: 'Mantiene una separación geométrica concéntrica perfectamente uniforme entre el conductor central y la malla exterior. Su constante dieléctrica (εr) determina la velocidad de propagación y la impedancia característica.',
    color: '#f8fafc',
    thickness: '2.0 - 4.0 mm'
  },
  {
    id: 'core',
    name: 'Conductor Central (Núcleo)',
    material: 'Cobre sólido recocido, cobre estañado o acero recubierto de cobre (Copper Clad Steel - CCS)',
    function: 'Transporta la señal eléctrica de alta frecuencia. Debido al Efecto Pelicular (Skin Effect), a frecuencias de MHz y GHz la corriente circula casi exclusivamente por la superficie externa del conductor.',
    color: '#f59e0b',
    thickness: '0.8 - 2.8 mm'
  }
];

export const RG8_DATA = {
  name: 'Cable Coaxial RG-8 / RG-8U',
  family: 'Radio Guide (estándar militar MIL-C-17)',
  impedance: '50 Ohmios (±2Ω)',
  diameter: '~10.3 mm (0.405 pulgadas)',
  historicalImpact: {
    title: '10BASE5: El inicio de Ethernet ("Thicknet")',
    description: 'A principios de los años 80, Robert Metcalfe y Xerox/DEC/Intel utilizaron cables coaxiales gruesos similares al RG-8 como medio físico troncal de Ethernet (10BASE5). Se le conocía como "Yellow Cable" por su distintiva cubierta amarilla. Se pinchaba directamente con "transceptores vampiro" (vampire taps) sin necesidad de cortar el cable. Permitía segmentos de hasta 500 metros a 10 Mbps.'
  },
  modernApplications: [
    'Líneas de transmisión para radioafición (bandas HF, VHF y UHF)',
    'Alimentación de antenas fijas de comunicaciones de dos vías (policía, emergencias)',
    'Interconexión de instrumentación RF en bancos de prueba y laboratorios'
  ],
  attenuationCurve: [
    { freq: '10 MHz', loss: '1.8 dB / 100m' },
    { freq: '50 MHz', loss: '4.3 dB / 100m' },
    { freq: '100 MHz', loss: '6.6 dB / 100m' },
    { freq: '400 MHz', loss: '14.5 dB / 100m' },
    { freq: '1000 MHz (1 GHz)', loss: '26.0 dB / 100m' }
  ],
  academicCaution: 'El código "RG-8" es una denominación genérica militar antigua. Existen múltiples variantes comerciales en el mercado actual (RG-8/U, RG-8X, dieléctrico sólido vs. espuma microcelular, conductores CCS vs. cobre puro). Por tanto, un ingeniero nunca debe citar un único valor de atenuación o velocidad de propagación sin referirse a la hoja de datos técnica específica del fabricante (Belden, Times Microwave, etc.).'
};

export const HELIAX_DATA = {
  name: 'Líneas de Transmisión Coaxial Heliax®',
  origin: 'Marca registrada de CommScope (desarrollada originalmente por Andrew Corporation)',
  structure: {
    outerConductor: 'Tubo de cobre macizo con corrugación helicoidal o anular continua',
    dielectric: 'Polietileno espumado de celda cerrada con inyección de gas nitrógeno o espaciadores dieléctricos con aire',
    innerConductor: 'Tubo de cobre o alambre de aluminio revestido de cobre',
    jacket: 'Polietileno resistente a intemperie extrema y rayos UV'
  },
  advantages: [
    'Blindaje coaxial absoluto del 100%: Al tener un blindaje exterior de cobre sólido corrugado (no malla de alambres tejidos), no existe fuga electromagnética ni diafonía por micro-orificios.',
    'Atenuación ultra baja en GHz: La corrugación permite un diámetro exterior generoso (desde 1/2" hasta 1-5/8" o más) sin perder flexibilidad para doblarse en curvas sin colapsar el dieléctrico ni alterar su impedancia de 50Ω.',
    'Manejo de alta potencia de RF: Soporta cientos de vatios a kilovatios de transmisión continua sin degradación térmica.'
  ],
  primaryUse: 'Línea de bajada y alimentación entre los transceptores de radio (Remote Radio Units - RRU) y las antenas del mástil en torres de telefonía móvil celular (4G LTE / 5G), enlaces microondas y estaciones de radiodifusión FM/TV.'
};

export const WAVEGUIDES_DATA = {
  name: 'Guías de Onda Electromagnéticas (Waveguides)',
  definition: 'Estructuras tubulares metálicas huecas (generalmente rectangulares o circulares de cobre, latón o aluminio) que conducen ondas electromagnéticas de microondas mediante reflexiones en sus paredes internas conductoras.',
  physics: {
    cutoffFrequency: 'Poseen una frecuencia de corte inferior (fc). Señales por debajo de fc no se propagan (se atenúan exponencialmente como ondas evanescentes). Solo actúan como filtro paso alto.',
    modes: 'A diferencia del cable coaxial que transmite en modo TEM (Transverso Electromagnético), las guías de onda huecas no soportan TEM. Operan en modos TE (Transverso Eléctrico, Ez = 0) o TM (Transverso Magnético, Hz = 0). El modo fundamental en guía rectangular es el TE10.',
    zeroCenterConductor: 'Al no tener conductor central ni dieléctrico sólido, no sufren pérdidas dieléctricas ni peligro de ruptura por alto voltaje (arcos eléctricos), permitiendo transmitir gigavatios en pulsos de radar.'
  },
  comparisonVsCoaxial: [
    {
      parameter: 'Mecanismo de Guía',
      waveguide: 'Reflexión de ondas electromagnéticas en paredes metálicas internas',
      coaxial: 'Corrientes guiadas a lo largo de conductor central y malla exterior'
    },
    {
      parameter: 'Rango Óptimo de Frecuencia',
      waveguide: 'Microondas y ondas milimétricas (> 1 GHz hasta > 100 GHz)',
      coaxial: 'Desde DC hasta ~3 - 10 GHz (limitado por atenuación en frecuencias muy altas)'
    },
    {
      parameter: 'Atenuación a frecuencias microondas',
      waveguide: 'Mínima: no hay pérdidas en dieléctrico sólido ni resistencia del delgado conductor central',
      coaxial: 'Elevada: el efecto pelicular y la absorción dieléctrica crecen fuertemente con la frecuencia'
    },
    {
      parameter: 'Manejo de Potencia de Pico',
      waveguide: 'Extremadamente alta (Megavatios en radares y satélites)',
      coaxial: 'Moderada a baja (riesgo de ruptura dieléctrica por sobretensión)'
    },
    {
      parameter: 'Flexibilidad e Instalación',
      waveguide: 'Rígida, requiere codos y bridas de precisión calibradas al milímetro',
      coaxial: 'Flexible o semirrígido, fácil de enrutar por canalizaciones'
    }
  ],
  applications: [
    'Alimentadores de antenas de radar militar, meteorológico y de control aéreo',
    'Enlaces troncales terrestres de microondas (torre a torre)',
    'Cargas y bocinas alimentadoras de antenas parabólicas satelitales (uplinks / downlinks)'
  ]
};
