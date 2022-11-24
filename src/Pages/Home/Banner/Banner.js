import React from 'react';
import BannerImg from '../../../images/banner.png'

const Banner = () => {
  return (
    <div className='bg-blue-200'>
      <div className="hero w-11/12 h-auto md:h-[500px] mx-auto">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className='w-full md:w-6/12'>
            <img src={BannerImg} className="" alt='' />
          </div>
          <div className='w-full md:w-6/12 pl-0 lg:pl-5 my-5 md:my-0'>
            <h1 className="text-3xl text-center md:text-left md:text-5xl font-bold leading-10 md:leading-[60px]">Buy and sell your textbooks for the best price</h1>
            <div className='mt-10 w-10/12 mx-auto md:w-full'>
              <button className='btn btn-primary my-5 lg:mr-5 w-full md:w-auto'>Browse Books</button>
              <button className='btn btn-primary w-full md:w-auto'>How It Works</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;