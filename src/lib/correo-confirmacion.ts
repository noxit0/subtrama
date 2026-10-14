// Correo de confirmación que se envía al visitante tras completar el formulario de contacto.
// HTML con tablas y estilos en línea (compatible con Gmail, Outlook y clientes móviles).
// Colores tomados de src/styles/tokens.css (tema claro).

interface Datos {
  nombre: string;
  marca: string;
  paqueteNombre: string;
  mensaje: string;
  baseUrl: string; // origen del sitio, para el logo
  whatsapp: string;
  correo: string;
}

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const ASUNTO = 'Consulta recibida';
const FUENTE = "Montserrat, 'Segoe UI', Helvetica, Arial, sans-serif";

export function confirmacionTexto(d: Datos): string {
  return [
    `Hola ${d.nombre},`,
    '',
    'Recibimos tu consulta y la vamos a procesar antes de contactarte.',
    'Te respondemos en días hábiles para coordinar una primera reunión.',
    'Si querés sumar información, respondé este correo.',
    '',
    'Este es un mensaje automático. Si no enviaste una consulta a Subtrama, ignoralo.',
    '',
    'Subtrama, espacio de marketing digital',
    'https://subtrama.com.ar',
  ].join('\n');
}

export function confirmacionHtml(d: Datos): string {
  const detalle = [
    d.marca && ['Marca o proyecto', esc(d.marca)],
    d.paqueteNombre && ['Paquete de interés', esc(d.paqueteNombre)],
    ['Tu mensaje', esc(d.mensaje).replace(/\r?\n/g, '<br />')],
  ].filter(Boolean) as string[][];

  const filas = detalle
    .map(
      ([etiqueta, valor]) => `
              <tr>
                <td style="padding:0 0 14px 0;font-family:${FUENTE};font-size:12px;line-height:16px;letter-spacing:0.08em;text-transform:uppercase;color:#8E5A44;font-weight:700;">${etiqueta}</td>
              </tr>
              <tr>
                <td style="padding:0 0 20px 0;font-family:${FUENTE};font-size:15px;line-height:23px;color:#272524;">${valor}</td>
              </tr>`,
    )
    .join('');

  const contacto = [
    d.whatsapp && `<a href="${esc(d.whatsapp)}" style="color:#48574E;text-decoration:underline;">WhatsApp</a>`,
    d.correo && `<a href="mailto:${esc(d.correo)}" style="color:#48574E;text-decoration:underline;">${esc(d.correo)}</a>`,
  ]
    .filter(Boolean)
    .join(' &nbsp;·&nbsp; ');

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light only" />
  <title>${ASUNTO}</title>
</head>
<body style="margin:0;padding:0;background-color:#FFF5E9;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Recibimos tu consulta y la vamos a procesar antes de contactarte.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFF5E9;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#FFFFFF;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="height:6px;line-height:6px;font-size:6px;background-color:#77897F;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:32px 40px 8px 40px;">
              <img src="${esc(d.baseUrl)}/logos/subtrama-horizontal-positivo.png" width="200" alt="Subtrama" style="display:block;border:0;outline:none;text-decoration:none;width:200px;max-width:100%;height:auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 0 40px;font-family:${FUENTE};font-size:26px;line-height:32px;color:#272524;font-weight:700;">${ASUNTO}</td>
          </tr>
          <tr>
            <td style="padding:16px 40px 0 40px;font-family:${FUENTE};font-size:16px;line-height:25px;color:#272524;">
              Hola ${esc(d.nombre)},<br /><br />
              Recibimos tu consulta y la vamos a procesar antes de contactarte. Te respondemos en días hábiles para coordinar una primera reunión.
            </td>
          </tr>
          <tr>
            <td style="padding:28px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F3F8F5;border-left:4px solid #77897F;border-radius:4px;">
                <tr>
                  <td style="padding:22px 24px 2px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${filas}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 0 40px;font-family:${FUENTE};font-size:15px;line-height:23px;color:#272524;">
              Si querés sumar información, respondé este correo.
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #D0DAD5;font-size:0;line-height:0;height:1px;">&nbsp;</td></tr></table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 0 40px;font-family:${FUENTE};font-size:13px;line-height:20px;color:#67635C;">
              Subtrama, espacio de marketing digital<br />
              <a href="https://subtrama.com.ar" style="color:#48574E;text-decoration:underline;">subtrama.com.ar</a>${contacto ? `<br />${contacto}` : ''}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 40px 32px 40px;font-family:${FUENTE};font-size:12px;line-height:18px;color:#67635C;">
              Este es un mensaje automático. Si no enviaste una consulta a Subtrama, ignoralo. Tratamos tus datos según nuestra
              <a href="${esc(d.baseUrl)}/privacidad/" style="color:#48574E;text-decoration:underline;">política de privacidad</a>.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
