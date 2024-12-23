'use client'
import './GASP.css'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CitySVG from '../../../../public/_assets/city.svg'

gsap.registerPlugin(ScrollTrigger)

function CityAnimation() {
  const [svgContent, setSvgContent] = useState<null | string>(CitySVG)
  const cityRef = useRef(null)

  useEffect(() => {
    const loadSVG = async () => {
      try {
        const response = await fetch('/_assets/city.svg')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const svg = await response.text()
        setSvgContent(svg)
      } catch (error) {
        console.error('Error fetching SVG:', error)
      }
    }
    loadSVG()
  }, [])

  useEffect(() => {
    if (svgContent && cityRef.current) {
      // @ts-ignore
      const svgElement = cityRef.current.firstElementChild
      if (svgElement && svgElement.tagName === 'svg') {
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid slice')
        let runAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: cityRef.current,
            start: 'top top',
            end: '+=1000',
            scrub: true,
            pin: true,
          },
        })
        runAnimation
          .add([
            gsap.to(svgElement, 2, { scale: 1.5 }),
            gsap.to('#full_city', 2, { opacity: 0 }),
          ])
          .add([
            gsap.to('#building_top', 2, {
              y: -200,
              opacity: 0,
            }),
            gsap.to('#wall_side', 2, { x: -200, opacity: 0 }),
            gsap.to('#wall_front', 2, {
              x: 200,
              y: 200,
              opacity: 0,
            }),
          ])
          .add([
            gsap.to('#interior_wall_side', 2, {
              x: -200,
              opacity: 0,
            }),
            gsap.to('#interior_wall_top', 2, {
              y: -200,
              opacity: 0,
            }),
            gsap.to('#interior_wall_side_2', 2, { opacity: 0 }),
            gsap.to('#interior_wall_front', 2, {
              x: 200,
              y: 200,
              opacity: 0,
            }),
          ])
      }
    }
  }, [svgContent])

  return (
    <div>
      <header>
        <div className='logo'></div>
        <nav>
          <ul>
            <li className='active'>Home</li>
            <li>Contact</li>
            <li>About</li>
          </ul>
        </nav>
      </header>
      <div className='banner'>
        {/*<div id='bg_city'></div>*/}
        <div
          id='bg_city'
          ref={cityRef}
          // @ts-ignore
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
        <div className='content'>
          <div className='item'>
            <div>
              <p>LUNDEV CHANNEL</p>
              <p>DEVELOPER & DESIGNER</p>
            </div>
            <div>
              <p>CONTENT CREATER</p>
              <p>ALL LANGUAGE</p>
            </div>
          </div>
          <div className='item title'>
            <p>Hong Kong</p>
            <p>real estate</p>
          </div>
        </div>
      </div>
      <main>
        <div className='friend'>
          <div className='me'>
            <h1>Lun Dev</h1>
            <h2>Developer & Designer</h2>
            <p>
              Please like and subscribe to the channel to watch many interesting
              videos <br /> about programming and web design
            </p>
          </div>
          <ul>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>7</li>
            <li>7</li>
          </ul>
        </div>
        <div className='lorem'>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of <br /> Lorem Ipsum, you need to
          be sure there isn't anything embarrassing hidden in the middle of
          text. All the Lorem Ipsum generators on the Internet tend to repeat
          predefined chunks as necessary, making this the first true generator
          on the Internet. It uses a dictionary of over 200 Latin words,
          combined with a handful of model sentence structures, to generate
          Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
          therefore always free from repetition, injected humour, or
          non-characteristic words etc. Contrary to popular belief, Lorem Ipsum
          is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney <br /> College in
          Virginia, looked up one of the more obscure Latin words, consectetur,
          from a Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. Lorem Ipsum is simply
          dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the
          leap into electronic typesetting, remaining essentially unchanged. It
          was popularised in the 1960s with the release of Letraset sheets
          containing <br />
          <br /> Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum. It is
          a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using <br /> 'Content here, content here',
          making it look like readable English. Many desktop publishing packages
          and web page editors now use Lorem Ipsum as their default model text,
          and a search for 'lorem ipsum' will uncover many web sites still in
          their infancy. <br />
          <br /> Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </div>
      </main>
    </div>
  )
}

export default CityAnimation
