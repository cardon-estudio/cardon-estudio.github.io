# Archivo Enigma · estado del trabajo (actualizado 25/11/2026)

Canal en español de vídeos animados 2D (historia, misterio, acertijos, curiosidades, noticias). Lema: «Lo que la historia no te contó.» El prompt completo y vigente está en `prompt-canal.md`: síguelo siempre. Cómo producir: `LEEME.md`.


## (Resuelto 22/11/2026) Casos reales Van Meegeren y Torre Eiffel: HECHOS con la cuenta nueva de ElevenLabs (plan gratuito, 10.000 créditos/mes; quedan ~5.650 tras Mona Lisa, Copa y Hans, el 25/11). Se conserva abajo la información por referencia.
La cuenta se quedó con 352 créditos (cada voz de ~60 s gasta unos 820-960). Cuando se renueven o se amplíe el plan, generar estas voces (guiones abajo) y montar con `hacer_video.py`. Las escenas YA están hechas.
El dueño pidió **acertijos basados en casos reales** (con la respuesta real al final). Prioridad:
1. **Van Meegeren · El falso Vermeer** → `escenas/vermeer.js`. Guion: «Mil novecientos cuarenta y cinco. Un pintor se enfrenta a una acusación gravísima... y se salva confesando otro delito. ¿Cuál? / Un acertijo real. / Han van Meegeren, pintor holandés, es detenido. Le acusan de vender a los nazis un tesoro nacional: un cuadro de Vermeer. Acabó en la colección de Hermann Göring. / Para la justicia, eso es colaborar con el enemigo. / Pero él responde con una frase que deja a todos helados. / Tienes diez segundos. ¿Qué dijo? / Tiempo. Dijo: "Ese Vermeer... lo pinté yo." / Nadie le creyó. Así que, delante de testigos del tribunal, pintó un "Vermeer" nuevo. / Y aquí viene lo mejor: [whispers] no le había vendido un tesoro a Göring. Le había colado una falsificación. / Esto es lo que hoy sabemos: le condenaron por falsificación, no por colaborar con el enemigo. Y en Holanda le llamaron "el hombre que engañó a Göring". / Caso cerrado. ¿Lo habías adivinado? Cuéntamelo en comentarios. Síguenos para el próximo expediente.» Fuentes: Britannica, Wikipedia (Han van Meegeren). Anclas previstas (11 escenas): gancho, título, detención, caja Göring, tribunal, pregunta, [cuenta atrás tras «¿Qué dijo?»], pinta delante de testigos, falsificación, periódico, cierre.
2. **Victor Lustig · La Torre Eiffel** → `escenas/eiffel.js`. Guion: «Un hombre vendió la Torre Eiffel... dos veces. Y el primer comprador ni siquiera lo denunció. ¿Por qué? / Un acertijo real. / París, mil novecientos veinticinco. La torre está oxidada y mantenerla cuesta una fortuna. / Victor Lustig se hace pasar por funcionario del Gobierno. Reúne en secreto a varios chatarreros: "El Estado va a desmontar la torre. Es confidencial." / André Poisson paga... y Lustig desaparece con el dinero. / Tienes diez segundos. ¿Por qué Poisson no fue a la policía? / Tiempo. Fíjate en la palabra clave: confidencial. / Poisson, además, le había pagado un soborno al "funcionario" para quedarse el contrato. Denunciarlo era confesar... y quedar en ridículo. / [whispers] Le dio tanta vergüenza... que calló. / Esto es lo que hoy sabemos: meses después, Lustig lo intentó de nuevo con otros chatarreros. Esta vez sí le denunciaron... y escapó. / Caso cerrado. ¿Tú habrías picado? Cuéntamelo en comentarios. Síguenos para el próximo expediente.» Fuentes: Smithsonian, Mental Floss, Ripley's. 12 escenas (ver `build()`).
3. En reserva (ficción con dato real, ya verificados): «La Cruz del Sur» (no se ve desde Madrid, sí desde Canarias) y «El huevo que gira» (el crudo vuelve a girar tras frenarlo).
Recordar: los guiones de casos reales salen de ~65 s; usar `quitar` y `velocidad` para quedar en 60 s.

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
| ¿Quién miente? · Los girasoles (los adultos miran al este: la foto es del amanecer) | Serie «¿Quién miente?» cap. 1, Natural | Hecho con `hacer_video.py` (22/11). Escenas: `escenas/girasoles.js`. |
| ¿Quién miente? · El trueno (3 s por km: a 3 km el trueno llega 9 s tarde) | Serie «¿Quién miente?» cap. 2, Natural | Hecho (22/11). Publicar el martes 24/11. Escenas: `escenas/trueno.js`. |
| Caso real · El falso Vermeer (Van Meegeren, 1945) | «Un acertijo real», Natural | Hecho (22/11). `escenas/vermeer.js`, `proyectos/vermeer.json`. |
| Caso real · La Torre Eiffel vendida dos veces (Lustig, 1925) | «Un acertijo real», Natural | Hecho (22/11). `escenas/eiffel.js`, `proyectos/eiffel.json`. |
| Caso real · El robo de la Mona Lisa (Peruggia, 1911) | «Un acertijo real», Natural | Hecho (25/11) con boceto previo. `escenas/mona.js`. |
| Caso real · La Copa del Mundo y el perro Pickles (1966) | «Un acertijo real», Natural | Hecho (25/11) con boceto previo. `escenas/copa.js`. |
| Caso real · Hans el Listo, el caballo que «sumaba» (1904) | «Un acertijo real», Natural | Hecho (25/11) con boceto previo. `escenas/hans.js`. |
| Hans el Listo **rehecho con motor 2** | Igual | Hecho (25/11): `guiones/hans.json`, `proyectos/hans2.json` → `salida/hans2-9x16.mp4`. Pasa el QC. Comparativa: `trabajo/cmp/comparativa.jpg`. |
| Caso real · La fuga de Alcatraz (1962) | «Un acertijo real», motor 2 | Hecho (25/11): `guiones/alcatraz.json`, `proyectos/alcatraz.json`. Pasa el QC. |
| Caso real · Operación Mincemeat (1943) | «Un acertijo real», motor 2 | Hecho (25/11): `guiones/mincemeat.json`, `proyectos/mincemeat.json`. Pasa el QC. |

## Pendiente (en este orden)
0b. **Tres vídeos listos para poner voz** (guion gráfico y boceto revisados): `turco` (El Turco, 1770: 813 caracteres), `hadas` (Cottingley, 1917: 749) y `niza` (robo de Niza, 1976: 798). Solo falta la voz: los créditos de ElevenLabs se acabaron el 25/11 (quedaban ~387) y se renuevan el 22/12/2026, o el dueño conecta otra cuenta. Tras la voz: `--solo-prueba`, ajustar `frases` a los tramos que imprime (unir/separar), y render.
0. Todo vídeo nuevo se hace con **motor 2** (ver LEEME.md). Mejoras posibles: más escenarios y animales en la biblioteca; el primer plano del caballo es algo tosco.
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

## Análisis del nicho (22/11/2026) · lo que funciona
- Referentes 2D (suscriptores aprox., trackers públicos): Bright Side 44,5 M (acertijos y datos; su versión en español GENIAL 32 M), Kurzgesagt 25,7 M (ciencia), Infographics Show 15,5–16 M (historias y «qué pasaría si»), OverSimplified 9,6 M (historia con humor), TED-Ed Riddles (acertijo más visto: el de los sombreros de los prisioneros). En español: CuriosaMente 4,6 M, La Cuna de Halicarnaso ~500 k, Memorias de Pez ~478 k. Zack D. Films (29 M) hace datos en Shorts, pero no es 2D.
- Hueco: en español casi no hay canales 2D de misterio + acertijos con cierre claro; GENIAL tira de «clickbait» y hay espacio para algo más cuidado y verificado.
- Funciona: los ángulos de «misterio sin resolver» (más clics que la historia contada sin más), los acertijos de lógica con detective y una sola solución, las series con formato fijo reconocible y el humor ligero (OverSimplified).
- Evitar: acertijos que ya circulan, cifras sin fuente (lo que critican a Bright Side) y vídeos sin cierre.
- Idea elegida: serie fija «¿Quién miente?» (detective + dato real), siguiendo la del testigo y la luna llena.

## Cuenta de ElevenLabs
- Desde el 22/11/2026 se usa otra cuenta (plan gratuito). En el plan gratuito, ElevenLabs no permite uso comercial y pide atribución: si el canal empieza a monetizar, pasar a un plan de pago.

## Ideas de casos reales en reserva (sin verificar a fondo aún)
- Las hadas de Cottingley (1917): fotos de hadas que engañaron a Conan Doyle; recortes de papel con alfileres, confesado en 1983.
- Operación Mincemeat (1943): un cadáver con documentos falsos engañó a los nazis sobre la invasión de Sicilia.
- La fuga de Alcatraz (1962): cabezas de papel maché en las camas.
- El robo del banco de Niza (1976, Spaggiari): túnel y nota en la pared.
