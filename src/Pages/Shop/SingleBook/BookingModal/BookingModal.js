import React, { useContext } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider/AuthPrivider';

const BookingModal = ({bookData}) => {
  const {user} = useContext(AuthContext);
  const { name, location, phone_number, resell_price } = bookData;
  return (
    <div>
      {/* The button to open modal */}
      {/* <label htmlFor="booking-modal" className="btn">open modal</label> */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
        <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-lg">{name}</h3>
          <h3 className="font-bold text-lg text-blue-500 my-3">Price: ${resell_price}</h3>
          <input type="text" placeholder="Type here" className="input input-bordered w-full my-3" disabled defaultValue={user?.displayName}/>
          <input type="text" placeholder="Type here" className="input input-bordered w-full my-3" disabled defaultValue={user?.email}/>
          <input type="text" placeholder="Type here" className="input input-bordered w-full my-3" defaultValue={phone_number}/>
          <input type="text" placeholder="Type here" className="input input-bordered w-full my-3" defaultValue={location}/>
          <div className="modal-action">
            <label htmlFor="booking-modal" className="btn w-full">Submit</label>
          </div>
        </div>
      </div>
    </div >
  );
};

export default BookingModal;