import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z.object({
    titulo: z.string(),
    etiqueta: z.string(),
    orden: z.number(),
    etapa: z.enum(['diagnostico', 'produccion', 'gestion']),
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
    dato_tarjeta: z.string().optional(),
    grilla: z
      .object({
        videos: z.number().int().min(0),
        estaticas: z.number().int().min(0),
        hasta: z.number().int().min(1).optional(),
      })
      .optional(),
    informe_meses: z.number().int().min(1).optional(),
    resumen: z.string(),
    para_quien: z.string(),
    detalle: z
      .object({
        piezas: z.string(),
        historias: z.string(),
        jornada: z.string(),
        informe: z.string(),
        calendarizacion: z.string(),
      })
      .optional(),
    incluye: z.array(z.object({ lead: z.string(), text: z.string() })),
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
    plazo_minimo: z.string(),
    ajuste: z.string(),
    condiciones: z.array(z.object({ texto: z.string() })),
  }),
});

const adicionales = defineCollection({
  loader: glob({ pattern: 'adicionales.json', base: './src/content/ajustes' }),
  schema: z.object({
    items: z.array(z.object({ nombre: z.string() })),
  }),
});

const inicio = defineCollection({
  loader: glob({ pattern: 'inicio.json', base: './src/content/ajustes' }),
  schema: z.object({
    // "marcas" se conserva solo por compatibilidad: getSeccionesInicio la convierte en "para-quien".
    secciones: z.array(z.object({ tipo: z.enum(['para-quien', 'paquetes', 'como-se-trabaja', 'marcas']) })),
  }),
});

const whatsapp = defineCollection({
  loader: glob({ pattern: 'whatsapp.json', base: './src/content/ajustes' }),
  schema: z.object({ activo: z.boolean().default(true), mensaje: z.string() }),
});

const proceso = defineCollection({
  loader: glob({ pattern: 'proceso.json', base: './src/content/ajustes' }),
  schema: z.object({ pasos: z.array(z.object({ titulo: z.string(), texto: z.string() })) }),
});

const preguntas = defineCollection({
  loader: glob({ pattern: 'preguntas.json', base: './src/content/ajustes' }),
  schema: z.object({ items: z.array(z.object({ pregunta: z.string(), respuesta: z.string() })) }),
});

const contacto = defineCollection({
  loader: glob({ pattern: 'contacto.json', base: './src/content/ajustes' }),
  schema: z.object({ pasos_siguientes: z.array(z.object({ texto: z.string() })) }),
});

export const collections = { servicios, paquetes, marcas, condiciones, adicionales, inicio, whatsapp, proceso, preguntas, contacto };
