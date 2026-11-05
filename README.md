# subtrama

Sitio web de Subtrama (https://subtrama.com.ar). Astro con salida estática, publicado en Cloudflare Pages.

Requisitos: Node.js 22.12 o superior.

Comandos:
- npm install
- npm run dev (http://localhost:4321)
- npm run build (genera dist/)
- npm run preview (sirve dist/)

El contenido se edita desde /admin (Sveltia CMS). El formulario de contacto es una Pages Function en functions/api/contacto.ts.

El diseño sigue el sistema de marca de Subtrama: tokens en src/styles/tokens.css y componentes en src/components. Reglas de uso de color, tipografía y movimiento en CLAUDE.md.

La documentación de trabajo (estructura, formulario, reglas y pendientes) está en CLAUDE.md.
