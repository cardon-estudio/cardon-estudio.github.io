#!/usr/bin/env python3
"""Control de calidad automático de un vídeo terminado (gratis, solo ffmpeg).
Uso: python3 motor/qc.py salida/x-9x16.mp4  → imprime OK/AVISO por punto y sale con 1 si hay fallos."""
import json, re, subprocess, sys

def run(c): return subprocess.run(c, shell=True, capture_output=True, text=True)

def qc(path):
    fallos, avisos = [], []
    info = json.loads(run(f"ffprobe -v error -show_streams -show_format -of json '{path}'").stdout)
    v = next(s for s in info["streams"] if s["codec_type"] == "video")
    a = [s for s in info["streams"] if s["codec_type"] == "audio"]
    dur = float(info["format"]["duration"])
    if (v["width"], v["height"]) != (1080, 1920): fallos.append(f"resolución {v['width']}x{v['height']}")
    if v["codec_name"] != "h264": fallos.append(f"códec {v['codec_name']}")
    if v["r_frame_rate"] != "30/1": fallos.append(f"fps {v['r_frame_rate']}")
    if not a: fallos.append("sin audio")
    if dur > 60.5: fallos.append(f"dura {dur:.1f} s (máx. 60)")
    # fotogramas negros o en blanco
    e = run(f"ffmpeg -hide_banner -i '{path}' -vf blackdetect=d=0.2:pix_th=0.08 -an -f null - 2>&1").stdout
    for m in re.finditer(r"black_start:([\d.]+) black_end:([\d.]+)", e): fallos.append(f"negro {m[1]}–{m[2]} s")
    # planos estáticos > 2,5 s (retención: algo debe moverse cada 2-4 s)
    e = run(f"ffmpeg -hide_banner -i '{path}' -vf freezedetect=n=0.0008:d=2.5 -an -f null - 2>&1").stdout
    for m in re.finditer(r"freeze_start: ([\d.]+)", e): avisos.append(f"plano casi quieto desde {float(m[1]):.1f} s")
    # sonoridad (objetivo −14 LUFS, pico < −1 dBTP)
    e = run(f"ffmpeg -hide_banner -i '{path}' -vn -af ebur128=peak=true -f null - 2>&1").stdout
    I = re.findall(r"I:\s+(-?[\d.]+) LUFS", e); P = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", e)
    if I and abs(float(I[-1]) + 14) > 1.5: fallos.append(f"sonoridad {I[-1]} LUFS")
    if P and float(P[-1]) > -1: fallos.append(f"pico {P[-1]} dBTP")
    # subtítulos en zona segura: #cap empieza en 1390 px; 2 líneas acaban ~1590 < 1600 (UI de TikTok/Reels)
    print(f"QC {path}: {dur:.1f} s · {v['width']}x{v['height']} · {v['r_frame_rate']} · {I[-1] if I else '?'} LUFS")
    for f in fallos: print("  FALLO ", f)
    for f in avisos: print("  AVISO ", f)
    if not fallos and not avisos: print("  OK todo")
    return not fallos

if __name__ == "__main__": sys.exit(0 if all(qc(p) for p in sys.argv[1:]) else 1)
