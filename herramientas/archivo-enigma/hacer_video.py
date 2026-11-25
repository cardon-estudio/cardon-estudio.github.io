#!/usr/bin/env python3
"""Archivo Enigma · monta un vídeo vertical completo con un solo comando.

Uso:  python3 hacer_video.py proyectos/<nombre>.json [--solo-prueba]

El JSON indica la voz (MP3 local o URL), las frases en orden, qué frase abre cada
escena, dónde va la cuenta atrás y qué archivo de escenas usar. El script:
  1. limpia y acelera la voz y detecta cada frase por los silencios,
  2. rehace la pista con huecos fijos de 0,22 s (y 10 s de cuenta atrás si toca),
  3. escribe los tiempos en la página HTML de escenas,
  4. sintetiza música y efectos, mezcla y masteriza a −14 LUFS (mono duplicado),
  5. saca una hoja de prueba con 8 fotogramas y, si no es --solo-prueba,
     renderiza a 30 fps y codifica el MP4 en salida/.
"""
import json, math, os, re, subprocess, sys, urllib.request

AQUI = os.path.dirname(os.path.abspath(__file__))
SR = 48000
GAP = 0.22          # silencio entre frases
CUENTA = 10.0       # segundos de cuenta atrás
INICIO = 0.5        # gancho sonoro antes de la voz
COLA = 0.35


def sh(cmd, capture=False):
    r = subprocess.run(cmd, shell=True, text=True, capture_output=True)
    if r.returncode != 0:
        sys.exit(f"Error en: {cmd[:120]}\n{r.stderr[-800:]}")
    return r.stdout + r.stderr if capture else None


def duracion(f):
    return float(sh(f"ffprobe -v error -show_entries format=duration -of csv=p=0 '{f}'", True).strip())


def segmentos(wav, d):
    out = sh(f"ffmpeg -hide_banner -nostats -i '{wav}' -af silencedetect=n=-38dB:d={d} -f null -", True)
    ss = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", out)]
    se = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", out)]
    total = duracion(wav)
    segs, cur = [], 0.0
    for a, b in zip(ss, se + [total]):
        if a - cur > 0.12:
            segs.append([cur, a])
        cur = b
    if total - cur > 0.12:
        segs.append([cur, total])
    return segs


def hoja(page, tmp, T, ts=None):
    """Hoja de prueba: por defecto 8 fotogramas repartidos; en boceto, uno por escena."""
    ts = ts or [round(T * k / 9, 2) for k in range(1, 9)]
    prev = os.path.join(tmp, "prueba"); os.makedirs(prev, exist_ok=True)
    sh(f"node '{AQUI}/motor/shot.js' '{page}' '{prev}' " + " ".join(map(str, ts)))
    ins = " ".join(f"-i '{prev}/t{x}.jpg'" for x in ts)
    sh(f"ffmpeg -hide_banner -loglevel error -y {ins} -filter_complex \"hstack={len(ts)},scale={min(2600, 260*len(ts))}:-1\" '{tmp}/hoja.jpg'")
    print(f"Hoja de prueba: {tmp}/hoja.jpg")


def main():
    cfg_path = sys.argv[1]
    prueba = "--solo-prueba" in sys.argv
    cfg = json.load(open(cfg_path))
    nombre = cfg["nombre"]
    tmp = os.path.join(AQUI, "trabajo", nombre)
    os.makedirs(tmp, exist_ok=True)
    os.makedirs(os.path.join(AQUI, "salida"), exist_ok=True)

    # 1 · voz (o, en modo --boceto, tiempos estimados SIN gastar créditos)
    boceto = "--boceto" in sys.argv
    if boceto:
        prueba = True
    vel = cfg.get("velocidad", 1.10)
    vf = os.path.join(tmp, "vf.wav")
    frases = cfg["frases"]
    segs = None
    if boceto:
        segs, t0 = [], 0.0
        for f in frases:          # ~2,9 palabras/s de Mateo, más la aceleración
            dur = max(0.4, len(re.sub(r"[*|\d]", "", f).split()) / (2.9 * vel))
            segs.append([t0, t0 + dur]); t0 += dur + 0.35
        sh(f"ffmpeg -hide_banner -loglevel error -y -f lavfi -i anullsrc=r={SR}:cl=mono -t {t0:.2f} '{vf}'")
    else:
        mp3 = os.path.join(tmp, "voz.mp3")
        src = cfg["voz"]
        if src.startswith("http"):
            if not os.path.exists(mp3):
                urllib.request.urlretrieve(src, mp3)
        else:
            sh(f"cp '{src}' '{mp3}'")
        sh(f"ffmpeg -hide_banner -loglevel error -y -i '{mp3}' -af atempo={vel} -ar {SR} -ac 1 '{vf}'")

    for d in ((0.15, 0.12, 0.18, 0.1, 0.22, 0.25, 0.08, 0.3) if not boceto else ()):
        s = segmentos(vf, d)
        if len(s) == len(frases):
            segs = s
            break
    if segs is None:
        s = segmentos(vf, 0.15)
        print(f"No cuadra: {len(s)} tramos de voz y {len(frases)} frases. Tramos detectados:")
        for i, (a, b) in enumerate(s):
            print(f"  {i:2d}  {a:6.2f}-{b:6.2f}  ({b-a:.2f} s)")
        sys.exit("Ajusta 'frases' (une o separa) para que coincidan con los tramos.")

    # 2 · pista limpia con huecos fijos (y cuenta atrás)
    GAPC = cfg.get("pausa", GAP)
    quitar = set(cfg.get("quitar", []))
    cd_tras = cfg.get("cuenta_atras_tras")      # índice de frase o null
    partes, t, tiempos = [], INICIO, {}
    filt, n = [], 0
    cd = None
    for i, (a, b) in enumerate(segs):
        if i in quitar:
            continue
        a0, b0 = max(0, a - 0.04), b + 0.04
        filt.append(f"[0]atrim={a0:.3f}:{b0:.3f},asetpts=PTS-STARTPTS[s{n}]")
        partes.append(f"[s{n}]"); n += 1
        tiempos[i] = (t, t + (b0 - a0))
        t += b0 - a0
        pausa = GAPC
        if cd_tras is not None and i == cd_tras:
            cd = (t + 0.15, t + 0.15 + CUENTA)
            pausa = CUENTA + 0.3
        filt.append(f"anullsrc=r={SR}:cl=mono,atrim=0:{pausa:.3f}[g{n}]")
        partes.append(f"[g{n}]")
        t += pausa
    T = round(t - GAPC + COLA, 2)
    voz = os.path.join(tmp, "voz_full.wav")
    fc = ";".join(filt) + ";" + "".join(partes) + f"concat=n={len(partes)}:v=0:a=1,adelay={int(INICIO*1000)}:all=1[o]"
    sh(f"ffmpeg -hide_banner -loglevel error -y -i '{vf}' -filter_complex \"{fc}\" -map \"[o]\" '{voz}'")
    # adelay ya mete el gancho: los tiempos se calcularon desde INICIO
    if T > 60.5:
        print(f"Aviso: el vídeo dura {T:.1f} s. Sube 'velocidad' o añade frases a 'quitar'.")

    # 3 · tiempos a la página
    anclas = cfg["anclas"]
    ph = [[round(tiempos[i][0], 3), round(tiempos[i][0] + 1, 3), ""] for i in anclas]
    cap = [[round(tiempos[i][0], 3), round(tiempos[i][1], 3), f] for i, f in enumerate(frases) if i in tiempos]
    cdj = [round(cd[0], 3), round(cd[1], 3)] if cd else [9999, 9999]
    js = (f"window.PH_OVERRIDE={json.dumps(ph)};window.CAPPH={json.dumps(cap, ensure_ascii=False)};"
          f"window.CD_OVERRIDE={json.dumps(cdj)};window.T_OVERRIDE={T};")
    head = open(os.path.join(AQUI, "motor/head.html")).read()
    head = head.replace("<script>\n/* ===== Paleta", "<script>" + js + "\n</script>\n<script>\n/* ===== Paleta", 1)
    if cfg.get("guion"):   # motor 2: guion gráfico declarativo + bibliotecas reutilizables
        lib = lambda n: open(os.path.join(AQUI, "motor2/lib", n)).read()
        story = open(os.path.join(AQUI, cfg["guion"])).read()
        head = head.replace("</style>", "#cap span.k{color:#FFD23F}#cap span.on{color:#FFD23F;text-shadow:0 0 18px rgba(255,210,63,.45)}</style>", 1)
        html = head + open(os.path.join(AQUI, "motor/comun.js")).read() + f"\nconst CASE_LABEL={json.dumps(cfg.get('rotulo', ''), ensure_ascii=False)};\nwindow.STORY={story};\n" + \
            "".join(lib(n) for n in ("personajes.js", "animales.js", "escenarios.js", "objetos.js", "director.js")) + lib("tail2.js")
    else:
        html = head + open(os.path.join(AQUI, "motor/comun.js")).read() + \
            open(os.path.join(AQUI, cfg["escenas"])).read() + open(os.path.join(AQUI, "motor/tail.js")).read()
    page = os.path.join(tmp, "video.html")
    open(page, "w").write(html)

    if boceto:
        ini = [p[0] for p in ph] + ([cd[0]] if cd else []) + [T]
        ini = sorted(ini)
        hoja(page, tmp, T, [round((a + b) / 2, 2) for a, b in zip(ini, ini[1:])])
        print(f"Boceto sin voz ({T:.1f} s estimados). Revisa la hoja antes de gastar créditos.")
        return

    # 4 · música, efectos y master
    sfx = {"duration": T, "hits": [tiempos[i][0] for i in cfg.get("golpes", []) if i in tiempos],
           "whooshes": [p[0] for p in ph[1:]] + ([cd[0]] if cd else [])}
    sfx["eventos"] = [[round(tiempos[i][0] + off, 3), tipo] for i, tipo, off in cfg.get("sonidos", []) if i in tiempos]
    if cd:
        sfx["cdticks"] = [cd[0] + k for k in range(int(CUENTA))]
        sfx["bell"] = cd[1]
    json.dump(sfx, open(os.path.join(tmp, "sfx.json"), "w"))
    sh(f"cd '{tmp}' && python3 '{AQUI}/motor/sfx.py' sfx.json bed.wav fx.wav")
    sh(f"cd '{tmp}' && ffmpeg -hide_banner -loglevel error -y -i voz_full.wav -af \"highpass=f=90:poles=2,equalizer=f=160:t=q:w=1:g=-2,"
       f"equalizer=f=250:t=q:w=1.2:g=-2.5,equalizer=f=3000:t=q:w=1:g=3,deesser=i=0.5:m=0.5:f=0.5,"
       f"acompressor=threshold=-20dB:ratio=3:attack=8:release=180:makeup=2,dynaudnorm=f=250:g=15:p=0.9:m=8,apad=whole_dur={T}\" -ar {SR} -ac 1 vp.wav")
    sh(f"cd '{tmp}' && ffmpeg -hide_banner -loglevel error -y -i vp.wav -i bed.wav -i fx.wav -filter_complex \"[0]asplit=2[v][vsc];[1]volume=0.6[b];"
       f"[b][vsc]sidechaincompress=threshold=0.02:ratio=5:attack=60:release=450:makeup=1[bd];[2]volume=0.75[f];[v][bd][f]amix=inputs=3:normalize=0,atrim=0:{T}[m]\" -map \"[m]\" -ac 1 mix.wav")
    sh(f"cd '{tmp}' && ffmpeg -hide_banner -loglevel error -y -i mix.wav -af \"volume=1.6dB,alimiter=limit=0.6:attack=4:release=80:level=disabled\" -ar {SR} lim.wav")
    j = sh(f"cd '{tmp}' && ffmpeg -hide_banner -i lim.wav -af loudnorm=I=-17:TP=-4.5:LRA=4:print_format=json -f null -", True)
    m = json.loads(j[j.rindex("{"):j.rindex("}") + 1])
    sh(f"cd '{tmp}' && ffmpeg -hide_banner -loglevel error -y -i lim.wav -af \"loudnorm=I=-17:TP=-4.5:LRA=4:linear=true:measured_I={m['input_i']}:"
       f"measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}\" -ar {SR} pre.wav")
    r = sh(f"cd '{tmp}' && ffmpeg -hide_banner -nostats -i pre.wav -af \"pan=stereo|c0=c0|c1=c0,ebur128\" -f null -", True)
    li = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", r)[-1])
    sh(f"cd '{tmp}' && ffmpeg -hide_banner -loglevel error -y -i pre.wav -af \"volume={-14 - li:.2f}dB,pan=stereo|c0=c0|c1=c0\" -c:a pcm_s16le audio.wav")
    r = sh(f"cd '{tmp}' && ffmpeg -hide_banner -nostats -i audio.wav -af ebur128=peak=true -f null -", True)
    fin = r[r.rindex("Summary"):]
    resumen = " · ".join(x.strip() for x in fin.splitlines() if re.search(r"I:|LRA:|Peak:", x))
    print(f"Audio: {resumen} · duración {T:.1f} s")

    # 5 · hoja de prueba y render
    hoja(page, tmp, T)
    if prueba:
        return
    frames = os.path.join(tmp, "frames"); os.makedirs(frames, exist_ok=True)
    sh(f"node '{AQUI}/motor/render.js' '{page}' '{frames}' 30 {T} 4")
    out = os.path.join(AQUI, "salida", f"{nombre}-9x16.mp4")
    sh(f"ffmpeg -hide_banner -loglevel error -y -framerate 30 -i '{frames}/f%05d.jpg' -i '{tmp}/audio.wav' -c:v libx264 -preset slow -crf 18 "
       f"-pix_fmt yuv420p -profile:v high -c:a aac -b:a 192k -ar {SR} -movflags +faststart -shortest '{out}'")
    sh(f"rm -rf '{frames}'")
    print(f"Vídeo: {out}")
    subprocess.run([sys.executable, os.path.join(AQUI, "motor/qc.py"), out])


if __name__ == "__main__":
    main()
