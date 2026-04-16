import { useEffect, useRef } from 'react';

const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

export default function ElectricVFX() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, w, h, mouseX=-1, mouseY=-1, frameCount=0;
    const orbs=Array.from({length:5},(_,i)=>({
      x:10+i*20, y:20+Math.random()*60, vx:(Math.random()-0.5)*0.08, vy:(Math.random()-0.5)*0.06,
      r:8+Math.random()*16, hue:255+i*12, phase:Math.random()*Math.PI*2, pulseSpeed:0.4+Math.random()*0.8
    }));
    const lightnings=[];
    let lastBolt=0;

    function midDisplace(x1,y1,x2,y2,depth,rough){
      if(depth===0) return [[x1,y1],[x2,y2]];
      const mx=(x1+x2)/2+(Math.random()-0.5)*rough, my=(y1+y2)/2+(Math.random()-0.5)*rough;
      return [...midDisplace(x1,y1,mx,my,depth-1,rough*0.55).slice(0,-1),[mx,my],...midDisplace(mx,my,x2,y2,depth-1,rough*0.55).slice(1)];
    }
    function spawnBolt(x1,y1,x2,y2,roughness=80,maxLife=18){
      lightnings.push({points:midDisplace(x1,y1,x2,y2,5,roughness),life:0,maxLife,width:0.8+Math.random()*1.5,hue:260+Math.random()*40,alpha:0.7+Math.random()*0.3});
    }
    function resize(){ w=canvas.width=canvas.parentElement.offsetWidth; h=canvas.height=canvas.parentElement.offsetHeight; }
    const onMove=e=>{ const r=canvas.getBoundingClientRect(); mouseX=e.clientX-r.left; mouseY=e.clientY-r.top; };
    canvas.parentElement.addEventListener('mousemove',onMove);

    let t=0;
    function draw(){
      animId=requestAnimationFrame(draw); ctx.clearRect(0,0,w,h); t+=0.014; frameCount++;
      const d=isDark();

      [[0,0],[w,0],[0,h],[w,h]].forEach(([cx,cy],i)=>{
        const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,200);
        const pulse=(d?0.03:0.05)+0.02*Math.sin(t*0.7+i);
        cg.addColorStop(0,`rgba(100,50,200,${pulse})`); cg.addColorStop(1,'rgba(100,50,200,0)');
        ctx.beginPath(); ctx.arc(cx,cy,200,0,Math.PI*2); ctx.fillStyle=cg; ctx.fill();
      });

      orbs.forEach((orb,i)=>{
        orb.x+=orb.vx; orb.y+=orb.vy;
        if(orb.x<5||orb.x>95) orb.vx*=-1; if(orb.y<5||orb.y>95) orb.vy*=-1;
        const ox=orb.x/100*w, oy=orb.y/100*h;
        const pulse=0.7+0.3*Math.sin(t*orb.pulseSpeed+orb.phase);
        const og=ctx.createRadialGradient(ox,oy,0,ox,oy,orb.r*3*pulse);
        og.addColorStop(0,`hsla(${orb.hue},90%,${d?'78%':'45%'},${d?0.35:0.50})`);
        og.addColorStop(0.4,`hsla(${orb.hue},80%,${d?'65%':'40%'},${d?0.15:0.22})`);
        og.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.arc(ox,oy,orb.r*3*pulse,0,Math.PI*2); ctx.fillStyle=og; ctx.fill();
        ctx.beginPath(); ctx.arc(ox,oy,orb.r*pulse,0,Math.PI*2);
        ctx.fillStyle=`hsla(${orb.hue},85%,${d?'82%':'50%'},0.7)`; ctx.fill();
        ctx.beginPath(); ctx.arc(ox,oy,orb.r*1.5*pulse,0,Math.PI*2);
        ctx.strokeStyle=`hsla(${orb.hue},80%,${d?'72%':'45%'},0.4)`; ctx.lineWidth=1; ctx.stroke();
        if(frameCount%4===i&&Math.random()>0.5){
          const next=orbs[(i+1)%orbs.length]; const nx=next.x/100*w,ny=next.y/100*h;
          if(Math.hypot(nx-ox,ny-oy)<w*0.35) spawnBolt(ox,oy,nx,ny,25,10);
        }
      });

      const now=performance.now();
      if(now-lastBolt>800+Math.random()*1500){
        lastBolt=now;
        const x1=Math.random()>0.5?0:w, y1=Math.random()*h*0.6;
        const x2=mouseX>0?mouseX+(Math.random()-0.5)*60:Math.random()*w;
        const y2=mouseY>0?mouseY+(Math.random()-0.5)*60:Math.random()*h;
        spawnBolt(x1,y1,x2,y2);
      }
      if(mouseX>0&&frameCount%30===0){
        const src=orbs[Math.floor(Math.random()*orbs.length)];
        spawnBolt(src.x/100*w,src.y/100*h,mouseX+(Math.random()-0.5)*30,mouseY+(Math.random()-0.5)*30);
      }

      for(let i=lightnings.length-1;i>=0;i--){
        const lt=lightnings[i]; lt.life++;
        if(lt.life>=lt.maxLife){lightnings.splice(i,1);continue;}
        const fade=Math.sin((lt.life/lt.maxLife)*Math.PI);
        const la=d?lt.alpha*fade:lt.alpha*fade*1.3;
        const lh=d?'90%':'45%';
        ctx.beginPath(); lt.points.forEach(([px,py],j)=>j===0?ctx.moveTo(px,py):ctx.lineTo(px,py));
        ctx.strokeStyle=`hsla(${lt.hue},70%,${lh},${la*0.3})`; ctx.lineWidth=lt.width*5; ctx.lineJoin='round'; ctx.stroke();
        ctx.beginPath(); lt.points.forEach(([px,py],j)=>j===0?ctx.moveTo(px,py):ctx.lineTo(px,py));
        ctx.strokeStyle=`hsla(${lt.hue},90%,${lh},${la})`; ctx.lineWidth=lt.width; ctx.stroke();
      }

      // scanlines
      for(let y=0;y<h;y+=8){
        if(Math.random()>0.97){
          ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y);
          ctx.strokeStyle=`rgba(120,80,220,${d?0.018:0.025})`; ctx.lineWidth=0.5; ctx.stroke();
        }
      }
    }
    resize(); draw();
    const ro=new ResizeObserver(resize); ro.observe(canvas.parentElement);
    return ()=>{ cancelAnimationFrame(animId); ro.disconnect(); canvas.parentElement?.removeEventListener('mousemove',onMove); };
  },[]);
  return <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:0.8}} />;
}
