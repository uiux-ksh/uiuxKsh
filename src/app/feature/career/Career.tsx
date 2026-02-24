'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import styles from './Career.module.scss';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const CAREERS = [
  {
    id: 'didim',
    period: '2025.02 — 현재',
    company: '디딤365',
    role: '주임 · Frontend Developer',
    color: '#8b5cf6',
    description: 'AI 오케스트레이션 플랫폼 개발',
    details: [
      'LLM 기반 시나리오·워크플로우 관리 시스템 (React Flow 노드·엣지 시각화)',
      '지식관리 시스템 — 문서 업로드 → 벡터 임베딩 자동 생성 → RAG 연동',
      '모델/페르소나/도구 관리 페이지 및 MCP 연동 (Google, YouTube 등)',
      '보고서용 차트 MCP 개발 (데이터 시각화 모듈)',
      'AI 챗봇 프론트엔드 — WebSocket 기반 실시간 대화 UI',
    ],
    tech: ['Next.js', 'React Query', 'Zustand', 'React Flow', 'WebSocket', 'SSE', 'TypeScript'],
  },
  {
    id: 'dxvx',
    period: '2024.06 — 2025.01',
    company: 'DX&VX',
    role: '사원 · Frontend Developer',
    color: '#10b981',
    description: '한미약품 자회사 — 헬스케어 AI 솔루션',
    details: [
      'AI 의료 챗봇 프론트엔드 — SSE 기반 실시간 채팅 시스템',
      '비대면 심리상담 플랫폼 — Browser API 활용 상담 UX',
      '유전체 데이터 사이트 CLIDEX — 분포 차트 시각화',
      'Next.js + React Query + Zustand 상태관리 최적화',
    ],
    tech: ['Next.js', 'React Query', 'Zustand', 'SSE', 'Chart.js', 'TypeScript'],
  },
  {
    id: 'ilgong',
    period: '2022.04 — 2023.11',
    company: '일공이사',
    role: '사원 · Frontend Developer',
    color: '#d13639',
    description: '디지털 에이전시 — 대기업 프로모션·웹 개발',
    details: [
      '라이엇 게임즈 — 게임 이벤트 페이지 다수 개발',
      '스마일게이트 — 테일즈런너 이벤트 시리즈',
      'SKT 티다문구점 — 프로모션 페이지',
      '현대차 제네시스 수지 — 스페이스 소개 페이지',
      'Figma 기반 UI → 아토믹 디자인 패턴 컴포넌트 구현',
    ],
    tech: ['Next.js', 'React', 'Zustand', 'GSAP', 'Sass', 'Figma'],
  },
  {
    id: 'suyeoun',
    period: '2021.03 — 2022.03',
    company: '수줍은연구소',
    role: '사원 · Frontend Developer',
    color: '#0ea5e9',
    description: '이커머스 솔루션 개발',
    details: [
      '쇼핑몰 장바구니 기능 개발',
      '쇼핑몰 레이아웃·퍼블리싱',
      'API 연동 및 상품 데이터 바인딩',
    ],
    tech: ['React', 'JavaScript', 'HTML/CSS', 'REST API'],
  },
];

export default function Career() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 배경 SVG 부유 애니메이션
      gsap.utils.toArray(`.${styles.bgSvg}`).forEach((el) => {
        const elem = el as HTMLElement;
        gsap.to(elem, {
          y: 'random(-30, 30)',
          x: 'random(-15, 15)',
          rotation: 'random(-10, 10)',
          duration: 'random(4, 7)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      // 섹션 타이틀 등장
      gsap.from(`.${styles.sectionTitle}`, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      // 종이비행기가 큰 S자 커브로 타임라인을 따라 내려옴
      if (planeRef.current) {
        gsap.set(planeRef.current, { xPercent: -50, yPercent: -50 });
        gsap.to(planeRef.current, {
          motionPath: {
            path: '#planePath',
            align: '#planePath',
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 50%',
            end: 'bottom 30%',
            scrub: 1.5,
          },
        });
      }

      // 타임라인 라인 그리기
      gsap.from(`.${styles.timelineLine}`, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 60%',
        },
      });

      // 카드 등장
      const cards = gsap.utils.toArray(`.${styles.card}`) as HTMLElement[];
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.from(card, {
          x: isLeft ? -100 : 100,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // dot 펄스
      gsap.utils.toArray(`.${styles.timelineDot}`).forEach((dot) => {
        gsap.from(dot as HTMLElement, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(3)',
          scrollTrigger: {
            trigger: dot as HTMLElement,
            start: 'top 72%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.career}>
      {/* 배경 SVG 장식 */}
      <svg className={`${styles.bgSvg} ${styles.bg1}`} width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(139,92,246,0.08)" strokeWidth="1" strokeDasharray="10 8" />
        <circle cx="70" cy="70" r="35" fill="none" stroke="rgba(139,92,246,0.06)" strokeWidth="1" />
      </svg>
      <svg className={`${styles.bgSvg} ${styles.bg2}`} width="80" height="80" viewBox="0 0 80 80">
        <rect x="10" y="10" width="60" height="60" rx="8" fill="none" stroke="rgba(16,185,129,0.08)" strokeWidth="1" transform="rotate(15 40 40)" />
      </svg>
      <svg className={`${styles.bgSvg} ${styles.bg3}`} width="60" height="60" viewBox="0 0 60 60">
        <polygon points="30,5 55,50 5,50" fill="none" stroke="rgba(209,54,57,0.08)" strokeWidth="1" />
      </svg>
      <svg className={`${styles.bgSvg} ${styles.bg4}`} width="100" height="100" viewBox="0 0 100 100">
        <path d="M10 50 Q30 10 50 50 Q70 90 90 50" fill="none" stroke="rgba(14,165,233,0.08)" strokeWidth="1.5" />
      </svg>
      <svg className={`${styles.bgSvg} ${styles.bg5}`} width="120" height="40" viewBox="0 0 120 40">
        {[0, 20, 40, 60, 80, 100].map((x) => (
          <circle key={x} cx={x + 10} cy="20" r="4" fill={`rgba(143,148,251,${0.05 + (x / 600)})`} />
        ))}
      </svg>
      <svg className={`${styles.bgSvg} ${styles.bg6}`} width="50" height="50" viewBox="0 0 50 50">
        <line x1="25" y1="5" x2="25" y2="45" stroke="rgba(143,148,251,0.06)" strokeWidth="1.5" />
        <line x1="5" y1="25" x2="45" y2="25" stroke="rgba(143,148,251,0.06)" strokeWidth="1.5" />
      </svg>

      <div className={styles.header}>
        <span className={styles.label}>CAREER</span>
        <h2 className={styles.sectionTitle}>경력 사항</h2>
      </div>

      <div ref={timelineRef} className={styles.timeline}>
        <div className={styles.timelineLine} />

        {/* 종이비행기 S자 커브 경로 SVG — 넓은 좌우 진폭 */}
        <svg className={styles.planePathSvg} viewBox="0 0 400 1000" preserveAspectRatio="none">
          <path
            id="planePath"
            d={
              'M200,0 ' +
              'C320,80 80,180 200,260 ' +
              'C320,340 80,440 200,520 ' +
              'C320,600 80,700 200,780 ' +
              'C280,860 200,940 200,1000'
            }
            fill="none"
            stroke="rgba(143,148,251,0.12)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
          />
        </svg>

        {/* 종이비행기 — 더 크게 */}
        <svg
          ref={planeRef}
          className={styles.plane}
          width="52"
          height="52"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M22 2L11 13"
            stroke="rgba(143,148,251,0.9)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M22 2L15 22L11 13L2 9L22 2Z"
            fill="rgba(143,148,251,0.35)"
            stroke="rgba(143,148,251,0.9)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {CAREERS.map((career, index) => (
          <div
            key={career.id}
            className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
          >
            <div className={styles.timelineDot} style={{ background: career.color, boxShadow: `0 0 12px ${career.color}44` }} />
            <div className={styles.card}>
              <div className={styles.cardAccent} style={{ background: career.color }} />
              <div className={styles.cardHeader}>
                <span className={styles.period}>{career.period}</span>
                <h3 className={styles.company}>{career.company}</h3>
                <span className={styles.role}>{career.role}</span>
              </div>
              <p className={styles.cardDescription}>{career.description}</p>
              <ul className={styles.detailList}>
                {career.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
              <div className={styles.techTags}>
                {career.tech.map((t) => (
                  <span key={t} className={styles.tag} style={{ borderColor: `${career.color}66`, color: career.color }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
