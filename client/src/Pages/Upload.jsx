import React from 'react';
import dehaze from '../assets/dehazed.png';
import { Link } from 'react-router-dom';

function Upload() {
  return (
    <div>
      <div class="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 p-8">
        <div class="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
          <div class="text-left">
            <h2 class="text-4xl font-extrabold leading-10 tracking-tight text-gray-800 ">
              Dehaze
              <span class="font-bold text-primary"> Images and Videos</span>
            </h2>
            <p class="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate dignissim augue, Nullam vulputate dignissim augue.
            </p>
            <div class="mt-5 sm:flex md:mt-8">
              <div class="rounded-md shadow">
                <Link to="/image-upload">
                <label htmlFor="image-upload" class="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-primary border border-transparent rounded-md cursor-pointer focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-10">
                  Upload Images
                  <input id="image-upload" name="image-upload" type="file" className="hidden" accept="image/*" />
                </label>
                </Link>
                
              </div>
              <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link to="/video-upload">
              <label htmlFor="video-upload" class="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-primary transition duration-150 ease-in-out bg-white border border-transparent rounded-md cursor-pointer  focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-10">
                  Upload Videos
                  <input id="video-upload" name="video-upload" type="file" className="hidden" accept="video/*" />
                </label>
              </Link>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pl-10">
          <div class="relative w-full p-3 rounded md:p-8">
            <div class="rounded-lg bg-white text-black w-full">
              <img src={dehaze} alt="Dehaze" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
