import React, { useEffect, useRef } from 'react';
import './Hero.css';
import ParticleCanvas from './ParticleCanvas';
import FloatingIcons  from './FloatingIcons';
import MagneticButton from './MagneticButton';

/**
 * SplitText — renders each character in its own span so the
 * letter-reveal CSS keyframes can stagger per-character.
 */
function SplitText({ text, baseDelay = 0, className = '' }) {
  return (
    <span className={`letter-reveal ${className}`}>
      {text.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i} className="lr-space" />
        ) : (
          <span
            key={i}
            className="lr-char"
            style={{ animationDelay: `${baseDelay + i * 0.055}s` }}
          >
            {char}
          </span>
        )
      )}
    </span>
  );
}

const roles = ['Graphic Designer', 'Video Editor', '2D & 3D Creator', 'Filmmaker', 'DIY Enthusiast', 'Home Made Crafts'];

export default function Hero() {
  const roleRef = useRef(null);
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const el = roleRef.current;
    let timer;

    const type = () => {
      const current = roles[roleIdx.current];
      if (!deleting.current) {
        el.textContent = current.slice(0, charIdx.current + 1);
        charIdx.current++;
        if (charIdx.current === current.length) {
          deleting.current = true;
          timer = setTimeout(type, 1800);
          return;
        }
      } else {
        el.textContent = current.slice(0, charIdx.current - 1);
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % roles.length;
        }
      }
      timer = setTimeout(type, deleting.current ? 60 : 100);
    };

    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero section" id="hero">
      {/* VFX: floating particles */}
      <ParticleCanvas />

      {/* VFX: floating creative icons drifting upward */}
      <FloatingIcons count={16} />

      {/* Decorative blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="container hero-inner">
        <div className="hero-content">
          <p className="hero-greeting">
            <span className="greeting-dot" />
            Hello, I'm
          </p>

          <h1 className="hero-name">
            <SplitText text="Trishikha" baseDelay={0.2} />
            <span className="hero-name-accent">
              <SplitText text="Chakraborty" baseDelay={0.75} />
            </span>
          </h1>

          <div className="hero-role-wrap">
            <span className="role-prefix">—</span>
            <span className="hero-role" ref={roleRef}>Graphic Designer</span>
            <span className="cursor">|</span>
          </div>

          <p className="hero-bio">
            A passionate visual storyteller crafting stunning graphics, cinematic edits,
            and immersive Video Editor. Based in Kolkata, creating magic with pixels and frames.
          </p>

          <div className="hero-actions">
            <MagneticButton>
              <a href="#projects" className="neu-btn-accent hero-btn-main sparkle-btn">
                Explore My Work
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#contact" className="neu-btn hero-btn-sec sparkle-btn">
                Get In Touch
              </a>
            </MagneticButton>
          </div>

          <div className="hero-stats">
            <div className="stat-item neu-card">
              <span className="stat-num">3+</span>
              <span className="stat-label">Years<br/>Experience</span>
            </div>
            <div className="stat-item neu-card">
              <span className="stat-num">10+</span>
              <span className="stat-label">Happy<br/>Clients</span>
            </div>
            <div className="stat-item neu-card">
              <span className="stat-num">50+</span>
              <span className="stat-label">Projects<br/>Done</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="avatar-orbit">
            <div className="orbit-ring ring-1 animate-float">
              <div className="orbit-dot dot-ps" title="Photoshop">Ps</div>
              <div className="orbit-dot dot-ai" title="Illustrator">Ai</div>
              <div className="orbit-dot dot-pr" title="Premiere Pro">Pr</div>
            </div>
            <div className="orbit-ring ring-2">
              <div className="orbit-dot dot-ae" title="After Effects">Ae</div>
              <div className="orbit-dot dot-maya" title="Maya">Ma</div>
            </div>
            <div className="avatar-frame neu-card">
              <div className="avatar-inner">
                <div className="avatar-initials">TC</div>
                <div className="avatar-glow" />
              </div>
            </div>
          </div>

          <div className="hero-badge neu-card">
            <span className="badge-icon">🎬</span>
            <div>
              <div className="badge-title">YouTube Editor</div>
              <div className="badge-sub">5 Channels</div>
            </div>
          </div>

          <div className="hero-badge hero-badge-2 neu-card">
            <span className="badge-icon">🎨</span>
            <div>
              <div className="badge-title">Creative Designer</div>
              <div className="badge-sub">Local Vendors</div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
