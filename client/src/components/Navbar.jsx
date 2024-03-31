import React, { useState } from 'react';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo-2.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className='h-[15vh] flex justify-between md:px-8 px-2 items-center font-serif'>
        <div>
          <img src={logo} alt="" className='h-[10vh]'/>
        </div>
        <div>
          <div className='flex gap-8 items-center'>
            <div className='md:flex gap-8 items-center hidden'>
              <a href="/">Home</a>
              <a href="">About Us</a>
              <a href="">Services</a>
              <a href="/upload">Upload</a>
            </div>
            <button className='bg-primary px-2 py-1 md:hidden' onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          </div>
        </div>
      </div>
      <div className={`w-full h-[100vh] flex ${menuOpen ? 'fixed inset-0 z-10' : 'hidden'}`}>
        <div className='w-[20%] bg-primary h-full'>

        </div>
        <div className='w-[80%] bg-black h-[100vh] flex flex-col items-center gap-24'>
          <div className='flex w-full justify-between items-center px-4 h-[15vh]'>
            <img src={logo2} alt="" className='h-[10vh]'/>
            <button className='text-white' onClick={() => setMenuOpen(false)}>🗙</button>
          </div>
          <div className='flex flex-col text-white items-start gap-4'>
            <div>
              <a href="/">Home</a>
              <hr className="absolute left-[21vw] right-[1vw] border-white  my-2" />
            </div>
            <div>
              <a href="">About Us</a>
              <hr className="absolute left-[21vw] right-[1vw] border-white  my-2" />
            </div>
            <div>
              <a href="">Services</a>
              <hr className="absolute left-[21vw] right-[1vw] border-white  my-2" />
            </div>
            <div>
              <a href="/upload">Upload</a>
              <hr className="absolute left-[21vw] right-[1vw] border-white  my-2" />
            </div>
          </div>
        </div>
      
      </div>
    </>
  );
}

export default Navbar;
