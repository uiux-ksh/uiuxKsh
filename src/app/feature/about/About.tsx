'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import styles from './About.module.scss';

gsap.registerPlugin(ScrollTrigger);

const INFO_ITEMS = [
  { label: '이름', value: '김성훈' },
  { label: '생년월일', value: '1996.09.07' },
  { label: '이메일', value: 'uiux-ksh@naver.com' },
  { label: '연락처', value: '010-3679-5721' },
  { label: '학력', value: '신안산대학교 전자정보통신과' },
  { label: '경력', value: '4년+' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin 효과 — 섹션이 고정된 채로 콘텐츠가 등장
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
      });

      // 프로필 이미지 등장
      gsap.from(`.${styles.imageWrapper}`, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // 텍스트 영역 등장
      gsap.from(`.${styles.textContent}`, {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      // info items 스태거
      gsap.from(`.${styles.infoItem}`, {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.about}>
      <div ref={pinRef} className={styles.pinContainer}>
        <div className={styles.inner}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageBorder} />
            <Image
              src="/images/me.jpg"
              alt="김성훈 프로필"
              width={320}
              height={320}
              className={styles.profileImage}
            />
            <div className={styles.imageCaption}>@uiux-ksh</div>
          </div>

          <div className={styles.textContent}>
            <span className={styles.sectionLabel}>ABOUT ME</span>
            <h2 className={styles.heading}>
              사용자 경험을 설계하는
              <br />
              <strong>프론트엔드 개발자</strong>
            </h2>
            <p className={styles.description}>
              단순히 화면을 그리는 것이 아니라, 사용자의 흐름을 읽고 최적의
              인터랙션을 설계합니다. 디자이너와의 협업에서 의도를 정확히
              파악하고, 기획자와의 소통에서 기술적 한계를 명확히 전달합니다.
            </p>

            <div className={styles.infoGrid}>
              {INFO_ITEMS.map((item) => (
                <div key={item.label} className={styles.infoItem}>
                  <span className={styles.infoLabel}>{item.label}</span>
                  <span className={styles.infoValue}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className={styles.links}>
              <a
                href="https://github.com/uiux-ksh"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkBtn}
              >
                GitHub
              </a>
              <a
                href="https://uiux-ksh.tistory.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkBtn}
              >
                Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
