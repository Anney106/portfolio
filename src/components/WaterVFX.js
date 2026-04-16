import { useEffect, useRef } from 'react';

const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

export default function WaterVFX() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, w, h, mouseX = -999, mouseY = -999;
    const ripples = [];

    function spawnRipple(x, y, strong=false) {
      ripples.push({ x, y, r:0, maxR: strong?100+Math.random()*60:40+Math.random()*80,
        speed: strong?2+Math.random():0.6+Math.random()*0.8,
        alpha: strong?0.7:0.35+Math.random()*0.25, hue:265+Math.random()*30 });
    }
    function randomRipple() {
      if(ripples.length<14) spawnRipple(Math.random()*w, Math.random()*h);
      setTimeout(randomRipple, 600+Math.random()*1800);
    }
    const caustics = Array.from({length:6}, ()=>({
      x:Math.random(), y:Math.random(), r:60+Math.random()*100,
      speed:0.0004+Math.random()*0.0005, phase:Math.random()*Math.PI*2
    }));

    function resize() { w=canvas.width=canvas.parentElement.offsetWidth; h=canvas.height=canvas.parentElement.offsetHeight; }
    const onMove = e=>{ const r=canvas.getBoundingClientRect(); mouseX=e.clientX-r.left; mouseY=e.clientY-r.top; };
    const onClick = e=>{ const r=canvas.getBoundingClientRect(); spawnRipple(e.clientX-r.left,e.clientY-r.top,true); };
    canvas.parentElement.addEventListener('mousemove',onMove);
    canvas.parentElement.addEventListener('click',onClick);

    function waveLayer(t, yBase, amp, period, baseAlpha, hue) {
      const d=isDark(), a=d?baseAlpha:baseAlpha*0.75, l=d?'70%':'38%', s=d?'65%':'80%';
      ctx.beginPath(); ctx.moveTo(0,yBase);
      for(let x=0;x<=w;x+=4){
        const y=yBase+Math.sin((x/w)*period+t)*amp+Math.sin((x/w)*(period*0.6)-t*0.7)*(amp*0.4);
        ctx.lineTo(x,y);
      }
      ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath();
      const g=ctx.createLinearGradient(0,yBase-amp,0,h);
      g.addColorStop(0,`hsla(${hue},${s},${l},${a})`);
      g.addColorStop(1,`hsla(${hue},${s},${l},0)`);
      ctx.fillStyle=g; ctx.fill();
    }

    let t=0;
    function draw() {
      animId=requestAnimationFrame(draw);
      ctx.clearRect(0,0,w,h); t+=0.008;
      const d=isDark();
      caustics.forEach(c=>{
        const cx=c.x*w+Math.sin(t*c.speed*3000+c.phase)*30;
        const cy=c.y*h+Math.cos(t*c.speed*2000+c.phase)*20;
        const ca=d?0.07:0.13;
        const rg=ctx.createRadialGradient(cx,cy,0,cx,cy,c.r);
        rg.addColorStop(0,`rgba(120,60,220,${ca})`); rg.addColorStop(1,'rgba(120,60,220,0)');
        ctx.beginPath(); ctx.arc(cx,cy,c.r,0,Math.PI*2); ctx.fillStyle=rg; ctx.fill();
      });
      waveLayer(t,     h*0.70,18,4.5,0.20,268);
      waveLayer(t+1,   h*0.75,14,6,  0.16,258);
      waveLayer(t+2,   h*0.80,10,8,  0.12,278);
      waveLayer(t*0.6, h*0.85, 8,5,  0.09,263);
      if(mouseX>0){
        const mg=ctx.createRadialGradient(mouseX,mouseY,0,mouseX,mouseY,90);
        const a=d?0.20:0.30;
        mg.addColorStop(0,`rgba(120,60,220,${a})`); mg.addColorStop(1,'rgba(120,60,220,0)');
        ctx.beginPath(); ctx.arc(mouseX,mouseY,90,0,Math.PI*2); ctx.fillStyle=mg; ctx.fill();
      }
      for(let i=ripples.length-1;i>=0;i--){
        const rp=ripples[i]; rp.r+=rp.speed; rp.alpha*=0.976;
        if(rp.r>rp.maxR||rp.alpha<0.005){ripples.splice(i,1);continue;}
        const fade=1-rp.r/rp.maxR, a=d?rp.alpha*fade:rp.alpha*fade*1.5;
        const l=d?'72%':'40%';
        ctx.beginPath(); ctx.arc(rp.x,rp.y,rp.r,0,Math.PI*2);
        ctx.strokeStyle=`hsla(${rp.hue},75%,${l},${a})`; ctx.lineWidth=1.5; ctx.stroke();
        if(rp.r>10){
          ctx.beginPath(); ctx.arc(rp.x,rp.y,rp.r*0.6,0,Math.PI*2);
          ctx.strokeStyle=`hsla(${rp.hue},70%,${l},${a*0.5})`; ctx.lineWidth=0.8; ctx.stroke();
        }
      }
    }
    resize(); randomRipple(); draw();
    const ro=new ResizeObserver(resize); ro.observe(canvas.parentElement);
    return ()=>{ cancelAnimationFrame(animId); ro.disconnect(); canvas.parentElement?.removeEventListener('mousemove',onMove); canvas.parentElement?.removeEventListener('click',onClick); };
  },[]);
  return <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:0.9}} />;
}
