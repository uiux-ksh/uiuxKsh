'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Skills.module.scss';

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    category: 'Core',
    skills: [
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'HTML/CSS', level: 95 },
    ],
  },
  {
    category: 'Framework',
    skills: [
      { name: 'Next.js', level: 90 },
      { name: 'React', level: 92 },
    ],
  },
  {
    category: 'State & Data',
    skills: [
      { name: 'React Query', level: 88 },
      { name: 'Zustand', level: 85 },
    ],
  },
  {
    category: 'Styling',
    skills: [
      { name: 'Sass/SCSS', level: 90 },
      { name: 'Tailwind CSS', level: 75 },
    ],
  },
  {
    category: 'Animation & UI',
    skills: [
      { name: 'GSAP', level: 80 },
      { name: 'React Flow', level: 75 },
    ],
  },
  {
    category: 'Infra & Tools',
    skills: [
      { name: 'Git / GitHub Actions', level: 85 },
      { name: 'Figma', level: 78 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin: 스킬 섹션 고정 후 바 채우기
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panelRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.8,
        },
      });

      // 카드 순차 등장
      const cards = gsap.utils.toArray(`.${styles.groupCard}`) as HTMLElement[];
      cards.forEach((card, i) => {
        tl.from(
          card,
          {
            y: 60,
            opacity: 0,
            duration: 0.4,
          },
          i * 0.15,
        );
      });

      // 스킬바 채우기
      const bars = gsap.utils.toArray(`.${styles.barFill}`) as HTMLElement[];
      bars.forEach((bar) => {
        const level = bar.getAttribute('data-level') || '0';
        tl.to(
          bar,
          { width: `${level}%`, duration: 0.5, ease: 'power2.out' },
          0.3,
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.skills}>
      <div ref={panelRef} className={styles.pinPanel}>
        <div className={styles.header}>
          <span className={styles.label}>SKILLS</span>
          <h2 className={styles.sectionTitle}>기술 스택</h2>
          <p className={styles.headerNote}>
            % 수치는 프로젝트에서 자주 사용한 정도를 기준으로 적어놓았습니다.
          </p>
        </div>

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className={styles.groupCard}>
              <h3 className={styles.groupTitle}>{group.category}</h3>
              <div className={styles.skillList}>
                {group.skills.map((skill) => (
                  <div key={skill.name} className={styles.skillRow}>
                    <div className={styles.skillInfo}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        data-level={skill.level}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
