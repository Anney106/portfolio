import { useEffect, useRef } from 'react';

const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

export default function GalaxyVFX() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, w, h, mouseX=0.5, mouseY=0.5;

    const STAR_COUNT = 260;
    const stars = Array.from({length:STAR_COUNT}, ()=>({
      x:Math.random(), y:Math.random(),
      r:0.3+Math.random()*1.8, alpha:0.5+Math.random()*0.5,
      twinkleSpeed:0.5+Math.random()*2, twinklePhase:Math.random()*Math.PI*2,
      hue:[265,275,285,250,300][Math.floor(Math.random()*5)],
      parallax:0.5+Math.random()*1.5
    }));

    const nebulae = [
      {x:0.15,y:0.25,rx:200,ry:120,hue:270,alpha:0.09},
      {x:0.80,y:0.60,rx:170,ry:100,hue:285,alpha:0.08},
      {x:0.50,y:0.80,rx:240,ry:85, hue:250,alpha:0.07},
      {x:0.70,y:0.15,rx:140,ry:110,hue:300,alpha:0.07},
    ];
    const shooters=[];
    function spawnShooter(){
      shooters.push({x:Math.random()*w,y:Math.random()*h*0.5,
        len:80+Math.random()*120,speed:6+Math.random()*8,
        angle:Math.PI*0.18+Math.random()*0.15,
        alpha:0.7+Math.random()*0.3,life:0,maxLife:40+Math.random()*30});
      setTimeout(spawnShooter,2500+Math.random()*4000);
    }
    let galaxyAngle=0;
    function drawCore(cx,cy,t){
      const d=isDark(), a=d?0.18:0.25;
      const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,90);
      cg.addColorStop(0,`rgba(160,100,255,${a})`); cg.addColorStop(0.4,`rgba(130,80,220,${a*0.4})`); cg.addColorStop(1,'rgba(130,80,220,0)');
      ctx.beginPath(); ctx.arc(cx,cy,90,0,Math.PI*2); ctx.fillStyle=cg; ctx.fill();
      for(let arm=0;arm<3;arm++){
        const offset=(arm/3)*Math.PI*2;
        ctx.beginPath();
        for(let i=0;i<=200;i++){
          const frac=i/200, angle=frac*Math.PI*4+offset+t;
          const radius=frac*160;
          const sx=cx+Math.cos(angle)*radius, sy=cy+Math.sin(angle)*radius*0.5;
          i===0?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);
        }
        ctx.strokeStyle=`rgba(140,90,240,${d?0.06:0.10})`; ctx.lineWidth=2.5-arm*0.5; ctx.stroke();
      }
    }
    function resize(){ w=canvas.width=canvas.parentElement.offsetWidth; h=canvas.height=canvas.parentElement.offsetHeight; }
    const onMove=e=>{ const r=canvas.parentElement.getBoundingClientRect(); mouseX=(e.clientX-r.left)/r.width; mouseY=(e.clientY-r.top)/r.height; };
    canvas.parentElement.addEventListener('mousemove',onMove);
    let t=0;
    function draw(){
      animId=requestAnimationFrame(draw); ctx.clearRect(0,0,w,h); t+=0.006; galaxyAngle+=0.0015;
      const d=isDark();
      nebulae.forEach(nb=>{
        const a=d?nb.alpha:nb.alpha*1.4;
        ctx.save(); ctx.translate(nb.x*w,nb.y*h); ctx.scale(nb.rx/100,nb.ry/100);
        const rg=ctx.createRadialGradient(0,0,0,0,0,100);
        rg.addColorStop(0,`hsla(${nb.hue},70%,${d?'65%':'40%'},${a})`); rg.addColorStop(1,`hsla(${nb.hue},60%,50%,0)`);
        ctx.beginPath(); ctx.arc(0,0,100,0,Math.PI*2); ctx.fillStyle=rg; ctx.fill(); ctx.restore();
      });
      drawCore(w*0.82,h*0.22,galaxyAngle);
      stars.forEach(s=>{
        const twinkle=0.5+0.5*Math.sin(t*s.twinkleSpeed+s.twinklePhase);
        const alpha=(d?s.alpha:s.alpha*0.9)*(0.55+0.45*twinkle);
        const px=(mouseX-0.5)*s.parallax*18, py=(mouseY-0.5)*s.parallax*12;
        const sx=s.x*w+px, sy=s.y*h+py;
        ctx.beginPath(); ctx.arc(sx,sy,s.r*(0.8+0.2*twinkle),0,Math.PI*2);
        ctx.fillStyle=`hsla(${s.hue},80%,${d?'88%':'35%'},${alpha})`; ctx.fill();
        if(s.r>1.2){
          const sg=ctx.createRadialGradient(sx,sy,0,sx,sy,s.r*4);
          sg.addColorStop(0,`hsla(${s.hue},70%,${d?'80%':'40%'},${alpha*0.4})`); sg.addColorStop(1,'transparent');
          ctx.beginPath(); ctx.arc(sx,sy,s.r*4,0,Math.PI*2); ctx.fillStyle=sg; ctx.fill();
        }
      });
      for(let i=shooters.length-1;i>=0;i--){
        const sh=shooters[i];
        sh.x+=Math.cos(sh.angle)*sh.speed; sh.y+=Math.sin(sh.angle)*sh.speed; sh.life++;
        const progress=sh.life/sh.maxLife, fadeAlpha=sh.alpha*Math.sin(progress*Math.PI)*(d?1:0.9);
        const tailX=sh.x-Math.cos(sh.angle)*sh.len, tailY=sh.y-Math.sin(sh.angle)*sh.len;
        const sg=ctx.createLinearGradient(tailX,tailY,sh.x,sh.y);
        sg.addColorStop(0,'rgba(180,140,255,0)'); sg.addColorStop(1,`rgba(180,140,255,${fadeAlpha})`);
        ctx.beginPath(); ctx.moveTo(tailX,tailY); ctx.lineTo(sh.x,sh.y);
        ctx.strokeStyle=sg; ctx.lineWidth=1.5; ctx.stroke();
        if(sh.life>=sh.maxLife) shooters.splice(i,1);
      }
    }
    resize(); spawnShooter(); draw();
    const ro=new ResizeObserver(resize); ro.observe(canvas.parentElement);
    return ()=>{ cancelAnimationFrame(animId); ro.disconnect(); canvas.parentElement?.removeEventListener('mousemove',onMove); };
  },[]);
  return <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:0.9}} />;
}
