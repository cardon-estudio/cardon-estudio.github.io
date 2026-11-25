"""Sintetiza música de misterio y efectos (todo original) para Archivo Enigma."""
import json, sys
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

SR = 48000
cfg = json.load(open(sys.argv[1]))
DUR = cfg["duration"]
N = int(DUR * SR)
t = np.arange(N) / SR
rng = np.random.default_rng(7)

def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], btype="band", fs=SR, output="sos"), x)

def lp(x, f, order=2):
    return sosfilt(butter(order, f, btype="low", fs=SR, output="sos"), x)

def norm(x, peak):
    m = np.max(np.abs(x)) or 1
    return x / m * peak

# ---------- MÚSICA (colchón continuo, nivel estable) ----------
music = np.zeros(N)
# Drone en Re menor con armónicos en medios: D2 A2 D3 F3 A3 + quinta alta
chord = [146.83, 174.61, 220.0, 293.66, 349.23, 440.0, 587.33]
for i, f in enumerate(chord):
    lfo = 1 + 0.004 * np.sin(2 * np.pi * (0.07 + 0.013 * i) * t + i)
    ph = 2 * np.pi * f * np.cumsum(lfo) / SR
    tone = np.sin(ph) + 0.45 * np.sin(2 * ph) + 0.22 * np.sin(3 * ph) + 0.1 * np.sin(5 * ph)
    amp = 0.5 if f < 200 else 0.38
    amp *= 0.85 + 0.15 * np.sin(2 * np.pi * 0.05 * t + i * 1.3)  # vaivén muy suave
    music += amp * tone
music = bp(music, 140, 1400, 2)
# aire: ruido filtrado muy bajo
music += 0.08 * norm(bp(rng.standard_normal(N), 400, 1300), 1)
music = norm(music, 0.30)

# Latido suave constante (lub-dub a 64 lpm), con cuerpo medio
beat = np.zeros(N)
def thump(f0, length, gain):
    n = int(length * SR); tt = np.arange(n) / SR
    f = f0 * (1 + 0.6 * np.exp(-tt * 30))
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.7 * np.sin(4 * np.pi * np.cumsum(f) / SR) + 0.3 * np.sin(6 * np.pi * np.cumsum(f) / SR)
    return gain * s * np.exp(-tt * 14)
period = 60 / 64
k = 0.0
while k < DUR:
    for off, g in ((0, 1.0), (0.24, 0.65)):
        s = thump(125, 0.35, g); i0 = int((k + off) * SR)
        if i0 < N:
            e = min(N, i0 + len(s)); beat[i0:e] += s[: e - i0]
    k += period
beat = norm(bp(beat, 100, 1200), 0.22)

# Tic-tac discreto (2 por segundo) en 1,5-4 kHz
tick = np.zeros(N)
click = bp(rng.standard_normal(int(0.012 * SR)), 1500, 4000) * np.exp(-np.arange(int(0.012 * SR)) / SR * 400)
for j, k in enumerate(np.arange(0.25, DUR, 0.5)):
    i0 = int(k * SR); g = 1.0 if j % 2 == 0 else 0.7
    e = min(N, i0 + len(click)); tick[i0:e] += g * click[: e - i0]
tick = norm(tick, 0.06)

# Caja de música: melodía lenta en Re menor, notas cada 1,5 s
notes = [587.33, 698.46, 880.0, 783.99, 698.46, 659.25, 587.33, 523.25,
         587.33, 698.46, 659.25, 880.0, 783.99, 698.46, 659.25, 554.37]
mb = np.zeros(N)
nl = int(1.8 * SR); tt = np.arange(nl) / SR
for j, k in enumerate(np.arange(1.0, DUR - 1, 1.5)):
    f = notes[j % len(notes)]
    s = (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * 2 * f * tt) + 0.12 * np.sin(2 * np.pi * 3.01 * f * tt))
    s *= np.exp(-tt * 3.2) * (1 - np.exp(-tt * 400))
    i0 = int(k * SR); e = min(N, i0 + nl); mb[i0:e] += s[: e - i0]
mb = norm(mb, 0.08)

bed = music + beat + tick + mb
# arranque y final suaves (sin subidas bruscas)
fade = np.clip(t / 0.6, 0, 1) * np.clip((DUR - t) / 0.8, 0, 1)
bed *= fade

# ---------- EFECTOS ----------
fx = np.zeros(N)
def add(sig, at, gain=1.0):
    i0 = int(at * SR)
    if i0 >= N: return
    e = min(N, i0 + len(sig)); fx[i0:e] += gain * sig[: e - i0]

def hit():
    n = int(0.9 * SR); tt = np.arange(n) / SR
    f = 200 * (1 + 1.5 * np.exp(-tt * 25))              # cuerpo medio, no solo subgrave
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 6)
    mid = bp(rng.standard_normal(n), 300, 2500) * np.exp(-tt * 18)
    snap = bp(rng.standard_normal(n), 2000, 7000) * np.exp(-tt * 60)
    s = 0.8 * body + 0.8 * mid + 0.3 * snap
    return norm(np.tanh(s * 1.6), 1.0)

def whoosh(length=0.55):
    n = int(length * SR); tt = np.arange(n) / SR
    x = rng.standard_normal(n); p = tt / length
    out = (bp(x, 300, 1200) * np.exp(-((p - 0.35) / 0.25) ** 2)
           + 0.8 * bp(x, 1200, 4000) * np.exp(-((p - 0.5) / 0.2) ** 2)
           + 0.4 * bp(x, 4000, 8000) * np.exp(-((p - 0.6) / 0.15) ** 2))
    env = np.sin(np.pi * p) ** 2
    return norm(lp(out, 6000) * env, 1.0)

def riser(length=0.5):
    n = int(length * SR); tt = np.arange(n) / SR
    f = 200 + 1600 * (tt / length) ** 2
    s = 0.6 * np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.5 * bp(rng.standard_normal(n), 800, 6000)
    return norm(s * (tt / length) ** 2, 1.0)

add(riser(0.48), 0.0, 0.55)
add(hit(), 0.46, 0.9)                       # golpe seco de arranque
for h in cfg["hits"]: add(hit(), h, 0.75)  # revelaciones, mismo nivel
for w in cfg["whooshes"]: add(whoosh(), max(0, w - 0.28), 0.32)


def tok(f=1800, g=1.0):
    n = int(0.06 * SR); tt = np.arange(n) / SR
    s = np.sin(2*np.pi*f*tt)*np.exp(-tt*80) + 0.5*bp(rng.standard_normal(n), 1200, 5000)*np.exp(-tt*120)
    return norm(s, 1.0)*g
for j, k in enumerate(cfg.get("cdticks", [])): add(tok(1900 if j % 2 == 0 else 1500), k, 0.5)
if "bell" in cfg:
    n = int(2.0 * SR); tt = np.arange(n) / SR
    b = sum(a*np.sin(2*np.pi*f*tt)*np.exp(-tt*d) for f, a, d in ((1318.5, 1, 2.2), (2637, .45, 3.5), (3951, .2, 5), (659.3, .35, 2.5)))
    add(norm(b, 1.0), cfg["bell"], 0.55)

# ---------- efectos por evento (motor 2) ----------
def env(n, a=.005, d=.2):
    tt = np.arange(n) / SR; return np.minimum(1, tt / a) * np.exp(-tt / d)
def ev_casco():
    n = int(.25 * SR); tt = np.arange(n) / SR
    s = .9 * bp(rng.standard_normal(n), 600, 2600) * np.exp(-tt * 45) + .7 * np.sin(2 * np.pi * 180 * tt) * np.exp(-tt * 30)
    return norm(s, 1)
def ev_murmullo(dur=2.2):
    n = int(dur * SR); tt = np.arange(n) / SR; x = bp(rng.standard_normal(n), 250, 1400)
    am = .5 + .5 * np.abs(np.sin(2 * np.pi * 3.1 * tt) * np.sin(2 * np.pi * 1.3 * tt + 1))
    return norm(x * am * np.sin(np.pi * tt / dur) ** .5, 1)
def ev_aplauso(dur=1.8):
    n = int(dur * SR); s = np.zeros(n)
    for k in range(int(dur * 28)):
        i0 = int(rng.uniform(0, n - 3000)); c = bp(rng.standard_normal(1800), 900, 5000) * np.exp(-np.arange(1800) / SR * 90); s[i0:i0 + 1800] += c * rng.uniform(.5, 1)
    return norm(s * np.sin(np.pi * np.arange(n) / n) ** .4, 1)
def ev_tiza(dur=.9):
    n = int(dur * SR); tt = np.arange(n) / SR; x = bp(rng.standard_normal(n), 2500, 7000)
    return norm(x * (.6 + .4 * np.sin(2 * np.pi * 7 * tt) ** 2) * np.sin(np.pi * tt / dur), 1)
def ev_pasos(dur=1.6):
    n = int(dur * SR); s = np.zeros(n)
    for k in np.arange(0, dur - .2, .42):
        i0 = int(k * SR); m = int(.12 * SR); c = bp(rng.standard_normal(m), 200, 1800) * np.exp(-np.arange(m) / SR * 40); s[i0:i0 + m] += c
    return norm(s, 1)
def ev_papel():
    n = int(.5 * SR); return norm(bp(rng.standard_normal(n), 1500, 7000) * env(n, .01, .12), 1)
def ev_campana():
    n = int(1.6 * SR); tt = np.arange(n) / SR
    return norm(sum(a * np.sin(2 * np.pi * f * tt) * np.exp(-tt * d) for f, a, d in ((1046, 1, 2.5), (2093, .4, 4), (3140, .2, 6))), 1)
EV = {"casco": (ev_casco, .45), "murmullo": (ev_murmullo, .35), "aplauso": (ev_aplauso, .4), "tiza": (ev_tiza, .3), "pasos": (ev_pasos, .35), "papel": (ev_papel, .35), "campana": (ev_campana, .4)}
for t0, tipo in cfg.get("eventos", []):
    if tipo.startswith("cascos"):          # cascos×N: N golpes seguidos
        nrep = int(tipo.split("x")[1]) if "x" in tipo else 5
        for r in range(nrep): add(ev_casco(), t0 + r * (1 / 2.6), .5)
    elif tipo in EV:
        f, g = EV[tipo]; add(f(), t0, g)

wavfile.write(sys.argv[2], SR, (bed * 0.9).astype(np.float32))
fx = sosfilt(butter(2, 140, btype="high", fs=SR, output="sos"), fx)
wavfile.write(sys.argv[3], SR, fx.astype(np.float32))
print("ok", DUR)
