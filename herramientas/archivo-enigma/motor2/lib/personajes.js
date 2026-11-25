/* ===================================================================
   Motor 2 · Personajes articulados (humanos)
   Esqueleto 2D con codos, rodillas, cabeza que gira, cara expresiva,
   parpadeo, mirada, boca que habla y ropa con sombreado y luz de borde.
   Origen: punto entre los pies. Altura ~620 unidades a escala 1.
   =================================================================== */
const K2 = { ink: '#2A1E17' };
const D2R = Math.PI / 180;
const mixC = (a, b, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
const sombra = (c, k = .22) => mixC(c, '#1a1210', k);
const luz = (c, k = .2) => mixC(c, '#fff6e6', k);
let _gid = 0; const gid = p => p + (++_gid);

/* ---------- poses y movimientos ---------- */
const POSE0 = { lean: 0, bob: 0, head: 0, turn: 0, lT: 4, lS: 0, rT: -4, rS: 0, lU: 8, lF: 6, rU: -8, rF: -6, ex: 0, ey: 0, blink: 0, brow: 0, browL: 0, mouth: 'neutral', open: 0, squint: 0 };
const EXPR = { // expresiones faciales
  neutral: { brow: 0, mouth: 'neutral', open: 0, squint: 0 },
  feliz: { brow: .2, mouth: 'smile', open: .15, squint: .25 },
  orgulloso: { brow: .1, mouth: 'smile', open: 0, squint: .35 },
  sorpresa: { brow: .9, mouth: 'o', open: .8, squint: 0 },
  miedo: { brow: .8, browL: .6, mouth: 'o', open: .5, squint: 0 },
  duda: { brow: -.2, browL: .7, mouth: 'flat', open: 0, squint: .2 },
  pensativo: { brow: -.35, mouth: 'flat', open: 0, squint: .3 },
  triste: { brow: .5, browL: .5, mouth: 'frown', open: 0, squint: .1 },
  enfado: { brow: -.9, mouth: 'frown', open: .2, squint: .3 },
  concentrado: { brow: -.5, mouth: 'flat', open: 0, squint: .45 },
  alivio: { brow: .3, mouth: 'smile', open: .05, squint: .5 }
};
const MOV = { // brazo/pierna 'l' = delanteros (hacia donde mira). Ángulos: 0 = abajo, + = hacia delante
  quieto: (t) => ({ bob: Math.sin(t * 2.1) * 2, lU: 8 + Math.sin(t * 2.1) * 1.5, rU: -6 - Math.sin(t * 2.1) * 1.5, lF: 8, rF: 6, head: Math.sin(t * .9) * 2 }),
  andar: (t, p = {}) => { const s = (p.vel || 1) * 7.5, c = Math.sin(t * s), c2 = Math.cos(t * s);
    return { lT: c * 26, rT: -c * 26, lS: -Math.max(0, -c2) * 42, rS: -Math.max(0, c2) * 42, lU: -c * 24, rU: c * 24, lF: 14, rF: 14, bob: -Math.abs(c) * 8 + 4, lean: 4, head: Math.sin(t * s * 2) * 1.5 }; },
  hablar: (t) => ({ lU: 30 + Math.sin(t * 3.1) * 14, lF: 70 + Math.sin(t * 4.3) * 18, rU: -8, rF: 8, head: Math.sin(t * 2.7) * 4, open: .25 + .45 * Math.abs(Math.sin(t * 11)) * (Math.sin(t * 2.3) > -.6 ? 1 : 0), mouth: 'talk', bob: Math.sin(t * 2) * 2 }),
  senalar: (t) => ({ lU: 92 + Math.sin(t * 2) * 2, lF: 4, rU: -10, rF: 8, head: -4, lean: 2, bob: Math.sin(t * 2) * 1.5 }),
  pensar: (t) => ({ lU: 18, lF: 152, rU: 30, rF: 78, head: -8 + Math.sin(t * 1.2) * 3, ex: -.5, ey: -.6 }),
  sorprendido: (t) => { const k = Math.min(1, t / .25); return { lean: -8 * k, lU: 15 + 120 * k, lF: 30 * k, rU: -15 - 120 * k, rF: -30 * k, head: -6 * k, bob: -10 * Math.sin(Math.min(1, t / .3) * Math.PI) }; },
  escribir: (t) => ({ lU: 38, lF: 82, rU: 30, rF: 78 + Math.sin(t * 14) * 6, head: 12, ey: .7, ex: .3 }),
  aplaudir: (t) => { const c = Math.abs(Math.sin(t * 9)); return { lU: 48, lF: 62 - c * 12, rU: 48, rF: 62 + c * 12, bob: -c * 3, open: .3, mouth: 'smile' }; },
  celebrar: (t) => ({ lU: 165 + Math.sin(t * 8) * 10, lF: 10, rU: -165 - Math.sin(t * 8) * 10, rF: -10, bob: -Math.abs(Math.sin(t * 8)) * 12, open: .6, mouth: 'smile' }),
  mirar: (t) => ({ head: Math.sin(t * 1.4) * 9, ex: Math.sin(t * 1.4), turn: Math.sin(t * .7) * .4 }),
  asentir: (t) => ({ head: Math.sin(t * 7) * 7 }),
  negar: (t) => ({ turn: Math.sin(t * 7) * .5 }),
  manosCintura: (t) => ({ lU: 30, lF: -110, rU: -30, rF: 110, bob: Math.sin(t * 2) * 2 }),
  agacharse: (t) => ({ lT: 70, lS: -110, rT: 50, rS: -100, lean: 22, bob: 75, lU: 60, lF: 20, ey: .8 })
};
function poseDe(acts, cara, t) { // acts: [[t0,'mov',params]]; cara: [[t0,'expr']]
  const at = (list, def) => { let cur = [0, def, {}], prev = null; for (const a of list || []) { if (t >= a[0]) { prev = cur; cur = a; } } return [cur, prev]; };
  const [a, ap] = at(acts, 'quieto'); const mv = (n, lt, p) => Object.assign({}, POSE0, (MOV[n] || MOV.quieto)(lt, p || {}));
  let P = mv(a[1], t - a[0], a[2]);
  if (ap && t - a[0] < .3) { const Q = mv(ap[1], t - ap[0], ap[2]), k = eio((t - a[0]) / .3); for (const key in P) if (typeof P[key] === 'number') P[key] = lerp(Q[key], P[key], k); }
  const [c] = at(cara, 'neutral'); const E = EXPR[c[1]] || EXPR.neutral; for (const k in E) { if (k === 'mouth') { if (P.mouth !== 'talk') P.mouth = E.mouth; } else if (k === 'open') P.open = Math.max(P.open, E.open); else P[k] = E[k]; }
  P.blink = Math.max(((t + 1.7) % 3.7) > 3.58 ? 1 : 0, P.squint * .3);
  return P;
}

/* ---------- dibujo ---------- */
function miembro(x1, y1, a1, l1, a2, l2, w1, w2, col, id) { // brazo/pierna en 2 segmentos (ángulo absoluto en grados, 0 = abajo)
  const ex = x1 + Math.sin(a1 * D2R) * l1, ey = y1 + Math.cos(a1 * D2R) * l1, aa = a1 + a2;
  const hx = ex + Math.sin(aa * D2R) * l2, hy = ey + Math.cos(aa * D2R) * l2;
  const d = `M${x1.toFixed(1)},${y1.toFixed(1)} L${ex.toFixed(1)},${ey.toFixed(1)} L${hx.toFixed(1)},${hy.toFixed(1)}`, w = (w1 + w2);
  const svg = `<path d="${d}" fill="none" stroke="${K2.ink}" stroke-width="${w + 9}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${luz(col, .22)}" stroke-width="${w * .28}" stroke-linecap="round" stroke-linejoin="round" transform="translate(${(-w * .22).toFixed(1)},0)" opacity=".55"/><path d="${d}" fill="none" stroke="${sombra(col, .35)}" stroke-width="${w * .22}" stroke-linecap="round" stroke-linejoin="round" transform="translate(${(w * .26).toFixed(1)},0)" opacity=".5"/>`;
  return { svg, ex, ey, hx, hy, ang: aa };
}
function gradV(id, c) { return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${luz(c, .18)}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="${sombra(c, .3)}"/></linearGradient>`; }

/* Diseño del personaje: {piel, pelo, peinado:'corto'|'largo'|'calvo'|'mono', barba:null|'bigote'|'barba'|'perilla', colorBarba,
   sombrero:null|'bombin'|'chistera'|'gorra'|'canotier', ropa:{tipo:'levita'|'chaqueta'|'vestido'|'bata', color, camisa, pantalon, corbata},
   gafas:false|'redondas', edad:'joven'|'adulto'|'mayor', altura:1, ancho:1} */
function humano(def, o) {
  const { x = 0, y = 0, s = 1, mira = 1, t = 0 } = o; const P = o.pose || poseDe(o.acts, o.cara, t);
  const H = def.altura || 1, W = def.ancho || 1; const R = def.ropa || {}; const piel = def.piel || '#E8C29C';
  const id = gid('h'); const gC = id + 'c', gP = id + 'p', gS = id + 's', gK = id + 'k';
  let defs = `<defs>${gradV(gC, R.color || '#3A3A44')}${gradV(gP, R.pantalon || '#2E2B28')}${gradV(gS, piel)}${gradV(gK, R.mangas || R.color || '#3A3A44')}
    <radialGradient id="${id}f" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="${luz(piel, .15)}"/><stop offset=".7" stop-color="${piel}"/><stop offset="1" stop-color="${sombra(piel, .25)}"/></radialGradient></defs>`;
  const hip = -310 * H + P.bob, sh = hip - 205 * H, hx = 0;
  // piernas
  const legL = 155 * H, legS = 150 * H;
  const LB = miembro(-26 * W, hip, P.rT, legL, P.rS, legS, 24 * W, 15, (R.tipo==='vestido'?(R.medias||'#3A3030'):R.pantalon), gP), LF = miembro(26 * W, hip, P.lT, legL, P.lS, legS, 24 * W, 15, (R.tipo==='vestido'?(R.medias||'#3A3030'):R.pantalon), gP);
  const zap = (L) => `<path d="M${(L.hx - 16).toFixed(1)},${(L.hy - 6).toFixed(1)} q2,-14 18,-14 q30,4 40,22 q-2,8 -10,8 h-48z" fill="#211a16" stroke="${K2.ink}" stroke-width="4" stroke-linejoin="round"/><path d="M${(L.hx - 8).toFixed(1)},${(L.hy - 14).toFixed(1)} q10,-4 20,0" stroke="#4a3f38" stroke-width="3" fill="none"/>`;
  // brazos
  const armU = 125 * H, armF = 118 * H;
  const AB = miembro(-62 * W, sh + 18, P.rU, armU, P.rF, armF, 17 * W, 12, R.mangas || R.color, gK), AF = miembro(62 * W, sh + 18, P.lU, armU, P.lF, armF, 17 * W, 12, R.mangas || R.color, gK);
  const mano = (A) => `<g transform="translate(${A.hx.toFixed(1)},${A.hy.toFixed(1)}) rotate(${(-A.ang).toFixed(1)})"><ellipse cx="0" cy="8" rx="13" ry="16" fill="url(#${gS})" stroke="${K2.ink}" stroke-width="3.5"/><path d="M-9,14 q-6,6 -4,12 M9,14 q4,6 2,12" stroke="${K2.ink}" stroke-width="2.5" fill="none"/></g>`;
  // torso
  const tw = 72 * W, tipo = R.tipo || 'chaqueta', largo = tipo === 'levita' || tipo === 'bata' ? 150 : tipo === 'vestido' ? 230 : 40;
  let torso = `<path d="M${-tw},${sh + 10} Q${-tw - 8},${(sh + hip) / 2} ${-tw + 6},${hip + largo} L${tw - 6},${hip + largo} Q${tw + 8},${(sh + hip) / 2} ${tw},${sh + 10} Q0,${sh - 12} ${-tw},${sh + 10}Z" fill="url(#${gC})" stroke="${K2.ink}" stroke-width="4.5" stroke-linejoin="round"/>`;
  if (tipo !== 'vestido') torso += `<path d="M-20,${sh + 4} L0,${sh + 90} L20,${sh + 4}Z" fill="${R.camisa || '#F2EEE6'}" stroke="${K2.ink}" stroke-width="3"/>` + (R.corbata ? `<path d="M-7,${sh + 14} L7,${sh + 14} L10,${sh + 80} L0,${sh + 92} L-10,${sh + 80}Z" fill="${R.corbata}" stroke="${K2.ink}" stroke-width="2.5"/>` : '') +
    `<path d="M-20,${sh + 4} L-34,${sh + 60} L-4,${sh + 96} M20,${sh + 4} L34,${sh + 60} L4,${sh + 96}" fill="none" stroke="${sombra(R.color || '#333', .45)}" stroke-width="5" stroke-linejoin="round"/>` + [0, 1, 2].map(i => `<circle cx="${tw * .18}" cy="${sh + 110 + i * 34}" r="5" fill="${R.botones || '#C9A227'}" stroke="${K2.ink}" stroke-width="2"/>`).join('');
  else torso += `<path d="M${-tw + 10},${hip - 20} Q0,${hip} ${tw - 10},${hip - 20}" fill="none" stroke="${sombra(R.color, .4)}" stroke-width="6"/><path d="M-24,${sh + 6} Q0,${sh + 30} 24,${sh + 6}" fill="${R.camisa || '#F2EEE6'}" stroke="${K2.ink}" stroke-width="3"/>`;
  torso += `<path d="M${tw - 10},${sh + 20} Q${tw},${(sh + hip) / 2} ${tw - 12},${hip + largo - 6}" fill="none" stroke="${sombra(R.color || '#333', .4)}" stroke-width="10" opacity=".5"/>`;
  // cabeza
  const hy = sh - 70 * H, tu = P.turn, fx = tu * 16;
  let cab = `<rect x="-17" y="${sh - 30}" width="34" height="40" fill="url(#${gS})" stroke="${K2.ink}" stroke-width="3.5"/>`;
  const pel = def.pelo || '#3B2418', pz = def.peinado || 'corto';
  if (pz === 'largo') cab += `<path d="M-60,${hy - 10} Q-70,${hy + 80} -52,${hy + 110} L52,${hy + 110} Q70,${hy + 80} 60,${hy - 10}Z" fill="${pel}" stroke="${K2.ink}" stroke-width="4"/>`;
  cab += `<ellipse cx="${-52 + fx * .2}" cy="${hy + 8}" rx="10" ry="15" fill="${sombra(piel, .1)}" stroke="${K2.ink}" stroke-width="3.5"/><ellipse cx="${52 + fx * .2}" cy="${hy + 8}" rx="10" ry="15" fill="${sombra(piel, .1)}" stroke="${K2.ink}" stroke-width="3.5"/>`;
  cab += `<path d="M-52,${hy - 20} Q-54,${hy + 50} -30,${hy + 72} Q0,${hy + 88} 30,${hy + 72} Q54,${hy + 50} 52,${hy - 20} Q48,${hy - 72} 0,${hy - 74} Q-48,${hy - 72} -52,${hy - 20}Z" fill="url(#${id}f)" stroke="${K2.ink}" stroke-width="4.5"/>`;
  if (def.edad === 'mayor') cab += `<path d="M${-30 + fx},${hy - 36} q14,-5 28,0 M${4 + fx},${hy - 40} q14,-5 28,0" stroke="${sombra(piel, .3)}" stroke-width="2.5" fill="none"/>`;
  // ojos
  const eo = 1 - P.blink, sq = P.squint, ex = P.ex * 6, ey = P.ey * 5;
  const ojo = (cx, far) => { const rx = 12 * (far ? 1 - Math.abs(tu) * .35 : 1), ry = 11 * eo * (1 - sq * .5);
    if (ry < 1.5) return `<path d="M${cx - rx},${hy} q${rx},6 ${rx * 2},0" stroke="${K2.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    return `<ellipse cx="${cx}" cy="${hy}" rx="${rx}" ry="${ry.toFixed(1)}" fill="#fff" stroke="${K2.ink}" stroke-width="3"/><clipPath id="${id}e${cx | 0}"><ellipse cx="${cx}" cy="${hy}" rx="${rx}" ry="${ry.toFixed(1)}"/></clipPath><g clip-path="url(#${id}e${cx | 0})"><circle cx="${cx + ex + tu * 4}" cy="${hy + ey}" r="7.5" fill="${def.ojos || '#5A3E2B'}"/><circle cx="${cx + ex + tu * 4}" cy="${hy + ey}" r="4" fill="#120c08"/><circle cx="${cx + ex + tu * 4 + 2.5}" cy="${hy + ey - 3}" r="2" fill="#fff"/></g><path d="M${cx - rx - 2},${(hy - ry + 1).toFixed(1)} q${rx + 2},${-5 - sq * 2} ${rx * 2 + 4},0" stroke="${K2.ink}" stroke-width="3" fill="none"/>`; };
  cab += ojo(-21 + fx, tu > .2) + ojo(21 + fx, tu < -.2);
  // cejas
  const b = P.brow, bl = P.browL || 0, bc = def.colorCeja || sombra(pel === '#E8E4DC' ? '#9a9a9a' : pel, .1);
  cab += `<path d="M${-36 + fx},${hy - 22 - b * 9 + bl * 4} Q${-22 + fx},${hy - 30 - b * 10} ${-8 + fx},${hy - 22 - b * 6 - bl * 6}" stroke="${bc}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${8 + fx},${hy - 22 - b * 6 + bl * 2} Q${22 + fx},${hy - 30 - b * 10} ${36 + fx},${hy - 22 - b * 9}" stroke="${bc}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  // nariz
  cab += `<path d="M${3 + fx * 1.3},${hy + 2} q${8 + tu * 6},20 ${-4},26 q-6,2 -10,-2" fill="none" stroke="${sombra(piel, .35)}" stroke-width="3.5" stroke-linecap="round"/>`;
  // boca
  const my = hy + 44, mx = fx * 1.1, op = P.open;
  const M = { neutral: `<path d="M${mx - 12},${my} q12,4 24,0" stroke="${K2.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    flat: `<path d="M${mx - 11},${my + 1} h22" stroke="${K2.ink}" stroke-width="3.5" stroke-linecap="round"/>`,
    smile: op > .1 ? `<path d="M${mx - 18},${my - 3} Q${mx},${my + 16 + op * 10} ${mx + 18},${my - 3}Z" fill="#6E2A24" stroke="${K2.ink}" stroke-width="3.5"/><path d="M${mx - 13},${my - 1} h26" stroke="#fff" stroke-width="5"/>` : `<path d="M${mx - 18},${my - 3} Q${mx},${my + 14} ${mx + 18},${my - 3}" stroke="${K2.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    frown: `<path d="M${mx - 16},${my + 6} Q${mx},${my - 6} ${mx + 16},${my + 6}" stroke="${K2.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    o: `<ellipse cx="${mx}" cy="${my + 4}" rx="${9 + op * 3}" ry="${7 + op * 11}" fill="#4A1E1A" stroke="${K2.ink}" stroke-width="3.5"/>`,
    talk: `<path d="M${mx - 15},${my - 1} Q${mx},${my + 3 + op * 22} ${mx + 15},${my - 1} Q${mx},${my - 4} ${mx - 15},${my - 1}Z" fill="#4A1E1A" stroke="${K2.ink}" stroke-width="3.5"/>` + (op > .3 ? `<ellipse cx="${mx}" cy="${my + 6 + op * 8}" rx="7" ry="${3 + op * 3}" fill="#C2564F"/>` : '') };
  cab += M[P.mouth] || M.neutral;
  if (P.mouth === 'smile' || sq > .3) cab += `<ellipse cx="${-34 + fx}" cy="${hy + 26}" rx="11" ry="6" fill="#E07A6B" opacity=".35"/><ellipse cx="${34 + fx}" cy="${hy + 26}" rx="11" ry="6" fill="#E07A6B" opacity=".35"/>`;
  // vello facial
  const cb = def.colorBarba || pel;
  if (def.barba === 'bigote' || def.barba === 'barba') cab += `<path d="M${mx - 30},${my - 6} Q${mx - 16},${my - 20} ${mx},${my - 10} Q${mx + 16},${my - 20} ${mx + 30},${my - 6} Q${mx + 14},${my - 2} ${mx},${my - 6} Q${mx - 14},${my - 2} ${mx - 30},${my - 6}Z" fill="${cb}" stroke="${K2.ink}" stroke-width="3"/>`;
  if (def.barba === 'barba') cab += `<path d="M-50,${hy + 14} Q-48,${hy + 104} 0,${hy + 118} Q48,${hy + 104} 50,${hy + 14} Q40,${hy + 60} ${mx + 22},${my + 12} Q${mx},${my + 22} ${mx - 22},${my + 12} Q-40,${hy + 60} -50,${hy + 14}Z" fill="${cb}" stroke="${K2.ink}" stroke-width="4"/>` + [-20, 0, 20].map(dx => `<path d="M${dx},${hy + 78} q4,18 0,30" stroke="${sombra(cb, .25)}" stroke-width="3" fill="none"/>`).join('');
  if (def.barba === 'perilla') cab += `<path d="M${mx - 10},${my + 14} q10,26 20,0" fill="${cb}" stroke="${K2.ink}" stroke-width="3"/>`;
  // pelo / sombrero
  if (pz === 'corto') cab += `<path d="M-54,${hy - 10} Q-58,${hy - 80} 0,${hy - 82} Q58,${hy - 80} 54,${hy - 10} Q46,${hy - 44} 12,${hy - 50} Q-20,${hy - 40} -44,${hy - 46} Q-50,${hy - 30} -54,${hy - 10}Z" fill="${pel}" stroke="${K2.ink}" stroke-width="4"/>`;
  if (pz === 'largo') cab += `<path d="M-56,${hy - 6} Q-60,${hy - 84} 0,${hy - 86} Q60,${hy - 84} 56,${hy - 6} Q40,${hy - 50} -10,${hy - 48} Q-40,${hy - 46} -56,${hy - 6}Z" fill="${pel}" stroke="${K2.ink}" stroke-width="4"/>`;
  if (pz === 'calvo') cab += `<path d="M-54,${hy + 4} Q-60,${hy - 34} -44,${hy - 44} M54,${hy + 4} Q60,${hy - 34} 44,${hy - 44}" stroke="${pel}" stroke-width="13" fill="none" stroke-linecap="round"/>`;
  if (pz === 'mono') cab += `<path d="M-54,${hy - 6} Q-58,${hy - 84} 0,${hy - 86} Q58,${hy - 84} 54,${hy - 6} Q40,${hy - 52} -40,${hy - 44}Z" fill="${pel}" stroke="${K2.ink}" stroke-width="4"/><circle cx="0" cy="${hy - 94}" r="26" fill="${pel}" stroke="${K2.ink}" stroke-width="4"/>`;
  if (def.gafas) cab += `<g fill="none" stroke="#3A2E22" stroke-width="3.5"><circle cx="${-21 + fx}" cy="${hy}" r="17"/><circle cx="${21 + fx}" cy="${hy}" r="17"/><path d="M${-4 + fx},${hy - 2} h8"/></g>`;
  const so = def.sombrero, sc = def.colorSombrero || '#2A2420';
  if (so === 'bombin') cab += `<ellipse cx="0" cy="${hy - 50}" rx="74" ry="14" fill="${sc}" stroke="${K2.ink}" stroke-width="4"/><path d="M-50,${hy - 52} Q-52,${hy - 128} 0,${hy - 130} Q52,${hy - 128} 50,${hy - 52}Z" fill="${sc}" stroke="${K2.ink}" stroke-width="4"/><path d="M-50,${hy - 64} h100" stroke="${luz(sc, .2)}" stroke-width="7"/><path d="M-30,${hy - 112} q20,-10 40,-6" stroke="${luz(sc, .3)}" stroke-width="5" fill="none" opacity=".6"/>`;
  if (so === 'chistera') cab += `<ellipse cx="0" cy="${hy - 52}" rx="76" ry="13" fill="${sc}" stroke="${K2.ink}" stroke-width="4"/><path d="M-46,${hy - 54} L-42,${hy - 170} L42,${hy - 170} L46,${hy - 54}Z" fill="${sc}" stroke="${K2.ink}" stroke-width="4"/><rect x="-46" y="${hy - 80}" width="92" height="16" fill="#5A2626"/>`;
  if (so === 'gorra') cab += `<path d="M-56,${hy - 30} Q-56,${hy - 100} 0,${hy - 100} Q56,${hy - 100} 56,${hy - 30}Z" fill="${sc}" stroke="${K2.ink}" stroke-width="4"/><path d="M10,${hy - 36} q50,-8 80,8 q-40,12 -80,4z" fill="${sombra(sc, .2)}" stroke="${K2.ink}" stroke-width="4"/>`;
  if (so === 'canotier') cab += `<ellipse cx="0" cy="${hy - 54}" rx="84" ry="14" fill="#E8D39A" stroke="${K2.ink}" stroke-width="4"/><rect x="-50" y="${hy - 96}" width="100" height="42" fill="#E8D39A" stroke="${K2.ink}" stroke-width="4"/><rect x="-50" y="${hy - 70}" width="100" height="12" fill="#2F3B5C"/>`;
  // composición (orden según hacia dónde mira)
  const bodyG = `<g transform="rotate(${P.lean},0,${hip})">${LB.svg}${zap(LB)}${LF.svg}${zap(LF)}${AB.svg}${mano(AB)}${torso}<g transform="rotate(${P.head},0,${sh})">${cab}</g>${AF.svg}${mano(AF)}${o.prop ? `<g transform="translate(${AF.hx.toFixed(1)},${AF.hy.toFixed(1)})">${o.prop}</g>` : ''}</g>`;
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(s * mira).toFixed(3)},${s.toFixed(3)})">${defs}<ellipse cx="0" cy="6" rx="${90 * W}" ry="16" fill="#000" opacity=".22" filter="url(#bl)"/>${bodyG}</g>`;
}
