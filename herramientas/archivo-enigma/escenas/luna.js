const CASE_LABEL='EL TESTIGO Y LA LUNA LLENA';
const M={n1:'#0E1630',n2:'#1D2B52',n3:'#3A4A78',sea:'#1C3557',sea2:'#2B4D78',moon:'#F6EFD6',moonG:'#FFF6D8',mount:'#18213D',mount2:'#253159',house:'#E8DCC4',roof:'#8F4A34',win:'#F7D58B',grass:'#1E3A2F',sun:'#F29E4C'};
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

/* ===== decorados ===== */
function nightSky(id,t,a=M.n1,b=M.n3){let s=`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect x="-600" y="-600" width="2400" height="2800" fill="url(#${id})"/>`;
  for(let i=0;i<60;i++)s+=`<circle cx="${(rnd(i)*2000-400).toFixed(0)}" cy="${(rnd(i+9)*1300-500).toFixed(0)}" r="${(1.2+rnd(i+3)*2.2).toFixed(1)}" fill="#fff" opacity="${(.25+.6*Math.abs(Math.sin(t*1.3+i))).toFixed(2)}"/>`;return s}
function moonAt(x,y,r=80,glow=1){return `<circle cx="${x}" cy="${y}" r="${r*3}" fill="${M.moonG}" opacity="${(.14*glow).toFixed(2)}" filter="url(#glow)"/><circle cx="${x}" cy="${y}" r="${r*1.5}" fill="${M.moonG}" opacity="${(.18*glow).toFixed(2)}" filter="url(#glow)"/><circle cx="${x}" cy="${y}" r="${r}" fill="${M.moon}" ${OO}/><circle cx="${x-r*.3}" cy="${y-r*.25}" r="${r*.18}" fill="#E5DCC0"/><circle cx="${x+r*.32}" cy="${y+r*.2}" r="${r*.12}" fill="#E5DCC0"/><circle cx="${x+r*.05}" cy="${y+r*.45}" r="${r*.09}" fill="#E5DCC0"/>`}
function mountains2(y,c1=M.mount2,c2=M.mount){return `<path d="M-600,${y} L-300,${y-260} L-60,${y-120} L200,${y-380} L480,${y-150} L760,${y-300} L1100,${y-90} L1400,${y-240} L1800,${y} Z" fill="${c1}" ${OO}/><path d="M-600,${y} L-200,${y-140} L120,${y-60} L420,${y-200} L700,${y-80} L980,${y-170} L1300,${y-40} L1800,${y}Z" fill="${c2}" ${OO}/>`}
function seaNight(t,y){let s=`<rect x="-600" y="${y}" width="2400" height="1400" fill="${M.sea}"/>`;for(let r=0;r<8;r++){const yy=y+16+r*r*10;let d=`M-600,${yy}`;for(let x=-600;x<=1800;x+=60)d+=` Q${x+30},${(yy+Math.sin(t*1.6+x/80+r)*5).toFixed(1)} ${x+60},${yy}`;s+=`<path d="${d}" fill="none" stroke="${M.sea2}" stroke-width="${3+r*.4}" opacity=".8"/>`}return s}
function moonPath(x,y,w){return `<rect x="${x-w/2}" y="${y}" width="${w}" height="400" fill="${M.moonG}" opacity=".12" filter="url(#bl)"/>`}
function house(x,y,s,lit=1,open=0){return `<g transform="${tr(x,y,s)}" filter="url(#soft)"><rect x="-220" y="-300" width="440" height="300" fill="${M.house}" ${OO}/><path d="M-250,-300 L0,-470 L250,-300Z" fill="${M.roof}" ${OO}/><rect x="-60" y="-150" width="110" height="150" fill="#5A3E2B" ${OO}/>
  <rect x="-180" y="-240" width="100" height="90" fill="${lit?M.win:'#2E3A5C'}" ${OO}/><g transform="translate(110,-240)"><rect x="0" y="0" width="100" height="90" fill="${open?'#1a1a2a':(lit?M.win:'#2E3A5C')}" ${OO}/>${open?`<path d="M0,0 l-34,10 v80 l34,-10z" fill="#E8DCC4" ${OO}/>`:''}</g></g>`}
function frameEmpty(x,y,s){return `<g transform="${tr(x,y,s)}" filter="url(#soft)"><rect x="-170" y="-130" width="340" height="260" fill="none" stroke="#B08A3E" stroke-width="26"/><rect x="-157" y="-117" width="314" height="234" fill="none" stroke="${N.ink}" stroke-width="4" stroke-dasharray="14 10"/></g>`}
function painting(x,y,s,r=0){return `<g transform="${tr(x,y,s,r)}" filter="url(#soft)"><rect x="-170" y="-130" width="340" height="260" fill="#B08A3E" ${OO}/><rect x="-148" y="-108" width="296" height="216" fill="#9CC3E0"/><rect x="-148" y="20" width="296" height="88" fill="#3F7AA6"/><path d="M-30,20 L-30,-70 L40,10Z" fill="#FBF6EA" ${OO}/><path d="M-60,20 h110 l-16,22 h-80z" fill="#8F4A34" ${OO}/><circle cx="100" cy="-60" r="22" fill="#F2C14E"/><text x="120" y="96" font-family="Playfair Display" font-size="16" fill="${N.ink}">papá</text></g>`}

/* ===== ESCENAS ===== */
function scHook(lt,d){const cam=camAt([[0,540,760,1.3],[d,540,800,1.05]],lt);
  let w=nightSky('n0',lt)+moonAt(820,560+lt*4,70)+mountains2(700)+seaNight(lt,900)+house(380,920,1.1,1,1);
  w+=`<g transform="translate(820,690)" opacity="${pr(lt,.8,1.3)}"><rect x="-150" y="-30" width="300" height="56" rx="10" fill="${N.paper}" ${OO}/><text y="12" font-family="Inter" font-weight="900" font-size="28" fill="${N.ink}" text-anchor="middle">SEGÚN EL TESTIGO</text></g>`;
  w+=vecino({x:800,y:1180,s:1.15,pose:'point',t:lt,face:'sly',look:-1,flip:-1});
  return CAM(cam,w)}
function scTitle(lt,d){let s=woodRect(0,0,1080,1920)+`<rect width="1080" height="1920" fill="url(#lamp)" opacity=".8"/>`;const p=eoc(pr(lt,0,.6));
  s+=`<g transform="translate(540,${(900-60*(1-p)).toFixed(0)}) rotate(${(-4+2*Math.sin(lt)).toFixed(2)}) scale(${(.92+.08*p).toFixed(3)})" filter="url(#soft)">${paperRect(-400,-230,800,460,6)}<text y="-60" font-family="Playfair Display" font-weight="900" font-size="96" fill="${N.ink}" text-anchor="middle">UN ACERTIJO</text><text y="60" font-family="Playfair Display" font-weight="900" font-size="96" fill="${N.scarf}" text-anchor="middle">AL DÍA</text><line x1="-200" y1="120" x2="200" y2="120" stroke="${N.ink}" stroke-width="4"/></g>`;
  s+=`<g transform="translate(${(800+30*Math.sin(lt*2)).toFixed(0)},1240) rotate(-20)" filter="url(#soft)"><circle r="90" fill="none" stroke="#5A4636" stroke-width="22"/><circle r="90" fill="#CFE6F2" opacity=".35"/><rect x="70" y="60" width="30" height="160" rx="10" transform="rotate(-45,70,60)" fill="#5A4636" ${OO}/></g>`;return s}
function scElena(lt,d){const cam=camAt([[0,540,900,1.15],[d,540,880,1.3]],lt);
  let w=`<rect x="-300" y="-300" width="1680" height="2400" fill="#E3D4B6"/>`;for(let i=0;i<16;i++)w+=`<rect x="${-300+i*110}" y="-300" width="55" height="1600" fill="#D2BF9A" opacity=".4"/>`;
  w+=woodRect(-300,1300,1680,900)+`<rect x="-300" y="-300" width="1680" height="2400" fill="#0E1630" opacity=".18"/>`;
  w+=frameEmpty(540,600,1.2);
  const ph2=pop(lt,1.0,.5);if(ph2>0)w+=`<g transform="${tr(860,820,ph2*.5,8)}"><rect x="-190" y="-150" width="380" height="330" fill="#FBF6EA" ${OO}/>${painting(0,-10,1)}<text y="160" font-family="Playfair Display" font-weight="900" font-size="30" fill="${N.ink}" text-anchor="middle">EL CUADRO</text></g>`;
  w+=elena({x:420,y:1320,s:1.3,pose:'stand',t:lt,face:'sad',look:1});
  return CAM(cam,w)}
function scNeighbor(lt,d){const cam=camAt([[0,540,920,1.05],[d,540,900,1.18]],lt);
  let w=nightSky('n1',lt,M.n1,M.n2)+moonAt(540,240,60)+`<rect x="-400" y="900" width="1900" height="1200" fill="${M.grass}"/>`+house(540,920,1.25,1,1);
  w+=vecino({x:300,y:1300,s:1.2,pose:'point',t:lt,face:'neutral',look:1})+inspectora({x:780,y:1300,s:1.2,pose:'notebook',t:lt,look:-1,flip:-1});
  return CAM(cam,w)}
function scVersion(lt,d){ // flashback: 12:00, la luna escondiéndose tras el monte, sombra saltando
  const cam=camAt([[0,540,760,1.15],[d,540,760,1.3]],lt);
  let w=nightSky('n2',lt,'#2B2440','#5A4A6E')+moonAt(700,640+pr(lt,0,d)*60,80)+mountains2(760,'#3B3150','#2A2238')+seaNight(lt,900)+house(320,1000,1.0,0,1);
  const j=pr(lt,d*.55,d*.85);w+=`<g transform="translate(${430+j*160},${780+Math.sin(j*Math.PI)*-60+j*120})" opacity="${j>0?1:0}"><ellipse rx="26" ry="40" fill="#0b0b14"/><circle cy="-56" r="22" fill="#0b0b14"/><rect x="-40" y="-30" width="22" height="70" fill="#0b0b14" transform="rotate(-30)"/></g>`;
  let s=CAM(cam,w)+`<rect width="1080" height="1920" fill="#C9A66B" opacity=".18"/>`;
  s+=`<g transform="translate(220,1180)" filter="url(#soft)"><circle r="96" fill="#FBF6EA" ${OO}/><line x1="0" y1="0" x2="0" y2="-56" stroke="${N.ink}" stroke-width="9" stroke-linecap="round"/><line x1="0" y1="0" x2="0" y2="-76" stroke="${N.ink}" stroke-width="5" stroke-linecap="round"/><text y="60" font-family="Playfair Display" font-weight="900" font-size="30" fill="${N.ink}" text-anchor="middle">12:00</text></g>`;
  s+=`<g transform="translate(760,1180) rotate(4)" filter="url(#soft)"><rect x="-190" y="-40" width="380" height="74" rx="10" fill="${N.paper}" ${OO}/><text y="12" font-family="Playfair Display" font-weight="900" font-size="36" fill="${N.ink}" text-anchor="middle">SU VERSIÓN</text></g>`;
  return s}
function scSmile(lt,d){const z=1+lt*.08;
  let s=nightSky('n3',lt,M.n1,M.n2)+moonAt(820,300,70);
  s+=`<g transform="translate(540,1950) scale(${(3.0*z).toFixed(3)})">${inspectora({pose:'stand',t:lt,face:lt>d*.5?'smile':'neutral',look:.6})}</g><rect width="1080" height="1920" fill="url(#vig)"/>`;
  return s}
function scQuestion(lt,d){let s=woodRect(0,0,1080,1920)+`<rect width="1080" height="1920" fill="url(#lamp)" opacity=".8"/>`;const p=eob(cl(lt/.6));
  s+=`<g transform="translate(540,760) rotate(-3) scale(${(.9+.1*p).toFixed(3)})" filter="url(#soft)">${paperRect(-420,-260,840,520,6)}<text y="-60" font-family="Playfair Display" font-weight="900" font-size="120" fill="${N.ink}" text-anchor="middle">¿POR QUÉ</text><text y="80" font-family="Playfair Display" font-weight="900" font-size="120" fill="${N.scarf}" text-anchor="middle">MIENTE?</text></g>`;return s}
let PCACHE=null;
function scCountdown(lt,d){let s=woodRect(0,0,1080,1920)+`<rect width="1080" height="1920" fill="url(#lamp)" opacity=".9"/>`;
  if(!PCACHE)PCACHE=[nightSky('pa',0)+`<g transform="translate(540,700)"><circle r="230" fill="#FBF6EA" ${OO}/><line x1="0" y1="0" x2="0" y2="-140" stroke="${N.ink}" stroke-width="22" stroke-linecap="round"/><line x1="0" y1="0" x2="0" y2="-190" stroke="${N.ink}" stroke-width="12" stroke-linecap="round"/></g>`,
    nightSky('pb',0)+moonAt(540,700,220),
    nightSky('pc',0,'#2B2440','#5A4A6E')+moonAt(620,760,120)+mountains2(900,'#3B3150','#2A2238')];
  const dr=k=>Math.sin(lt*.8+k)*1.5;
  s+=polaroid(300,640,-8+dr(0),1.05,PCACHE[0],'A LAS 12:00')+polaroid(780,720,7+dr(1),1.0,PCACHE[1],'LUNA LLENA')+polaroid(420,1180,4+dr(2),1.0,PCACHE[2],'¿SE ESCONDÍA?');
  const tg=[[300,640],[780,720],[420,1180]][Math.floor(lt/3.3)%3];const hx=tg[0]+120+Math.sin(lt*2)*10,hy=tg[1]+200;
  s+=`<g transform="translate(${hx},${hy}) rotate(-35)" filter="url(#soft)"><rect x="-30" y="0" width="60" height="260" rx="20" fill="#C9A66B" ${OO}/><path d="M-26,0 q-6,-40 10,-56 v-60 q0,-14 12,-14 q12,0 12,14 v50 q30,-6 32,20 q2,26 -10,46z" fill="#C98F67" ${OO}/></g>`;return s}
function skyArc(lt,d,mode){ // diagrama del recorrido de la luna llena
  let s=nightSky('n4',lt,'#1D2B52','#4A5A8C');
  const cx=540,cy=1080,R=420;
  s+=`<path d="M${cx-R},${cy} A${R},${R} 0 0 1 ${cx+R},${cy}" fill="none" stroke="${N.paper}" stroke-width="5" stroke-dasharray="16 14" opacity=".8"/>`;
  s+=`<rect x="-100" y="${cy}" width="1300" height="900" fill="${M.grass}"/><line x1="-100" y1="${cy}" x2="1200" y2="${cy}" stroke="${N.ink}" stroke-width="6"/>`;
  s+=`<text x="${cx-R}" y="${cy+60}" font-family="Inter" font-weight="900" font-size="30" fill="${N.paper}" text-anchor="middle">ESTE</text><text x="${cx+R}" y="${cy+60}" font-family="Inter" font-weight="900" font-size="30" fill="${N.paper}" text-anchor="middle">OESTE</text>`;
  let k;if(mode==='path')k=eio(pr(lt,.2,d-.3));else k=.5;
  const a=Math.PI*(1-k),mx=cx+Math.cos(a)*R,my=cy-Math.sin(a)*R;
  if(mode==='path'){const sp=pr(lt,0,.8);s+=`<circle cx="${cx+R}" cy="${cy+60*sp}" r="56" fill="${M.sun}" ${OO} opacity="${(1-sp).toFixed(2)}"/>`}
  s+=moonAt(mx,my,62);
  const lab=(x,y,txt,on)=>`<g transform="translate(${x},${y})" opacity="${on}" filter="url(#soft)"><rect x="-${txt.length*11+24}" y="-30" width="${txt.length*22+48}" height="54" rx="10" fill="${N.paper}" ${OO}/><text y="10" font-family="Inter" font-weight="900" font-size="26" fill="${N.ink}" text-anchor="middle">${txt}</text></g>`;
  s+=lab(300,cy+150,'ATARDECER: SALE',mode==='path'?pr(lt,.2,.6):1)+lab(cx,cy-R-110,'MEDIANOCHE: ARRIBA',mode==='path'?pr(lt,1.4,1.8):1)+lab(760,cy+240,'AMANECER: SE ESCONDE',mode==='path'?pr(lt,2.6,3.0):1);
  if(mode==='top'){const g=pr(lt,.3,.8);s+=`<circle cx="${cx}" cy="${cy-R}" r="${110+8*Math.sin(lt*5)}" fill="none" stroke="${N.warm}" stroke-width="8" opacity="${g}"/>`;
    const x2=pr(lt,1.6,2.1);s+=`<g opacity="${x2}"><circle cx="${cx+R-60}" cy="${cy-30}" r="50" fill="none" stroke="#C8312B" stroke-width="8"/><line x1="${cx+R-95}" y1="${cy-65}" x2="${cx+R-25}" y2="${cy+5}" stroke="#C8312B" stroke-width="10"/></g>`;
    s+=`<g transform="translate(540,1310)" filter="url(#soft)" opacity="${pr(lt,.4,.9)}"><rect x="-300" y="-54" width="600" height="100" rx="14" fill="${N.paper}" ${OO}/><text y="16" font-family="Playfair Display" font-weight="900" font-size="52" fill="${N.ink}" text-anchor="middle">12:00 → LO MÁS ALTO</text></g>`}
  return s}
function scPath(lt,d){return skyArc(lt,d,'path')}
function scTop(lt,d){return skyArc(lt,d,'top')}
function scGarage(lt,d){const cam=camAt([[0,540,900,1.0],[d,560,880,1.2]],lt);
  let w=`<rect x="-300" y="-300" width="1680" height="2400" fill="#2A2A33"/>`;for(let i=0;i<14;i++)w+=`<rect x="${-300+i*120}" y="200" width="118" height="80" fill="#34343F" ${OO}/>`;
  w+=`<rect x="-300" y="1300" width="1680" height="900" fill="#3A3A44"/>`;
  const beam=pr(lt,.1,.8);w+=`<polygon points="1000,640 600,${560-180*beam} 600,${760+180*beam}" fill="#FFF3C4" opacity="${(.28*beam).toFixed(2)}"/>`;
  const rev=pop(lt,.7,.5);w+=painting(520,700,1.05*Math.max(.001,rev),-4);
  w+=`<g transform="translate(520,700)"><path d="M-260,-200 Q0,${-260+rev*200} 260,-200 L300,240 L-300,240Z" fill="#7A7468" opacity="${(1-rev).toFixed(2)}"/></g>`;
  w+=inspectora({x:880,y:1320,s:1.2,pose:'point',t:lt,look:-1,flip:-1})+vecino({x:220,y:1320,s:1.2,pose:lt>1.2?'scared':'stand',t:lt,face:lt>1.2?'scared':'neutral',look:1});
  return CAM(cam,w)}
function scClose(lt,d){const cam=camAt([[0,540,900,1.1],[d,540,880,1.02]],lt);
  let w=`<rect x="-300" y="-300" width="1680" height="2400" fill="#E3D4B6"/>`+woodRect(-300,1300,1680,900);
  w+=`<g transform="translate(860,420)"><rect x="-160" y="-150" width="320" height="300" fill="#1D2B52" ${OO}/>${moonAt(860-860,420-500,40)}</g>`;
  w+=painting(380,600,1.1)+elena({x:420,y:1320,s:1.3,pose:'stand',t:lt,face:'smile',look:1})+inspectora({x:760,y:1320,s:1.25,pose:'stand',t:lt,face:'smile',look:-1,flip:-1});
  let s=CAM(cam,w);
  const sp=pr(lt,.2,.8);if(sp>0)s+=`<g transform="translate(560,1060) rotate(-10) scale(${(1.25-.25*eoc(sp)).toFixed(3)})" opacity="${(eoc(sp)*.92).toFixed(2)}"><rect x="-300" y="-80" width="600" height="160" rx="16" fill="#FBF6EA" opacity=".7"/><rect x="-300" y="-80" width="600" height="160" rx="16" fill="none" stroke="#9B2F27" stroke-width="12"/><text y="34" font-family="Playfair Display" font-weight="900" font-size="96" fill="#9B2F27" text-anchor="middle">CASO CERRADO</text></g>`;
  const lg=pr(lt,d-3.0,d-2.3);if(lg>0)s+=`<g opacity="${lg}">${logoSm(540,820,1.4)}</g>`;
  return s}

let SC=[];
function build(){
  SC=[[0,ph(1),scHook],[ph(1),ph(2),scTitle],[ph(2),ph(3),scElena],[ph(3),ph(4),scNeighbor],[ph(4),ph(5),scVersion],[ph(5),ph(6)+.2,scSmile],[ph(6)+.2,CD[0],scQuestion],[CD[0],ph(7),scCountdown],
      [ph(7),ph(8),scPath],[ph(8),ph(9),scTop],[ph(9),ph(10),scGarage],[ph(10),T+1,scClose]];
  STRIPS=[[0,'¿MIENTE EL TESTIGO?'],[ph(1),'UN ACERTIJO AL DÍA'],[ph(2),'ROBAN EL CUADRO DE SU PADRE'],[ph(3),'EL VECINO LO VIO TODO'],[ph(4),'SU VERSIÓN: 12:00'],[ph(5),'LA INSPECTORA SONRÍE'],
    [ph(6),'PIENSA · PUEDES PAUSAR'],[ph(7),'EL CAMINO DE LA LUNA LLENA'],[ph(8),'MEDIANOCHE: LO MÁS ALTO'],[ph(9),'EL LADRÓN ERA ÉL'],[ph(10),'CASO CERRADO']];
  CH=[];(window.CAPPH||PH).forEach(([a,b,txt])=>{const ws=txt.split(' ').map(w=>{let [t2,wt]=w.split('|');const k=t2.includes('*');t2=t2.replace(/\*/g,'');return {t:t2,k,w:+(wt||Math.max(2,t2.replace(/[^\wáéíóúñü]/gi,'').length+1))}});
    const tot=ws.reduce((s,w)=>s+w.w,0);let acc=a;ws.forEach(w=>{w.s=acc;acc+=(b-a)*w.w/tot});
    let cur=[];ws.forEach((w,i)=>{cur.push(w);if(/[.,?:…]$/.test(w.t)||cur.length==3||i==ws.length-1){CH.push(cur);cur=[]}})});
  CH.forEach((c,i)=>{c.start=c[0].s;c.end=i+1<CH.length?Math.min(CH[i+1][0].s,c[c.length-1].s+1.4):T})}
let CH=[];build();
