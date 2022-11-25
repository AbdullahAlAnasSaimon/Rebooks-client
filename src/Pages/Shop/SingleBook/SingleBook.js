import React from 'react';

const SingleBook = ({ book }) => {
  console.log(book);
  const { name, condition, description, location, original_price, phone_number, photo, posting_time, resell_price, seller_name, year_of_purchase, year_of_use } = book;
  return (
    <div className='my-5 w-11/12 md:w-full mx-auto md:mx-0'>
      <div className="card card-side bg-base-100 shadow-xl flex-col-reverse md:flex-row">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{seller_name}</p>
          <div className='grid grid-cols-2'>
            <p>Condition: {condition}</p>
            <p>Location: {location}</p>
          </div>
          <div className='grid grid-cols-2'>
            <p>Number: {phone_number}</p>
            <p>{posting_time}</p>
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
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
        <figure className='w-auto rounded-xl p-4'><img className='rounded-lg md:w-[430px] md:h-[220px]' src={photo} alt="Movie" /></figure>
      </div>
    </div>
  );
};

export default SingleBook;