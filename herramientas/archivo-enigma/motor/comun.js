/* ===== tira de papel (texto natural) y cuenta atrás ===== */
let STRIPS=[];
function strip(t){let txt='';let a=0;for(const s of STRIPS){if(t>=s[0])txt=s[1],a=s[0]}
  const p=eoc(pr(t,a,a+.45));
  let g=`<g transform="translate(0,${(-30*(1-p)).toFixed(1)})" opacity="${p.toFixed(2)}" filter="url(#soft)"><path d="M40,72 L900,64 L908,250 L46,258Z" fill="${N.paper}"/><path d="M40,72 L900,64 L908,250 L46,258Z" fill="${N.paper}" filter="url(#paperT)"/>`+
    `<text x="80" y="122" font-family="Playfair Display" font-weight="800" font-size="30" fill="#8a6a4a" letter-spacing="3">${CASE_LABEL}</text>`+
    `<text x="80" y="212" font-family="Playfair Display" font-weight="900" font-size="${Math.min(72,Math.floor(800/(txt.length*.66)))}" fill="${N.ink}">${txt}</text>`+
    `<rect x="80" y="232" width="${(780*cl(t/T)).toFixed(1)}" height="8" rx="4" fill="${N.warm}"/></g>`;
  return g}
function countdown(t){if(t<CD[0]-.3||t>CD[1]+.6)return'';const a=cl(1-Math.abs(cl(t,CD[0],CD[1])-t)*2);const left=Math.max(0,Math.ceil(CD[1]-t));const frac=cl((t-CD[0])/(CD[1]-CD[0]));
  const op=cl((t-(CD[0]-.3))/.3)*cl((CD[1]+.6-t)/.4);const R=92,C2=2*Math.PI*R;
  return `<g transform="translate(860,1140)" opacity="${op.toFixed(2)}" filter="url(#soft)"><circle r="120" fill="${N.paper}"/><circle r="120" fill="${N.paper}" filter="url(#paperT)"/><circle r="${R}" fill="none" stroke="${N.paper2}" stroke-width="14"/><circle r="${R}" fill="none" stroke="${N.warm}" stroke-width="14" stroke-dasharray="${(C2*(1-frac)).toFixed(1)} ${C2.toFixed(1)}" transform="rotate(-90)" stroke-linecap="round"/><text y="34" font-family="Playfair Display" font-weight="900" font-size="100" fill="${N.ink}" text-anchor="middle">${left}</text><text y="160" font-family="Inter" font-weight="900" font-size="22" fill="${N.paper}" text-anchor="middle" stroke="${N.ink}" stroke-width="6" paint-order="stroke">PAUSA SI NECESITAS MÁS</text></g>`}

function polaroid(x,y,r,s,inner,cap2){return `<g transform="${tr(x,y,s,r)}" filter="url(#soft)"><rect x="-200" y="-220" width="400" height="470" fill="#FBF6EA" ${O}/><svg x="-180" y="-200" width="360" height="360" viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid slice"><g transform="translate(0,-420)">${inner}</g></svg><rect x="-180" y="-200" width="360" height="360" fill="none" stroke="${N.ink}" stroke-width="3"/><text y="215" font-family="Playfair Display" font-weight="900" font-size="40" fill="${N.ink}" text-anchor="middle">${cap2}</text></g>`}
function logoSm(x,y,s){return `<g transform="${tr(x,y,s)}"><circle r="70" fill="${BR.y}" stroke="${BR.i}" stroke-width="7"/><path d="M0,-44 a26,26 0 0 1 16,46 l12,38 h-56 l12,-38 a26,26 0 0 1 16,-46z" fill="${BR.i}"/><g transform="translate(0,-18)"><path d="M-22,0 Q0,-15 22,0 Q0,15 -22,0Z" fill="${BR.k}"/><circle r="8" fill="${BR.c}"/><circle r="3.6" fill="${BR.i}"/></g></g>`}

