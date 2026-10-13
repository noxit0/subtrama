import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z.object({
    titulo: z.string(),
    etiqueta: z.string(),
    orden: z.number(),
    resumen: z.string(),
    intro: z.string(),
    entrega: z.string(),
    incluye: z.array(z.object({ lead: z.string(), text: z.string() })),
  }),
});

const paquetes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paquetes' }),
  schema: z.object({
    nombre: z.string(),
    orden: z.number(),
    tipo: z.enum(['cerrado', 'personalizable']),
    destacado: z.boolean().default(false),
    precio: z.number().optional(),
    resumen: z.string(),
    para_quien: z.string(),
    detalle: z
      .object({
        piezas: z.string(),
        historias: z.string(),
        jornada: z.string(),
        informe: z.string(),
        calendarizacion: z.string(),
        colaboraciones: z.string(),
      })
      .optional(),
    incluye: z.array(z.object({ lead: z.string(), text: z.string() })),
    precios_unitarios: z
      .array(
        z.object({
          servicio: z.string(),
          unidad: z.string(),
          incluye: z.string(),
          precio: z.number().optional(),
        }),
      )
      .nullish()
      .transform((v) => v ?? []),
  }),
});

const marcas = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/marcas' }),
  schema: z.object({
    nombre: z.string(),
    rubro: z.string(),
    orden: z.number(),
    visible: z.boolean().default(true),
    logo: z.string().optional(),
    url: z.string().optional(),
  }),
});

const condiciones = defineCollection({
  loader: glob({ pattern: 'condiciones.json', base: './src/content/ajustes' }),
  schema: z.object({
    vigencia_desde: z.string(),
    nota_impuestos: z.string(),
    plazo_minimo: z.string(),
    ajuste: z.string(),
    condiciones: z.array(z.object({ texto: z.string() })),
  }),
});

const adicionales = defineCollection({
  loader: glob({ pattern: 'adicionales.json', base: './src/content/ajustes' }),
  schema: z.object({
    items: z.array(z.object({ nombre: z.string(), precio: z.number().optional() })),
  }),
});

const inicio = defineCollection({
  loader: glob({ pattern: 'inicio.json', base: './src/content/ajustes' }),
  schema: z.object({
    secciones: z.array(z.object({ tipo: z.enum(['para-quien', 'paquetes', 'marcas', 'como-se-trabaja']) })),
  }),
});

export const collections = { servicios, paquetes, marcas, condiciones, adicionales, inicio };
