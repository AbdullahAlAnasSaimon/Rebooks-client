import React, { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../../Context/AuthProvider/AuthPrivider';
import useAdmin from '../../../Hooks/useAdmin';
import useBuyer from '../../../Hooks/useBuyer';
import useSeller from '../../../Hooks/useSeller';
import useTitle from '../../../Hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const MyProfile = () => {
  useTitle('Dashboard');
  const {user} = useContext(AuthContext);

  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);

  if(isAdminLoading || isSellerLoading || isBuyerLoading){
    return <Loading/>
  }

  return (
    <div>
      <h2 className='text-2xl my-5 text-center md:text-left font-bold'>My profile</h2>
      <div className='w-11/12 mx-auto mt-10 flex flex-col md:flex-row justify-around'>
        <div className="avatar block">
          <div className="w-24 md:w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto md:mx-0">
          {user?.photoURL ? <img src={user?.photoURL} alt='' /> : <FaUserCircle className='text-[96px] md:text-[192px] text-gray-700' />}
          </div>
        </div>
        <div className='mt-10 w-8/12 md:w-auto mx-auto md:mx-0'>
          <label className='label' htmlFor="">Name</label>
        <input type="text" className="input input-bordered w-full max-w-xs" defaultValue={user?.displayName} readOnly/>
          <label className='label' htmlFor="">Account Type</label>
        <input type="text" className="input input-bordered w-full max-w-xs" defaultValue={(isAdmin && "Admin") || (isSeller && "Seller") || (isBuyer && "Buyer")} readOnly/>
          <label className='label' htmlFor="">Email</label>
        <input type="text" className="input input-bordered w-full max-w-xs" defaultValue={user?.email} readOnly/>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;