import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import './Navbar.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          <span className="logo-t">T</span>
          <span className="logo-name">rishikha</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
              onClick={() => { setActiveLink(link.href); setMenuOpen(false); }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43"
            target="_blank"
            rel="noreferrer"
            className="nav-cta neu-btn-accent"
          >
            View Work
          </a>
        </div>

        <div className="nav-controls">
          <button
            className={`theme-toggle neu-btn ${theme}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="toggle-track">
              <span className="toggle-thumb">
                {theme === 'light' ? '☀️' : '🌙'}
              </span>
            </span>
          </button>

          <button
            className={`hamburger neu-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
