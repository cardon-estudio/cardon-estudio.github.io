const CASE_LABEL='VAN MEEGEREN · EL FALSO VERMEER';
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

const pintor=o=>person({...o,coat:'#3B4A63',coat2:'#2E3A4F',pants:'#2E2B28',hair:'#B8B0A2',style:'short',skin:'#E8C29C',tall:1.05});
const juez=o=>person({...o,coat:'#1E1E24',coat2:'#15151A',pants:'#1E1E24',hair:'#DCD6CC',style:'bald',skin:'#E2B48C'});
const agente=o=>person({...o,coat:'#2F3B2E',coat2:'#252F24',pants:'#2F3B2E',hair:'#3B2418',style:'short',hat:'beanie',skin:'#DDB08A'});
const V={wall:'#2B2A33',gold:'#C9A227',gold2:'#8E6F12',blue:'#2F5D8C',yel:'#E3B23C',cream:'#F2E6CC'};
function vermeer(x,y,s,fake=0){ // cuadro al estilo holandés (original, no copia)
  return `<g transform="${tr(x,y,s)}" filter="url(#soft)"><rect x="-210" y="-260" width="420" height="520" fill="${V.gold}" ${OO}/><rect x="-186" y="-236" width="372" height="472" fill="#3A3226"/>
  <rect x="-186" y="-236" width="150" height="230" fill="#CFE0EA" opacity=".8"/><line x1="-111" y1="-236" x2="-111" y2="-6" stroke="#3A3226" stroke-width="6"/><line x1="-186" y1="-120" x2="-36" y2="-120" stroke="#3A3226" stroke-width="6"/>
  <path d="M-40,236 Q-50,60 20,20 Q90,60 90,236Z" fill="${V.blue}" ${OO}/><path d="M-10,40 Q20,10 50,40 L60,120 L-20,120Z" fill="${V.yel}" ${OO}/><circle cx="20" cy="-20" r="40" fill="#E8C29C" ${OO}/><path d="M-22,-30 Q20,-90 62,-30 Q40,-60 20,-58 Q0,-60 -22,-30Z" fill="${V.blue}" ${OO}/>
  <rect x="-186" y="-236" width="372" height="472" fill="#FFE7A8" opacity=".12"/>${fake?`<g transform="rotate(-14)" opacity="${fake}"><rect x="-170" y="-60" width="340" height="120" rx="12" fill="none" stroke="#C8312B" stroke-width="12"/><text y="34" font-family="Playfair Display" font-weight="900" font-size="90" fill="#C8312B" text-anchor="middle">FALSO</text></g>`:''}</g>`}
function spot(x,y,w=520){return `<polygon points="${x-60},-200 ${x+60},-200 ${x+w/2},${y} ${x-w/2},${y}" fill="#FFE7A8" opacity=".13"/><ellipse cx="${x}" cy="${y}" rx="${w/2}" ry="60" fill="#FFE7A8" opacity=".18" filter="url(#glow)"/>`}
function museum(t){return `<rect x="-400" y="-400" width="1900" height="2600" fill="${V.wall}"/>`+[...Array(12)].map((_,i)=>`<rect x="${-400+i*170}" y="-400" width="85" height="1700" fill="#25242C" opacity=".6"/>`).join('')+`<rect x="-400" y="1300" width="1900" height="900" fill="#5A4636"/>`+woodRect(-400,1300,1900,900)}
function canals(t){let s=`<defs><linearGradient id="am" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141A2E"/><stop offset="1" stop-color="#2C3656"/></linearGradient></defs><rect x="-400" y="-400" width="1900" height="2600" fill="url(#am)"/>`;
  for(let i=0;i<8;i++){const x=-300+i*200,h=420+rnd(i+30)*260;s+=`<path d="M${x},1150 v${-h} l50,-60 l50,40 l50,-40 l50,60 v${h}z" fill="${['#5C3A2E','#3E4A5C','#6B5236','#4A3B4F'][i%4]}" ${OO}/>`+[0,1,2].map(r=>[0,1].map(c=>`<rect x="${x+30+c*80}" y="${1150-h+40+r*120}" width="50" height="70" fill="${rnd(i*5+r+c)>.5?'#F7D58B':'#1E2438'}" ${OO}/>`).join('')).join('')}
  s+=`<rect x="-400" y="1150" width="1900" height="1000" fill="#1C2A44"/>`;for(let r=0;r<6;r++)s+=`<path d="M-400,${1180+r*40} Q540,${1170+r*40+Math.sin(t+r)*6} 1500,${1180+r*40}" fill="none" stroke="#3A4F78" stroke-width="4"/>`;return s}
function brassPlate(x,y,s,l1,l2){return `<g transform="${tr(x,y,s)}" filter="url(#soft)"><rect x="-360" y="-130" width="720" height="260" rx="14" fill="url(#brassG)" ${OO}/><rect x="-340" y="-110" width="680" height="220" rx="8" fill="none" stroke="${V.gold2}" stroke-width="3"/>${[[-320,-90],[320,-90],[-320,90],[320,90]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="9" fill="${V.gold2}"/>`).join('')}<text y="-10" font-family="Playfair Display" font-weight="900" font-size="78" fill="#2A1E17" text-anchor="middle">${l1}</text><text y="70" font-family="Inter" font-weight="800" font-size="34" fill="#4A3A20" text-anchor="middle" letter-spacing="6">${l2}</text></g>`}

/* ===== ESCENAS ===== */
function scHook(lt,d){const cam=camAt([[0,540,700,1.5],[d,540,760,1.1]],lt);
  let w=museum(lt)+spot(540,1300)+vermeer(540,700,1.1)+brassPlate(540,1130,.5,'VERMEER','¿AUTÉNTICO?');
  return CAM(cam,w)}
function scTitle(lt,d){const p=eoc(pr(lt,0,.6));let s=`<rect width="1080" height="1920" fill="${V.wall}"/>`+spot(540,1200,700);
  s+=brassPlate(540,820-40*(1-p),1.1,'UN ACERTIJO','REAL · 1945');return s}
function scArrest(lt,d){const cam=camAt([[0,540,960,1.05],[d,560,940,1.18]],lt);
  let w=canals(lt)+pintor({x:540,y:1300,s:1.3,pose:'stand',t:lt,face:'sad',look:-1});
  w+=agente({x:300,y:1310,s:1.25,pose:'point',t:lt,look:1})+agente({x:800,y:1310,s:1.25,pose:'stand',t:lt,look:-1,flip:-1});
  const c=pop(lt,d*.5,.4);if(c>0)w+=`<g transform="${tr(560,1060,c*.7)}"><circle cx="-50" r="34" fill="none" stroke="#9AA4AE" stroke-width="12"/><circle cx="50" r="34" fill="none" stroke="#9AA4AE" stroke-width="12"/></g>`;
  return CAM(cam,w)}
function scCrate(lt,d){const cam=camAt([[0,540,880,1.0],[d,540,860,1.15]],lt);
  let w=museum(lt)+spot(540,1300,700);const up=eoc(pr(lt,.2,1.4));
  w+=vermeer(540,760+up*120,.95*(1-.15*up));
  w+=`<g transform="translate(540,${1180-(1-pr(lt,1.2,1.8))*0})" filter="url(#soft)"><rect x="-300" y="-160" width="600" height="320" fill="#B08A5A" ${OO}/>${[0,1,2,3].map(i=>`<line x1="-300" y1="${-160+i*80}" x2="300" y2="${-160+i*80}" stroke="#8A6A40" stroke-width="5"/>`).join('')}<g transform="rotate(-6)" opacity="${pr(lt,d*.55,d*.55+.3)}"><rect x="-250" y="-50" width="500" height="100" fill="none" stroke="#2A1E17" stroke-width="7"/><text y="18" font-family="Inter" font-weight="900" font-size="40" fill="#2A1E17" text-anchor="middle">COLECCIÓN GÖRING</text></g></g>`;
  return CAM(cam,w)}
function scCourt(lt,d){const cam=camAt([[0,540,880,1.0],[d,540,900,1.2]],lt);
  let w=`<rect x="-400" y="-400" width="1900" height="2600" fill="#4A3426"/>`+woodRect(-400,-400,1900,2600)+`<rect x="-400" y="-400" width="1900" height="2600" fill="#000" opacity=".25"/>`;
  w+=`<g filter="url(#soft)"><rect x="60" y="660" width="960" height="260" fill="#6E4429" ${OO}/><rect x="60" y="660" width="960" height="40" fill="#8B5A3C" ${OO}/></g>`;
  w+=juez({x:540,y:700,s:1.0,pose:'stand',t:lt,look:0})+`<g transform="translate(760,640) rotate(${lt>d*.6?-20:0})"><rect x="-10" y="-80" width="20" height="80" fill="#3A2A22"/><rect x="-50" y="-110" width="100" height="40" rx="10" fill="#5A3E2B" ${OO}/></g>`;
  w+=pintor({x:540,y:1340,s:1.35,pose:lt>d*.7?'point':'stand',t:lt,face:lt>d*.7?'sly':'sad',look:0,flip:-1});
  return CAM(cam,w)}
function scQuestion(lt,d){let s=`<rect width="1080" height="1920" fill="#3A3226"/>`+woodRect(0,0,1080,1920);
  s+=`<g transform="translate(540,880) rotate(-2)" filter="url(#soft)"><rect x="-400" y="-500" width="800" height="1000" fill="#F2E6CC" ${OO}/><rect x="-400" y="-500" width="800" height="1000" fill="#F2E6CC" filter="url(#paperT)"/>`;
  const k=pr(lt,0,d*.85);s+=`<text y="-40" font-family="Playfair Display" font-weight="900" font-style="italic" font-size="150" fill="none" stroke="${V.blue}" stroke-width="16" stroke-linecap="round" text-anchor="middle" stroke-dasharray="${(2400*k).toFixed(0)} 4000">¿QUÉ</text><text y="140" font-family="Playfair Display" font-weight="900" font-style="italic" font-size="150" fill="none" stroke="${V.yel}" stroke-width="16" text-anchor="middle" stroke-dasharray="${(2400*Math.max(0,k*2-1)).toFixed(0)} 4000">DIJO?</text></g>`;
  s+=`<g transform="translate(${700+Math.sin(lt*3)*60},${1300+Math.cos(lt*2)*40}) rotate(40)" filter="url(#soft)"><rect x="-10" y="-260" width="20" height="260" fill="#8B5A3C" ${OO}/><path d="M-14,0 h28 l-6,60 q-8,14 -16,0z" fill="${V.blue}" ${OO}/></g>`;return s}
function scCountdown(lt,d){let s=`<rect width="1080" height="1920" fill="#3A3226"/>`+woodRect(0,0,1080,1920);
  const sk=(x,y,r,txt,draw)=>`<g transform="${tr(x,y,1,r)}" filter="url(#soft)"><rect x="-190" y="-150" width="380" height="300" fill="#FBF6EA" ${OO}/><g stroke="#3A3226" stroke-width="4" fill="none">${draw}</g><text y="130" font-family="Playfair Display" font-weight="900" font-size="36" fill="${N.ink}" text-anchor="middle">${txt}</text></g>`;
  s+=sk(300,520,-6,'UN «VERMEER»','<rect x="-90" y="-120" width="180" height="200"/><circle cx="0" cy="-40" r="30"/><path d="M-50,80 Q0,0 50,80"/>');
  s+=sk(780,620,5,'VENDIDO A GÖRING','<rect x="-130" y="-110" width="260" height="170"/><line x1="-130" y1="-60" x2="130" y2="-60"/><line x1="-130" y1="0" x2="130" y2="0"/>');
  s+=sk(400,1100,4,'¿QUÉ CONFESÓ?','<text x="0" y="40" font-size="180" text-anchor="middle" stroke="#C8312B" font-family="Playfair Display">?</text>');
  s+=`<g transform="translate(${830+Math.sin(lt)*20},1230) rotate(-20)" filter="url(#soft)"><ellipse rx="150" ry="100" fill="#C9A66B" ${OO}/><circle cx="60" cy="-30" r="24" fill="#2A1E17"/>${[['-70','-30',V.blue],['-20','-60',V.yel],['30','30','#C8312B'],['-60','40','#F2E6CC']].map(([a,b,c])=>`<circle cx="${a}" cy="${b}" r="22" fill="${c}" ${OO}/>`).join('')}</g>`;
  return s}
function scPaint(lt,d){const cam=camAt([[0,540,900,1.05],[d,560,880,1.2]],lt);
  let w=`<rect x="-400" y="-400" width="1900" height="2600" fill="#D8C6A2"/>`+woodRect(-400,1300,1900,900)+`<rect x="-200" y="-200" width="500" height="900" fill="#CFE0EA" opacity=".35"/>`;
  w+=`<g transform="translate(640,800)" filter="url(#soft)"><line x1="-200" y1="500" x2="-60" y2="-380" stroke="#6E4429" stroke-width="20"/><line x1="200" y1="500" x2="60" y2="-380" stroke="#6E4429" stroke-width="20"/><rect x="-220" y="-330" width="440" height="520" fill="#F2E6CC" ${OO}/></g>`;
  const p=pr(lt,.2,d-.2);w+=`<g transform="translate(640,800)"><clipPath id="pc"><rect x="-210" y="-320" width="${420*p}" height="500"/></clipPath><g clip-path="url(#pc)">${vermeer(0,-70,.95).replace('filter="url(#soft)"','')}</g></g>`;
  w+=pintor({x:330,y:1330,s:1.3,pose:'point',t:lt,face:'smile',look:1});
  w+=juez({x:930,y:1330,s:1.0,pose:'notebook',t:lt,look:-1,flip:-1})+agente({x:1080,y:1340,s:.95,pose:'stand',t:lt,look:-1,flip:-1});
  w+=`<g transform="translate(330,880)" opacity="${pr(lt,0,.4)*(1-pr(lt,1.6,2))}"><rect x="-200" y="-60" width="400" height="100" rx="18" fill="#FBF6EA" ${OO}/><text y="8" font-family="Playfair Display" font-weight="900" font-size="46" fill="${N.ink}" text-anchor="middle">«LO PINTÉ YO»</text></g>`;
  return CAM(cam,w)}
function scFake(lt,d){let s=`<rect width="1080" height="1920" fill="${V.wall}"/>`+spot(540,1300,700);
  s+=`<g transform="translate(540,1180)" filter="url(#soft)"><rect x="-300" y="-160" width="600" height="320" fill="#B08A5A" ${OO}/><text y="18" font-family="Inter" font-weight="900" font-size="40" fill="#2A1E17" text-anchor="middle">COLECCIÓN GÖRING</text></g>`;
  const up=eoc(pr(lt,0,1.0));s+=vermeer(540,1080-up*380,.95,pr(lt,d*.5,d*.5+.4));
  return s}
function scPaper(lt,d){let s=woodRect(0,0,1080,1920)+`<rect width="1080" height="1920" fill="url(#lamp)" opacity=".7"/>`;
  const k=eoc(pr(lt,0,.9));s+=`<g transform="translate(540,880) rotate(${(720*(1-k)-4).toFixed(1)}) scale(${(.1+.9*k).toFixed(3)})" filter="url(#soft)"><rect x="-420" y="-540" width="840" height="1080" fill="#EFE6D2" ${OO}/><rect x="-420" y="-540" width="840" height="1080" fill="#EFE6D2" filter="url(#paperT)"/>
  <text y="-440" font-family="Playfair Display" font-weight="900" font-size="60" fill="${N.ink}" text-anchor="middle">DE AMSTERDAMSE KRANT</text><line x1="-380" y1="-410" x2="380" y2="-410" stroke="${N.ink}" stroke-width="5"/>
  <text y="-300" font-family="Playfair Display" font-weight="900" font-size="66" fill="${N.ink}" text-anchor="middle">«EL HOMBRE QUE</text><text y="-220" font-family="Playfair Display" font-weight="900" font-size="66" fill="${N.ink}" text-anchor="middle">ENGAÑÓ A GÖRING»</text>
  <g transform="translate(-180,40) scale(.5)">${vermeer(0,0,1).replace('filter="url(#soft)"','')}</g>${[...Array(8)].map((_,i)=>`<rect x="40" y="${-120+i*40}" width="${300-(i%3)*40}" height="16" fill="${N.ink}" opacity=".25"/>`).join('')}
  <text x="-380" y="420" font-family="Inter" font-weight="900" font-size="40" fill="#C8312B">CONDENADO POR FALSIFICACIÓN</text></g>`;return s}
function scClose(lt,d){let s=museum(lt)+spot(320,1300,520)+spot(760,1300,520);
  s+=`<g transform="translate(0,-60)">${vermeer(320,760,.75)}${vermeer(760,760,.75)}</g>`+brassPlate(320,1110,.4,'¿VERMEER?','1660')+brassPlate(760,1110,.4,'VAN MEEGEREN','1945');
  const sp=pr(lt,.2,.8);if(sp>0)s+=`<g transform="translate(540,1180) rotate(-8) scale(${(1.25-.25*eoc(sp)).toFixed(3)})" opacity="${(eoc(sp)*.95).toFixed(2)}"><rect x="-300" y="-80" width="600" height="160" rx="16" fill="${V.gold}" ${OO}/><text y="34" font-family="Playfair Display" font-weight="900" font-size="90" fill="#2A1E17" text-anchor="middle">CASO CERRADO</text></g>`;
  const lg=pr(lt,d-3.0,d-2.3);if(lg>0)s+=`<g opacity="${lg}">${logoSm(540,420,1.2)}</g>`;
  return s}

let SC=[];
function build(){
  SC=[[0,ph(1),scHook],[ph(1),ph(2),scTitle],[ph(2),ph(3),scArrest],[ph(3),ph(4),scCrate],[ph(4),ph(5)+.2,scCourt],[ph(5)+.2,CD[0],scQuestion],[CD[0],ph(6),scCountdown],
      [ph(6),ph(7),scPaint],[ph(7),ph(8),scFake],[ph(8),ph(9),scPaper],[ph(9),T+1,scClose]];
  STRIPS=[[0,'1945 · UNA ACUSACIÓN GRAVÍSIMA'],[ph(1),'UN ACERTIJO REAL'],[ph(2),'HAN VAN MEEGEREN, DETENIDO'],[ph(3),'¿UN TESORO PARA GÖRING?'],[ph(4),'COLABORAR CON EL ENEMIGO'],
    [ph(5),'PIENSA · PUEDES PAUSAR'],[ph(6),'«LO PINTÉ YO»'],[ph(7),'ERA UNA FALSIFICACIÓN'],[ph(8),'ESTO ES LO QUE HOY SABEMOS'],[ph(9),'CASO CERRADO']];
  CH=[];(window.CAPPH||PH).forEach(([a,b,txt])=>{const ws=txt.split(' ').map(w=>{let [t2,wt]=w.split('|');const k=t2.includes('*');t2=t2.replace(/\*/g,'');return {t:t2,k,w:+(wt||Math.max(2,t2.replace(/[^\wáéíóúñü]/gi,'').length+1))}});
    const tot=ws.reduce((s,w)=>s+w.w,0);let acc=a;ws.forEach(w=>{w.s=acc;acc+=(b-a)*w.w/tot});
    let cur=[];ws.forEach((w,i)=>{cur.push(w);if(/[.,?:…»]$/.test(w.t)||cur.length==3||i==ws.length-1){CH.push(cur);cur=[]}})});
  CH.forEach((c,i)=>{c.start=c[0].s;c.end=i+1<CH.length?Math.min(CH[i+1][0].s,c[c.length-1].s+1.4):T})}
let CH=[];build();
