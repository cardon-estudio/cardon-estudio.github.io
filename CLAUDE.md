# Cardón Estudio — web y plantillas

Web de la agencia Cardón Estudio (diseño web para negocios locales de Canarias) y 6 modelos de ejemplo por sector para el portfolio.

## Estructura
- `index.html` + `assets/cardon.css` — web de Cardón Estudio (menú móvil, preguntas frecuentes, animaciones al hacer scroll que respetan "reducir movimiento"). La sección "Modelos" enlaza a las plantillas.
- `assets/favicon.svg` — icono de la pestaña.
- `plantillas/` — barberia, cafeteria, estetica, taller, fisio y tienda-cintas (tienda online con carrito de ejemplo).
- HTML estático, sin dependencias ni build. Fuentes de Google Fonts. Las plantillas llevan estilos en línea y un poco de JavaScript al final (scroll suave y, en la tienda, el carrito). La web principal usa el CSS de `assets/` con variables de marca: mantenlo así.

## Marca Cardón Estudio
- Paleta: Lava #1E1B18 · Cardón #4A6B4F · Jable #E9DFCC · Almagre #B5532F · Cal #F7F4EE
- Tipografías: Fraunces (titulares) · DM Sans (textos)
- Lema: "Webs que echan raíces." Tono cercano, de tú, sin tecnicismos.

## Reglas de trabajo
- Cada plantilla tiene su propia personalidad (tipografía, color y recurso de firma propios). No igualarlas.
- Los datos que faltan van entre corchetes: [TU PRECIO], [TELÉFONO], [DIRECCIÓN]. No inventar reseñas, testimonios ni cifras.
- Los precios de las plantillas son de ejemplo.
- Diseñar pensando primero en el móvil (390 px). Botones de al menos 44 px. Contraste legible.
- No publicar, subir ni enviar nada a clientes sin la aprobación del dueño.

## Canal Archivo Enigma (vídeos 2D con IA)
- Todo en `herramientas/archivo-enigma/`, aparte de la web: no mezclarlo con ella.
- Si el dueño escribe «sigue» o pide un vídeo: lee `herramientas/archivo-enigma/ESTADO.md` (decisiones, hecho y pendiente), luego `LEEME.md` (cómo producir gastando pocos tokens) y sigue `prompt-canal.md`. Continúa con lo pendiente sin volver a preguntar lo ya decidido.
- Al terminar cada vídeo, actualiza `ESTADO.md` y haz commit.

## Pendiente
- Páginas de Aviso legal y Privacidad (obligatorias en España).
- Pasar las plantillas al mismo sistema de CSS por archivos.
- Precios (19/11/2026, decididos por el dueño): Pack Raíz 50 € + 10 €/mes y Pack Cardón 90 € + 10 €/mes, ambos con 3 meses de mantenimiento incluidos; después mantenimiento opcional a 10 €/mes sin permanencia. Tienda desde 299 € (pendiente de decidir). Sin IGIC; dominio aparte (~12 €/año). Pago 50 % al empezar y 50 % al publicar. Plazos: Web Raíz 24-48 h, Web Cardón 2-3 días (desde que el cliente pasa textos y fotos).
- Contacto: solo Instagram @cardon.estudio. El dueño NO quiere su número de WhatsApp en la web.
- Sustituir las ilustraciones por fotos reales cuando un cliente las aporte.
- Elegir hosting y dominio (cardonestudio.com aparecía libre el 18/11/2026; comprobarlo antes de comprar).
