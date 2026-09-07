import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { BncBayonetDiagram } from '../components/network/BncBayonetDiagram';
import { Activity } from 'lucide-react';

export const BNC = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="16 • CONECTORES COAXIALES DE PRECISIÓN"
        badgeColor="orange"
        icon={<Activity size={28} className="text-orange" />}
        title="Conector BNC (Bayonet Neill-Concelman)"
        subtitle="Mecanismo de bayoneta de acoplamiento rápido y blindaje concéntrico continuo para video digital profesional, RF e instrumentación"
      />

      {/* Interactive Bayonet Locking Diagram & Impedance */}
      <BncBayonetDiagram />

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Sistemas Embebidos, Adquisición de Datos & Video SDI"
        takeaway="En software de instrumentación y broadcast, el conector BNC garantiza señales de muestreo sin ruido analógico inducido."
      >
        <p>
          En desarrollo de software industrial, sistemas de radar o pipelines de transmisión de video 4K/8K sin comprimir (estándar SMPTE ST 2110 y 12G-SDI), las tarjetas de captura PCI Express utilizan exclusivamente <strong>conectores BNC de 75 ohmios</strong>.
        </p>
        <p>
          Si un conector de video sufriera el más mínimo falso contacto o vibración mecánica durante una transmisión en vivo, el flujo de bits perdería la sincronización de reloj genlock, corrompiendo los frames antes de llegar al software de codificación de video (FFmpeg o GStreamer).
        </p>
      </EngineeringConnection>
    </div>
  );
};
