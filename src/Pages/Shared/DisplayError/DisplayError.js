import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../../images/error/404-error.gif';

const DisplayError = () => {
  return (
    <div className='w-auto lg:w-4/12 mx-auto'>
      <img className='w-auto' src={error} alt="" />
      <h2 className='text-4xl font-bold text-center text-gray-700 -mt-16'>Page Not Found</h2>
      <div className='mt-10'>
        <Link to='/' className='block w-6/12 mx-auto text-center bg-[#2bf29c] hover:bg-[#19e98f] py-2 px-3 rounded-md mt-10'>&#8592; Go To Home Page</Link>
      </div>
    </div>
  );
};

export default DisplayError;