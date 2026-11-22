const CASE_LABEL='¿QUIÉN MIENTE? · EL TRUENO';
const OO=`stroke="${N.ink}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
/* ===== personaje genérico (cada uno con su diseño fijo) ===== */
function person(o){const {x=0,y=0,s=1,flip=1,pose='stand',t=0,face='neutral',look=0,coat='#6B7A8F',coat2='#56647A',pants='#3B3F4C',skin='#E8C29C',hair='#3B2418',style='short',beard=null,hat=null,tall=1}=o;const tq=q2(t);
  let lA=0,lB=0,aF=14,aB=-14,bob=0;
  if(pose==='walk'){const p=tq*7;lA=Math.sin(p)*22;lB=-lA;aF=-Math.sin(p)*22;aB=-aF;bob=-Math.abs(Math.cos(p))*5}
  if(pose==='point'){aF=115}
  if(pose==='up'){aF=160}
  if(pose==='notebook'){aF=60;aB=-60}
  if(pose==='hug'){aF=70;aB=-70}
  if(pose==='scared'){aF=150+Math.sin(t*20)*6;aB=-150-Math.sin(t*20)*6}
  const L2=84*tall,limb=(x0,y0,ang,len,w,col)=>{const ex=x0+Math.sin(ang*Math.PI/180)*len,ey=y0+Math.cos(ang*Math.PI/180)*len;return {svg:`<line x1="${x0}" y1="${y0}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${N.ink}" stroke-width="${w+8}" stroke-linecap="round"/><line x1="${x0}" y1="${y0}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`,ex,ey}};
  const hip=-L2-6,sh=hip-130;
  const LB=limb(-14,hip,lB,L2,20,pants),LA=limb(14,hip,lA,L2,20,pants);
  const shoe=e=>`<path d="M${(e.ex-14).toFixed(1)},${(e.ey+4).toFixed(1)} q0,-14 16,-14 q20,0 24,14z" fill="#2E2622" ${OO}/>`;
  const AB=limb(-34,sh+10,aB,70,16,coat2),AF=limb(34,sh+10,aF,70,16,coat);
  let g=LB.svg+shoe(LB)+AB.svg+`<circle cx="${AB.ex.toFixed(1)}" cy="${AB.ey.toFixed(1)}" r="10" fill="${skin}" ${OO}/>`;
  g+=`<path d="M-42,${sh} Q0,${sh-14} 42,${sh} L48,${hip+30} L-48,${hip+30}Z" fill="${coat}" ${OO}/><path d="M-42,${sh} L-48,${hip+30} L-18,${hip+30} Q-24,${sh+60} -12,${sh-6}Z" fill="${coat2}" opacity=".6"/><line x1="0" y1="${sh}" x2="0" y2="${hip+30}" stroke="${N.ink}" stroke-width="3"/>`;
  g+=LA.svg+shoe(LA);
  const hy=sh-50;
  if(style==='long')g+=`<path d="M-46,${hy} Q-56,${hy-56} 0,${hy-60} Q56,${hy-56} 46,${hy} L50,${hy+70} L-50,${hy+70}Z" fill="${hair}" ${OO}/>`;
  g+=`<ellipse cx="0" cy="${hy}" rx="38" ry="42" fill="${skin}" ${OO}/>`;
  if(style==='short')g+=`<path d="M-40,${hy-6} Q-40,${hy-52} 0,${hy-50} Q40,${hy-52} 40,${hy-6} Q30,${hy-30} 0,${hy-30} Q-30,${hy-30} -40,${hy-6}Z" fill="${hair}" ${OO}/>`;
  if(style==='long')g+=`<path d="M-38,${hy-8} Q-30,${hy-46} 0,${hy-44} Q30,${hy-46} 38,${hy-8} Q20,${hy-30} -10,${hy-26}Z" fill="${hair}"/>`;
  if(style==='bald')g+=`<path d="M-38,${hy-2} q-6,-14 0,-22 M38,${hy-2} q6,-14 0,-22" stroke="${hair}" stroke-width="10" fill="none"/>`;
  const blink=((t+x*.003)%3.4)>3.27;const lx=look*5;
  if(face==='scared')g+=`<circle cx="${-14+lx}" cy="${hy-2}" r="8" fill="#fff" stroke="${N.ink}" stroke-width="3"/><circle cx="${14+lx}" cy="${hy-2}" r="8" fill="#fff" stroke="${N.ink}" stroke-width="3"/><circle cx="${-14+lx}" cy="${hy-2}" r="3" fill="${N.ink}"/><circle cx="${14+lx}" cy="${hy-2}" r="3" fill="${N.ink}"/><ellipse cx="0" cy="${hy+22}" rx="7" ry="9" fill="${N.ink}"/><path d="M34,${hy-24} q7,12 0,18 q-7,-6 0,-18z" fill="#9FD3F0" stroke="${N.ink}" stroke-width="2.5"/>`;
  else if(face==='sad')g+=`<path d="M${-22+lx},${hy-10} l14,4 M${22+lx},${hy-10} l-14,4" ${OO}/><circle cx="${-14+lx}" cy="${hy}" r="4.5" fill="${N.ink}"/><circle cx="${14+lx}" cy="${hy}" r="4.5" fill="${N.ink}"/><path d="M-10,${hy+24} q10,-8 20,0" fill="none" stroke="${N.ink}" stroke-width="3.5"/>`;
  else if(face==='sly')g+=`<path d="M${-22+lx},${hy-2} h14 M${8+lx},${hy-2} h14" ${OO}/><path d="M-12,${hy+18} q14,10 24,-4" fill="none" stroke="${N.ink}" stroke-width="3.5"/>`;
  else g+=(blink?`<path d="M${-20+lx},${hy-2} h12 M${8+lx},${hy-2} h12" ${OO}/>`:`<circle cx="${-14+lx}" cy="${hy-2}" r="5" fill="${N.ink}"/><circle cx="${14+lx}" cy="${hy-2}" r="5" fill="${N.ink}"/>`)+`<path d="M-9,${hy+18} q9,${face==='smile'?10:4} 18,0" fill="none" stroke="${N.ink}" stroke-width="3.5"/>`;
  if(beard)g+=`<path d="M-34,${hy+6} Q-30,${hy+52} 0,${hy+56} Q30,${hy+52} 34,${hy+6} Q20,${hy+20} 0,${hy+30} Q-20,${hy+20} -34,${hy+6}Z" fill="${beard}" ${OO}/><path d="M-9,${hy+20} q9,6 18,0" fill="none" stroke="${N.ink}" stroke-width="3"/>`;
  if(hat==='fedora')g+=`<ellipse cx="0" cy="${hy-34}" rx="64" ry="12" fill="#5A4636" ${OO}/><path d="M-36,${hy-36} Q-34,${hy-84} 0,${hy-84} Q34,${hy-84} 36,${hy-36}Z" fill="#6E5642" ${OO}/><rect x="-36" y="${hy-50}" width="72" height="12" fill="#2E2622"/>`;
  if(hat==='beanie')g+=`<path d="M-42,${hy-14} Q-40,${hy-70} 0,${hy-70} Q40,${hy-70} 42,${hy-14}Z" fill="#7D2E2A" ${OO}/><rect x="-44" y="${hy-26}" width="88" height="18" rx="8" fill="#5E211E" ${OO}/>`;
  g+=AF.svg+`<circle cx="${AF.ex.toFixed(1)}" cy="${AF.ey.toFixed(1)}" r="10" fill="${skin}" ${OO}/>`;
  if(pose==='notebook')g+=`<g transform="translate(${(AF.ex-20).toFixed(1)},${(AF.ey-30).toFixed(1)})"><rect x="-20" y="-28" width="44" height="56" rx="4" fill="#FBF6EA" ${OO}/><line x1="-12" y1="-12" x2="14" y2="-12" stroke="${N.ink}" stroke-width="2"/><line x1="-12" y1="0" x2="14" y2="0" stroke="${N.ink}" stroke-width="2"/></g>`;
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(s*flip).toFixed(3)},${s.toFixed(3)})"><ellipse cx="0" cy="4" rx="56" ry="9" fill="#000" opacity=".22"/><g transform="translate(0,${bob.toFixed(1)})">${g}</g></g>`}
const elena=o=>person({...o,coat:'#B5654A',coat2:'#94503A',pants:'#3B3F4C',hair:'#6B3E26',style:'long'});
const vecino=o=>person({...o,coat:'#4E5B3E',coat2:'#3F4A32',pants:'#2E2B28',hair:'#8A8A8A',style:'bald',beard:'#8A8A8A',tall:1.1,skin:'#DDB08A'});
const inspectora=o=>person({...o,coat:'#C9A66B',coat2:'#AE8C55',pants:'#3B3F4C',hair:'#2B1A12',style:'short',hat:'fedora',skin:'#C98F67'});

function bg(t){return woodRect(0,0,1080,1920)+`<rect width="1080" height="1920" fill="url(#lamp)" opacity=".85"/>`}

function qm(x,y,sz,col,r,sw){return `<text x="0" y="0" transform="${tr(x,y,1,r)}" font-family="Playfair Display" font-weight="900" font-size="${sz}" fill="none" stroke="${col}" stroke-width="${sw}" text-anchor="middle">?</text>`}
function scTitle(lt,d){let s=bg(lt);const p=eoc(pr(lt,0,.6));
  s+=`<g transform="translate(540,${(900-60*(1-p)).toFixed(0)}) rotate(${(-4+2*Math.sin(lt)).toFixed(2)}) scale(${(.92+.08*p).toFixed(3)})" filter="url(#soft)">${paperRect(-420,-250,840,500,6)}<text y="-50" font-family="Playfair Display" font-weight="900" font-size="104" fill="${N.ink}" text-anchor="middle">¿QUIÉN</text><text y="80" font-family="Playfair Display" font-weight="900" font-size="104" fill="#C8312B" text-anchor="middle">MIENTE?</text><text y="180" font-family="Inter" font-weight="800" font-size="34" fill="#8a6a4a" text-anchor="middle" letter-spacing="6">UN ACERTIJO AL DÍA</text></g>`;
  s+=`<g transform="translate(${(820+30*Math.sin(lt*2)).toFixed(0)},1260) rotate(-20)" filter="url(#soft)"><circle r="90" fill="none" stroke="#5A4636" stroke-width="22"/><circle r="90" fill="#CFE6F2" opacity=".35"/><rect x="70" y="60" width="30" height="160" rx="10" transform="rotate(-45,70,60)" fill="#5A4636" ${OO}/></g>`;return s}
function scQuestion(lt,d){let s=bg(lt);const p=eob(cl(lt/.6));
  s+=`<g transform="translate(540,760) rotate(-3) scale(${(.9+.1*p).toFixed(3)})" filter="url(#soft)">${paperRect(-420,-260,840,520,6)}<text y="-60" font-family="Playfair Display" font-weight="900" font-size="120" fill="${N.ink}" text-anchor="middle">¿POR QUÉ</text><text y="80" font-family="Playfair Display" font-weight="900" font-size="120" fill="#C8312B" text-anchor="middle">MIENTE?</text></g>`;return s}
const tomas=o=>person({...o,coat:'#4E6B4A',coat2:'#3F583C',pants:'#3B342C',hair:'#2E2622',style:'short',beard:'#2E2622',skin:'#DDB08A',tall:1.05});
const S3={n1:'#141A2E',n2:'#2C3656',field:'#2E3B2A',barn:'#8F3B2A',barn2:'#6E2C1F',roof:'#3A2A22',fire1:'#FF9F1C',fire2:'#FFD166',fire3:'#E4572E'};
function storm(id,t){let s=`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S3.n1}"/><stop offset="1" stop-color="${S3.n2}"/></linearGradient></defs><rect x="-500" y="-500" width="2100" height="2900" fill="url(#${id})"/>`;
  for(let i=0;i<4;i++)s+=`<ellipse cx="${((t*25+i*420)%1700)-300}" cy="${260+i*70}" rx="300" ry="80" fill="#3A4466" opacity=".8"/>`;return s}
function bolt(x,y,s,op=1){return `<g transform="${tr(x,y,s)}" opacity="${op}"><path d="M0,0 L-30,140 L10,140 L-40,320 L60,110 L20,110 L50,0Z" fill="#FFF8D6" filter="url(#glow)" opacity=".7"/><path d="M0,0 L-30,140 L10,140 L-40,320 L60,110 L20,110 L50,0Z" fill="#FFF8D6" stroke="${N.ink}" stroke-width="4" stroke-linejoin="round"/></g>`}
function flick(t){return Math.max(0,Math.sin(t*1.7)*Math.sin(t*7.3))>.55?1:0}
function rain(t,n=70){let s='';for(let i=0;i<n;i++){const x=(rnd(i)*1300-100+t*90)%1300-100,y=(rnd(i+3)*1920+t*(1400+rnd(i+7)*600))%2100-100;s+=`<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x-10).toFixed(0)}" y2="${(y+60).toFixed(0)}" stroke="#9FB3D1" stroke-width="3" opacity=".45" stroke-linecap="round"/>`}return s}
function fire(x,y,s,t){let f='';for(let i=0;i<7;i++){const h=120+Math.sin(t*9+i*1.7)*30+i%3*30,w=60+i%2*20,cx=-150+i*50;f+=`<path d="M${cx-w/2},0 Q${cx-w/3},${-h*.6} ${cx+Math.sin(t*6+i)*14},${-h} Q${cx+w/3},${-h*.6} ${cx+w/2},0Z" fill="${[S3.fire3,S3.fire1,S3.fire2][i%3]}"/>`}
  return `<g transform="${tr(x,y,s)}"><ellipse cx="0" cy="-60" rx="320" ry="200" fill="${S3.fire1}" opacity=".35" filter="url(#glow)"/>${f}</g>`}
function barn(x,y,s,t,burning=true){return `<g transform="${tr(x,y,s)}" filter="url(#soft)"><rect x="-220" y="-260" width="440" height="260" fill="${S3.barn}" ${OO}/><path d="M-250,-260 L0,-420 L250,-260Z" fill="${S3.roof}" ${OO}/><rect x="-80" y="-170" width="160" height="170" fill="${S3.barn2}" ${OO}/><path d="M-80,-170 L80,0 M80,-170 L-80,0" stroke="#F2E6CC" stroke-width="10"/></g>${burning?fire(x,y-(260*s),s*1.1,t):''}`}

/* ===== ESCENAS ===== */
function scHook(lt,d){const cam=camAt([[0,540,860,1.35],[d,540,880,1.08]],lt);
  let w=storm('h1',lt)+`<rect x="-500" y="1050" width="2100" height="1300" fill="${S3.field}"/>`+barn(540,1060,1.25,lt);
  const fl=flick(lt+.3);if(fl)w+=bolt(820,120,1.3)+`<rect x="-500" y="-500" width="2100" height="2900" fill="#E8EEFF" opacity=".12"/>`;
  return CAM(cam,w)+rain(lt)}
function scDebts(lt,d){const cam=camAt([[0,540,920,1.1],[d,540,900,1.22]],lt);
  let w=`<rect x="-400" y="-400" width="1900" height="2600" fill="#D8C6A2"/>`+woodRect(-400,1300,1900,900);
  w+=`<g transform="translate(540,560)" filter="url(#soft)"><rect x="-220" y="-150" width="440" height="300" fill="#2C3656" ${OO}/><g transform="translate(0,140) scale(.5)">${barn(0,0,1,lt,lt>d*.55)}</g></g>`;
  for(let i=0;i<6;i++){const b=pop(lt,.2+i*.12,.35);if(b>0)w+=`<g transform="${tr(200+i*22,1180-i*14,b,-12+i*5)}" filter="url(#soft)"><rect x="-80" y="-56" width="160" height="112" fill="#FBF6EA" ${OO}/><text y="10" font-family="Playfair Display" font-weight="900" font-size="30" fill="#C8312B" text-anchor="middle">DEUDA</text></g>`}
  const p=pop(lt,d*.35,.45);if(p>0)w+=`<g transform="${tr(820,1080,p,6)}" filter="url(#soft)"><rect x="-150" y="-110" width="300" height="220" fill="#FBF6EA" ${OO}/><text y="-50" font-family="Playfair Display" font-weight="900" font-size="34" fill="${N.ink}" text-anchor="middle">PÓLIZA</text><text y="30" font-family="Playfair Display" font-weight="900" font-size="48" fill="#2F7A3A" text-anchor="middle">100.000 €</text></g>`;
  w+=tomas({x:520,y:1320,s:1.3,pose:'stand',t:lt,face:lt>d*.55?'sly':'sad',look:1});
  return CAM(cam,w)}
function scClaim(lt,d){const cam=camAt([[0,540,900,1.0],[d,540,880,1.1]],lt);
  let w=storm('h2',lt)+`<rect x="-500" y="1000" width="2100" height="1300" fill="${S3.field}"/>`;
  w+=`<g transform="translate(220,1000)" filter="url(#soft)"><rect x="-130" y="-200" width="260" height="200" fill="#E8DCC4" ${OO}/><path d="M-150,-200 L0,-310 L150,-200Z" fill="#8F4A34" ${OO}/><rect x="-50" y="-150" width="100" height="80" fill="#F7D58B" ${OO}/></g>`;
  w+=barn(900,1000,.45,lt);
  w+=`<line x1="360" y1="1080" x2="820" y2="1080" stroke="#F2E6CC" stroke-width="6" stroke-dasharray="20 14"/><g transform="translate(590,1060)"><rect x="-90" y="-44" width="180" height="70" rx="12" fill="${N.paper}" ${OO}/><text y="6" font-family="Playfair Display" font-weight="900" font-size="44" fill="${N.ink}" text-anchor="middle">3 KM</text></g>`;
  const b=pr(lt,d*.4,d*.45)>0&&lt<d*.6;if(b)w+=bolt(880,420,1.0);
  const bum=pop(lt,d*.6,.35);if(bum>0)w+=`<g transform="${tr(300,640,bum,-8)}" filter="url(#soft)"><rect x="-220" y="-70" width="440" height="120" rx="16" fill="#FBF6EA" ${OO}/><text y="16" font-family="Playfair Display" font-weight="900" font-size="54" fill="#C8312B" text-anchor="middle">«¡A LA VEZ!»</text></g>`;
  w+=tomas({x:220,y:1320,s:.9,pose:'point',t:lt,face:'sly',look:1});
  return CAM(cam,w)+rain(lt,40)}
function scNote(lt,d){const z=1+lt*.06;
  let s=`<rect width="1080" height="1920" fill="#E3D4B6"/>`+`<g transform="translate(540,1950) scale(${(3.0*z).toFixed(3)})">${inspectora({pose:'notebook',t:lt,face:lt>d*.5?'smile':'neutral',look:.6})}</g>`;
  const ph2=pop(lt,d*.55,.4);if(ph2>0)s+=`<g transform="${tr(800,620,ph2,10)}" filter="url(#soft)"><rect x="-80" y="-140" width="160" height="280" rx="24" fill="#2E2622" ${OO}/><rect x="-62" y="-110" width="124" height="200" fill="#9CC3E0"/><text y="0" font-family="Inter" font-weight="900" font-size="24" fill="${N.ink}" text-anchor="middle">SEGUROS</text></g>`;
  return s+`<rect width="1080" height="1920" fill="url(#vig)"/>`}
let PCACHE=null;
function scCountdown(lt,d){let s=bg(lt);
  if(!PCACHE)PCACHE=[`<rect width="1080" height="1920" fill="#E3D4B6"/><text x="540" y="780" font-family="Playfair Display" font-weight="900" font-size="300" fill="${N.ink}" text-anchor="middle">3 KM</text>`,
    storm('pc',0)+bolt(540,200,2.4),
    `<rect width="1080" height="1920" fill="#FBF6EA"/><text x="540" y="760" font-family="Playfair Display" font-weight="900" font-size="200" fill="#C8312B" text-anchor="middle">¡A LA</text><text x="540" y="960" font-family="Playfair Display" font-weight="900" font-size="200" fill="#C8312B" text-anchor="middle">VEZ!</text>`];
  const dr=k=>Math.sin(lt*.8+k)*1.5;
  s+=polaroid(300,640,-8+dr(0),1.05,PCACHE[0],'SU CASA')+polaroid(780,720,7+dr(1),1.0,PCACHE[1],'EL RAYO')+polaroid(420,1180,4+dr(2),1.0,PCACHE[2],'EL TRUENO');
  const tg=[[300,640],[780,720],[420,1180]][Math.floor(lt/3.3)%3];const hx=tg[0]+120+Math.sin(lt*2)*10,hy=tg[1]+200;
  s+=`<g transform="translate(${hx},${hy}) rotate(-35)" filter="url(#soft)"><rect x="-30" y="0" width="60" height="260" rx="20" fill="#C9A66B" ${OO}/><path d="M-26,0 q-6,-40 10,-56 v-60 q0,-14 12,-14 q12,0 12,14 v50 q30,-6 32,20 q2,26 -10,46z" fill="#C98F67" ${OO}/></g>`;return s}
function lane(y,label,sub,prog,col){return `<g transform="translate(0,${y})" filter="url(#soft)"><rect x="80" y="-150" width="920" height="300" rx="20" fill="#FBF6EA" ${OO}/><text x="120" y="-90" font-family="Playfair Display" font-weight="900" font-size="50" fill="${N.ink}">${label}</text><text x="120" y="-48" font-family="Inter" font-weight="800" font-size="28" fill="#8a6a4a">${sub}</text><line x1="140" y1="40" x2="940" y2="40" stroke="#D8C6A2" stroke-width="10" stroke-linecap="round"/><line x1="140" y1="40" x2="${140+800*prog}" y2="40" stroke="${col}" stroke-width="10" stroke-linecap="round"/><circle cx="${140+800*prog}" cy="40" r="20" fill="${col}" ${OO}/></g>`}
function scRace(lt,d){let s=`<rect width="1080" height="1920" fill="#F2E6CC"/><rect width="1080" height="1920" fill="#F2E6CC" filter="url(#paperT)"/>`;
  s+=lane(640,'LUZ','al instante',cl((lt-.2)/.08),'#F2B705')+lane(1110,'SONIDO','unos 343 metros por segundo',cl((lt-.2)/9)*1,'#3E7CB1');
  s+=`<text x="540" y="400" font-family="Playfair Display" font-weight="900" font-size="46" fill="${N.ink}" text-anchor="middle" opacity="${pr(lt,1,1.4)}">EL SONIDO SIEMPRE LLEGA TARDE</text>`;return s}
function scMap(lt,d){let s=`<rect width="1080" height="1920" fill="#E9E0C8"/><rect width="1080" height="1920" fill="#E9E0C8" filter="url(#paperT)"/>`;
  const y=900,x0=160,x1=920;
  s+=`<g filter="url(#soft)"><rect x="${x0-70}" y="${y-120}" width="140" height="120" fill="#E8DCC4" ${OO}/><path d="M${x0-90},${y-120} L${x0},${y-190} L${x0+90},${y-120}Z" fill="#8F4A34" ${OO}/></g><text x="${x0}" y="${y+70}" font-family="Inter" font-weight="900" font-size="30" fill="${N.ink}" text-anchor="middle">SU CASA</text>`;
  s+=barn(x1,y,.4,lt)+`<text x="${x1}" y="${y+70}" font-family="Inter" font-weight="900" font-size="30" fill="${N.ink}" text-anchor="middle">GRANERO</text>`;
  s+=`<line x1="${x0+80}" y1="${y-40}" x2="${x1-100}" y2="${y-40}" stroke="${N.ink}" stroke-width="5" stroke-dasharray="14 10"/>`;
  [1,2].forEach(k=>{const x=x0+(x1-x0)*k/3;s+=`<line x1="${x}" y1="${y-60}" x2="${x}" y2="${y-20}" stroke="${N.ink}" stroke-width="5"/><text x="${x}" y="${y+10}" font-family="Inter" font-weight="900" font-size="28" fill="${N.ink}" text-anchor="middle">${k} km</text>`});
  const p=cl((lt-.4)/(d-.6));const wx=x1-(x1-x0)*p;
  for(let r=0;r<3;r++)s+=`<path d="M${wx+r*24},${y-100} q-26,60 0,120" fill="none" stroke="#3E7CB1" stroke-width="7" stroke-linecap="round" opacity="${1-r*.3}"/>`;
  const sec=Math.min(9,Math.floor(p*9.99));
  s+=`<g transform="translate(540,620)" filter="url(#soft)"><circle r="130" fill="#FBF6EA" ${OO}/><text y="40" font-family="Playfair Display" font-weight="900" font-size="120" fill="${N.ink}" text-anchor="middle">${sec} s</text></g>`;
  s+=`<g transform="translate(540,1200)" filter="url(#soft)"><rect x="-260" y="-56" width="520" height="100" rx="14" fill="${N.paper}" ${OO}/><text y="16" font-family="Playfair Display" font-weight="900" font-size="56" fill="${N.ink}" text-anchor="middle">3 s ≈ 1 km</text></g>`;
  s+=`<text x="540" y="1340" font-family="Inter" font-weight="800" font-size="26" fill="#8a6a4a" text-anchor="middle">Fuente: AEMET</text>`;return s}
function scBusted(lt,d){const cam=camAt([[0,540,880,1.25],[d,540,880,1.05]],lt);
  let w=storm('h3',lt)+`<rect x="-500" y="1050" width="2100" height="1300" fill="${S3.field}"/>`+barn(700,1060,1.1,lt,lt>d*.3);
  w+=tomas({x:330,y:1300,s:1.2,pose:'stand',t:lt,face:'scared',look:1});
  w+=`<g transform="translate(250,1290)" filter="url(#soft)"><rect x="-40" y="-110" width="80" height="110" rx="10" fill="#C8312B" ${OO}/><rect x="-16" y="-130" width="32" height="24" fill="#2E2622" ${OO}/></g>`;
  if(flick(lt))w+=bolt(880,120,1.2);
  let s=CAM(cam,w)+rain(lt,40)+`<rect width="1080" height="1920" fill="#C9A66B" opacity=".14"/>`;
  const sp=pr(lt,d*.4,d*.4+.5);if(sp>0)s+=`<g transform="translate(560,620) rotate(-8) scale(${(1.25-.25*eoc(sp)).toFixed(3)})" opacity="${(eoc(sp)*.95).toFixed(2)}"><rect x="-300" y="-80" width="600" height="160" rx="16" fill="#FBF6EA" opacity=".85"/><rect x="-300" y="-80" width="600" height="160" rx="16" fill="none" stroke="#9B2F27" stroke-width="12"/><text y="34" font-family="Playfair Display" font-weight="900" font-size="88" fill="#9B2F27" text-anchor="middle">ESTABA ALLÍ</text></g>`;
  return s}
function scClose(lt,d){const cam=camAt([[0,540,920,1.1],[d,540,900,1.02]],lt);
  let w=`<defs><linearGradient id="dw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9BB7E0"/><stop offset="1" stop-color="#F6C99A"/></linearGradient></defs><rect x="-400" y="-400" width="1900" height="2600" fill="url(#dw)"/><rect x="-400" y="1300" width="1900" height="900" fill="#55702C"/>`;
  w+=`<g transform="translate(540,1300) scale(.8)" filter="url(#soft)"><rect x="-220" y="-200" width="440" height="200" fill="#3A2A22" ${OO}/><path d="M-220,-200 l60,-60 l80,40 l60,-70 l90,60 l80,-30 l70,60" fill="none" stroke="#2E2622" stroke-width="14"/></g>`;
  w+=tomas({x:330,y:1320,s:1.25,pose:'stand',t:lt,face:'sad',look:1})+inspectora({x:800,y:1320,s:1.25,pose:'stand',t:lt,face:'smile',look:-1,flip:-1});
  let s=CAM(cam,w);
  const sp=pr(lt,.2,.8);if(sp>0)s+=`<g transform="translate(560,640) rotate(-10) scale(${(1.25-.25*eoc(sp)).toFixed(3)})" opacity="${(eoc(sp)*.92).toFixed(2)}"><rect x="-300" y="-80" width="600" height="160" rx="16" fill="#FBF6EA" opacity=".7"/><rect x="-300" y="-80" width="600" height="160" rx="16" fill="none" stroke="#9B2F27" stroke-width="12"/><text y="34" font-family="Playfair Display" font-weight="900" font-size="96" fill="#9B2F27" text-anchor="middle">CASO CERRADO</text></g>`;
  const lg=pr(lt,d-3.0,d-2.3);if(lg>0)s+=`<g opacity="${lg}">${logoSm(540,900,1.4)}</g>`;
  return s}

let SC=[];
function build(){
  SC=[[0,ph(1),scHook],[ph(1),ph(2),scTitle],[ph(2),ph(3),scDebts],[ph(3),ph(4),scClaim],[ph(4),ph(5)+.2,scNote],[ph(5)+.2,CD[0],scQuestion],[CD[0],ph(6),scCountdown],
      [ph(6),ph(7),scRace],[ph(7),ph(8),scMap],[ph(8),ph(9),scBusted],[ph(9),T+1,scClose]];
  STRIPS=[[0,'¿FUE UN RAYO?'],[ph(1),'UN ACERTIJO AL DÍA'],[ph(2),'DEUDAS Y UNA PÓLIZA'],[ph(3),'«LO VI DESDE CASA»'],[ph(4),'LA INSPECTORA APUNTA'],
    [ph(5),'PIENSA · PUEDES PAUSAR'],[ph(6),'LUZ CONTRA SONIDO'],[ph(7),'3 KM = 9 SEGUNDOS'],[ph(8),'ESTABA EN EL GRANERO'],[ph(9),'CASO CERRADO']];
  CH=[];(window.CAPPH||PH).forEach(([a,b,txt])=>{const ws=txt.split(' ').map(w=>{let [t2,wt]=w.split('|');const k=t2.includes('*');t2=t2.replace(/\*/g,'');return {t:t2,k,w:+(wt||Math.max(2,t2.replace(/[^\wáéíóúñü]/gi,'').length+1))}});
    const tot=ws.reduce((s,w)=>s+w.w,0);let acc=a;ws.forEach(w=>{w.s=acc;acc+=(b-a)*w.w/tot});
    let cur=[];ws.forEach((w,i)=>{cur.push(w);if(/[.,?:…»]$/.test(w.t)||cur.length==3||i==ws.length-1){CH.push(cur);cur=[]}})});
  CH.forEach((c,i)=>{c.start=c[0].s;c.end=i+1<CH.length?Math.min(CH[i+1][0].s,c[c.length-1].s+1.4):T})}
let CH=[];build();
