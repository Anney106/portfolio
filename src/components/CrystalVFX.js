import { useEffect, useRef } from 'react';

const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

export default function CrystalVFX() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, w, h, mouseX=-1, mouseY=-1;
    let shards=[];

    function makeShard(){
      return { x:Math.random()*w, y:Math.random()*h,
        vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.25,
        sides:3+Math.floor(Math.random()*4), size:18+Math.random()*40,
        rotation:Math.random()*Math.PI*2, rotSpeed:(Math.random()-0.5)*0.008,
        hue:250+Math.random()*55, alpha:0.08+Math.random()*0.14,
        pulsePhase:Math.random()*Math.PI*2, pulseSpeed:0.5+Math.random()*1.5 };
    }
    const rays=Array.from({length:8},(_,i)=>({
      angle:(i/8)*Math.PI*2, length:80+Math.random()*120, width:1+Math.random()*2,
      hue:240+i*15, alpha:0.06+Math.random()*0.07, speed:0.003+Math.random()*0.005
    }));
    const COLS=8, ROWS=6;
    function resize(){ w=canvas.width=canvas.parentElement.offsetWidth; h=canvas.height=canvas.parentElement.offsetHeight; shards=Array.from({length:28},makeShard); }
    const onMove=e=>{ const r=canvas.getBoundingClientRect(); mouseX=e.clientX-r.left; mouseY=e.clientY-r.top; };
    canvas.parentElement.addEventListener('mousemove',onMove);
    function polygon(cx,cy,r,sides,rot){ ctx.beginPath(); for(let i=0;i<=sides;i++){const a=rot+(i/sides)*Math.PI*2; i===0?ctx.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);} ctx.closePath(); }

    let t=0;
    function draw(){
      animId=requestAnimationFrame(draw); ctx.clearRect(0,0,w,h); t+=0.012;
      const d=isDark(), la=d?0.045:0.07;
      const cellW=w/COLS, cellH=h/ROWS;
      ctx.strokeStyle=`rgba(100,60,200,${la})`; ctx.lineWidth=0.5;
      for(let row=0;row<=ROWS;row++) for(let col=0;col<=COLS;col++){
        const nx=col*cellW+Math.sin(t*0.3+row*0.8)*4, ny=row*cellH+Math.cos(t*0.25+col*0.7)*4;
        if(col<COLS){const nx2=(col+1)*cellW+Math.sin(t*0.3+row*0.8)*4; ctx.beginPath();ctx.moveTo(nx,ny);ctx.lineTo(nx2,ny);ctx.stroke();}
        if(col<COLS&&row<ROWS){const nx2=(col+1)*cellW+Math.sin(t*0.3+(row+1)*0.8)*4,ny2=(row+1)*cellH+Math.cos(t*0.25+col*0.7)*4; ctx.beginPath();ctx.moveTo(nx,ny);ctx.lineTo(nx2,ny2);ctx.stroke();}
        ctx.beginPath(); ctx.arc(nx,ny,1.2,0,Math.PI*2); ctx.fillStyle=`rgba(140,100,240,${la*1.5})`; ctx.fill();
      }
      const cx=w*0.75, cy=h*0.28;
      rays.forEach(ray=>{
        ray.angle+=ray.speed;
        const ex=cx+Math.cos(ray.angle)*ray.length, ey=cy+Math.sin(ray.angle)*ray.length;
        const ra=d?ray.alpha:ray.alpha*1.5;
        const rg=ctx.createLinearGradient(cx,cy,ex,ey);
        rg.addColorStop(0,`hsla(${ray.hue},80%,${d?'72%':'40%'},${ra*2})`);
        rg.addColorStop(0.6,`hsla(${ray.hue+20},70%,${d?'65%':'38%'},${ra})`);
        rg.addColorStop(1,`hsla(${ray.hue+40},60%,${d?'60%':'35%'},0)`);
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(ex,ey); ctx.strokeStyle=rg; ctx.lineWidth=ray.width; ctx.stroke();
      });
      const pc=ctx.createRadialGradient(cx,cy,0,cx,cy,30);
      pc.addColorStop(0,`rgba(180,140,255,${d?0.35:0.55})`); pc.addColorStop(0.5,`rgba(140,100,240,${d?0.15:0.25})`); pc.addColorStop(1,'rgba(140,100,240,0)');
      ctx.beginPath(); ctx.arc(cx,cy,30,0,Math.PI*2); ctx.fillStyle=pc; ctx.fill();
      polygon(cx,cy,22,6,t*0.4);
      ctx.strokeStyle=`rgba(160,120,255,${d?0.5:0.7})`; ctx.lineWidth=1; ctx.stroke();
      shards.forEach(s=>{
        s.x+=s.vx; s.y+=s.vy; s.rotation+=s.rotSpeed;
        if(s.x<-s.size*2) s.x=w+s.size; if(s.x>w+s.size*2) s.x=-s.size;
        if(s.y<-s.size*2) s.y=h+s.size; if(s.y>h+s.size*2) s.y=-s.size;
        const pulse=0.8+0.2*Math.sin(t*s.pulseSpeed+s.pulsePhase);
        const alpha=(d?s.alpha:s.alpha*1.5)*pulse;
        polygon(s.x,s.y,s.size*pulse,s.sides,s.rotation);
        const sg=ctx.createLinearGradient(s.x-s.size,s.y-s.size,s.x+s.size,s.y+s.size);
        sg.addColorStop(0,`hsla(${s.hue},70%,${d?'78%':'42%'},${alpha})`);
        sg.addColorStop(0.5,`hsla(${s.hue+20},65%,${d?'68%':'38%'},${alpha*0.5})`);
        sg.addColorStop(1,`hsla(${s.hue-10},75%,${d?'82%':'45%'},${alpha*0.3})`);
        ctx.fillStyle=sg; ctx.fill();
        polygon(s.x,s.y,s.size*pulse,s.sides,s.rotation);
        ctx.strokeStyle=`hsla(${s.hue},80%,${d?'82%':'45%'},${alpha*2})`; ctx.lineWidth=0.8; ctx.stroke();
      });
      if(mouseX>0){
        const mg=ctx.createRadialGradient(mouseX,mouseY,0,mouseX,mouseY,60);
        mg.addColorStop(0,`rgba(160,120,255,${d?0.18:0.28})`); mg.addColorStop(1,'rgba(160,120,255,0)');
        ctx.beginPath(); ctx.arc(mouseX,mouseY,60,0,Math.PI*2); ctx.fillStyle=mg; ctx.fill();
      }
    }
    resize(); draw();
    const ro=new ResizeObserver(resize); ro.observe(canvas.parentElement);
    return ()=>{ cancelAnimationFrame(animId); ro.disconnect(); canvas.parentElement?.removeEventListener('mousemove',onMove); };
  },[]);
  return <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:0.9}} />;
}
