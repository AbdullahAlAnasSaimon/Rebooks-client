import React from 'react';
import downhero from '../../../images/downhero.jpg';

const HeroDown = () => {
  return (
    <div className="hero my-20">
      <div className="hero-content flex-col lg:flex-row-reverse w-11/12 mx-auto">
        <div className='w-auto md:w-6/12'>
        <img src={downhero} className="rounded-lg shadow-2xl" alt=''/>
        </div>
        <div className='w-auto md:w-6/12'>
          <h1 className="text-3xl text-center md:text-left mt-10 md:mt-0 md:text-5xl font-bold">Reading strengthens your brain</h1>
          <p className="py-6 text-center md:text-left">Brain scans showed that throughout the reading period and for days afterward, brain connectivity increased, especially in the somatosensory cortex, the part of the brain that responds to physical sensations like movement and pain.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroDown;