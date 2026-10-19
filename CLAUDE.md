# CLAUDE.md

Proyecto: sitio web de Subtrama (https://subtrama.com.ar).
Idioma de trabajo y de contenido: español (Argentina). Tono profesional y directo.

## Stack

- Generador: Astro (salida estática, sin adaptador de servidor).
- Hosting y CDN: Cloudflare Pages. Despliegue automático desde GitHub.
- DNS: Cloudflare. Dominio: subtrama.com.ar. www redirige al apex con 301.
- Repositorio: noxit0/subtrama (público, cuenta personal). Rama de producción: main.
- CMS: Sveltia CMS en /admin (backend GitHub, login con token, flujo editorial con pull requests). Configuración en public/admin/config.yml.
- Formulario de contacto: Cloudflare Pages Functions (functions/api/contacto.ts), Cloudflare Turnstile (antispam) y Resend (envío de correo). Ver la sección Formulario de contacto.
- Sistema operativo del mantenedor: Windows. Node.js 22.12 o superior.

## Estructura

- src/pages/: páginas del sitio (rutas por archivo): inicio, nosotros, contacto, privacidad, 404, servicios (índice con comparación de paquetes y [slug]) y paquetes ([slug]).
- src/components/: componentes .astro portados del sistema de diseño de marca.
- src/layouts/Base.astro: layout base (metadatos, Open Graph, canonical).
- src/content/: colecciones de contenido editables desde /admin: servicios, paquetes, marcas (JSON; los logos están en src/assets/marcas y Astro los optimiza al publicar) y ajustes (condiciones.json, adicionales.json, inicio.json con el orden de las secciones de la página de inicio, whatsapp.json con el botón flotante, proceso.json con los pasos de Cómo trabajamos, preguntas.json con las preguntas frecuentes de Servicios y contacto.json con los pasos posteriores al envío). Esquemas en src/content.config.ts.
- src/lib/: lectura del contenido (contenido.ts, servicios.ts), formato de precios y la plantilla del correo de confirmación (correo-confirmacion.ts).
- functions/api/contacto.ts: Pages Function que recibe el formulario (POST /api/contacto). No es una ruta de Astro: la compila Cloudflare Pages.
- src/data/: datos fijos (sitio.ts: datos de contacto y objeto formulario con activo y turnstileSiteKey).
- src/styles/: tokens.css, global.css y components.css.
- public/: archivos estáticos servidos tal cual (favicon, robots.txt, _redirects, logos; el PNG del logo lo usa el correo de confirmación porque Gmail no muestra SVG).
- astro.config.mjs: configuración de Astro (site: https://subtrama.com.ar).
- dist/, node_modules/ y .astro/: generados e ignorados por Git. No editar.

## Formulario de contacto

- Flujo: el navegador envía el formulario por fetch a /api/contacto con el token de Turnstile. La función valida el origen, el campo trampa (sitio_web), los datos, el consentimiento y el token de Turnstile en el servidor. Luego envía por Resend el aviso a la casilla de Subtrama (Reply-To del visitante) y una confirmación HTML al visitante (Reply-To a la casilla de Subtrama). La confirmación es de mejor esfuerzo: si falla, la consulta igual se considera recibida.
- Variables en Cloudflare Pages (Settings > Variables and Secrets; cargar en Production y en Preview; un cambio se aplica solo a despliegues nuevos): RESEND_API_KEY y TURNSTILE_SECRET_KEY (secretos); CONTACT_TO_EMAIL (casilla de destino) y CONTACT_FROM_EMAIL (remitente, formato Subtrama Web <web@mail.subtrama.com.ar>). Nunca escribir valores secretos en el repositorio ni en el chat.
- La Site Key de Turnstile es pública y está en src/data/sitio.ts. Con formulario.activo en false el formulario queda deshabilitado.
- Resend: dominio verificado mail.subtrama.com.ar (subdominio, para aislar la reputación del dominio raíz). Los registros DKIM y los dos CNAME (send.mail y rsend.mail) deben estar en DNS only (sin proxy) en Cloudflare. El remitente no tiene buzón; las respuestas van por Reply-To.
- La función solo acepta orígenes https://subtrama.com.ar y *.subtrama.pages.dev. Si cambia el dominio, actualizar ORIGENES_PERMITIDOS.
- El asunto y el título del correo de confirmación son el mismo texto (constante ASUNTO en src/lib/correo-confirmacion.ts).
- Política de privacidad en src/pages/privacidad.astro (Ley 25.326, responsable Subtrama, conservación de dos semanas). Un cambio en los datos que se piden o en los proveedores exige actualizarla. Las consultas se eliminan de Gmail pasadas las dos semanas.
- Si se cambia la casilla de destino (por ejemplo al contratar Google Workspace), actualizar CONTACT_TO_EMAIL y sitio.ts.

## Comandos

- npm install: instala dependencias.
- npm run dev: servidor local en http://localhost:4321.
- npm run build: genera dist/. Debe terminar sin errores.
- npm run preview: sirve dist/ localmente.

## Reglas de trabajo

- No ejecutar git commit, git push, git pull, git checkout, git branch ni ningún otro comando de Git que modifique el repositorio o las ramas. El control de versiones lo gestiona el mantenedor con GitHub Desktop.
- Antes de editar, verificar con git status y git branch --show-current (solo lectura) que la rama activa no sea main. Si es main, detenerse y pedir al mantenedor que cree una rama nueva.
- Cada cambio se realiza en una rama nueva creada desde GitHub Desktop. La rama main está protegida: exige pull request y el chequeo de Cloudflare Pages.
- Al terminar un cambio, ejecutar npm run build y reportar el resultado. Si el entorno de Claude no es Windows, node_modules contiene binarios de Windows y el build falla: compilar en una copia temporal fuera de la carpeta del repositorio, sin modificar node_modules.
- Los comandos de Git de solo lectura se ejecutan con GIT_OPTIONAL_LOCKS=0 y sin git fetch, para no dejar archivos de bloqueo (.lock) en .git.
- Al cerrar cada cambio, proponer un summary y una description para el commit.
- No incluir node_modules/, dist/ ni .astro/ en cambios. No instalar dependencias sin informar el motivo.
- Los comandos de terminal para el mantenedor deben ser compatibles con Windows. En PowerShell, usar curl.exe en lugar de curl.
- Los archivos usan fin de línea LF (ver .gitattributes).
- Voz de marca: primera persona del plural, voseo respetuoso, registro formal, sin emojis (guía de voz 2.0 del 19/10/2026).
- Precios: no se publican en el sitio. Se informan por propuesta cuando el cliente se contacta. No agregar importes, vigencia ni nota de IVA a páginas ni a /admin.

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
- Si se tocó el formulario: prueba de envío en el preview (aviso a Subtrama y confirmación al visitante) y repetirla en producción.

## Estado

- Sitio público en https://subtrama.com.ar: 16 páginas (inicio, servicios con 7 de detalle, 3 de paquetes, nosotros, contacto, privacidad, 404). Paquetes Esencial, Impulso (cerrados) y A Medida, en src/content/paquetes, sin precios publicados; condiciones en src/content/ajustes/condiciones.json. Las URL anteriores (base, intermedio, personalizable, completo) redirigen por public/_redirects. Voz de empresa (primera persona del plural, voseo) aplicada en los textos; falta revisarlos contra la guía de voz 2.0.
- Mejoras de experiencia: botón flotante de WhatsApp (número en src/data/sitio.ts, mensaje en whatsapp.json), tarjetas de paquetes con dato, cinta "Recomendado" (campo destacado) y realce al pasar el mouse, pasos de Cómo trabajamos, preguntas frecuentes con datos estructurados y pasos posteriores en Contacto. Todo editable desde /admin.
- Cloudflare Web Analytics activo (sin cookies) y documentado en la política de privacidad (PR #15 y #16).
- Formulario de contacto activo en producción con Turnstile y Resend, correo de confirmación HTML y política de privacidad publicada (PR #13 y #14).
- /admin probado por el mantenedor: orden de secciones de inicio, colecciones y carga de logos funcionan.
- Auditoría del 2026-10-13: build correcto, sitemap, robots.txt y Open Graph presentes; Lighthouse: rendimiento 99-100, accesibilidad 100, mejores prácticas 100 y SEO 100 (medición local, 5 páginas). No se repitió tras sumar el formulario.

## Pendientes conocidos

- Búsqueda (Pagefind), diferida. Si se suma otra herramienta de medición, actualizar la política de privacidad.
- Instagram: URL pendiente en src/data/sitio.ts.
- Revisar los textos del sitio contra la guía de voz 2.0 y confirmar los rubros de Balcarce y Los Zainos.
- Términos y condiciones: requieren revisión legal.
- Correo corporativo (Google Workspace): sin contratar; la zona DNS no tiene registros MX de buzones. Al contratarlo, actualizar sitio.ts y CONTACT_TO_EMAIL, y agregar SPF, DKIM y DMARC del dominio raíz.
- Limpieza de ramas viejas, locales y remotas.
- Método propio de Subtrama (tarea secundaria). No nombrar métodos de terceros.
- Portal de clientes: requiere backend; sin decidir.

## Registro

El registro de actividades de la migración está en REGISTRO.md, fuera del repositorio (carpeta local del mantenedor).
