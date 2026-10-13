import { getCollection } from 'astro:content';

export interface Paquete {
  slug: string;
  nombre: string;
  tipo: 'cerrado' | 'personalizable';
  destacado: boolean;
  precio?: number;
  resumen: string;
  para_quien: string;
  detalle?: {
    piezas: string;
    historias: string;
    jornada: string;
    informe: string;
    calendarizacion: string;
    colaboraciones: string;
  };
  incluye: { lead: string; text: string }[];
  precios_unitarios: { servicio: string; unidad: string; incluye: string; precio?: number }[];
}

export async function getPaquetes(): Promise<Paquete[]> {
  const entries = await getCollection('paquetes');
  return entries
    .sort((a, b) => a.data.orden - b.data.orden)
    .map((e) => {
      const { orden, ...rest } = e.data;
      return { slug: e.id, ...rest };
    });
}

export async function getMarcas() {
  const entries = await getCollection('marcas');
  return entries
    .filter((e) => e.data.visible)
    .sort((a, b) => a.data.orden - b.data.orden)
    .map((e) => ({ slug: e.id, ...e.data }));
}

export async function getCondiciones() {
  const [e] = await getCollection('condiciones');
  return e.data;
}

export async function getAdicionales() {
  const [e] = await getCollection('adicionales');
  return e.data.items;
}

const nf = new Intl.NumberFormat('es-AR');
export const formatoPrecio = (n: number) => '$' + nf.format(n);
