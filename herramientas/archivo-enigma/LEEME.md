# Archivo Enigma · fábrica de vídeos (ahorro de tokens)

Instrucciones para Claude. Sigue este orden y no repitas a mano lo que ya hace el script.

## Por vídeo
1. Pregunta tipo y paleta (como dice el prompt del canal) y propón 2–3 temas **originales**, comprobados con una búsqueda cada uno.
2. Escribe el guion (90–110 palabras; acertijo hasta ~120 porque lleva 10 s de cuenta atrás).
3. Genera la voz: ElevenLabs, voz `gpMzl7dbkfC9dIxAqQZT`, `eleven_v4`, `generations_count: 1`. Guarda la URL del MP3.
4. Copia `escenas/luna.js` (o `ferry.js`) como `escenas/<nombre>.js` y cambia **solo** lo propio del tema: `CASE_LABEL`, personajes, decorados, escenas, `SC` y `STRIPS` dentro de `build()`. Lo común (papel, cuenta atrás, polaroids, logo, subtítulos, cámara, transiciones) ya está en `motor/`.
5. Crea `proyectos/<nombre>.json` (mira `proyectos/luna.json`):
   - `frases`: el guion partido en las frases que la voz dice separadas por pausas; la palabra clave lleva `*` delante.
   - `anclas`: índice de la frase que abre cada escena (en el mismo orden que `SC`).
   - `cuenta_atras_tras`: índice de la frase «Piensa.» (o `null` si no es acertijo).
   - `quitar`: frases a recortar si pasa de 60 s. `golpes`: frases con golpe sonoro.
6. `python3 hacer_video.py proyectos/<nombre>.json --solo-prueba` → mira **solo** `trabajo/<nombre>/hoja.jpg`.
   Si dice «No cuadra», une o separa frases según la lista de tramos que imprime.
7. Si la hoja está bien: `python3 hacer_video.py proyectos/<nombre>.json` → `salida/<nombre>-9x16.mp4`.
8. Miniatura (1280×720, sin destripar la solución) y textos de publicación.

## Variedad (decisión del dueño, 22/11/2026)
- **Ningún vídeo repite escenas.** Cada capítulo diseña desde cero, ambientado en su tema: el título, la pregunta, la cuenta atrás (las pistas), el primer plano o la pista de la inspectora y el final. Ejemplo: `escenas/trueno.js` (cristal empañado, libreta, parte del seguro, notas adhesivas, sello «RECHAZADO»). Prohibido reutilizar la mesa de madera con polaroids o el papel «UN ACERTIJO AL DÍA» de otros capítulos.
- Lo único fijo: la tira de arriba, el logo, los subtítulos, el círculo de la cuenta atrás y la voz.

## Reglas para gastar poco
- Una sola hoja de prueba antes del render; nada de capturas sueltas.
- No leer archivos enteros del motor: solo el de escenas que se edita.
- No volver a renderizar por detalles mínimos salvo que el dueño lo pida.
- Sin «CASO Nº» en vídeos ni miniaturas (decisión del dueño, 22/11/2026).
- Vídeos ≤ 60 s: si pasa, sube `velocidad` (máx. ~1,15) o usa `quitar`.
