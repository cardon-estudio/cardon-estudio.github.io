const CASE_LABEL='LA COPA DEL MUNDO · 1966';
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

const corbett=o=>person({...o,coat:'#5E6B4A',coat2:'#4C573C',pants:'#3B342C',hair:'#3B2418',style:'short',skin:'#E8C29C'});
const bobby=o=>person({...o,coat:'#1F2A44',coat2:'#18213A',pants:'#1F2A44',hair:'#2E2622',style:'short',skin:'#E2B48C'});
const K={brick:'#9C4A36',grass:'#4F7A3A',hedge:'#2F5A2A',gold:'#D9B23C',sky1:'#AFC4D6',sky2:'#E8E2D2',bus:'#C8312B'};
function trophy(x,y,s,glow=0){return `<g transform="${tr(x,y,s)}" filter="url(#soft)">${glow?`<circle cy="-120" r="160" fill="${K.gold}" opacity=".25" filter="url(#glow)"/>`:''}<rect x="-60" y="-20" width="120" height="40" fill="#3A2A22" ${OO}/><path d="M-40,-20 L40,-20 L26,-90 L-26,-90Z" fill="${K.gold}" ${OO}/><path d="M-26,-90 Q-80,-160 -40,-230 Q0,-200 40,-230 Q80,-160 26,-90Z" fill="${K.gold}" ${OO}/><path d="M-40,-230 Q0,-290 40,-230" fill="none" stroke="${N.ink}" stroke-width="4"/><ellipse cx="0" cy="-250" rx="44" ry="22" fill="#E9CB61" ${OO}/></g>`}
function dog(x,y,s,t,sniff=0,flip=1){const tq=q2(t),wag=Math.sin(tq*14)*20,step=Math.sin(tq*9)*10;
  return `<g transform="translate(${x},${y}) scale(${s*flip},${s})" filter="url(#soft)"><path d="M-90,-90 q-40,-${30+wag/2} -60,-${70+wag}" fill="none" stroke="${N.ink}" stroke-width="16" stroke-linecap="round"/><path d="M-90,-90 q-40,-${30+wag/2} -60,-${70+wag}" fill="none" stroke="#1E1A18" stroke-width="10" stroke-linecap="round"/>
  ${[-60,-30,40,70].map((lx,i)=>`<line x1="${lx}" y1="-50" x2="${lx+(i%2?step:-step)}" y2="0" stroke="${N.ink}" stroke-width="16" stroke-linecap="round"/><line x1="${lx}" y1="-50" x2="${lx+(i%2?step:-step)}" y2="0" stroke="${i<2?'#1E1A18':'#F4EBD6'}" stroke-width="10" stroke-linecap="round"/>`).join('')}
  <ellipse cx="0" cy="-80" rx="110" ry="50" fill="#1E1A18" ${OO}/><ellipse cx="30" cy="-62" rx="60" ry="28" fill="#F4EBD6"/>
  <g transform="translate(100,${-120+sniff*60}) rotate(${sniff*30})"><ellipse cx="0" cy="0" rx="50" ry="42" fill="#1E1A18" ${OO}/><path d="M10,-10 Q60,0 70,20 Q40,40 10,24Z" fill="#F4EBD6" ${OO}/><circle cx="70" cy="18" r="9" fill="${N.ink}"/><circle cx="8" cy="-8" r="6" fill="#fff"/><circle cx="9" cy="-8" r="3" fill="${N.ink}"/><path d="M-30,-30 l-10,-40 l30,24z" fill="#1E1A18" ${OO}/></g>
  ${sniff?[0,1,2].map(i=>`<path d="M${180+i*20},${-30+sniff*60} q8,-10 0,-20" fill="none" stroke="#8A8A8A" stroke-width="4" opacity="${.3+.2*Math.sin(t*6+i)}"/>`).join(''):''}</g>`}
function street(t,dusk=0){let s=`<defs><linearGradient id="ld${dusk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${dusk?'#5D5A7E':K.sky1}"/><stop offset="1" stop-color="${dusk?'#E8A87C':K.sky2}"/></linearGradient></defs><rect x="-400" y="-400" width="2400" height="2600" fill="url(#ld${dusk})"/>`;
  for(let i=0;i<9;i++){const x=-300+i*230;s+=`<rect x="${x}" y="500" width="220" height="760" fill="${K.brick}" ${OO}/><path d="M${x-10},500 l120,-90 l120,90z" fill="#4A3B36" ${OO}/>${[0,1].map(r=>[0,1].map(c=>`<rect x="${x+30+c*100}" y="${580+r*230}" width="60" height="120" fill="${dusk&&rnd(i+r+c)>.4?'#F7D58B':'#CFE0EA'}" ${OO}/>`).join('')).join('')}<rect x="${x+75}" y="1080" width="70" height="180" fill="#2F4A6B" ${OO}/>`}
  s+=`<rect x="-400" y="1260" width="2400" height="60" fill="${K.hedge}" ${OO}/>${[...Array(30)].map((_,i)=>`<circle cx="${-380+i*80}" cy="1258" r="34" fill="${K.hedge}"/>`).join('')}<rect x="-400" y="1300" width="2400" height="900" fill="#8E8A80"/>`;return s}

/* ===== ESCENAS ===== */
function scHook(lt,d){const cam=camAt([[0,540,760,1.4],[d,540,820,1.05]],lt);
  let w=`<rect x="-400" y="-400" width="1900" height="2600" fill="#2C3656"/><polygon points="420,-200 660,-200 820,1200 260,1200" fill="#FFF3C4" opacity=".12"/>`;
  w+=`<g filter="url(#soft)"><rect x="320" y="1000" width="440" height="300" fill="#5A3E2B" ${OO}/><rect x="300" y="980" width="480" height="40" fill="#7A5536" ${OO}/></g>`;
  const gone=pr(lt,d*.4,d*.55);w+=`<g opacity="${(1-gone).toFixed(2)}">${trophy(540,980,1.6,1)}</g>`;
  w+=`<rect x="340" y="560" width="400" height="420" fill="#CFE6F2" opacity=".18" stroke="#CFE6F2" stroke-width="5"/>`;
  if(gone>=1){const q=pop(lt,d*.6,.4);w+=`<g transform="${tr(540,820,q)}"><text y="80" font-family="Playfair Display" font-weight="900" font-size="280" fill="none" stroke="${K.gold}" stroke-width="10" text-anchor="middle">?</text></g>`}
  return CAM(cam,w)}
function scTitle(lt,d){ // pizarra táctica de fútbol
  let s=`<rect width="1080" height="1920" fill="#1E3A2A"/><rect x="60" y="360" width="960" height="1080" fill="#2E5A3E" stroke="#C9A66B" stroke-width="24"/><g stroke="#F4EBD6" stroke-width="5" fill="none" opacity=".7"><rect x="120" y="420" width="840" height="960"/><line x1="120" y1="900" x2="960" y2="900"/><circle cx="540" cy="900" r="110"/><rect x="340" y="420" width="400" height="160"/><rect x="340" y="1220" width="400" height="160"/></g>`;
  const k=pr(lt,0,d*.85);s+=`<text x="540" y="840" font-family="Playfair Display" font-weight="900" font-size="110" fill="none" stroke="#FBF6EA" stroke-width="7" text-anchor="middle" stroke-dasharray="${(2000*k).toFixed(0)} 4000">UN ACERTIJO</text><text x="540" y="990" font-family="Playfair Display" font-weight="900" font-size="130" fill="none" stroke="${K.gold}" stroke-width="8" text-anchor="middle" stroke-dasharray="${(1600*Math.max(0,k*2-1)).toFixed(0)} 4000">REAL</text>`;
  return s}
function scExpo(lt,d){const cam=camAt([[0,540,900,1.0],[d,540,880,1.18]],lt);
  let w=`<rect x="-400" y="-400" width="1900" height="2600" fill="#D8CDB8"/>`+[...Array(6)].map((_,i)=>`<rect x="${-200+i*260}" y="200" width="90" height="1100" fill="#C4B79E" ${OO}/>`).join('')+`<rect x="-400" y="1300" width="1900" height="900" fill="#7A5536"/>`;
  w+=`<g filter="url(#soft)"><rect x="380" y="900" width="320" height="400" fill="#5A3E2B" ${OO}/></g><rect x="400" y="560" width="280" height="340" fill="#CFE6F2" opacity=".25" stroke="#9AA0A8" stroke-width="6"/>`;
  w+=`<g transform="translate(540,1000)" filter="url(#soft)"><rect x="-150" y="-30" width="300" height="60" fill="url(#brassG)" ${OO}/><text y="12" font-family="Inter" font-weight="900" font-size="24" fill="#2A1E17" text-anchor="middle">JULES RIMET TROPHY</text></g>`;
  const p=pop(lt,d*.4,.4);if(p>0)w+=`<g transform="${tr(540,420,p,-5)}" filter="url(#soft)"><rect x="-200" y="-56" width="400" height="100" rx="12" fill="#FBF6EA" ${OO}/><text y="14" font-family="Playfair Display" font-weight="900" font-size="54" fill="#C8312B" text-anchor="middle">¡ROBADA!</text></g>`;
  return CAM(cam,w)}
function scPolice(lt,d){const cam=camAt([[0,540,920,1.05],[d,540,900,1.15]],lt);
  let w=street(lt)+bobby({x:300,y:1320,s:1.2,pose:'point',t:lt,look:1})+bobby({x:780,y:1320,s:1.2,pose:'notebook',t:lt,look:-1,flip:-1});
  const n=pop(lt,d*.5,.45);if(n>0)w+=`<g transform="${tr(540,700,n,6)}" filter="url(#soft)"><rect x="-220" y="-160" width="440" height="320" fill="#FBF6EA" ${OO}/><text y="-90" font-family="Playfair Display" font-weight="900" font-size="44" fill="${N.ink}" text-anchor="middle">RESCATE</text>${['15.000 £','O LA COPA','SE FUNDE'].map((l,i)=>`<text y="${-20+i*60}" font-family="Inter" font-weight="900" font-size="${40-i*2}" fill="${['#C8312B',N.ink,N.ink][i]}" text-anchor="middle" transform="rotate(${(i-1)*3})">${l}</text>`).join('')}</g>`;
  return CAM(cam,w)}
function scWalk(lt,d){const p=pr(lt,0,d);const cam=[260+p*420,900,1.05];
  let w=street(lt,1)+corbett({x:200+p*420,y:1330,s:1.25,pose:'walk',t:lt,look:1});
  w+=`<g opacity="${pr(lt,.2,.6)}"><path d="M${200+p*420+50},${1180} Q${300+p*420},1260 ${380+p*420},1250" fill="none" stroke="#C8312B" stroke-width="5"/></g>`;
  w+=`<g opacity="${pr(lt,.2,.6)}">${dog(420+p*420,1320,.55,lt)}</g>`;
  return CAM(cam,w)}
function scQuestion(lt,d){let s=street(lt,1)+`<rect width="1080" height="1920" fill="#000" opacity=".25"/>`;
  s+=`<g filter="url(#soft)"><rect x="520" y="300" width="40" height="1000" fill="#2E2622" ${OO}/><path d="M480,300 h120 l-20,-70 h-80z" fill="#2E2622" ${OO}/></g><ellipse cx="540" cy="340" rx="200" ry="240" fill="#FFF3C4" opacity=".2" filter="url(#glow)"/>`;
  const p=pop(lt,.2,.45);s+=`<g transform="${tr(540,780,p,-3)}" filter="url(#soft)"><rect x="-260" y="-300" width="520" height="600" fill="#F2E6CC" ${OO}/><text y="-210" font-family="Playfair Display" font-weight="900" font-size="72" fill="#C8312B" text-anchor="middle">SE BUSCA</text>${trophy(0,120,.9).replace('filter="url(#soft)"','')}<text y="240" font-family="Playfair Display" font-weight="900" font-size="58" fill="${N.ink}" text-anchor="middle">¿QUIÉN LA HALLÓ?</text></g>`;
  return s}
function scCountdown(lt,d){ // jardín de noche: tres pistas en carteles de farola
  let s=street(lt,1)+`<rect width="1080" height="1920" fill="#0E1630" opacity=".45"/>`;
  const card=(x,y,r,txt)=>`<g transform="${tr(x,y,1,r)}" filter="url(#soft)"><rect x="-190" y="-110" width="380" height="220" fill="#F2E6CC" ${OO}/><text y="20" font-family="Playfair Display" font-weight="900" font-size="46" fill="${N.ink}" text-anchor="middle">${txt}</text>${[[-170,-90],[170,-90]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="8" fill="#C8312B"/>`).join('')}</g>`;
  s+=card(300,520,-6,'UN PASEO')+card(770,640,5,'UNA CORREA')+card(330,1060,4,'UN SETO');
  return s}
function scDog(lt,d){const z=1+lt*.05;let s=street(lt)+`<g transform="translate(540,1350) scale(${(1.9*z).toFixed(3)}) translate(-540,-1350)">${dog(560,1350,1.2,lt)}</g>`;
  const n=pop(lt,d*.4,.4);if(n>0)s+=`<g transform="${tr(540,560,n,-4)}" filter="url(#soft)"><rect x="-200" y="-70" width="400" height="130" rx="18" fill="#FBF6EA" ${OO}/><text y="22" font-family="Playfair Display" font-weight="900" font-size="80" fill="${N.ink}" text-anchor="middle">PICKLES</text></g>`;
  return s}
function scHedge(lt,d){const cam=camAt([[0,540,1100,1.4],[d,560,1080,1.6]],lt);
  let w=street(lt)+dog(380,1330,.8,lt,1);
  const open=pr(lt,d*.45,d*.75);
  w+=`<g transform="translate(700,1290)" filter="url(#soft)"><rect x="-90" y="-110" width="180" height="110" fill="#E8E0D0" ${OO}/>${[...Array(5)].map((_,i)=>`<rect x="-80" y="${-100+i*18}" width="${160-(i%2)*40}" height="8" fill="${N.ink}" opacity=".3"/>`).join('')}<line x1="0" y1="-110" x2="0" y2="0" stroke="#8A6A40" stroke-width="5"/></g>`;
  if(open>0)w+=`<g opacity="${open}">${trophy(700,1180,.6*open,1)}</g>`;
  return CAM(cam,w)}
function scKnown(lt,d){let s=`<defs><linearGradient id="st" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9CC3E0"/><stop offset="1" stop-color="#E8E2D2"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#st)"/>`;
  for(let r=0;r<6;r++)for(let c=0;c<14;c++)s+=`<circle cx="${c*80+(r%2)*40}" cy="${760+r*70+Math.sin(lt*6+c+r)*6}" r="24" fill="${['#C8312B','#F4EBD6','#2F4A6B'][(r+c)%3]}"/>`;
  s+=`<rect x="0" y="1180" width="1080" height="740" fill="#4F7A3A"/>`+trophy(540,1180,1.3,1);
  const m=pop(lt,d*.5,.45);if(m>0)s+=`<g transform="${tr(820,520,m,8)}" filter="url(#soft)"><path d="M-30,-140 L0,-60 L30,-140" fill="none" stroke="#2F4A6B" stroke-width="18"/><circle cy="0" r="70" fill="#C9CCD2" ${OO}/><circle r="50" fill="none" stroke="#9AA0A8" stroke-width="6"/><path d="M-20,10 q20,-30 40,0" fill="none" stroke="${N.ink}" stroke-width="5"/></g>`;
  return s}
function scClose(lt,d){let s=street(lt)+dog(540,1330,1.0,lt);
  s+=`<g transform="translate(560,1200)" filter="url(#soft)"><circle r="34" fill="#C9CCD2" ${OO}/></g>`;
  const sp=pr(lt,.2,.8);if(sp>0)s+=`<g transform="translate(540,700) rotate(-8) scale(${(1.25-.25*eoc(sp)).toFixed(3)})" opacity="${(eoc(sp)*.95).toFixed(2)}"><rect x="-300" y="-80" width="600" height="160" rx="16" fill="#2E5A3E" stroke="${K.gold}" stroke-width="10"/><text y="34" font-family="Playfair Display" font-weight="900" font-size="90" fill="${K.gold}" text-anchor="middle">CASO CERRADO</text></g>`;
  const lg=pr(lt,d-3.0,d-2.3);if(lg>0)s+=`<g opacity="${lg}">${logoSm(540,430,1.0)}</g>`;
  return s}

let SC=[];
function build(){
  SC=[[0,ph(1),scHook],[ph(1),ph(2),scTitle],[ph(2),ph(3),scExpo],[ph(3),ph(4),scPolice],[ph(4),ph(5)+.2,scWalk],[ph(5)+.2,CD[0],scQuestion],[CD[0],ph(6),scCountdown],
      [ph(6),ph(7),scDog],[ph(7),ph(8),scHedge],[ph(8),ph(9),scKnown],[ph(9),T+1,scClose]];
  STRIPS=[[0,'ROBAN LA COPA DEL MUNDO'],[ph(1),'UN ACERTIJO REAL'],[ph(2),'LONDRES, MARZO DE 1966'],[ph(3),'LA POLICÍA, SIN PISTAS'],[ph(4),'UNA SEMANA DESPUÉS'],
    [ph(5),'PIENSA · PUEDES PAUSAR'],[ph(6),'NO FUE ÉL…'],[ph(7),'BAJO UN SETO'],[ph(8),'ESTO ES LO QUE HOY SABEMOS'],[ph(9),'CASO CERRADO']];
  CH=[];(window.CAPPH||PH).forEach(([a,b,txt])=>{const ws=txt.split(' ').map(w=>{let [t2,wt]=w.split('|');const k=t2.includes('*');t2=t2.replace(/\*/g,'');return {t:t2,k,w:+(wt||Math.max(2,t2.replace(/[^\wáéíóúñü]/gi,'').length+1))}});
    const tot=ws.reduce((s,w)=>s+w.w,0);let acc=a;ws.forEach(w=>{w.s=acc;acc+=(b-a)*w.w/tot});
    let cur=[];ws.forEach((w,i)=>{cur.push(w);if(/[.,?:…»]$/.test(w.t)||cur.length==3||i==ws.length-1){CH.push(cur);cur=[]}})});
  CH.forEach((c,i)=>{c.start=c[0].s;c.end=i+1<CH.length?Math.min(CH[i+1][0].s,c[c.length-1].s+1.4):T})}
let CH=[];build();
