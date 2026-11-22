# Archivo Enigma · estado del trabajo (actualizado 22/11/2026)

Canal en español de vídeos animados 2D (historia, misterio, acertijos, curiosidades, noticias). Lema: «Lo que la historia no te contó.» El prompt completo y vigente está en `prompt-canal.md`: síguelo siempre. Cómo producir: `LEEME.md`.

## Si el dueño escribe «sigue»
Continúa con el primer punto de «Pendiente» sin volver a preguntar lo ya decidido. Si no queda nada pendiente, empieza un vídeo nuevo preguntando tipo y paleta (prompt, paso 1 y 2).

## Decisiones del dueño (no volver a preguntar)
- Voz SIEMPRE: ElevenLabs «Mateo – News & Digital Stories», voice_id `gpMzl7dbkfC9dIxAqQZT`, modelo `eleven_v4`, 1 toma (`generations_count: 1`).
- **Sin «CASO Nº…»** en vídeos, miniaturas ni títulos. Arriba solo una tira con el título y la barra de progreso. Se mantiene la frase «Caso cerrado» al final.
- **Originalidad obligatoria**: nada de acertijos o temas que ya circulen (el del ascensor lo había visto en otros canales). Inventar y comprobar con una búsqueda antes de proponer. No hace falta que sea de Canarias.
- Quiere acertijos **más interesantes**: con intriga tipo detective o un dato real sorprendente.
- Acertijos en paleta **Natural** (ilustración detallada tipo libro, colores del tema, logo pequeño arriba a la derecha, textos con serifa Playfair Display sobre tira de papel crema).
- Vídeos ≤ 60 s. Gastar los mínimos tokens: usar `hacer_video.py`, una sola hoja de prueba, sin re-renders por detalles.
- Recordar siempre marcar el vídeo como contenido generado con IA.

## Hecho
| Vídeo | Tipo | Estado |
|---|---|---|
| El Paso Diátlov (v1 pegatina y v2 animación mejorada) | Historia/misterio, paleta Viva | Entregado. Reglas antiguas: 60 s y final abierto. |
| El vecino del ascensor | Acertijo, Natural | Entregado, pero **descartado por no ser original**. |
| El ferry que llega antes (Ayamonte → Portugal, una hora menos) | Acertijo original, Natural | Entregado sin «CASO Nº». Escenas: `escenas/ferry.js`. |
| El testigo y la luna llena (a medianoche la luna llena está arriba) | Acertijo original, Natural | Entregado. Escenas: `escenas/luna.js`, proyecto: `proyectos/luna.json`. |

## Pendiente (en este orden)
1. **El baile de Estrasburgo (1518)**: historia/misterio, paleta Discreta, 35–45 s. Guion ya verificado (abajo). Falta generar la voz, crear `escenas/estrasburgo.js` y montar.
2. Opcional: rehacer Diátlov con cierre «Esto es lo que hoy sabemos» (alud de placa, Gaume y Puzrin 2021) y sin «CASO Nº».
3. Opcional: en el vídeo de la luna, la luna tapa a medias el rótulo «MEDIANOCHE: ARRIBA» hacia el segundo 43 (corregido ya en `escenas/luna.js`; solo haría falta re-renderizar si el dueño lo pide).

### Guion verificado de Estrasburgo (fuentes: National Geographic, Britannica, Public Domain Review, History.com)
Imagina que una mujer sale a la calle... y empieza a bailar. Sin música. Y no puede parar.
Estrasburgo, mil quinientos dieciocho. Frau Troffea baila sola... durante días.
Pero eso no es lo raro. En una semana, son decenas. En agosto, hasta cuatrocientas personas.
Y aquí viene lo bueno: los médicos dicen que la cura... es bailar más. La ciudad contrata músicos.
Al final, los llevan a un santuario de San Vito... y el baile se apaga.
Esto es lo que hoy sabemos. Según el historiador John Waller, fue una histeria colectiva. Hambre, enfermedades y miedo a una maldición. [whispers] No era el ritmo... era la mente.
Caso cerrado... o casi. Y si esa mujer saliera a tu calle... ¿te unirías? Síguenos para el próximo expediente.
(No usar: número de muertos —discutido—, zapatos rojos ni la hija: sin confirmar.)

## Ideas de acertijos ya comprobadas (sin publicar como acertijo)
- El corazón del espejo: la hija dibujó un corazón con el dedo antes de irse; la grasa de la piel impide que se empañe ese trozo.
- El reloj del abuelo: el péndulo se acorta con el frío y adelanta en invierno; con el calor se alarga y atrasa.
- Las dos botellas: la de agua de mar no se congela porque la sal baja el punto de congelación.
- El ladrón de calcetines: el gato del muro solo alcanza la punta del tendedero.
- El hombre sin sombra: Mitad del Mundo (Ecuador), mediodía del equinoccio.
- Las islas del ayer y del mañana: Diómedes (Rusia/EE. UU.), 3,8 km y 21 h de diferencia (20 en verano). Ojo: como curiosidad circula bastante.
