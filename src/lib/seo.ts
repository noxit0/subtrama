// Ayudas de SEO: datos estructurados (JSON-LD) y recorte de descripciones.
import { sitio } from '../data/sitio';

type Json = Record<string, unknown>;

// Zona de trabajo: Olavarría y la región (centro de la provincia de Buenos Aires).
const AREA = [
  { '@type': 'City', name: 'Olavarría' },
  { '@type': 'AdministrativeArea', name: 'Centro de la provincia de Buenos Aires' },
];

/** Recorta un texto a `max` caracteres en un límite de palabra, para las meta descriptions. */
export function recortar(texto: string, max = 160): string {
  const limpio = texto.replace(/\s+/g, ' ').trim();
  if (limpio.length <= max) return limpio;
  const corte = limpio.slice(0, max - 1);
  const ultimoEspacio = corte.lastIndexOf(' ');
  return `${corte.slice(0, ultimoEspacio > 0 ? ultimoEspacio : corte.length).replace(/[,;:.\s]+$/, '')}…`;
}

/** Organización y sitio: se incluyen en todas las páginas. */
export function datosBase(site: URL): Json[] {
  const origen = site.origin;
  const perfiles = [sitio.instagram].filter(Boolean);
  return [
    {
      '@type': 'ProfessionalService',
      '@id': `${origen}/#organizacion`,
      name: 'Subtrama',
      description:
        'Espacio de marketing digital. Ordenamos, publicamos y medimos el contenido en redes de marcas con oficio e historia.',
      url: `${origen}/`,
      logo: `${origen}/logos/subtrama-horizontal-positivo.png`,
      image: `${origen}/og.png`,
      email: sitio.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Olavarría',
        addressRegion: 'Buenos Aires',
        addressCountry: 'AR',
      },
      areaServed: AREA,
      ...(perfiles.length ? { sameAs: perfiles } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${origen}/#sitio`,
      url: `${origen}/`,
      name: 'Subtrama',
      inLanguage: 'es-AR',
      publisher: { '@id': `${origen}/#organizacion` },
    },
  ];
}

/** Migas de pan. `ruta` va sin el origen, por ejemplo '/servicios/'. */
export function migas(site: URL, items: { nombre: string; ruta: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nombre,
      item: new URL(it.ruta, site).href,
    })),
  };
}

/** Servicio ofrecido por Subtrama. */
export function servicioLd(site: URL, d: { nombre: string; descripcion: string; ruta: string; tipo?: string }): Json {
  return {
    '@type': 'Service',
    name: d.nombre,
    description: d.descripcion,
    url: new URL(d.ruta, site).href,
    ...(d.tipo ? { serviceType: d.tipo } : {}),
    provider: { '@id': `${site.origin}/#organizacion` },
    audience: { '@type': 'Audience', audienceType: 'Comercios, talleres, industrias, pymes y profesionales' },
    areaServed: AREA,
  };
}
