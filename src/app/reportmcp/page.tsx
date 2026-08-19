'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  CREATE_IFRAME_URL,
  GUIDE_INTRO,
  GUIDE_SECTIONS,
  type GuideSection,
} from './guideData';
import { Block, GuideImage } from './GuideBlocks';
import styles from './page.module.scss';

/**
 * /reportmcp — 디딤365 ReportMCP 템플릿 에디터 소개 페이지.
 *
 * 포트폴리오 안에서 실무 결과물을 보여주는 구성:
 *  ① 라이브 데모 — 실제 서비스의 템플릿 생성 화면을 iframe 으로 임베드
 *     (guide=1 쿼리로 생성 버튼이 막힌 가이드 모드)
 *  ② 기능 가이드 카드 — 스크린샷 + 요약. [상세보기] 를 누르면
 *     해당 기능 설명이 블로그 글 형태 오버레이로 열린다.
 *
 * 보고서 모니터링(PostHog) 소개는 /reportmcp/monitoring 별도 페이지에서
 * 블로그 상세 글 형태로 보여준다.
 */

/** 썸네일 + 요약 카드 그리드. 카드를 누르면 해당 섹션 상세 오버레이가 열린다 */
function CardGrid({
  sections,
  onOpen,
}: {
  sections: GuideSection[];
  onOpen: (id: string) => void;
}) {
  return (
    <div className={styles.cardGrid}>
      {sections.map((s) => (
        <article key={s.id} className={styles.card}>
          <button
            type="button"
            className={styles.cardHit}
            onClick={() => onOpen(s.id)}
            aria-label={`${s.title} 상세보기`}
          >
            <div className={styles.cardThumb}>
              {s.thumb && <GuideImage name={s.thumb} thumb />}
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>
                {s.title}
                {s.badge && <span className={styles.badge}>{s.badge}</span>}
              </h3>
              <p className={styles.cardSummary}>{s.summary}</p>
              <span className={styles.cardMore}>상세보기 →</span>
            </div>
          </button>
        </article>
      ))}
    </div>
  );
}

export default function ReportMcpPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  // 원본(100%) 크기로 확대해 보는 이미지 src. null 이면 닫힘.
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  const openIndex = useMemo(
    () => GUIDE_SECTIONS.findIndex((s) => s.id === openId),
    [openId],
  );
  const open = openIndex >= 0 ? GUIDE_SECTIONS[openIndex] : null;

  const close = useCallback(() => {
    setOpenId(null);
    setZoomSrc(null);
  }, []);

  // 아티클이 열려 있는 동안 Esc 로 닫기 + 배경 스크롤 잠금.
  // 확대 뷰어가 떠 있으면 Esc 는 뷰어만 먼저 닫는다.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setZoomSrc((z) => {
        if (z) return null; // 뷰어만 닫고 아티클은 유지
        close();
        return z;
      });
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <main className={styles.page}>
      {/* ---------------------------------------------------------- hero */}
      <header className={styles.hero}>
        <Link href="/" className={styles.backLink}>
          ← Portfolio
        </Link>
        <span className={styles.heroLabel}>DIDIM365 · REPORTMCP</span>
        <h1 className={styles.heroTitle}>
          ReportMCP <em>템플릿 에디터</em>
        </h1>
        <p className={styles.heroDesc}>
          데이터 유무에 따라 보고서 내용이 자동으로 바뀌는 <b>프롬프트 기반 템플릿</b>{' '}
          시스템. Tiptap 기반 웹 에디터와 실시간 PDF 미리보기 파이프라인을 직접
          설계·구현했습니다.
        </p>
        <p className={styles.heroSub}>{GUIDE_INTRO}</p>
      </header>

      {/* ---------------------------------------------------------- live demo */}
      <section className={styles.demo} aria-label="라이브 데모">
        <div className={styles.demoHead}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.dot} /> 라이브 데모 — 템플릿 생성 화면
          </h2>
          <p className={styles.demoDesc}>
            실제 서비스의 생성 화면입니다. 편집기와 PDF 미리보기를 자유롭게 사용해
            보세요. <b>가이드 모드라 생성 버튼은 비활성화</b>되어 있어 실제 템플릿은
            만들어지지 않습니다.
            <a
              className={styles.newTab}
              href={CREATE_IFRAME_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              새 창에서 열기 ↗
            </a>
          </p>
        </div>
        <div className={styles.frameShell}>
          <div className={styles.frameBar}>
            <span />
            <span />
            <span />
            <em>aiops.didim.com/report/templates/create/guide</em>
          </div>
          <iframe
            className={styles.frame}
            src={CREATE_IFRAME_URL}
            title="ReportMCP 템플릿 생성 화면"
            loading="lazy"
          />
        </div>
      </section>

      {/* ---------------------------------------------------------- guide cards */}
      <section className={styles.guide} aria-label="기능 가이드">
        <h2 className={styles.sectionTitle}>
          <span className={styles.dot} /> 기능 가이드
        </h2>
        <p className={styles.guideDesc}>
          카드를 누르면 각 기능의 상세 설명을 블로그 글 형태로 볼 수 있습니다.
        </p>

        <CardGrid sections={GUIDE_SECTIONS} onOpen={setOpenId} />
      </section>

      {/* ---------------------------------------------------------- article overlay */}
      {open && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className={styles.sheet}>
            <div className={styles.sheetBar}>
              <span className={styles.sheetLabel}>ReportMCP 템플릿 작성 가이드</span>
              <button type="button" className={styles.btnClose} onClick={close} aria-label="닫기">
                ✕
              </button>
            </div>

            <article key={open.id} className={styles.article}>
              <header className={styles.articleHead}>
                {open.badge && <span className={styles.badgeLarge}>{open.badge}</span>}
                <h1>{open.title}</h1>
                <p className={styles.articleSub}>{open.summary}</p>
              </header>

              <div className={styles.articleBody}>
                {open.blocks.map((b, i) => (
                  <Block key={i} block={b} onZoom={setZoomSrc} />
                ))}
              </div>

              <footer className={styles.articleNav}>
                <button
                  type="button"
                  disabled={openIndex <= 0}
                  onClick={() => setOpenId(GUIDE_SECTIONS[openIndex - 1]?.id ?? null)}
                >
                  ← {GUIDE_SECTIONS[openIndex - 1]?.title ?? '이전'}
                </button>
                <button
                  type="button"
                  disabled={openIndex >= GUIDE_SECTIONS.length - 1}
                  onClick={() => setOpenId(GUIDE_SECTIONS[openIndex + 1]?.id ?? null)}
                >
                  {GUIDE_SECTIONS[openIndex + 1]?.title ?? '다음'} →
                </button>
              </footer>
            </article>
          </div>
        </div>
      )}

      {/* ------------------------------------------------- 이미지 100% 확대 뷰어 */}
      {zoomSrc && (
        <div
          className={styles.zoomOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="이미지 원본 크기 보기"
          onClick={() => setZoomSrc(null)}
        >
          <div className={styles.zoomBar}>
            <span>원본 크기 (100%) · 클릭하면 닫힙니다</span>
            <button
              type="button"
              className={styles.btnClose}
              onClick={() => setZoomSrc(null)}
              aria-label="닫기"
            >
              ✕
            </button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- 원본 픽셀 그대로 보여주는 뷰어 */}
          <img className={styles.zoomImg} src={zoomSrc} alt="확대 이미지" />
        </div>
      )}
    </main>
  );
}
