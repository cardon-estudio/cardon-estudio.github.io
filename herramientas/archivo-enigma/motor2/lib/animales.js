/* ===================================================================
   Motor 2 · Animales articulados. Caballo con patas de 2 segmentos,
   cuello, cabeza, orejas, crin, cola y ciclos: quieto, andar, golpear
   el suelo con la pata, asentir, mirar. Origen: suelo bajo el cuerpo.
   =================================================================== */
const MOV_CAB = {
  quieto: (t) => ({ neck: Math.sin(t * 1.1) * 3, ear: Math.sin(t * 3.3) > .9 ? 1 : 0, tail: Math.sin(t * 1.7) * 10 }),
  andar: (t, p = {}) => { const s = (p.vel || 1) * 6, c = Math.sin(t * s);
    return { fl: c * 22, fr: -c * 22, bl: -c * 22, br: c * 22, flk: Math.max(0, Math.cos(t * s)) * 26, frk: Math.max(0, -Math.cos(t * s)) * 26, blk: Math.max(0, -Math.cos(t * s)) * 22, brk: Math.max(0, Math.cos(t * s)) * 22, bob: Math.abs(c) * -6, neck: c * 5, tail: Math.sin(t * s * .5) * 14 }; },
  golpear: (t, p = {}) => { const s = p.vel || 2.6, ph = (t * s) % 1, up = ph < .45 ? Math.sin(ph / .45 * Math.PI) : 0;
    return { fr: 30 * up, frk: 70 * up, neck: -4 + up * 4, tail: Math.sin(t * 2) * 8, ear: 0, hit: ph > .45 && ph < .55 ? 1 : 0 }; },
  asentir: (t) => ({ neck: Math.sin(t * 6) * 8, tail: Math.sin(t * 2) * 10 }),
  mirar: (t) => ({ neck: -14 + Math.sin(t * 1.3) * 6, head: Math.sin(t * 1.3) * 10, tail: Math.sin(t * 2) * 10 }),
  fallar: (t) => ({ fr: 26 * Math.abs(Math.sin(t * 5)), frk: 60 * Math.abs(Math.sin(t * 5)), neck: 6 + Math.sin(t * 2) * 4, head: 10, tail: -8 })
};
function caballo(def, o) {
  const { x = 0, y = 0, s = 1, mira = 1, t = 0 } = o;
  let a = [0, 'quieto', {}]; for (const ac of o.acts || []) if (t >= ac[0]) a = ac;
  const P = Object.assign({ fl: 0, fr: 0, bl: 0, br: 0, flk: 0, frk: 0, blk: 0, brk: 0, bob: 0, neck: 0, head: 0, tail: 0, ear: 0 }, (MOV_CAB[a[1]] || MOV_CAB.quieto)(t - a[0], a[2] || {}));
  const C = def.color || '#8A5A3A', M = def.crin || '#2E2218', id = gid('cb'), I = K2.ink;
  const defs = `<defs><radialGradient id="${id}b" cx="45%" cy="25%" r="85%"><stop offset="0" stop-color="${luz(C, .22)}"/><stop offset=".55" stop-color="${C}"/><stop offset="1" stop-color="${sombra(C, .35)}"/></radialGradient></defs>`;
  const by = -360 + P.bob;
  const pata = (px, py, a1, k, col, trasera) => { // muslo grueso, caña fina, menudillo y casco
    const l1 = trasera ? 150 : 140, l2 = 150, ex = px + Math.sin(a1 * D2R) * l1, ey = py + Math.cos(a1 * D2R) * l1, aa = a1 + (trasera ? k : -k);
    const hx = ex + Math.sin(aa * D2R) * l2, hy = ey + Math.cos(aa * D2R) * l2;
    const st = (d, w, c) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
    const d1 = `M${px},${py} L${ex.toFixed(1)},${ey.toFixed(1)}`, d2 = `M${ex.toFixed(1)},${ey.toFixed(1)} L${hx.toFixed(1)},${hy.toFixed(1)}`;
    return st(d1, 50, I) + st(d1, 41, col) + st(d2, 27, I) + st(d2, 19, col) + st(d2, 6, luz(col, .2)) + `<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="14" fill="${col}"/>` +
      `<g transform="translate(${hx.toFixed(1)},${hy.toFixed(1)}) rotate(${(-aa * .3).toFixed(1)})"><path d="M-17,-14 h34 l6,28 h-46z" fill="#2E2218" stroke="${I}" stroke-width="4" stroke-linejoin="round"/>${def.calcetines ? `<rect x="-14" y="-30" width="28" height="18" fill="#F4EBD6"/>` : ''}</g>`; };
  let g = pata(-150, by + 40, P.br, P.brk, sombra(C, .2), 1) + pata(120, by + 40, P.fr, P.frk, sombra(C, .2), 0);
  // cola
  const tl = P.tail; g += `<path d="M-215,${by - 30} C${-280 + tl},${by + 10} ${-270 + tl * 1.5},${by + 120} ${-240 + tl * 2},${by + 210}" fill="none" stroke="${I}" stroke-width="44" stroke-linecap="round"/><path d="M-215,${by - 30} C${-280 + tl},${by + 10} ${-270 + tl * 1.5},${by + 120} ${-240 + tl * 2},${by + 210}" fill="none" stroke="${M}" stroke-width="34" stroke-linecap="round"/><path d="M-222,${by} C${-262 + tl},${by + 40} ${-258 + tl * 1.4},${by + 120} ${-236 + tl * 2},${by + 190}" fill="none" stroke="${luz(M, .25)}" stroke-width="5"/>`;
  g += pata(-110, by + 50, P.bl, P.blk, C, 1) + pata(150, by + 40, P.fl, P.flk, C, 0);
  // cuerpo con pecho y grupa
  g += `<path d="M165,${by - 70} C250,${by - 40} 250,${by + 80} 165,${by + 100} C60,${by + 128} -40,${by + 128} -150,${by + 104} C-250,${by + 92} -268,${by - 30} -200,${by - 96} C-130,${by - 140} 40,${by - 120} 165,${by - 70}Z" fill="url(#${id}b)" stroke="${I}" stroke-width="5"/>`;
  g += `<path d="M-200,${by - 60} C-150,${by - 10} -150,${by + 70} -200,${by + 92}" fill="none" stroke="${sombra(C, .3)}" stroke-width="6" opacity=".5"/><path d="M150,${by - 40} C110,${by} 110,${by + 60} 140,${by + 100}" fill="none" stroke="${sombra(C, .3)}" stroke-width="6" opacity=".5"/><ellipse cx="-40" cy="${by - 88}" rx="130" ry="18" fill="${luz(C, .35)}" opacity=".4"/><path d="M-120,${by + 112} Q0,${by + 132} 110,${by + 112}" fill="none" stroke="${sombra(C, .35)}" stroke-width="10" opacity=".4"/>`;
  // cuello con crin
  const na = -52 + P.neck, nx = 170, ny = by - 60, L = 200, hx = nx + Math.cos(na * D2R) * L, hy = ny + Math.sin(na * D2R) * L;
  const px = -Math.sin(na * D2R), py = Math.cos(na * D2R);
  g += `<path d="M${nx - 80},${ny + 10} Q${(nx + hx) / 2 - px * 70},${(ny + hy) / 2 - py * 70} ${hx - 30},${hy - 16} L${hx + 40},${hy + 30} Q${(nx + hx) / 2 + px * 40 + 30},${(ny + hy) / 2 + py * 40} ${nx + 70},${ny + 80}Z" fill="url(#${id}b)" stroke="${I}" stroke-width="5" stroke-linejoin="round"/>`;
  for (let i = 0; i < 8; i++) { const k = i / 8, mx = lerp(nx - 75, hx - 26, k) - px * 30 * Math.sin(k * Math.PI), my = lerp(ny + 6, hy - 20, k) - py * 30 * Math.sin(k * Math.PI); g += `<path d="M${mx.toFixed(1)},${my.toFixed(1)} q${(-34 + Math.sin(t * 3 + i) * 6).toFixed(1)},6 ${-30},${46}" fill="none" stroke="${I}" stroke-width="16" stroke-linecap="round"/><path d="M${mx.toFixed(1)},${my.toFixed(1)} q${(-34 + Math.sin(t * 3 + i) * 6).toFixed(1)},6 ${-30},${46}" fill="none" stroke="${M}" stroke-width="10" stroke-linecap="round"/>`; }
  // cabeza alargada (hocico hacia delante y abajo)
  const ha = 20 + P.neck * .5 + P.head, blink = ((t + .9) % 4.1) > 3.98;
  g += `<g transform="translate(${hx.toFixed(1)},${hy.toFixed(1)}) rotate(${ha.toFixed(1)})">
    <path d="M-6,-20 L-16,${-92 - P.ear * 14} L22,-30Z" fill="${C}" stroke="${I}" stroke-width="4" stroke-linejoin="round"/><path d="M-8,-40 L-10,-80 L8,-44" fill="${sombra(C, .3)}"/>
    <path d="M-30,-10 C10,-40 60,-30 80,0 L150,90 C170,120 150,150 118,148 L60,140 C20,130 -10,90 -30,40Z" fill="url(#${id}b)" stroke="${I}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M60,140 C90,152 140,150 150,120" fill="none" stroke="${sombra(C, .35)}" stroke-width="6"/><path d="M118,150 q-14,14 -40,4" fill="${sombra(C, .2)}" stroke="${I}" stroke-width="4"/>
    <ellipse cx="128" cy="108" rx="11" ry="7" fill="${I}" transform="rotate(30,128,108)"/>
    ${blink ? `<path d="M22,18 q14,8 28,0" stroke="${I}" stroke-width="4" fill="none"/>` : `<ellipse cx="36" cy="18" rx="13" ry="15" fill="#1a120c"/><circle cx="41" cy="12" r="5" fill="#fff"/><path d="M20,6 q16,-12 32,-2" fill="none" stroke="${I}" stroke-width="3"/>`}
    ${o.anteojeras ? `<path d="M10,-6 L64,-14 L66,46 L14,48Z" fill="#2E2218" stroke="${I}" stroke-width="4"/><path d="M-20,0 L64,-14" stroke="#2E2218" stroke-width="7"/>` : ''}
    ${def.mancha ? `<path d="M52,10 C70,30 100,70 118,96 L108,104 C88,76 60,40 46,18Z" fill="#F4EBD6" opacity=".9"/>` : ''}
    <path d="M-24,-12 q14,-26 46,-20" fill="none" stroke="${M}" stroke-width="14" stroke-linecap="round"/></g>`;
  if (o.polvo !== false && P.hit) g += [0, 1, 2, 3].map(i => `<circle cx="${170 + (i - 1.5) * 34}" cy="${-12 - (i % 2) * 16}" r="${16 + i * 4}" fill="#D9C7A8" opacity=".7"/>`).join('');
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(s * mira).toFixed(3)},${s.toFixed(3)})">${defs}<ellipse cx="0" cy="6" rx="270" ry="26" fill="#000" opacity=".22" filter="url(#bl)"/>${g}</g>`;
}
