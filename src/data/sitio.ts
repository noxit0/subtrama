// Datos de contacto del sitio. Dejar vacío un campo lo oculta en todo el sitio.
export const sitio = {
  email: 'subtrama.digital@gmail.com',
  whatsapp: 'https://wa.me/5492284321233',
  instagram: '', // URL completa del perfil; pendiente de definir
};

// Formulario de contacto. Requiere las variables de Cloudflare Pages (ver functions/api/contacto.ts).
// La Site Key de Turnstile es pública. Con activo: false el formulario queda deshabilitado.
export const formulario = {
  activo: true,
  turnstileSiteKey: '0x4AAAAAAFWmMb0TZLeZY3WO',
};
