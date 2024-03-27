import React from 'react'
import Carousel from '../components/Carousal'
import bannerBottom from '../assets/bannerBottom.png'
function Section1() {
  return (
    <div>
        <Carousel/>
        <img src={bannerBottom} alt="" className='w-full relative lg:bottom-[18vh] md:bottom-[15vh] hidden md:block'/>
    </div>
  )
}

export default Section1
