export interface OsiLayer {
  number: number;
  name: string;
  function: string;
  pdu: string;
  devices: string[];
  protocols: string[];
  color: string;
}

export const OSI_LAYERS: OsiLayer[] = [
  {
    number: 7,
    name: 'Aplicación',
    function: 'Interfaz entre la red y las aplicaciones del usuario.',
    pdu: 'Datos',
    devices: ['PC', 'Servidores', 'Smartphones'],
    protocols: ['HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS'],
    color: 'bg-purple-500'
  },
  {
    number: 6,
    name: 'Presentación',
    function: 'Formato de datos, encriptación y compresión.',
    pdu: 'Datos',
    devices: ['Gateways'],
    protocols: ['SSL', 'TLS', 'JPEG', 'MPEG', 'ASCII'],
    color: 'bg-purple-400'
  },
  {
    number: 5,
    name: 'Sesión',
    function: 'Establece, administra y termina las sesiones entre aplicaciones.',
    pdu: 'Datos',
    devices: ['Gateways'],
    protocols: ['NetBIOS', 'PPTP', 'RPC'],
    color: 'bg-purple-300'
  },
  {
    number: 4,
    name: 'Transporte',
    function: 'Segmentación, transferencia confiable, control de flujo y corrección de errores.',
    pdu: 'Segmento (TCP) / Datagrama (UDP)',
    devices: ['Firewalls', 'Load Balancers'],
    protocols: ['TCP', 'UDP'],
    color: 'bg-cyan-500'
  },
  {
    number: 3,
    name: 'Red',
    function: 'Direccionamiento lógico y enrutamiento (determinar la mejor ruta).',
    pdu: 'Paquete',
    devices: ['Routers', 'Layer 3 Switches'],
    protocols: ['IP', 'ICMP', 'IPsec', 'IGMP'],
    color: 'bg-blue-500'
  },
  {
    number: 2,
    name: 'Enlace de Datos',
    function: 'Acceso a los medios, direccionamiento físico (MAC) y detección de errores.',
    pdu: 'Trama (Frame)',
    devices: ['Switches', 'Bridges', 'Access Points', 'NICs'],
    protocols: ['Ethernet', 'Wi-Fi (802.11)', 'PPP', 'MAC'],
    color: 'bg-emerald-500'
  },
  {
    number: 1,
    name: 'Física',
    function: 'Transmisión de bits a través del medio físico. Define especificaciones eléctricas y mecánicas.',
    pdu: 'Bits',
    devices: ['Cables', 'Conectores', 'Hubs', 'Repetidores', 'Transceptores'],
    protocols: ['100Base-T', '1000Base-T', 'DSL', 'Bluetooth'],
    color: 'bg-orange-500'
  }
];
