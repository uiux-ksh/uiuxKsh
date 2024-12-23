import './index.css'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function HorizontalSection() {
  const HorizontalRef = useRef(null)
  useGSAP(() => {
    gsap.to(HorizontalRef.current, {
      // @ts-ignore
      x: () => HorizontalRef.current.scrollWidth * -1,
      duration: 4,
      xPercent: 100,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: '.horizontal-scroll-wrapper',
        start: 'center center',
        end: '+=1200px top',
        scrub: 2,
        pin: true,
        invalidateOnRefresh: true,
      },
    })

    gsap.fromTo(
      '.titles',
      {
        y: -1000,
        scale: 5.2,
      },
      {
        y: 280,
        scale: 0,
        duration: 1,
        scrollTrigger: {
          trigger: 'titles',
          end: 'bottom top',
          invalidateOnRefresh: true,
          scrub: 2,
          // markers: true,
        },
      }
    )
  })
  return (
    <>
      <div className='title-wrap'>
        <h1 className='titles'>Project Site</h1>
      </div>
      <section className='horizontal-scroll-wrapper'>
        <div className='horizontal' ref={HorizontalRef}>
          <a
            href='https://events.kr.riotgames.com/pcbhoney2023'
            target='_blank'
          >
            <div>
              <span className='bg'></span>
              <img src='/_assets/riot_1.jpg' alt='꿀토큰' />
            </div>
          </a>
          <a
            href='https://events.kr.riotgames.com/starguardian-pcb'
            target='_blank'
          >
            <div>
              <span className='bg'></span>
              <img src='/_assets/riot_2.png' alt='별수호자' />
            </div>
          </a>
          <a href='https://m.tidamungu.co.kr/main/main.view' target='_blank'>
            <div>
              <span className='bg'></span>
              <img src='/_assets/tida.jpg' alt='티다 문구점' />
            </div>
          </a>
          <a
            href='https://www.genesis.com/kr/ko/experience/space/genesis-gangnam.html'
            target='_blank'
          >
            <div>
              <span className='bg'></span>
              <img src='/_assets/car.jpg' alt='제네시스' />
            </div>
          </a>
          <a href='https://smailgate-ivod.vercel.app/' target='_blank'>
            <div>
              <span className='bg'></span>
              <img src='/_assets/smailgate.jpg' alt='스마일게이트' />
            </div>
          </a>
          <a href='https://yl.co.kr/' target='_blank'>
            <div>
              <span className='bg'></span>
              <img src='/_assets/yung.jpg' alt='영림' />
            </div>
          </a>

          <a href='https://www.dxvx.com/leadership' target='_blank'>
            <div>
              <span className='bg'></span>
              <img src='/_assets/dxvx.png' alt='dxvx' />
            </div>
          </a>
        </div>
      </section>
    </>
  )
}

export default HorizontalSection
