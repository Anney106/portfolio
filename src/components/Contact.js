import React, { useState } from 'react';
import './Contact.css';
import useScrollReveal from './useScrollReveal';
import ElectricVFX from './ElectricVFX';

const contactInfo = [
  { icon: '📞', label: 'Phone', value: '+91 8240230192', href: 'tel:+918240230192' },
  { icon: '✉️', label: 'Email', value: 'trishikhachakraborty19@gmail.com', href: 'mailto:trishikhachakraborty19@gmail.com' },
  { icon: '📍', label: 'Location', value: 'Thakurpukur, Kolkata 700063', href: null },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/trishikha-chakraborty-54102b262', href: 'https://www.linkedin.com/in/trishikha-chakraborty-54102b262/' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');
  const infoRef = useScrollReveal();
  const formRef = useScrollReveal();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const mailto = `mailto:trishikhachakraborty19@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="contact section aurora-section" id="contact">
      <ElectricVFX />
      <div className="container">
        <p className="section-subtitle">Say Hello</p>
        <h2 className="section-title">Get In <span>Touch</span></h2>
        <div className="title-underline" />

        <div className="contact-layout">
          {/* Left - Info */}
          <div className="contact-info-side reveal-left" ref={infoRef}>
            <p className="contact-intro">
              Have a project in mind? Want a stunning video edit, a fresh brand identity, or
              creative collaboration? I'd love to hear from you!
            </p>

            <div className="contact-cards">
              {contactInfo.map((c, i) => (
                <div key={i} className="contact-card neu-card shimmer-card neon-border" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="contact-card-icon">{c.icon}</div>
                  <div>
                    <div className="contact-card-label">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="contact-card-value link" target={c.href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
                        {c.value}
                      </a>
                    ) : (
                      <div className="contact-card-value">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-availability neu-card neon-border">
              <div className="availability-dot" />
              <div>
                <div className="availability-title">Available for Freelance</div>
                <div className="availability-sub">Open to video editing, design & VFX projects</div>
              </div>
            </div>

            {/* Social links */}
            <div className="social-links">
              <a href="https://drive.google.com/drive/folders/1TbVjSTg-xBk4SFVsigBSaFvr3wYJGQ43" target="_blank" rel="noreferrer" className="social-btn neu-btn sparkle-btn">
                📁 Portfolio Drive
              </a>
              <a href="https://www.linkedin.com/in/trishikha-chakraborty-54102b262/" target="_blank" rel="noreferrer" className="social-btn neu-btn sparkle-btn">
                💼 LinkedIn
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-form-side reveal-right" ref={formRef}>
            <form className="contact-form neu-card shimmer-card" onSubmit={handleSubmit}>
              <h3 className="form-title">Send a Message</h3>

              <div className="form-row">
                <div className={`form-group ${focused === 'name' ? 'focused' : ''}`}>
                  <label htmlFor="name">Your Name</label>
                  <div className="input-wrap">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      placeholder="John Harington"
                      required
                    />
                  </div>
                </div>

                <div className={`form-group ${focused === 'email' ? 'focused' : ''}`}>
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrap">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={`form-group ${focused === 'subject' ? 'focused' : ''}`}>
                <label htmlFor="subject">Subject</label>
                <div className="input-wrap">
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused('')}
                    placeholder="Video editing project..."
                  />
                </div>
              </div>

              <div className={`form-group ${focused === 'message' ? 'focused' : ''}`}>
                <label htmlFor="message">Message</label>
                <div className="input-wrap">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
              </div>

              <button type="submit" className={`submit-btn neu-btn-accent sparkle-btn ${sent ? 'sent' : ''}`}>
                {sent ? '✅ Message Sent!' : '🚀 Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
