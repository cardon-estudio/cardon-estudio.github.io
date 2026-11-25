/* ===================================================================
   Motor 2 · Director: convierte el guion gráfico (window.STORY) en
   escenas renderizables. Cada escena declara escenario, cámara,
   actores con acciones/expresiones, objetos, efectos y transición.
   Tiempos de acciones en fracción de la escena (0..1).
   =================================================================== */
const STORY = window.STORY || { personajes: {}, escenas: [] };
function dibujaActor(a, t, k, d) {
  const def = STORY.personajes[a.quien] || {}; const s = a.escala || 1;
  let x = a.x || 540; if (a.ruta) { let p = a.ruta[0]; for (let i = 0; i < a.ruta.length - 1; i++) { const A = a.ruta[i], B = a.ruta[i + 1]; if (k >= A[0] && k <= B[0]) { x = lerp(A[1], B[1], eio((k - A[0]) / (B[0] - A[0]))); p = null; break; } } if (p && k > a.ruta[a.ruta.length - 1][0]) x = a.ruta[a.ruta.length - 1][1]; else if (p) x = p[1]; }
  const acts = (a.acts || [[0, a.ruta ? 'andar' : 'quieto']]).map(([kk, m, pp]) => [kk * d, m, pp]);
  const cara = (a.cara || [[0, 'neutral']]).map(([kk, e]) => [kk * d, e]);
  if (def.tipo === 'caballo') return caballo(def, { x, y: a.y || SUELO, s, mira: a.mira || 1, t, acts, polvo: a.polvo, anteojeras: a.anteojeras });
  return humano(def, { x, y: a.y || SUELO, s, mira: a.mira || 1, t, acts, cara, prop: a.prop ? OBJ_MANO[a.prop] : null });
}
const OBJ_MANO = { libreta: `<g transform="rotate(-20)"><rect x="-30" y="-10" width="60" height="80" fill="#FBF6EA" stroke="#2A1E17" stroke-width="3"/></g>`, lapiz: `<rect x="-4" y="-30" width="8" height="60" fill="#E3B23C" stroke="#2A1E17" stroke-width="2"/>` };
function camEscena(e, k, d) {
  if (e.plano) { const a = (e.actores || []).find(x => x.quien === e.plano.de) || {}; const s = a.escala || 1; const ax = a.x || 540, ay = a.y || SUELO;
    const tipo = e.plano.tipo; const z = tipo === 'primer_plano' ? 2.9 / s : tipo === 'detalle' ? 4.4 / s : tipo === 'medio' ? 1.55 / s : 1;
    const ty = tipo === 'primer_plano' ? ay - 600 * s : tipo === 'detalle' ? ay - (e.plano.alto || 600) * s : ay - 420 * s;
    const dz = e.plano.empuje == null ? .07 : e.plano.empuje;
    return camAt([[0, ax + (e.plano.dx || 0), ty + (e.plano.dy || 0), z], [1, ax + (e.plano.dx || 0) + (e.plano.deriva || 0), ty + (e.plano.dy || 0), z * (1 + dz)]], k); }
  return camAt(e.camara || [[0, 540, 860, 1], [1, 540, 860, 1.06]], k);
}
function escenaRender(e) {
  return (lt, d) => {
    const k = cl(lt / d), t = lt; let cam = camEscena(e, k, d);
    if (e.sacudida) for (const sk of e.sacudida) { const dd = (k - sk) * d; if (dd >= 0 && dd < .3) cam = [cam[0] + Math.sin(dd * 90) * 10 * (1 - dd / .3), cam[1] + Math.cos(dd * 70) * 6 * (1 - dd / .3), cam[2], cam[3]]; }
    const capas = (ESC[e.escenario] || ESC.negro)(t, e.opc || {}); let s = TEXT_DEFS;
    let actoresHechos = false; const objs = (f) => (e.objetos || []).filter(o => !o.hud && (!o.capa || o.capa === 1) && f(o)).map(o => (o.tipo === 'publico' ? publico(o, t, k) : (OBJ[o.tipo] || (() => ''))(o, t, k))).join('');
    const actoresSVG = () => objs(o => !o.delante) + (e.actores || []).filter(a => !a.capa || a.capa === 1).map(a => dibujaActor(a, t, k, d)).join('') + objs(o => o.delante);
    for (const [dep, svgL] of capas) {
      if (dep > 1 && !actoresHechos) { s += CAM(cam, actoresSVG(), 1); actoresHechos = true; }
      const extra = (e.objetos || []).filter(o => !o.hud && o.capa === dep).map(o => (OBJ[o.tipo] || publico)(o, t, k)).join('') + (e.actores || []).filter(a => a.capa === dep).map(a => dibujaActor(a, t, k, d)).join('');
      const g = CAM(cam, svgL + extra, dep);
      s += dep >= 1.3 ? `<g filter="url(#dof2)">${g}</g>` : g;
      if (dep < .5 && e.bruma !== false && dep > 0) s += `<rect width="1080" height="1920" fill="${e.colorBruma || '#EADFC8'}" opacity=".16"/>`;
    }
    if (!actoresHechos) s += CAM(cam, actoresSVG(), 1);
    s += (e.objetos || []).filter(o => o.hud).map(o => (OBJ[o.tipo] || (() => ''))(o, t, k)).join('');
    for (const f of (e.efectos || [])) s += (FX[f] || (() => ''))(t);
    return s;
  };
}
let SC = []; let STRIPS_E = [];
function build() {
  const es = STORY.escenas; SC = [];
  for (let i = 0; i < es.length; i++) { const a = i === 0 ? 0 : ph(i), b = i + 1 < es.length ? ph(i + 1) : T + 1; SC.push([a, b, escenaRender(es[i]), es[i].entrada || 'fundido']); }
  if (STORY.cuentaAtrasEscena) { const cdE = escenaRender(STORY.cuentaAtrasEscena); let idx = SC.findIndex(x => x[0] >= CD[1] - .01);
    SC.forEach(x => { if (x[0] < CD[0] && x[1] > CD[0]) x[1] = CD[0]; }); if (idx < 0) idx = SC.length; SC.splice(idx, 0, [CD[0], idx < SC.length ? SC[idx][0] : T + 1, cdE, 'fundido']); }
  STRIPS = es.map((e, i) => [i === 0 ? 0 : ph(i), e.tira || '']).filter(x => x[1]);
  if (STORY.cuentaAtrasEscena) STRIPS.push([CD[0], 'PIENSA · PUEDES PAUSAR']); STRIPS.sort((a, b) => a[0] - b[0]);
  CH = []; (window.CAPPH || PH).forEach(([a, b, txt]) => { const ws = txt.split(' ').map(w => { let [t2, wt] = w.split('|'); const k = t2.includes('*'); t2 = t2.replace(/\*/g, ''); return { t: t2, k, w: +(wt || Math.max(2, t2.replace(/[^\wáéíóúñü]/gi, '').length + 1)) }; });
    const tot = ws.reduce((s, w) => s + w.w, 0); let acc = a; ws.forEach(w => { w.s = acc; acc += (b - a) * w.w / tot; });
    let cur = []; ws.forEach((w, i) => { cur.push(w); if (/[.,?:…»]$/.test(w.t) || cur.length == 3 || i == ws.length - 1) { CH.push(cur); cur = []; } }); });
  CH.forEach((c, i) => { c.start = c[0].s; c.end = i + 1 < CH.length ? Math.min(CH[i + 1][0].s, c[c.length - 1].s + 1.4) : T; });
}
let CH = []; build();
