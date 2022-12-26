import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider/AuthPrivider';

const BookingModal = ({ bookData, setBookData }) => {
  const { user } = useContext(AuthContext);
  const { name, resell_price, photo } = bookData;
  const [processing, setProcessing] = useState(false);
  
  const handleBooking = event => {
    event.preventDefault();
    const form = event.target;
    const userName = form.username.value;
    const userEmail = form.useremail.value;
    const userNumber = form.usernumber.value;
    const userLocation = form.userlocation.value;

    const productBooking = {
      productID: bookData._id,
      product_name: name,
      product_photo: photo,
      product_price: resell_price,
      seller_email: bookData?.seller_email,
      user_name: userName,
      user_email: userEmail,
      user_number: userNumber,
      user_location: userLocation
    }
    setProcessing(true);


    fetch('http://localhost:5000/my-orders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(productBooking)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          setProcessing(false);
          toast.success(`${name} booked Successfully`);
          setBookData(null);
        }
      })
      .catch(err => {
        toast.error(err.message);
        setProcessing(false);
      })
  }

  return (
    <div>
      {
        user?.email ?
          <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="font-bold text-lg">{name}</h3>
                <h3 className="font-bold text-lg text-blue-500 my-3">Price: ${resell_price}</h3>
                <form onSubmit={handleBooking}>
                  <input name='username' type="text" placeholder="Type here" className="input input-bordered w-full my-3" disabled defaultValue={user?.displayName} />
                  <input name='useremail' type="text" placeholder="Type here" className="input input-bordered w-full my-3" disabled defaultValue={user?.email} />
                  <input name='usernumber' type="text" placeholder="Type your phone number" className="input input-bordered w-full my-3" required />
                  <input name='userlocation' type="text" placeholder="Type your location" className="input input-bordered w-full my-3" required />
                  <div className="modal-action">
                    {/* <button type='submit' htmlFor="booking-modal" className='btn bg-blue-500 hover:bg-blue-600 text-white border-0 w-full'>Submit</button> */}
                    <button htmlFor="booking-modal" className='btn bg-blue-500 hover:bg-blue-600 text-white border-0 w-full' type="submit" disabled={processing}>{processing ? <>
                      <svg class="animate-spin -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#8d8df0" stroke-width="4"></circle>
                        <path class="opacity-75" fill="rgb(59, 130, 246)" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </> : 'Submit'}</button>
                  </div>
                </form>
              </div>
            </div>
          </> :
          <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="font-bold text-2xl my-10 text-center">Please <Link to='/login' className='text-2xl font-bold underline text-blue-500'>Log In</Link> to buy books</h3>
              </div>
            </div>
          </>
      }
    </div >
  );
};

export default BookingModal;