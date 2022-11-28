import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider/AuthPrivider';

const BookingModal = ({ bookData }) => {
  const { user } = useContext(AuthContext);
  const { name, resell_price, photo } = bookData;

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
      user_name: userName,
      user_email: userEmail,
      user_number: userNumber,
      user_location: userLocation
    }
    fetch('https://ebooks-server.vercel.app/my-orders',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(productBooking)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.acknowledged){
        toast.success(`${name} booked Successfully`);
      }
    })

    console.log(productBooking);
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
                  <input name='usernumber' type="text" placeholder="Type your phone number" className="input input-bordered w-full my-3" required/>
                  <input name='userlocation' type="text" placeholder="Type your location" className="input input-bordered w-full my-3" required/>
                  <div className="modal-action">
                    <button type='submit' htmlFor="booking-modal" className="btn w-full">Submit</button>
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