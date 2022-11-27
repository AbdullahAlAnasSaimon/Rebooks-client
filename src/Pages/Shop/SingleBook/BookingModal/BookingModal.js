import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider/AuthPrivider';

const BookingModal = ({ bookData }) => {
  const { user } = useContext(AuthContext);
  const { name, resell_price } = bookData;
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
                <input type="text" placeholder="Type here" className="input input-bordered w-full my-3" disabled defaultValue={user?.displayName} />
                <input type="text" placeholder="Type here" className="input input-bordered w-full my-3" disabled defaultValue={user?.email} />
                <input type="text" placeholder="Type your phone number" className="input input-bordered w-full my-3" />
                <input type="text" placeholder="Type your location" className="input input-bordered w-full my-3" />
                <div className="modal-action">
                  <label htmlFor="booking-modal" className="btn w-full">Submit</label>
                </div>
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