import React from 'react';
import BannerImg from '../../../images/banner.png'

const Banner = () => {
  return (
    <div className="hero h-screen w-11/12 mx-auto bg-blue-200 rounded-xl">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse">
        <div className='w-full md:w-6/12'>
          <img src={BannerImg} className="" alt='' />
        </div>
        <div className='w-full md:w-6/12 pl-0 lg:pl-5'>
          <h1 className="text-3xl text-center md:text-left md:text-5xl font-bold leading-10 md:leading-[60px]">Buy and sell your textbooks for the best price</h1>
          <div className='mt-10 w-[152px] mx-auto md:w-full'>
            <button className='btn btn-primary my-5 lg:mr-5'>Browse Books</button>
            <button className='btn btn-primary'>How It Works</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;