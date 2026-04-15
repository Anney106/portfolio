import React from 'react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">Trishikha<span> Chakraborty</span></span>
            <p className="footer-tagline">Designing experiences. Editing stories. Creating worlds.</p>
          </div>

          <div className="footer-nav">
            <div className="footer-nav-col">
              <div className="footer-nav-title">Navigate</div>
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="footer-link">{l}</a>
              ))}
            </div>
            <div className="footer-nav-col">
              <div className="footer-nav-title">Work</div>
              <a href="https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43" target="_blank" rel="noreferrer" className="footer-link">📁 Portfolio Drive</a>
              <a href="mailto:trishikhachakraborty19@gmail.com" className="footer-link">✉️ Email Me</a>
              <a href="tel:+918240230192" className="footer-link">📞 Call Me</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-link">💼 LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <span className="footer-copy">
            © {year} Trishikha Chakraborty. All rights reserved.
          </span>
          <span className="footer-made">
            Made with <span className="heart">♥</span> in Kolkata
          </span>
        </div>
      </div>
    </footer>
  );
}
