const CASE_LABEL='HANS EL LISTO · BERLÍN, 1904';
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

const osten=o=>person({...o,coat:'#3A3A44',coat2:'#2E2E36',pants:'#2E2B28',hair:'#E8E4DC',style:'bald',beard:'#E8E4DC',hat:'fedora',skin:'#E8C29C'});
const pfungst=o=>person({...o,coat:'#5C4A3A',coat2:'#4A3B2E',pants:'#3B342C',hair:'#3B2418',style:'short',skin:'#E2B48C'});
const sabio=(o,c)=>person({...o,coat:c,coat2:c,pants:'#2E2B28',hair:'#8A8A8A',style:'bald',beard:'#8A8A8A',skin:'#DDB08A'});
const H={brick:'#B08060',wall:'#D9C7A8',ground:'#C9B48A',horse:'#8A5A3A',horse2:'#6E4429',mane:'#2E2218',board:'#2E3B32'};
function horse(x,y,s,t,tap=0,blink=0,blinders=0){const leg=tap?Math.max(0,Math.sin(t*12))*-28:0;
  return `<g transform="${tr(x,y,s)}" filter="url(#soft)"><path d="M-170,-260 q-60,40 -50,120" fill="none" stroke="${H.mane}" stroke-width="22" stroke-linecap="round"/>
  ${[[-130,0],[-80,0],[90,leg],[140,0]].map(([lx,dy],i)=>`<rect x="${lx-14}" y="${-190+dy}" width="28" height="190" rx="10" fill="${i<2?H.horse2:H.horse}" ${OO}/><rect x="${lx-18}" y="${-14+dy}" width="36" height="20" rx="6" fill="#2E2218"/>`).join('')}
  <ellipse cx="0" cy="-240" rx="200" ry="90" fill="${H.horse}" ${OO}/><path d="M140,-280 Q190,-420 240,-440 L300,-380 Q250,-320 200,-220Z" fill="${H.horse}" ${OO}/>
  <g transform="translate(270,-420) rotate(30)"><ellipse rx="44" ry="90" fill="${H.horse}" ${OO}/><ellipse cy="70" rx="34" ry="26" fill="#C9A27A" ${OO}/><circle cx="-8" cy="60" r="5" fill="${N.ink}"/><circle cx="12" cy="66" r="5" fill="${N.ink}"/>
  ${blink?`<path d="M-30,-20 h20" ${OO}/>`:`<circle cx="-18" cy="-20" r="9" fill="${N.ink}"/><circle cx="-15" cy="-23" r="3" fill="#fff"/>`}${blinders?`<rect x="-52" y="-50" width="30" height="56" rx="6" fill="#2E2622" ${OO}/>`:''}<path d="M-20,-90 l-6,-40 l26,30z M14,-90 l10,-40 l14,36z" fill="${H.horse}" ${OO}/></g>
  <path d="M180,-380 q-30,60 -10,140" fill="none" stroke="${H.mane}" stroke-width="18" stroke-linecap="round"/></g>`}
function yard(t){let s=`<defs><linearGradient id="bs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D8E6"/><stop offset="1" stop-color="#F2E6CC"/></linearGradient></defs><rect x="-400" y="-400" width="1900" height="2600" fill="url(#bs)"/>`;
  s+=`<rect x="-400" y="300" width="1900" height="1000" fill="${H.wall}" ${OO}/>`;for(let r=0;r<3;r++)for(let c=0;c<8;c++)s+=`<rect x="${-300+c*220}" y="${360+r*260}" width="110" height="160" fill="#7A8A9A" ${OO}/><rect x="${-300+c*220}" y="${360+r*260}" width="110" height="20" fill="#B5654A"/>`;
  s+=`<rect x="-400" y="1300" width="1900" height="900" fill="${H.ground}"/>`;for(let i=0;i<30;i++)s+=`<circle cx="${(rnd(i)*1900-400).toFixed(0)}" cy="${(1320+rnd(i+3)*500).toFixed(0)}" r="${3+rnd(i+5)*5}" fill="#A8946C"/>`;return s}
function board(x,y,s,lines){return `<g transform="${tr(x,y,s)}" filter="url(#soft)"><rect x="-260" y="-200" width="520" height="400" fill="${H.board}" stroke="#6E4429" stroke-width="18"/>${lines.map((l,i)=>`<text x="0" y="${-90+i*110}" font-family="Playfair Display" font-weight="800" font-size="76" fill="#F2F2EA" text-anchor="middle" opacity=".92">${l}</text>`).join('')}<line x1="-160" y1="260" x2="-200" y2="420" stroke="#6E4429" stroke-width="14"/><line x1="160" y1="260" x2="200" y2="420" stroke="#6E4429" stroke-width="14"/></g>`}
function crowd(t,y=1290,n=9){let s='';for(let i=0;i<n;i++)s+=person({x:-160+i*170,y:y+(i%2)*20,s:.7,pose:'stand',t:t+i,coat:['#3A3A44','#5C4A3A','#4E5B3E','#6B2E2E'][i%4],coat2:'#2E2E36',hair:'#2E2622',style:'short',hat:i%3?'fedora':null,look:0});return s}
function dust(x,y,t){let s='';for(let i=0;i<4;i++){const k=((t*2+i/4)%1);s+=`<circle cx="${x+(i-1.5)*24*k}" cy="${y-k*30}" r="${8+k*18}" fill="#D9C7A8" opacity="${(.7*(1-k)).toFixed(2)}"/>`}return s}

/* ===== ESCENAS ===== */
function scHook(lt,d){const cam=camAt([[0,620,820,1.3],[d,560,860,1.0]],lt);
  let w=yard(lt)+board(260,900,.8,['3 + 2 = ?'])+horse(620,1300,1.0,lt,1)+dust(710,1300,lt);
  const n=Math.min(5,Math.floor(lt*1.6));w+=`<g transform="translate(860,620)" filter="url(#soft)"><circle r="90" fill="#FBF6EA" ${OO}/><text y="34" font-family="Playfair Display" font-weight="900" font-size="100" fill="${N.ink}" text-anchor="middle">${n}</text></g>`;
  return CAM(cam,w)}
function scTitle(lt,d){ // cartel de feria de 1904
  const p=eoc(pr(lt,0,.6));let s=`<rect width="1080" height="1920" fill="#B5654A"/><rect width="1080" height="1920" fill="#B5654A" filter="url(#paperT)"/>`;
  s+=`<g transform="translate(540,${880-50*(1-p)}) rotate(-2)" filter="url(#soft)"><rect x="-420" y="-520" width="840" height="1040" fill="#F2E2B8" ${OO}/><rect x="-390" y="-490" width="780" height="980" fill="none" stroke="#9B2F27" stroke-width="8"/><text y="-370" font-family="Playfair Display" font-weight="900" font-size="54" fill="#9B2F27" text-anchor="middle">¡ASOMBROSO!</text>${horse(0,180,.55,lt).replace('filter="url(#soft)"','')}<text y="300" font-family="Playfair Display" font-weight="900" font-size="96" fill="${N.ink}" text-anchor="middle">UN ACERTIJO</text><text y="400" font-family="Playfair Display" font-weight="900" font-size="96" fill="#9B2F27" text-anchor="middle">REAL</text></g>`;
  return s}
function scOwner(lt,d){const cam=camAt([[0,540,920,1.05],[d,560,900,1.2]],lt);
  let w=yard(lt)+horse(700,1310,.9,lt)+osten({x:280,y:1320,s:1.25,pose:'point',t:lt,face:'smile',look:1});
  const b=pop(lt,d*.55,.4);if(b>0)w+=`<g transform="${tr(320,760,b)}" filter="url(#soft)"><rect x="-200" y="-70" width="400" height="130" rx="30" fill="#FBF6EA" ${OO}/><path d="M-20,60 l20,40 l20,-40" fill="#FBF6EA" ${OO}/><text y="20" font-family="Playfair Display" font-weight="900" font-size="64" fill="${N.ink}" text-anchor="middle">«3 + 2»</text></g>`;
  return CAM(cam,w)}
function scTap(lt,d){const cam=camAt([[0,700,1150,1.6],[d,700,1150,1.7]],lt);
  let w=yard(lt)+horse(620,1300,1.0,lt,1)+dust(710,1300,lt);
  const n=Math.min(5,Math.floor(lt*2.4)+1);for(let i=0;i<n;i++)w+=`<g transform="translate(${560+i*60},1000)"><circle r="24" fill="#FBF6EA" ${OO}/><text y="9" font-family="Inter" font-weight="900" font-size="24" fill="${N.ink}" text-anchor="middle">${i+1}</text></g>`;
  return CAM(cam,w)}
function scCommission(lt,d){const cam=camAt([[0,540,920,1.0],[d,540,900,1.12]],lt);
  let w=yard(lt)+horse(540,1240,.75,lt,1);
  ['#3A3A44','#4E5B3E','#6B2E2E','#3E5A6E'].forEach((c,i)=>{w+=sabio({x:120+i*280,y:1340+(i%2)*20,s:1.0,pose:'notebook',t:lt+i,look:i<2?1:-1,flip:i<2?1:-1},c)});
  const st=pr(lt,d*.55,d*.55+.5);if(st>0)w+=`<g transform="translate(540,700) rotate(-8) scale(${(1.25-.25*eoc(st)).toFixed(3)})" opacity="${(eoc(st)*.95).toFixed(2)}"><rect x="-270" y="-70" width="540" height="140" rx="12" fill="#FBF6EA" opacity=".85"/><rect x="-270" y="-70" width="540" height="140" rx="12" fill="none" stroke="#2F7A3A" stroke-width="10"/><text y="28" font-family="Playfair Display" font-weight="900" font-size="72" fill="#2F7A3A" text-anchor="middle">SIN TRUCOS</text></g>`;
  return CAM(cam,w)}
function scPfungst(lt,d){const cam=camAt([[0,540,940,1.05],[d,520,900,1.25]],lt);
  let w=yard(lt)+horse(760,1300,.85,lt)+pfungst({x:300,y:1320,s:1.3,pose:'think',t:lt,face:'neutral',look:1});
  const i=pop(lt,d*.4,.4);if(i>0)w+=`<g transform="${tr(300,760,i)}"><circle r="70" fill="${N.warm}" opacity=".35" filter="url(#glow)"/><circle cy="-10" r="40" fill="#FFF3C4" ${OO}/><rect x="-16" y="28" width="32" height="30" fill="#9AA0A8" ${OO}/></g>`;
  return CAM(cam,w)}
function scQuestion(lt,d){let s=yard(lt)+`<rect width="1080" height="1920" fill="#000" opacity=".2"/>`;
  s+=board(540,820,1.4,['¿QUÉ','DESCUBRIÓ?']);return s}
function scCountdown(lt,d){ // tres pizarras con las pistas en el patio
  let s=yard(lt)+`<rect width="1080" height="1920" fill="#000" opacity=".15"/>`;
  s+=board(300,560,.62,['3 + 2','= 5'])+board(780,640,.62,['SIN','TRUCOS'])+board(360,1100,.62,['¿Y SI NO','LO VE?']);
  return s}
function scBlinders(lt,d){const cam=camAt([[0,600,1050,1.15],[d,640,1000,1.35]],lt);
  let w=yard(lt)+horse(620,1300,1.0,lt,1,0,1)+dust(710,1300,lt)+pfungst({x:180,y:1320,s:1.2,pose:'notebook',t:lt,look:1});
  const n=Math.min(9,Math.floor(lt*3)+1);w+=`<g transform="translate(860,620)" filter="url(#soft)"><circle r="90" fill="#FBF6EA" ${OO}/><text y="34" font-family="Playfair Display" font-weight="900" font-size="100" fill="#C8312B" text-anchor="middle">${n}</text></g>`;
  const x=pr(lt,d*.5,d*.5+.4);if(x>0)w+=`<g opacity="${x}"><line x1="790" y1="540" x2="930" y2="700" stroke="#C8312B" stroke-width="14"/><line x1="930" y1="540" x2="790" y2="700" stroke="#C8312B" stroke-width="14"/></g>`;
  return CAM(cam,w)}
function scKey(lt,d){ // primer plano del ojo del caballo que refleja una cara
  const z=1+lt*.04;let s=`<rect width="1080" height="1920" fill="${H.horse}"/>`+`<g transform="translate(540,860) scale(${z.toFixed(3)})"><ellipse rx="360" ry="250" fill="#2E1A10" ${OO}/><ellipse rx="300" ry="200" fill="#120A06"/><ellipse cx="-90" cy="-80" rx="70" ry="40" fill="#fff" opacity=".35"/>
  <g transform="scale(.9)" opacity="${pr(lt,.4,1.2)}"><ellipse cx="40" cy="20" rx="110" ry="130" fill="#E8C29C" opacity=".75"/><circle cx="0" cy="0" r="12" fill="${N.ink}"/><circle cx="80" cy="0" r="12" fill="${N.ink}"/><path d="M0,70 q40,${-20+30*pr(lt,d*.5,d*.7)} 80,0" fill="none" stroke="${N.ink}" stroke-width="8"/></g></g>`;
  return s+`<rect width="1080" height="1920" fill="url(#vig)"/>`}
function scRelax(lt,d){const cam=camAt([[0,540,960,1.05],[d,540,940,1.15]],lt);
  let w=yard(lt)+horse(760,1310,.85,lt,lt<d*.5?1:0)+osten({x:280,y:1320,s:1.25,pose:'stand',t:lt,face:lt>d*.5?'smile':'neutral',look:1});
  const a=pr(lt,d*.45,d*.45+.3);w+=`<g opacity="${a}"><path d="M230,980 q-30,-30 0,-60 M330,980 q30,-30 0,-60" fill="none" stroke="#2F7A3A" stroke-width="8"/><text x="280" y="900" font-family="Inter" font-weight="900" font-size="34" fill="#2F7A3A" text-anchor="middle">¡PARA!</text></g>`;
  return CAM(cam,w)}
function scLegacy(lt,d){let s=`<rect width="1080" height="1920" fill="#EAF0F4"/>`;
  s+=`<g filter="url(#soft)"><rect x="140" y="420" width="800" height="560" rx="24" fill="#1E2A3A" ${OO}/><rect x="170" y="450" width="740" height="500" fill="#0F1824"/></g>`;
  const k=pr(lt,0,1.2);s+=`<g opacity="${k}">${horse(540,900,.45,lt).replace('filter="url(#soft)"','')}<text x="540" y="560" font-family="Inter" font-weight="900" font-size="34" fill="#2EE6D6" text-anchor="middle">EXPERIMENTO A CIEGAS</text></g>`;
  const t2=pop(lt,d*.45,.45);if(t2>0)s+=`<g transform="${tr(540,1180,t2,-3)}" filter="url(#soft)"><rect x="-380" y="-70" width="760" height="130" rx="14" fill="#FBF6EA" ${OO}/><text y="22" font-family="Playfair Display" font-weight="900" font-size="56" fill="${N.ink}" text-anchor="middle">«EFECTO HANS EL LISTO»</text></g>`;
  return s}
function scClose(lt,d){const cam=camAt([[0,560,960,1.05],[d,560,940,1.0]],lt);
  let w=yard(lt)+horse(620,1300,1.0,lt)+`<g transform="translate(780,880)"><circle r="40" fill="#C9A227" ${OO}/><path d="M-30,-40 l30,-60 l30,60" fill="none" stroke="#2F5D8C" stroke-width="12"/></g>`;
  let s=CAM(cam,w);
  const sp=pr(lt,.2,.8);if(sp>0)s+=`<g transform="translate(540,600) rotate(-8) scale(${(1.25-.25*eoc(sp)).toFixed(3)})" opacity="${(eoc(sp)*.95).toFixed(2)}"><rect x="-300" y="-80" width="600" height="160" rx="16" fill="#F2E2B8" stroke="#9B2F27" stroke-width="12"/><text y="34" font-family="Playfair Display" font-weight="900" font-size="90" fill="#9B2F27" text-anchor="middle">CASO CERRADO</text></g>`;
  const lg=pr(lt,d-3.0,d-2.3);if(lg>0)s+=`<g opacity="${lg}">${logoSm(540,380,1.0)}</g>`;
  return s}

let SC=[];
function build(){
  SC=[[0,ph(1),scHook],[ph(1),ph(2),scTitle],[ph(2),ph(3),scOwner],[ph(3),ph(4),scTap],[ph(4),ph(5),scCommission],[ph(5),ph(6)+.2,scPfungst],[ph(6)+.2,CD[0],scQuestion],[CD[0],ph(7),scCountdown],
      [ph(7),ph(8),scBlinders],[ph(8),ph(9),scKey],[ph(9),ph(10),scRelax],[ph(10),ph(11),scLegacy],[ph(11),T+1,scClose]];
  STRIPS=[[0,'BERLÍN, 1904'],[ph(1),'UN ACERTIJO REAL'],[ph(2),'HANS EL LISTO'],[ph(3),'«3 + 2» → 5 GOLPES'],[ph(4),'LOS EXPERTOS NO VEN TRAMPA'],[ph(5),'OSKAR PFUNGST'],
    [ph(6),'PIENSA · PUEDES PAUSAR'],[ph(7),'SI NO VE, FALLA'],[ph(8),'HANS NO SABÍA SUMAR'],[ph(9),'LEÍA LAS CARAS'],[ph(10),'ESTO ES LO QUE HOY SABEMOS'],[ph(11),'CASO CERRADO']];
  CH=[];(window.CAPPH||PH).forEach(([a,b,txt])=>{const ws=txt.split(' ').map(w=>{let [t2,wt]=w.split('|');const k=t2.includes('*');t2=t2.replace(/\*/g,'');return {t:t2,k,w:+(wt||Math.max(2,t2.replace(/[^\wáéíóúñü]/gi,'').length+1))}});
    const tot=ws.reduce((s,w)=>s+w.w,0);let acc=a;ws.forEach(w=>{w.s=acc;acc+=(b-a)*w.w/tot});
    let cur=[];ws.forEach((w,i)=>{cur.push(w);if(/[.,?:…»]$/.test(w.t)||cur.length==3||i==ws.length-1){CH.push(cur);cur=[]}})});
  CH.forEach((c,i)=>{c.start=c[0].s;c.end=i+1<CH.length?Math.min(CH[i+1][0].s,c[c.length-1].s+1.4):T})}
let CH=[];build();
