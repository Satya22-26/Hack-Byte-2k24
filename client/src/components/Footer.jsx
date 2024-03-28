import React from 'react';
import logo2 from '../assets/logo-2.png';
import bg from '../assets/footer-bg-1.jpg'
export function Footer() {
  return (
    <section className="relative overflow-hidden py-10 text-white font-serif " style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}} >
        <div style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}} className='h-full'>
        <div className="relative z-10 mx-auto max-w-7xl px-4 " >
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <img src={logo2} className='h-[15vh]' alt="" />
              </div>
              <div>
                <p className="mb-4  text-base font-medium">Discover The Epitome of High Fashion</p>
                <p className="text-sm text-white">
                  &copy; Copyright 2024. All Rights Reserved by Fashion.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white">
                Website
              </h3>
              <ul>
                <li className="mb-4">
                  <a className=" text-base font-medium text-slate-300 hover:text-gray-500" href="#">
                    Home
                  </a>
                </li>
                <li className="mb-4">
                  <a className=" text-base font-medium text-slate-300 hover:text-gray-500" href="#">
                    Shop-Now
                  </a>
                </li>
                <li className="mb-4">
                  <a className=" text-base font-medium text-slate-300 hover:text-gray-500" href="#">
                    Orders
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white">
                Contact Us
              </h3>
              <ul>
                <li className="mb-4">
                  <a className=" text-base font-medium text-slate-300 hover:text-gray-500" href="#">
                    63786450
                  </a>
                </li>
                <li className="mb-4">
                  <a className=" text-base font-medium text-slate-300 hover:text-gray-500" href="#">
                    fashion@gmail.com
                  </a>
                </li>
                <li className="mb-4">
                  <a className=" text-base font-medium text-slate-300 hover:text-gray-500" href="#">
                    www.fashion.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <a className=" text-base font-medium text-slate-300 hover:text-gray-500" href="#">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="mb-4">
                  <a className=" text-base font-medium text-slate-300 hover:text-gray-500" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className=" text-base font-medium text-slate-300 hover:text-gray-500" href="#">
                    Licensing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
        </div>
      
    </section>
  );
}
