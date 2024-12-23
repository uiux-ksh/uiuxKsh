'use client'
import './index.css'
import SVG from '../../../../../public/_assets/city.svg'
import gsap from 'gsap'
import Image from 'next/image'
import { createRef, useLayoutEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Circle() {
  // const wheelRef = useRef(null)
  // const cardRefs = useRef([])
  //
  // if (cardRefs.current.length !== 20) {
  //   // @ts-ignore
  //   cardRefs.current = Array.from(
  //     {
  //       length: 20,
  //     },
  //     () => createRef()
  //   )
  // }
  // useLayoutEffect(() => {
  //   if (cardRefs.current && wheelRef.current) {
  //     const setup = () => {
  //       const radius = wheelRef.current.offsetWidth / 2
  //       const center = wheelRef.current.offsetWidth / 2
  //       const total = cardRefs.current.length
  //
  //       const slice = (2 * Math.PI) / total
  //       cardRefs.current.forEach((item, i) => {
  //         const angle = i * slice
  //         const x = center + radius * Math.sin(angle)
  //         const y = center - radius * Math.cos(angle)
  //         console.log(item?.current)
  //         gsap.set(item.current, {
  //           rotation: `${angle}rad`,
  //           xPercent: -50,
  //           yPercent: -50,
  //           x: x,
  //           y: y,
  //         })
  //       })
  //       gsap.to(wheelRef.current, {
  //         rotation: -360,
  //         ease: 'none',
  //         duration: cardRefs.current.length,
  //         scrollTrigger: {
  //           start: 0,
  //           end: 'max',
  //           scrub: 1,
  //           snap: 1 / cardRefs.current.length,
  //           invalidateOnRefresh: true,
  //         },
  //       })
  //     }
  //     if (wheelRef.current) {
  //       setup()
  //     }
  //   }
  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  //   }
  // }, [])
  // return (
  //   <>
  //     <header>
  //       <h1>
  //         human stories, <br />
  //         Superhunman audivisuals
  //       </h1>
  //     </header>
  //     <section className='slider-section'>
  //       <div className='wheel' ref={wheelRef}>
  //         {Array.from({ length: 20 }).map((_, index) => (
  //           <div
  //             className='wheel__card'
  //             ref={cardRefs.current[index]}
  //             key={index}
  //           >
  //             <Image src={SVG} alt={SVG} fill />
  //           </div>
  //         ))}
  //       </div>
  //     </section>
  //     <div className='scroll-down'>SCROLL DOWN</div>
  //     <div className='scroll-down-icon'>icons</div>
  //   </>
  // )
}

export default Circle
