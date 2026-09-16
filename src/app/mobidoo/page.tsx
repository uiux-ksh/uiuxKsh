import type { Metadata } from 'next';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '김성훈 | 5년차 Frontend Developer',
  description: 'AI 기능을 사용자 경험으로 구현하는 5년차 프론트엔드 개발자 김성훈입니다.',
  robots: { index: false, follow: false },
};

const CAREERS = [
  {
    company: '디딤365',
    desc: 'AI 플랫폼(챗봇 · 워크플로우 · RAG) 서비스를 개발하는 클라우드 MSP 기업',
    role: 'Frontend Developer',
    period: '2025.02 - 현재',
    details: [
      'AI 챗봇 SSE 스트리밍 응답에 rAF 배칭 + 버퍼 flush를 적용해 INP 300ms → 100ms 이하로 개선, 2,000토큰 이상 응답에서도 60fps 유지',
      '모노레포 기반 디자인 시스템 구축 — 디자인 값을 토큰으로 표준화하고 Storybook URL을 제공해 디자이너가 직접 확인하는 협업 프로세스 정착, 3개 프로덕트 UI 일원화',
      'n8n 워크플로우 에디터에 3초 디바운스 자동 저장 설계 — 변경 diff 해싱으로 저장 API 호출 95% 감소, 작업 유실 위험 제거',
      'RAG 지식관리 화면 개발 — TanStack Query 기반 Optimistic Update, useInfiniteQuery 무한 스크롤, PII 마스킹 처리',
      '채팅 이미지 리스트에 Lazy Loading + viewport 가상화 적용 — 초기 이미지 요청 70% 감소, 렌더링 40% 개선',
    ],
  },
  {
    company: 'DX&VX',
    desc: '코스닥 상장 헬스케어 기업',
    role: '디지털사업전략팀 · Frontend Developer',
    period: '2024.06 - 2025.01',
    details: [
      '코스닥 상장사 공식 홈페이지를 Next.js 기반 반응형 웹으로 개발 — PC · 모바일 통합 대응',
      '비대면 진료 서비스 프론트엔드 개발',
      '의료 포털 사이트 개발 — 기획 · 디자인 부서와 실무 커뮤니케이션을 직접 조율하며 진행',
    ],
  },
  {
    company: '집쇼코리아',
    desc: '전시 · 박물관 인터랙티브 콘텐츠 전문 기업 (프리랜서)',
    role: 'Frontend Developer (프리랜서)',
    period: '2024.03 - 2024.06',
    details: [
      '국립세계문자박물관 웹 · 앱 스마트 도슨트 개발 — 웹뷰 · 인앱 환경에서의 동작 차이를 고려한 개발 경험',
      '부평역사박물관 키오스크 3D VR 콘텐츠 개발',
      '국립세계문자박물관 키오스크 아카이브 페이지 개발',
    ],
  },
  {
    company: '일공이사',
    desc: '대형 클라이언트 프로젝트 중심의 웹 에이전시',
    role: 'Frontend Developer',
    period: '2022.05 - 2023.12',
    details: [
      '라이엇 게임즈 리그 오브 레전드 이벤트 페이지 프론트엔드 단독 개발 — 대규모 트래픽 이벤트 페이지를 스펙 변경이 잦은 환경에서 일정 내 딜리버리',
      '한앤컴퍼니 사내 관리자 페이지 개발 (Next.js · Zustand · REST API)',
      '제네시스 기업 홈페이지 인터랙션 개발 (React · GSAP)',
      '스마일게이트 테일즈런너 프로모션 페이지 개발',
      '개발 용어에 익숙하지 않은 기획자 · 클라이언트 담당자와 직접 소통하며 요구사항을 조율하고 빠르게 반영',
    ],
  },
  {
    company: '수줍은연구소',
    desc: '웹 서비스 개발 · 운영 기업',
    role: '온라인팀 · Publisher',
    period: '2021.04 - 2022.04',
    details: [
      '반응형 웹 퍼블리싱 및 UI 컴포넌트 구현',
      '온라인 서비스 페이지 마크업 · 스타일링, 프론트엔드 유지보수',
    ],
  },
];

export default function MobidooPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.pageTitle}>김성훈 | 사용자 경험으로 완성하는 개발자</h1>

        <div className={styles.callout}>
          <span className={styles.calloutIcon}>📌</span>
          <p>
            5년차 프론트엔드 개발자 김성훈입니다. React · Next.js · TypeScript 기반으로 AI
            플랫폼과 다양한 웹 서비스를 개발해왔으며, AI 기능을 실제 사용자 경험으로
            구현하는 일에 집중하고 있습니다.
          </p>
        </div>

        <div className={styles.contactGrid}>
          <div className={styles.contactCol}>
            <h4>Contact.</h4>
            <p>
              Email. <strong>uiux-ksh@naver.com</strong>
            </p>
            <p>
              Phone. <strong>010-3679-5721</strong>
            </p>
          </div>
          <div className={styles.contactCol}>
            <h4>Channel.</h4>
            <p>
              <strong>Portfolio. </strong>
              <a href="/">메인 포트폴리오 보기</a>
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        <h2 className={styles.sectionTitle}>Introduce.</h2>
        <p className={styles.paragraph}>
          2021년부터 에이전시, 상장사, 스타트업을 거치며 프로모션 페이지부터 관리자
          시스템, AI 플랫폼까지 다양한 성격의 웹 프로덕트를 개발해왔습니다. 현재는 AI
          플랫폼의 프론트엔드를 담당하며 챗봇 스트리밍, 워크플로우 에디터, RAG 지식관리
          등 AI 기반 기능을 사용자 경험으로 구현하고 있습니다.
        </p>
        <p className={styles.paragraph}>
          상태 관리 도구를 상황에 맞게 선택해 사용합니다. 서버 상태는 TanStack Query로
          캐싱 · Optimistic Update · 무한 스크롤을 처리하고, 클라이언트 상태는 Zustand로
          가볍게 관리하는 방식으로 역할을 분리해왔습니다. 성능 개선은 감이 아닌 수치로
          확인합니다 — SSE 스트리밍 INP 300ms → 100ms, 초기 이미지 요청 70% 감소, 저장
          API 호출 95% 감소 등 측정 가능한 결과로 최적화를 진행했습니다.
        </p>
        <p className={styles.paragraph}>
          스펙이 자주 바뀌는 에이전시 환경에서 라이엇 게임즈, 제네시스, 스마일게이트 등
          대형 클라이언트 프로젝트를 일정 내에 딜리버리한 경험이 있고, 개발 용어가
          익숙하지 않은 기획자 · 클라이언트와도 기술적 맥락을 풀어 소통해왔습니다.
          디자이너와는 디자인 토큰과 Storybook을 매개로 협업하는 프로세스를 직접
          만들었습니다.
        </p>
        <p className={styles.paragraph}>
          Claude Code를 비롯한 AI 도구를 개발 과정에 적극 활용하며, 생성된 결과를
          검증하고 보완하는 것까지가 개발자의 몫이라고 생각합니다.
        </p>

        <div className={styles.divider} />

        <h2 className={styles.sectionTitle}>Work Experience.</h2>

        {CAREERS.map((career) => (
          <div key={career.company}>
            <h3 className={styles.companyName}>{career.company}</h3>
            <p className={styles.companyDesc}>{career.desc}</p>
            <div className={styles.roleRow}>
              <div className={styles.roleCol}>
                <p className={styles.roleName}>{career.role}</p>
                <p className={styles.rolePeriod}>{career.period}</p>
              </div>
              <ul className={styles.roleDetails}>
                {career.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className={styles.divider} />
          </div>
        ))}

        <h2 className={styles.sectionTitle}>Skill.</h2>
        <ul className={styles.skillList}>
          <li>
            <strong>Language:</strong> TypeScript, JavaScript
          </li>
          <li>
            <strong>Framework:</strong> React, Next.js
          </li>
          <li>
            <strong>State / Data:</strong> Zustand, TanStack Query (React Query)
          </li>
          <li>
            <strong>Styling / UI:</strong> SCSS, CSS Modules, Storybook, GSAP
          </li>
          <li>
            <strong>Media / Realtime:</strong> SSE 스트리밍, 3D · VR 콘텐츠
          </li>
          <li>
            <strong>AI:</strong> Claude Code, AI 챗봇 · RAG · 워크플로우 UI 개발
          </li>
          <li>
            <strong>Collaboration:</strong> Git, Figma, Jira, Slack
          </li>
        </ul>

        <div className={styles.divider} />

        <h2 className={styles.sectionTitle}>Education.</h2>
        <p className={styles.education}>신안산대학교 전자정보통신과</p>
      </div>
    </div>
  );
}
