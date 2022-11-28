import React from 'react';
import toast from 'react-hot-toast';
import { MdReport, MdVerified } from 'react-icons/md';

const SingleBook = ({ books, setBookData }) => {
  
  const { name, verified, report, condition, description, location, original_price, phone_number, photo, posting_time, resell_price, seller_name, year_of_purchase, year_of_use, paid } = books;


  const handleReportItem = books => {
    fetch(`http://localhost:5000/reported-product/${books._id}`, {
      method: 'PUT',
    })
    .then(res => res.json())
    .then(data =>{
      if(data.modifiedCount > 0){
        toast.success('Reported Successfully');
      }
    })
  }


  return (
    <>
      {
        !paid && <div className='my-5 w-11/12 md:w-full mx-auto md:mx-0'>
          <div className="card card-side bg-base-100 shadow-xl flex-col-reverse md:flex-row">
            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <p>{seller_name} {verified && <MdVerified className='inline-block text-blue-600' />}</p>
              <div className='grid grid-cols-2'>
                <p>Condition: {condition}</p>
                <p>Location: {location}</p>
              </div>
              <div className='grid grid-cols-2'>
                <p>Number: {phone_number}</p>
                <p>{posting_time.slice(0, 24)}</p>
              </div>
              <div className='grid grid-cols-2'>
                <p>Purchase: {year_of_purchase}</p>
                <p>Use Time: {year_of_use}</p>
              </div>
              <div className='grid grid-cols-2'>
                <p>Price: ${resell_price}</p>
                <p>Original Price: ${original_price}</p>
              </div>
              <p>{description.slice(0, 100)}</p>
              <div className="card-actions justify-start">
                {<label onClick={() => setBookData(books)} htmlFor="booking-modal" className='btn btn-primary' disabled={!books?.availablity}>{books?.availablity ? 'Buy Now' : 'Booked'}</label>}
                <button onClick={() => handleReportItem(books)} className='btn btn-warning' disabled={report}><MdReport className='inline-block mr-1' /> Report to Admin</button>
              </div>
            </div>
            <figure className='w-auto rounded-xl p-4'><img className='rounded-lg md:w-[430px] md:h-[220px]' src={photo} alt="Movie" /></figure>
          </div>
        </div>
      }
    </>
  );
};

export default SingleBook;