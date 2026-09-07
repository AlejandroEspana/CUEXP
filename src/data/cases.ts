export interface CaseOption {
  id: string;
  name: string;
  description: string;
  isCorrect: boolean;
}

export interface PracticalCase {
  id: string;
  number: number;
  title: string;
  context: string;
  constraints: string[];
  options: CaseOption[];
  correctId: string;
  solutionTitle: string;
  detailedRationale: string;
  whyOthersFail: { [optionId: string]: string };
  osiLayers: {
    layer: number;
    name: string;
    role: string;
  }[];
  softwareEngineeringImpact: string;
}

export const PRACTICAL_CASES: PracticalCase[] = [
  {
    id: 'case-campus',
    number: 1,
    title: 'Interconexión de Edificios Universitarios',
    context: 'La universidad necesita interconectar el edificio de la Facultad de Ingeniería de Software con el Data Center Central situado a 1.5 km a través del campus exterior. La troncal debe soportar un enlace de 40 Gbps para replicación de máquinas virtuales y acceso a internet de 3,000 estudiantes.',
    constraints: [
      'Distancia total: 1,500 metros en planta externa.',
      'Riesgo de tormentas eléctricas y descargas atmosféricas directas.',
      'Diferencias de potencial de tierra entre ambos edificios.',
      'Ancho de banda requerido: Mínimo 40 Gbps escalable a 100 Gbps.'
    ],
    options: [
      { id: 'cat6a', name: 'Cable de Cobre Cat 6A UTP/STP', description: 'Tendido de cable de cobre por canalización subterránea.', isCorrect: false },
      { id: 'mmf', name: 'Fibra Óptica Multimodo OM4', description: 'Cable de fibra multimodo con transceptores VCSEL 850nm.', isCorrect: false },
      { id: 'smf', name: 'Fibra Óptica Monomodo OS2 (SMF)', description: 'Cable troncal de fibra monomodo de 24 hilos con transceptores 40GBASE-LR4 a 1310nm.', isCorrect: true },
      { id: 'wifi', name: 'Enlace inalámbrico Wi-Fi 6 punto a punto', description: 'Antenas direccionales inalámbricas en los techos.', isCorrect: false }
    ],
    correctId: 'smf',
    solutionTitle: 'Fibra Óptica Monomodo (OS2) en Planta Externa',
    detailedRationale: 'La fibra monomodo es la única opción que cumple simultáneamente los tres requisitos críticos: distancia (1.5 km excede el límite de 100m de cobre y los 400m de multimodo a 10G/40G), ancho de banda (soporta terabits mediante DWDM/CWDM), e inmunidad galvánica total: al ser un hilo de vidrio dieléctrico no conduce electricidad, protegiendo los switches de ambos edificios contra diferencias de potencial de tierra y descargas atmosféricas (rayos).',
    whyOthersFail: {
      cat6a: 'Cat 6A tiene un límite físico estricto de 100 metros según norma ANSI/TIA-568. A 1,500 metros la atenuación degrada la señal a cero. Además, un conductor metálico de 1.5 km entre edificios crearía bucles de tierra destructivos por diferencias de potencial.',
      mmf: 'La fibra multimodo OM4 a 40 Gbps tiene un alcance máximo de 150 metros debido a la dispersión modal. A 1.5 km los pulsos de luz se solaparían completamente.',
      wifi: 'Un enlace Wi-Fi punto a punto no garantiza una troncal determinista de 40 Gbps con baja latencia y se degradaría severamente con lluvia intensa, viento y niebla.'
    },
    osiLayers: [
      { layer: 1, name: 'Capa Física', role: 'Propagación de fotones infrarrojos a 1310nm por el núcleo de 9µm sin dispersión modal.' },
      { layer: 2, name: 'Capa de Enlace', role: 'Tramas Ethernet 40GBASE-R agregadas mediante LACP (802.3ad) para redundancia.' }
    ],
    softwareEngineeringImpact: 'Para los desarrolladores, esta troncal monomodo de baja latencia (<0.01 ms adicionales) permite montar clústeres de Kubernetes multi-edificio sin que etcd sufra desincronización de consenso Raft por latencia de red.'
  },
  {
    id: 'case-lab',
    number: 2,
    title: 'Cableado para Laboratorio de Desarrollo de Software',
    context: 'Se debe equipar un aula de cómputo con 30 estaciones de trabajo para estudiantes de programación. La distancia más lejana entre el switch del rack de piso y el puesto de trabajo es de 32 metros. Se requiere acceso a repositorios Git locales a 1 Gbps con bajo costo de instalación.',
    constraints: [
      '30 estaciones fijas en puestos modulares.',
      'Distancia máxima al cuarto técnico: 32 metros.',
      'Presupuesto educativo ajustado y alta facilidad de mantenimiento y crimpado.',
      'Requerimiento de conectividad: 1 Gbps estable por puesto.'
    ],
    options: [
      { id: 'cat6-utp', name: 'Cable UTP Categoría 6 con conectores RJ45', description: 'Cableado estructurado horizontal en estrella con patch panel y jacks RJ45.', isCorrect: true },
      { id: 'coax-rg58', name: 'Cable Coaxial Delgado RG-58 (10BASE2)', description: 'Topología en bus con conectores BNC en T.', isCorrect: false },
      { id: 'fiber-desktop', name: 'Fibra óptica monomodo al puesto (FTTD)', description: 'Tirada de fibra monomodo con tarjetas NIC PCIe de fibra en cada PC.', isCorrect: false },
      { id: 'pure-wifi', name: 'Solo Wi-Fi 5 mediante un Access Point en el techo', description: 'Todos los 30 PCs conectados vía adaptador Wi-Fi USB.', isCorrect: false }
    ],
    correctId: 'cat6-utp',
    solutionTitle: 'Cableado Estructurado Horizontal UTP Categoría 6',
    detailedRationale: 'Cat 6 UTP es el estándar dorado de la industria para cableado horizontal: cubre sobradamente los 32 metros (límite de 100m), ofrece 1 Gbps garantizado (e incluso 10 Gbps a distancias < 55m), utiliza conectores modulares RJ45 económicos y universales, y se organiza perfectamente en racks mediante patch panels según la norma ANSI/TIA-568.',
    whyOthersFail: {
      'coax-rg58': '10BASE2 es una tecnología obsoleta desde hace 30 años: máxima velocidad de 10 Mbps en bus compartido, propensa a que un solo cable suelto tire la red completa del aula.',
      'fiber-desktop': 'Fibra hasta el puesto de trabajo (FTTD) multiplica el costo por 10 innecesariamente: requiere costosas tarjetas de red de fibra en cada PC y patch cords de fibra frágiles ante pisadas de estudiantes.',
      'pure-wifi': 'Un solo AP con 30 estudiantes descargando simultáneamente dependencias de npm/Docker saturará el medio compartido (half-duplex) por contienda CSMA/CA, causando alta latencia y pérdida de paquetes.'
    },
    osiLayers: [
      { layer: 1, name: 'Capa Física', role: 'Señales eléctricas diferenciales PAM-5 a través de 4 pares trenzados de cobre de 100Ω.' },
      { layer: 2, name: 'Capa de Enlace', role: 'Dominio de colisiones dedicado por puerto en Switch Gigabit Ethernet full-duplex.' }
    ],
    softwareEngineeringImpact: 'En un entorno de 30 estudiantes corriendo `npm install` o `cargo build` en simultáneo, el cable UTP full-duplex dedicado evita la congestión de contienda que ocurriría en Wi-Fi, permitiendo compilaciones y despliegues rápidos.'
  },
  {
    id: 'case-server-rack',
    number: 3,
    title: 'Interconexión de Servidores en Rack de Data Center (Top-of-Rack)',
    context: 'Un Data Center corporativo aloja clústeres de bases de datos PostgreSQL de alto tráfico y servidores de microservicios en un mismo rack de 42U. Se necesita conectar 16 servidores al switch Top-of-Rack (ToR) a velocidades de 25 Gbps y 100 Gbps, minimizando la latencia y el consumo energético en distancias inferiores a 2.5 metros.',
    constraints: [
      'Distancia física entre equipos: 0.5 a 2.5 metros (dentro del mismo gabinete).',
      'Velocidad de puerto: 25 Gbps / 100 Gbps.',
      'Mínima latencia de procesamiento y bajo consumo de energía (vatios por puerto).'
    ],
    options: [
      { id: 'cat5e', name: 'Cable UTP Cat 5e tradicional', description: 'Cables de parcheo comunes RJ45.', isCorrect: false },
      { id: 'dac', name: 'Cables DAC (Direct Attach Copper) Twinax SFP28 / QSFP28', description: 'Cables coaxiales twinaxiales de cobre pasivos de 100 Gbps preterminados en fábrica.', isCorrect: true },
      { id: 'cat6-rj45', name: 'Cable UTP Cat 6 con transceptores 10GBASE-T', description: 'Conexión estándar de cobre a 10 Gbps con transceptores RJ45.', isCorrect: false },
      { id: 'waveguide', name: 'Guías de onda rígidas rectangulares', description: 'Conductores de microondas para unir los servidores.', isCorrect: false }
    ],
    correctId: 'dac',
    solutionTitle: 'Cables DAC (Direct Attach Copper) Twinax pasivos',
    detailedRationale: 'Para distancias intra-rack (< 3 metros) a 25G/100G, los cables DAC Twinax son la opción estándar de la industria cloud (AWS, Azure, Google Cloud): son cables coaxiales dobles blindados de cobre con los módulos transceptores soldados de fábrica. No consumen energía eléctrica de conversión óptico-eléctrica (< 0.1W por puerto vs 2W de fibra o 5W de 10GBASE-T) y ofrecen una latencia física prácticamente cero (< 10 nanosegundos).',
    whyOthersFail: {
      cat5e: 'Cat 5e solo soporta hasta 1 Gbps. Totalmente incompatible con los requerimientos de 25G y 100G de un clúster de base de datos moderno.',
      'cat6-rj45': 'Los transceptores 10GBASE-T consumen excesiva potencia (alta disipación térmica en el switch) y sufren una latencia de codificación PHY de ~2.5 microsegundos, inaceptable para bases de datos transaccionales distribuidas.',
      waveguide: 'Las guías de onda son para microondas/radares de RF de gigavatios, no para transmisión digital Ethernet entre servidores de computación.'
    },
    osiLayers: [
      { layer: 1, name: 'Capa Física', role: 'Señales eléctricas de alta velocidad PAM-4 sobre pares coaxiales twinaxiales de 100Ω sin conversión electro-óptica.' },
      { layer: 2, name: 'Capa de Enlace', role: 'Protocolo IEEE 802.3by (25G) y 802.3bm (100G) con tramas Ethernet jumbo (MTU 9000).' }
    ],
    softwareEngineeringImpact: 'La latencia de nanosegundos del cable DAC permite que clústeres de Redis o réplicas de Kafka sincronicen datos en memoria con un retardo imperceptible para el usuario final de la aplicación web.'
  },
  {
    id: 'case-cell-tower',
    number: 4,
    title: 'Alimentación de Antenas en Torre de Telefonía Celular (4G/5G)',
    context: 'Un operador de telecomunicaciones instala una estación base celular. La unidad de radiofrecuencia (RF) de alta potencia en la caseta técnica debe alimentar un arreglo de antenas sectoriales montadas a 45 metros de altura sobre la torre metálica exterior.',
    constraints: [
      'Señales de radiofrecuencia en bandas de 700 MHz, 1.8 GHz y 3.5 GHz.',
      'Potencia transmitida de cientos de vatios continuos.',
      'Exposición continua a lluvia, granizo, viento, radiación UV y descargas eléctricas.',
      'Máxima preservación de potencia: mínima atenuación en 45 metros de subida.'
    ],
    options: [
      { id: 'utp-cat6', name: 'Cable UTP Cat 6 blindado', description: 'Cable de par trenzado conectado directamente a la antena.', isCorrect: false },
      { id: 'heliax-coax', name: 'Línea de Transmisión Coaxial Corrugada Heliax® de 7/8"', description: 'Coaxial con conductor exterior de cobre macizo corrugado y dieléctrico espumado de baja pérdida.', isCorrect: true },
      { id: 'rg58', name: 'Cable coaxial flexible RG-58 con conectores BNC', description: 'Coaxial delgado de 5 mm de uso general.', isCorrect: false },
      { id: 'pure-plastic', name: 'Fibra óptica plástica (POF)', description: 'Fibra económica de polímero acrílico.', isCorrect: false }
    ],
    correctId: 'heliax-coax',
    solutionTitle: 'Cable Coaxial Corrugado Heliax® de Baja Pérdida (50Ω)',
    detailedRationale: 'Las líneas Heliax® son el estándar universal para la alimentación de antenas en mástiles de telecomunicaciones: su blindaje de cobre corrugado continuo proporciona un 100% de aislamiento contra interferencias electromagnéticas, resiste vientos extremos y flexión en la torre sin aplastar el dieléctrico, soporta potencias de RF de kilovatios y ofrece una atenuación drásticamente menor a frecuencias de GHz comparado con cualquier coaxial convencional.',
    whyOthersFail: {
      'utp-cat6': 'El cable UTP transporta datos en banda base digital (bits), no señales analógicas de potencia de radiofrecuencia para excitar elementos radiantes de una antena.',
      rg58: 'El cable RG-58 tiene altísima atenuación en GHz. En 45 metros a 1.8 GHz perdería más del 95% de la potencia de la señal en forma de calor antes de llegar a la antena.',
      'pure-plastic': 'La fibra plástica transmite luz en el espectro visible a corta distancia; no transmite corrientes ni ondas de radiofrecuencia.'
    },
    osiLayers: [
      { layer: 1, name: 'Capa Física', role: 'Guía de ondas TEM de alta frecuencia con impedancia adaptada de 50Ω para evitar ondas estacionarias (SWR).' }
    ],
    softwareEngineeringImpact: 'Una adecuada línea de transmisión minimiza la pérdida de paquetes (Packet Loss) y el jitter en la capa física de radio, garantizando que aplicaciones móviles VoIP o streaming mantengan el throughput sin buffering.'
  },
  {
    id: 'case-iot-farm',
    number: 5,
    title: 'Red de Sensores IoT para Agricultura de Precisión',
    context: 'Se requiere monitorizar en tiempo real la humedad del suelo, pH y temperatura en una finca agrícola de 12 kilómetros cuadrados (1,200 hectáreas). Hay 150 nodos sensores autónomos alimentados con pequeñas baterías y celdas solares, dispersos en campos de cultivo abiertos sin tendidos eléctricos ni postes.',
    constraints: [
      'Área de cobertura: 12 km² (distancias de hasta 5-10 km al centro de control).',
      'No hay posibilidad física de tender zanjas con cables.',
      'Consumo energético ultra bajo (la batería de cada sensor debe durar 3 a 5 años).',
      'Volumen de datos bajo: apenas unos 50 bytes transmitidos cada 15 minutos por nodo.'
    ],
    options: [
      { id: 'ftth', name: 'Tendido de Fibra Óptica subterránea a cada sensor', description: 'Zanjeo y cable monomodo a cada estaca de medición.', isCorrect: false },
      { id: 'lorawan', name: 'Red Inalámbrica No Guiada LPWAN (LoRaWAN / NB-IoT)', description: 'Transmisión de radio en bandas ISM sub-GHz (868/915 MHz) con modulación chirp spread spectrum (CSS) hacia un gateway central.', isCorrect: true },
      { id: 'wifi-heavy', name: 'Repetidores Wi-Fi estándar de 5 GHz en postes', description: 'Red Wi-Fi convencional mallada con routers domésticos.', isCorrect: false },
      { id: 'utp-buried', name: 'Cables UTP enterrados directamente', description: 'Conexión de sensores mediante cable de red.', isCorrect: false }
    ],
    correctId: 'lorawan',
    solutionTitle: 'Red Inalámbrica LPWAN (LoRaWAN en banda sub-GHz)',
    detailedRationale: 'LoRaWAN es la tecnología idónea para este escenario: opera en frecuencias de radio sub-GHz (868 MHz en Europa / 915 MHz en América) con modulación por espectro ensanchado (CSS), logrando alcances de más de 10-15 km en línea de vista con un solo gateway central. Su consumo energético es minúsculo (pocos microamperios en reposo), permitiendo baterías de más de 5 años para sensores que envían pequeñas ráfagas periódicas de telemetría.',
    whyOthersFail: {
      ftth: 'Económica y logísticamente absurdo: enterrar 50 km de fibra óptica en un campo agrícola activo sería destruido por tractores y arados en la primera siembra.',
      'wifi-heavy': 'Wi-Fi está diseñado para alto ancho de banda a corta distancia (< 50 metros). Los módulos Wi-Fi consumen cientos de miliamperios, agotando las baterías en pocos días, y requerirían decenas de repetidores intermedios.',
      'utp-buried': 'El cable UTP excede su límite de 100 metros y se degradaría rápidamente bajo tierra por humedad y roedores.'
    },
    osiLayers: [
      { layer: 1, name: 'Capa Física', role: 'Modulación CSS (Chirp Spread Spectrum) de radio sub-GHz con alta sensibilidad de recepción (-140 dBm).' },
      { layer: 2, name: 'Capa de Enlace', role: 'Protocolo MAC LoRaWAN Clase A con ventanas de escucha optimizadas para conservación de batería.' }
    ],
    softwareEngineeringImpact: 'Para los ingenieros de backend que diseñan la API de ingesta de datos, entender LoRaWAN es vital: el payload está restringido a pocos bytes, por lo que no se puede usar JSON pesado, sino serialización binaria compacta (Protocol Buffers o MessagePack).'
  }
];
