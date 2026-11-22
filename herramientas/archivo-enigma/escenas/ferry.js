const CASE_LABEL='CASO Nº 003 · EL FERRY QUE LLEGA ANTES';
const W={sea1:'#2F6F86',sea2:'#1E4E63',sea3:'#5FA3B5',foam:'#E8F4F2',sky1:'#8EC5E0',sky2:'#F4E2B8',sand:'#D9C08C',dock:'#7A5536',dock2:'#5C3F28',hull:'#F2EEE4',hullB:'#2F5D8C',red:'#C8312B',yel:'#F1BF2A',pgreen:'#1F7A3A',pred:'#C8312B',lu1:'#D9A441',lu2:'#B8862F',luHair:'#3B2418',skirt:'#2E7A74',ab1:'#7A5C8E',abHair:'#D8D4CC',cake:'#F7E3D0',cake2:'#E59AA8'};
const OO=`stroke="${N.ink}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;

/* ===== Lucía (mismo diseño en todo el vídeo) ===== */
function lucia(o){const {x=0,y=0,s=1,flip=1,pose='stand',t=0,face='neutral',cake=true,look=0}=o;const tq=q2(t);
  let lA=0,lB=0,aF=20,aB=-14,bob=0;
  if(pose==='walk'){const p=tq*7;lA=Math.sin(p)*22;lB=-lA;aB=-Math.sin(p)*24;bob=-Math.abs(Math.cos(p))*5}
  if(pose==='wave'){aB=-160+Math.sin(t*8)*18}
  if(pose==='surprise'){aB=-150}
  const limb=(x0,y0,ang,len,w,col)=>{const ex=x0+Math.sin(ang*Math.PI/180)*len,ey=y0+Math.cos(ang*Math.PI/180)*len;return {svg:`<line x1="${x0}" y1="${y0}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${N.ink}" stroke-width="${w+8}" stroke-linecap="round"/><line x1="${x0}" y1="${y0}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`,ex,ey}};
  const LB=limb(-14,-90,lB,84,18,'#E2B48C'),LA=limb(14,-90,lA,84,18,'#E2B48C');
  const boot=e=>`<path d="M${(e.ex-12).toFixed(1)},${(e.ey+4).toFixed(1)} v-18 h20 v10 q16,0 16,8z" fill="#6B4A33" ${OO}/>`;
  const AB=limb(-30,-218,aB,70,15,W.lu1),AF=limb(30,-218,aF,70,15,W.lu1);
  let g=LB.svg+boot(LB)+LA.svg+boot(LA);
  g+=AB.svg+`<circle cx="${AB.ex.toFixed(1)}" cy="${AB.ey.toFixed(1)}" r="10" fill="#E8C29C" ${OO}/>`;
  g+=`<path d="M-46,-96 L46,-96 L30,-160 L-30,-160Z" fill="${W.skirt}" ${OO}/>`;
  g+=`<path d="M-36,-230 Q0,-246 36,-230 L40,-150 L-40,-150Z" fill="${W.lu1}" ${OO}/><path d="M-36,-230 Q-30,-190 -40,-150 L-20,-150 Q-22,-200 -14,-238Z" fill="${W.lu2}" opacity=".6"/>`;
  g+=[-210,-188,-166].map(yy=>`<circle cx="0" cy="${yy}" r="4" fill="#F4EBD6" stroke="${N.ink}" stroke-width="2"/>`).join('');
  const hy=-282;
  g+=`<path d="M-50,${hy+10} Q-62,${hy-60} 0,${hy-66} Q62,${hy-60} 50,${hy+10} Q58,${hy+50} 40,${hy+60} L-40,${hy+60} Q-58,${hy+50} -50,${hy+10}Z" fill="${W.luHair}" ${OO}/>`;
  g+=`<ellipse cx="0" cy="${hy}" rx="38" ry="42" fill="#E8C29C" ${OO}/>`;
  for(let i=0;i<7;i++)g+=`<circle cx="${-40+i*13}" cy="${hy-40+Math.abs(i-3)*5}" r="13" fill="${W.luHair}"/>`;
  const blink=((t+.4)%3.2)>3.08;const lx=look*5;
  if(face==='surprise')g+=`<circle cx="${-14+lx}" cy="${hy-2}" r="7" fill="#fff" stroke="${N.ink}" stroke-width="3"/><circle cx="${14+lx}" cy="${hy-2}" r="7" fill="#fff" stroke="${N.ink}" stroke-width="3"/><circle cx="${-14+lx}" cy="${hy-2}" r="3" fill="${N.ink}"/><circle cx="${14+lx}" cy="${hy-2}" r="3" fill="${N.ink}"/><ellipse cx="0" cy="${hy+22}" rx="6" ry="8" fill="${N.ink}"/>`;
  else g+=(blink?`<path d="M${-20+lx},${hy-2} h12 M${8+lx},${hy-2} h12" ${OO}/>`:`<circle cx="${-14+lx}" cy="${hy-2}" r="5" fill="${N.ink}"/><circle cx="${14+lx}" cy="${hy-2}" r="5" fill="${N.ink}"/>`)+`<path d="M-9,${hy+18} q9,${face==='smile'?10:5} 18,0" fill="none" stroke="${N.ink}" stroke-width="3.5"/>`;
  g+=`<circle cx="-26" cy="${hy+12}" r="7" fill="#E59AA8" opacity=".55"/><circle cx="26" cy="${hy+12}" r="7" fill="#E59AA8" opacity=".55"/><circle cx="-38" cy="${hy+10}" r="5" fill="${W.yel}" stroke="${N.ink}" stroke-width="2"/>`;
  g+=AF.svg+`<circle cx="${AF.ex.toFixed(1)}" cy="${AF.ey.toFixed(1)}" r="10" fill="#E8C29C" ${OO}/>`;
  if(cake)g+=`<g transform="translate(${(AF.ex+6).toFixed(1)},${(AF.ey+6).toFixed(1)})"><rect x="-40" y="-56" width="80" height="62" rx="4" fill="#F4EBD6" ${OO}/><path d="M-40,-56 L0,-74 L40,-56" fill="#E6D7B8" ${OO}/><path d="M-6,-74 v-14 m0,0 q-14,-6 -18,4 q12,4 18,-4 q14,-6 18,4 q-12,4 -18,-4" fill="${W.cake2}" ${OO}/><line x1="-40" y1="-30" x2="40" y2="-30" stroke="${W.cake2}" stroke-width="6"/></g>`;
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(s*flip).toFixed(3)},${s.toFixed(3)})"><ellipse cx="0" cy="4" rx="54" ry="9" fill="#000" opacity=".2"/><g transform="translate(0,${bob.toFixed(1)})">${g}</g></g>`}
function abuela(x,y,s,t,pose='stand'){const blink=((t+1.1)%3.4)>3.28;const arm=pose==='hug'?-120:pose==='wave'?-150+Math.sin(t*7)*14:-12;
  return `<g transform="${tr(x,y,s)}"><ellipse cx="0" cy="4" rx="60" ry="10" fill="#000" opacity=".2"/><path d="M-56,0 L-46,-190 Q0,-214 46,-190 L56,0Z" fill="${W.ab1}" ${OO}/><path d="M-50,-180 Q0,-140 50,-180 L44,-120 Q0,-90 -44,-120Z" fill="#9B7BB0" ${OO}/>
  <g transform="translate(-44,-180) rotate(${arm})"><line x1="0" y1="0" x2="0" y2="76" stroke="${N.ink}" stroke-width="24" stroke-linecap="round"/><line x1="0" y1="0" x2="0" y2="76" stroke="${W.ab1}" stroke-width="16" stroke-linecap="round"/><circle cy="80" r="11" fill="#EBC6A2" ${OO}/></g>
  <circle cx="0" cy="-246" r="46" fill="#EBC6A2" ${OO}/><circle cx="0" cy="-300" r="24" fill="${W.abHair}" ${OO}/><path d="M-46,-250 Q-40,-296 0,-294 Q40,-296 46,-250 Q30,-272 0,-270 Q-30,-272 -46,-250Z" fill="${W.abHair}" ${OO}/>
  ${blink?`<path d="M-26,-250 h14 M12,-250 h14" ${OO}/>`:`<circle cx="-18" cy="-250" r="5" fill="${N.ink}"/><circle cx="18" cy="-250" r="5" fill="${N.ink}"/>`}<circle cx="-18" cy="-250" r="13" fill="none" stroke="${N.ink}" stroke-width="3"/><circle cx="18" cy="-250" r="13" fill="none" stroke="${N.ink}" stroke-width="3"/>
  <path d="M-12,-222 q12,10 24,0" fill="none" stroke="${N.ink}" stroke-width="4"/><circle cx="-30" cy="-232" r="7" fill="#E59AA8" opacity=".55"/><circle cx="30" cy="-232" r="7" fill="#E59AA8" opacity=".55"/></g>`}

/* ===== decorados ===== */
function clock(x,y,r,h,m,label='',lc=N.ink){const ha=((h%12)+m/60)*30,ma=m*6;let g=`<circle r="${r+16}" fill="#3B2F28" ${OO}/><circle r="${r}" fill="#FBF6EA" ${OO}/><circle r="${r}" fill="#FBF6EA" filter="url(#paperT)"/>`;
  for(let i=0;i<12;i++){const a=i*30*Math.PI/180;g+=`<line x1="${(Math.sin(a)*r*.82).toFixed(1)}" y1="${(-Math.cos(a)*r*.82).toFixed(1)}" x2="${(Math.sin(a)*r*.94).toFixed(1)}" y2="${(-Math.cos(a)*r*.94).toFixed(1)}" stroke="${N.ink}" stroke-width="${i%3?4:9}"/>`}
  g+=`<line x1="0" y1="0" x2="${(Math.sin(ha*Math.PI/180)*r*.5).toFixed(1)}" y2="${(-Math.cos(ha*Math.PI/180)*r*.5).toFixed(1)}" stroke="${N.ink}" stroke-width="${r*.09}" stroke-linecap="round"/><line x1="0" y1="0" x2="${(Math.sin(ma*Math.PI/180)*r*.78).toFixed(1)}" y2="${(-Math.cos(ma*Math.PI/180)*r*.78).toFixed(1)}" stroke="${N.ink}" stroke-width="${r*.05}" stroke-linecap="round"/><circle r="${r*.07}" fill="${W.red}"/>`;
  if(label)g+=`<g transform="translate(0,${r+70})"><rect x="-${label.length*18+30}" y="-36" width="${label.length*36+60}" height="64" rx="10" fill="${N.paper}" ${OO}/><text y="12" font-family="Playfair Display" font-weight="900" font-size="40" fill="${lc}" text-anchor="middle">${label}</text></g>`;
  return `<g transform="translate(${x},${y})" filter="url(#soft)">${g}</g>`}
const hm=(H,M)=>`${H}:${String(M).padStart(2,'0')}`;
function flag(x,y,s,t,kind,glow=0){const wv=k=>Math.sin(t*4+k)*8;const W2=180,H2=120;
  const path=(y0,y1,x0=0,x1=W2)=>`M${x0},${y0+wv(x0/60)} Q${(x0+x1)/2},${y0+wv((x0+x1)/120)*1.6} ${x1},${y0+wv(x1/60)} L${x1},${y1+wv(x1/60)} Q${(x0+x1)/2},${y1+wv((x0+x1)/120)*1.6} ${x0},${y1+wv(x0/60)}Z`;
  let f='';if(kind==='es'){f=`<path d="${path(0,H2)}" fill="${W.red}"/><path d="${path(H2*.25,H2*.75)}" fill="${W.yel}"/>`}
  else{f=`<path d="${path(0,H2,0,W2*.4)}" fill="${W.pgreen}"/><path d="${path(0,H2,W2*.4,W2)}" fill="${W.pred}"/><circle cx="${W2*.4}" cy="${H2/2+wv(1.2)}" r="22" fill="none" stroke="${W.yel}" stroke-width="7"/>`}
  return `<g transform="${tr(x,y,s)}">${glow?`<ellipse cx="90" cy="60" rx="${150}" ry="110" fill="${N.warm}" opacity="${(.35*glow).toFixed(2)}" filter="url(#glow)"/>`:''}<line x1="0" y1="-20" x2="0" y2="560" stroke="${N.ink}" stroke-width="14"/><line x1="0" y1="-20" x2="0" y2="560" stroke="#9AA0A8" stroke-width="7"/><circle cx="0" cy="-26" r="10" fill="${N.brass}" ${OO}/><g filter="url(#soft)">${f}<path d="${path(0,H2)}" fill="none" ${OO}/></g></g>`}
function water(t,y0,h=900){let s=`<defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${W.sea3}"/><stop offset="1" stop-color="${W.sea2}"/></linearGradient></defs><rect x="-600" y="${y0}" width="2400" height="${h}" fill="url(#wg)"/>`;
  for(let r=0;r<9;r++){const yy=y0+20+r*r*9;let d=`M-600,${yy}`;for(let x=-600;x<=1800;x+=60)d+=` Q${x+30},${(yy+Math.sin(t*2+x/80+r)*6).toFixed(1)} ${x+60},${yy}`;s+=`<path d="${d}" fill="none" stroke="${W.foam}" stroke-width="${2+r*.4}" opacity="${(.25+r*.04).toFixed(2)}"/>`}
  return s}
function ferry(x,y,s,t){const rock=Math.sin(t*2)*1.5;return `<g transform="${tr(x,y+Math.sin(t*2.4)*5,s,rock)}" filter="url(#soft)"><path d="M-260,0 L260,0 L220,90 L-230,90Z" fill="${W.hull}" ${OO}/><rect x="-250" y="30" width="490" height="22" fill="${W.hullB}"/><path d="M-260,0 L260,0 L220,90 L-230,90Z" fill="none" ${OO}/>
  <rect x="-170" y="-110" width="300" height="110" rx="10" fill="#FBF6EA" ${OO}/>${[0,1,2,3].map(i=>`<rect x="${-150+i*70}" y="-90" width="50" height="40" rx="6" fill="#9CC3E0" ${OO}/>`).join('')}<rect x="-40" y="-170" width="90" height="60" fill="#FBF6EA" ${OO}/><rect x="60" y="-160" width="34" height="50" fill="${W.red}" ${OO}/>
  <text x="-10" y="80" font-family="Playfair Display" font-weight="900" font-size="34" fill="${W.hullB}" text-anchor="middle">GUADIANA</text></g>`}
function dock(x0,x1,y){let s=`<rect x="${x0}" y="${y}" width="${x1-x0}" height="40" fill="${W.dock}" ${OO}/>`;for(let x=x0+20;x<x1;x+=110)s+=`<rect x="${x}" y="${y+40}" width="26" height="300" fill="${W.dock2}" ${OO}/>`;for(let x=x0;x<x1;x+=60)s+=`<line x1="${x}" y1="${y}" x2="${x}" y2="${y+40}" stroke="${W.dock2}" stroke-width="3"/>`;return s}
function town(y,tint=0){let s='';for(let i=0;i<9;i++){const x=-300+i*190,h=160+rnd(i+20)*160;s+=`<rect x="${x}" y="${y-h}" width="170" height="${h}" fill="${['#F4EBD6','#EADCC0','#F2D7A6','#E9C6B0'][i%4]}" ${OO}/><path d="M${x-10},${y-h} L${x+85},${y-h-60} L${x+180},${y-h}Z" fill="#B5654A" ${OO}/>${[0,1].map(c=>`<rect x="${x+30+c*70}" y="${y-h+40}" width="40" height="54" fill="#5C7A9A" ${OO}/>`).join('')}`}return s}
function sky(id,a,b){return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect x="-600" y="-600" width="2400" height="2600" fill="url(#${id})"/>`}
function gulls(t,n=4){let s='';for(let i=0;i<n;i++){const x=((t*80+i*300)%1500)-200,y=380+rnd(i)*200+Math.sin(t*2+i)*20,f=Math.sin(t*10+i)*12;s+=`<path d="M${x-30},${y} q15,${-12-f} 30,0 q15,${-12-f} 30,0" fill="none" stroke="${N.ink}" stroke-width="5" stroke-linecap="round"/>`}return s}
function clouds(t){return [0,1,2].map(i=>`<g transform="translate(${((t*14+i*520)%1700)-300},${260+i*90})" opacity=".9"><ellipse rx="130" ry="44" fill="#FBF6EA"/><ellipse cx="-70" cy="10" rx="80" ry="34" fill="#FBF6EA"/><ellipse cx="80" cy="12" rx="90" ry="32" fill="#FBF6EA"/></g>`).join('')}

/* ===== ESCENAS ===== */
function scHook(lt,d){ // 12:00 al salir · fiesta a las 11:30
  const cam=camAt([[0,540,900,1.25],[d*.45,540,900,1.05],[d,540,880,1.08]],lt);
  let w=sky('sh1',W.sky1,W.sky2)+clouds(lt)+town(980)+water(lt,1000)+dock(-200,700,1060);
  w+=flag(80,560,1,lt,'es')+clock(540,560,150,12,0,'SALIDA');
  w+=lucia({x:420,y:1060,s:1.05,pose:'walk',t:lt,look:1});
  const inv=pop(lt,d*.42,.5);
  if(inv>0)w+=`<g transform="${tr(800,1120,inv,6)}" filter="url(#soft)">${paperRect(-200,-150,400,300,6,'#FBF0E0')}<text y="-70" font-family="Playfair Display" font-weight="900" font-size="42" fill="${W.cake2}" text-anchor="middle">¡FIESTA!</text><text y="-20" font-family="Playfair Display" font-weight="800" font-size="30" fill="${N.ink}" text-anchor="middle">Abuela · 90 años</text><text y="70" font-family="Playfair Display" font-weight="900" font-size="84" fill="${N.ink}" text-anchor="middle">11:30</text></g>`;
  return CAM(cam,w)}
function scTitle(lt,d){let s=woodRect(0,0,1080,1920)+`<rect width="1080" height="1920" fill="url(#lamp)" opacity=".8"/>`;const p=eoc(pr(lt,0,.6));
  s+=`<g transform="translate(540,${(900-60*(1-p)).toFixed(0)}) rotate(${(-4+2*Math.sin(lt)).toFixed(2)}) scale(${(.92+.08*p).toFixed(3)})" filter="url(#soft)">${paperRect(-400,-230,800,460,6)}<text y="-60" font-family="Playfair Display" font-weight="900" font-size="96" fill="${N.ink}" text-anchor="middle">UN ACERTIJO</text><text y="60" font-family="Playfair Display" font-weight="900" font-size="96" fill="${N.scarf}" text-anchor="middle">AL DÍA</text><line x1="-200" y1="120" x2="200" y2="120" stroke="${N.ink}" stroke-width="4"/><text y="170" font-family="Inter" font-weight="800" font-size="30" fill="#8a6a4a" text-anchor="middle" letter-spacing="6">Nº 003</text></g>`;
  s+=`<g transform="translate(${(820+30*Math.sin(lt*2)).toFixed(0)},1220) rotate(30)" filter="url(#soft)"><rect x="-12" y="-170" width="24" height="300" rx="6" fill="#E3B23C" ${OO}/><polygon points="-12,130 12,130 0,170" fill="${N.skin}" ${OO}/><rect x="-12" y="-170" width="24" height="40" fill="#D9776B" ${OO}/></g>`;return s}
function scAbuela(lt,d){ // Lucía con la tarta y la foto de la abuela de 90
  const cam=camAt([[0,540,960,1.2],[d,560,940,1.32]],lt);
  let w=`<rect x="-300" y="-300" width="1680" height="2400" fill="#EADCC0"/>`;for(let i=0;i<16;i++)w+=`<rect x="${-300+i*110}" y="-300" width="55" height="1600" fill="#D8C6A2" opacity=".35"/>`;
  w+=woodRect(-300,1300,1680,900);
  w+=`<g transform="translate(300,620) rotate(-3)" filter="url(#soft)"><rect x="-150" y="-180" width="300" height="360" fill="#7A5536" ${OO}/><rect x="-125" y="-155" width="250" height="310" fill="#F2E6CC"/>${abuela(0,140,.62,lt)}<text y="-120" font-family="Playfair Display" font-weight="900" font-size="34" fill="${N.ink}" text-anchor="middle">ABUELA</text></g>`;
  const n=pop(lt,.4,.5);if(n>0)w+=`<g transform="${tr(760,560,n,8)}" filter="url(#soft)"><circle r="120" fill="${W.cake2}" ${OO}/><text y="40" font-family="Playfair Display" font-weight="900" font-size="120" fill="#FBF6EA" text-anchor="middle">90</text></g>`;
  w+=lucia({x:560,y:1320,s:1.4,pose:'stand',t:lt,face:'smile',look:-1});
  return CAM(cam,w)}
function scBoard(lt,d){ // coge el ferry a las 12:00 en punto (bandera española)
  const cam=camAt([[0,600,880,1.0],[d,520,840,1.18]],lt);
  let w=sky('sh2',W.sky1,W.sky2)+clouds(lt)+gulls(lt)+town(950)+water(lt,980)+dock(-300,560,1040);
  w+=ferry(760,1050,1.05,lt)+flag(-20,520,1,lt,'es')+clock(300,520,120,12,0,'12:00');
  w+=lucia({x:200+pr(lt,0,d)*260,y:1040,s:1.0,pose:'walk',t:lt,look:1});
  return CAM(cam,w)}
function scCross(lt,d){ // el viaje dura 15 minutos
  const p=pr(lt,0,d);const cam=[540+p*180,900,1.0];
  let w=sky('sh3',W.sky1,W.sky2)+clouds(lt)+gulls(lt,5);
  w+=`<g opacity=".9">${town(940)}</g>`+water(lt,950);
  w+=`<path d="M-600,1000 L-80,1000 L-60,960 L-600,960Z" fill="${W.sand}"/><path d="M1300,1000 L1800,1000 L1800,960 L1320,960Z" fill="${W.sand}"/>`;
  w+=flag(-180,560,.8,lt,'es')+flag(1350,560,.8,lt,'pt');
  w+=ferry(60+p*900,1080,.8,lt)+`<path d="M${60+p*900-220},1130 q-80,10 -200,0" fill="none" stroke="${W.foam}" stroke-width="10" opacity=".7"/>`;
  let s=CAM(cam,w);
  const mins=Math.min(15,Math.floor(p*15.99));
  s+=`<g transform="translate(540,1180)" filter="url(#soft)"><rect x="-170" y="-60" width="340" height="110" rx="20" fill="${N.paper}" ${OO}/><text y="22" font-family="Playfair Display" font-weight="900" font-size="68" fill="${N.ink}" text-anchor="middle">⏱ ${mins} MIN</text></g>`;
  return s}
function scArrive(lt,d){ // al bajar, el reloj marca 11:15 (bandera portuguesa)
  const cam=camAt([[0,540,1000,1.0],[d*.5,560,760,1.35],[d,560,740,1.4]],lt);
  let w=sky('sh4',W.sky1,W.sky2)+clouds(lt)+town(950)+water(lt,980)+dock(300,1500,1040);
  w+=flag(1000,520,1,lt,'pt')+clock(640,520,130,11,15,'LLEGADA');
  w+=ferry(-60,1050,1.0,lt)+lucia({x:420,y:1040,s:1.05,pose:'surprise',t:lt,face:'surprise',look:1});
  return CAM(cam,w)}
function scQuestion(lt,d){let s=woodRect(0,0,1080,1920)+`<rect width="1080" height="1920" fill="url(#lamp)" opacity=".8"/>`;const p=eob(cl(lt/.6));
  s+=`<g transform="translate(540,760) rotate(-3) scale(${(.9+.1*p).toFixed(3)})" filter="url(#soft)">${paperRect(-420,-260,840,520,6)}<text y="-70" font-family="Playfair Display" font-weight="900" font-size="150" fill="${N.ink}" text-anchor="middle">¿CÓMO?</text><text y="80" font-family="Playfair Display" font-weight="900" font-size="88" fill="${N.ink}" text-anchor="middle">12:00 <tspan fill="${N.scarf}">→</tspan> 11:15</text><text y="170" font-family="Inter" font-weight="800" font-size="34" fill="#8a6a4a" text-anchor="middle">VIAJE DE 15 MINUTOS</text></g>`;return s}
let PCACHE=null;
function scCountdown(lt,d){let s=woodRect(0,0,1080,1920)+`<rect width="1080" height="1920" fill="url(#lamp)" opacity=".9"/>`;
  if(!PCACHE)PCACHE=[sky('pa',W.sky1,W.sky2)+water(0,980)+dock(-300,700,1040)+flag(160,560,1.2,0,'es')+clock(620,640,170,12,0),
    sky('pb',W.sky1,W.sky2)+water(0,950)+ferry(540,1060,1.1,0)+`<text x="540" y="760" font-family="Playfair Display" font-weight="900" font-size="120" fill="${N.ink}" text-anchor="middle">15 MIN</text>`,
    sky('pc',W.sky1,W.sky2)+water(0,980)+dock(300,1500,1040)+flag(780,560,1.2,0,'pt')+clock(420,640,170,11,15)];
  const dr=k=>Math.sin(lt*.8+k)*1.5;
  s+=polaroid(300,640,-8+dr(0),1.05,PCACHE[0],'SALE 12:00')+polaroid(780,720,7+dr(1),1.0,PCACHE[1],'15 MINUTOS')+polaroid(420,1180,4+dr(2),1.0,PCACHE[2],'LLEGA 11:15');
  const tg=[[300,640],[780,720],[420,1180]][Math.floor(lt/3.3)%3];const hx=tg[0]+120+Math.sin(lt*2)*10,hy=tg[1]+200;
  s+=`<g transform="translate(${hx},${hy}) rotate(-35)" filter="url(#soft)"><rect x="-30" y="0" width="60" height="260" rx="20" fill="${W.lu1}" ${OO}/><path d="M-26,0 q-6,-40 10,-56 v-60 q0,-14 12,-14 q12,0 12,14 v50 q30,-6 32,20 q2,26 -10,46z" fill="#E8C29C" ${OO}/></g>`;return s}
function scFlags(lt,d){ // fíjate en las banderas
  const cam=camAt([[0,540,860,1.0],[d,540,820,1.12]],lt);const g=pr(lt,.4,1.0);
  let w=sky('sh5',W.sky1,W.sky2)+clouds(lt)+water(lt,1020);
  w+=dock(-300,330,1080)+dock(750,1400,1080)+flag(150,560,1.25,lt,'es',g)+flag(830,560,1.25,lt,'pt',g);
  w+=ferry(540,1110,.55,lt);
  return CAM(cam,w)}
function scMap(lt,d){ // mapa: Ayamonte (España) → Vila Real (Portugal)
  const cam=camAt([[0,540,860,.95],[d,540,860,1.12]],lt);
  let p=`<g transform="rotate(-2,540,860)" filter="url(#soft)">${paperRect(70,300,940,1150,10,'#F2E6CC')}`;
  p+=`<path d="M70,300 L520,300 C500,520 600,640 540,860 C480,1080 560,1250 520,1450 L70,1450Z" fill="#DDE8C8" opacity=".8"/><path d="M1010,300 L640,300 C620,520 720,640 660,860 C600,1080 680,1250 640,1450 L1010,1450Z" fill="#F0DDB2" opacity=".8"/>`;
  p+=`<path d="M580,300 C560,520 660,640 600,860 C540,1080 620,1250 580,1450" fill="none" stroke="${W.sea3}" stroke-width="90" stroke-linecap="round"/><path d="M580,300 C560,520 660,640 600,860 C540,1080 620,1250 580,1450" fill="none" stroke="${W.sea1}" stroke-width="40" opacity=".5"/>`;
  p+=`<text x="600" y="640" transform="rotate(-80,600,640)" font-family="Playfair Display" font-weight="800" font-size="40" fill="#F4EBD6" letter-spacing="8">GUADIANA</text>`;
  p+=`<text x="290" y="460" font-family="Playfair Display" font-weight="900" font-size="64" fill="${W.pgreen}" text-anchor="middle">PORTUGAL</text><text x="830" y="460" font-family="Playfair Display" font-weight="900" font-size="64" fill="${W.red}" text-anchor="middle">ESPAÑA</text>`;
  const a=pop(lt,.2,.4),b=pop(lt,.9,.4);
  p+=`<g transform="${tr(820,900,a)}"><circle r="22" fill="${W.red}" ${OO}/><text x="0" y="80" font-family="Playfair Display" font-weight="900" font-size="46" fill="${N.ink}" text-anchor="middle">AYAMONTE</text></g>`;
  p+=`<g transform="${tr(330,960,b)}"><circle r="22" fill="${W.pgreen}" ${OO}/><text x="0" y="80" font-family="Playfair Display" font-weight="800" font-size="36" fill="${N.ink}" text-anchor="middle">VILA REAL DE</text><text x="0" y="124" font-family="Playfair Display" font-weight="800" font-size="36" fill="${N.ink}" text-anchor="middle">SANTO ANTÓNIO</text></g>`;
  const r=pr(lt,.9,2.4);p+=`<path d="M800,900 Q600,860 352,955" fill="none" stroke="${N.scarf}" stroke-width="10" stroke-dasharray="${(520*r).toFixed(0)} 999" stroke-linecap="round"/>`;
  p+=`</g>`;return CAM(cam,p)}
function scClocks(lt,d,eq=false){ // en Portugal es una hora menos
  let s=`<rect width="1080" height="1920" fill="#EADCC0"/><rect width="1080" height="1920" fill="#EADCC0" filter="url(#paperT)"/>`;
  const k=eio(pr(lt,.5,1.6));const ptH=12-k,ptM=15;
  s+=flag(110,380,.75,lt,'es')+flag(640,380,.75,lt,'pt');
  s+=clock(300,860,190,12,15,'ESPAÑA',W.red)+clock(790,860,190,Math.floor(ptH),ptM+(ptH%1)*60,'PORTUGAL',W.pgreen);
  if(eq){const e=pop(lt,.2,.5);if(e>0)s+=`<g transform="${tr(540,1230,e)}" filter="url(#soft)"><rect x="-380" y="-70" width="760" height="130" rx="18" fill="${N.paper}" ${OO}/><text y="22" font-family="Playfair Display" font-weight="900" font-size="72" fill="${N.ink}" text-anchor="middle">12:15 <tspan fill="${N.scarf}">− 1 h</tspan> = 11:15</text></g>`}
  else{const e=pop(lt,1.6,.5);if(e>0)s+=`<g transform="${tr(540,1230,e,-3)}" filter="url(#soft)"><rect x="-300" y="-70" width="600" height="130" rx="18" fill="${N.paper}" ${OO}/><text y="22" font-family="Playfair Display" font-weight="900" font-size="72" fill="${N.scarf}" text-anchor="middle">−1 HORA</text></g>`}
  return s}
function scEq(lt,d){return scClocks(lt+2,d,true)}
function scClose(lt,d){ // fiesta: abuela + Lucía con la tarta + caso cerrado
  const cam=camAt([[0,540,980,1.15],[d,540,960,1.05]],lt);
  let w=`<rect x="-300" y="-300" width="1680" height="2400" fill="#F2E2C4"/>`+woodRect(-300,1300,1680,900);
  for(let i=0;i<9;i++){const x=-60+i*150;w+=`<path d="M${x},360 l40,70 l40,-70z" fill="${[W.cake2,W.yel,W.sea3][i%3]}" ${OO}/>`}w+=`<path d="M-100,360 Q540,420 1180,360" fill="none" stroke="${N.ink}" stroke-width="4"/>`;
  w+=abuela(330,1320,1.25,lt,'hug')+lucia({x:700,y:1320,s:1.3,pose:'stand',t:lt,face:'smile',look:-1});
  w+=`<g transform="translate(540,1280)" filter="url(#soft)"><rect x="-260" y="0" width="520" height="30" fill="#7A5536" ${OO}/><rect x="-90" y="-110" width="180" height="110" rx="10" fill="${W.cake}" ${OO}/><path d="M-90,-80 q22,20 45,0 q22,20 45,0 q22,20 45,0 q22,20 45,0" fill="none" stroke="${W.cake2}" stroke-width="10"/><text y="-140" font-family="Playfair Display" font-weight="900" font-size="64" fill="${W.cake2}" text-anchor="middle" stroke="${N.ink}" stroke-width="3" paint-order="stroke">90</text><circle cx="-20" cy="-${200+Math.sin(lt*12)*4}" r="8" fill="${W.yel}"/><circle cx="20" cy="-${200+Math.cos(lt*11)*4}" r="8" fill="${W.yel}"/></g>`;
  let s=CAM(cam,w);
  const sp=pr(lt,.2,.8);if(sp>0)s+=`<g transform="translate(560,620) rotate(-10) scale(${(1.25-.25*eoc(sp)).toFixed(3)})" opacity="${(eoc(sp)*.92).toFixed(2)}"><rect x="-300" y="-80" width="600" height="160" rx="16" fill="#FBF6EA" opacity=".7"/><rect x="-300" y="-80" width="600" height="160" rx="16" fill="none" stroke="#9B2F27" stroke-width="12"/><text y="34" font-family="Playfair Display" font-weight="900" font-size="96" fill="#9B2F27" text-anchor="middle">CASO CERRADO</text></g>`;
  const lg=pr(lt,d-3.0,d-2.3);if(lg>0)s+=`<g opacity="${lg}">${logoSm(540,860,1.4)}</g>`;
  return s}

let SC=[];
function build(){
  SC=[[0,ph(1),scHook],[ph(1),ph(2),scTitle],[ph(2),ph(3),scAbuela],[ph(3),ph(4),scBoard],[ph(4),ph(5),scCross],[ph(5),ph(6)+.2,scArrive],[ph(6)+.2,CD[0],scQuestion],[CD[0],ph(7),scCountdown],
      [ph(7),ph(8),scFlags],[ph(8),ph(9),scMap],[ph(9),ph(10),scClocks],[ph(10),ph(11),scEq],[ph(11),T+1,scClose]];
  STRIPS=[[0,'SALE 12:00 · LLEGA 11:15'],[ph(1),'UN ACERTIJO AL DÍA'],[ph(2),'LA ABUELA CUMPLE 90'],[ph(3),'FERRY DE LAS 12:00'],[ph(4),'VIAJE: 15 MINUTOS'],[ph(5),'RELOJ DEL PUERTO: 11:15'],
    [ph(6),'PIENSA · PUEDES PAUSAR'],[ph(7),'FÍJATE EN LAS BANDERAS'],[ph(8),'DE ESPAÑA A PORTUGAL'],[ph(9),'PORTUGAL: UNA HORA MENOS'],[ph(10),'12:15 = 11:15'],[ph(11),'CASO CERRADO']];
  CH=[];(window.CAPPH||PH).forEach(([a,b,txt])=>{const ws=txt.split(' ').map(w=>{let [t2,wt]=w.split('|');const k=t2.includes('*');t2=t2.replace(/\*/g,'');return {t:t2,k,w:+(wt||Math.max(2,t2.replace(/[^\wáéíóúñü]/gi,'').length+1))}});
    const tot=ws.reduce((s,w)=>s+w.w,0);let acc=a;ws.forEach(w=>{w.s=acc;acc+=(b-a)*w.w/tot});
    let cur=[];ws.forEach((w,i)=>{cur.push(w);if(/[.,?:…]$/.test(w.t)||cur.length==3||i==ws.length-1){CH.push(cur);cur=[]}})});
  CH.forEach((c,i)=>{c.start=c[0].s;c.end=i+1<CH.length?Math.min(CH[i+1][0].s,c[c.length-1].s+1.4):T})}
let CH=[];build();
