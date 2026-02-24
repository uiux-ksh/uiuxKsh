'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import styles from './Projects.module.scss';

gsap.registerPlugin(ScrollTrigger);

// 프로젝트별 SVG 장식 패턴
const PROJECT_SVGS: Record<string, React.ReactNode> = {
  'didim-ai': (
    <>
      {/* 노드·엣지 워크플로우 느낌 */}
      <svg className={styles.deco1} width="200" height="200" viewBox="0 0 200 200">
        <circle cx="40" cy="40" r="8" fill="rgba(139,92,246,0.2)" />
        <circle cx="160" cy="60" r="8" fill="rgba(139,92,246,0.2)" />
        <circle cx="100" cy="160" r="8" fill="rgba(139,92,246,0.2)" />
        <line x1="48" y1="44" x2="152" y2="56" stroke="rgba(139,92,246,0.15)" strokeWidth="1.5" strokeDasharray="6 4" />
        <line x1="156" y1="68" x2="108" y2="152" stroke="rgba(139,92,246,0.15)" strokeWidth="1.5" strokeDasharray="6 4" />
        <line x1="92" y1="156" x2="44" y2="48" stroke="rgba(139,92,246,0.15)" strokeWidth="1.5" strokeDasharray="6 4" />
      </svg>
      <svg className={styles.deco2} width="120" height="120" viewBox="0 0 120 120">
        <rect x="10" y="10" width="40" height="30" rx="6" fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="1.5" />
        <rect x="70" y="80" width="40" height="30" rx="6" fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="1.5" />
        <path d="M50 25 Q80 25 80 80" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="1" />
      </svg>
    </>
  ),
  'dxvx-chat': (
    <>
      {/* 채팅 버블 + 하트비트 */}
      <svg className={styles.deco1} width="160" height="160" viewBox="0 0 160 160">
        <rect x="20" y="20" width="80" height="50" rx="12" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="1.5" />
        <polygon points="40,70 55,85 60,70" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="1.5" />
        <rect x="60" y="90" width="80" height="50" rx="12" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="1.5" />
      </svg>
      <svg className={styles.deco2} width="200" height="60" viewBox="0 0 200 60">
        <polyline points="0,30 30,30 40,10 50,50 60,20 70,40 80,30 200,30" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="1.5" />
      </svg>
    </>
  ),
  riot: (
    <>
      {/* 게임 컨트롤러 + 별 */}
      <svg className={styles.deco1} width="180" height="180" viewBox="0 0 180 180">
        <polygon points="90,10 115,70 180,80 130,125 145,180 90,150 35,180 50,125 0,80 65,70" fill="none" stroke="rgba(209,54,57,0.12)" strokeWidth="1.5" />
      </svg>
      <svg className={styles.deco2} width="100" height="100" viewBox="0 0 100 100">
        <polygon points="50,5 61,35 95,35 68,57 79,90 50,70 21,90 32,57 5,35 39,35" fill="rgba(209,54,57,0.06)" stroke="rgba(209,54,57,0.12)" strokeWidth="1" />
      </svg>
      <svg className={styles.deco3} width="60" height="60" viewBox="0 0 60 60">
        <rect x="5" y="20" width="50" height="25" rx="8" fill="none" stroke="rgba(209,54,57,0.1)" strokeWidth="1.5" />
        <circle cx="22" cy="32" r="6" fill="none" stroke="rgba(209,54,57,0.08)" strokeWidth="1" />
        <circle cx="42" cy="28" r="3" fill="rgba(209,54,57,0.1)" />
        <circle cx="42" cy="36" r="3" fill="rgba(209,54,57,0.1)" />
      </svg>
    </>
  ),
  smilegate: (
    <>
      {/* 카메라 + 러너 */}
      <svg className={styles.deco1} width="140" height="140" viewBox="0 0 140 140">
        <rect x="20" y="40" width="100" height="70" rx="10" fill="none" stroke="rgba(255,107,53,0.12)" strokeWidth="1.5" />
        <circle cx="70" cy="75" r="22" fill="none" stroke="rgba(255,107,53,0.15)" strokeWidth="1.5" />
        <circle cx="70" cy="75" r="12" fill="none" stroke="rgba(255,107,53,0.1)" strokeWidth="1" />
        <rect x="40" y="30" width="30" height="14" rx="4" fill="none" stroke="rgba(255,107,53,0.1)" strokeWidth="1" />
      </svg>
      <svg className={styles.deco2} width="80" height="80" viewBox="0 0 80 80">
        <path d="M20 70 L35 30 L40 45 L55 10 L60 35 L70 20" fill="none" stroke="rgba(255,107,53,0.1)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </>
  ),
  genesis: (
    <>
      {/* 럭셔리 다이아몬드 + 라인 */}
      <svg className={styles.deco1} width="160" height="160" viewBox="0 0 160 160">
        <polygon points="80,10 150,60 80,150 10,60" fill="none" stroke="rgba(176,141,87,0.15)" strokeWidth="1.5" />
        <polygon points="80,30 130,65 80,130 30,65" fill="none" stroke="rgba(176,141,87,0.1)" strokeWidth="1" />
      </svg>
      <svg className={styles.deco2} width="200" height="40" viewBox="0 0 200 40">
        <line x1="0" y1="20" x2="70" y2="20" stroke="rgba(176,141,87,0.1)" strokeWidth="1" />
        <circle cx="100" cy="20" r="8" fill="none" stroke="rgba(176,141,87,0.15)" strokeWidth="1" />
        <line x1="130" y1="20" x2="200" y2="20" stroke="rgba(176,141,87,0.1)" strokeWidth="1" />
      </svg>
    </>
  ),
  tida: (
    <>
      {/* 문구 + 연필 */}
      <svg className={styles.deco1} width="140" height="180" viewBox="0 0 140 180">
        <rect x="20" y="10" width="100" height="140" rx="4" fill="none" stroke="rgba(14,165,233,0.1)" strokeWidth="1.5" />
        <line x1="35" y1="40" x2="105" y2="40" stroke="rgba(14,165,233,0.08)" strokeWidth="1" />
        <line x1="35" y1="60" x2="90" y2="60" stroke="rgba(14,165,233,0.08)" strokeWidth="1" />
        <line x1="35" y1="80" x2="100" y2="80" stroke="rgba(14,165,233,0.08)" strokeWidth="1" />
        <line x1="35" y1="100" x2="75" y2="100" stroke="rgba(14,165,233,0.08)" strokeWidth="1" />
      </svg>
      <svg className={styles.deco2} width="30" height="120" viewBox="0 0 30 120">
        <rect x="8" y="0" width="14" height="90" rx="2" fill="none" stroke="rgba(14,165,233,0.12)" strokeWidth="1" />
        <polygon points="8,90 22,90 15,115" fill="none" stroke="rgba(14,165,233,0.12)" strokeWidth="1" />
      </svg>
    </>
  ),
};

const PROJECTS = [
  {
    id: 'didim-ai',
    title: '디딤 AI 스튜디오',
    subtitle: '디딤365 · 2025 — 현재',
    description:
      'LLM 기반 AI 오케스트레이션 플랫폼의 프론트엔드 전체를 담당. 시나리오·워크플로우 빌더를 React Flow로 구현하고, 지식관리(RAG) 시스템으로 문서 업로드부터 벡터 임베딩 자동 생성까지의 파이프라인을 실시간 SSE로 모니터링합니다.',
    highlights: [
      'React Flow 기반 노드·엣지 시각적 워크플로우 빌더',
      '문서 → 청킹 → 벡터 임베딩 자동화 파이프라인',
      'WebSocket 기반 AI 챗봇 실시간 스트리밍 UI',
      'MCP 연동 — Google, YouTube 등 외부 서비스 통합',
      '보고서용 데이터 시각화 차트 MCP 개발',
    ],
    image: '/images/didim-ai.png',
    bgColor: '#0f0a1a',
    accentColor: '#8b5cf6',
    tags: ['Next.js', 'React Flow', 'WebSocket', 'SSE', 'React Query', 'Zustand', 'TypeScript'],
  },
  {
    id: 'dxvx-chat',
    title: 'AI 의료 챗봇 · CLIDEX',
    subtitle: 'DX&VX (한미약품 자회사) · 2024',
    description:
      '헬스케어 AI 솔루션 기업에서 의료 AI 챗봇과 비대면 심리상담 플랫폼, 유전체 데이터 시각화 사이트를 개발했습니다. SSE 기반 실시간 스트리밍 채팅과 Browser API를 활용한 상담 UX가 핵심.',
    highlights: [
      'SSE 기반 실시간 AI 의료 챗봇 프론트엔드',
      '비대면 심리상담 플랫폼 — 카메라·마이크 Browser API',
      'CLIDEX 유전체 데이터 분포 차트 시각화',
      'Next.js + React Query + Zustand 상태관리 아키텍처',
    ],
    image: '/images/dxvx.png',
    bgColor: '#05140e',
    accentColor: '#10b981',
    tags: ['Next.js', 'React Query', 'Zustand', 'SSE', 'Chart.js', 'TypeScript'],
  },
  {
    id: 'riot',
    title: '라이엇 게임즈 이벤트',
    subtitle: '일공이사 · 2022—2023',
    description:
      'Riot Games 공식 게임 이벤트 페이지를 다수 개발했습니다. 허니 토큰, 스타 가디언 등 수백만 유저가 참여하는 대규모 프로모션 페이지에서 높은 트래픽과 다양한 브라우저 환경을 고려한 크로스 브라우저 대응이 핵심이었습니다.',
    highlights: [
      '허니 토큰, 스타 가디언 등 대규모 이벤트 페이지',
      'GSAP 스크롤 애니메이션 · 인터랙티브 UI',
      '아토믹 디자인 패턴 컴포넌트 아키텍처',
      'Figma 디자인 → 픽셀 퍼펙트 구현',
    ],
    image: '/images/riot_1.jpg',
    bgColor: '#1a0808',
    accentColor: '#d13639',
    tags: ['Next.js', 'React', 'GSAP', 'Atomic Design', 'Zustand', 'Sass'],
  },
  {
    id: 'smilegate',
    title: '스마일게이트 테일즈런너',
    subtitle: '일공이사 · 2023',
    description:
      '테일즈런너 러너스 클로젯 이벤트 시리즈 — 포토 이벤트, 옷장 꾸미기, IVOD 등 게임 팬들을 위한 인터랙티브 웹 이벤트를 시리즈로 개발. Canvas API를 활용한 이미지 합성 기능이 포함되었습니다.',
    highlights: [
      '러너스 클로젯 포토 이벤트 — 이미지 합성 기능',
      'Canvas API 기반 커스텀 이미지 에디터',
      '게임 캐릭터 착장 시뮬레이터',
      '시리즈 이벤트 공통 컴포넌트 설계',
    ],
    image: 'https://smailgate-photo.vercel.app/assets/images/section1/section1.png',
    bgColor: '#1a0f05',
    accentColor: '#ff6b35',
    tags: ['React', 'GSAP', 'Canvas API', 'Sass'],
    link: 'https://smailgate-photo.vercel.app/',
  },
  {
    id: 'genesis',
    title: '제네시스 수지 스페이스',
    subtitle: '일공이사 · 2022',
    description:
      '현대자동차 제네시스 수지 스페이스 공식 소개 페이지. 럭셔리 브랜드 아이덴티티에 맞는 정교한 스크롤 트리거 애니메이션과 풀스크린 이미지 시퀀스로 몰입감 있는 공간 소개 경험을 구현했습니다.',
    highlights: [
      'ScrollTrigger 기반 정교한 스크롤 애니메이션',
      '풀스크린 이미지 시퀀스 전환',
      '럭셔리 브랜드 톤앤매너 구현',
      '제네시스 공식 사이트 라이브 배포',
    ],
    image: '/images/car.jpg',
    bgColor: '#0f0c06',
    accentColor: '#b08d57',
    tags: ['Next.js', 'GSAP', 'ScrollTrigger', 'Sass'],
    link: 'https://www.genesis.com/kr/ko/experience/space/genesis-suji.html',
  },
  {
    id: 'tida',
    title: 'SKT 티다문구점',
    subtitle: '일공이사 · 2022',
    description:
      'SKT T Direct Shop 프로모션 페이지. 문구점 콘셉트의 감각적인 UI/UX로 SKT 고객 대상 프로모션 상품을 소개합니다. 스크롤 기반 상품 노출과 장바구니 연동까지 E-commerce적인 요소도 포함.',
    highlights: [
      '문구점 콘셉트의 브랜디드 UI 구현',
      '스크롤 기반 상품 노출 시스템',
      'Zustand 전역 상태관리 적용',
      'SKT 공식 프로모션 라이브 배포',
    ],
    image: '/images/tida.jpg',
    bgColor: '#041520',
    accentColor: '#0ea5e9',
    tags: ['Next.js', 'Zustand', 'Sass'],
    link: 'https://www.tidamungu.co.kr/',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(`.${styles.panel}`) as HTMLElement[];

      panels.forEach((panel) => {
        // 각 패널 콘텐츠 등장
        const image = panel.querySelector(`.${styles.imageWrapper}`);
        const info = panel.querySelector(`.${styles.info}`);
        const decos = panel.querySelectorAll(`.${styles.deco1}, .${styles.deco2}, .${styles.deco3}`);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });

        if (image) {
          tl.from(image, { x: -80, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0);
        }
        if (info) {
          tl.from(info, { x: 80, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
        }

        // 데코 SVG 부유
        decos.forEach((deco) => {
          gsap.to(deco, {
            y: 'random(-20, 20)',
            x: 'random(-10, 10)',
            rotation: 'random(-8, 8)',
            duration: 'random(3, 5)',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className={styles.sectionHeader}>
        <span className={styles.label}>PROJECTS</span>
        <h2 className={styles.sectionTitle}>프로젝트</h2>
      </div>

      {PROJECTS.map((project, index) => (
        <section
          key={project.id}
          className={styles.panel}
          style={{ background: project.bgColor }}
        >
          {/* 프로젝트별 SVG 장식 */}
          <div className={styles.decoContainer}>
            {PROJECT_SVGS[project.id]}
          </div>

          {/* 배경 글로우 */}
          <div
            className={styles.panelGlow}
            style={{
              background: `radial-gradient(ellipse at ${index % 2 === 0 ? '30%' : '70%'} 50%, ${project.accentColor}18, transparent 60%)`,
            }}
          />

          <div className={styles.panelInner}>
            <div className={styles.imageWrapper}>
              <span className={styles.projectIndex}>{String(index + 1).padStart(2, '0')}</span>
              <div className={styles.imageFrame} style={{ borderColor: `${project.accentColor}33` }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={560}
                  height={360}
                  className={styles.projectImage}
                />
              </div>
            </div>

            <div className={styles.info}>
              <span className={styles.projectSubtitle} style={{ color: project.accentColor }}>
                {project.subtitle}
              </span>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.highlightSection}>
                <h4 className={styles.highlightTitle}>주요 성과</h4>
                <ul className={styles.highlightList}>
                  {project.highlights.map((h, i) => (
                    <li key={i} style={{ color: `${project.accentColor}cc` }}>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.techSection}>
                <h4 className={styles.techTitle}>기술 스택</h4>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={styles.tag}
                      style={{ borderColor: `${project.accentColor}44`, color: project.accentColor }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                  style={{ background: project.accentColor }}
                >
                  라이브 사이트 보기 &rarr;
                </a>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
