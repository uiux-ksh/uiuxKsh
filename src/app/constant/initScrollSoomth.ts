import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

export function initScrollSoomth() {
  const lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((item) => {
    lenis.raf(item * 750)
  })
  gsap.ticker.lagSmoothing(0)
}
