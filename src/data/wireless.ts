export interface WifiStandard {
  generation: string;
  ieee: string;
  year: number;
  frequencies: string[];
  maxTheoreticalSpeed: string;
  modulation: string;
  keyFeatures: string[];
}

export const WIFI_STANDARDS: WifiStandard[] = [
  {
    generation: 'Wi-Fi 4',
    ieee: '802.11n',
    year: 2009,
    frequencies: ['2.4 GHz', '5 GHz'],
    maxTheoreticalSpeed: '600 Mbps',
    modulation: '64-QAM / OFDM',
    keyFeatures: ['Introdujo tecnología MIMO (Multiple-Input Multiple-Output)', 'Canales de 40 MHz']
  },
  {
    generation: 'Wi-Fi 5',
    ieee: '802.11ac',
    year: 2014,
    frequencies: ['5 GHz'],
    maxTheoreticalSpeed: '3.5 Gbps',
    modulation: '256-QAM / OFDM',
    keyFeatures: ['MU-MIMO en bajada (Downlink)', 'Canales anchos de 80 y 160 MHz', 'Beamforming estandarizado']
  },
  {
    generation: 'Wi-Fi 6 / 6E',
    ieee: '802.11ax',
    year: 2019,
    frequencies: ['2.4 GHz', '5 GHz', '6 GHz (en 6E)'],
    maxTheoreticalSpeed: '9.6 Gbps',
    modulation: '1024-QAM / OFDMA',
    keyFeatures: ['OFDMA (subcanales ortogonales multiusuario)', 'BSS Coloring para mitigar interferencia entre APs vecinos', 'Banda limpia de 6 GHz en 6E']
  },
  {
    generation: 'Wi-Fi 7',
    ieee: '802.11be (EHT)',
    year: 2024,
    frequencies: ['2.4 GHz', '5 GHz', '6 GHz'],
    maxTheoreticalSpeed: '46 Gbps',
    modulation: '4096-QAM (4K-QAM)',
    keyFeatures: ['Canales ultra anchos de 320 MHz', 'MLO (Multi-Link Operation: transmisión simultánea en 2.4, 5 y 6 GHz)', 'Latencia determinista para VR/AR y cloud gaming']
  }
];

export const UNGUIDED_PHENOMENA = [
  {
    title: 'Pérdida en Espacio Libre (FSPL)',
    description: 'La potencia de la onda electromagnética se dispersa esféricamente con la distancia al cuadrado (Ley del inverso del cuadrado). A mayor frecuencia, mayor es la pérdida por distancia geométrica.',
    formula: 'FSPL(dB) = 20\\log_{10}(d) + 20\\log_{10}(f) - 147.55'
  },
  {
    title: 'Desvanecimiento Multitrayecto (Multipath Fading)',
    description: 'La señal emitida rebota en paredes, techos, muebles y vehículos. Múltiples copias de la misma onda llegan a la antena receptora con ligeros desfases de tiempo, interfiriendo constructiva o destructivamente entre sí.',
    formula: 'Señal = \\sum_{i} A_i \\cos(2\\pi f t - \\phi_i)'
  },
  {
    title: 'Naturaleza de Medio Compartido (Half-Duplex)',
    description: 'A diferencia de un cable Ethernet full-duplex donde hay hilos dedicados para enviar y recibir simultáneamente, el espectro electromagnético es un único medio compartido por todos los dispositivos en el canal. Un solo dispositivo transmite a la vez.',
    formula: 'CSMA/CA \\text{ con } Exponential\\ Backoff'
  }
];
