export interface FiberTypeInfo {
  type: 'single' | 'multi';
  title: string;
  subtitle: string;
  coreDiameter: string;
  claddingDiameter: string;
  modes: string;
  lightSource: string;
  wavelengths: string[];
  maxDistance: string;
  bandwidth: string;
  attenuation: string;
  dispersion: string;
  costCategory: string;
  keyUseCases: string[];
}

export const FIBER_TYPES: Record<'single' | 'multi', FiberTypeInfo> = {
  single: {
    type: 'single',
    title: 'Fibra Monomodo (SMF - Single Mode Fiber)',
    subtitle: 'La autopista óptica para telecomunicaciones de ultra larga distancia',
    coreDiameter: '8 a 10 µm (micrómetros)',
    claddingDiameter: '125 µm',
    modes: 'Un único modo de propagación transversal (línea axial directa)',
    lightSource: 'Diodos Láser de estado sólido (DFB / Fabry-Perot)',
    wavelengths: ['1310 nm (segunda ventana, cero dispersión)', '1550 nm (tercera ventana, mínima atenuación)', '1625 nm (WDM / monitoreo)'],
    maxDistance: 'Hasta 40 - 120 km sin repetidores ópticos (cientos de km con amplificadores EDFA)',
    bandwidth: 'Prácticamente ilimitado (terabits por segundo mediante DWDM)',
    attenuation: 'Ultra baja: ~0.35 dB/km a 1310nm y ~0.20 dB/km a 1550nm',
    dispersion: 'Sin dispersión modal. Afectada únicamente por dispersión cromática.',
    costCategory: 'Cable económico, pero transceptores ópticos (SFP+ LR/ER/ZR) más costosos por requerir láseres precisos.',
    keyUseCases: [
      'Backbones nacionales e interurbanos de telecomunicaciones',
      'Cables submarinos intercontinentales',
      'Interconexión entre zonas de disponibilidad de nube (AWS / GCP Availability Zones)',
      'Redes de acceso FTTH GPON/XGS-PON'
    ]
  },
  multi: {
    type: 'multi',
    title: 'Fibra Multimodo (MMF - Multi Mode Fiber)',
    subtitle: 'Solución de alto rendimiento para distancias cortas y Datacenters',
    coreDiameter: '50 µm (OM2/OM3/OM4/OM5) o 62.5 µm (OM1 heredado)',
    claddingDiameter: '125 µm',
    modes: 'Cientos de modos ópticos que rebotan en múltiples ángulos por reflexión interna total',
    lightSource: 'LEDs (en OM1/OM2) o Láseres VCSEL a 850 nm (en OM3/OM4/OM5)',
    wavelengths: ['850 nm (primera ventana)', '1300 nm'],
    maxDistance: 'Hasta 300 - 550 metros a 10G/40G/100G (muy limitada más allá de 1 km)',
    bandwidth: 'Limitado por la dispersión modal diferencial (hasta 4700 MHz·km en OM4)',
    attenuation: 'Mayor atenuación: ~2.5 - 3.0 dB/km a 850nm',
    dispersion: 'Alta dispersión modal: los rayos de luz recorren diferentes caminos y llegan desfasados en el tiempo.',
    costCategory: 'Cable ligeramente más caro que SMF, pero transceptores (SFP+ SR) notablemente más económicos.',
    keyUseCases: [
      'Interconexión Spine-Leaf dentro de Datacenters corporativos',
      'Cableado horizontal y vertical dentro del mismo edificio comercial',
      'Redes de área de almacenamiento (SAN Fibre Channel)',
      'Conexión servidor-a-switch a 10G / 25G / 40G / 100G en distancias < 150m'
    ]
  }
};

export const MULTIMODE_CATEGORIES = [
  { grade: 'OM1', core: '62.5 µm', source: 'LED', bandwidth: '200 MHz·km', dist10G: '33 m', jacket: 'Naranja' },
  { grade: 'OM2', core: '50 µm', source: 'LED', bandwidth: '500 MHz·km', dist10G: '82 m', jacket: 'Naranja' },
  { grade: 'OM3', core: '50 µm (LOMMF)', source: 'VCSEL 850nm', bandwidth: '2000 MHz·km', dist10G: '300 m', jacket: 'Aqua' },
  { grade: 'OM4', core: '50 µm (LOMMF)', source: 'VCSEL 850nm', bandwidth: '4700 MHz·km', dist10G: '400 - 550 m', jacket: 'Magenta / Aqua' },
  { grade: 'OM5', core: '50 µm (WBMMF)', source: 'SWDM (850-953nm)', bandwidth: '28000 MHz·km (SWDM)', dist10G: '> 500 m', jacket: 'Verde Lima' }
];

export const ODF_DATA = {
  name: 'ODF (Optical Distribution Frame)',
  acronym: 'ODF - Bastidor de Distribución Óptica',
  environment: 'Interior (Data Centers, salas de equipos, POPs, cuartos de telecomunicaciones)',
  mounting: 'Rack estándar de 19 pulgadas (1U, 2U, 4U o gabinetes dedicados de alta densidad)',
  components: [
    {
      name: 'Bandejas de Empalme (Splice Trays)',
      description: 'Charolas deslizables con ranuras diseñadas para sostener los protectores de empalme por fusión (termocontraíbles con alma de acero) y almacenar holgura de fibra respetando el radio de curvatura.'
    },
    {
      name: 'Pigtails',
      description: 'Tramos cortos de fibra con un conector óptico pre-terminado en fábrica en un extremo y fibra desnuda en el otro, lista para fusionarse a los cables multifibra entrantes.'
    },
    {
      name: 'Panel de Acopladores (Adapters / Couplers)',
      description: 'Frontal con acopladores pasantes (LC duplex, SC simplex, MPO) donde se conectan los pigtails por detrás y los patch cords de servicio por el frente.'
    },
    {
      name: 'Gestión de Curvatura y Enrutamiento',
      description: 'Anillos plásticos y guías que impiden que los patch cords superen el radio crítico de curvatura (< 30 mm), evitando atenuación por micro/macrodoblado.'
    }
  ],
  purpose: 'Punto de interconexión flexible, administración, ordenamiento y mantenimiento de miles de enlaces de fibra hacia switches y routers activos.'
};

export const MUFLA_DATA = {
  name: 'Mufla de Fibra Óptica (Splice Closure)',
  acronym: 'FOSC - Fiber Optic Splice Closure',
  environment: 'Exterior extremo (postes aéreos, canalizaciones subterráneas, pozos de registro, arquetas con agua)',
  protectionGrade: 'IP68 (Hermética contra inmersión continua en agua, polvo, radiación solar UV y roedores)',
  types: [
    {
      type: 'Mufla Tipo Domo (Vertical)',
      description: 'Cilíndrica en forma de campana con todas las entradas de cable agrupadas en la base. Excelente estanqueidad hidráulica mediante sellos termorretráctiles o mecánicos de silicona.'
    },
    {
      type: 'Mufla Tipo En Línea (Horizontal)',
      description: 'Diseño rectangular alargado con entradas de cable en ambos extremos opuestos. Muy cómoda para arquetas o tendidos aéreos suspendidos en cable mensajero.'
    }
  ],
  components: [
    {
      name: 'Carcasa de Polímero de Alta Densidad (PP / PC)',
      description: 'Resistente a impactos mecánicos, aplastamiento, corrosión química y rayos UV.'
    },
    {
      name: 'Sistema de Sellado Hermético',
      description: 'Empaques de elastómero prensado o manguitos termocontraíbles con pegamento hot-melt que garantizan presión positiva y estanqueidad total.'
    },
    {
      name: 'Bandejas de Fusión Plegables',
      description: 'Permiten acceder a un grupo específico de empalmes sin perturbar los hilos de los demás tubos de transporte.'
    },
    {
      name: 'Válvula de Presurización',
      description: 'Permite inyectar aire a presión para realizar pruebas de fugas en campo mediante un manómetro.'
    }
  ],
  purpose: 'Proteger mecánicamente los empalmes por fusión en planta externa donde los cables de fibra deben continuarse o ramificarse.'
};

export const ODF_VS_MUFLA = {
  title: 'Diferencias Críticas: ODF vs. Mufla',
  comparison: [
    {
      feature: 'Entorno de Instalación',
      odf: 'Ambiente controlado (Interior, Rack 19", sala con aire acondicionado)',
      mufla: 'Ambiente hostil exterior (Aéreo en postes, subterráneo en buzones sumergidos en agua)'
    },
    {
      feature: 'Función Principal',
      odf: 'Terminación, distribución y administración frecuente con patch cords hacia equipos',
      mufla: 'Continuidad, ramificación y protección hermética definitiva de empalmes por fusión'
    },
    {
      feature: 'Conectividad Frontal',
      odf: 'Posee adaptadores accesibles (LC, SC) para conectar y desconectar cables de servicio',
      mufla: 'No posee conectores externos expuestos; los cables entran sellados herméticamente'
    },
    {
      feature: 'Mantenimiento y Frecuencia de Acceso',
      odf: 'Acceso diario por administradores de red para reconfigurar puertos',
      mufla: 'Acceso muy esporádico (solo para reparaciones de roturas de fibra o ampliaciones de red)'
    },
    {
      feature: 'Grado de Protección',
      odf: 'IP20 - IP30 (protección estándar contra polvo de oficina)',
      mufla: 'IP68 (Inmersión bajo agua hasta varios metros, resistencia a químicos del suelo)'
    }
  ]
};
