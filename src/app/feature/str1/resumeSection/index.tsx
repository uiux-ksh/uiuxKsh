'use client'
import './index.css'

function ResumeSection() {
  return (
    <section className='resume-section'>
      <div className='resume-container'>
        {/* 상단 서브타이틀 */}
        <p className='page-title'>김성훈 | 프론트엔드 개발자</p>

        {/* 헤더 - 메인 타이틀 */}
        <header className='resume-header'>
          <div className='profile-icon'>👨‍💻</div>
          <h1 className='resume-title'>김성훈 | 버그는 참지 못하지만 사람에게 경청하는 개발자</h1>
        </header>

        {/* 프로필 영역 */}
        <div className='profile-area'>
          <div className='profile-image-wrapper'>
            <img src='/_assets/me.jpg' alt='프로필 이미지' className='profile-image' />
          </div>
          <div className='profile-info'>
            <div className='info-group'>
              <h3 className='info-title'>Contact.</h3>
              <p>Email. <strong>uiux-ksh@naver.com</strong></p>
              <p>Phone. <strong>010-3679-5721</strong></p>
              <p>Birth. <strong>1996.09.07</strong></p>
            </div>
            <div className='info-group'>
              <h3 className='info-title'>Channel.</h3>
              <p><strong>GitHub.</strong> <a href='https://github.com/uiux-ksh' target='_blank' rel='noreferrer'>https://github.com/uiux-ksh</a></p>
              <p><strong>Blog.</strong> <a href='https://uiux-ksh.tistory.com/' target='_blank' rel='noreferrer'>https://uiux-ksh.tistory.com</a></p>
            </div>
          </div>
        </div>

        <div className='divider'></div>

        {/* Introduce 섹션 */}
        <section className='resume-block'>
          <h2 className='section-title'>Introduce.</h2>
          <div className='section-content'>
            <p className='intro-text'>
              현재 디딤365에 재직 중이며, 다양한 AI 기반 서비스 및 시스템 아키텍처 개발을 담당하고 있습니다.
            </p>
            <ul className='intro-list'>
              <li><strong>AI 오케스트레이션 구현</strong> - 여러 모델과 도구를 유기적으로 연결하는 오케스트레이션 로직을 설계하고 자동화 흐름을 구축했습니다.</li>
              <li><strong>Google 검색·차트 MCP 개발</strong> - Node SDK를 활용해 검색·차트 모듈을 MCP 형태로 개발하여 다양한 에이전트와 통신 가능한 형태로 확장했습니다.</li>
              <li><strong>실시간 통신 기반 챗봇 개발</strong> - WebSocket을 통한 실시간 메시징 구조로 챗봇 서비스를 구축하며 반응성·확장성을 높였습니다.</li>
              <li><strong>BookHub MSA 서버 개발 및 GitBook 연동 자동화</strong> - 팀원들의 여러 레포지토리 커밋을 수집하는 Node 기반 BookHub 서버를 직접 구현하고, MSA 구조 내 각 서비스의 커밋 로그를 취합해 GitBook 문서로 자동 반영되도록 파이프라인을 구축했습니다.</li>
              <li><strong>RAG 기반 하이브리드 검색 및 그래프 UI 구현</strong> - RAG(Graph RAG) 기반 하이브리드 검색 기능을 설계·개발하고, 사용자 친화적인 그래프 형태 UI와 API 연동을 통해 검색 결과 시각화 및 데이터 탐색 효율을 높였습니다.</li>
            </ul>
          </div>
        </section>

        <div className='divider'></div>

        {/* Work Experience 섹션 */}
        <section className='resume-block'>
          <h2 className='section-title'>Work Experience.</h2>
          <div className='section-content'>
            <p className='total-career'>총 4년</p>

            {/* 디딤365 */}
            <div className='work-item'>
              <h3 className='company-name'>디딤365</h3>
              <p className='work-period'>2025.02 ~ 재직중</p>
              <p className='company-desc'>주임/팀원 · 프론트엔드</p>

              <div className='work-detail'>
                <div className='work-content'>
                  <ul>
                    <li>AI 오케스트레이션 시스템 개발 - LLM 기반 시나리오 및 워크플로우 관리</li>
                    <li>React Flow를 활용한 노드·엣지 기반 시각화 구현</li>
                    <li>지식관리 시스템 구축 - 문서 업로드 및 벡터 임베딩(Embedding) 자동 생성</li>
                    <li>RAG(검색 기반 생성) 구조와 연동</li>
                    <li>모델 / 페르소나 / 도구 관리 페이지 개발</li>
                    <li>MCP(Multimodal Control Platform) 연동 - Google, YouTube 등 외부 서비스 SDK(Node.js) 기반 통합</li>
                    <li>보고서용 차트 MCP 개발 - 데이터 시각화 모듈 구현</li>
                    <li>AI 챗봇 프론트엔드 구현 - 실시간 통신(WebSocket) 기반 대화형 UI 개발</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='work-divider'></div>

            {/* 디엑스앤브이엑스 */}
            <div className='work-item'>
              <div className='company-header'>
                <h3 className='company-name'>디엑스앤브이엑스</h3>
                <span className='leave-reason'>주식 감사 정리시즌 대량 직원 권고사직</span>
              </div>
              <p className='work-period'>2024.06 - 2025.01</p>
              <p className='company-desc'>한미약품 계열사 [코스닥 상장] - 헬스케어 AI 솔루션 기업</p>

              <div className='work-detail'>
                <div className='work-content'>
                  <ul>
                    <li>AI 의료 챗봇 프론트엔드 개발 - SSE(Server-Sent Events) 기반 실시간 채팅 구현</li>
                    <li>비대면 심리상담 플랫폼 개발 - Browser API(카메라, 마이크) 활용</li>
                    <li>유전체 데이터 사이트 CLIDEX 개발 - 분포 차트를 활용한 데이터 시각화</li>
                    <li>Next.js, React Query, Zustand를 활용한 상태관리 및 데이터 페칭 최적화</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='work-divider'></div>

            {/* 일공이사 */}
            <div className='work-item'>
              <h3 className='company-name'>일공이사</h3>
              <p className='work-period'>2022.04 - 2023.11</p>
              <p className='company-desc'>디지털 에이전시 - 대기업 프로모션 및 웹사이트 개발</p>

              <div className='work-detail'>
                <div className='work-content'>
                  <ul>
                    <li>라이엇 게임즈, 스마일게이트, SKT, 현대차 제네시스 등 대기업 게임 이벤트 페이지 개발</li>
                    <li>Next.js, React.js를 활용한 이벤트 페이지 구현</li>
                    <li>아토믹 패턴(Atomic Design) 구조로 컴포넌트 설계</li>
                    <li>Figma 디자인 시안 기반 UI 개발</li>
                    <li>Zustand를 활용한 전역 상태 관리</li>
                    <li>JavaScript Debouncing 기법을 활용한 자동 저장 기능 개발</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='work-divider'></div>

            {/* 수줍은연구소 */}
            <div className='work-item'>
              <div className='company-header'>
                <h3 className='company-name'>수줍은연구소</h3>
                <span className='leave-reason'>회사 합병으로 인한 파주 이동으로 퇴사</span>
              </div>
              <p className='work-period'>2021.03 - 2022.03</p>
              <p className='company-desc'>쇼핑몰 개발</p>

              <div className='work-detail'>
                <div className='work-content'>
                  <ul>
                    <li>쇼핑몰 장바구니 기능 개발</li>
                    <li>쇼핑몰 레이아웃 개발</li>
                    <li>쇼핑몰 항목 데이터 연동</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className='divider'></div>

        {/* Skills 섹션 */}
        <section className='resume-block'>
          <h2 className='section-title'>Skills.</h2>
          <div className='section-content'>
            <div className='skills-grid'>
              <div className='skill-category'>
                <h4>기본</h4>
                <div className='skill-icons'>
                  <img src='/_assets/icon/icon_html.svg' alt='HTML' />
                  <img src='/_assets/icon/icon_css.svg' alt='CSS' />
                  <img src='/_assets/icon/icon_javascript.svg' alt='JavaScript' />
                  <img src='/_assets/icon/icon-type.svg' alt='TypeScript' />
                </div>
              </div>

              <div className='skill-category'>
                <h4>프레임워크 & 라이브러리</h4>
                <div className='skill-icons'>
                  <img src='/_assets/icon/icon_react.svg' alt='React' />
                  <img src='/_assets/icon/icon_next.svg' alt='Next.js' />
                  <img src='/_assets/icon/icon_sass.svg' alt='Sass' />
                  <img src='/_assets/icon/icon-react-query.svg' alt='React Query' />
                  <img src='/_assets/icon/icon-zus.svg' alt='Zustand' />
                </div>
              </div>

              <div className='skill-category'>
                <h4>버전관리 & CI/CD</h4>
                <div className='skill-icons'>
                  <img src='/_assets/icon/icon_git.svg' alt='Git' />
                  <img src='/_assets/icon/icon-git-action.svg' alt='GitHub Actions' />
                </div>
              </div>
            </div>

            <div className='skills-summary'>
              <ul>
                <li><strong>경험해본 기술:</strong> MUI, React Hook Form, Styled Components, Tailwind CSS, Axios, GSAP</li>
                <li><strong>자주 사용하는 기술:</strong> Next.js, React Query, Sass, Git, Zustand, TypeScript, 반응형 웹, GSAP</li>
              </ul>
            </div>
          </div>
        </section>

        <div className='divider'></div>

        {/* Education 섹션 */}
        <section className='resume-block'>
          <h2 className='section-title'>Education.</h2>
          <div className='section-content'>
            <p className='edu-item'>신안산대학교 전자 정보통신과 졸업</p>
          </div>
        </section>

        <div className='divider'></div>

        {/* Other Experience 섹션 */}
        <section className='resume-block'>
          <h2 className='section-title'>Projects.</h2>
          <div className='section-content'>
            <div className='project-list'>
              <div className='project-item'>
                <h4>스마일게이트 테일즈런너</h4>
                <p>런너의 옷장 이벤트 페이지 시리즈 개발</p>
                <a href='https://smailgate-photo.vercel.app/' target='_blank' rel='noreferrer'>→ 포토 이벤트</a>
              </div>

              <div className='project-item'>
                <h4>제네시스 수지</h4>
                <p>현대차 제네시스 공간 소개 페이지 개발</p>
                <a href='https://www.genesis.com/kr/ko/experience/space/genesis-suji.html' target='_blank' rel='noreferrer'>→ Genesis Suji</a>
              </div>

              <div className='project-item'>
                <h4>SKT 티다문구점</h4>
                <p>SKT T다이렉트샵 프로모션 페이지 개발</p>
                <a href='https://www.tidamungu.co.kr/main/subMain.view?searchCategoryId=3' target='_blank' rel='noreferrer'>→ 티다문구점</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default ResumeSection
