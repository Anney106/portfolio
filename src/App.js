import React, { useState, useEffect } from 'react';
import './App.css';
import './vfx.css';
import './vfx2.css';              // ← NEW extended VFX pack

import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import Skills        from './components/Skills';
import Experience    from './components/Experience';
import Projects      from './components/Projects';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Original VFX
import CursorGlow from './components/CursorGlow';

// NEW VFX components
import ScrollProgress from './components/ScrollProgress';  // glowing progress bar
import RippleLayer    from './components/RippleLayer';     // click ripple rings
import SkillTicker    from './components/SkillTicker';     // scrolling skills marquee

export const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme]       = useState('light');
  const [loaded, setLoaded]     = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* VFX Loading Screen — unmounts itself after onComplete */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div className={`app ${theme}`} style={{ visibility: loaded ? 'visible' : 'hidden' }}>

        {/* ── Global VFX layers ── */}
        <ScrollProgress />     {/* z 10001 — glowing lavender top bar */}
        <CursorGlow />         {/* z 9998/9999 — trailing glow + dot */}
        <RippleLayer />        {/* z 9997 — click ripple + burst rings */}
        {/* film-grain via vfx2.css body::after — z 9990 */}

        {/* ── Page sections ── */}
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />

        {/* Skill ticker marquee between Experience and Projects */}
        <SkillTicker />

        <Projects />
        <Contact />
        <Footer />

      </div>
    </ThemeContext.Provider>
  );
}

export default App;
