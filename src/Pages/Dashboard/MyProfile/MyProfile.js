import React, { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../../Context/AuthProvider/AuthPrivider';
import useTitle from '../../../Hooks/useTitle';

const MyProfile = () => {
  useTitle('Dashboard');
  const {user} = useContext(AuthContext);
  return (
    <div>
      <h2 className='text-2xl my-5 text-center md:text-left font-bold'>My profile</h2>
      <div className='w-11/12 mx-auto mt-10'>
        <div className="avatar block">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto md:mx-0">
          {user?.photoURL ? <img src={user?.photoURL} alt='' /> : <FaUserCircle className='text-[96px] text-gray-700' />}
          </div>
        </div>
        <div className='mt-10 w-8/12 md:w-auto mx-auto md:mx-0'>
          <label className='label' htmlFor="">Name</label>
        <input type="text" className="input input-bordered w-full max-w-xs" defaultValue={user?.displayName} readOnly/>
          <label className='label' htmlFor="">Email</label>
        <input type="text" className="input input-bordered w-full max-w-xs" defaultValue={user?.email} readOnly/>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;