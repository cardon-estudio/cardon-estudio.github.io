const svg=document.getElementById('v'),hud=document.getElementById('hud'),cap=document.getElementById('cap');
let lastKey=null;
window.render=function(t){
  const i=SC.findIndex(([a,b])=>t>=a&&t<b);const sc=SC[i<0?SC.length-1:i];
  let body=sc[2](t-sc[0],sc[1]-sc[0]);
  // transición suave con desenfoque (fundido de 0,35 s)
  const TD=.35;let out='';
  if(i>0&&t-sc[0]<TD){const prv=SC[i-1];const k=(t-sc[0])/TD;out=`<g opacity="${(1-k).toFixed(2)}" filter="url(#bl)">${prv[2](sc[0]-prv[0]-.001,prv[1]-prv[0])}</g>`;
    body=`<g opacity="${eio(k).toFixed(2)}">${body}</g>`}
  svg.innerHTML=DEFS+(out?`<g>${out}</g>`:'')+body+`<rect width="1080" height="1920" fill="url(#vig)"/>`;
  hud.innerHTML=DEFS+strip(t)+logoSm(995,160,.55)+countdown(t);
  const ch=CH.find(c=>t>=c.start&&t<c.end);
  if(!ch){cap.style.display='none'}else{cap.style.display='block';const key=CH.indexOf(ch)+':'+ch.filter(w=>t>=w.s).length;
    if(key!==lastKey){cap.innerHTML=ch.map(w=>`<span style="display:${t>=w.s?'inline-block':'none'}">${w.t}</span>`).join('');lastKey=key}
    let act=-1;ch.forEach((w,j)=>{if(t>=w.s)act=j});
    cap.querySelectorAll('span').forEach((sp,j)=>{if(t<ch[j].s)return;const p=pop(t,ch[j].s,.18);sp.style.transform=`scale(${(.75+.25*p).toFixed(3)})`;sp.className=j==act?'on':''})}
};
window.setTimes=function(ph2,cd,tt){PH=ph2;CD.splice(0,2,...cd);build()};
window.render(0);
</script></body></html>
