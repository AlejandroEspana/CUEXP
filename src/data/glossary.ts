export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Cables' | 'Fibra' | 'RF' | 'Estándares' | 'OSI' | 'Software' | 'Conectores';
  shortDef: string;
  fullDef: string;
  softwareConnection: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'atenuacion',
    term: 'Atenuación',
    category: 'Cables',
    shortDef: 'Pérdida de potencia que experimenta una señal al propagarse a través de un medio.',
    fullDef: 'Fenómeno físico medido en decibelios (dB) donde la energía de la señal eléctrica, óptica o electromagnética disminuye con la distancia recorrida, debido a resistencia resistiva en cobre, absorción/dispersión en fibra o dispersión geométrica en el espacio libre.',
    softwareConnection: 'Una atenuación excesiva provoca pérdidas de tramas a nivel de hardware, lo que se traduce en retransmisiones TCP, aumento drástico de latencia y timeouts en llamadas HTTP.'
  },
  {
    id: 'ancho-de-banda',
    term: 'Ancho de Banda',
    category: 'Cables',
    shortDef: 'Capacidad de transporte de frecuencias o tasa de transferencia máxima de un canal.',
    fullDef: 'En términos analógicos es el rango de frecuencias (Hz) que el medio puede transmitir con mínima distorsión. En redes digitales describe la tasa máxima teórica de bits transmitidos por segundo (bps, Gbps).',
    softwareConnection: 'Determina el caudal máximo que tus servicios pueden emitir antes de que se llenen los buffers de los sockets del sistema operativo.'
  },
  {
    id: 'auto-mdix',
    term: 'Auto MDI/MDI-X',
    category: 'Estándares',
    shortDef: 'Detección y conmutación automática de los pares de transmisión y recepción en puertos Ethernet.',
    fullDef: 'Mecanismo de hardware en el chip PHY de red que detecta automáticamente si el dispositivo conectado al otro extremo utiliza la misma polaridad de pines (MDI) o invertida (MDI-X), conmutando internamente las líneas sin necesidad de cables cruzados.',
    softwareConnection: 'Elimina los errores humanos de infraestructura física al conectar servidores directamente entre sí para pruebas de laboratorio o clústeres.'
  },
  {
    id: 'backbone',
    term: 'Backbone (Red Troncal)',
    category: 'Cables',
    shortDef: 'Conducto principal de alta capacidad que interconecta diferentes redes locales o edificios.',
    fullDef: 'Canal de transmisión de muy alta velocidad y disponibilidad (usualmente fibra óptica monomodo o multimodo) que transporta el tráfico agregado entre armarios de telecomunicaciones, centros de datos o campus universitarios.',
    softwareConnection: 'Cualquier cuello de botella en el backbone afecta simultáneamente a todos los microservicios y usuarios de la organización.'
  },
  {
    id: 'ber',
    term: 'BER (Bit Error Rate)',
    category: 'OSI',
    shortDef: 'Tasa de bits recibidos con error respecto al total de bits transmitidos.',
    fullDef: 'Métrica de calidad del canal físico calculada dividiendo el número de bits alterados entre el total emitido en un período. En fibra óptica suele ser < 10⁻¹²; en enlaces inalámbricos puede oscilar entre 10⁻⁴ y 10⁻⁶.',
    softwareConnection: 'Un BER alto dispara la degradación de TCP: el protocolo asume que la red está colapsada y baja su tasa de transmisión a la mitad.'
  },
  {
    id: 'bnc',
    term: 'BNC (Bayonet Neill-Concelman)',
    category: 'RF',
    shortDef: 'Conector coaxial de acoplamiento rápido por bayoneta con giro de un cuarto de vuelta.',
    fullDef: 'Conector de radiofrecuencia inventado por Paul Neill y Carl Concelman. Mantiene una impedancia constante (disponible en 50Ω para redes/RF y 75Ω para video digital SDI) y proporciona un blindaje electromagnético completo.',
    softwareConnection: 'Muy empleado en hardware de adquisición de datos en tiempo real, osciloscopios de laboratorio y tarjetas de captura de video profesional.'
  },
  {
    id: 'coaxial',
    term: 'Cable Coaxial',
    category: 'RF',
    shortDef: 'Línea de transmisión eléctrica con dos conductores concéntricos compartiendo el mismo eje.',
    fullDef: 'Cable compuesto por un conductor central de cobre, un aislante dieléctrico concéntrico, una malla y lámina conductora exterior de blindaje y una cubierta externa protectora. Guía ondas en modo TEM.',
    softwareConnection: 'Base de las conexiones de internet por cable módem (DOCSIS) que proporcionan el acceso de última milla a millones de clientes web.'
  },
  {
    id: 'crosstalk',
    term: 'Crosstalk (Diafonía)',
    category: 'Cables',
    shortDef: 'Interferencia electromagnética no deseada entre pares de hilos adyacentes.',
    fullDef: 'Inducción de señales parásitas producida por el campo electromagnético de un hilo sobre otro hilo vecino dentro del mismo cable (NEXT/FEXT) o entre cables adyacentes en una misma bandeja (Alien Crosstalk - ANEXT).',
    softwareConnection: 'Produce corrupción esporádica de datos que provoca reintentos de peticiones API y fluctuaciones repentinas en el tiempo de respuesta (jitter).'
  },
  {
    id: 'dielectrico',
    term: 'Dieléctrico',
    category: 'Cables',
    shortDef: 'Material aislante de baja conductividad eléctrica que puede sostener un campo electrostático.',
    fullDef: 'Sustancia aislante (como polietileno, teflón, aire o vidrio) colocada entre conductores para evitar el contacto directo y controlar la velocidad de propagación y la impedancia característica de la línea.',
    softwareConnection: 'Su constante dieléctrica define la velocidad física a la que los paquetes viajan por el cable respecto a la velocidad de la luz.'
  },
  {
    id: 'ethernet',
    term: 'Ethernet (IEEE 802.3)',
    category: 'Estándares',
    shortDef: 'Familia de tecnologías de red cableada dominante en redes de área local (LAN) y Datacenters.',
    fullDef: 'Estándar que define las especificaciones de la Capa Física (señalización y conectores) y de la subcapa MAC de Enlace de Datos (formato de tramas de 64 a 1518 bytes y direccionamiento de 48 bits).',
    softwareConnection: 'Cada petición HTTP que envías en tu código termina encapsulada en una trama Ethernet con una dirección MAC de origen y destino.'
  },
  {
    id: 'fibra',
    term: 'Fibra Óptica',
    category: 'Fibra',
    shortDef: 'Filamento de vidrio de sílice o polímero que transmite datos mediante pulsos luminosos.',
    fullDef: 'Guía de ondas óptica dieléctrica basada en el principio de reflexión interna total entre un núcleo de mayor índice de refracción y un revestimiento (cladding) de menor índice. Inmune al ruido electromagnético.',
    softwareConnection: 'La columna vertebral que hace posible la computación en la nube y la replicación de datos en tiempo real entre continentes.'
  },
  {
    id: 'guia-de-onda',
    term: 'Guía de Onda (Waveguide)',
    category: 'RF',
    shortDef: 'Estructura metálica tubular hueca para guiar microondas a altas frecuencias.',
    fullDef: 'Tubo de sección rectangular o circular que transporta ondas electromagnéticas mediante reflexiones en sus paredes conductoras. No tiene conductor central, no sufre pérdidas dieléctricas y soporta megavatios en radares y satélites.',
    softwareConnection: 'Fundamental en la infraestructura satelital de baja órbita (como Starlink) que entrega conectividad a aplicaciones en zonas remotas.'
  },
  {
    id: 'heliax',
    term: 'Heliax®',
    category: 'RF',
    shortDef: 'Línea de transmisión coaxial con conductor exterior de cobre corrugado continuo.',
    fullDef: 'Familia comercial patentada por CommScope (originalmente Andrew Corporation) diseñada para baja pérdida en gigahercios y alta potencia de RF en torres de telecomunicaciones celulares (4G/5G).',
    softwareConnection: 'El enlace físico que conecta las estaciones base celulares con las antenas que transmiten las notificaciones push a tus aplicaciones móviles.'
  },
  {
    id: 'impedancia',
    term: 'Impedancia Característica (Z₀)',
    category: 'Cables',
    shortDef: 'Oposición total que presenta una línea de transmisión a una onda electromagnética en propagación.',
    fullDef: 'Relación entre el voltaje y la corriente de una onda que viaja a lo largo de la línea (medida en Ohmios: 50Ω en RF, 75Ω en video/CATV, 100Ω en par trenzado Ethernet). Si la carga no coincide, se producen reflexiones de señal (SWR).',
    softwareConnection: 'Un desajuste de impedancia destruye la forma de onda de los bits físicos, corrompiendo las tramas antes de que lleguen al sistema operativo.'
  },
  {
    id: 'mdi',
    term: 'MDI / MDI-X',
    category: 'Estándares',
    shortDef: 'Media Dependent Interface (Interfaz dependiente del medio en puertos Ethernet).',
    fullDef: 'MDI es la asignación de pines estándar donde los pines 1-2 transmiten y los 3-6 reciben (usada en PCs y routers). MDI-X invierte estos pines (usada en switches y hubs) para permitir la comunicación cruzada directa.',
    softwareConnection: 'Entender MDI/MDI-X evita horas de confusión al desplegar racks de prueba o conectar equipos de red de forma directa.'
  },
  {
    id: 'monomodo',
    term: 'Fibra Monomodo (SMF)',
    category: 'Fibra',
    shortDef: 'Fibra óptica con núcleo diminuto (~9 µm) por donde la luz viaja en un solo modo axial.',
    fullDef: 'Fibra que elimina la dispersión modal al limitar la propagación a un único rayo recto. Emplea fuentes láser (1310/1550 nm) y alcanza distancias de decenas a cientos de kilómetros sin regeneradores.',
    softwareConnection: 'Garantiza la mínima latencia física posible entre regiones geográficas de nube (Multi-Region Cloud Deployments).'
  },
  {
    id: 'mufla',
    term: 'Mufla (Fiber Splice Closure)',
    category: 'Fibra',
    shortDef: 'Carcasa exterior estanca (IP68) para resguardar empalmes de fibra óptica.',
    fullDef: 'Contenedor hermético de polímero de alta resistencia diseñado para proteger contra agua, lodo, radiación UV y roedores los empalmes por fusión de cables de fibra en tendidos aéreos o subterráneos.',
    softwareConnection: 'La rotura de una mufla por accidentes de obra civil o inundaciones es una de las causas físicas más comunes de cortes repentinos en el tráfico de internet.'
  },
  {
    id: 'multimodo',
    term: 'Fibra Multimodo (MMF)',
    category: 'Fibra',
    shortDef: 'Fibra óptica con núcleo amplio (50 o 62.5 µm) donde la luz viaja en múltiples trayectorias.',
    fullDef: 'Fibra diseñada para distancias cortas (< 500m) que utiliza transceptores económicos tipo VCSEL o LED a 850 nm. Su alcance está limitado por la dispersión modal.',
    softwareConnection: 'El medio dominante en el interior de los Datacenters que conecta los servidores de bases de datos y balanceadores de carga.'
  },
  {
    id: 'odf',
    term: 'ODF (Optical Distribution Frame)',
    category: 'Fibra',
    shortDef: 'Bastidor montado en rack para terminación, administración y parcheo de fibra óptica.',
    fullDef: 'Gabinete o panel de 19 pulgadas que aloja bandejas de empalme, pigtails y acopladores frontales para facilitar la interconexión ordenada entre cables troncales y los puertos de los equipos activos.',
    softwareConnection: 'El lugar donde el equipo de DevOps y NetOps conecta físicamente los nuevos servidores a la red interna.'
  },
  {
    id: 'par-trenzado',
    term: 'Par Trenzado',
    category: 'Cables',
    shortDef: 'Forma de cableado donde dos conductores de cobre aislados se entrelazan helicoidalmente.',
    fullDef: 'Técnica inventada por Alexander Graham Bell que cancela el ruido electromagnético y la diafonía al equilibrar las corrientes inducidas en cada semivuelta del trenzado.',
    softwareConnection: 'El estándar físico de conexión que llega a prácticamente cualquier computador de escritorio en una oficina de desarrollo.'
  },
  {
    id: 'pdu',
    term: 'PDU (Protocol Data Unit)',
    category: 'OSI',
    shortDef: 'Unidad de datos de protocolo en una capa específica del Modelo OSI.',
    fullDef: 'Bloque de información transferido entre entidades pares de una misma capa. En Capa 7-5 son Datos; en Capa 4 es Segmento (TCP) o Datagrama (UDP); en Capa 3 es Paquete (IP); en Capa 2 es Trama (Ethernet); en Capa 1 son Bits.',
    softwareConnection: 'Vital para entender logs de red (Wireshark, tcpdump), identificar en qué nivel ocurrió un fallo y depurar problemas de MTU y fragmentación.'
  },
  {
    id: 'pigtail',
    term: 'Pigtail Óptico',
    category: 'Fibra',
    shortDef: 'Tramo corto de fibra con un conector óptico preinstalado en un solo extremo.',
    fullDef: 'Cable de fibra de 1 a 2 metros con un conector terminado en fábrica en un extremo (LC, SC) y fibra desnuda en el otro, que se fusiona con precisión al cable de fibra troncal dentro de un ODF o mufla.',
    softwareConnection: 'Garantiza pérdidas mínimas de inserción (< 0.2 dB) en la terminación de enlaces hacia tus servidores.'
  },
  {
    id: 'poe',
    term: 'PoE (Power over Ethernet)',
    category: 'Estándares',
    shortDef: 'Tecnología que suministra energía eléctrica continua junto con los datos sobre el cable UTP.',
    fullDef: 'Estándares IEEE 802.3af (15.4W), 802.3at (PoE+ 30W) y 802.3bt (PoE++ hasta 90W) que envían voltaje de corriente continua (DC ~48V) sobre los pares de cobre de red sin interferir con la señal de datos.',
    softwareConnection: 'Permite energizar dispositivos IoT, sensores embebidos, teléfonos VoIP y cámaras de seguridad sin instalar enchufes de 220V adicionales.'
  },
  {
    id: 'rj45',
    term: 'RJ45 (8P8C)',
    category: 'Conectores',
    shortDef: 'Conector modular de 8 posiciones y 8 contactos utilizado para redes Ethernet.',
    fullDef: 'Conector plástico transparente con 8 contactos metálicos dorados que muerden los conductores de cobre del cable de par trenzado según los esquemas T568A o T568B.',
    softwareConnection: 'La interfaz física más común que conecta estaciones de trabajo y servidores a la infraestructura de red local.'
  },
  {
    id: 'rj8',
    term: 'RJ8 (Clarificación Técnica)',
    category: 'Conectores',
    shortDef: 'Denominación coloquial e informal; no es un estándar de red Ethernet reconocido.',
    fullDef: 'En telecomunicaciones no existe un estándar técnico de red "RJ8". Se trata de un término erróneo derivado de confundir el número de pines del conector modular 8P8C con la nomenclatura telefónica Registered Jack (RJ).',
    softwareConnection: 'Un desarrollador o arquitecto de software debe evitar este término en pliegos técnicos y especificaciones de arquitectura.'
  },
  {
    id: 't568a',
    term: 'T568A',
    category: 'Estándares',
    shortDef: 'Estándar de cableado que asigna el par Verde a los pines 1 y 2 y el par Naranja a los pines 3 y 6.',
    fullDef: 'Esquema de asignación de pines definido en ANSI/TIA-568 que mantiene compatibilidad hacia atrás con el estándar telefónico USOC en el par verde.',
    softwareConnection: 'Al interconectarse con T568B en el otro extremo forma un cable cruzado tradicional.'
  },
  {
    id: 't568b',
    term: 'T568B',
    category: 'Estándares',
    shortDef: 'Estándar de cableado dominante en el mundo empresarial que asigna el par Naranja a los pines 1 y 2.',
    fullDef: 'Esquema de asignación de pines más popular en instalaciones comerciales de América: Blanco/Naranja, Naranja, Blanco/Verde, Azul, Blanco/Azul, Verde, Blanco/Marrón, Marrón.',
    softwareConnection: 'Es el estándar con el que están armados prácticamente todos los cables de red de parcheo en los Datacenters actuales.'
  },
  {
    id: 'utp',
    term: 'UTP (Unshielded Twisted Pair)',
    category: 'Cables',
    shortDef: 'Cable de pares trenzados sin blindaje metálico individual ni global.',
    fullDef: 'Tipo de cable de red más común y económico donde los 4 pares de conductores de cobre dependen exclusivamente del trenzado diferencial para la cancelación de ruidos e interferencias.',
    softwareConnection: 'El medio físico predominante en la última milla corporativa hacia el computador del programador.'
  }
];
