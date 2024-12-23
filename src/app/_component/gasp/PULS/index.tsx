'use client'
import './index.css'
import gsap from 'gsap'
// import { ReactLenis } from '@studio-freight/react-lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import City from '../../../../../public/_assets/city.svg'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

function Plus() {
  // const lenisRef = useRef(null)
  const pinnedRef = useRef(null)
  const whitespaceRef = useRef(null)
  const HeaderInfoRef = useRef(null)
  useEffect(() => {
    if (pinnedRef.current && whitespaceRef.current && HeaderInfoRef.current) {
      ScrollTrigger.create({
        trigger: pinnedRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        endTrigger: whitespaceRef.current,
      })
      ScrollTrigger.create({
        trigger: HeaderInfoRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        endTrigger: whitespaceRef.current,
      })
      ScrollTrigger.create({
        trigger: pinnedRef.current,
        start: 'top top',
        end: 'bottom bottom',
        endTrigger: HeaderInfoRef.current,
        onUpdate: (self) => {
          const rotation = self.progress * 360
          gsap.to('.revealer', { rotation })
        },
      })
      ScrollTrigger.create({
        trigger: pinnedRef.current,
        start: 'top top',
        endTrigger: HeaderInfoRef.current,
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress
          const clipPath = `polygon( 
          ${45 - 45 * progress}% ${0 + 0 * progress}%,
           ${55 + 45 * progress}% ${0 + 0 * progress}%, 
           ${55 + 45 * progress}% ${100 - 0 * progress}%, 
           ${45 - 45 * progress}% ${100 - 0 * progress}%
           )`
          gsap.to('.revealer-1, .revealer-2', {
            clipPath: clipPath,
            ease: 'none',
            duration: 0,
          })
        },
      })

      ScrollTrigger.create({
        trigger: HeaderInfoRef.current,
        start: 'top top',
        end: 'bottom 50%',
        scrub: 1,
        onUpdate: (self) => {
          const { progress } = self
          const left = 35 + 15 * progress
          gsap.to('.revealer', {
            left: `${left}%`,
            ease: 'none',
            duration: 0,
          })
        },
      })

      ScrollTrigger.create({
        trigger: whitespaceRef.current,
        start: 'top 50%',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const scale = 1 + 15 * self.progress
          gsap.to('.revealer', {
            scale: scale,
            ease: 'none',
            duration: 0,
          })
        },
        // markers: true,
      })
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    // <ReactLenis ref={lenisRef} autoRaf={false}>
    <div className='continaer'>
      <section className='hero'>
        <h1>Motion</h1>
      </section>
      <section className='info'>
        <div className='header-rows'>
          <div className='header-row'>
            <h1>Motion</h1>
          </div>
          <div className='header-row'>
            <h1>Stills</h1>
          </div>
        </div>
      </section>
      <section className='header-info' ref={HeaderInfoRef}>
        <p>
          아무글쓰나 쓰자아무글쓰나 쓰자아무글쓰나 쓰자아무글쓰나 쓰자아무글쓰나
          쓰자아무글쓰나 쓰자아무글쓰나 쓰자아무글쓰나 쓰자
        </p>
        <div className='header-images'>
          <div className='img'>
            <Image src={City} alt={City} />
          </div>
          <div className='img'>
            <Image src={City} alt={City} fill />
          </div>
          <div className='img'>
            <Image src={City} alt={City} fill />
          </div>
          <div className='img'>
            <Image src={City} alt={City} fill />
          </div>
        </div>
      </section>
      <section className='whitespace' ref={whitespaceRef}></section>
      <section className='pinned' ref={pinnedRef}>
        <div className='revealer'>
          <div className='revealer-1'></div>
          <div className='revealer-2'></div>
        </div>
      </section>

      <section className='website-content'>
        <h1>
          아무거나쓸게2아무거나쓸게2아무거나쓸게2아무거나쓸게2아무거나쓸게2아무거나쓸게2아무거나쓸게2
        </h1>
      </section>
    </div>
    // </ReactLenis>
  )
}

export default Plus
