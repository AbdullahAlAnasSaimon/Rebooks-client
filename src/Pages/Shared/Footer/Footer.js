import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo/logo.png';

const Footer = () => {
  return (
    <div className='bg-blue-300 '>
      <footer className="footer footer-center p-10 rounded">
        <div className="grid grid-flow-col gap-4">
          <Link className="link link-hover" to='/category'>Shop</Link>
          <Link className="link link-hover" to='/login'>Log In</Link>
          <Link className="link link-hover" to='/signup'>Sign Up</Link>
          <Link className="link link-hover" to='/blog'>Blog</Link>
        </div>
        <div>
          <div className="grid grid-flow-col gap-x-2">
            <img src={logo} alt="" className='w-10'/>
            <h2 className='text-3xl font-bold'>ReBooks</h2>
          </div>
        </div>
        <div>
          <p>Copyright © 2022 - All right reserved by Rebooks</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;