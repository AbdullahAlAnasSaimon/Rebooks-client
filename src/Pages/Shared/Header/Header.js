import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthPrivider';
import logo from '../../../images/logo/logo.png';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useEffect } from 'react';
import './Header.css';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem('accessToken');
      })
      .catch(err => toast.error(err.message))
  }

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0px";
      } else {
        document.getElementById("navbar").style.top = "-68px";
      }
      prevScrollpos = currentScrollPos;
    }
  }, []);

  return (
    <div className='bg-blue-400/60 backdrop-blur-lg border-b-2 sticky top-0 w-full z-[9999] duration-300 border-blue-200' id='navbar'>
      <div className="navbar w-full md:w-11/12 mx-auto md:min-h-[40px] p-2">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><NavLink to='/'>Home</NavLink></li>
              <li tabIndex={0}><NavLink to='/category'>Book Store</NavLink></li>
              {user?.uid && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>}
              <li><NavLink to='/blog'>Blog</NavLink></li>
              {/* <li>
                <label className="swap swap-rotate rounded-full btn-circle h-[35px] w-[35px]">
                  <input type="checkbox" />
                  <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                  <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                </label></li> */}
            </ul>
          </div>
          <Link to='/' className="btn btn-sm btn-ghost normal-case">
            <img className='w-6' src={logo} alt="" />
            <h2 className='text-xl font-bold ml-1'>ReBooks</h2>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li><NavLink to='/' className='rounded-full mx-1 h-[30px] text-sm my-auto'>Home</NavLink></li>
            {user?.uid && <li><NavLink to='/dashboard' className={({isActive}) => isActive ? 'active rounded-full mx-1 h-[30px] text-sm my-auto' : 'undefined rounded-full mx-1 h-[30px] text-sm my-auto'}>Dashboard</NavLink></li>}
            <li tabIndex={0}><NavLink to='/category' className='rounded-full mx-1 h-[30px] text-sm my-auto'>Book Store</NavLink></li>
            <li><NavLink to='/blog' className='rounded-full mx-1 h-[30px] text-sm my-auto'>Blog</NavLink></li>
            {/* <li>
              <label className="swap swap-rotate h-[30px] w-[30px] rounded-full">
                <input type="checkbox" />
                <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
              </label>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end">

          

          {user?.uid ?
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn-ghost btn-circle avatar w-[30px] h-[30px] flex justify-center">
                <div className="w-8 rounded-full">
                  {user?.photoURL ? <img src={user?.photoURL} alt='' /> : <FaUserCircle className='text-[28px] text-gray-700' />}
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                
                <li><button onClick={handleLogOut}> <FiLogOut /> Log Out</button></li>
              </ul>
            </div>
            :
            <NavLink to='/login' className="bg-gray-700 hover:bg-gray-800 duration-300 px-4 py-2 text-white rounded-md text-sm"> Log In</NavLink>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;