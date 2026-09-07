export interface SectionData {
  id: string;
  path: string;
  title: string;
  group?: string;
  component: string;
}

export const SECTIONS: SectionData[] = [
  { id: 'intro', path: '/', title: '01 Introducción', component: 'Introduction' },
  { id: 'guided', path: '/guided', title: '02 Medios guiados', component: 'GuidedMedia' },
  { id: 'osi', path: '/osi', title: '03 Modelo OSI', component: 'OsiModel' },
  { id: 'cabling', path: '/cabling', title: '04 Cableado estructurado', group: 'CABLEADO', component: 'StructuredCabling' },
  { id: 'rj45', path: '/rj45', title: '05 RJ45 / RJ8', group: 'CABLEADO', component: 'Connectors' },
  { id: 't568', path: '/t568', title: '06 T568A / T568B', group: 'CABLEADO', component: 'T568' },
  { id: 'direct-cross', path: '/direct-cross', title: '07 Directo / Cruzado', group: 'CABLEADO', component: 'CableTypes' },
  { id: 'fiber', path: '/fiber', title: '08 Fibra óptica', group: 'FIBRA', component: 'FiberOptics' },
  { id: 'single-mode', path: '/single-mode', title: '09 Monomodo', group: 'FIBRA', component: 'SingleMode' },
  { id: 'multi-mode', path: '/multi-mode', title: '10 Multimodo', group: 'FIBRA', component: 'MultiMode' },
  { id: 'odf', path: '/odf', title: '11 ODF', group: 'FIBRA', component: 'ODF' },
  { id: 'muflas', path: '/muflas', title: '12 Muflas', group: 'FIBRA', component: 'Muflas' },
  { id: 'coaxial', path: '/coaxial', title: '13 Coaxial', group: 'RF', component: 'Coaxial' },
  { id: 'rg8', path: '/rg8', title: '14 RG8', group: 'RF', component: 'RG8' },
  { id: 'heliax', path: '/heliax', title: '15 Heliax', group: 'RF', component: 'Heliax' },
  { id: 'bnc', path: '/bnc', title: '16 BNC', group: 'RF', component: 'BNC' },
  { id: 'waveguides', path: '/waveguides', title: '17 Guías de onda', group: 'RF', component: 'Waveguides' },
  { id: 'wireless', path: '/wireless', title: '18 Inalámbrico', group: 'APLICACIÓN', component: 'Wireless' },
  { id: 'software-eng', path: '/software-engineering', title: '19 Ingeniería de Software', group: 'APLICACIÓN', component: 'SoftwareEngineering' },
  { id: 'cases', path: '/cases', title: '20 Casos prácticos', group: 'APLICACIÓN', component: 'Cases' },
  { id: 'quiz', path: '/quiz', title: '21 Quiz', group: 'APLICACIÓN', component: 'Quiz' },
  { id: 'conclusions', path: '/conclusions', title: '22 Conclusiones', group: 'APLICACIÓN', component: 'Conclusions' },
];
