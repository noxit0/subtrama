import { getCollection } from 'astro:content';

export interface Servicio {
  slug: string;
  titulo: string;
  etiqueta: string;
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
