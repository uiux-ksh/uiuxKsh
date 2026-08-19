'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MONITORING_INTRO, MONITORING_SECTIONS } from '../guideData';
import { Block } from '../GuideBlocks';
import styles from '../page.module.scss';
import pageStyles from './page.module.scss';

/**
 * /reportmcp/monitoring — 보고서 모니터링(PostHog 연동) 소개.
 *
 * 팝업이 아니라 블로그 상세 글처럼 본문이 페이지에 바로 펼쳐지는 구성.
 * 콘텐츠는 guideData 의 MONITORING_SECTIONS 를 그대로 사용한다.
 */
export default function MonitoringPage() {
  // 원본(100%) 크기로 확대해 보는 이미지 src. null 이면 닫힘.
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  const post = MONITORING_SECTIONS[0];

  return (
    <main className={styles.page}>
      {/* ---------------------------------------------------------- hero */}
      <header className={styles.hero}>
        <Link href="/" className={styles.backLink}>
          ← Portfolio
        </Link>
        <span className={styles.heroLabel}>DIDIM365 · REPORT MONITORING</span>
        <h1 className={styles.heroTitle}>
          보고서 모니터링 <em>PostHog</em>
        </h1>
        <p className={styles.heroDesc}>{MONITORING_INTRO}</p>
      </header>

      {/* ---------------------------------------------------------- article */}
      <div className={pageStyles.articleShell}>
        <article className={styles.article}>
          <header className={styles.articleHead}>
            {post.badge && <span className={styles.badgeLarge}>{post.badge}</span>}
            <h1>{post.title}</h1>
            <p className={styles.articleSub}>{post.summary}</p>
          </header>

          <div className={styles.articleBody}>
            {post.blocks.map((b, i) => (
              <Block key={i} block={b} onZoom={setZoomSrc} />
            ))}
          </div>
        </article>
      </div>

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
