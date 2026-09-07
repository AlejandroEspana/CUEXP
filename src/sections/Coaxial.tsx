import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { CoaxialTransversal } from '../components/network/CoaxialTransversal';
import { Layers } from 'lucide-react';

export const Coaxial = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="13 • LÍNEAS DE TRANSMISIÓN RF"
        badgeColor="orange"
        icon={<Layers size={28} className="text-orange" />}
        title="Cable Coaxial"
        subtitle="Geometría cilíndrica concéntrica para el confinamiento de campos electromagnéticos en modo Transverso Electromagnético (TEM)"
      />

      {/* Interactive Concentric Layer Cross-Section */}
      <CoaxialTransversal />

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Última Milla Residencial & Redes HFC (DOCSIS)"
        takeaway="Millones de usuarios acceden a tus aplicaciones web a través de cables coaxiales RG-6 en redes de cable módem DOCSIS."
      >
        <p>
          Aunque los servidores residen en centros de datos con fibra óptica, una gran porción de los usuarios residenciales en el mundo se conectan a internet mediante redes híbridas de fibra y coaxial (HFC) bajo el estándar <strong>DOCSIS 3.1 / 4.0</strong>.
        </p>
        <p>
          En el cable coaxial de bajada al módem, el ancho de banda de subida (Upload) suele ser asimétrico y mucho menor que el de bajada (Download). Si tu software frontend envía payloads JSON gigantescos o peticiones de subida continuas sin comprimir, saturará el buffer de subida del módem coaxial, provocando una latencia desorbitada (bufferbloat) que congelará la experiencia del usuario.
        </p>
      </EngineeringConnection>
    </div>
  );
};
