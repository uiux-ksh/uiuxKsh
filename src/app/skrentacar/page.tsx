import type { Metadata } from 'next';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '김성훈 | SK렌터카 프론트엔드 개발자 지원',
  description:
    '공통 컴포넌트와 업무 화면을 탄탄하게 만들어온 경력 만 4년의 프론트엔드 개발자 김성훈입니다.',
  robots: { index: false, follow: false },
};

type Career = {
  company: string;
  desc: string;
  role: string;
  period: string;
  tech: string[];
  groups: { title: string; items: string[] }[];
  /** 퇴사 사유. 설명이 필요한 경우에만 표기한다 */
  leaveReason?: string;
};

const CAREERS: Career[] = [
  {
    company: '디딤365',
    desc: 'AI 플랫폼(챗봇 · 워크플로우 · RAG) 서비스를 개발하는 300명 규모 클라우드 MSP 기업 · AI개발팀',
    role: 'Frontend Developer',
    period: '2025.02 - 현재',
    tech: [
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'Zustand',
      'React Flow',
      'SSE',
      'Storybook',
      'Monorepo',
      'PostHog',
      'Sentry',
    ],
    groups: [
      {
        title: '공용 컴포넌트 · 디자인 시스템',
        items: [
          '모노레포 기반 디자인 시스템 구축 — 디자인 값을 토큰으로 표준화하고 3개 프로덕트의 UI를 일원화',
          'Storybook URL을 공유해 디자이너가 개발자를 거치지 않고 직접 토큰값과 컴포넌트 상태를 확인하는 협업 프로세스 정착',
        ],
      },
      {
        title: '대용량 리스트 · 탐색 UI',
        items: [
          'RAG 지식관리 화면에 useInfiniteQuery 기반 무한 스크롤을 적용해 페이지네이션 단위로 끊기던 탐색 흐름을 제거. 문서가 수천 건 쌓여도 스크롤 한 번으로 이어서 볼 수 있도록 구성',
          '채팅 이미지 리스트에 Lazy Loading과 viewport 가상화 적용 — 초기 이미지 요청 70% 감소, 렌더링 40% 개선, 스크롤 중 깜빡임 제거',
          'React Flow 기반 워크플로우 캔버스 개발 — 노드 · 엣지를 팬 · 줌으로 다루는 인터랙션을 구현하고, 뷰포트가 바뀔 때마다 전체가 다시 그려지지 않도록 리렌더 범위를 좁힘',
          '문서 업로드 → 청킹 → 벡터 임베딩으로 이어지는 파이프라인의 진행 상태를 SSE로 실시간 반영',
        ],
      },
      {
        title: '성능 최적화 — Core Web Vitals',
        items: [
          'AI 챗봇 SSE 스트리밍 응답에 rAF 배칭 + 버퍼 flush를 적용해 INP를 300ms대에서 100ms 이하로 개선. 2,000토큰 이상 응답에서도 60fps 유지',
          'n8n 워크플로우 에디터에 3초 디바운스 자동 저장을 설계하고 변경 diff 해싱으로 중복 저장을 차단 — 저장 API 호출 95% 감소, 작업 유실 위험 제거',
          '개선은 감이 아니라 계측으로 판단. 병목을 먼저 측정하고 원인을 좁힌 뒤 손대는 순서를 지킴',
        ],
      },
      {
        title: '이벤트 트래킹 · 모니터링',
        items: [
          '모니터링 공용 패키지 @didim/monitoring 직접 설계 — Sentry(에러 트래킹)와 PostHog(제품 분석) 셋업을 한 패키지에 담아 어느 서비스든 동일한 방식으로 붙도록 구성',
          '브라우저 · 서버 · 엣지 런타임 경계에 따라 엔트리포인트를 4개로 분리하고, 앱의 instrumentation.ts / instrumentation-client.ts 에서 각각 초기화하도록 설계. 키가 없으면 no-op 으로 동작해 미설정 환경에서도 빌드가 깨지지 않음',
          'capture(event, properties) 같은 도메인 중립 인터페이스만 노출하고 이벤트 정의는 각 앱이 소유하도록 분리 — 서비스가 늘어나도 패키지를 고치지 않고 재사용',
          '보고서 서비스에 PostHog를 연동해 방문 · 클릭 · 세션 리플레이를 수집. 사용자가 어느 화면에서 멈칫하고 어디서 이탈하는지를 녹화로 확인해 개선 우선순위를 숫자로 판단',
        ],
      },
      {
        title: 'AI 기능 개발 · AI 도구 활용',
        items: [
          'LLM 챗봇 스트리밍 UI, RAG 지식관리, 워크플로우 오케스트레이터까지 AI 제품의 프론트엔드 전반을 담당. PII 마스킹 등 민감 정보 처리 포함',
          'MCP 연동으로 Google, YouTube 등 외부 서비스를 통합하고 보고서용 데이터 시각화 차트 MCP 개발',
          'Claude Code를 실무 개발 과정에 상시 활용. 생성된 결과를 그대로 쓰지 않고 검증 · 보완하는 것까지가 개발자의 몫이라고 보고 작업',
          '기획이 확정되기 전에 프로토타입을 먼저 붙여보고 방향을 정하는 방식으로, 선례가 없던 기술(React Flow · n8n · MCP · 모니터링 SDK)을 직접 조사해 도입',
        ],
      },
    ],
  },
  {
    company: 'DX&VX (디엑스앤브이엑스)',
    desc: '200명 규모 코스닥 상장 헬스케어 기업 · 디지털사업전략팀 비대면상담 앱개발팀',
    role: '주임 · Frontend Developer',
    period: '2024.06 - 2025.01',
    tech: [
      'Next.js',
      'React',
      'TypeScript',
      'TanStack Query',
      'Zustand',
      'SSE',
      'Chart.js',
      'SCSS',
    ],
    groups: [
      {
        title: 'AI 의료 챗봇 · 비대면 진료',
        items: [
          'AI 의료 챗봇 CLIDEX 프론트엔드 개발 — SSE 기반 실시간 스트리밍 응답 UI를 구현해 답변이 생성되는 동안에도 화면이 멈추지 않도록 처리',
          '비대면 진료 · 심리상담 플랫폼 개발 — getUserMedia 등 카메라 · 마이크 Browser API를 사용해 상담 화면과 기기 권한 예외 처리를 구현',
          'CLIDEX 유전체 데이터 분포 차트 시각화 — Chart.js 기반으로 대량의 수치 데이터를 읽히는 형태로 가공',
        ],
      },
      {
        title: 'SSR 기반 서비스 개발 · 운영',
        items: [
          '코스닥 상장사 공식 홈페이지를 Next.js SSR 반응형 웹으로 개발 — PC · 모바일 통합 대응, App Router metadata 구성',
          '의료 포털 사이트를 개발하고 운영 단계까지 담당 — Next.js + TanStack Query + Zustand 로 서버 상태와 클라이언트 상태를 분리한 아키텍처 구성',
          'REST API 스펙을 백엔드와 직접 맞춰가며 개발하고, 배포 이후 문의와 지표를 보고 화면을 고쳐 나가는 사이클을 반복',
        ],
      },
      {
        title: '협업',
        items: [
          '기획 · 디자인 부서와 실무 커뮤니케이션을 직접 조율하며 진행. 개발 용어에 익숙하지 않은 담당자에게 기술적 제약을 풀어 설명하고 대안을 함께 결정',
        ],
      },
    ],
    leaveReason:
      '회사 재정 악화에 따른 조직 축소로 권고사직되었습니다. 담당하던 서비스는 인수인계를 마치고 정리한 뒤 퇴사했습니다.',
  },
  {
    company: '집쇼코리아',
    desc: '전시 · 박물관 인터랙티브 콘텐츠 전문 기업 (프리랜서)',
    role: 'Frontend Developer (프리랜서)',
    period: '2024.03 - 2024.06',
    tech: ['React', 'JavaScript', 'WebView', '3D / VR', 'Kiosk'],
    groups: [
      {
        title: '앱 웹뷰 — 스마트 도슨트',
        items: [
          '국립세계문자박물관 웹 · 앱 스마트 도슨트 개발 — 네이티브 앱의 웹뷰 안에서 동작하는 화면을 담당',
          '웹 브라우저와 인앱 웹뷰의 동작 차이를 전제로 대응 — 주소창 유무에 따른 뷰포트 높이 편차, 터치 이벤트 처리, 앱 뒤로가기와 웹 히스토리가 충돌하는 구간을 정리',
          '관람 동선에 맞춘 모바일 터치 인터랙션과 전시물 상세 화면 구현',
        ],
      },
      {
        title: '키오스크 콘텐츠',
        items: [
          '부평역사박물관 키오스크 3D VR 콘텐츠 개발 — 대형 터치 스크린 환경에 맞춘 조작 UI 구성',
          '국립세계문자박물관 키오스크 아카이브 페이지 개발 — 다량의 소장품 데이터를 검색 · 필터로 좁혀 탐색하는 화면 구현',
        ],
      },
    ],
  },
  {
    company: '일공이사',
    desc: '30명 규모의 웹 에이전시 · 대형 클라이언트 프로젝트 중심',
    role: '주임 · Frontend Developer',
    period: '2022.05 - 2023.12',
    tech: [
      'Next.js',
      'React',
      'Zustand',
      'GSAP',
      'ScrollTrigger',
      'Canvas API',
      'Atomic Design',
      'Sass',
    ],
    groups: [
      {
        title: '대규모 트래픽 이벤트 — 라이엇 게임즈',
        items: [
          '리그 오브 레전드 이벤트 페이지 프론트엔드 단독 개발 — 허니 토큰, 스타 가디언 등 오픈 시점에 유저가 한꺼번에 몰리는 대규모 프로모션 페이지를 담당',
          '스펙 변경이 잦은 환경에서 일정 내 딜리버리 — 바뀌는 요구사항을 전제로 컴포넌트를 쪼개 설계',
          '이벤트 시리즈 공통 컴포넌트를 아토믹 디자인 패턴으로 설계해 반복 제작 비용 절감, 구형 브라우저까지 크로스 브라우저 대응',
        ],
      },
      {
        title: '관리자 · 커머스 화면',
        items: [
          '한앤컴퍼니 사내 관리자 페이지 개발 — Next.js · Zustand · REST API 연동으로 목록 · 상세 · 등록 화면 구성',
          'SKT 티다문구점 프로모션 페이지 개발 — Zustand 전역 상태관리, 스크롤 기반 상품 노출과 장바구니 연동',
        ],
      },
      {
        title: '인터랙션 · 브랜드 사이트',
        items: [
          '제네시스 수지 스페이스 공식 소개 페이지 개발 — GSAP ScrollTrigger 기반 스크롤 애니메이션과 풀스크린 이미지 시퀀스 전환. 제네시스 공식 사이트로 라이브 배포',
          '스마일게이트 테일즈런너 러너스 클로젯 이벤트 시리즈 개발 — Canvas API 기반 이미지 합성 에디터와 캐릭터 착장 시뮬레이터 구현',
        ],
      },
      {
        title: '협업',
        items: [
          '개발 용어에 익숙하지 않은 기획자 · 클라이언트 담당자와 직접 소통하며 요구사항을 조율하고 빠르게 반영',
        ],
      },
    ],
    leaveReason:
      '회사 사옥 이전으로 근무지가 바뀌면서 출퇴근 여건이 크게 달라져 이직을 결정했습니다.',
  },
  {
    company: '수줍은연구소',
    desc: '웹 서비스를 개발 · 운영하는 스타트업',
    role: '온라인팀 주임 · Publisher',
    period: '2021.04 - 2022.04',
    tech: ['JavaScript', 'HTML / CSS', 'SCSS', 'jQuery'],
    groups: [
      {
        title: '퍼블리싱 · 유지보수',
        items: [
          '반응형 웹 퍼블리싱 및 UI 컴포넌트 구현 — 마크업 · 스타일링 · 크로스 브라우저 대응의 기본기를 다진 시기',
          '온라인 서비스 페이지 마크업 · 스타일링, 프론트엔드 유지보수',
        ],
      },
    ],
  },
];

export default function SkRentacarPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.targetTag}>
          SK렌터카 — 프론트엔드 개발자 (React · TypeScript) 지원
        </span>
        <h1 className={styles.pageTitle}>
          김성훈 | 공통 컴포넌트 위에서 업무 화면을 단단하게 만드는 개발자
        </h1>

        <div className={styles.callout}>
          <p>
            경력 만 4년의 프론트엔드 개발자 김성훈입니다. React · Next.js · TypeScript 기반으로 B2B
            AI 플랫폼, 사내 관리자, B2C 서비스 화면을 개발해왔습니다. Storybook으로 문서화한
            공통 컴포넌트와 디자인 시스템, REST API 연동과 서버 · 클라이언트 상태 분리,
            그리고 Sentry · PostHog로 운영 이슈를 재현하고 원인을 좁히는 일이 저의 강점입니다.
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
            <p>
              <strong>Education. </strong>신안산대학교 전자정보통신과
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        <h2 className={styles.sectionTitle}>지원 동기.</h2>
        <p className={styles.paragraph}>
          공고에서 가장 눈에 들어온 건 기간계 화면 전환이었습니다. 오래 쓰여온 업무 화면을
          React로 다시 만드는 일은 새 화면을 그리는 것보다 기존 화면이 실제로 무엇을 하고
          있는지 읽어내는 일이 먼저라고 생각합니다. 퍼블리셔로 jQuery 화면을 유지보수하던
          시기부터 React · Next.js로 관리자와 서비스 화면을 다시 만들기까지, 레거시를 읽고
          새 구조로 옮기는 과정을 여러 번 거쳐왔습니다.
        </p>
        <p className={styles.paragraph}>
          업무 화면의 품질은 결국 공통 컴포넌트에서 갈립니다. 디딤365에서는 모노레포 기반
          디자인 시스템을 구축해 3개 프로덕트의 UI를 하나로 묶었고, Storybook으로 컴포넌트
          상태를 문서화해 디자이너가 개발자를 거치지 않고 직접 확인하도록 만들었습니다.
          한앤컴퍼니 관리자 페이지에서는 목록 · 상세 · 등록으로 이어지는 폼과 팝업 화면을
          REST API와 Zustand로 구성했습니다. 폼 · 그리드 · 팝업이 반복되는 기간계 화면에서
          바로 쓸 수 있는 경험입니다.
        </p>
        <p className={styles.paragraph}>
          운영 이슈를 다루는 방식도 정리해왔습니다. Sentry와 PostHog를 하나로 묶은 공용
          모니터링 패키지를 직접 설계했고, 에러는 스택으로, 사용성 문제는 세션 리플레이로
          재현해 원인을 좁힌 뒤 기록으로 남겼습니다. 성능 역시 감이 아니라 계측으로 판단해
          INP를 300ms대에서 100ms 이하로 내렸습니다.
        </p>
        <p className={styles.paragraph}>
          모빌리티 도메인은 아직 깊이 다뤄보지 못했습니다. 다만 제네시스 수지 스페이스 공식
          사이트를 개발하며 자동차 브랜드의 화면을 만들어봤고, 헬스케어 · 게임 · B2B AI
          플랫폼을 옮겨 다닐 때마다 낯선 데이터 구조를 빠르게 익혀 화면을 책임져 왔습니다.
          차량 · 계약 · 정비로 이어지는 렌탈 업무는 단계마다 다루는 정보가 많고 정확해야
          합니다. 그 복잡함을 쓰기 쉬운 화면으로 옮기는 일을 SK렌터카에서 하고 싶어
          지원하게 되었습니다.
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
                <div className={styles.roleTech}>
                  {career.tech.map((t) => (
                    <span key={t} className={styles.techTag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.roleBody}>
                {career.groups.map((group) => (
                  <div key={group.title} className={styles.group}>
                    <h4 className={styles.groupTitle}>{group.title}</h4>
                    <ul className={styles.roleDetails}>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                {career.leaveReason && (
                  <p className={styles.leaveReason}>
                    <span className={styles.leaveLabel}>이직 사유</span>
                    {career.leaveReason}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.divider} />
          </div>
        ))}

        <h2 className={styles.sectionTitle}>Skill.</h2>
        <ul className={styles.skillList}>
          <li>
            <strong>Language:</strong> TypeScript, JavaScript(ES6+), HTML / CSS
          </li>
          <li>
            <strong>Framework:</strong> React, Next.js (App Router · SSR)
          </li>
          <li>
            <strong>State / Data:</strong> TanStack Query (React Query), Zustand, REST API 연동
          </li>
          <li>
            <strong>Component / UI:</strong> Storybook, 디자인 토큰 · 디자인 시스템, Atomic
            Design, SCSS, CSS Modules
          </li>
          <li>
            <strong>업무 화면:</strong> 관리자 목록 · 상세 · 등록 폼, 검색 · 필터, 팝업,
            useInfiniteQuery 무한 스크롤, viewport 가상화
          </li>
          <li>
            <strong>웹 표준 · 성능:</strong> 시맨틱 마크업, 크로스 브라우저 대응, Core Web
            Vitals(INP) 개선, Lazy Loading
          </li>
          <li>
            <strong>운영 · 모니터링:</strong> Sentry(에러 트래킹), PostHog(이벤트 트래킹 ·
            세션 리플레이)
          </li>
          <li>
            <strong>AI:</strong> Claude Code, LLM 챗봇 · RAG · 워크플로우 UI 개발, MCP 연동
          </li>
          <li>
            <strong>Collaboration:</strong> Git, GitHub Actions, Figma, Jira, Slack, Monorepo
          </li>
        </ul>

        <div className={styles.divider} />

        <h2 className={styles.sectionTitle}>Reference.</h2>
        <ul className={styles.linkList}>
          <li>
            <a href="/">메인 포트폴리오 — 경력 · 프로젝트 전체</a>
          </li>
          <li>
            <a href="/reportmcp">ReportMCP 템플릿 에디터 — 구현 과정 정리</a>
          </li>
          <li>
            <a href="/reportmcp/monitoring">
              보고서 모니터링(PostHog 연동) — 이벤트 트래킹 도입기
            </a>
          </li>
        </ul>

        <div className={styles.divider} />

        <h2 className={styles.sectionTitle}>Education.</h2>
        <p className={styles.education}>신안산대학교 전자정보통신과</p>
      </div>
    </div>
  );
}
