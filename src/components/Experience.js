import React from 'react';
import './Experience.css';
import useScrollReveal from './useScrollReveal';

const experiences = [
  {
    role: 'Video Editor & Community Manager',
    type: 'Freelance',
    period: '2023 – Present',
    tags: ['YouTube', 'Remote'],
    channels: ['Directioner Gaming', 'Frustrated Pallav', 'Harshit Playz', 'VL Astrology'],
    bullets: [
      'Thumbnail design for viral-ready YouTube videos',
      'Long-form and Shorts/Reels video editing',
      'Discord community management & growth',
      'Brand consistency across all channel assets',
    ],
    icon: '🎬',
    accent: '#8b5cf6',
  },
  {
    role: 'Graphic Designer',
    type: 'Freelance',
    period: '2023 – Present',
    tags: ['Local Vendors', 'Print & Digital'],
    channels: [],
    bullets: [
      'Banners, standees and leaflets for local businesses',
      'Digital invitation cards and event collateral',
      'Brand identity packages for small businesses',
      'Social media post and reel designs',
    ],
    icon: '🎨',
    accent: '#a78bfa',
  },
];

const education = [
  {
    degree: 'BBA – Bachelor of Business Administration',
    school: 'Manipal Online University, Jaipur',
    period: '2026 – Ongoing',
    icon: '🎓',
  },
  {
    degree: 'VFX Film Making Course',
    school: 'Arena Animation, Chowringhee',
    period: '2023 – Ongoing',
    icon: '🎥',
  },
  {
    degree: 'ISC (Science Stream)',
    school: "St Thomas Girls' School, Kidderpore",
    period: '2020 – 2021',
    icon: '📚',
  },
  {
    degree: 'ICSE',
    school: 'Vidya Niketan, Bansdroni',
    period: '2017 – 2018',
    icon: '🏫',
  },
];

export default function Experience() {
  const workRef = useScrollReveal();
  const eduRef = useScrollReveal();

  return (
    <section className="experience section section-glow-enter" id="experience">
      <div className="container">
        <p className="section-subtitle">My Journey</p>
        <h2 className="section-title">Experience & <span>Education</span></h2>
        <div className="title-underline" />

        <div className="exp-layout">
          {/* Work */}
          <div className="reveal-left" ref={workRef}>
            <h3 className="exp-col-title">💼 Work Experience</h3>
            <div className="exp-timeline">
              {experiences.map((e, i) => (
                <div key={i} className="exp-item">
                  <div className="exp-dot" style={{ background: e.accent }}>
                    <span>{e.icon}</span>
                  </div>
                  <div className="exp-card neu-card shimmer-card neon-border">
                    <div className="exp-card-header">
                      <div>
                        <h4 className="exp-role">{e.role}</h4>
                        <div className="exp-meta">
                          <span className="exp-type">{e.type}</span>
                          <span className="exp-period">{e.period}</span>
                        </div>
                      </div>
                      <div className="exp-tags">
                        {e.tags.map(t => (
                          <span key={t} className="exp-tag">{t}</span>
                        ))}
                      </div>
                    </div>

                    {e.channels.length > 0 && (
                      <div className="exp-channels">
                        {e.channels.map(c => (
                          <span key={c} className="channel-pill">{c}</span>
                        ))}
                      </div>
                    )}

                    <ul className="exp-bullets">
                      {e.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="reveal-right" ref={eduRef}>
            <h3 className="exp-col-title">🎓 Education</h3>
            <div className="edu-list">
              {education.map((ed, i) => (
                <div key={i} className="edu-card neu-card shimmer-card neon-border" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="edu-icon">{ed.icon}</div>
                  <div className="edu-info">
                    <div className="edu-degree">{ed.degree}</div>
                    <div className="edu-school">{ed.school}</div>
                    <div className="edu-period">{ed.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
