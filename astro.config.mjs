// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://subtrama.com.ar',
  // La política de privacidad es texto legal sin valor de búsqueda: se deja fuera del sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/privacidad') })],
});
