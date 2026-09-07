export interface OsiLayer {
  number: number;
  name: string;
  nameEs: string;
  function: string;
  pdu: string;
  devices: string[];
  protocols: string[];
  color: string;
  borderColor: string;
  textColor: string;
  mediaRelationship: string;
  softwareConnection: string;
}

export const OSI_LAYERS: OsiLayer[] = [
  {
    number: 7,
    name: 'Application',
    nameEs: 'Aplicación',
    function: 'Proporciona la interfaz directa entre los programas de usuario y los servicios de red.',
    pdu: 'Datos (Data Payload)',
    devices: ['Clientes Web (Navegadores)', 'Servidores de Aplicaciones', 'APIs REST / GraphQL', 'Smartphones'],
    protocols: ['HTTP / HTTPS', 'DNS', 'WebSocket', 'gRPC', 'SSH', 'SMTP', 'FTP'],
    color: 'bg-purple-600',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-400',
    mediaRelationship: 'Completamente abstracta e independiente del medio físico gracias al encapsulamiento.',
    softwareConnection: 'Es la capa donde escribes tu código frontend y backend (Express, FastAPI, React, Spring). Maneja JSON, cabeceras de autenticación y lógica de negocio.'
  },
  {
    number: 6,
    name: 'Presentation',
    nameEs: 'Presentación',
    function: 'Garantiza que la información emitida por la capa de aplicación sea comprensible para el receptor mediante formateo, encriptación y compresión.',
    pdu: 'Datos Formateados',
    devices: ['Módulos de Cifrado TLS / SSL', 'Gateways de Traducción de Datos'],
    protocols: ['TLS / SSL (Cifrado)', 'JSON / XML', 'GZIP / Brotli (Compresión)', 'JPEG / PNG', 'ASCII / UTF-8'],
    color: 'bg-purple-500',
    borderColor: 'border-purple-400',
    textColor: 'text-purple-300',
    mediaRelationship: 'Independiente del medio; asegura que los datos sean legibles sin importar la arquitectura de hardware emisor/receptor.',
    softwareConnection: 'Aquí opera el cifrado de extremo a extremo HTTPS con certificados TLS, y la serialización/deserialización de estructuras de datos (JSON.parse / JSON.stringify).'
  },
  {
    number: 5,
    name: 'Session',
    nameEs: 'Sesión',
    function: 'Establece, gestiona, sincroniza y finaliza las conexiones lógicas continuas entre procesos de dos sistemas remotos.',
    pdu: 'Datos de Sesión',
    devices: ['Servidores de Autenticación', 'Gateways de API'],
    protocols: ['RPC (Remote Procedure Call)', 'NetBIOS', 'PPTP', 'SOCKS', 'Tokens JWT / Sesiones Web'],
    color: 'bg-indigo-600',
    borderColor: 'border-indigo-500',
    textColor: 'text-indigo-400',
    mediaRelationship: 'Mantiene la persistencia del diálogo lógico aunque el medio físico subyacente sufra micro-cortes temporales.',
    softwareConnection: 'Maneja el estado y los checkpoints de transacciones largas, reconexión automática de WebSockets y sesiones de base de datos distribuidas.'
  },
  {
    number: 4,
    name: 'Transport',
    nameEs: 'Transporte',
    function: 'Segmentación del flujo de datos, control de flujo punto a punto, multiplexación por puertos, retransmisión de errores y control de congestión.',
    pdu: 'Segmento (TCP) / Datagrama (UDP)',
    devices: ['Balanceadores de Carga L4 (HAProxy, AWS ALB)', 'Firewalls de Estado (Stateful Firewalls)'],
    protocols: ['TCP (Orientado a conexión con ACK)', 'UDP (No orientado a conexión, baja latencia)', 'QUIC (Base de HTTP/3)', 'SCTP'],
    color: 'bg-cyan-600',
    borderColor: 'border-cyan-500',
    textColor: 'text-cyan-400',
    mediaRelationship: 'Adapta el tamaño de los segmentos al MTU (Maximum Transmission Unit) que soporta el medio físico y gestiona los reintentos si el medio pierde bits.',
    softwareConnection: 'Aquí se definen los sockets de red (`host:puerto`). Los algoritmos de congestión de TCP (Cubic/BBR) dictan qué tan rápido fluyen tus llamadas a microservicios.'
  },
  {
    number: 3,
    name: 'Network',
    nameEs: 'Red',
    function: 'Direccionamiento lógico global estructurado (IP) y determinación de la mejor ruta a través de múltiples redes interconectadas (Enrutamiento).',
    pdu: 'Paquete (IP Packet)',
    devices: ['Routers Comerciales y de Core', 'Switches Layer 3', 'Firewalls L3 / NAT Gateways'],
    protocols: ['IPv4', 'IPv6', 'ICMP (Ping / Traceroute)', 'BGP', 'OSPF', 'IPsec'],
    color: 'bg-blue-600',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-400',
    mediaRelationship: 'Permite unir medios físicos heterogéneos: un paquete IP puede originarse en Wi-Fi, viajar por fibra submarina y llegar por cable UTP sin alterarse.',
    softwareConnection: 'Fundamento del direccionamiento en la nube (VPC, CIDR blocks, Subnets públicas/privadas de AWS/GCP, Service Meshes y DNS resolution).'
  },
  {
    number: 2,
    name: 'Data Link',
    nameEs: 'Enlace de Datos',
    function: 'Transferencia confiable de datos entre nodos directamente adyacentes compartiendo el mismo medio físico. Direccionamiento físico (MAC), entramado y control de acceso al medio (MAC).',
    pdu: 'Trama (Ethernet Frame)',
    devices: ['Switches de Capa 2', 'Tarjetas de Interfaz de Red (NIC)', 'Puentes (Bridges)', 'Puntos de Acceso Wi-Fi (AP)'],
    protocols: ['Ethernet (IEEE 802.3)', 'Wi-Fi MAC (IEEE 802.11)', 'PPP', 'ARP (Address Resolution Protocol)', 'VLAN (802.1Q)'],
    color: 'bg-emerald-600',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-400',
    mediaRelationship: 'Traduce los paquetes de red a la estructura específica requerida por el medio (delimitadores de trama, preámbulo, detección de colisiones CSMA/CD o CSMA/CA).',
    softwareConnection: 'La resolución ARP (mapeo IP a MAC), las VLANs para aislar tráfico de base de datos y la detección de tramas descartadas por errores de checksum (FCS).'
  },
  {
    number: 1,
    name: 'Physical',
    nameEs: 'Física',
    function: 'Transmisión binaria no estructurada de bits a través de un canal de comunicación físico. Define niveles de voltaje, frecuencias, conectores mecánicos y tiempos de bit.',
    pdu: 'Bits / Símbolos Físicos (0 y 1)',
    devices: ['Cables de Cobre UTP/STP', 'Fibra Óptica (SMF / MMF)', 'Cables Coaxiales (RG8, Heliax)', 'Guías de Onda', 'Antenas de Radiofrecuencia', 'Transceptores SFP / QSFP', 'Hubs y Repetidores'],
    protocols: ['100BASE-TX', '1000BASE-T', '10GBASE-SR / LR', '400GBASE-DR4', 'DOCSIS RF', 'Modulaciones QAM / OFDM'],
    color: 'bg-amber-600',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-400',
    mediaRelationship: 'Es el medio de transmisión en sí mismo: cables de cobre, ondas de radio en el aire, pulsos de luz láser en vidrio o microondas en guías metálicas.',
    softwareConnection: 'Fija el límite físico de rendimiento: la latencia mínima irreductible por propagación (RTT), la tasa máxima de ancho de banda y la tasa de error de bit (BER).'
  }
];

export interface EncapsulationStep {
  step: number;
  layerNumber: number;
  layerName: string;
  pduName: string;
  headerAdded: string;
  headerFields: string[];
  payloadDescription: string;
  binaryRepresentation: string;
}

export const ENCAPSULATION_FLOW: EncapsulationStep[] = [
  {
    step: 1,
    layerNumber: 7,
    layerName: 'Aplicación',
    pduName: 'Datos (HTTP Payload)',
    headerAdded: 'HTTP GET /api/v1/users',
    headerFields: ['Host: api.empresa.com', 'Authorization: Bearer eyJhbGci...', 'Accept: application/json'],
    payloadDescription: 'Petición generada por el frontend en JavaScript / React para obtener usuarios.',
    binaryRepresentation: '{"action":"get_users"}'
  },
  {
    step: 2,
    layerNumber: 4,
    layerName: 'Transporte',
    pduName: 'Segmento TCP',
    headerAdded: 'Cabecera TCP (20 bytes)',
    headerFields: ['Puerto Origen: 54120', 'Puerto Destino: 443 (HTTPS)', 'Número Secuencia: 1042', 'Flags: PSH, ACK', 'Window Size: 65535'],
    payloadDescription: 'Se segmenta el mensaje HTTP y se asignan puertos lógicos para multiplexación de procesos.',
    binaryRepresentation: '[TCP Header | HTTP Data]'
  },
  {
    step: 3,
    layerNumber: 3,
    layerName: 'Red',
    pduName: 'Paquete IP',
    headerAdded: 'Cabecera IPv4 (20 bytes)',
    headerFields: ['IP Origen: 192.168.1.50', 'IP Destino: 104.21.45.12 (Cloudflare)', 'TTL: 64', 'Protocol: 6 (TCP)', 'Checksum: 0x4A1F'],
    payloadDescription: 'Se encapsula el segmento TCP dentro de un paquete IP con direccionamiento de red global.',
    binaryRepresentation: '[IP Header | TCP Header | HTTP Data]'
  },
  {
    step: 4,
    layerNumber: 2,
    layerName: 'Enlace de Datos',
    pduName: 'Trama Ethernet (Frame)',
    headerAdded: 'Cabecera Ethernet (14 bytes) + Cola FCS (4 bytes)',
    headerFields: ['MAC Origen: A4:83:E7:2B:11:04', 'MAC Destino: 00:1A:2B:3C:4D:5E (Router Gateway)', 'EtherType: 0x0800 (IPv4)', 'CRC-32 FCS'],
    payloadDescription: 'Se añade direccionamiento físico de hardware para saltar de la tarjeta de red de la PC al switch/router local.',
    binaryRepresentation: '[MAC Header | IP Header | TCP Header | HTTP Data | CRC Trailer]'
  },
  {
    step: 5,
    layerNumber: 1,
    layerName: 'Física',
    pduName: 'Bits / Señal Física',
    headerAdded: 'Preámbulo (7 bytes) + SFD (1 byte) de sincronización de reloj',
    headerFields: ['Modulación física', 'Voltajes ±1V diferenciales (cobre)', 'Pulsos de luz 1310nm (fibra) o RF (Wi-Fi)'],
    payloadDescription: 'La trama completa se serializa en una secuencia de bits físicos que se inyectan en el medio de transmisión.',
    binaryRepresentation: '10101010 10101011 01100101 11001101 00101100...'
  }
];
