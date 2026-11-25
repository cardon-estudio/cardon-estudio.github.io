/* ===== Motor 2 · bucle de render con transiciones variadas ===== */
const svg = document.getElementById('v'), hud = document.getElementById('hud'), cap = document.getElementById('cap');
const GRANO = `<defs>${[0, 1, 2, 3].map(i => `<filter id="grn${i}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="${i * 13 + 1}" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>`).join('')}<filter id="mbx" x="-20%" y="0" width="140%" height="100%"><feGaussianBlur stdDeviation="28 0"/></filter></defs>`;
let lastKey = null;
window.render = function (t) {
  const i = SC.findIndex(([a, b]) => t >= a && t < b); const sc = SC[i < 0 ? SC.length - 1 : i]; const tipo = sc[3] || 'fundido';
  let body = sc[2](t - sc[0], sc[1] - sc[0]), out = '';
  const lt = t - sc[0], prv = i > 0 ? SC[i - 1] : null;
  if (prv && tipo === 'fundido' && lt < .4) { const k = lt / .4; out = `<g opacity="${(1 - k).toFixed(2)}" filter="url(#bl)">${prv[2](sc[0] - prv[0] - .001, prv[1] - prv[0])}</g>`; body = `<g opacity="${eio(k).toFixed(2)}">${body}</g>`; }
  if (prv && tipo === 'barrido' && lt < .3) { const k = eio(lt / .3); out = `<g transform="translate(${(-1300 * k).toFixed(0)},0)" filter="url(#mbx)">${prv[2](sc[0] - prv[0] - .001, prv[1] - prv[0])}</g>`; body = `<g transform="translate(${(1300 * (1 - k)).toFixed(0)},0)" ${k < .9 ? 'filter="url(#mbx)"' : ''}>${body}</g>`; }
  if (prv && tipo === 'zoom' && lt < .4) { const k = eoc(lt / .4); body = `<g opacity="${k.toFixed(2)}" transform="translate(540,860) scale(${(1.25 - .25 * k).toFixed(3)}) translate(-540,-860)">${body}</g>`; out = `<g opacity="${(1 - k).toFixed(2)}">${prv[2](sc[0] - prv[0] - .001, prv[1] - prv[0])}</g>`; }
  const fq = Math.floor(t * 15) % 4;
  svg.innerHTML = DEFS + GRANO + out + body + `<rect width="1080" height="1920" fill="url(#vig)" opacity=".85"/><rect width="1080" height="1920" filter="url(#grn${fq})" opacity=".07" style="mix-blend-mode:overlay"/>`;
  hud.innerHTML = DEFS + strip(t) + logoSm(995, 160, .55) + countdown(t);
  const ch = CH.find(c => t >= c.start && t < c.end);
  if (!ch) { cap.style.display = 'none'; } else { cap.style.display = 'block'; const key = CH.indexOf(ch) + ':' + ch.filter(w => t >= w.s).length;
    if (key !== lastKey) { cap.innerHTML = ch.map(w => `<span style="display:${t >= w.s ? 'inline-block' : 'none'}">${w.t}</span>`).join(''); lastKey = key; }
    let act = -1; ch.forEach((w, j) => { if (t >= w.s) act = j; });
    cap.querySelectorAll('span').forEach((sp, j) => { if (t < ch[j].s) return; const p = pop(t, ch[j].s, .18); sp.style.transform = `scale(${(.75 + .25 * p).toFixed(3)})`; sp.className = (j == act ? 'on' : '') + (ch[j].k ? ' k' : ''); }); }
};
window.render(0);
</script></body></html>
