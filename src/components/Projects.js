import React, { useState, useRef } from 'react';
import './Projects.css';
import useScrollReveal from './useScrollReveal';
import TiltCard      from './TiltCard';
import MagneticButton from './MagneticButton';

const categories = ['All', 'Graphic Design', 'Video Editing', 'Animation', 'Short Film', 'Handcraft'];

const projects = [
  {
    title: 'YouTube Thumbnails',
    category: 'Graphic Design',
    tags: ['Photoshop', 'YouTube'],
    desc: 'High-CTR thumbnails designed for multiple gaming and lifestyle YouTube channels with bold typography and dynamic compositions.',
    emoji: '🖼️',
    color: '#8b5cf6',
    link: 'https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43',
  },
  {
    title: 'SREE – Short Film',
    category: 'Short Film',
    tags: ['Premiere Pro', 'Script Writing'],
    desc: 'A student short film I edited and co-wrote, exploring human emotions through minimalist storytelling and evocative visual language.',
    emoji: '🎬',
    color: '#7c3aed',
    link: 'https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43',
  },
  {
    title: '2D Character Animation',
    category: 'Animation',
    tags: ['Adobe Animation', 'Character Design'],
    desc: 'Full character animation pipeline — design, walk/run cycles, facial expressions, lip-sync, and whiteboard animations.',
    emoji: '🎭',
    color: '#a78bfa',
    link: 'https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43',
  },
  {
    title: 'Brand Identity – Local Vendors',
    category: 'Graphic Design',
    tags: ['Illustrator', 'Print Design'],
    desc: 'Complete brand kits for local businesses including standees, banners, leaflets, and digital card designs.',
    emoji: '💼',
    color: '#6d28d9',
    link: 'https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43',
  },
  {
    title: 'YouTube Shorts & Reels',
    category: 'Video Editing',
    tags: ['Premiere Pro', 'Cap Cut'],
    desc: 'Fast-paced, trend-driven short-form video edits optimized for vertical platforms with motion graphics and text overlays.',
    emoji: '📱',
    color: '#9333ea',
    link: 'https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43',
  },
  {
    title: 'Typography Animation',
    category: 'Animation',
    tags: ['Adobe Animation', 'Motion'],
    desc: 'Kinetic typography projects with dynamic text transitions, timing-based choreography, and expressive motion paths.',
    emoji: '✍️',
    color: '#7c3aed',
    link: 'https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43',
  },
  {
    title: 'Social Media Banners',
    category: 'Graphic Design',
    tags: ['Photoshop', 'Illustrator'],
    desc: 'Cohesive social media banner packs with channel art, profile banners, and post templates for YouTube creators.',
    emoji: '🎨',
    color: '#c4b5fd',
    link: 'https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43',
  },
  {
    title: 'Handmade Craft Projects',
    category: 'Handcraft',
    tags: ['DIY', 'Creative Arts'],
    desc: 'Handcrafted gifts, decorative items, and mixed-media artworks — bringing the same design sensibility from digital to tangible.',
    emoji: '🪡',
    color: '#8b5cf6',
    link: 'https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43',
  },
];

const VISIBLE = 3;

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [startIdx, setStartIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const headerRef = useScrollReveal();
  const carouselRef = useScrollReveal();

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);
  const total = filtered.length;

  const prev = () => setStartIdx(i => Math.max(0, i - 1));
  const next = () => setStartIdx(i => Math.min(total - VISIBLE, i + 1));

  const handleFilter = (cat) => {
    setFilter(cat);
    setStartIdx(0);
  };

  const handleDragStart = (e) => {
    dragStart.current = e.clientX || e.touches?.[0]?.clientX;
    setDragging(true);
  };

  const handleDragEnd = (e) => {
    if (!dragging) return;
    const end = e.clientX || e.changedTouches?.[0]?.clientX;
    const diff = dragStart.current - end;
    if (diff > 50) next();
    else if (diff < -50) prev();
    setDragging(false);
  };

  const visible = filtered.slice(startIdx, startIdx + VISIBLE);

  return (
    <section className="projects section aurora-section section-glow-enter" id="projects">
      <div className="container">
        <div className="reveal-up" ref={headerRef}>
          <p className="section-subtitle">What I've Built</p>
          <h2 className="section-title">My <span>Projects</span></h2>
          <div className="title-underline" />
        </div>

        {/* Filter tabs */}
        <div className="filter-tabs reveal-up" style={{ transitionDelay: '0.15s' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn neu-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => handleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="carousel-wrapper reveal-scale" ref={carouselRef}>
          <button
            className="carousel-arrow left neu-btn"
            onClick={prev}
            disabled={startIdx === 0}
            aria-label="Previous"
          >
            ‹
          </button>

          <div
            className="carousel-track"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            {visible.map((p, i) => (
              <ProjectCard key={`${p.title}-${i}`} project={p} />
            ))}
            {visible.length < VISIBLE && Array.from({ length: VISIBLE - visible.length }).map((_, i) => (
              <div key={`empty-${i}`} className="project-card empty" />
            ))}
          </div>

          <button
            className="carousel-arrow right neu-btn"
            onClick={next}
            disabled={startIdx >= total - VISIBLE}
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {Array.from({ length: Math.max(1, total - VISIBLE + 1) }).map((_, i) => (
            <button
              key={i}
              className={`dot ${startIdx === i ? 'active' : ''}`}
              onClick={() => setStartIdx(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="projects-cta">
          <MagneticButton>
            <a
              href="https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43"
              target="_blank"
              rel="noreferrer"
              className="neu-btn-accent projects-drive-btn sparkle-btn"
            >
              📁 View Full Portfolio on Google Drive
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }) {
  return (
    <TiltCard className="project-card neu-card neon-border" maxTilt={7}>
      <div className="card-top" style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)` }}>
        <div className="card-emoji" style={{ fontSize: '3rem' }}>{p.emoji}</div>
        <div className="card-category-badge" style={{ color: p.color }}>{p.category}</div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{p.title}</h3>
        <p className="card-desc">{p.desc}</p>
        <div className="card-tags">
          {p.tags.map(t => (
            <span key={t} className="card-tag">{t}</span>
          ))}
        </div>
        <a href={p.link} target="_blank" rel="noreferrer" className="card-link neu-btn-accent sparkle-btn">
          View Work ↗
        </a>
      </div>
    </TiltCard>
  );
}
