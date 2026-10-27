import { getCollection } from 'astro:content';

export type Etapa = 'diagnostico' | 'produccion' | 'gestion';

// Etapas del proceso, en orden. Agrupan los servicios en la página de Servicios.
export const ETAPAS: { id: Etapa; nombre: string; resumen: string }[] = [
  { id: 'diagnostico', nombre: 'Diagnóstico', resumen: 'Entendemos dónde está tu marca y ordenamos lo que ya tiene.' },
  { id: 'produccion', nombre: 'Producción', resumen: 'Creamos y editamos el contenido con la identidad de tu marca.' },
  { id: 'gestion', nombre: 'Gestión', resumen: 'Lo publicamos en fecha y te mostramos qué pasó con cada pieza.' },
];

export interface Servicio {
  slug: string;
  titulo: string;
  etiqueta: string;
  etapa: Etapa;
  resumen: string;
  intro: string;
  incluye: { lead: string; text: string }[];
  entrega: string;
}

export async function getServicios(): Promise<Servicio[]> {
  const entries = await getCollection('servicios');
  return entries
    .sort((a, b) => a.data.orden - b.data.orden)
    .map((e) => {
      const { orden, ...rest } = e.data;
      return { slug: e.id, ...rest };
    });
}
