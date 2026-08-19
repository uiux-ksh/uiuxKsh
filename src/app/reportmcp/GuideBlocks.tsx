'use client';

import { useState } from 'react';
import type { GuideBlock } from './guideData';
import styles from './page.module.scss';

/**
 * /reportmcp 계열 페이지가 공유하는 콘텐츠 렌더러 모음.
 *  - renderInline : **굵게**, `코드` 만 지원하는 초소형 마크다운 렌더러
 *  - GuideImage   : 스크린샷. 파일이 없으면 파일명 플레이스홀더로 대체
 *  - Block        : guideData 의 섹션 본문 블록 하나를 그린다
 */

/** **굵게**, `코드` 두 가지 인라인 서식만 지원하는 초소형 렌더러 */
export function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((chunk, i) => {
    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      return <b key={i}>{chunk.slice(2, -2)}</b>;
    }
    if (chunk.startsWith('`') && chunk.endsWith('`')) {
      return <code key={i}>{chunk.slice(1, -1)}</code>;
    }
    return chunk;
  });
}

/** public/guide/{name} 스크린샷. 없으면 파일명 플레이스홀더로 대체 */
export function GuideImage({
  name,
  thumb = false,
  onZoom,
}: {
  name: string;
  thumb?: boolean;
  /** 지정하면 클릭 시 원본(100%) 크기 뷰어를 연다 */
  onZoom?: (src: string) => void;
}) {
  const [missing, setMissing] = useState(false);
  const src = name.startsWith('/') ? name : `/guide/${name}`;

  if (missing) {
    return (
      <div className={thumb ? styles.imgPlaceholderThumb : styles.imgPlaceholder}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8.5" cy="10" r="1.6" fill="currentColor" />
          <path d="M4.5 17.5 10 12l4 4 3-3 2.5 2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span className={styles.imgPlaceholderName}>{name}</span>
      </div>
    );
  }

  const img = (
    /* eslint-disable-next-line @next/next/no-img-element -- 크기를 모르는 스크린샷이라 next/image 대상이 아님 */
    <img src={src} alt={name} onError={() => setMissing(true)} />
  );

  return (
    <figure className={thumb ? styles.imgFigureThumb : styles.imgFigure}>
      {onZoom ? (
        <button
          type="button"
          className={styles.zoomHit}
          onClick={() => onZoom(src)}
          aria-label="이미지 원본 크기로 보기"
          title="클릭하면 원본 크기(100%)로 볼 수 있습니다"
        >
          {img}
          <span className={styles.zoomIcon} aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10.5 10.5 L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M7 5v4M5 7h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      ) : (
        img
      )}
    </figure>
  );
}

/** 섹션 본문 블록 하나를 그린다 */
export function Block({
  block,
  onZoom,
}: {
  block: GuideBlock;
  onZoom?: (src: string) => void;
}) {
  switch (block.t) {
    case 'p':
      return <p>{renderInline(block.text)}</p>;
    case 'h4':
      return <h4>{block.text}</h4>;
    case 'list': {
      const items = block.items.map((it, i) => <li key={i}>{renderInline(it)}</li>);
      return block.ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
    }
    case 'table':
      return (
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i}>{renderInline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'quote':
      return (
        <blockquote>
          {block.lines.map((line, i) => (
            <p key={i}>{renderInline(line)}</p>
          ))}
        </blockquote>
      );
    case 'img':
      return <GuideImage name={block.name} onZoom={onZoom} />;
  }
}
