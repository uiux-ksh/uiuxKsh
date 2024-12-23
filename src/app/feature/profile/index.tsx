'use client'
import './index.css'
import { useRef } from 'react'
import { Circ, Expo, gsap, Power2, Power3 } from 'gsap'
import { useGSAP } from '@gsap/react'

function Profile() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const navRef = useRef(null)

  useGSAP(() => {
    gsap.to(rightRef.current, {
      duration: 2,
      delay: 0.6,
      width: '50%',
      ease: Power3.easeInOut,
    })
    gsap.to(leftRef.current, {
      duration: 2,
      delay: 0.8,
      width: '50%',
      ease: Power2.easeInOut,
    })
    gsap.from(navRef.current, {
      duration: 2,
      delay: 0.8,
      opacity: 0,
      ease: Expo.easeInOut,
    })

    gsap.from('.text h1', {
      duration: 2,
      delay: 0.6,
      x: 1000,
      ease: Circ.easeInOut,
    })
    gsap.from('.text p', {
      duration: 2,
      delay: 0.7,
      x: 1000,
      ease: Circ.easeInOut,
    })

    gsap.to('.karina', {
      duration: 2,
      delay: 1,
      width: '750px',
      ease: Power2.easeInOut,
    })
    gsap.from('.bottomnav ul li', {
      duration: 2,
      delay: 1,
      x: 1000,
      ease: Circ.easeInOut,
    })

    gsap.from('.info', {
      duration: 2,
      delay: 1.5,
      y: 100,
      ease: Circ.easeInOut,
    })

    gsap.from('.name', {
      duration: 2,
      delay: 1.2,
      x: -1200,
      ease: Power2.easeInOut,
    })
  })

  return (
    <section>
      <div className='wrapper'>
        <div className='left' ref={leftRef}></div>
        <div className='right' ref={rightRef}></div>

        <nav className='nav' ref={navRef}>
          <ul>
            <li className='logo'>unsplash</li>
            <li className='menu'>
              <i className='fa fa-bars'></i>
            </li>
            <li className='collection'>collection</li>
            <li className='explore'>explore</li>
            <li className='search'>search</li>
            <li className='profile'>
              <div className='img'></div>
            </li>
          </ul>
        </nav>

        <div className='content'>
          <div className='img-wrapper'>
            <div className='karina'></div>
          </div>

          <div className='info'>
            <ul>
              <li>unsplash.com</li>
              <li>@karinates</li>
              <li>karinates.com</li>
              <li>
                <i className='fa fa-share-alt'></i>
              </li>
            </ul>
          </div>

          <div className='text'>
            <h1>김성훈</h1>
            <p>프론트엔드 개발자</p>
          </div>

          <div className='name'>seonghoonKim</div>

          <div className='bottomnav'>
            <ul>
              <li>profile</li>
              <li>portfolio</li>
              <li>contact</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
