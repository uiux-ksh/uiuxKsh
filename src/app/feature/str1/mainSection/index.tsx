'use client'
import './index.css'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { initScrollSoomth } from '@/app/constant/initScrollSoomth'

gsap.registerPlugin(ScrollTrigger)

function MainSection() {
  const heroSectionRef = useRef(null)
  const spansRef = useRef<any>([])

  useEffect(() => {
    initScrollSoomth()
  }, [])
  useGSAP(() => {
    const totalSpans = spansRef.current.length
    gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: 'top top',
        end: `+=${400 + totalSpans * 100}px top`,
        scrub: 2,
        // pin: true,
        // markers: true,
        onUpdate: (self) => {
          const progress = self.progress
          spansRef.current.forEach((item: HTMLSpanElement, index: number) => {
            gsap.to(item, {
              y: -1500 * progress,
              duration: index * 0.05,
              ease: 'power1.out',
              // delay:
            })
          })
        },
      },
    })
  })
  return (
    <main id='site-main'>
      <section className='hero-section' ref={heroSectionRef}>
        <div className='container'>
          <div className='hero-content'>
            <div className='wrapper'>
              <h1 className='title'>
                <div className='first-name'>
                  {['H', 'i', ','].map((char, index) => (
                    <span
                      key={index}
                      className='name'
                      // @ts-ignore

                      ref={(el) => (spansRef.current[index] = el)}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <div className='last-name'>
                  {[' I', "'", 'm'].map((char, index) => (
                    <span
                      key={index + 3}
                      className='name'
                      // @ts-ignore

                      ref={(el) => (spansRef.current[index + 3] = el)}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </h1>
            </div>
            <div className='wrapper'>
              <h1 className='title'>
                <div className='first-name'>
                  {' '}
                  {['S', 'E', 'O', 'N', 'G'].map((char, index) => (
                    <span
                      key={index + 6}
                      className='name'
                      // @ts-ignore

                      ref={(el) => (spansRef.current[index + 6] = el)}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <div className='last-name'>
                  {[' H', 'O', 'O', 'N'].map((char, index) => (
                    <span
                      key={index + 11}
                      className='name'
                      // @ts-ignore

                      ref={(el) => (spansRef.current[index + 11] = el)}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </h1>
            </div>
          </div>
          <div className='post'>
            <div className='last-name'>
              {[' F', 'R', 'O', 'N', 'T', 'E', 'N', 'D'].map((char, index) => (
                <span
                  key={index + 11}
                  className='name'
                  // @ts-ignore

                  ref={(el) => (spansRef.current[index + 15] = el)}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className='last-name'>
              {[' D', 'E', 'V', 'E', 'L', 'O', 'P'].map((char, index) => (
                <span
                  key={index + 11}
                  className='name'
                  // @ts-ignore

                  ref={(el) => (spansRef.current[index + 23] = el)}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className='particles'>
          <div className='rectangel rectangel_0'></div>
          <div className='rectangel rectangel_1'></div>
          <div className='rectangel rectangel_2'></div>
          <div className='rectangel rectangel_3'></div>
        </div>
        <div className='Scroll'>마지막까지 스크롤 부탁드립니다 ^^</div>
      </section>
    </main>
  )
}

export default MainSection
