export interface Question {
  id: string;
  category: 'OSI' | 'Cableado' | 'Conectores' | 'Fibra' | 'RF' | 'Wireless' | 'Software';
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    category: 'OSI',
    text: '¿En qué capa del Modelo OSI se define el direccionamiento físico (direcciones MAC) y la detección de errores por trama (FCS)?',
    options: ['Capa 1 (Física)', 'Capa 2 (Enlace de Datos)', 'Capa 3 (Red)', 'Capa 4 (Transporte)'],
    correctAnswer: 1,
    explanation: 'La Capa 2 (Enlace de Datos) se encarga de estructurar el flujo de bits en tramas (Frames), asignar direcciones MAC de origen y destino, y validar la integridad de la trama mediante la secuencia de verificación FCS/CRC.'
  },
  {
    id: 'q2',
    category: 'Fibra',
    text: '¿Cuál es la diferencia fundamental en la propagación de la luz entre la fibra Monomodo (SMF) y la Multimodo (MMF)?',
    options: [
      'La fibra monomodo utiliza luz visible coloreada y la multimodo luz ultravioleta.',
      'En la fibra monomodo la luz viaja en un único rayo axial sin dispersión modal, mientras que en la multimodo rebota en múltiples ángulos dentro de un núcleo más ancho.',
      'La fibra monomodo solo funciona en interiores y la multimodo en exteriores.',
      'La fibra multimodo tiene un núcleo de 9µm y la monomodo de 50µm.'
    ],
    correctAnswer: 1,
    explanation: 'La fibra monomodo cuenta con un núcleo sumamente estrecho (~9 µm) que obliga al rayo de luz a viajar en un único modo electromagnético fundamental, eliminando por completo la dispersión modal y permitiendo distancias de decenas de kilómetros.'
  },
  {
    id: 'q3',
    category: 'Conectores',
    text: '¿Cuáles son los pines que se intercambian de posición entre los estándares de crimpado T568A y T568B en un conector RJ45?',
    options: [
      'Los pares Verde y Naranja (Pines 1, 2, 3 y 6)',
      'Los pares Azul y Marrón (Pines 4, 5, 7 y 8)',
      'Los pines 1 y 8 exclusivamente',
      'Todos los pines se invierten de forma especular'
    ],
    correctAnswer: 0,
    explanation: 'Entre T568A y T568B únicamente cambian de lugar el par 2 (Naranja) y el par 3 (Verde), ocupando los pines 1, 2, 3 y 6. Los pares Azul (pines 4-5) y Marrón (pines 7-8) conservan exactamente la misma posición en ambos estándares.'
  },
  {
    id: 'q4',
    category: 'Conectores',
    text: 'Respecto al término "RJ8", ¿cuál de las siguientes afirmaciones es técnicamente correcta según los estándares de telecomunicaciones?',
    options: [
      'RJ8 es el nombre oficial que sustituyó a RJ45 en la norma Cat 6.',
      'RJ8 es un conector de 8 contactos idéntico a RJ11 pero para fibra óptica.',
      'No existe un estándar formal de red denominado "RJ8"; el nombre físico correcto es conector modular 8P8C regulado por ANSI/TIA-568.',
      'RJ8 es una patente propietaria de Cisco para conectar consolas serie.'
    ],
    correctAnswer: 2,
    explanation: 'En rigor académico, "RJ8" es una deformación informal. Los conectores de red de par trenzado son conectores modulares 8P8C (8 Posiciones, 8 Contactos). La sigla "RJ" (Registered Jack) proviene de especificaciones del sistema telefónico Bell y FCC de EE.UU.'
  },
  {
    id: 'q5',
    category: 'Fibra',
    text: '¿Cuál es la principal diferencia funcional y ambiental entre un ODF (Optical Distribution Frame) y una Mufla de fibra óptica?',
    options: [
      'El ODF se instala en racks de interior para terminación y distribución frecuente con patch cords; la mufla es una carcasa hermética (IP68) para proteger empalmes en intemperie o canalizaciones.',
      'El ODF solo sirve para fibra monomodo y la mufla para fibra multimodo.',
      'La mufla amplifica activamente la señal óptica con electricidad y el ODF es pasivo.',
      'No tienen diferencias, son sinónimos comerciales del mismo producto.'
    ],
    correctAnswer: 0,
    explanation: 'El ODF es un bastidor para sala de equipos o datacenter que facilita la gestión y reconfiguración diaria de conexiones mediante adaptadores frontales (SC, LC). La mufla es un envolvente de polímero sellado herméticamente (IP68) para resguardar fusiones definitivas en postes o bajo agua.'
  },
  {
    id: 'q6',
    category: 'RF',
    text: '¿Qué componente del cable coaxial es el responsable de confinar el campo electromagnético en su interior e impedir interferencias externas?',
    options: [
      'La cubierta exterior de plástico PVC.',
      'El conductor central de cobre.',
      'La malla metálica trenzada y la lámina de blindaje conectadas a tierra.',
      'El aislante dieléctrico de polietileno espumado.'
    ],
    correctAnswer: 2,
    explanation: 'La malla conductora exterior actúa como una jaula de Faraday de 360 grados que contiene las ondas dentro del dieléctrico y bloquea la penetración de interferencias electromagnéticas externas (EMI/RFI).'
  },
  {
    id: 'q7',
    category: 'RF',
    text: '¿Qué función histórica cumplió el cable coaxial RG-8 en los primeros años de Ethernet?',
    options: [
      'Fue el cable utilizado en 10BASE-T para conectar las primeras oficinas mediante RJ45.',
      'Fue el cable troncal "amarillo" de 50Ω utilizado en 10BASE5 ("Thicknet") al que se conectaban los transceptores vampiro.',
      'Fue un cable submarino transatlántico de telégrafo.',
      'Fue la primera fibra óptica comercial de Xerox PARC.'
    ],
    correctAnswer: 1,
    explanation: 'El cable tipo RG-8 de 50 ohmios fue la base de la norma 10BASE5 (Thicknet), apodado "Yellow Cable" por su distintivo forro amarillo. Permitía segmentos troncales de hasta 500 metros a 10 Mbps donde las computadoras se pinchaban con transceptores de derivación vampiro.'
  },
  {
    id: 'q8',
    category: 'RF',
    text: '¿Por qué en las torres de telefonía celular se utilizan líneas de transmisión Heliax® en lugar de cables coaxiales estándar de malla?',
    options: [
      'Porque Heliax está hecho de fibra de carbono superconductora.',
      'Porque su blindaje exterior de cobre sólido corrugado ofrece blindaje absoluto, mínima atenuación en GHz y soporta flexión sin aplastar el dieléctrico ni alterar su impedancia.',
      'Porque Heliax es mucho más delgado y barato que cualquier coaxial convencional.',
      'Porque no requiere conectores y se suelda con estaño común.'
    ],
    correctAnswer: 1,
    explanation: 'Heliax es una familia de líneas coaxiales corrugadas de CommScope que proporciona una atenuación drásticamente menor a frecuencias de gigahercios, soporte para alta potencia de transmisión RF y resistencia a la intemperie extrema sin aplastarse durante la instalación en la torre.'
  },
  {
    id: 'q9',
    category: 'RF',
    text: '¿Cuál es el mecanismo de acoplamiento característico del conector BNC (Bayonet Neill-Concelman)?',
    options: [
      'Rosca continua de múltiples vueltas similar al conector F de televisión.',
      'Acoplamiento por presión tipo Push-Pull con clip plástico.',
      'Bayoneta rápida de encaje con giro de un cuarto de vuelta (1/4 turn) sobre dos pivotes guía.',
      'Imán de neodimio de alta atracción.'
    ],
    correctAnswer: 2,
    explanation: 'El conector BNC utiliza un sistema de bayoneta con dos salientes en el conector hembra y ranuras en espiral en el anillo móvil macho, que se fija firmemente con un cuarto de vuelta, impidiendo desconexiones accidentales por tirones mecánicos.'
  },
  {
    id: 'q10',
    category: 'RF',
    text: '¿Por qué en frecuencias de microondas (> 10 GHz) y altas potencias se prefieren las Guías de Onda metálicas sobre el cable coaxial?',
    options: [
      'Porque las guías de onda son más flexibles y fáciles de doblar por esquinas.',
      'Porque al ser tubos huecos sin conductor central ni aislante dieléctrico sólido, no sufren pérdidas dieléctricas ni peligro de ruptura por arco eléctrico, manejando megavatios de potencia.',
      'Porque las guías de onda transmiten corriente continua (DC) sin resistencia.',
      'Porque funcionan a cualquier frecuencia sin límite de corte inferior.'
    ],
    correctAnswer: 1,
    explanation: 'Las guías de onda metálicas huecas eliminan el conductor central (y con ello las pérdidas por efecto pelicular en conductores delgados) y no tienen dieléctrico sólido que se caliente o perfore ante altos voltajes, lo que las hace ideales para radares y enlaces satelitales de alta potencia.'
  },
  {
    id: 'q11',
    category: 'Wireless',
    text: '¿Por qué la transmisión Wi-Fi opera inherentemente en modo Semi-Dúplex (Half-Duplex) a nivel de la Capa Física?',
    options: [
      'Porque el cable de red que alimenta el AP solo tiene 2 pares de cobre.',
      'Porque el espectro radioeléctrico en el canal sintonizado es un medio compartido único donde un dispositivo no puede transmitir y recibir simultáneamente en la misma frecuencia sin ensordecer su propio receptor.',
      'Porque el protocolo HTTP prohíbe el envío bidireccional de paquetes.',
      'Porque la encriptación WPA3 requiere que los dispositivos esperen 1 segundo entre tramas.'
    ],
    correctAnswer: 1,
    explanation: 'En radiofrecuencia sobre un mismo canal, la señal emitida por la antena local es millones de veces más potente que cualquier señal débil que llegue de un emisor remoto. Por ello se usa half-duplex con el mecanismo CSMA/CA para evitar colisiones.'
  },
  {
    id: 'q12',
    category: 'Cableado',
    text: '¿Qué tecnología moderna en los puertos de red de switches y computadoras hace innecesario el uso de cables Ethernet cruzados hoy en día?',
    options: ['Power over Ethernet (PoE)', 'Auto MDI/MDI-X', 'Spanning Tree Protocol (STP)', 'Quality of Service (QoS)'],
    correctAnswer: 1,
    explanation: 'Auto MDI/MDI-X detecta automáticamente si el dispositivo conectado al otro extremo requiere inversión de los pares de transmisión (TX) y recepción (RX), realizando el cruce por software/hardware internamente en el chip PHY del puerto.'
  },
  {
    id: 'q13',
    category: 'Software',
    text: 'Como Ingeniero de Software que diseña una arquitectura de microservicios, ¿cómo impacta la latencia del medio de transmisión físico en el rendimiento de tu aplicación?',
    options: [
      'No tiene impacto, la velocidad de una aplicación depende únicamente de la complejidad algorítmica Big-O del código.',
      'Solo afecta el tiempo de descarga del archivo HTML inicial.',
      'La latencia física de propagación y conmutación se acumula en cada salto de red entre microservicios; en llamadas RPC sincrónicas en cascada, una latencia física alta multiplica el tiempo total de respuesta y satura el pool de hilos del servidor.',
      'La latencia física solo afecta a los servidores DNS pero nunca a las llamadas HTTP/REST.'
    ],
    correctAnswer: 2,
    explanation: 'En arquitecturas distribuidas modernas, si el frontend llama al Servicio A, y este llama sincrónicamente a los Servicios B, C y a la Base de Datos, las latencias físicas del medio y los saltos de red se suman linealmente. Si la latencia es alta, los hilos de ejecución permanecen bloqueados esperando I/O, lo que agota los recursos del servidor y dispara los tiempos de respuesta del usuario.'
  },
  {
    id: 'q14',
    category: 'Software',
    text: 'Cuando el protocolo TCP detecta una pérdida de paquetes en un enlace físico con alta tasa de error de bits (BER), ¿cuál es su comportamiento habitual?',
    options: [
      'Aumenta la velocidad de transmisión al doble para compensar los datos perdidos.',
      'Asume que la red sufre congestión y reduce drásticamente su ventana de congestión (cwnd), disminuyendo el throughput de la aplicación.',
      'Cambia automáticamente el protocolo de Capa 4 a UDP.',
      'Ignora la pérdida y continúa enviando datos sin retransmitir.'
    ],
    correctAnswer: 1,
    explanation: 'Los algoritmos clásicos de control de congestión de TCP (como Reno o Cubic) asumen que cualquier paquete perdido se debe a saturación de buffers en los routers intermedios (congestión), por lo que reducen la ventana de emisión a la mitad, castigando fuertemente el rendimiento del software aunque la pérdida haya sido causada por ruido físico en el cable.'
  },
  {
    id: 'q15',
    category: 'Cableado',
    text: 'En la norma de cableado estructurado ANSI/TIA-568, ¿cuál es la distancia máxima permitida para el canal horizontal permanente de cobre?',
    options: ['50 metros', '90 metros para el enlace permanente (+10 metros de patch cords = 100 metros en total)', '200 metros', '500 metros'],
    correctAnswer: 1,
    explanation: 'La norma establece que el tendido fijo horizontal entre el patch panel y la toma de pared (faceplate) no debe exceder 90 metros, reservando hasta 10 metros en total para cables de parcheo (patch cords), sumando un canal máximo de 100 metros.'
  },
  {
    id: 'q16',
    category: 'OSI',
    text: 'Durante el proceso de encapsulación en el Modelo OSI, ¿cuál es el orden correcto en que se añaden las cabeceras a medida que los datos descienden por las capas?',
    options: [
      'Datos → Trama → Paquete → Segmento → Bits',
      'Datos (L7-L5) → Cabecera L4 (Segmento TCP) → Cabecera L3 (Paquete IP) → Cabecera y Cola L2 (Trama Ethernet) → Bits (L1)',
      'Bits → Paquete → Trama → Datos',
      'Cabecera IP → Cabecera TCP → Cabecera Ethernet → Datos'
    ],
    correctAnswer: 1,
    explanation: 'El emisor encapsula los datos agregando información de control de forma descendente: en Capa 4 se agrega la cabecera TCP/UDP (puertos), en Capa 3 la cabecera IP (direcciones lógicas), en Capa 2 la cabecera MAC y la cola CRC (FCS), y finalmente en Capa 1 se codifica en pulsos físicos o bits.'
  },
  {
    id: 'q17',
    category: 'Cableado',
    text: '¿Qué elemento físico incorporan los cables UTP Categoría 6 y superiores en su interior para reducir la diafonía en el extremo cercano (NEXT)?',
    options: [
      'Un tubo de aceite refrigerante para disipar calor.',
      'Un separador longitudinal plástico en forma de cruceta (spline) que mantiene aislados los 4 pares trenzados entre sí.',
      'Un hilo de fibra óptica integrado en el centro.',
      'Una resistencia de terminación de 50 ohmios continua.'
    ],
    correctAnswer: 1,
    explanation: 'Los cables Cat 6 cuentan con una cruceta plástica central (spline o cruceta de polietileno) que mantiene una separación física constante entre cada uno de los 4 pares trenzados a lo largo de todo el cable, minimizando drásticamente la diafonía electromagnética interna (NEXT).'
  },
  {
    id: 'q18',
    category: 'Fibra',
    text: '¿Por qué la fibra óptica posee inmunidad absoluta frente a interferencias electromagnéticas (EMI) y ruido de motores o transformadores?',
    options: [
      'Porque está forrada con plomo pesado.',
      'Porque los datos viajan codificados en fotones de luz a través de un filamento de vidrio de sílice dieléctrico no metálico, el cual no interactúa con campos eléctricos ni magnéticos.',
      'Porque utiliza una frecuencia de radio extremadamente alta que cancela el ruido.',
      'Porque el switch receptor tiene un filtro digital de software para eliminar el ruido.'
    ],
    correctAnswer: 1,
    explanation: 'El vidrio de sílice pura (SiO2) es un material aislante dieléctrico no conductor de electricidad. Como los fotones de luz no tienen carga eléctrica, los campos electromagnéticos externos de motores, subestaciones o rayos no pueden inducir voltajes parásitos ni ruido en la señal luminosa.'
  }
];
