'use client'

import './index.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ProfileSection() {
  useGSAP(() => {
    gsap.set('.panel', { zIndex: (i, target, targets) => targets.length - i })
    const images = gsap.utils.toArray(' .panel:not(.purple)')
    images.forEach((image, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'section.black',
          start: () => 'top -' + window.innerHeight * (i + 0.5),
          end: () => '+=' + window.innerHeight,
          scrub: true,
          toggleActions: 'play none reverse none',
          invalidateOnRefresh: true,
        },
      })
      // @ts-ignore
      tl.to(image, { width: 0 })
    })

    gsap.set('.panel-text', {
      zIndex: (i, target, targets) => targets.length - i,
    })

    const texts = gsap.utils.toArray('.panel-text')

    texts.forEach((text, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'section.black',
          start: () => 'top -' + window.innerHeight * i,
          end: () => '+=' + window.innerHeight,
          scrub: true,
          toggleActions: 'play none reverse none',
          invalidateOnRefresh: true,
          // markers: true,
        },
      })

      // @ts-ignore
      tl.to(text, { duration: 0.33, opacity: 1, y: '18%' }).to(
        // @ts-ignore
        text,
        { duration: 0.33, opacity: 0, y: '0%' },
        0.66
      )
    })

    ScrollTrigger.create({
      trigger: 'section.black',
      scrub: true,
      // markers: true,
      pin: true,
      start: () => 'top top',
      end: () => '+=' + (images.length + 1) * window.innerHeight,
      invalidateOnRefresh: true,
    })
  })
  return (
    <>
      {/*<section className='orange'>*/}
      {/*  <div className='text'>This is some text inside of a div block.</div>*/}
      {/*</section>*/}

      <section className='black'>
        <div className='text-wrap'>
          <div className='panel-text blue-text'>
            <h1>PROFILE</h1>
            <p>
              안녕하세요! <br />
              노를 저어가듯, 꾸준히 노력하는 <br />
              3년차 프론트엔드 개발자 김성훈입니다.
            </p>
            <ul>
              <li>
                <pre>학력: 신안산대학교 전자 정보통신과</pre>
              </li>
              <li>
                <pre>이메일: uiux-ksh@naver.com</pre>
              </li>
              <li>
                <pre>전화번호: 01036795721</pre>
              </li>
              <li>
                <pre>생년월일: 1996년9월7일</pre>
              </li>
            </ul>
          </div>
          <div className='panel-text red-text'>
            <h1>SKILLS</h1>
            <div className='icon-wrap'>
              <h3>기본</h3>
              <div>
                <img src='/_assets/icon/icon_html.svg' alt='HTML이미지' />
                <img src='/_assets/icon/icon_css.svg' alt='css이미지' />
                <img src='/_assets/icon/icon_javascript.svg' alt='JS이미지' />
                <img src='/_assets/icon/icon-type.svg' alt='TS이미지' />
              </div>
            </div>

            <div className='icon-wrap2'>
              <h3>자주 사용하는 기술</h3>
              <div>
                <img src='/_assets/icon/icon_react.svg' alt='react' />
                <img src='/_assets/icon/icon_next.svg' alt='next이미지' />
                <img src='/_assets/icon/icon_sass.svg' alt='sass이미지' />
                <img
                  src='/_assets/icon/icon-react-query.svg'
                  alt='react-query'
                />
                <img src='/_assets/icon/icon-zus.svg' alt='상태관리' />
              </div>
            </div>
          </div>
          <div className='panel-text orange-text'>
            <h1>SKILLS-II</h1>
            <div className='icon-wrap'>
              <h3>버전관리 및 CI/CD</h3>
              <div>
                <img src='/_assets/icon/icon_git.svg' alt='git이미지' />
                <img
                  src='/_assets/icon/icon-git-action.svg'
                  alt='gitAction이미지'
                />
              </div>
            </div>

            <div className='detail'>
              <h3>정리</h3>
              <pre>
                경험해본 기술:mui,react-hooks-form, <br />
                styled-componets,tailwind,axios,gsap <br />
              </pre>

              <pre>
                자주 사용하는 기술:next.js,react-query,sass, <br />
                git,zustand,typescript
              </pre>
            </div>
          </div>
          <div className='panel-text purple-text'>
            <h1>history</h1>
            <div className='text-wrap'>
              <h5>디엑스앤브이엑스</h5>
              <pre>
                <span> 한미약품계열사[코스닥상장]</span>
                <span>-비대면 심리상담 플랫폼 프론트엔드개발</span>
                <span>-AI 의료 챗봇 프론트엔드 개발 </span>
                <span>-유전체 데이터 사이트 CLIDEX 페이지 프론트엔드 개발</span>
              </pre>

              <h5>일공이사</h5>
              <pre>
                <span>-리그오브레전드 5월 꿀토큰 PC방 이벤트 페이지 개발</span>
                <span>
                  -리그오브레전드 7월 별수호자 PC방 이벤트 페이지 개발
                </span>
                <span>-스마일게이트 이벤트 페이지 개발</span>
                <span>-현대차 제네시스 기업페이지 개발</span>
                <span>-SKT T다이렉트샵 티다문구점페이지 개발</span>
                <span>-영림 인테리어 홈페이지 개발</span>
              </pre>
            </div>
          </div>
        </div>

        <div className='p-wrap'>
          <img src='/_assets/me.jpg' alt='이미지' className='p-img' />
          <div className='panel blue'></div>
          <div className='panel red'></div>
          <div className='panel orange'></div>
          <div className='panel purple'></div>
        </div>
      </section>
    </>
  )
}

export default ProfileSection
