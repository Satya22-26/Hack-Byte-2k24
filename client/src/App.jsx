import './App.css'
import Navbar from './components/Navbar'
import { Footer } from './components/Footer'
import Home from './Pages/Home'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Upload from './Pages/Upload';
import ImageUpload from './Pages/ImageUpload';
import RealTimeDehaze from './Pages/RealTimeDehaze';
import Video from './Pages/Video';
import Alert from './Pages/Alert'
function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/upload" element={<Upload/>} />
    <Route path="/image-upload" element={<ImageUpload/>} />
    <Route path='/real-time' element={<RealTimeDehaze/>}/>
    <Route path='/video-upload' element={<Video/>}/>
    <Route path='/alert' element={<Alert/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
