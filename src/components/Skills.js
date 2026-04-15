import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';
import useScrollReveal from './useScrollReveal';

const softwareSkills = [
  { name: 'Adobe Photoshop CC', level: 90, icon: 'Ps', color: '#31A8FF' },
  { name: 'Adobe Illustrator CC', level: 85, icon: 'Ai', color: '#FF9A00' },
  { name: 'Adobe Premiere Pro', level: 90, icon: 'Pr', color: '#9999FF' },
  { name: 'Adobe Animation CC', level: 75, icon: 'An', color: '#D7374A' },
  { name: 'Cap Cut', level: 88, icon: 'Cc', color: '#6d28d9' },
  { name: 'Autodesk Maya', level: 50, icon: 'Ma', color: '#0696D7' },
];

const creativeSkills = [
  { name: 'Thumbnail Design', icon: '🖼️' },
  { name: 'Video Editing', icon: '✂️' },
  { name: 'VFX Design', icon: '✨' },
  { name: '2D Animation', icon: '🎭' },
  { name: '3D Modeling', icon: '🧊' },
  { name: 'Short Films', icon: '🎬' },
  { name: 'Social Media Content', icon: '📱' },
  { name: 'Brand Identity', icon: '💼' },
  { name: 'Motion Graphics', icon: '🎨' },
  { name: 'Character Design', icon: '🖌️' },
  { name: 'Handcraft / DIY', icon: '🪡' },
  { name: 'Discord Community', icon: '💬' },
];

const languages = [
  { name: 'English', flag: '🇬🇧', level: 'Fluent' },
  { name: 'Hindi', flag: '🇮🇳', level: 'Fluent' },
  { name: 'Bengali', flag: '🪷', level: 'Native' },
];

function SkillBar({ name, level, icon, color }) {
  const [animated, setAnimated] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-bar-item" ref={barRef}>
      <div className="skill-bar-header">
        <div className="skill-app-icon" style={{ background: color }}>
          {icon}
        </div>
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track neu-pressed-sm">
        <div
          className="skill-fill"
          style={{
            width: animated ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const colLeft = useScrollReveal();
  const colRight = useScrollReveal();

  return (
    <section className="skills section aurora-section" id="skills">
      <div className="container">
        <p className="section-subtitle">What I Use</p>
        <h2 className="section-title">My <span>Skills</span></h2>
        <div className="title-underline" />

        <div className="skills-layout">
          {/* Software */}
          <div className="skills-col reveal-left" ref={colLeft}>
            <h3 className="skills-col-title">Software Proficiency</h3>
            <div className="skills-bars-wrap neu-card shimmer-card">
              {softwareSkills.map(s => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>
          </div>

          {/* Creative + Languages */}
          <div className="skills-col reveal-right" ref={colRight}>
            <h3 className="skills-col-title">Creative Abilities</h3>
            <div className="creative-grid">
              {creativeSkills.map((s, i) => (
                <div key={s.name} className="creative-tag neu-card neon-border" style={{ transitionDelay: `${i * 0.04}s` }}>
                  <span className="creative-icon">{s.icon}</span>
                  <span className="creative-name">{s.name}</span>
                </div>
              ))}
            </div>

            <h3 className="skills-col-title" style={{ marginTop: '2rem' }}>Languages</h3>
            <div className="languages-row">
              {languages.map(l => (
                <div key={l.name} className="lang-card neu-card shimmer-card">
                  <span className="lang-flag">{l.flag}</span>
                  <div className="lang-name">{l.name}</div>
                  <div className="lang-level">{l.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
