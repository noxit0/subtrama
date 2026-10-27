import { getCollection } from 'astro:content';

export interface Paquete {
  slug: string;
  nombre: string;
  tipo: 'cerrado' | 'personalizable';
  destacado: boolean;
  dato_tarjeta?: string;
  grilla?: { videos: number; estaticas: number; hasta?: number };
  resumen: string;
  para_quien: string;
  detalle?: {
    piezas: string;
    historias: string;
    jornada: string;
    informe: string;
    calendarizacion: string;
  };
  incluye: { lead: string; text: string }[];
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


export type SeccionInicio = 'para-quien' | 'paquetes' | 'marcas' | 'como-se-trabaja';

export async function getSeccionesInicio(): Promise<SeccionInicio[]> {
  const [e] = await getCollection('inicio');
  return e.data.secciones.map((s) => s.tipo);
}

export async function getWhatsapp() {
  const [e] = await getCollection('whatsapp');
  return e.data;
}

export async function getProceso() {
  const [e] = await getCollection('proceso');
  return e.data.pasos;
}

export async function getPreguntas() {
  const [e] = await getCollection('preguntas');
  return e.data.items;
}

export async function getPasosSiguientes() {
  const [e] = await getCollection('contacto');
  return e.data.pasos_siguientes.map((p) => p.texto);
}
