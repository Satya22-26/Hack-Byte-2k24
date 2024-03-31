import './App.css'
import Navbar from './components/Navbar'
import { Footer } from './components/Footer'
import Home from './Pages/Home'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Upload from './Pages/Upload';
function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/upload" element={<Upload/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
