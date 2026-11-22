const CASE_LABEL='¿QUIÉN MIENTE? · LOS GIRASOLES';
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

const martina=o=>person({...o,coat:'#3E7CB1',coat2:'#336A97',pants:'#3B3F4C',hair:'#1F1410',style:'long',skin:'#D9A57E'});
const ruben=o=>person({...o,coat:'#C46A2B',coat2:'#A3561F',pants:'#4A4237',hair:'#6B4A2B',style:'short',beard:'#6B4A2B',skin:'#E2B48C',tall:1.05});
const G2={sky1:'#F3B36B',sky2:'#F7DDA0',dawn1:'#9BB7E0',dawn2:'#F6C99A',field:'#6E8B3D',field2:'#55702C',stem:'#4F7A2A',petal:'#F2B705',petal2:'#D99A00',disk:'#5A3A1C',sun:'#FFB347'};

/* girasol de perfil (mirando a la derecha si dir=1) */
function sunflower(x,y,s,dir=1,t=0,sway=0){const sw=Math.sin(t*1.5+x*.01)*sway;let h=`<path d="M0,0 Q${-6+sw},-120 ${sw*1.5},-240" fill="none" stroke="${N.ink}" stroke-width="16" stroke-linecap="round"/><path d="M0,0 Q${-6+sw},-120 ${sw*1.5},-240" fill="none" stroke="${G2.stem}" stroke-width="9" stroke-linecap="round"/>`;
  h+=`<path d="M-2,-90 q-50,-30 -70,4 q40,14 70,-4z" fill="${G2.stem}" ${OO}/><path d="M2,-150 q50,-30 70,4 q-40,14 -70,-4z" fill="${G2.stem}" ${OO}/>`;
  let head='';for(let i=0;i<14;i++){const a=i/14*Math.PI*2;head+=`<ellipse cx="${(Math.cos(a)*14).toFixed(1)}" cy="${(Math.sin(a)*58).toFixed(1)}" rx="12" ry="24" transform="rotate(${(a*180/Math.PI+90).toFixed(0)},${(Math.cos(a)*14).toFixed(1)},${(Math.sin(a)*58).toFixed(1)})" fill="${i%2?G2.petal:G2.petal2}" stroke="${N.ink}" stroke-width="2.5"/>`}
  head=`<ellipse cx="-14" cy="0" rx="20" ry="52" fill="${G2.field2}" ${OO}/>`+head+`<ellipse cx="8" cy="0" rx="14" ry="40" fill="${G2.disk}" ${OO}/>`;
  h+=`<g transform="translate(${sw*1.5},-262) scale(${dir},1) rotate(${-8})">${head}</g>`;
  return `<g transform="${tr(x,y,s)}">${h}</g>`}
function sunflowerFront(x,y,s,r=0){let h='';for(let i=0;i<16;i++){const a=i/16*360;h+=`<ellipse cx="0" cy="-62" rx="16" ry="34" transform="rotate(${a})" fill="${i%2?G2.petal:G2.petal2}" stroke="${N.ink}" stroke-width="3"/>`}
  return `<g transform="${tr(x,y,s,r)}">${h}<circle r="46" fill="${G2.disk}" ${OO}/>${[...Array(12)].map((_,i)=>`<circle cx="${Math.cos(i)*22}" cy="${Math.sin(i*1.7)*22}" r="4" fill="#3A2410"/>`).join('')}</g>`}
function field(t,{sunX=900,sunY=760,dawn=false,dir=1}={}){
  let s=`<defs><linearGradient id="fs${dawn?1:0}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${dawn?G2.dawn1:'#C86B4A'}"/><stop offset="1" stop-color="${dawn?G2.dawn2:G2.sky1}"/></linearGradient></defs><rect x="-500" y="-500" width="2100" height="1400" fill="url(#fs${dawn?1:0})"/>`;
  s+=`<circle cx="${sunX}" cy="${sunY}" r="200" fill="${G2.sun}" opacity=".35" filter="url(#glow)"/><circle cx="${sunX}" cy="${sunY}" r="80" fill="${G2.sun}" ${OO}/>`;
  s+=`<rect x="-500" y="800" width="2100" height="1300" fill="${G2.field}"/><path d="M-500,800 Q540,770 1600,800" fill="none" stroke="${N.ink}" stroke-width="5"/>`;
  for(let r=0;r<4;r++)for(let c=0;c<9;c++){const sc=.55+r*.22;s+=sunflower(-160+c*170+(r%2)*80,880+r*150,sc,dir,t,2)}
  return s}
function fieldPhoto(t,label,opts){return `<g filter="url(#soft)"><rect x="100" y="380" width="880" height="980" fill="#FBF6EA" ${OO}/><svg x="140" y="420" width="800" height="780" viewBox="100 420 900 880" preserveAspectRatio="xMidYMid slice">${field(t,opts)}</svg><rect x="140" y="420" width="800" height="780" fill="none" stroke="${N.ink}" stroke-width="4"/><text x="540" y="1300" font-family="Playfair Display" font-weight="900" font-size="52" fill="${N.ink}" text-anchor="middle">${label}</text></g>`}
function bg(t){return woodRect(0,0,1080,1920)+`<rect width="1080" height="1920" fill="url(#lamp)" opacity=".85"/>`}

/* ===== ESCENAS ===== */
function scHook(lt,d){let s=bg(lt);const p=eoc(pr(lt,0,.6));
  s+=`<g transform="translate(540,880) rotate(${(-3+Math.sin(lt)*1.2).toFixed(2)}) scale(${(.9+.1*p).toFixed(3)}) translate(-540,-880)">${fieldPhoto(lt,'SU COARTADA')}</g>`;
  const q=pop(lt,d*.6,.4);if(q>0)s+=`<g transform="${tr(860,560,q,12)}">${qm(0,60,200,'#C8312B',0,10)}</g>`;
  return s}
function qm(x,y,sz,col,r,sw){return `<text x="0" y="0" transform="${tr(x,y,1,r)}" font-family="Playfair Display" font-weight="900" font-size="${sz}" fill="none" stroke="${col}" stroke-width="${sw}" text-anchor="middle">?</text>`}
function scTitle(lt,d){let s=bg(lt);const p=eoc(pr(lt,0,.6));
  s+=`<g transform="translate(540,${(900-60*(1-p)).toFixed(0)}) rotate(${(-4+2*Math.sin(lt)).toFixed(2)}) scale(${(.92+.08*p).toFixed(3)})" filter="url(#soft)">${paperRect(-420,-250,840,500,6)}<text y="-50" font-family="Playfair Display" font-weight="900" font-size="104" fill="${N.ink}" text-anchor="middle">¿QUIÉN</text><text y="80" font-family="Playfair Display" font-weight="900" font-size="104" fill="#C8312B" text-anchor="middle">MIENTE?</text><text y="180" font-family="Inter" font-weight="800" font-size="34" fill="#8a6a4a" text-anchor="middle" letter-spacing="6">UN ACERTIJO AL DÍA</text></g>`;
  s+=`<g transform="translate(${(820+30*Math.sin(lt*2)).toFixed(0)},1260) rotate(-20)" filter="url(#soft)"><circle r="90" fill="none" stroke="#5A4636" stroke-width="22"/><circle r="90" fill="#CFE6F2" opacity=".35"/><rect x="70" y="60" width="30" height="160" rx="10" transform="rotate(-45,70,60)" fill="#5A4636" ${OO}/></g>`;return s}
function scMartina(lt,d){const cam=camAt([[0,540,900,1.1],[d,520,880,1.25]],lt);
  let w=`<defs><linearGradient id="ev" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5D5A7E"/><stop offset="1" stop-color="#E8A87C"/></linearGradient></defs><rect x="-400" y="-400" width="1900" height="2600" fill="url(#ev)"/>`;
  w+=`<rect x="-400" y="300" width="1900" height="1000" fill="#B5654A" ${OO}/>`;for(let r=0;r<14;r++)w+=`<line x1="-400" y1="${300+r*70}" x2="1500" y2="${300+r*70}" stroke="#8F4A34" stroke-width="3" opacity=".5"/>`;
  w+=`<rect x="-400" y="1300" width="1900" height="900" fill="#6E6E78"/>`;
  w+=`<g transform="translate(760,1300)" filter="url(#soft)">${[0,1,2].map(i=>`<path d="M${-120+i*90},0 v-120 a40,40 0 0 1 80,0 v120" fill="none" stroke="#9AA0A8" stroke-width="12"/>`).join('')}<path d="M-30,-60 q20,30 -10,60" fill="none" stroke="${N.ink}" stroke-width="8" stroke-dasharray="10 8"/></g>`;
  w+=`<g transform="translate(780,560)" filter="url(#soft)"><circle r="110" fill="#FBF6EA" ${OO}/><line x1="0" y1="0" x2="0" y2="70" stroke="${N.ink}" stroke-width="9" stroke-linecap="round" transform="rotate(${8*30})"/><line x1="0" y1="0" x2="0" y2="-84" stroke="${N.ink}" stroke-width="5" stroke-linecap="round"/><text y="170" font-family="Playfair Display" font-weight="900" font-size="54" fill="#FBF6EA" text-anchor="middle" stroke="${N.ink}" stroke-width="6" paint-order="stroke">20:00</text></g>`;
  w+=martina({x:360,y:1320,s:1.35,pose:'stand',t:lt,face:'sad',look:1});
  return CAM(cam,w)}
function scRuben(lt,d){const cam=camAt([[0,540,920,1.05],[d,540,900,1.18]],lt);
  let w=`<rect x="-400" y="-400" width="1900" height="2600" fill="#E3D4B6"/>`+woodRect(-400,1300,1900,900);
  w+=`<g transform="translate(540,500)" filter="url(#soft)"><rect x="-260" y="-170" width="520" height="340" fill="#7A5536" ${OO}/><rect x="-236" y="-146" width="472" height="292" fill="#9CC3E0"/>${sunflower(-120,140,.55,1,lt)}${sunflower(0,150,.6,1,lt)}${sunflower(120,140,.55,1,lt)}</g>`;
  w+=ruben({x:330,y:1320,s:1.3,pose:'point',t:lt,face:'sly',look:1})+inspectora({x:780,y:1320,s:1.25,pose:'notebook',t:lt,look:-1,flip:-1});
  const ph2=pop(lt,.4,.5);if(ph2>0)w+=`<g transform="${tr(560,980,ph2*.36,-6)}">${fieldPhoto(lt,'20:00')}</g>`;
  return CAM(cam,w)}
function scPhoto(lt,d){const cam=camAt([[0,540,880,1.0],[d,600,860,1.12]],lt);
  let s=bg(lt)+CAM(cam,fieldPhoto(lt,'«AL ATARDECER»'));
  const a=pop(lt,d*.55,.4);if(a>0)s+=`<g transform="${tr(820,520,a,6)}" filter="url(#soft)"><rect x="-190" y="-44" width="380" height="80" rx="12" fill="${N.paper}" ${OO}/><text y="12" font-family="Inter" font-weight="900" font-size="34" fill="${N.ink}" text-anchor="middle">¿SOL PONIÉNDOSE?</text></g>`;
  return s}
function scCuffs(lt,d){const z=1+lt*.06;
  let s=`<rect width="1080" height="1920" fill="#E3D4B6"/>`+`<g transform="translate(540,1950) scale(${(3.0*z).toFixed(3)})">${inspectora({pose:'stand',t:lt,face:lt>d*.45?'smile':'neutral',look:.6})}</g>`;
  const c=pop(lt,d*.5,.45);if(c>0)s+=`<g transform="${tr(760,760,c,-14)}" filter="url(#soft)"><circle cx="-70" r="60" fill="none" stroke="#5E6670" stroke-width="22"/><circle cx="70" r="60" fill="none" stroke="#5E6670" stroke-width="22"/><path d="M-10,-6 h20" stroke="#5E6670" stroke-width="14"/><circle cx="-70" r="60" fill="none" stroke="#9AA4AE" stroke-width="8"/><circle cx="70" r="60" fill="none" stroke="#9AA4AE" stroke-width="8"/></g>`;
  return s+`<rect width="1080" height="1920" fill="url(#vig)"/>`}
function scQuestion(lt,d){let s=bg(lt);const p=eob(cl(lt/.6));
  s+=`<g transform="translate(540,760) rotate(-3) scale(${(.9+.1*p).toFixed(3)})" filter="url(#soft)">${paperRect(-420,-260,840,520,6)}<text y="-60" font-family="Playfair Display" font-weight="900" font-size="120" fill="${N.ink}" text-anchor="middle">¿POR QUÉ</text><text y="80" font-family="Playfair Display" font-weight="900" font-size="120" fill="#C8312B" text-anchor="middle">MIENTE?</text></g>`;return s}
let PCACHE=null;
function scCountdown(lt,d){let s=bg(lt);
  if(!PCACHE)PCACHE=[`<rect width="1080" height="1920" fill="#E3D4B6"/><g transform="translate(540,700)"><circle r="230" fill="#FBF6EA" ${OO}/><line x1="0" y1="0" x2="0" y2="140" stroke="${N.ink}" stroke-width="22" stroke-linecap="round" transform="rotate(240)"/><line x1="0" y1="0" x2="0" y2="-190" stroke="${N.ink}" stroke-width="12" stroke-linecap="round"/></g>`,
    field(0),
    `<rect width="1080" height="1920" fill="${G2.sky2}"/>`+sunflower(360,1200,2.6,1,0)+`<circle cx="900" cy="560" r="90" fill="${G2.sun}" ${OO}/>`];
  const dr=k=>Math.sin(lt*.8+k)*1.5;
  s+=polaroid(300,640,-8+dr(0),1.05,PCACHE[0],'ROBO: 20:00')+polaroid(780,720,7+dr(1),1.0,PCACHE[1],'SU FOTO')+polaroid(420,1180,4+dr(2),1.0,PCACHE[2],'MIRAN AL SOL');
  const tg=[[300,640],[780,720],[420,1180]][Math.floor(lt/3.3)%3];const hx=tg[0]+120+Math.sin(lt*2)*10,hy=tg[1]+200;
  s+=`<g transform="translate(${hx},${hy}) rotate(-35)" filter="url(#soft)"><rect x="-30" y="0" width="60" height="260" rx="20" fill="#C9A66B" ${OO}/><path d="M-26,0 q-6,-40 10,-56 v-60 q0,-14 12,-14 q12,0 12,14 v50 q30,-6 32,20 q2,26 -10,46z" fill="#C98F67" ${OO}/></g>`;return s}
function scFlowers(lt,d){const cam=camAt([[0,700,900,1.2],[d,820,860,1.6]],lt);
  let s=CAM(cam,field(lt));
  const a=pop(lt,.4,.4);if(a>0)s+=`<g transform="${tr(540,1200,a,-3)}" filter="url(#soft)"><rect x="-260" y="-56" width="520" height="100" rx="14" fill="${N.paper}" ${OO}/><text y="16" font-family="Playfair Display" font-weight="900" font-size="58" fill="${N.ink}" text-anchor="middle">MIRAN AL SOL →</text></g>`;
  return s}
function scDiagram(lt,d){let s=`<rect width="1080" height="1920" fill="#F2E6CC"/><rect width="1080" height="1920" fill="#F2E6CC" filter="url(#paperT)"/>`;
  const box=(y,title,sub)=>`<g transform="translate(540,${y})" filter="url(#soft)"><rect x="-460" y="-250" width="920" height="500" rx="20" fill="#FBF6EA" ${OO}/><text x="-420" y="-180" font-family="Playfair Display" font-weight="900" font-size="54" fill="${N.ink}">${title}</text><text x="-420" y="-130" font-family="Inter" font-weight="800" font-size="30" fill="#8a6a4a">${sub}</text></g>`;
  s+=box(620,'JÓVENES','siguen al sol de este a oeste')+box(1210,'ADULTOS','miran siempre al este');
  // fila jóvenes: el sol viaja y la flor gira
  const k=(lt*.45)%1;const sx=880-k*680;s+=`<circle cx="${sx}" cy="${560-Math.sin(k*Math.PI)*120}" r="40" fill="${G2.sun}" ${OO}/>`;
  s+=sunflower(540,820,1.0,k<.5?1:-1,lt);
  s+=`<text x="150" y="800" font-family="Inter" font-weight="900" font-size="34" fill="${N.ink}">O</text><text x="900" y="800" font-family="Inter" font-weight="900" font-size="34" fill="${N.ink}">E</text>`;
  const on=pr(lt,1.3,1.8);
  s+=`<g opacity="${on}">${sunflower(540,1420,1.05,1,lt)}<circle cx="880" cy="1230" r="44" fill="${G2.sun}" ${OO}/><text x="800" y="1330" font-family="Inter" font-weight="900" font-size="38" fill="#C8312B">ESTE</text><path d="M640,1170 L820,1210" stroke="#C8312B" stroke-width="10" stroke-linecap="round"/><polygon points="830,1212 795,1192 800,1222" fill="#C8312B"/></g>`;
  s+=`<g transform="translate(540,1560)" opacity="${pr(lt,2.2,2.7)}"><text font-family="Inter" font-weight="800" font-size="28" fill="#8a6a4a" text-anchor="middle">Atamian et al., Science (2016)</text></g>`;
  return s}
function scReveal(lt,d){let s=bg(lt)+fieldPhoto(lt,'',{dawn:true});
  const e=pop(lt,.2,.4);if(e>0)s+=`<g transform="${tr(820,520,e,5)}" filter="url(#soft)"><rect x="-140" y="-44" width="280" height="80" rx="12" fill="${N.paper}" ${OO}/><text y="14" font-family="Inter" font-weight="900" font-size="38" fill="${N.ink}" text-anchor="middle">ESTE →</text></g>`;
  const x=pr(lt,.9,1.3);s+=`<g opacity="${x}"><text x="540" y="1300" font-family="Playfair Display" font-weight="900" font-size="52" fill="${N.ink}" text-anchor="middle">ATARDECER</text><line x1="370" y1="1284" x2="710" y2="1284" stroke="#C8312B" stroke-width="10"/></g>`;
  const sp=pr(lt,1.6,2.1);if(sp>0)s+=`<g transform="translate(560,1120) rotate(-8) scale(${(1.25-.25*eoc(sp)).toFixed(3)})" opacity="${(eoc(sp)*.95).toFixed(2)}"><rect x="-300" y="-80" width="600" height="160" rx="16" fill="#FBF6EA" opacity=".85"/><rect x="-300" y="-80" width="600" height="160" rx="16" fill="none" stroke="#9B2F27" stroke-width="12"/><text y="34" font-family="Playfair Display" font-weight="900" font-size="96" fill="#9B2F27" text-anchor="middle">AMANECER</text></g>`;
  return s}
function scClose(lt,d){const cam=camAt([[0,540,920,1.1],[d,540,900,1.02]],lt);
  let w=`<defs><linearGradient id="ev2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9BB7E0"/><stop offset="1" stop-color="#F6C99A"/></linearGradient></defs><rect x="-400" y="-400" width="1900" height="2600" fill="url(#ev2)"/><rect x="-400" y="1300" width="1900" height="900" fill="#6E6E78"/>`;
  for(let c=0;c<8;c++)w+=sunflower(-100+c*170,1300,.7,1,lt,2);
  w+=`<g transform="translate(560,1300)" filter="url(#soft)"><circle cx="-90" cy="-60" r="60" fill="none" stroke="${N.ink}" stroke-width="12"/><circle cx="90" cy="-60" r="60" fill="none" stroke="${N.ink}" stroke-width="12"/><path d="M-90,-60 L-20,-150 L60,-150 L90,-60 M-20,-150 L10,-60 L-90,-60" fill="none" stroke="#3E7CB1" stroke-width="10"/></g>`;
  w+=martina({x:320,y:1320,s:1.3,pose:'stand',t:lt,face:'smile',look:1})+inspectora({x:820,y:1320,s:1.25,pose:'stand',t:lt,face:'smile',look:-1,flip:-1});
  let s=CAM(cam,w);
  const sp=pr(lt,.2,.8);if(sp>0)s+=`<g transform="translate(560,640) rotate(-10) scale(${(1.25-.25*eoc(sp)).toFixed(3)})" opacity="${(eoc(sp)*.92).toFixed(2)}"><rect x="-300" y="-80" width="600" height="160" rx="16" fill="#FBF6EA" opacity=".7"/><rect x="-300" y="-80" width="600" height="160" rx="16" fill="none" stroke="#9B2F27" stroke-width="12"/><text y="34" font-family="Playfair Display" font-weight="900" font-size="96" fill="#9B2F27" text-anchor="middle">CASO CERRADO</text></g>`;
  const lg=pr(lt,d-3.0,d-2.3);if(lg>0)s+=`<g opacity="${lg}">${logoSm(540,900,1.4)}</g>`;
  return s}

let SC=[];
function build(){
  SC=[[0,ph(1),scHook],[ph(1),ph(2),scTitle],[ph(2),ph(3),scMartina],[ph(3),ph(4),scRuben],[ph(4),ph(5),scPhoto],[ph(5),ph(6)+.2,scCuffs],[ph(6)+.2,CD[0],scQuestion],[CD[0],ph(7),scCountdown],
      [ph(7),ph(8),scFlowers],[ph(8),ph(9),scDiagram],[ph(9),ph(10),scReveal],[ph(10),T+1,scClose]];
  STRIPS=[[0,'ESTA FOTO ES SU COARTADA'],[ph(1),'UN ACERTIJO AL DÍA'],[ph(2),'ROBO A LAS 20:00'],[ph(3),'RUBÉN ENSEÑA UNA FOTO'],[ph(4),'«AL ATARDECER»'],[ph(5),'LA INSPECTORA LO SABE'],
    [ph(6),'PIENSA · PUEDES PAUSAR'],[ph(7),'MIRAN AL SOL'],[ph(8),'LOS GIRASOLES ADULTOS'],[ph(9),'LA FOTO ES DEL AMANECER'],[ph(10),'CASO CERRADO']];
  CH=[];(window.CAPPH||PH).forEach(([a,b,txt])=>{const ws=txt.split(' ').map(w=>{let [t2,wt]=w.split('|');const k=t2.includes('*');t2=t2.replace(/\*/g,'');return {t:t2,k,w:+(wt||Math.max(2,t2.replace(/[^\wáéíóúñü]/gi,'').length+1))}});
    const tot=ws.reduce((s,w)=>s+w.w,0);let acc=a;ws.forEach(w=>{w.s=acc;acc+=(b-a)*w.w/tot});
    let cur=[];ws.forEach((w,i)=>{cur.push(w);if(/[.,?:…»]$/.test(w.t)||cur.length==3||i==ws.length-1){CH.push(cur);cur=[]}})});
  CH.forEach((c,i)=>{c.start=c[0].s;c.end=i+1<CH.length?Math.min(CH[i+1][0].s,c[c.length-1].s+1.4):T})}
let CH=[];build();
