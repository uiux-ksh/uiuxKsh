import type { Metadata } from 'next';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '김성훈 | 인프랩(인프런) 프론트엔드 개발자 지원',
  description:
    '모노레포와 공용 패키지 위에서 서비스를 만들고 운영까지 책임져온 5년차 프론트엔드 개발자 김성훈입니다.',
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
      'pnpm',
      'Turborepo',
      'TanStack Query',
      'Zustand',
      'Storybook',
      'Playwright',
      'Tiptap',
      'React Flow',
      'SSE',
      'PostHog',
      'Sentry',
    ],
    groups: [
      {
        title: '모노레포 · 공용 패키지',
        items: [
          '프론트엔드 모노레포 초기 구성부터 참여 — Nx 구성을 걷어내고 Turborepo + pnpm workspaces 구조로 전환, 공용 설정 패키지와 앱 · 패키지 구조를 정리',
          '모노레포 기반 디자인 시스템 구축 — 디자인 값을 토큰으로 표준화하고 3개 프로덕트의 UI를 일원화',
          'Storybook URL을 공유해 디자이너가 개발자를 거치지 않고 직접 토큰값과 컴포넌트 상태를 확인하는 협업 프로세스 정착',
          '모니터링 공용 패키지 @didim/monitoring 직접 설계 — Sentry(에러 트래킹)와 PostHog(제품 분석) 셋업을 한 패키지에 담아 어느 서비스든 동일한 방식으로 붙도록 구성',
          '브라우저 · 서버 · 엣지 런타임 경계에 따라 엔트리포인트를 4개로 분리하고, 앱의 instrumentation.ts / instrumentation-client.ts 에서 각각 초기화하도록 설계. 키가 없으면 no-op 으로 동작해 미설정 환경에서도 빌드가 깨지지 않음',
          'capture(event, properties) 같은 도메인 중립 인터페이스만 노출하고 이벤트 정의는 각 앱이 소유하도록 분리 — 서비스가 늘어나도 패키지를 고치지 않고 재사용',
          '앱 이전 후 발생한 빌드 실패 해결 — vanilla-extract 플러그인 누락과 transpilePackages 미설정으로 공용 UI 패키지를 해석하지 못하던 문제를 원인별로 수정',
        ],
      },
      {
        title: '보고서 서비스 개발 · 운영',
        items: [
          'Next.js 기반 보고서 서비스 프론트엔드 개발 — 템플릿 생성 · 상세 · 편집, 보고서 생성 결과 확인, 첨부파일, PDF 저장까지의 흐름을 담당',
          'Tiptap 기반 에디터 개발 — 표 셀 병합 · 분리, 열 폭 조정, 이미지 삽입을 구현하고 화면에서 조정한 표 비율이 PDF에도 그대로 반영되도록 처리',
          '첨부파일 업로드에 낙관적 카드와 진행률 표시를 적용하고, 파일이 사라져 내려받기에 실패하면 사용자에게 알리도록 예외 흐름을 보완',
          '저장 없이 누구나 편집해볼 수 있는 보고서 상세 가이드(체험) 모드 개발 — 처음 쓰는 사용자가 실제 데이터를 건드리지 않고 기능을 익히도록 구성',
          'LLM 토큰 사용량 대시보드 개발 — 서버 단가표에 없는 모델이 비싼 단가로 폴백되어 비용이 약 3배 과대 집계되던 문제를 공식 단가 재계산으로 보정',
        ],
      },
      {
        title: '테스트 · 품질',
        items: [
          '보고서 상세의 EDIT / VIEW 모드, 첨부 업로드, 가이드 모드 시나리오를 Playwright E2E로 작성 — 권한에 따라 달라지는 화면을 사람 손 대신 시나리오로 검증',
          '공용 UI 컴포넌트에 Storybook 스토리를 작성해 상태별 동작을 문서로 남김',
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
        title: '사용자 행동 분석',
        items: [
          '보고서 서비스에 PostHog를 연동해 방문 · 클릭 · 세션 리플레이를 수집. 사용자가 어느 화면에서 멈칫하고 어디서 이탈하는지를 녹화로 확인해 개선 우선순위를 숫자로 판단',
        ],
      },
      {
        title: 'AI 기능 개발 · 업무 자동화',
        items: [
          'LLM 챗봇 스트리밍 UI, RAG 지식관리, 워크플로우 오케스트레이터까지 AI 제품의 프론트엔드 전반을 담당. PII 마스킹 등 민감 정보 처리 포함',
          'MCP 연동으로 Google, YouTube 등 외부 서비스를 통합하고 보고서용 데이터 시각화 차트 MCP 개발',
          '두레이 문의를 받아 AI로 요약 · 분류해 접수하는 사내 임시 시스템 개발 — Vite + React 화면과 NestJS API를 혼자 맡아 웹훅 연동까지 구성',
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

export default function InflearnPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.targetTag}>인프랩(인프런) — 프론트엔드 개발자 지원</span>
        <h1 className={styles.pageTitle}>
          김성훈 | 만든 서비스를 운영까지 책임지는 프론트엔드 개발자
        </h1>

        <div className={styles.callout}>
          <p>
            5년차 프론트엔드 개발자 김성훈입니다. TypeScript · React · Next.js 기반으로
            AI 플랫폼, 보고서 서비스, B2C 웹을 개발해왔습니다. pnpm + Turborepo 모노레포와 공용
            패키지 설계, Storybook으로 문서화한 디자인 시스템, Playwright E2E, 그리고 Sentry ·
            PostHog로 운영 중인 서비스를 계측하고 고치는 일이 저의 강점입니다.
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
          공고에서 가장 먼저 눈에 들어온 건 pnpm + Turborepo 모노레포에서 공용 패키지와 서비스
          코드를 함께 관리한다는 부분이었습니다. 디딤365에서 프론트엔드 저장소를 모노레포로
          구성하고 Turborepo로 전환하는 작업을 직접 했고, 그 위에 디자인 시스템과 모니터링
          패키지를 얹어 여러 서비스가 같은 방식으로 쓰도록 만들었습니다. 공용 패키지는 만드는
          것보다 앱에 붙일 때 생기는 빌드 문제를 끝까지 풀어내는 일이 더 중요하다는 것도 그
          과정에서 배웠습니다.
        </p>
        <p className={styles.paragraph}>
          화면을 만든 뒤의 일에도 관심이 많습니다. 보고서 서비스에서는 기능 개발에 그치지 않고
          PostHog로 사용자가 멈칫하는 지점을 확인했고, 저장 없이 써볼 수 있는 가이드 모드를
          만들었습니다. 토큰 사용량 대시보드에서는 비용이 약 3배 과대 집계되던 원인을 찾아
          보정했습니다. 인프랩이 찾는 &lsquo;왜 이 기능을 만드는가&rsquo;를 먼저 묻는 태도와
          &lsquo;팀의 짐을 덜어주는 완결성&rsquo;은 제가 일해온 방식과 맞닿아 있습니다. 측정 없이
          고치지 않고, 권한별 화면은 E2E로 남기고, 공용 컴포넌트는 Storybook으로 문서화합니다.
        </p>
        <p className={styles.paragraph}>
          공고의 기술 중 실무에서 다뤄보지 못한 것도 분명히 있습니다. React Native 앱의 스토어
          배포, Module Federation 운영, i18n 서비스, Datadog · Mixpanel · Hackle은 실무 경험이
          없습니다. 다만 Next.js Pages Router 환경에서 Module Federation으로 host · remote 앱을
          나눠보는 실습 저장소를 만들었고, Expo로 React Native 태블릿 앱을 개인 프로젝트로
          만들어봤습니다. 네이티브 앱 안의 웹뷰 화면은 국립세계문자박물관 스마트 도슨트에서
          실제로 담당했습니다. 모니터링과 행동 분석은 도구는 달라도 Sentry · PostHog로 같은
          문제를 풀어왔습니다.
        </p>
        <p className={styles.paragraph}>
          저는 퍼블리셔로 시작해 프론트엔드 개발자가 되었고, 지금도 실무에 없는 기술은 따로
          저장소를 만들어 직접 돌려보며 익힙니다. 배우려는 사람이 그 다음 단계로 넘어가도록
          돕는 인프런의 일이 그래서 남의 이야기처럼 느껴지지 않았습니다. 150만 명이 넘는
          사용자가 배우는 화면을 안정적으로 만드는 일을 인프랩에서 함께 하고 싶어
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

        <h2 className={styles.sectionTitle}>Side Project.</h2>
        <ul className={styles.skillList}>
          <li>
            <strong>Micro Frontend 실습:</strong> Next.js Pages Router + @module-federation/nextjs-mf
            로 host 앱과 remote 앱을 분리해 구성 (학습용, 운영 경험 아님)
          </li>
          <li>
            <strong>테이블 주문 키오스크 앱:</strong> Expo · React Native · TypeScript 기반 태블릿
            주문 앱, Reanimated 애니메이션과 영상 재생 구현 (개인 프로젝트, 스토어 배포 없음)
          </li>
        </ul>

        <div className={styles.divider} />

        <h2 className={styles.sectionTitle}>Skill.</h2>
        <ul className={styles.skillList}>
          <li>
            <strong>Language:</strong> TypeScript, JavaScript(ES6+), HTML / CSS
          </li>
          <li>
            <strong>Framework:</strong> React, Next.js (App Router · SSR), NestJS(사내 도구)
          </li>
          <li>
            <strong>State / Data:</strong> TanStack Query (React Query), Zustand, REST API 연동
          </li>
          <li>
            <strong>Monorepo / Build:</strong> pnpm workspaces, Turborepo, Webpack, Vite, 워크스페이스
            패키지 빌드 문제 해결
          </li>
          <li>
            <strong>Component / UI:</strong> Storybook, 디자인 토큰 · 디자인 시스템, Atomic
            Design, vanilla-extract, SCSS, CSS Modules, 반응형 웹
          </li>
          <li>
            <strong>테스트:</strong> Playwright E2E, Storybook
          </li>
          <li>
            <strong>웹 표준 · 성능:</strong> 시맨틱 마크업, 크로스 브라우저 대응, Core Web
            Vitals(INP) 개선, Lazy Loading, viewport 가상화
          </li>
          <li>
            <strong>운영 · 분석:</strong> Sentry(에러 트래킹), PostHog(이벤트 트래킹 · 세션
            리플레이)
          </li>
          <li>
            <strong>Mobile:</strong> 네이티브 앱 내 웹뷰 화면 개발(실무), Expo · React Native(개인
            프로젝트)
          </li>
          <li>
            <strong>AI:</strong> Claude Code, LLM 챗봇 · RAG · 워크플로우 UI 개발, MCP 연동
          </li>
          <li>
            <strong>Collaboration:</strong> Git, GitHub Actions, Figma, Jira, Slack
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
