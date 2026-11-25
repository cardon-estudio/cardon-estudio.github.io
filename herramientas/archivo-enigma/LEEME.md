# Archivo Enigma · fábrica de vídeos (ahorro de tokens)

Instrucciones para Claude. Sigue este orden y no repitas a mano lo que ya hace el script.

## Motor 2 (desde 25/11/2026): usar SIEMPRE para vídeos nuevos
Gratis y local: HTML/SVG animado → Playwright (Chromium) a 30 fps → FFmpeg H.264. Sin GPU en la máquina, así que no se usan modelos de IA locales (ComfyUI, vídeo) ni Blender; Remotion no aporta nada sobre esto; Synfig/OpenToonz son manuales; Manim solo sirve para diagramas. El motor viejo queda en `motor_v1_respaldo/` y `escenas/*.js`.
- **Biblioteca** `motor2/lib/`: `personajes.js` (`humano`: 11 expresiones, parpadeo, mirada, boca que habla, 14 movimientos como andar, señalar, pensar, escribir, aplaudir…; ropa, peinado, barba, sombrero, gafas configurables), `animales.js` (caballo articulado: andar, golpear, asentir, mirar, fallar), `escenarios.js` (calle y patio de Berlín 1900, sala, estudio, laboratorio, negro, cartel; capas con paralaje y desenfoque de profundidad), `objetos.js` (pizarra con tiza, cartel, periódico, flecha, círculo, contador, libreta, sello, pantalla, reloj, público que reacciona; efectos polvo, rayos, niebla, viñeta, cálida, fría, sepia, foco), `director.js` (lee el guion gráfico) y `tail2.js` (transiciones fundido/corte/barrido/zoom, grano, subtítulos karaoke).
- **Guion gráfico** `guiones/<nombre>.json` (modelo: `guiones/hans.json`): `personajes` + `escenas` con `tira`, `escenario`, `entrada`, `camara` [[k,x,y,zoom]] o `plano` {tipo primer_plano/medio/detalle, de}, `actores` (quien, x, escala, mira, ruta, acts [[k,mov]], cara [[k,expr]]), `objetos`, `efectos`, `sacudida`. Tiempos `k` en fracción de escena (0–1). Escenario nuevo o personaje nuevo → añadirlo a la biblioteca, no al guion.
- **Proyecto** `proyectos/<nombre>.json` lleva además `guion`, `rotulo` y `sonidos` [[frase, tipo, retraso]] (tipos: cascosxN, aplauso, pasos, tiza, murmullo, papel, campana).
- Al final del render se ejecuta solo `motor/qc.py` (resolución, 30 fps, H.264, ≤60 s, sin negros, sin planos quietos >2,5 s, −14 LUFS). Si dice FALLO o AVISO, corregir antes de entregar.
- Render: ~5 min por minuto de vídeo (4 núcleos). Para revisar sin esperar, `--boceto` o `--solo-prueba`.

## Por vídeo
1. Pregunta tipo y paleta (como dice el prompt del canal) y propón 2–3 temas **originales**, comprobados con una búsqueda cada uno.
2. Escribe el guion (90–110 palabras; acertijo hasta ~120 porque lleva 10 s de cuenta atrás).
3. **Antes de gastar créditos** (decisión del dueño): crea escenas y proyecto con la voz vacía y lanza `python3 hacer_video.py proyectos/<nombre>.json --boceto`. Saca una hoja con un fotograma por escena y tiempos estimados, sin voz. Comprueba la lista de abajo. Solo si todo cumple, genera la voz.
   Genera la voz: ElevenLabs, voz `gpMzl7dbkfC9dIxAqQZT`, `eleven_v4`, `generations_count: 1`. Guarda la URL del MP3.
4. (Motor 2) Escribe `guiones/<nombre>.json` copiando la estructura de `guiones/hans.json`. *(Motor viejo: copiar `escenas/luna.js` y cambiar solo lo propio del tema: `CASE_LABEL`, personajes, decorados, escenas, `SC` y `STRIPS` dentro de `build()`. Lo común (papel, cuenta atrás, polaroids, logo, subtítulos, cámara, transiciones) ya está en `motor/`.)
5. Crea `proyectos/<nombre>.json` (mira `proyectos/luna.json`):
   - `frases`: el guion partido en las frases que la voz dice separadas por pausas; la palabra clave lleva `*` delante.
   - `anclas`: índice de la frase que abre cada escena (en el mismo orden que `SC`).
   - `cuenta_atras_tras`: índice de la frase «Piensa.» (o `null` si no es acertijo).
   - `quitar`: frases a recortar si pasa de 60 s. `golpes`: frases con golpe sonoro.
6. `python3 hacer_video.py proyectos/<nombre>.json --solo-prueba` → mira **solo** `trabajo/<nombre>/hoja.jpg`.
   Si dice «No cuadra», une o separa frases según la lista de tramos que imprime.
7. Si la hoja está bien: `python3 hacer_video.py proyectos/<nombre>.json` → `salida/<nombre>-9x16.mp4`.
8. Miniatura (1280×720, sin destripar la solución) y textos de publicación.

## Comprobación antes de generar la voz (obligatoria)
- [ ] Ninguna escena se parece a las de otro capítulo (compara con `escenas/*.js`: título, pregunta, cuenta atrás, pista y final propios).
- [ ] Tema original o caso real verificado con 2 fuentes; respuesta clara y cerrada («Esto es lo que hoy sabemos» o solución paso a paso).
- [ ] Sin «CASO Nº»; tira de arriba con título; logo; subtítulos fuera de los 300 px de abajo.
- [ ] Gancho en el primer segundo con promesa abierta; cuenta atrás de 10 s si es acertijo; cierre con «Caso cerrado» y «Síguenos para el próximo expediente».
- [ ] Duración estimada ≤ 60 s (si pasa, acorta el guion ANTES de generar la voz).

## Variedad (decisión del dueño, 22/11/2026)
- **Ningún vídeo repite escenas.** Cada capítulo diseña desde cero, ambientado en su tema: el título, la pregunta, la cuenta atrás (las pistas), el primer plano o la pista de la inspectora y el final. Ejemplo: `escenas/trueno.js` (cristal empañado, libreta, parte del seguro, notas adhesivas, sello «RECHAZADO»). Prohibido reutilizar la mesa de madera con polaroids o el papel «UN ACERTIJO AL DÍA» de otros capítulos.
- Lo único fijo: la tira de arriba, el logo, los subtítulos, el círculo de la cuenta atrás y la voz.

## Reglas para gastar poco
- Una sola hoja de prueba antes del render; nada de capturas sueltas.
- No leer archivos enteros del motor: solo el de escenas que se edita.
- No volver a renderizar por detalles mínimos salvo que el dueño lo pida.
- Sin «CASO Nº» en vídeos ni miniaturas (decisión del dueño, 22/11/2026).
- Vídeos ≤ 60 s: si pasa, sube `velocidad` (máx. ~1,15) o usa `quitar`.
