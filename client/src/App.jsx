import './App.css'
import Navbar from './components/Navbar'
import Section1 from './sections/Section1'
import Services from './sections/Services'
import About from './sections/About'
import { Footer } from './components/Footer'
import Gallery from './sections/Gallery'
import Team from './sections/Team'
function App() {

  return (
    <>
    <Navbar/>
    <Section1/>
    <About/>
    <Services/>
    <Gallery/>
    <Team/>
    <Footer/>
    </>
  )
}

export default App
