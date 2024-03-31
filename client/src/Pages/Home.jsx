import React from 'react'
import Section1 from '../sections/Section1'
import Services from '../sections/Services'
import About from '../sections/About'
import Gallery from '../sections/Gallery'
import Team from '../sections/Team'
function Home() {
  return (
    <div>
    <Section1/>
    <About/>
    <Services/>
    <Gallery/>
    <Team/>
    </div>
  )
}

export default Home
