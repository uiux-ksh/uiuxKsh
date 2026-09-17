'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  TEMPLATE_IFRAME_URL,
  DETAIL_IFRAME_URL,
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
 *  ① 라이브 데모 — 실제 서비스 화면 2개를 iframe 으로 임베드.
 *     STEP 1 템플릿 편집 화면(수정 가능) → STEP 2 그 템플릿으로 생성된 보고서.
 *     둘 다 guide 모드라 저장·생성 버튼은 막혀 있다.
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
            <span className={styles.dot} /> 라이브 데모 — 템플릿을 쓰면 보고서가 나온다
          </h2>
          <p className={styles.demoDesc}>
            아래 두 화면은 <b>포트폴리오용으로 제가 따로 구축한 개발 테스트 서버</b>입니다.
            운영 서버가 아니라 실제 고객 데이터도 들어 있지 않으니, 마음껏 눌러보고
            수정하셔도 괜찮습니다. 위는 규칙을 작성하는 템플릿 편집 화면, 아래는 그
            템플릿으로 생성된 보고서입니다. 위에 적어둔 대로 아래 결과가 만들어집니다.
          </p>
        </div>

        {/* STEP 1 — 템플릿 편집 화면 */}
        <div className={styles.step}>
          <div className={styles.stepHead}>
            <span className={styles.stepNum}>STEP 1</span>
            <div className={styles.stepText}>
              <h3 className={styles.stepTitle}>템플릿 화면 — 여기서 수정합니다</h3>
              <p className={styles.stepDesc}>
                보고서에 들어갈 내용을 <b>프롬프트 규칙</b>으로 적어두는 편집
                화면입니다. &ldquo;데이터가 있으면 표를 출력하고, 없으면 안내 문구를
                출력하라&rdquo; 같은 조건을 문장으로 작성해 두면, 생성 시점에 데이터를
                보고 알아서 분기합니다. 편집기와 PDF 미리보기를 직접 만져보세요 —{' '}
                <b>운영 서버가 아니라 제가 새로 구축한 개발 테스트 서버의 79번 템플릿</b>
                이라 내용을 바꾸거나 저장하셔도 아무 문제 없습니다.
              </p>
            </div>
            <a
              className={styles.newTab}
              href={TEMPLATE_IFRAME_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              새 창에서 열기 ↗
            </a>
          </div>
          <div className={styles.frameShell}>
            <div className={styles.frameBar}>
              <span />
              <span />
              <span />
              <em>aiops.didim.com/report/templates/79</em>
            </div>
            <iframe
              className={styles.frame}
              src={TEMPLATE_IFRAME_URL}
              title="ReportMCP 템플릿 편집 화면"
              loading="lazy"
            />
          </div>
        </div>

        {/* 흐름 화살표 */}
        <div className={styles.stepArrow} aria-hidden="true">
          <span className={styles.arrowLine} />
          <span className={styles.arrowLabel}>템플릿에 적어둔 규칙대로 생성</span>
          <span className={styles.arrowLine} />
        </div>

        {/* STEP 2 — 생성 결과 */}
        <div className={styles.step}>
          <div className={styles.stepHead}>
            <span className={`${styles.stepNum} ${styles.stepNumResult}`}>STEP 2</span>
            <div className={styles.stepText}>
              <h3 className={styles.stepTitle}>생성 결과 — 이대로 만들어집니다</h3>
              <p className={styles.stepDesc}>
                STEP 1 템플릿에 설명해둔 규칙이 테스트 데이터와 합쳐져 완성된
                보고서입니다. 데이터가 있는 항목은 표로, 없는 항목은 안내 문구로 각각
                자동 분기되어 출력됩니다. <b>사람이 손으로 채운 문서가 아닙니다.</b>{' '}
                운영 데이터가 아닌 테스트용 샘플이라 수치는 실제 고객 값이 아닙니다.
              </p>
            </div>
            <a
              className={styles.newTab}
              href={DETAIL_IFRAME_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              새 창에서 열기 ↗
            </a>
          </div>
          <div className={styles.frameShell}>
            <div className={styles.frameBar}>
              <span />
              <span />
              <span />
              <em>aiops.didim.com/report/detail/633/guide</em>
            </div>
            <iframe
              className={styles.frame}
              src={DETAIL_IFRAME_URL}
              title="ReportMCP 템플릿으로 생성된 보고서"
              loading="lazy"
            />
          </div>
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
