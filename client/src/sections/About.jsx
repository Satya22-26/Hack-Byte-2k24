import React from 'react'
import about from '../assets/about-1.jpg'
function About() {
  return (
    <div className='flex xl:h-[110vh] h-auto w-full font-serif xl:flex-row flex-col justify-center items-center gap-28 xl:gap-0 xl:mt-0 mt-32'>
      <div className='h-full xl:w-[50%] sm:w-[90%] w-[100%] flex justify-center items-center'>
          <div className='h-full items-center justify-center flex w-[90%] xl:bg-secondary'>
            <img src={about} alt="" className='relative md:left-20 left-16'/>
            <div className='relative xl:right-[35vw] lg:right-[45vw] md:right-[55vw] right-[75vw] sm:top-[45vh] top-[29vh] text-white bg-primary sm:h-[200px] h-[160px] w-[180px] flex flex-col justify-center items-center text-center '>
                <p className='text-[35px]'>30</p>
                <p className='text-2xl'>Years of Experience</p>
            </div>
          </div> 
      </div>
      <div className='h-full w-[50%]  flex justify-center items-start text-gray-700'>
        <div className='flex flex-col xl:w-[80%] text-start gap-8'>
        <div >
          <p className='sm:text-2xl text-xl text-gray-700 text-center'>About our firbrigs</p>
          <hr className='border-primary mt-2' />
        </div>
        <p className='sm:text-[40px] text-[28px] font-bold mt-2 text-black text-center'>Premier Fire & Rescue System Services</p>
        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam laboriosam molestias aperiam. Quisquam tempore doloremque magnam animi voluptatem officiis corrupti nihil, tempora impedit inventore dignissimos unde eum quae </p>
        <ul class="list-disc">
            <li>
            If you are going to use a passage of you need Lorem ipsum dolor sit amet consectetur adipisicing elit.  
            </li>
            <li>If you are going to use a passage of you need Lorem ipsum dolor sit amet, consectetur adipisicing.</li>
            <li>If you are going to use a passage of you need Lorem ipsum dolor sit amet consectetur.</li>
        </ul>
        <button className='px-12 py-6 w-[300px] bg-primary mt-8 text-white'>
              DISCOVER MORE
            </button>
        </div>
      
      </div>
    </div>
  )
}

export default About
