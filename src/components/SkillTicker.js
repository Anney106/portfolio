import React from 'react';

const ITEMS = [
  { icon: 'Ps',  label: 'Photoshop',        color: '#31A8FF' },
  { icon: 'Ai',  label: 'Illustrator',       color: '#FF9A00' },
  { icon: 'Pr',  label: 'Premiere Pro',      color: '#9999FF' },
  { icon: 'Ae',  label: 'After Effects',     color: '#D291FF' },
  { icon: 'An',  label: 'Animation CC',      color: '#D7374A' },
  { icon: 'Ma',  label: 'Autodesk Maya',     color: '#0696D7' },
  { icon: '✨',  label: 'VFX Design',         color: '#a78bfa' },
  { icon: '🎬',  label: 'Short Films',        color: '#8b5cf6' },
  { icon: '✂️',  label: 'Video Editing',      color: '#7c3aed' },
  { icon: '🎨',  label: 'Motion Graphics',    color: '#c4b5fd' },
  { icon: '🖌️',  label: 'Brand Identity',     color: '#a78bfa' },
  { icon: '📱',  label: 'Social Content',     color: '#8b5cf6' },
  { icon: '🧊',  label: '3D Modeling',        color: '#6d28d9' },
  { icon: '🎭',  label: '2D Animation',       color: '#9333ea' },
  { icon: '🖼️',  label: 'Thumbnail Design',   color: '#7c3aed' },
];

/**
 * SkillTicker
 * An infinite auto-scrolling horizontal marquee of skill tags.
 * Pauses on hover. Uses two identical copies of the item list to
 * create a seamless loop (CSS animation shifts exactly -50%).
 */
export default function SkillTicker() {
  // Double the list for seamless looping
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="ticker-item"
            style={{ '--accent': item.color }}
          >
            <span style={{ fontSize: '1em' }}>{item.icon}</span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
