# CLAUDE.md

Proyecto: sitio web de Subtrama (https://subtrama.com.ar).
Idioma de trabajo y de contenido: español (Argentina). Tono profesional y directo.

## Stack

- Generador: Astro (salida estática, sin adaptador de servidor).
- Hosting y CDN: Cloudflare Pages. Despliegue automático desde GitHub.
- DNS: Cloudflare. Dominio: subtrama.com.ar. www redirige al apex con 301.
- Repositorio: noxit0/subtrama (público, cuenta personal). Rama de producción: main.
- CMS previsto: Decap CMS en /admin (pendiente de definir; alternativa: Sveltia CMS).
- Sistema operativo del mantenedor: Windows. Node.js 22.12 o superior.

## Estructura

- src/pages/: páginas del sitio (rutas por archivo).
- public/: archivos estáticos servidos tal cual (favicon, robots.txt, _redirects).
- legacy/: sitio HTML anterior (mock up). Solo referencia de estilo y contenido. No se publica ni se modifica; se eliminará cuando exista el diseño nuevo.
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

## Pendientes conocidos

- Decap CMS y proxy OAuth (Cloudflare Worker).
- Diseño nuevo del sitio, secciones y contenido, por definir.
- Correo corporativo del dominio: por definir. La zona DNS no tiene registros de correo.
- Funciones dinámicas (formulario de contacto, analítica, búsqueda): por definir.

## Registro

El registro de actividades de la migración está en REGISTRO.md, fuera del repositorio (carpeta local del mantenedor).
