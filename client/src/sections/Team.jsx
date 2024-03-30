import React from 'react';
import github from '../assets/github.svg'
import linkedin from '../assets/linkedin.svg'
import team1 from '../assets/deewakar.jpeg'
import team2 from '../assets/avi.jpeg'
import team3 from '../assets/satya.jpeg'
import team4 from '../assets/ayush.jpeg'



const Team = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
      <div className='flex justify-center items-center flex-col font-serif mb-16 text-center'>
        <div>
          <p className='sm:text-2xl text-xl text-gray-700 text-center'>Our Team</p>
          <hr className='border-primary mt-2 w-[300px]' />
        </div>
        <p className='sm:text-[45px] text-[28px] font-bold mt-2 text-black'>Hands Behind Everything</p>
        </div>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <img alt="team" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={team1} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">B Deewakar Rao</h2>
                <h3 className="text-gray-500 mb-3">Full Stack Developer</h3>
                <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                <span className="inline-flex">
                  <a className="text-gray-500">
                   <img src={linkedin} alt=""  className='w-[35px]'/>
                  </a>
                  <a className="text-gray-500">
                    <img src={github} alt="" className='w-[35px]'/>
                    
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <img alt="team" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={team2} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Aviral Patel</h2>
                <h3 className="text-gray-500 mb-3">Full Stack Developer</h3>
                <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                <span className="inline-flex">
                  <a className="text-gray-500">
                   <img src={linkedin} alt=""  className='w-[35px]'/>
                  </a>
                  <a className="text-gray-500">
                    <img src={github} alt="" className='w-[35px]'/>
                    
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <img alt="team" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={team3}/>
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Satya Prakash Jena</h2>
                <h3 className="text-gray-500 mb-3">Blockchain Developer</h3>
                <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                <span className="inline-flex">
                  <a className="text-gray-500">
                   <img src={linkedin} alt=""  className='w-[35px]'/>
                  </a>
                  <a className="text-gray-500">
                    <img src={github} alt="" className='w-[35px]'/>
                    
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <img alt="team" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={team4} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Ayush Bhavsar</h2>
                <h3 className="text-gray-500 mb-3">UI and AI-ML Developer</h3>
                <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                <span className="inline-flex">
                  <a className="text-gray-500">
                   <img src={linkedin} alt=""  className='w-[35px]'/>
                  </a>
                  <a className="text-gray-500">
                    <img src={github} alt="" className='w-[35px]'/>
                    
                  </a>
                </span>
              </div>
            </div>
          </div>
          {/* Additional team members can be added similarly */}
        </div>
      </div>
    </section>
  );
}

export default Team;
