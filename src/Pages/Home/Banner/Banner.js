import React from 'react';
import { Link } from 'react-router-dom';
import BannerImg from '../../../images/banner.gif';

const Banner = () => {
  return (
    <div className='bg-white'>
      <div className="hero w-11/12 h-auto lg:h-[550px] mx-auto">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
          <div className='w-full md:w-6/12'>
            <img src={BannerImg} className="lg:w-10/12 lg:mx-auto" alt='' />
          </div>
          <div className='w-full md:w-6/12 pl-0 lg:pl-5 my-20 md:my-0'>
            <h1 className="text-3xl text-center md:text-left md:text-5xl font-bold leading-10 md:leading-[60px]">Buy and sell your used books for the best price</h1>
            <div className='mt-10 w-10/12 mx-auto md:w-full'>
              <Link to='/category'><button className='px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white border-0 lg:mr-5 w-full md:w-auto rounded-full duration-300'>Browse Books</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;