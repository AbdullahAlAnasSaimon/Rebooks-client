import React from 'react';
import BannerImg from '../../../images/banner.png'

const Banner = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={BannerImg} className="" alt=''/>
          <div>
            <h1 className="text-5xl font-semibold leading-[55px]">Buy and sell your textbooks for the best price</h1>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;