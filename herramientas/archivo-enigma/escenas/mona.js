const CASE_LABEL='LA GIOCONDA · EL ROBO DE 1911';
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

const peruggia=o=>person({...o,coat:'#F1EDE4',coat2:'#D9D3C6',pants:'#3B3F4C',hair:'#2E2622',style:'short',skin:'#DDB08A'});
const copista=o=>person({...o,coat:'#7A5C8E',coat2:'#634A75',pants:'#3B3F4C',hair:'#C9A66B',style:'long',skin:'#EBC6A2'});
const L={wall:'#8C2F2F',wall2:'#762828',floor:'#C9A27A',gold:'#C9A227',night:'#1A2238'};
function gallery(t,night=0){let s=`<rect x="-400" y="-400" width="1900" height="2600" fill="${L.wall}"/>`+[...Array(12)].map((_,i)=>`<rect x="${-400+i*170}" y="-400" width="85" height="1700" fill="${L.wall2}" opacity=".5"/>`).join('');
  s+=`<rect x="-400" y="1300" width="1900" height="900" fill="${L.floor}"/>`;for(let i=0;i<14;i++)s+=`<line x1="${-400+i*150}" y1="1300" x2="${-700+i*190}" y2="2200" stroke="#A8845F" stroke-width="4"/>`;
  s+=`<rect x="-400" y="1270" width="1900" height="30" fill="#5A3E2B" ${OO}/>`;
  if(night)s+=`<rect x="-400" y="-400" width="1900" height="2600" fill="${L.night}" opacity="${.6*night}"/>`;return s}
function gioconda(x,y,s){return `<g transform="${tr(x,y,s)}" filter="url(#soft)"><rect x="-150" y="-210" width="300" height="420" fill="${L.gold}" ${OO}/><rect x="-128" y="-188" width="256" height="376" fill="#6E7A55"/><path d="M-128,40 Q-60,-20 0,0 Q60,-30 128,20 L128,188 L-128,188Z" fill="#8A9A6A" opacity=".7"/>
  <path d="M-80,188 Q-90,40 0,30 Q90,40 80,188Z" fill="#3A2E22" ${OO}/><ellipse cx="0" cy="-60" rx="46" ry="58" fill="#D9B07E" ${OO}/><path d="M-50,-70 Q-56,-140 0,-128 Q56,-140 50,-70 L56,40 L40,40 L36,-60 Q0,-100 -36,-60 L-40,40 L-56,40Z" fill="#2E2218"/><path d="M-12,-36 q12,6 24,0" fill="none" stroke="${N.ink}" stroke-width="3"/>
  <path d="M-40,100 q40,-20 80,0" fill="none" stroke="#D9B07E" stroke-width="16" stroke-linecap="round"/></g>`}
function hooks(x,y,s){return `<g transform="${tr(x,y,s)}"><rect x="-150" y="-210" width="300" height="420" fill="${L.wall2}" opacity=".9"/><rect x="-150" y="-210" width="300" height="420" fill="none" stroke="#5A1E1E" stroke-width="4" stroke-dasharray="14 10"/>${[-90,90].map(a=>`<path d="M${a},-240 v30 q0,16 14,16" fill="none" stroke="#9AA0A8" stroke-width="8" stroke-linecap="round"/>`).join('')}</g>`}
function closet(x,y,s,open=0,t=0){return `<g transform="${tr(x,y,s)}" filter="url(#soft)"><rect x="-160" y="-520" width="320" height="520" fill="#5A3E2B" ${OO}/><rect x="-140" y="-500" width="280" height="480" fill="#120E0A"/>${open>0?`<g opacity="${open}"><circle cx="-30" cy="-330" r="5" fill="#FFF3C4"/><circle cx="20" cy="-330" r="5" fill="#FFF3C4"/></g>`:''}<g transform="translate(-140,-500) scale(${(1-open*.75).toFixed(3)},1)"><rect width="280" height="480" fill="#7A5536" ${OO}/><rect x="30" y="30" width="220" height="180" fill="none" stroke="#5A3E2B" stroke-width="6"/><rect x="30" y="260" width="220" height="180" fill="none" stroke="#5A3E2B" stroke-width="6"/><circle cx="250" cy="240" r="10" fill="${L.gold}"/></g></g>`}

/* ===== ESCENAS ===== */
function scHook(lt,d){const cam=camAt([[0,540,700,1.5],[d,540,760,1.1]],lt);
  let w=gallery(lt)+(lt<d*.45?gioconda(540,700,1.25):hooks(540,700,1.25));
  if(lt>=d*.45){const q=pop(lt,d*.5,.4);if(q>0)w+=`<g transform="${tr(540,720,q)}"><text y="80" font-family="Playfair Display" font-weight="900" font-size="300" fill="none" stroke="#FBF6EA" stroke-width="10" text-anchor="middle">?</text></g>`}
  w+=`<g transform="translate(540,1070)" filter="url(#soft)"><rect x="-170" y="-34" width="340" height="68" fill="url(#brassG)" ${OO}/><text y="12" font-family="Playfair Display" font-weight="900" font-size="34" fill="#2A1E17" text-anchor="middle">LA GIOCONDA</text></g>`;
  return CAM(cam,w)}
function scTitle(lt,d){ // título en el letrero de salida del museo, con luz verde
  const p=eoc(pr(lt,0,.6));let s=`<rect width="1080" height="1920" fill="#14181F"/>`;
  s+=`<g transform="translate(540,${860-40*(1-p)})" opacity="${p}"><rect x="-430" y="-200" width="860" height="400" rx="20" fill="#0F3B2A" stroke="#2EE68B" stroke-width="8"/><rect x="-430" y="-200" width="860" height="400" rx="20" fill="#2EE68B" opacity=".12" filter="url(#glow)"/><text y="-20" font-family="Playfair Display" font-weight="900" font-size="100" fill="#B8FFD9" text-anchor="middle">UN ACERTIJO</text><text y="110" font-family="Playfair Display" font-weight="900" font-size="100" fill="#FBF6EA" text-anchor="middle">REAL</text><path d="M300,140 h70 l-24,-20 M370,140 l-24,20" stroke="#B8FFD9" stroke-width="8" fill="none"/></g>`;
  return s}
function scWorker(lt,d){const cam=camAt([[0,540,920,1.05],[d,560,900,1.2]],lt);
  let w=gallery(lt)+gioconda(820,640,.8);
  w+=`<g transform="translate(300,680)" filter="url(#soft)"><rect x="-130" y="-110" width="260" height="220" fill="#CFE0EA" ${OO}/><line x1="0" y1="-110" x2="0" y2="110" stroke="${N.ink}" stroke-width="6"/><line x1="-130" y1="0" x2="130" y2="0" stroke="${N.ink}" stroke-width="6"/></g>`;
  w+=peruggia({x:420,y:1320,s:1.3,pose:'point',t:lt,look:1});
  const b=pop(lt,d*.55,.4);if(b>0)w+=`<g transform="${tr(760,1060,b,5)}" filter="url(#soft)"><rect x="-190" y="-110" width="380" height="220" fill="#FBF6EA" ${OO}/><text y="-40" font-family="Inter" font-weight="900" font-size="30" fill="${N.ink}" text-anchor="middle">MUSÉE DU LOUVRE</text><text y="20" font-family="Playfair Display" font-weight="900" font-size="40" fill="${N.ink}" text-anchor="middle">V. PERUGGIA</text><text y="70" font-family="Inter" font-weight="800" font-size="28" fill="#8a6a4a" text-anchor="middle">cristalero</text></g>`;
  return CAM(cam,w)}
function scQuestion(lt,d){ // plano del museo con la ruta borrada
  let s=`<rect width="1080" height="1920" fill="#E6DCC4"/><rect width="1080" height="1920" fill="#E6DCC4" filter="url(#paperT)"/>`;
  s+=`<g stroke="#5C7A9A" stroke-width="6" fill="none">${[[120,420,840,300],[120,760,400,300],[560,760,400,300],[120,1100,840,220]].map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}</g>`;
  s+=`<text x="540" y="480" font-family="Inter" font-weight="900" font-size="28" fill="#5C7A9A" text-anchor="middle">SALON CARRÉ</text><text x="320" y="820" font-family="Inter" font-weight="900" font-size="24" fill="#5C7A9A" text-anchor="middle">ESCALERA</text><text x="760" y="820" font-family="Inter" font-weight="900" font-size="24" fill="#5C7A9A" text-anchor="middle">SALIDA</text>`;
  const k=pr(lt,.2,d-.3);s+=`<path d="M540,600 C540,700 320,700 320,900 S760,880 760,950" fill="none" stroke="#C8312B" stroke-width="10" stroke-dasharray="${(900*k).toFixed(0)} 2000" stroke-linecap="round"/>`;
  const q=pop(lt,d*.5,.4);if(q>0)s+=`<g transform="${tr(540,1210,q)}"><text y="40" font-family="Playfair Display" font-weight="900" font-size="120" fill="#C8312B" text-anchor="middle">¿CÓMO SALIÓ?</text></g>`;return s}
function scCountdown(lt,d){ // de noche en la sala, linterna del vigilante recorriendo las pistas
  let s=gallery(lt,1)+hooks(540,560,.9);
  const bx=540+Math.sin(lt*.8)*360;s+=`<polygon points="540,-100 ${bx-170},1300 ${bx+170},1300" fill="#FFF3C4" opacity=".14"/>`;
  s+=closet(220,1290,.7,0,lt);
  s+=`<g transform="translate(840,760)" filter="url(#soft)"><path d="M-90,-160 L90,-160 L110,140 L-110,140Z" fill="#F1EDE4" ${OO}/><path d="M-90,-160 L-140,-40 L-110,0 M90,-160 L140,-40 L110,0" fill="none" stroke="${N.ink}" stroke-width="5"/><text y="40" font-family="Inter" font-weight="900" font-size="26" fill="${N.ink}" text-anchor="middle">BATA</text></g>`;
  return s}
function scCloset(lt,d){const cam=camAt([[0,540,900,1.1],[d,520,880,1.3]],lt);
  let w=gallery(lt,pr(lt,0,.6))+closet(540,1300,1.3,pr(lt,.3,1.0),lt);
  w+=`<g transform="translate(540,600)" opacity="${pr(lt,.6,1)}"><circle r="90" fill="#FBF6EA" ${OO}/><path d="M0,-50 v50 l30,20" stroke="${N.ink}" stroke-width="10" fill="none"/></g>`;
  return CAM(cam,w)}
function scWalk(lt,d){const p=pr(lt,0,d);const cam=[300+p*560,900,1.0];
  let w=`<defs><linearGradient id="mn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6DDB0"/><stop offset="1" stop-color="#E8C9A0"/></linearGradient></defs><rect x="-400" y="-400" width="2600" height="2600" fill="url(#mn)"/>`;
  for(let i=0;i<10;i++)w+=`<rect x="${-300+i*260}" y="300" width="120" height="1000" fill="#D8BE94" ${OO}/>`;
  w+=`<rect x="-400" y="1300" width="2600" height="900" fill="${L.floor}"/>`;
  w+=hooks(260,640,.7)+peruggia({x:300+p*560,y:1320,s:1.3,pose:'walk',t:lt,face:'neutral',look:1});
  w+=`<rect x="${300+p*560-62}" y="${1320-260}" width="124" height="150" rx="20" fill="#E9E3D6" opacity=".95"/><rect x="${300+p*560-50}" y="${1320-250}" width="100" height="70" fill="${L.gold}" opacity=".35"/>`;
  for(let i=0;i<2;i++)w+=person({x:1100+i*320,y:1320,s:1.15,pose:'stand',t:lt,coat:'#2F3B5C',coat2:'#252F4A',pants:'#2F3B5C',hair:'#2E2622',style:'short',hat:'beanie',look:-1,flip:-1});
  return CAM(cam,w)}
function scNobody(lt,d){let s=gallery(lt)+hooks(540,700,1.2);
  s+=copista({x:250,y:1330,s:1.2,pose:'point',t:lt,face:'scared',look:1});
  s+=`<g transform="translate(820,1080)" filter="url(#soft)"><rect x="-120" y="-150" width="240" height="300" fill="#FBF6EA" ${OO}/><line x1="-160" y1="250" x2="-60" y2="-150" stroke="#6E4429" stroke-width="12"/><line x1="160" y1="250" x2="60" y2="-150" stroke="#6E4429" stroke-width="12"/></g>`;
  const t2=pop(lt,.4,.4);if(t2>0)s+=`<g transform="${tr(540,1120,t2,-4)}" filter="url(#soft)"><rect x="-230" y="-56" width="460" height="100" rx="16" fill="#FBF6EA" ${OO}/><text y="16" font-family="Playfair Display" font-weight="900" font-size="48" fill="#C8312B" text-anchor="middle">+24 HORAS</text></g>`;
  return s}
function scFlorence(lt,d){let s=`<defs><linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9CC3E0"/><stop offset="1" stop-color="#F6DDB0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#fl)"/>`;
  s+=`<g filter="url(#soft)"><path d="M380,900 Q540,640 700,900Z" fill="#C8643A" ${OO}/><rect x="380" y="900" width="320" height="400" fill="#E8DCC4" ${OO}/><rect x="760" y="700" width="90" height="600" fill="#E8DCC4" ${OO}/><path d="M750,700 l55,-90 l55,90z" fill="#C8643A" ${OO}/></g><rect x="0" y="1300" width="1080" height="620" fill="#B08A5A"/>`;
  const k=eoc(pr(lt,.3,1.2));s+=`<g transform="translate(540,${1700-k*700}) rotate(${(1-k)*20})">${gioconda(0,0,.9)}</g>`;
  const a=pop(lt,d*.55,.4);if(a>0)s+=`<g transform="${tr(540,620,a,-6)}" filter="url(#soft)"><rect x="-260" y="-60" width="520" height="110" rx="12" fill="#FBF6EA" ${OO}/><text y="16" font-family="Playfair Display" font-weight="900" font-size="52" fill="${N.ink}" text-anchor="middle">FLORENCIA, 1913</text></g>`;
  return s}
function scClose(lt,d){let s=gallery(lt)+gioconda(540,700,1.2);
  for(let i=0;i<5;i++)s+=`<circle cx="${200+i*170}" cy="${1250+Math.sin(lt*3+i)*6}" r="26" fill="#EBC6A2" ${OO}/>`;
  const sp=pr(lt,.2,.8);if(sp>0)s+=`<g transform="translate(540,1130) rotate(-8) scale(${(1.25-.25*eoc(sp)).toFixed(3)})" opacity="${(eoc(sp)*.95).toFixed(2)}"><rect x="-300" y="-80" width="600" height="160" rx="16" fill="#FBF6EA" stroke="${L.gold}" stroke-width="12"/><text y="34" font-family="Playfair Display" font-weight="900" font-size="90" fill="${L.wall}" text-anchor="middle">CASO CERRADO</text></g>`;
  const lg=pr(lt,d-3.0,d-2.3);if(lg>0)s+=`<g opacity="${lg}">${logoSm(540,300+60,1.0)}</g>`;
  return s}

let SC=[];
function build(){
  SC=[[0,ph(1),scHook],[ph(1),ph(2),scTitle],[ph(2),ph(3)+.2,scWorker],[ph(3)+.2,CD[0],scQuestion],[CD[0],ph(4),scCountdown],
      [ph(4),ph(5),scCloset],[ph(5),ph(6),scWalk],[ph(6),ph(7),scNobody],[ph(7),ph(8),scFlorence],[ph(8),T+1,scClose]];
  STRIPS=[[0,'¿DÓNDE ESTÁ LA GIOCONDA?'],[ph(1),'UN ACERTIJO REAL'],[ph(2),'PARÍS, AGOSTO DE 1911'],[ph(3),'PIENSA · PUEDES PAUSAR'],[ph(4),'UNA NOCHE EN EL ARMARIO'],
    [ph(5),'BAJO LA BATA BLANCA'],[ph(6),'NADIE NOTÓ EL HUECO'],[ph(7),'ESTO ES LO QUE HOY SABEMOS'],[ph(8),'CASO CERRADO']];
  CH=[];(window.CAPPH||PH).forEach(([a,b,txt])=>{const ws=txt.split(' ').map(w=>{let [t2,wt]=w.split('|');const k=t2.includes('*');t2=t2.replace(/\*/g,'');return {t:t2,k,w:+(wt||Math.max(2,t2.replace(/[^\wáéíóúñü]/gi,'').length+1))}});
    const tot=ws.reduce((s,w)=>s+w.w,0);let acc=a;ws.forEach(w=>{w.s=acc;acc+=(b-a)*w.w/tot});
    let cur=[];ws.forEach((w,i)=>{cur.push(w);if(/[.,?:…»]$/.test(w.t)||cur.length==3||i==ws.length-1){CH.push(cur);cur=[]}})});
  CH.forEach((c,i)=>{c.start=c[0].s;c.end=i+1<CH.length?Math.min(CH[i+1][0].s,c[c.length-1].s+1.4):T})}
let CH=[];build();
