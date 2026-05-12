'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.scss';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // prefers-reduced-motion 체크 — JS 애니메이션도 비활성화
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const shapes = shapesRef.current?.querySelectorAll(`.${styles.shape}`);
      const intro = `.${styles.eyebrow}, .${styles.headline}, .${styles.subtitle}`;
      const cards = `.${styles.contactCard}`;

      // reduced-motion: 최종 상태만 적용하고 종료
      if (reduceMotion) {
        if (shapes) gsap.set(shapes, { autoAlpha: 1, y: 0, rotation: 0 });
        gsap.set([intro, cards], { autoAlpha: 1, y: 0 });
        return;
      }

      // FOUC 차단 — 트리거 발화 전까지 비가시
      if (shapes && shapes.length > 0) gsap.set(shapes, { autoAlpha: 0 });
      gsap.set([intro, cards], { autoAlpha: 0 });

      // 도형: 위에서 떨어지며 bounce 착지 → onComplete 에서 idle 부유 시작
      if (shapes && shapes.length > 0) {
        gsap.set(shapes, { transformOrigin: '50% 50%' });
        gsap.fromTo(
          shapes,
          {
            y: () => -window.innerHeight * 0.8,
            autoAlpha: 0,
            rotation: () => gsap.utils.random(-220, 220),
          },
          {
            y: 0,
            autoAlpha: 1,
            rotation: 0,
            stagger: { each: 0.1, from: 'random' },
            duration: 1.6,
            ease: 'bounce.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
            onComplete: () => {
              // ctx.add 로 감싸야 비동기 생성 트윈도 context 에 등록되어 언마운트 시 정리됨
              ctx.add(() => {
                shapes.forEach((el, i) => {
                  gsap.to(el, {
                    y: '+=10',
                    duration: 2 + (i % 3) * 0.4,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                  });
                });
              });
            },
          }
        );
      }

      // 헤드라인 — 도형과 같은 트리거(70%) 에서 살짝 delay
      gsap.fromTo(
        intro,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // 정보 카드
      gsap.fromTo(
        cards,
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.contact}>
      <div className={styles.bgGlow} />

      {/* 위에서 떨어지는 장식 도형 */}
      <div ref={shapesRef} className={styles.shapes} aria-hidden='true'>
        <span className={`${styles.shape} ${styles.shapeCircle}`} style={{ left: '8%', top: '14%' }} />
        <span className={`${styles.shape} ${styles.shapeRing}`} style={{ left: '22%', top: '38%' }} />
        <span className={`${styles.shape} ${styles.shapeSquare}`} style={{ left: '78%', top: '18%' }} />
        <span className={`${styles.shape} ${styles.shapeTriangle}`} style={{ left: '88%', top: '52%' }} />
        <span className={`${styles.shape} ${styles.shapeDot}`} style={{ left: '6%', top: '62%' }} />
        <span className={`${styles.shape} ${styles.shapeCross}`} style={{ left: '92%', top: '70%' }} />
        <span className={`${styles.shape} ${styles.shapeBlob}`} style={{ left: '45%', top: '8%' }} />
        <span className={`${styles.shape} ${styles.shapeRingSm}`} style={{ left: '70%', top: '40%' }} />
      </div>

      <div className={styles.inner}>
        <p className={styles.eyebrow}>GET IN TOUCH</p>
        <h2 className={styles.headline}>
          Let&apos;s build <br />
          something <span className={styles.highlight}>together</span>.
        </h2>
        <p className={styles.subtitle}>
          새로운 프로젝트, 협업, 또는 그냥 인사 — 언제든 환영합니다.
        </p>

        <div className={styles.contactGrid}>
          <a href='mailto:uiux-ksh@naver.com' className={styles.contactCard}>
            <span className={styles.cardLabel}>Email</span>
            <span className={styles.cardValue}>uiux-ksh@naver.com</span>
          </a>
          <a href='tel:010-3679-5721' className={styles.contactCard}>
            <span className={styles.cardLabel}>Phone</span>
            <span className={styles.cardValue}>010-3679-5721</span>
          </a>
          <a
            href='https://github.com/uiux-ksh'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.contactCard}
          >
            <span className={styles.cardLabel}>GitHub</span>
            <span className={styles.cardValue}>github.com/uiux-ksh</span>
          </a>
          <a
            href='https://uiux-ksh.tistory.com'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.contactCard}
          >
            <span className={styles.cardLabel}>Blog</span>
            <span className={styles.cardValue}>uiux-ksh.tistory.com</span>
          </a>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2025 김성훈. All rights reserved.</p>
      </footer>
    </section>
  );
}
