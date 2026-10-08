// Contenido de los servicios. Texto en borrador: revisar antes de publicar.
export interface Servicio {
  slug: string;
  titulo: string;
  etiqueta: string;
  resumen: string;
  intro: string;
  incluye: { lead: string; text: string }[];
  entrega: string;
}

export const servicios: Servicio[] = [
  {
    slug: 'analisis-situacional',
    titulo: 'Análisis situacional',
    etiqueta: 'Análisis',
    resumen: 'Un diagnóstico de tu marca con datos, antes de publicar.',
    intro:
      'Antes de proponer nada, miro dónde está tu marca hoy: qué comunica, a quién le habla y qué respuesta recibe. El análisis nombra el problema con datos y no con supuestos.',
    incluye: [
      { lead: 'Perfil y audiencia.', text: 'Qué ve quien llega a tu cuenta y quién llega realmente.' },
      { lead: 'Contenido existente.', text: 'Qué funcionó, qué no y por qué.' },
      { lead: 'Punto de partida.', text: 'Las métricas base contra las que se mide todo lo que sigue.' },
      { lead: 'Recomendaciones.', text: 'Cada una con su porqué; la decisión es tuya.' },
    ],
    entrega: 'Un diagnóstico escrito con sus recomendaciones, para revisar juntos.',
  },
  {
    slug: 'reestructuracion-de-contenido',
    titulo: 'Reestructuración de contenido',
    etiqueta: 'Estructura',
    resumen: 'Ordenar lo que ya publicás para que cuente una sola historia.',
    intro:
      'Muchas marcas ya tienen material y presencia, pero dispersos. Reordeno lo existente en pilares de contenido claros y en un perfil que resuelva por sí mismo las dudas de quien llega.',
    incluye: [
      { lead: 'Pilares de contenido.', text: 'Los temas que sostienen tu comunicación y la duda que resuelve cada uno.' },
      { lead: 'Perfil.', text: 'Biografía, destacados y llamados a la acción con un criterio común.' },
      { lead: 'Material existente.', text: 'Qué se conserva, qué se adapta y qué se deja de publicar.' },
      { lead: 'Tono y estética.', text: 'Criterios para que todo se reconozca como tuyo.' },
    ],
    entrega: 'Un esquema de contenido y de perfil listo para ejecutar.',
  },
  {
    slug: 'creacion-de-contenido',
    titulo: 'Creación de contenido',
    etiqueta: 'Creación',
    resumen: 'Ideas, guiones y textos pensados para tus pilares.',
    intro:
      'Cada pieza responde a un objetivo y a una duda concreta de quien te sigue. Parto de tu material y de tu forma de trabajar para que el contenido suene a vos.',
    incluye: [
      { lead: 'Ideas y ángulos.', text: 'Qué contar y desde dónde, según cada pilar.' },
      { lead: 'Guiones.', text: 'Estructura para reels y videos, antes de grabar.' },
      { lead: 'Textos.', text: 'Copies y descripciones en el tono de tu marca.' },
      { lead: 'Dirección visual.', text: 'Indicaciones para que el material llegue listo para editar.' },
    ],
    entrega: 'Piezas planificadas y redactadas, listas para pasar a edición.',
  },
  {
    slug: 'edicion',
    titulo: 'Edición',
    etiqueta: 'Edición',
    resumen: 'Video, sonido y diseño con la identidad de tu marca.',
    intro:
      'Con el material en bruto armo la pieza final: ritmo, sonido y diseño al servicio de lo que la marca quiere decir.',
    incluye: [
      { lead: 'Video y reels.', text: 'Montaje, ritmo y sonido.' },
      { lead: 'Carruseles y piezas gráficas.', text: 'Diseño alineado con tu identidad visual.' },
      { lead: 'Revisión.', text: 'Ajustes antes de que algo se publique.' },
    ],
    entrega: 'Piezas finales en los formatos que pide cada red.',
  },
  {
    slug: 'programacion-mensual',
    titulo: 'Programación mensual',
    etiqueta: 'Calendario',
    resumen: 'Un calendario anticipado que aprobás antes de publicar.',
    intro:
      'Organizo el mes con anticipación: qué se publica, cuándo y en qué formato. Vos lo revisás y lo aprobás antes de que salga.',
    incluye: [
      { lead: 'Calendario del mes.', text: 'Fechas, formatos y pilares distribuidos.' },
      { lead: 'Mezcla de formatos.', text: 'Reels, carruseles y fotos según lo que cada pieza necesita.' },
      { lead: 'Aprobación.', text: 'Nada se publica sin tu visto bueno.' },
    ],
    entrega: 'Un calendario mensual claro, aprobado antes de la primera publicación.',
  },
  {
    slug: 'publicacion-de-contenido',
    titulo: 'Publicación de contenido',
    etiqueta: 'Publicación',
    resumen: 'Constancia en las fechas acordadas.',
    intro:
      'Publico lo aprobado en las fechas del calendario. Sostener el canal activo semana a semana da presencia y credibilidad.',
    incluye: [
      { lead: 'Publicación.', text: 'En las fechas y los horarios acordados.' },
      { lead: 'Textos y etiquetas.', text: 'Cada pieza sale con su descripción final.' },
      { lead: 'Constancia.', text: 'Un canal que no se interrumpe.' },
    ],
    entrega: 'Contenido publicado según el calendario aprobado.',
  },
  {
    slug: 'informes-bimestrales',
    titulo: 'Informes bimestrales',
    etiqueta: 'Informes',
    resumen: 'Qué pasó con tu contenido y qué hacemos con eso.',
    intro:
      'Cada dos meses reviso los números con vos. No me interesa mostrar todo: me interesa mostrar lo que ordena qué producir después.',
    incluye: [
      { lead: 'Indicadores que importan.', text: 'Guardados y compartidos sobre alcance, alcance a no seguidores y visitas al perfil.' },
      { lead: 'Constancia.', text: 'Cuántas semanas se publicó sin faltar.' },
      { lead: 'Lectura.', text: 'Qué funcionó, qué no y por qué.' },
      { lead: 'Ajustes.', text: 'Cambios al plan, cada uno con su justificación.' },
    ],
    entrega: 'Un informe cada dos meses y una reunión para repasarlo.',
  },
];
