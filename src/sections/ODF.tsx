import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { OdfDiagram } from '../components/network/OdfDiagram';
import { Layers } from 'lucide-react';

export const ODF = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="11 • DISTRIBUCIÓN ÓPTICA EN RACK"
        badgeColor="cyan"
        icon={<Layers size={28} className="text-cyan" />}
        title="ODF: Optical Distribution Frame"
        subtitle="Bastidores modulares de 19 pulgadas para la terminación, organización, empalme y conmutación de enlaces de fibra en salas de datos"
      />

      {/* Interactive ODF Diagram */}
      <OdfDiagram />

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Mantenimiento Sin Caídas (Zero-Downtime Operations)"
        takeaway="El ODF permite reconfigurar rutas troncales de fibra en caliente sin desoldar empalmes ni perturbar servicios adyacentes."
      >
        <p>
          En operaciones de sistemas de alta disponibilidad (como despliegues Blue/Green o migración de clusters de servidores), los ingenieros de redes y DevOps necesitan cambiar puertos físicos de switch o desviar tráfico hacia nuevos routers de borde.
        </p>
        <p>
          Gracias al ODF, esta tarea toma literalmente segundos: un técnico simplemente traslada un patch cord óptico LC duplex de un puerto a otro en el panel frontal del ODF. Los hilos de fibra troncal que vienen de la calle permanecen intactos, fusionados permanentemente en las bandejas internas protegidas.
        </p>
      </EngineeringConnection>
    </div>
  );
};
