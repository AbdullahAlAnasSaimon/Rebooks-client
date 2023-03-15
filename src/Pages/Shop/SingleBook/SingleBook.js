import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { MdReport, MdVerified } from 'react-icons/md';
import { AuthContext } from '../../../Context/AuthProvider/AuthPrivider';
import useAdmin from '../../../Hooks/useAdmin';
import useSeller from '../../../Hooks/useSeller';
import ButtonLoading from '../../Shared/Loading/ButtonLoading';

const SingleBook = ({ books, setBookData }) => {
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const { name, category_name, seller_photo, verified, condition, description, location, original_price, phone_number, photo, posting_time, resell_price, seller_name, year_of_purchase, year_of_use, paid } = books;


  const handleAddToWishList = data => {
    const confirmation = window.confirm(`Are you sure you want to add ${name} to wishlist`);
    if (confirmation && user) {
      const { _id, name, category_name, categoryId, availablity, photo, resell_price, seller_name } = data;
      const wishListData = {
        productID: _id,
        product_name: name,
        add_to_wishlist: true,
        category_name,
        categoryId,
        availablity,
        photo,
        resell_price,
        seller_name,
        user_email: user?.email,
        paid: false
      }

      fetch('https://ebooks-server.vercel.app/add-to-wishlist', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(wishListData)
      })
        .then(res => res.json())
        .then(data => {
          if (data.acknowledged) {
            toast.success('Added To wishlist Successfully');
          }
          else {
            toast.error(data.message);
          }
        })
    }
    else {
      return toast.error('Please Login to add to withlist');
    }
  }

  const handleReportItem = books => {
    if (user) {
      const confirmReport = window.confirm(`Are You sure you want to report ${books?.name}?`);
      if (confirmReport) {
        fetch(`https://ebooks-server.vercel.app/reported-product/${books?._id}`, {
          method: 'PUT',
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount > 0) {
              toast.success('Reported Successfully');
            }
          })
      }
      else {
        return;
      }
    }
    else {
      return toast.error('Please Login to Report');
    }
  }


  return (
    <>
      {
        !paid && <div className='my-10 w-full'>
          <div className="card card-side shadow-lg flex-col-reverse md:flex-row bg-gray-200/20 border border-blue-200">
            <div className="card-body md:w-10/12">
              <div className='flex w-auto p-2 rounded-lg overflow-hidden'>
                <div className="avatar placeholder">
                  <div className="rounded-full w-10">
                    {seller_photo ? <img src={seller_photo} alt="" /> : <FaUserCircle className='text-[40px] text-gray-700' />}
                  </div>
                </div>
                <div className='ml-2'>
                  <p className='font-semibold'>{seller_name} {verified && <MdVerified className='inline-block text-blue-600' />}</p>
                  <p className='text-[12px]'>{posting_time.slice(0, 21)}</p>
                </div>
              </div>
              <h2 className="card-title text-3xl font-bold">{name}</h2>
              <div className=''>
                <p className='text-2xl font-semibold text-blue-500'> ${resell_price} <span><del className='text-red-400 text-[16px]'>${original_price}</del></span></p>
              </div>

              <p>{description.slice(0, 200) + '...'}</p>
              <div className='text-[15px] mb-2'>
                <p><strong>Category:</strong> <span className='text-[14px] bg-gray-200 inline-block px-2 rounded-full'>{category_name}</span></p>
                <p><strong>Condition:</strong> {condition}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Purchase:</strong> {year_of_purchase}</p>
                <p><strong>Year of Use:</strong> {year_of_use}</p>
                <p><strong>Contact No.:</strong> {phone_number}</p>
              </div>
              <div className="card-actions justify-start">

                {/* <button className='btn bg-blue-500 hover:bg-blue-600 text-white border-0 w-full my-5' type="submit" disabled={processing}>{processing ? <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#8d8df0" stroke-width="4"></circle>
                    <path className="opacity-75" fill="rgb(59, 130, 246)" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </> : 'Log In'}</button> */}

                <label onClick={() => setBookData(books)} htmlFor="booking-modal" className='btn bg-blue-600 hover:bg-blue-500 text-white border-0 btn-xs rounded-full h-[35px] px-5'> Buy Now </label>

                <button onClick={() => handleAddToWishList(books)} className='btn bg-red-500 hover:bg-red-600 text-white border-0 text-xl btn-xs rounded-full h-[35px]' ><AiFillHeart /></button>

                <button onClick={() => handleReportItem(books)} className='btn btn-warning btn-xs rounded-full h-[35px] px-5'><MdReport className='inline-block mr-1' /> Report</button>
              </div>
            </div>
            <figure className='w-auto rounded-xl pr-0 md:pr-6'><img className='rounded-lg md:!max-w-[300px] m-5 md:m-0' src={photo} alt="Movie" /></figure>
          </div>
        </div>
      }
    </>
  );
};

export default SingleBook;