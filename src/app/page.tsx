'use client';

import Hero from './feature/hero/Hero';
import About from './feature/about/About';
import Career from './feature/career/Career';
import Skills from './feature/skills/Skills';
import Projects from './feature/projects/Projects';
import Contact from './feature/contact/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Career />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
