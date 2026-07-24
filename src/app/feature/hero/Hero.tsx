'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.scss';

gsap.registerPlugin(ScrollTrigger);

const FLOATING_KEYWORDS = [
  { text: 'AI', x: '8%', y: '15%', size: 'lg', color: '#8b5cf6' },
  { text: 'CHAT', x: '78%', y: '12%', size: 'md', color: '#10b981' },
  { text: 'FLOW', x: '85%', y: '45%', size: 'lg', color: '#f59e0b' },
  { text: 'AGENT', x: '5%', y: '55%', size: 'md', color: '#ef4444' },
  { text: 'RAG', x: '88%', y: '72%', size: 'sm', color: '#06b6d4' },
  { text: 'React', x: '12%', y: '35%', size: 'sm', color: '#61dafb' },
  { text: 'Next.js', x: '75%', y: '28%', size: 'sm', color: '#ffffff' },
  { text: 'TypeScript', x: '82%', y: '58%', size: 'sm', color: '#3178c6' },
  { text: 'GSAP', x: '6%', y: '75%', size: 'sm', color: '#88ce02' },
  { text: 'WebSocket', x: '18%', y: '85%', size: 'sm', color: '#8b5cf6' },
  { text: 'SSE', x: '72%', y: '82%', size: 'sm', color: '#f97316' },
  { text: 'MCP', x: '25%', y: '18%', size: 'md', color: '#a855f7' },
  { text: 'LLM', x: '65%', y: '68%', size: 'md', color: '#ec4899' },
  { text: 'Zustand', x: '90%', y: '30%', size: 'sm', color: '#764abc' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 플로팅 키워드 배지 애니메이션
      gsap.utils.toArray(`.${styles.keywordBadge}`).forEach((el) => {
        const elem = el as HTMLElement;
        const speed = parseFloat(elem.dataset.speed || '1');
        gsap.to(elem, {
          y: `random(${-25 * speed}, ${25 * speed})`,
          x: `random(${-15 * speed}, ${15 * speed})`,
          rotation: `random(-8, 8)`,
          duration: `random(${3 / speed}, ${6 / speed})`,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // 등장 애니메이션
        gsap.from(elem, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(2)',
          delay: 0.8 + Math.random() * 1.2,
        });
      });

      // 3D 큐브 회전 애니메이션
      gsap.utils.toArray(`.${styles.cube}`).forEach((el) => {
        const elem = el as HTMLElement;
        gsap.to(elem, {
          rotateY: 360,
          rotateX: 'random(-20, 20)',
          duration: 'random(8, 14)',
          ease: 'none',
          repeat: -1,
        });
        gsap.to(elem, {
          y: 'random(-30, 30)',
          x: 'random(-10, 10)',
          duration: 'random(4, 7)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
        gsap.from(elem, {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(2)',
          delay: 0.5 + Math.random() * 1,
        });
      });

      // 배경 기하학 SVG 부유
      gsap.utils.toArray(`.${styles.floatingSvg}`).forEach((el) => {
        const elem = el as HTMLElement;
        gsap.to(elem, {
          y: 'random(-40, 40)',
          x: 'random(-20, 20)',
          rotation: 'random(-15, 15)',
          duration: 'random(3, 6)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      // 타이틀 등장
      const titleLines = titleRef.current?.querySelectorAll('.title-line');
      if (titleLines) {
        gsap.from(titleLines, {
          y: 80,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power4.out',
          delay: 0.3,
        });
      }

      // 소개 텍스트 등장
      gsap.from(introRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1,
      });

      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 1,
        delay: 2,
      });

      // 스크롤 패럴렉스
      gsap.to(titleRef.current, {
        y: -200,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.bgGrid} />
      <div className={styles.bgGlow} />

      {/* 배경 기하학 SVG */}
      <svg className={`${styles.floatingSvg} ${styles.svgCircle1}`} width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(143,148,251,0.1)" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
      <svg className={`${styles.floatingSvg} ${styles.svgTriangle}`} width="40" height="40" viewBox="0 0 40 40">
        <polygon points="20,4 38,36 2,36" fill="none" stroke="rgba(143,148,251,0.08)" strokeWidth="1" />
      </svg>
      <svg className={`${styles.floatingSvg} ${styles.svgHex}`} width="50" height="50" viewBox="0 0 50 50">
        <polygon points="25,2 46,14 46,36 25,48 4,36 4,14" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="1" />
      </svg>

      {/* 플로팅 키워드 배지 */}
      {FLOATING_KEYWORDS.map((kw) => (
        <div
          key={kw.text}
          className={`${styles.keywordBadge} ${styles[`badge_${kw.size}`]}`}
          style={{
            left: kw.x,
            top: kw.y,
            '--badge-color': kw.color,
          } as React.CSSProperties}
          data-speed={kw.size === 'lg' ? '0.8' : kw.size === 'md' ? '1' : '1.3'}
        >
          <span className={styles.badgeText}>{kw.text}</span>
        </div>
      ))}

      {/* 3D 큐브 */}
      <div className={styles.cube} style={{ left: '15%', top: '22%' }}>
        <div className={styles.cubeFace} style={{ '--face-color': 'rgba(139,92,246,0.15)' } as React.CSSProperties} />
        <div className={styles.cubeFace} style={{ '--face-color': 'rgba(139,92,246,0.1)' } as React.CSSProperties} />
        <div className={styles.cubeFace} style={{ '--face-color': 'rgba(139,92,246,0.08)' } as React.CSSProperties} />
      </div>
      <div className={styles.cube} style={{ right: '10%', top: '60%' }}>
        <div className={styles.cubeFace} style={{ '--face-color': 'rgba(16,185,129,0.15)' } as React.CSSProperties} />
        <div className={styles.cubeFace} style={{ '--face-color': 'rgba(16,185,129,0.1)' } as React.CSSProperties} />
        <div className={styles.cubeFace} style={{ '--face-color': 'rgba(16,185,129,0.08)' } as React.CSSProperties} />
      </div>
      <div className={styles.cube} style={{ left: '70%', top: '15%' }}>
        <div className={styles.cubeFace} style={{ '--face-color': 'rgba(245,158,11,0.15)' } as React.CSSProperties} />
        <div className={styles.cubeFace} style={{ '--face-color': 'rgba(245,158,11,0.1)' } as React.CSSProperties} />
        <div className={styles.cubeFace} style={{ '--face-color': 'rgba(245,158,11,0.08)' } as React.CSSProperties} />
      </div>

      <div className={styles.content}>
        <p className={styles.label}>Frontend Developer &middot; 5+ Years</p>
        <h1 ref={titleRef} className={styles.title}>
          <span className="title-line" style={{ display: 'block' }}>
            <span className={styles.greeting}>안녕하세요</span>
          </span>
          <span className="title-line" style={{ display: 'block' }}>
            <span className={styles.nameHighlight}>김성훈</span>
            <span className={styles.nameSuffix}>입니다</span>
          </span>
        </h1>

        <div ref={introRef} className={styles.intro}>
          <p className={styles.introMain}>
            사용자가 &ldquo;와&rdquo; 하는 순간을 만드는 개발자
          </p>
          <p className={styles.introSub}>
            AI 오케스트레이션 플랫폼부터 라이엇 게임즈 이벤트까지,
            <br />
            복잡한 기술을 직관적인 인터페이스로 풀어냅니다.
            <br />
            React Flow, WebSocket, SSE — 실시간 데이터가 흐르는
            <br />
            인터랙티브 웹을 설계합니다.
          </p>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>SCROLL</span>
      </div>
    </section>
  );
}
