'use client'
import './index.css'
import Image from 'next/image'
import Svg from '../../../../../public/_assets/city.svg'
import gsap, { Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createRef, useEffect, useRef, useState } from 'react'
import { initScrollSoomth } from '@/app/constant/initScrollSoomth'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

function splitTextIntoSpans(selector: any) {
  const elements = document.querySelectorAll(selector)
  elements.forEach((item) => {
    const [firstDigit, secondDigit] = item.innerText
    item.innerHTML = `
    <div class="digit-wrapper">
    <span class="first">${firstDigit}</span>
    <span class="second">${secondDigit}</span>
</div>
    `
  })
}

const imagesPerProject = 6
const totalImages = 50
let imageIndex = 1

function Port() {
  const containerRef = useRef([])
  const imgRefs = useRef([])
  const PreviewRef = useRef(null)
  const ProgressBarRef = useRef(null)
  const indicatorRef = useRef(null)
  const [images, setImages] = useState([])

  //useGsap
  const [scrollVelocity, setScrollVelocity] = useState(0)

  containerRef.current = Array.from(
    { length: 4 },
    (_, i) => containerRef.current[i] || createRef()
  )

  useEffect(() => {
    splitTextIntoSpans('.mask h1')
    const updateScrollVelocity = () => {
      // @ts-ignore
      const velocity = ScrollTrigger.getVelocity()
      setScrollVelocity(velocity)
    }
    const indicatorStep = 18
    const names = gsap.utils.toArray('.name')
    gsap.set(indicatorRef.current, {
      top: '0px',
    })
    const projects = gsap.utils.toArray('.project')
    projects.forEach((project, index) => {
      ScrollTrigger.create({
        // @ts-ignore
        trigger: project,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          gsap.to(indicatorRef.current, {
            top: index * indicatorStep + 'px',
            duration: 0.3,
            ease: 'power2.out',
          })
          names.forEach((name, i) => {
            // @ts-ignore
            name.classList.toggle('active', i === index)
          })
        },
        onLeaveBack: () => {
          gsap.to(indicatorRef.current, {
            top: (index - 1) * indicatorStep + 'px',
            duration: 0.3,
            ease: 'power2.out',
          })
          names.forEach((name, i) => {
            // @ts-ignore
            name.classList.toggle('active', i === index - 1)
          })
        },
      })
    })
  }, [])
  useEffect(() => {
    // @ts-ignore
    imgRefs.current = Array.from(
      { length: containerRef.current.length * imagesPerProject },
      () => createRef()
    )
    const populateGallery = () => {
      const imageArray = containerRef.current.map((_, projectIndex) => {
        const imagesContainer = []
        for (let i = 0; i < imagesPerProject; i++) {
          if (imageIndex > totalImages) imageIndex = 1
          const imgSrc = `/_assets/img${i + 1}.jpg`
          imagesContainer.push({
            src: imgSrc,
            alt: `Project ${projectIndex + 1} Image ${imageIndex}`,
          })
          imageIndex++
        }
        return imagesContainer
      })
      setImages(imageArray)
    }
    populateGallery()
  }, [imagesPerProject, totalImages])
  useEffect(() => {
    initScrollSoomth()
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      // markers: true,
      onUpdate: (self) => {
        if (ProgressBarRef.current) {
          gsap.set(ProgressBarRef.current, { scaleY: self.progress })
        }
      },
    })
    if (PreviewRef.current) {
      imgRefs.current.forEach((imgRef) => {
        // @ts-ignore
        if (imgRef.current) {
          ScrollTrigger.create({
            // @ts-ignore
            trigger: imgRef.current,
            start: 'top 50%',
            end: 'bottom 50%',
            // markers: true,
            onEnter: () => {
              if (PreviewRef.current) {
                // @ts-ignore
                PreviewRef.current.src = imgRef.current.src
              }
            },
            onEnterBack: () => {
              if (PreviewRef.current) {
                // @ts-ignore
                PreviewRef.current.src = imgRef.current.src
              }
            },
          })
        }
      })
    }
  }, [imgRefs, images])

  const MaskRef = useRef([])
  MaskRef.current = Array.from(
    { length: 4 },
    (_, i) => MaskRef.current[i] || createRef()
  )
  useGSAP(() => {
    const projects = gsap.utils.toArray('.project')
    let activeIndex = 0

    projects.forEach((project, i) => {
      gsap.set([`.mask`, '.digit-wrapper', '.first', '.second'], {
        y: 0,
      })
      gsap.set('.mask', {
        position: 'absolute',
        top: 0,
      })

      ScrollTrigger.create({
        // @ts-ignore
        trigger: project,
        start: 'top bottom',
        end: 'botom top',
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          console.log(self.getVelocity())
          // @ts-ignore
          const projectRect = project.getBoundingClientRect()
          const windowCenter = window.innerHeight / 2
          const nextProject = projects[i + 1]
          const prevProject = projects[i - 1]

          const velocityAdjustment = Math.min(self.getVelocity() * 0.1 * 100)
          const pushPoint =
            window.innerHeight *
            (0.85 + velocityAdjustment / window.innerHeight)

          if (projectRect.top <= windowCenter) {
            // @ts-ignore
            if (!MaskRef.current[i].current.dataset.isFixed) {
              // @ts-ignore
              MaskRef.current[i].current.dataset['isFixed'] = true
              gsap.set('.mask', {
                position: 'fixed',
                top: '50vh',
              })
            }
            if (nextProject) {
              // @ts-ignore
              const nextRect = nextProject.getBoundingClientRect()
              const ActiveIndex = i + 1
              if (nextRect.top <= pushPoint && activeIndex !== i + 1) {
                activeIndex = i + 1
                gsap.killTweensOf([`.mask`, '.digit-wrapper', '.first'])

                gsap.to('.mask', {
                  y: -80,
                  duration: 0.3,
                  ease: Power2.easeOut,
                  overwrite: true,
                })

                gsap.to('.digit-wrapper', {
                  y: -80,
                  duration: 0.5,
                  delay: 0.5,
                  ease: Power2.easeOut,
                  overwrite: true,
                })

                gsap.to('.first', {
                  y: -80,
                  duration: 0.75,
                  ease: Power2.easeOut,
                  overwrite: true,
                })

                gsap.to('.second', {
                  y: -80,
                  duration: 0.75,
                  delay: 0.1,
                  ease: Power2.easeOut,
                  overwrite: true,
                })
              }
            } else {
              MaskRef.current[i].current.dataset['isFixed'] = false
              gsap.set('.mask', {
                position: 'absolute',
                top: 0,
              })
            }

            if (self.direction === -1 && projectRect.top >= windowCenter) {
              MaskRef.current[i].current.dataset['isFixed'] = false
              gsap.set('.mask', {
                position: 'absolute',
                top: 0,
              })

              if (i > 0 && activeIndex === i) {
                if (prevProject) {
                  gsap.killTweensOf([
                    `.mask`,
                    '.digit-wrapper',
                    '.first',
                    '.second',
                  ])
                  activeIndex = i - 1
                }
              }
            }
          }
        },
      })
    })
  })

  return (
    <div>
      <nav>
        <a href=''>index</a>
        <a href=''>Watch Showreel</a>
      </nav>
      <div className='nav-items'>
        <a href=''>Work,</a>
        <a href=''>Portfilo</a>
        <a href=''>Contact, </a>
      </div>
      <div className='whitespace w-1'></div>
      <div className='gallery'>
        {containerRef.current.map((ref, index) => (
          <div className='project' ref={ref} key={index}>
            <div className='index'>
              <div className='mask' ref={MaskRef.current[index]}>
                <h1>{`0${index + 1}`}</h1>
              </div>
              <div className='images'>
                {images[index] &&
                  images[index].map((image, i) => (
                    <div className='img' key={i}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        ref={imgRefs.current[index * imagesPerProject + i]}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='whitespace w-2'></div>

      <div className='project-names'>
        <div className='indicator' ref={indicatorRef}>
          <div className='symbol'></div>
        </div>
        <div className='name active'>
          <p>a1</p>
        </div>
        <div className='name'>
          <p>a2</p>
        </div>
        <div className='name'>
          <p>a3</p>
        </div>
        <div className='name'>
          <p>a4</p>
        </div>
      </div>

      <div className='preview-img'>
        <Image src={Svg} alt={Svg} fill ref={PreviewRef} />
      </div>

      <div className='progress-bar' ref={ProgressBarRef}></div>
      <div className='footer'>
        <p>Protfolio 2024</p>
      </div>
    </div>
  )
}

export default Port
