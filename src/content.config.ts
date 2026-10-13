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

export const collections = { servicios };
