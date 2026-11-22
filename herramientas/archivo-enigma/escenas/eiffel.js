const CASE_LABEL='LUSTIG · LA TORRE EIFFEL';
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

const lustig=o=>person({...o,coat:'#2B2B33',coat2:'#1F1F26',pants:'#2B2B33',hair:'#1F1410',style:'short',hat:'fedora',skin:'#E8C29C'});
const poisson=o=>person({...o,coat:'#7A5C3E',coat2:'#634A32',pants:'#4A3B2E',hair:'#8A8A8A',style:'bald',beard:'#8A8A8A',skin:'#E2B48C',tall:.95});
const P={sky1:'#F2B880',sky2:'#F7E1B5',iron:'#6E5A4E',rust:'#B5653A',deco:'#1F3B4D',gold:'#C9A227',cream:'#F2E6CC'};
function tower(x,y,s,rust=0){let g=`<path d="M-260,0 Q-120,-300 -40,-700 L-24,-1000 L24,-1000 L40,-700 Q120,-300 260,0 L170,0 Q60,-180 0,-200 Q-60,-180 -170,0Z" fill="${P.iron}" ${OO}/>`;
  g+=`<rect x="-150" y="-330" width="300" height="34" fill="${P.iron}" ${OO}/><rect x="-80" y="-720" width="160" height="26" fill="${P.iron}" ${OO}/><line x1="0" y1="-1000" x2="0" y2="-1080" stroke="${N.ink}" stroke-width="10"/>`;
  for(let i=0;i<9;i++)g+=`<path d="M${-200+i*10},${-40-i*70} L${200-i*10},${-100-i*70} M${200-i*10},${-40-i*70} L${-200+i*10},${-100-i*70}" stroke="#4E3F36" stroke-width="4" opacity=".7"/>`;
  if(rust)for(let i=0;i<14;i++)g+=`<circle cx="${(rnd(i)*300-150)*(1-rnd(i+4)*.5)}" cy="${-rnd(i+2)*900}" r="${10+rnd(i+5)*22}" fill="${P.rust}" opacity="${rust*.8}"/>`;
  return `<g transform="${tr(x,y,s)}" filter="url(#soft)">${g}</g>`}
function parisSky(id,t){let s=`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.sky1}"/><stop offset="1" stop-color="${P.sky2}"/></linearGradient></defs><rect x="-400" y="-400" width="1900" height="2600" fill="url(#${id})"/>`;
  for(let i=0;i<9;i++){const x=-300+i*190,h=180+rnd(i+40)*120;s+=`<rect x="${x}" y="${1300-h}" width="180" height="${h}" fill="#E8D8BC" ${OO}/><path d="M${x},${1300-h} h180 l-20,-50 h-140z" fill="#5E6B7A" ${OO}/>${[0,1,2].map(c=>`<rect x="${x+20+c*55}" y="${1300-h+30}" width="34" height="50" fill="#6E8098" ${OO}/>`).join('')}`}
  return s+`<rect x="-400" y="1300" width="1900" height="900" fill="#9A8F80"/>`}
function decoFrame(inner){return `<rect width="1080" height="1920" fill="${P.deco}"/>`+inner+`<rect x="40" y="290" width="1000" height="1180" fill="none" stroke="${P.gold}" stroke-width="10"/><rect x="60" y="310" width="960" height="1140" fill="none" stroke="${P.gold}" stroke-width="3"/>${[0,1,2,3].map(i=>`<path d="M${i<2?40:1040},${i%2?1470:290} l${i<2?60:-60},0 l${i<2?-60:60},${i%2?-60:60}z" fill="${P.gold}"/>`).join('')}`}
function seal(x,y,s,txt){return `<g transform="${tr(x,y,s,-8)}" filter="url(#soft)"><circle r="120" fill="#9B2F27" ${OO}/><circle r="96" fill="none" stroke="#C25A4E" stroke-width="6"/><text y="14" font-family="Playfair Display" font-weight="900" font-size="40" fill="#F2E6CC" text-anchor="middle">${txt}</text></g>`}

/* ===== ESCENAS ===== */
function scHook(lt,d){const cam=camAt([[0,540,600,1.35],[d,540,760,1.0]],lt);
  let w=parisSky('p0',lt)+tower(540,1300,1.0);
  const sg=pop(lt,.3,.5);if(sg>0)w+=`<g transform="${tr(540,820+Math.sin(lt*3)*8,sg,Math.sin(lt*2.4)*5)}"><line x1="-120" y1="-140" x2="-60" y2="-50" stroke="${N.ink}" stroke-width="5"/><line x1="120" y1="-140" x2="60" y2="-50" stroke="${N.ink}" stroke-width="5"/><g filter="url(#soft)"><rect x="-220" y="-60" width="440" height="140" fill="#FBF6EA" ${OO}/><text y="40" font-family="Playfair Display" font-weight="900" font-size="88" fill="#C8312B" text-anchor="middle">SE VENDE</text></g></g>`;
  const x2=pop(lt,d*.4,.4);if(x2>0)w+=`<g transform="${tr(800,520,x2,10)}" filter="url(#soft)"><circle r="90" fill="${P.gold}" ${OO}/><text y="34" font-family="Playfair Display" font-weight="900" font-size="96" fill="#2A1E17" text-anchor="middle">×2</text></g>`;
  return CAM(cam,w)}
function scTitle(lt,d){const p=eoc(pr(lt,0,.6));
  return decoFrame(`<g transform="translate(540,${880-40*(1-p)})" opacity="${p}">${tower(0,420,.62)}<text y="-260" font-family="Playfair Display" font-weight="900" font-size="104" fill="${P.gold}" text-anchor="middle">UN ACERTIJO</text><text y="-140" font-family="Playfair Display" font-weight="900" font-size="104" fill="${P.cream}" text-anchor="middle">REAL</text><text y="540" font-family="Inter" font-weight="800" font-size="36" fill="${P.gold}" text-anchor="middle" letter-spacing="10">PARÍS · 1925</text></g>`)}
function scRust(lt,d){const cam=camAt([[0,540,800,1.0],[d,540,640,1.35]],lt);
  let w=parisSky('p1',lt)+tower(540,1300,1.0,pr(lt,.2,1.6));
  for(let i=0;i<6;i++){const k=pr(lt,1.2+i*.2,2.4+i*.2);if(k>0&&k<1)w+=`<g transform="translate(${540+(i-3)*80+k*(i-2.5)*120},${700+k*700})" opacity="${1-k}"><circle r="30" fill="${P.gold}" ${OO}/><text y="10" font-family="Inter" font-weight="900" font-size="28" fill="#2A1E17" text-anchor="middle">F</text></g>`}
  return CAM(cam,w)}
function scHotel(lt,d){const cam=camAt([[0,540,920,1.05],[d,540,900,1.18]],lt);
  let w=`<rect x="-400" y="-400" width="1900" height="2600" fill="#6B2E2E"/>`+[...Array(12)].map((_,i)=>`<rect x="${-400+i*170}" y="-400" width="85" height="1700" fill="#5A2626" opacity=".7"/>`).join('')+woodRect(-400,1300,1900,900);
  w+=`<g transform="translate(540,300)" filter="url(#soft)"><line x1="0" y1="-300" x2="0" y2="-60" stroke="${P.gold}" stroke-width="6"/>${[-120,-60,0,60,120].map(x=>`<path d="M${x},-40 q-10,40 0,70 q10,-30 0,-70" fill="#FFF3C4" stroke="${P.gold}" stroke-width="3"/>`).join('')}<path d="M-150,-60 Q0,20 150,-60" fill="none" stroke="${P.gold}" stroke-width="8"/></g><ellipse cx="540" cy="300" rx="300" ry="160" fill="#FFF3C4" opacity=".15" filter="url(#glow)"/>`;
  w+=`<g filter="url(#soft)"><rect x="160" y="1100" width="760" height="40" fill="#5A3E2B" ${OO}/><rect x="200" y="1140" width="30" height="180" fill="#5A3E2B"/><rect x="850" y="1140" width="30" height="180" fill="#5A3E2B"/></g>`;
  w+=lustig({x:540,y:1100,s:1.15,pose:'point',t:lt,face:'sly',look:0})+poisson({x:240,y:1330,s:1.15,pose:'stand',t:lt,look:1})+person({x:850,y:1330,s:1.1,pose:'stand',t:lt,coat:'#3E5A6E',coat2:'#334B5C',hair:'#2E2622',style:'short',look:-1,flip:-1});
  return CAM(cam,w)}
function scSecret(lt,d){let s=woodRect(0,0,1080,1920)+`<rect width="1080" height="1920" fill="url(#lamp)" opacity=".8"/>`;
  s+=`<g transform="translate(540,860) rotate(-3)" filter="url(#soft)"><rect x="-380" y="-480" width="760" height="960" fill="#F2E6CC" ${OO}/><rect x="-380" y="-480" width="760" height="960" fill="#F2E6CC" filter="url(#paperT)"/><text y="-380" font-family="Playfair Display" font-weight="900" font-size="44" fill="${N.ink}" text-anchor="middle">RÉPUBLIQUE FRANÇAISE</text>`;
  const lines=['La Tour Eiffel sera','démontée et vendue','comme ferraille.'];
  lines.forEach((l,i)=>{const n=Math.floor(l.length*pr(lt,.2+i*.4,.6+i*.4));if(n>0)s+=`<text x="-320" y="${-240+i*80}" font-family="Playfair Display" font-style="italic" font-weight="800" font-size="50" fill="${N.ink}">${l.slice(0,n)}</text>`});
  const c=stampS(lt,d*.55);if(c>0)s+=`<g transform="translate(0,160) rotate(-10) scale(${c})" opacity="${cl(c>2.2?(2.8-c)/.6:1)}"><rect x="-300" y="-70" width="600" height="140" rx="12" fill="none" stroke="#C8312B" stroke-width="12"/><text y="30" font-family="Playfair Display" font-weight="900" font-size="84" fill="#C8312B" text-anchor="middle">CONFIDENCIAL</text></g>`;
  s+=`</g>`+seal(820,1300,.8*pop(lt,.3,.4)+.001,'R.F.');return s}
function stampS(lt,at){const x=(lt-at)/.25;if(x<=0)return 0;if(x<1)return 2.2-1.2*eoc(x);return 1}
function scPay(lt,d){const cam=camAt([[0,540,920,1.1],[d,540,900,1.15]],lt);
  let w=parisSky('p2',lt)+tower(820,1300,.6);
  const k=eoc(pr(lt,.3,1.3));w+=`<g transform="translate(${300+k*260},${1060-Math.sin(k*Math.PI)*140})" filter="url(#soft)"><path d="M-60,0 q-20,-90 60,-110 q80,20 60,110z" fill="#B08A5A" ${OO}/><text y="-30" font-family="Inter" font-weight="900" font-size="44" fill="#2A1E17" text-anchor="middle">F</text></g>`;
  w+=poisson({x:240,y:1330,s:1.2,pose:'point',t:lt,face:'smile',look:1});
  const gone=pr(lt,d*.5,d*.5+.6);w+=`<g opacity="${(1-gone).toFixed(2)}">${lustig({x:640+gone*500,y:1330,s:1.2,pose:'walk',t:lt,face:'sly',look:1})}</g>`;
  if(gone>0)for(let i=0;i<6;i++)w+=`<circle cx="${640+i*40}" cy="${1300-i*12}" r="${20+gone*30}" fill="#E8E0D0" opacity="${(.6*(1-gone)).toFixed(2)}"/>`;
  return CAM(cam,w)}
function scQuestion(lt,d){const cam=camAt([[0,540,860,1.0],[d,540,880,1.15]],lt);
  let w=parisSky('p3',lt)+`<g filter="url(#soft)"><rect x="240" y="460" width="600" height="840" fill="#D8CDB8" ${OO}/><rect x="400" y="800" width="280" height="500" fill="#2F4A6B" ${OO}/><rect x="320" y="540" width="440" height="110" fill="${P.deco}" ${OO}/><text x="540" y="620" font-family="Playfair Display" font-weight="900" font-size="72" fill="${P.gold}" text-anchor="middle">POLICE</text><circle cx="650" cy="1060" r="12" fill="${P.gold}"/></g>`;
  w+=poisson({x:200,y:1330,s:1.15,pose:'stand',t:lt,face:'sad',look:1});
  const q=pop(lt,.5,.4);if(q>0)w+=`<g transform="${tr(540,1060,q)}"><text y="60" font-family="Playfair Display" font-weight="900" font-size="300" fill="none" stroke="#C8312B" stroke-width="12" text-anchor="middle">?</text></g>`;
  return CAM(cam,w)}
function scCountdown(lt,d){let s=`<rect width="1080" height="1920" fill="#6B5A48"/>`+woodRect(0,0,1080,1920);
  const tg=(x,y,r,txt)=>`<g transform="${tr(x,y,1,r)}" filter="url(#soft)"><rect x="-210" y="-120" width="420" height="240" fill="#F2E6CC" ${OO}/><rect x="-210" y="-120" width="420" height="56" fill="#E3B23C"/><text y="-80" font-family="Inter" font-weight="900" font-size="26" fill="${N.ink}" text-anchor="middle">TÉLÉGRAMME</text><text y="40" font-family="Playfair Display" font-weight="900" font-size="46" fill="${N.ink}" text-anchor="middle">${txt}</text></g>`;
  s+=tg(310,520,-6,'«CONFIDENCIAL»')+tg(770,640,5,'POISSON PAGÓ')+tg(380,1100,4,'NO LO DENUNCIÓ');
  return s}
function scBribe(lt,d){let s=`<rect width="1080" height="1920" fill="#6B2E2E"/>`+woodRect(0,1000,1080,920);
  s+=`<g filter="url(#soft)"><rect x="80" y="1000" width="920" height="40" fill="#5A3E2B" ${OO}/></g>`;
  const word=pop(lt,0,.4);s+=`<g transform="${tr(540,560,word,-3)}" filter="url(#soft)"><rect x="-330" y="-80" width="660" height="150" rx="14" fill="#F2E6CC" ${OO}/><text y="30" font-family="Playfair Display" font-weight="900" font-size="84" fill="#C8312B" text-anchor="middle">CONFIDENCIAL</text></g>`;
  const k=eoc(pr(lt,d*.3,d*.3+1));s+=`<g transform="translate(${240+k*560},1120)" filter="url(#soft)"><rect x="-110" y="-60" width="220" height="120" fill="#EFE2C4" ${OO}/><path d="M-110,-60 L0,10 L110,-60" fill="none" stroke="${N.ink}" stroke-width="4"/><text y="44" font-family="Inter" font-weight="900" font-size="28" fill="#2A1E17" text-anchor="middle">SOBORNO</text></g>`;
  s+=`<g transform="translate(540,1500)" opacity="${pr(lt,d*.65,d*.65+.4)}"><text font-family="Playfair Display" font-weight="900" font-size="60" fill="#F2E6CC" text-anchor="middle">DENUNCIAR = CONFESAR</text></g>`;return s}
function scShame(lt,d){const z=1+lt*.05;
  let s=`<rect width="1080" height="1920" fill="#E8D8BC"/>`+`<g transform="translate(540,1950) scale(${(3.0*z).toFixed(3)})">${poisson({pose:'stand',t:lt,face:'sad',look:.3})}</g>`;
  s+=`<ellipse cx="420" cy="920" rx="${70*pr(lt,.2,.8)}" ry="40" fill="#E25B5B" opacity=".55"/><ellipse cx="660" cy="920" rx="${70*pr(lt,.2,.8)}" ry="40" fill="#E25B5B" opacity=".55"/>`;
  const p=eoc(pr(lt,d*.4,d*.4+.6));s+=`<g transform="translate(540,${1900-p*900}) rotate(-4)" filter="url(#soft)"><rect x="-420" y="-260" width="840" height="520" fill="#EFE6D2" ${OO}/><text y="-170" font-family="Playfair Display" font-weight="900" font-size="54" fill="${N.ink}" text-anchor="middle">LE PETIT JOURNAL</text>${[...Array(7)].map((_,i)=>`<rect x="-380" y="${-120+i*44}" width="${760-(i%3)*80}" height="16" fill="${N.ink}" opacity=".2"/>`).join('')}</g>`;
  return s+`<rect width="1080" height="1920" fill="url(#vig)"/>`}
function scLater(lt,d){let s=woodRect(0,0,1080,1920)+`<rect width="1080" height="1920" fill="url(#lamp)" opacity=".7"/>`;
  const k=eoc(pr(lt,0,.9));s+=`<g transform="translate(540,860) rotate(${(540*(1-k)+3).toFixed(1)}) scale(${(.1+.9*k).toFixed(3)})" filter="url(#soft)"><rect x="-420" y="-520" width="840" height="1040" fill="#EFE6D2" ${OO}/><rect x="-420" y="-520" width="840" height="1040" fill="#EFE6D2" filter="url(#paperT)"/>
  <text y="-420" font-family="Playfair Display" font-weight="900" font-size="58" fill="${N.ink}" text-anchor="middle">LE PETIT JOURNAL</text><line x1="-380" y1="-390" x2="380" y2="-390" stroke="${N.ink}" stroke-width="5"/>
  <text y="-290" font-family="Playfair Display" font-weight="900" font-size="62" fill="${N.ink}" text-anchor="middle">INTENTA VENDER</text><text y="-215" font-family="Playfair Display" font-weight="900" font-size="62" fill="${N.ink}" text-anchor="middle">LA TORRE OTRA VEZ</text>
  ${tower(-180,300,.34).replace('filter="url(#soft)"','')}${[...Array(8)].map((_,i)=>`<rect x="20" y="${-120+i*40}" width="${320-(i%3)*40}" height="16" fill="${N.ink}" opacity=".25"/>`).join('')}
  <text x="-380" y="440" font-family="Inter" font-weight="900" font-size="44" fill="#C8312B">DENUNCIADO… Y HUIDO</text></g>`;return s}
function scClose(lt,d){const cam=camAt([[0,540,760,1.0],[d,540,800,1.05]],lt);
  let w=parisSky('p4',lt)+tower(540,1300,1.0);
  w+=`<g transform="translate(540,${830+Math.sin(lt*3)*6})" filter="url(#soft)"><rect x="-240" y="-60" width="480" height="130" fill="#FBF6EA" ${OO}/><text y="34" font-family="Playfair Display" font-weight="900" font-size="74" fill="#2F7A3A" text-anchor="middle">NO SE VENDE</text></g>`;
  let s=CAM(cam,w);
  const sp=pr(lt,.2,.8);if(sp>0)s+=`<g transform="translate(540,1180) rotate(-8) scale(${(1.25-.25*eoc(sp)).toFixed(3)})" opacity="${(eoc(sp)*.95).toFixed(2)}"><rect x="-300" y="-80" width="600" height="160" rx="10" fill="${P.deco}" stroke="${P.gold}" stroke-width="10"/><text y="34" font-family="Playfair Display" font-weight="900" font-size="88" fill="${P.gold}" text-anchor="middle">CASO CERRADO</text></g>`;
  const lg=pr(lt,d-3.0,d-2.3);if(lg>0)s+=`<g opacity="${lg}">${logoSm(540,440,1.2)}</g>`;
  return s}

let SC=[];
function build(){
  SC=[[0,ph(1),scHook],[ph(1),ph(2),scTitle],[ph(2),ph(3),scRust],[ph(3),ph(4),scHotel],[ph(4),ph(5),scSecret],[ph(5),ph(6)+.2,scPay],[ph(6)+.2,CD[0],scQuestion],[CD[0],ph(7),scCountdown],
      [ph(7),ph(8),scBribe],[ph(8),ph(9),scShame],[ph(9),ph(10),scLater],[ph(10),T+1,scClose]];
  STRIPS=[[0,'VENDIÓ LA TORRE EIFFEL… ×2'],[ph(1),'UN ACERTIJO REAL'],[ph(2),'PARÍS, 1925'],[ph(3),'UN FALSO FUNCIONARIO'],[ph(4),'«ES CONFIDENCIAL»'],[ph(5),'POISSON PAGA'],
    [ph(6),'PIENSA · PUEDES PAUSAR'],[ph(7),'LA PALABRA CLAVE'],[ph(8),'LE DIO VERGÜENZA'],[ph(9),'ESTO ES LO QUE HOY SABEMOS'],[ph(10),'CASO CERRADO']];
  CH=[];(window.CAPPH||PH).forEach(([a,b,txt])=>{const ws=txt.split(' ').map(w=>{let [t2,wt]=w.split('|');const k=t2.includes('*');t2=t2.replace(/\*/g,'');return {t:t2,k,w:+(wt||Math.max(2,t2.replace(/[^\wáéíóúñü]/gi,'').length+1))}});
    const tot=ws.reduce((s,w)=>s+w.w,0);let acc=a;ws.forEach(w=>{w.s=acc;acc+=(b-a)*w.w/tot});
    let cur=[];ws.forEach((w,i)=>{cur.push(w);if(/[.,?:…»]$/.test(w.t)||cur.length==3||i==ws.length-1){CH.push(cur);cur=[]}})});
  CH.forEach((c,i)=>{c.start=c[0].s;c.end=i+1<CH.length?Math.min(CH[i+1][0].s,c[c.length-1].s+1.4):T})}
let CH=[];build();
