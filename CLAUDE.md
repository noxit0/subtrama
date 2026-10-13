# CLAUDE.md

Proyecto: sitio web de Subtrama (https://subtrama.com.ar).
Idioma de trabajo y de contenido: español (Argentina). Tono profesional y directo.

## Stack

- Generador: Astro (salida estática, sin adaptador de servidor).
- Hosting y CDN: Cloudflare Pages. Despliegue automático desde GitHub.
- DNS: Cloudflare. Dominio: subtrama.com.ar. www redirige al apex con 301.
- Repositorio: noxit0/subtrama (público, cuenta personal). Rama de producción: main.
- CMS: Sveltia CMS en /admin (backend GitHub, login con token, flujo editorial con pull requests). Configuración en public/admin/config.yml.
- Sistema operativo del mantenedor: Windows. Node.js 22.12 o superior.

## Estructura

- src/pages/: páginas del sitio (rutas por archivo): inicio, nosotros, contacto, 404 servicios (índice con comparación de paquetes y [slug]) y paquetes ([slug]).
- src/components/: componentes .astro portados del sistema de diseño de marca.
- src/layouts/Base.astro: layout base (metadatos, Open Graph, canonical).
- src/content/: colecciones de contenido editables desde /admin: servicios, paquetes, marcas (JSON, logos en public/media/marcas) y ajustes (condiciones.json, adicionales.json, inicio.json con el orden de las secciones de la página de inicio). Esquemas en src/content.config.ts.
- src/lib/: lectura del contenido (contenido.ts, servicios.ts) y formato de precios.
- src/data/: datos fijos (sitio.ts: contacto).
- src/styles/: tokens.css, global.css y components.css.
- public/: archivos estáticos servidos tal cual (favicon, robots.txt, _redirects).
- astro.config.mjs: configuración de Astro (site: https://subtrama.com.ar).
- dist/, node_modules/ y .astro/: generados e ignorados por Git. No editar.

## Comandos

- npm install: instala dependencias.
- npm run dev: servidor local en http://localhost:4321.
- npm run build: genera dist/. Debe terminar sin errores.
- npm run preview: sirve dist/ localmente.

## Reglas de trabajo

- No ejecutar git commit, git push, git pull, git checkout, git branch ni ningún otro comando de Git que modifique el repositorio o las ramas. El control de versiones lo gestiona el mantenedor con GitHub Desktop.
- Antes de editar, verificar con git status y git branch --show-current (solo lectura) que la rama activa no sea main. Si es main, detenerse y pedir al mantenedor que cree una rama nueva.
- Cada cambio se realiza en una rama nueva creada desde GitHub Desktop. La rama main está protegida: exige pull request y el chequeo de Cloudflare Pages.
- Al terminar un cambio, ejecutar npm run build y reportar el resultado.
- Al cerrar cada cambio, proponer un summary y una description para el commit.
- No incluir node_modules/, dist/ ni .astro/ en cambios. No instalar dependencias sin informar el motivo.
- Los comandos de terminal para el mantenedor deben ser compatibles con Windows. En PowerShell, usar curl.exe en lugar de curl.
- Los archivos usan fin de línea LF (ver .gitattributes).
- Voz de marca: primera persona, voseo rioplatense, sin emojis.

## Convenciones de contenido y código

- Páginas en src/pages/ con lang="es" en el elemento html.
- Cada página define title y meta description.
- Estilos: preferir CSS con alcance de componente de Astro. Mantener el sitio estático y sin JavaScript innecesario.
- Imágenes en public/ o src/assets/, con atributo alt.
- Si cambian las URL de páginas existentes, registrar redirecciones 301 en public/_redirects.

## Lista de verificación previa a publicar

- npm run build sin errores.
- sitemap y robots.txt presentes.
- Metadatos Open Graph.
- Puntaje de Lighthouse superior a 90.
- Acceso a /admin funcional (cuando exista el CMS).
- Redirecciones 301 en public/_redirects, si cambian URL.

## Estado

- Sitio público en https://subtrama.com.ar. Rama paquetes-y-marcas: 16 páginas (inicio, servicios con 7 de detalle, 4 de paquetes, nosotros, contacto, 404). Precios en src/content/paquetes; vigencia en src/content/ajustes/condiciones.json.
- Auditoría del 2026-10-13: build correcto, sitemap, robots.txt y Open Graph presentes; Lighthouse: rendimiento 99-100, accesibilidad 100, mejores prácticas 100 y SEO 100 (medición local, 5 páginas).

## Pendientes conocidos

- Texto del sitio en borrador, a revisar por el mantenedor.
- Formulario de contacto sin envío (Turnstile y Resend o Brevo).
- Instagram: URL pendiente en src/data/sitio.ts.
- Páginas legales: requieren revisión legal.
- Correo corporativo (Google Workspace): sin contratar; la zona DNS no tiene registros de correo. Actualizar sitio.ts.
- Analítica y búsqueda: por definir.
- Probar /admin con las colecciones paquetes, marcas y ajustes; logo de Balcarce; precios de cobertura de evento y pieza con urgencia.
- Guía de tono y reescritura de textos (paso 5). No nombrar métodos de terceros.
- Portal de clientes: requiere backend; sin decidir.

## Registro

El registro de actividades de la migración está en REGISTRO.md, fuera del repositorio (carpeta local del mantenedor).
