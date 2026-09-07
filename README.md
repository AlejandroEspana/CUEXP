# 🌐 Plataforma Educativa Interactiva: Medios de Transmisión de Datos
> **Aplicación web universitaria y laboratorio interactivo de telecomunicaciones orientado a estudiantes de Ingeniería de Software.**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-black.svg)](https://www.framer.com/motion/)

---

## 🎯 Propósito del Proyecto

Esta plataforma fue diseñada para exposiciones universitarias frente a proyector y autoaprendizaje práctico en la cátedra de **Redes y Transmisión de Datos**.

A diferencia de una documentación estática o diapositivas planas, combina:
1. **Modo Presentación Proyector:** Controles HUD flotantes, navegación fluida por teclado, soporte de pantalla completa y visualización en alto contraste (Dark Tech Glassmorphism).
2. **Laboratorios Virtuales Interactivos:** Simuladores paso a paso de crimpado de cables (T568A/B), encapsulación y desencapsulación OSI, acoplamiento de bayoneta BNC, corte transversal de cables coaxiales y ODF/Muflas de fibra óptica.
3. **Perspectiva de Ingeniería de Software:** En cada uno de los 22 módulos se incluye el componente exclusivo **`¿Por qué me importa como Ingeniero de Software?`**, conectando la física del canal con latencias de microservicios, timeouts HTTP, sockets TCP y diseño de aplicaciones de misión crítica.
4. **Motor de Decisión y Casos Reales:** Comparador dinámico de medios con algoritmos de puntuación y 5 casos prácticos del mundo real con retroalimentación formativa inmediata.
5. **Evaluación de Dominio:** Cuestionario de 18 preguntas con explicaciones rigurosas, desglose por categorías y retroalimentación interactiva.

---

## 🧭 Mapa de los 22 Módulos Temáticos

| # | Módulo | Ruta | Conceptos Clave |
|---|---|---|---|
| **01** | Introducción a los Medios | `/` | Definición física, clasificación de medios, simulador de propagación |
| **02** | Medios Guiados vs. No Guiados | `/guiados` | Confinamiento electromagnético, dispersión geométrica, espectro |
| **03** | Medios en el Modelo OSI | `/osi` | Capa 1 y Capa 2, PDU (Bits y Tramas), simulador de encapsulación L7→L1 |
| **04** | Cableado Estructurado | `/cableado` | ANSI/TIA-568, ISO 11801, Topología de edificio (MDF, IDF, Patch Panels) |
| **05** | Conectores RJ45 y el Mito RJ8 | `/conectores` | Estándar 8P8C, pines dorados de 50µin, desmitificación académica de "RJ8" |
| **06** | Estándares T568A y T568B | `/t568` | Asignación de pares diferenciales, código de colores, laboratorio de crimpado |
| **07** | Cable Directo vs. Cruzado | `/cables` | MDI vs MDI-X, detección automática Auto MDI-X en hardware PHY |
| **08** | Fibra Óptica: Principios Físicos | `/fibra` | Índice de refracción, ley de Snell, reflexión interna total, sílice |
| **09** | Fibra Monomodo (SMF) | `/monomodo` | Núcleo de 9µm, láser 1310/1550nm, cero dispersión modal, backbones |
| **10** | Fibra Multimodo (MMF) | `/multimodo` | Núcleo de 50/62.5µm, VCSEL 850nm, dispersión modal, categorías OM1-OM5 |
| **11** | ODF (Optical Distribution Frame) | `/odf` | Bandejas de empalme, pigtails, acopladores, ordenamiento en rack de 19" |
| **12** | Muflas (Cajas de Empalme FOSC) | `/muflas` | Protección intemperie IP68, gel hidrófugo, empalmes por fusión exterior |
| **13** | Cable Coaxial | `/coaxial` | Conductor central, dieléctrico, blindaje, efecto piel (Skin Effect) |
| **14** | Coaxial Grueso: RG-8 | `/rg8` | Estándar MIL-C-17, 10BASE5 Thicknet, conector vampiro (vampire tap), 50Ω |
| **15** | Cable Heliax® Corrugado | `/heliax` | Cobre macizo corrugado, baja pérdida dieléctrica en mástiles de radiofrecuencia |
| **16** | Conector BNC | `/bnc` | Bayonet Neill-Concelman, impedancias de 50Ω vs 75Ω, acoplamiento 1/4 giro |
| **17** | Guías de Onda | `/guias` | Tubos metálicos huecos, microondas (>1 GHz), modo TE10, frecuencia de corte |
| **18** | Transmisión Inalámbrica y Wi-Fi | `/inalambrica` | Medio no guiado half-duplex, FSPL, contienda CSMA/CA, Wi-Fi 4 al Wi-Fi 7 |
| **19** | Conexión con Ingeniería de Software | `/software` | Recorrido end-to-end de 12 saltos: desde el click del usuario hasta la base de datos |
| **20** | Casos Prácticos de Aplicación | `/casos` | 5 escenarios de diseño de red corporativa con análisis de trade-offs |
| **21** | Evaluación Técnica Interactiva | `/quiz` | Examen interactivo de 18 preguntas con desglose de puntaje y explicaciones |
| **22** | Conclusiones y Síntesis Final | `/conclusiones` | Dashboard ejecutivo, árbol taxonómico completo y síntesis conceptual |

---

## ⌨️ Atajos de Teclado (Modo Presentación)

Durante la presentación frente al auditorio o proyector:

* `→` / `Espacio`: Avanzar a la siguiente diapositiva / sección.
* `←`: Regresar a la diapositiva anterior.
* `F`: Alternar modo de pantalla completa (**Fullscreen**).
* `P`: Alternar modo proyector (**Presentation HUD** con controles flotantes).
* `G`: Abrir / Cerrar el **Glosario Técnico de Telecomunicaciones** con buscador en tiempo real.
* `Esc`: Cerrar cualquier modal abierto o salir de pantalla completa.

---

## 🚀 Instalación y Puesta en Marcha

### Requisitos Previos
* [Node.js](https://nodejs.org/) (versión 18.0 o superior recomendada).
* Gestor de paquetes `npm` (incluido con Node.js).

### Pasos de Instalación

1. **Clonar o descargar el repositorio:**
   ```bash
   cd c:/Users/RealMix1/Desktop/CUEXP
   ```

2. **Instalar dependencias del proyecto:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor local de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre tu navegador en `http://localhost:5173/` para ver la plataforma en funcionamiento.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```
   Genera el bundle optimizado y minificado en la carpeta `dist/`.

5. **Previsualizar la compilación de producción:**
   ```bash
   npm run preview
   ```

---

## 🛠️ Stack Tecnológico y Arquitectura

* **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (Configuración estricta con `verbatimModuleSyntax` y `noUnusedLocals`).
* **Bundler & Build Tool:** [Vite 6](https://vitejs.dev/) con Hot Module Replacement ultra veloz (<500ms build).
* **Estilos & Diseño:** [Tailwind CSS 3.4](https://tailwindcss.com/) configurado con paleta Dark Tech (`#050816`, `#0B1020`, cian `#06B6D4`, violeta `#8B5CF6`, naranja `#F59E0B`).
* **Animaciones:** [Framer Motion](https://www.framer.com/motion/) para transiciones cinemáticas, ondas de señal, pulsos de fotones y paquetes de red en movimiento.
* **Iconografía:** [Lucide React](https://lucide.dev/) para simbología técnica de red (switches, servidores, cables, fibras, antenas).
* **Gestión de Estado:** [Zustand](https://github.com/pmndrs/zustand) para el estado global del modo presentación y navegación de diapositivas.

---

## 🧩 Guía de Extensibilidad: Cómo Agregar Contenido

La arquitectura modular separa de manera estricta los datos estructurados (`src/data/`) de la interfaz de usuario (`src/components/` y `src/sections/`).

### 1. Agregar un nuevo término al Glosario
Edita el archivo `src/data/glossary.ts` y añade una entrada al array `GLOSSARY_TERMS`:
```typescript
{
  id: 'nuevo-termino',
  term: 'Nombre del Término',
  category: 'Cables' | 'Fibra' | 'RF' | 'Estándares' | 'OSI' | 'Software' | 'Conectores',
  shortDef: 'Definición concisa de 1 oración.',
  fullDef: 'Explicación física y técnica detallada.',
  softwareConnection: '¿Cómo afecta este fenómeno al software o a las aplicaciones distribuidas?'
}
```

### 2. Agregar una nueva pregunta al Quiz
Edita `src/data/questions.ts` y añade un nuevo objeto al array `QUESTIONS`:
```typescript
{
  id: 19,
  category: 'Fibra' | 'Cobre' | 'RF' | 'OSI' | 'Software',
  question: '¿Cuál es el motivo por el cual...?',
  options: [
    'Opción A',
    'Opción B',
    'Opción C',
    'Opción D'
  ],
  correctAnswer: 1, // Índice de la respuesta correcta (0 a 3)
  explanation: 'Justificación física y de ingeniería de por qué esta respuesta es la correcta.'
}
```

### 3. Agregar un nuevo caso de estudio
Edita `src/data/cases.ts` y añade un elemento a `PRACTICAL_CASES`:
```typescript
{
  id: 'caso-6',
  title: 'Enlace submarino intercontinental',
  context: 'Descripción del desafío de ingeniería...',
  distance: '6,500 km',
  bandwidthNeeded: '200 Tbps',
  environment: 'Fondo marino a alta presión',
  budget: 'Crítico / Misión prioritaria',
  options: [ ... ],
  correctOptionId: 'smf-edfa',
  osiImpact: 'Capa 1 (Física) con amplificación óptica submarina EDFA'
}
```

### 4. Agregar un nuevo medio al Comparador Interactivo
Edita `src/data/comparator.ts` y añade un perfil a `MEDIA_PROFILES`:
```typescript
{
  id: 'cat8',
  name: 'Cobre Cat 8 U/FTP',
  type: 'guided',
  maxSpeedGbps: 40,
  maxDistanceMeters: 30,
  latencyScore: 95,
  emiImmunity: 'Alta',
  costPerMeterUsd: 1.80,
  recommendedUse: 'Conexión Top-of-Rack a Servidor en Data Centers',
  description: 'Cable de par trenzado apantallado que opera a 2000 MHz...'
}
```

---

## 🎓 Créditos Académicos
* **Asignatura:** Redes y Comunicación de Datos / Transmisión de Datos.
* **Audiencia:** Estudiantes y docentes de Ingeniería de Software, Sistemas y Computación.
* **Diseño e Implementación:** Desarrollado como plataforma interactiva para exposición universitaria.
