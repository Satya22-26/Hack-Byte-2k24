import React, { useEffect, useRef } from 'react';
import gal1 from "../assets/gallery-1.jpg";
import gal2 from "../assets/gallery-2.jpg";
import gal3 from "../assets/gallery-3.jpg";
import gal4 from "../assets/gallery-4.jpg";
import gal5 from "../assets/service-1.jpg";

const Gallery = () => {
  return (
    <>
    <div className='flex justify-center items-center flex-col font-serif mb-16 text-center'>
        <div>
          <p className='sm:text-2xl text-xl text-gray-700 text-center'>Gallery</p>
          <hr className='border-primary mt-2 w-[300px]' />
        </div>
        <p className='sm:text-[45px] text-[28px] font-bold mt-2 text-black'>Memories Of Saving Lives</p>
        </div>
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
      <div className="-m-1 flex flex-wrap md:-m-2">
        <div className="flex w-1/2 flex-wrap">
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={gal1}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={gal2}
            />
          </div>
          <div className="w-full p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={gal5}
            />
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={gal4}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={gal3}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={gal1}
            />
          </div>
        </div>
      </div>
    </div>
    
    
    </>
  );
};

export default Gallery;
