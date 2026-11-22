const {chromium}=require('playwright');
(async()=>{const [,,html,out,fps,total,workers]=process.argv;const N=Math.ceil(+total*+fps);const W=+workers;
const b=await chromium.launch();
await Promise.all([...Array(W)].map(async(_,w)=>{const p=await b.newPage({viewport:{width:1080,height:1920}});
 await p.goto('file://'+html);await p.evaluate(()=>document.fonts.ready);
 for(let i=w;i<N;i+=W){await p.evaluate(t=>render(t),i/+fps);await p.screenshot({path:`${out}/f${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:93});}
}));await b.close();console.log('frames',N);})();
