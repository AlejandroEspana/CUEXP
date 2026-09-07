export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: '¿En qué capa del Modelo OSI se define el direccionamiento físico (MAC)?',
    options: ['Capa 1 (Física)', 'Capa 2 (Enlace de Datos)', 'Capa 3 (Red)', 'Capa 4 (Transporte)'],
    correctAnswer: 1,
    explanation: 'La Capa 2 (Enlace de Datos) se encarga del direccionamiento físico utilizando direcciones MAC, permitiendo la entrega de tramas dentro de la misma red local.'
  },
  {
    id: 'q2',
    text: '¿Cuál es la principal ventaja de la fibra óptica monomodo frente a la multimodo?',
    options: ['Mayor flexibilidad mecánica', 'Menor costo de implementación', 'Mayor distancia y ancho de banda', 'Es más fácil de empalmar'],
    correctAnswer: 2,
    explanation: 'La fibra monomodo permite que la luz viaje en un solo modo (rayo directo), eliminando la dispersión modal, lo que permite alcanzar distancias mucho mayores con mayor ancho de banda.'
  },
  {
    id: 'q3',
    text: '¿Qué pines del conector RJ45 (T568B) se utilizan para transmitir y recibir datos en redes 10/100Base-T?',
    options: ['Pines 1, 2, 3 y 6', 'Pines 4, 5, 7 y 8', 'Pines 1, 2, 7 y 8', 'Todos los pines'],
    correctAnswer: 0,
    explanation: 'En las redes Fast Ethernet (10/100Base-T), solo se utilizan dos pares: el par Naranja (Pines 1 y 2) y el par Verde (Pines 3 y 6). Gigabit Ethernet utiliza los 8 pines.'
  },
  {
    id: 'q4',
    text: '¿Cuál es la función principal de una Mufla de fibra óptica?',
    options: ['Distribuir los hilos de fibra hacia los equipos activos', 'Amplificar la señal óptica para mayores distancias', 'Proteger los empalmes de fibra óptica en ambientes exteriores', 'Convertir la señal óptica en eléctrica'],
    correctAnswer: 2,
    explanation: 'Las muflas son envolventes herméticos diseñados para proteger mecánica y ambientalmente los empalmes de fibra óptica, especialmente en exteriores (postes, cámaras subterráneas).'
  },
  {
    id: 'q5',
    text: '¿Por qué un Ingeniero de Software debe preocuparse por la latencia del medio físico?',
    options: ['Porque afecta la compilación del código', 'Porque la latencia impacta el tiempo de respuesta de las APIs y aplicaciones distribuidas', 'Porque determina qué lenguaje de programación usar', 'No debe preocuparse, es problema de infraestructura'],
    correctAnswer: 1,
    explanation: 'En sistemas distribuidos, microservicios y cloud, la latencia de red se suma al tiempo de procesamiento. Una alta latencia puede generar cuellos de botella severos, timeouts en APIs y una mala experiencia de usuario.'
  }
];
