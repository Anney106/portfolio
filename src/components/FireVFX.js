import { useEffect, useRef } from 'react';

const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

export default function FireVFX() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, w, h, mouseX=-1, mouseY=-1;
    const particles=[], embers=[], MAX_P=180, MAX_E=50;

    function createFlame(){
      const x=w*0.5+(Math.random()-0.5)*w*0.9;
      return { type:'flame', x, y:h, vx:(Math.random()-0.5)*1.2, vy:-(1.5+Math.random()*3.5),
        life:0, maxLife:40+Math.random()*60, r:6+Math.random()*18,
        hue:255+Math.random()*35, saturation:60+Math.random()*25 };
    }
    function createEmber(){
      return { x:w*0.5+(Math.random()-0.5)*w*0.7, y:h-Math.random()*h*0.2,
        vx:(Math.random()-0.5)*2, vy:-(2+Math.random()*4),
        life:0, maxLife:60+Math.random()*80, r:1+Math.random()*2.5, hue:270+Math.random()*40 };
    }
    function resize(){ w=canvas.width=canvas.parentElement.offsetWidth; h=canvas.height=canvas.parentElement.offsetHeight; }
    const onMove=e=>{ const r=canvas.getBoundingClientRect(); mouseX=e.clientX-r.left; mouseY=e.clientY-r.top; };
    canvas.parentElement.addEventListener('mousemove',onMove);

    let t=0;
    function draw(){
      animId=requestAnimationFrame(draw); t+=0.016;
      ctx.clearRect(0,0,w,h);
      const d=isDark();

      // spawn
      for(let i=0;i<4;i++) if(particles.length<MAX_P) particles.push(createFlame());
      if(Math.random()<0.3&&embers.length<MAX_E) embers.push(createEmber());

      // base heat glow — subtle on light
      for(let i=0;i<5;i++){
        const hx=(i/4)*w, hInt=(d?0.07:0.10)+0.03*Math.sin(t*2+i);
        const hg=ctx.createRadialGradient(hx,h,0,hx,h,120+40*Math.sin(t+i));
        hg.addColorStop(0,`rgba(120,50,220,${hInt})`); hg.addColorStop(1,'rgba(120,50,220,0)');
        ctx.beginPath(); ctx.arc(hx,h,200,0,Math.PI*2); ctx.fillStyle=hg; ctx.fill();
      }

      // particles
      for(let i=particles.length-1;i>=0;i--){
        const p=particles[i];
        if(mouseX>0) p.vx+=(mouseX-p.x)*0.0004;
        p.vx+=(Math.random()-0.5)*0.15; p.vy-=0.03;
        p.x+=p.vx; p.y+=p.vy; p.life++; p.r*=0.991;
        if(p.life>=p.maxLife||p.r<0.5){particles.splice(i,1);continue;}
        const progress=p.life/p.maxLife;
        const alpha=Math.sin(progress*Math.PI)*(d?0.45:0.55);
        let lightness, sat, hue;
        if(progress<0.3){      hue=255; sat=70; lightness=d?38:28; }
        else if(progress<0.6){ hue=270; sat=65; lightness=d?50:38; }
        else {                 hue=285; sat=55; lightness=d?65:48; }
        const rg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
        rg.addColorStop(0,`hsla(${hue},${sat}%,${Math.min(lightness+15,d?90:65)}%,${alpha})`);
        rg.addColorStop(0.5,`hsla(${hue},${sat}%,${lightness}%,${alpha*0.6})`);
        rg.addColorStop(1,`hsla(${hue},${sat-10}%,${lightness-5}%,0)`);
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=rg; ctx.fill();
      }

      // embers
      for(let i=embers.length-1;i>=0;i--){
        const em=embers[i];
        em.vx+=(Math.random()-0.5)*0.1; em.vy-=0.015;
        em.x+=em.vx; em.y+=em.vy; em.life++;
        if(em.life>=em.maxLife){embers.splice(i,1);continue;}
        const ep=em.life/em.maxLife, ea=Math.sin(ep*Math.PI)*(d?0.9:1.0);
        const el=d?'78%':'45%';
        ctx.beginPath(); ctx.arc(em.x,em.y,em.r,0,Math.PI*2);
        ctx.fillStyle=`hsla(${em.hue},85%,${el},${ea})`; ctx.fill();
        const eg=ctx.createRadialGradient(em.x,em.y,0,em.x,em.y,em.r*5);
        eg.addColorStop(0,`hsla(${em.hue},80%,${el},${ea*0.4})`); eg.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.arc(em.x,em.y,em.r*5,0,Math.PI*2); ctx.fillStyle=eg; ctx.fill();
      }

      // smoke
      for(let i=0;i<4;i++){
        const sx=w*(0.2+i*0.2)+Math.sin(t*0.4+i)*30;
        const sg=ctx.createRadialGradient(sx,h*0.12,0,sx,h*0.12,60+i*10);
        sg.addColorStop(0,`rgba(120,80,200,${d?0.025:0.04})`); sg.addColorStop(1,'rgba(120,80,200,0)');
        ctx.beginPath(); ctx.arc(sx,h*0.12,80,0,Math.PI*2); ctx.fillStyle=sg; ctx.fill();
      }
    }
    resize(); draw();
    const ro=new ResizeObserver(resize); ro.observe(canvas.parentElement);
    return ()=>{ cancelAnimationFrame(animId); ro.disconnect(); canvas.parentElement?.removeEventListener('mousemove',onMove); };
  },[]);
  return <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:0.85}} />;
}
