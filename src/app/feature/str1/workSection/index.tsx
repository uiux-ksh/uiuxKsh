'use client'
import './index.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function WorkSection() {
  useGSAP(() => {
    const workTitle = gsap.timeline({
      scrollTrigger: {
        trigger: '.particlpate-title h2',
        scrub: 2,
        // @ts-ignore
        ease: 'linear',
      },
    })
    const spans = document.querySelectorAll('.particlpate-title h2 span')
    spans.forEach((el) => {
      workTitle.to(el, {
        y: 0,
      })
    })
  })
  return (
    <section className='work-section' id='work'>
      <div className='contaner'>
        <h1 className='work-title'>participate</h1>
        <div className='particlpate-title'>
          <h2 className='pt-1'>
            <span>Roit Games</span>
          </h2>
          <h2>
            <span>Smail gate</span>
          </h2>
          <h2>
            <span>SKT</span>
          </h2>
          <h2>
            <span>Genesis(Hyundai)</span>
          </h2>
          <h2>
            <span>Yeongrim Interior</span>
          </h2>
        </div>

        <ul className='particle-img'>
          <li>
            <a
              href='https://events.kr.riotgames.com/hangawistore2022'
              target='_blank'
            >
              <img src='/_assets/particle-img1.png' alt='라이엇이미지' />
            </a>
          </li>
          <li>
            <a
              href='https://events.kr.riotgames.com/porostore2'
              target='_blank'
            >
              <img src='/_assets/particle-img2.jpg' alt='포로이미지' />
            </a>
          </li>
          <li>
            <a href='https://smailgate-photo.vercel.app/' target='_blank'>
              <img src='/_assets/particle-img3.jpg' alt='테일즈런너 사진' />
            </a>
          </li>
          <li>
            <a
              href='https://tr.rhaon.co.kr/promotion/frame/runner-closet/80/%EB%B0%94%EC%9A%B0%EB%82%98%EB%B9%84%20%EC%95%84%EC%9D%BC%EB%9E%9C%EB%93%9C%20Vol.01'
              target='_blank'
            >
              <img src='/_assets/particle-img4.jpg' alt='런너의 옷장' />
            </a>
          </li>
          <li>
            <a
              href='https://tr.rhaon.co.kr/promotion/frame/runner-closet/82/TRADITIONAL%20COLLECTION'
              target='_blank'
            >
              <img src='/_assets/particle-img5.jpg' alt='런너의 옷장' />
            </a>
          </li>
          <li>
            <a
              href='https://tr.rhaon.co.kr/promotion/frame/runner-closet/92/%EA%B0%9C%EB%B0%9C%EC%9E%90%20%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C%20Vol.02'
              target='_blank'
            >
              <img src='/_assets/particle-img6.jpg' alt='런너의 옷장' />
            </a>
          </li>
          <li>
            <a
              href='https://www.genesis.com/kr/ko/experience/space/genesis-suji.html'
              target='_blank'
            >
              <img src='/_assets/particle-img7.jpg' alt='제네시스' />
            </a>
          </li>

          <li>
            <a
              href='https://tr.rhaon.co.kr/promotion/frame/runner-closet/79/%EB%B0%94%EC%9A%B0%EB%82%98%EB%B9%84%20%EC%95%84%EC%9D%BC%EB%9E%9C%EB%93%9C%20Vol.02'
              target='_blank'
            >
              <img src='/_assets/particle-img8.jpg' alt='런너의 옷장' />
            </a>
          </li>
          <li>
            <a
              href='https://www.tidamungu.co.kr/main/subMain.view?searchCategoryId=3'
              target='_blank'
            >
              <img src='/_assets/particle-img9.jpg' alt='티다' />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default WorkSection
