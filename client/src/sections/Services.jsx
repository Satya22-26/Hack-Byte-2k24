import React from 'react';
import service1 from '../assets/service-1.jpg';
import service2 from '../assets/service-2.jpg';
import service3 from '../assets/service-3.jpg';
import './Services.css'; // Import CSS file for styling

function Services() {
  return (
    <div className='services-container flex flex-col gap-16 mt-24 xl:h-[90vh] h-auto mb-24 xl:mb-0'>
      <div className='text-center'>
        <div>
          <p className='sm:text-2xl text-xl text-gray-700 text-center'>A Safer Community Services</p>
          <hr className='border-primary mt-2' />
        </div>
        <p className='sm:text-[45px] text-[28px] font-bold mt-2'>Services We’re Offering</p>
      </div>

      <div className='flex xl:flex-row flex-col justify-center gap-10'>
        <div className='service-item' style={{ backgroundImage: `url(${service1})`}}>
        <p className='text-white text-[35px] font-bold yup'>Fire Fighting</p>

        <div className='overlay flex flex-col gap-4'>
            <p className='text-white text-[32px] font-bold'>Fire Fighting</p>
            <p className='text-white text-[22px]'>There are many passages of available but the suffered.</p>
            <button className='bg-primary px-5 py-1 text-white font-medium'>MORE</button>
          </div>
        </div>
        <div className='service-item' style={{ backgroundImage: `url(${service2})` }}>
        <p className='text-white text-[35px] font-bold yup'>Oppression Force</p>
          <div className='overlay flex flex-col gap-4'>
            <p className='text-white text-[32px] font-bold'>Oppression Force</p>
            <p className='text-white text-[22px]'>There are many passages of available but the suffered.</p>
            <button className='bg-primary px-5 py-1 text-white font-medium'>MORE</button>
          </div>
        </div>
        <div className='service-item' style={{ backgroundImage: `url(${service3})` }}>
        <p className='text-white text-[35px] font-bold yup'>Fire Suppression</p>
        <div className='overlay flex flex-col gap-4'>
            <p className='text-white text-[32px] font-bold'>Fire Suppression</p>
            <p className='text-white text-[22px]'>There are many passages of available but the suffered.</p>
            <button className='bg-primary px-5 py-1 text-white font-medium'>MORE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
