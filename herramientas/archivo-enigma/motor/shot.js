const {chromium}=require('playwright');
(async()=>{const [,,html,out,...ts]=process.argv;const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text())});
await p.goto('file://'+html);await p.evaluate(()=>document.fonts.ready);
for(const t of ts){const t0=Date.now();try{await p.evaluate(t=>render(+t),t)}catch(e){errs.push(t+': '+e.message)}await p.screenshot({path:`${out}/t${t}.jpg`,type:'jpeg',quality:80});}
console.log('errors:',errs.slice(0,5));await b.close();})();
