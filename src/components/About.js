import React from 'react';
import './About.css';
import useScrollReveal from './useScrollReveal';

const facts = [
  { icon: '🎓', label: 'BBA Student', sub: 'Manipal Online University' },
  { icon: '🎬', label: 'VFX Filmmaker', sub: 'Arena Animation, Chowringhee' },
  { icon: '📍', label: 'Based In', sub: 'Kolkata, India' },
  { icon: '📅', label: 'Available', sub: 'Freelance & Full-time' },
];

export default function About() {
  const sectionRef = useScrollReveal();
  const textRef = useScrollReveal();
  const visualRef = useScrollReveal();
  return (
    <section className="about section aurora-section section-glow-enter" id="about" ref={sectionRef}>
      <div className="container">
        <p className="section-subtitle">Who I Am</p>
        <h2 className="section-title">About <span>Me</span></h2>
        <div className="title-underline" />

        <div className="about-grid">
          <div className="about-text-side reveal-left" ref={textRef}>
            <p className="about-para">
              I'm <strong>Trishikha Chakraborty</strong>, a multi-disciplinary creative
              from Kolkata with a deep passion for visual storytelling. Whether I'm designing
              a striking poster, editing cinematic YouTube content, animating 2D characters,
              or sculpting in 3D — I bring <em>heart</em> and <em>craft</em> to every pixel.
            </p>
            <p className="about-para">
              With hands-on experience in <strong>Adobe Photoshop, Illustrator, Premiere Pro</strong>,
              and <strong>Autodesk Maya</strong>, I bridge the gap between creative vision and
              technical execution. I've served multiple YouTube channels, crafted branding materials
              for local vendors, and written &amp; edited short films.
            </p>
            <p className="about-para">
              Beyond the screen, I love handmade crafts — bringing the same attention to detail
              from my digital work into tangible, physical creations.
            </p>

            <div className="about-links">
              <a
                href="https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43"
                target="_blank"
                rel="noreferrer"
                className="neu-btn-accent about-link-btn"
              >
                📁 Google Drive Portfolio
              </a>
              <a
                href="https://www.youtube.com/@SREEShortFilm"
                target="_blank"
                rel="noreferrer"
                className="neu-btn about-link-btn"
              >
                🎬 Short Film SREE
              </a>
            </div>
          </div>

          <div className="about-facts-side reveal-right" ref={visualRef}>
            {facts.map((f, i) => (
              <div key={i} className="fact-card neu-card shimmer-card neon-border wipe-in reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="fact-icon">{f.icon}</div>
                <div>
                  <div className="fact-label">{f.label}</div>
                  <div className="fact-sub">{f.sub}</div>
                </div>
              </div>
            ))}

            <div className="about-quote neu-card">
              <div className="quote-mark">"</div>
              <p className="quote-text">
                Creativity is intelligence having fun — I design, edit, and create experiences
                that leave a lasting impression.
              </p>
              <div className="quote-sig">— Trishikha</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
