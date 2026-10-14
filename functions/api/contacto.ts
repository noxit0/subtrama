// Pages Function: POST /api/contacto
// Valida Turnstile, valida los datos y envía la consulta por Resend.
// Variables requeridas (Cloudflare Pages > Settings > Variables and Secrets):
//   RESEND_API_KEY, TURNSTILE_SECRET_KEY (secretos)
//   CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (texto)

interface Env {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

interface Context {
  request: Request;
  env: Env;
}

const ORIGENES_PERMITIDOS = [/^https:\/\/subtrama\.com\.ar$/, /^https:\/\/([a-z0-9-]+\.)?subtrama\.pages\.dev$/];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

// Quita saltos de línea para evitar inyección de encabezados en el asunto.
const linea = (v: string) => v.replace(/[\r\n]+/g, ' ').trim();
const campo = (data: FormData, nombre: string, max: number) => String(data.get(nombre) ?? '').trim().slice(0, max);

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  const origin = request.headers.get('origin') ?? '';
  if (!ORIGENES_PERMITIDOS.some((re) => re.test(origin))) {
    return json({ ok: false, error: 'Origen no permitido.' }, 403);
  }

  if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return json({ ok: false, error: 'El formulario no está disponible por el momento.' }, 503);
  }

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return json({ ok: false, error: 'Solicitud inválida.' }, 400);
  }

  // Campo trampa: las personas no lo ven ni lo completan. Se responde como éxito sin enviar nada.
  if (campo(data, 'sitio_web', 200) !== '') return json({ ok: true });

  const nombre = campo(data, 'nombre', 100);
  const email = campo(data, 'email', 254);
  const marca = campo(data, 'marca', 120);
  const paquete = campo(data, 'paquete', 60);
  const mensaje = campo(data, 'mensaje', 3000);
  const consentimiento = data.get('consentimiento') === 'on';
  const token = campo(data, 'cf-turnstile-response', 2048);

  if (!nombre || !EMAIL_RE.test(email) || mensaje.length < 10) {
    return json({ ok: false, error: 'Revisá los datos: nombre, correo válido y un mensaje de al menos 10 caracteres.' }, 400);
  }
  if (!consentimiento) {
    return json({ ok: false, error: 'Necesitamos que aceptes la política de privacidad para enviar la consulta.' }, 400);
  }
  if (paquete && !/^[a-z0-9-]+$/.test(paquete)) {
    return json({ ok: false, error: 'Paquete inválido.' }, 400);
  }
  if (!token) {
    return json({ ok: false, error: 'No se pudo verificar que seas una persona. Recargá la página e intentá de nuevo.' }, 400);
  }

  // Verificación de Turnstile en el servidor.
  const verificacion = new FormData();
  verificacion.set('secret', env.TURNSTILE_SECRET_KEY);
  verificacion.set('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) verificacion.set('remoteip', ip);
  let humano = false;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: verificacion });
    humano = ((await r.json()) as { success?: boolean }).success === true;
  } catch {
    return json({ ok: false, error: 'No pudimos verificar la solicitud. Intentá de nuevo en unos minutos.' }, 502);
  }
  if (!humano) {
    return json({ ok: false, error: 'La verificación falló. Recargá la página e intentá de nuevo.' }, 400);
  }

  const texto = [
    `Nombre: ${nombre}`,
    `Correo: ${email}`,
    `Marca o proyecto: ${marca || '(no indicado)'}`,
    `Paquete de interés: ${paquete || '(no indicado)'}`,
    '',
    'Mensaje:',
    mensaje,
    '',
    '---',
    'Enviado desde el formulario de https://subtrama.com.ar/contacto/',
  ].join('\n');

  let envio: Response;
  try {
    envio = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: linea(`Consulta web de ${nombre}`).slice(0, 150),
        text: texto,
      }),
    });
  } catch {
    return json({ ok: false, error: 'No pudimos enviar la consulta. Escribinos por WhatsApp o por correo.' }, 502);
  }
  if (!envio.ok) {
    return json({ ok: false, error: 'No pudimos enviar la consulta. Escribinos por WhatsApp o por correo.' }, 502);
  }
  return json({ ok: true });
}

// Cualquier otro método no está permitido.
export function onRequest(): Response {
  return json({ ok: false, error: 'Método no permitido.' }, 405);
}
