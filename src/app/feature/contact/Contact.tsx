'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SVG 텍스트 stroke 애니메이션
      const paths = sectionRef.current?.querySelectorAll(`.${styles.strokeText} text`);
      if (paths) {
        gsap.from(paths, {
          strokeDashoffset: 1000,
          opacity: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        });
      }

      // 정보 카드 등장
      gsap.from(`.${styles.contactCard}`, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.contact}>
      <div className={styles.bgGlow} />

      <svg className={styles.strokeText} viewBox="0 0 900 120" preserveAspectRatio="xMidYMid meet">
        <text
          x="450"
          y="95"
          textAnchor="middle"
          className={styles.svgText}
        >
          THANK YOU
        </text>
      </svg>

      <h2 ref={titleRef} className={styles.title}>
        봐주셔서 감사합니다
      </h2>
      <p className={styles.subtitle}>함께 일하고 싶으시다면 편하게 연락주세요.</p>

      <div className={styles.contactGrid}>
        <a href="mailto:uiux-ksh@naver.com" className={styles.contactCard}>
          <span className={styles.cardLabel}>Email</span>
          <span className={styles.cardValue}>uiux-ksh@naver.com</span>
        </a>
        <a href="tel:010-3679-5721" className={styles.contactCard}>
          <span className={styles.cardLabel}>Phone</span>
          <span className={styles.cardValue}>010-3679-5721</span>
        </a>
        <a
          href="https://github.com/uiux-ksh"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactCard}
        >
          <span className={styles.cardLabel}>GitHub</span>
          <span className={styles.cardValue}>github.com/uiux-ksh</span>
        </a>
        <a
          href="https://uiux-ksh.tistory.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactCard}
        >
          <span className={styles.cardLabel}>Blog</span>
          <span className={styles.cardValue}>uiux-ksh.tistory.com</span>
        </a>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2025 김성훈. All rights reserved.</p>
      </footer>
    </section>
  );
}
