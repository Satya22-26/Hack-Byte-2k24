import './App.css'
import Navbar from './components/Navbar'
import Section1 from './sections/Section1'
import Services from './sections/Services'
import About from './sections/About'
import { Footer } from './components/Footer'
function App() {

  return (
    <>
    <Navbar/>
    <Section1/>
    <About/>
    <Services/>
    <Footer/>
    </>
  )
}

export default App
