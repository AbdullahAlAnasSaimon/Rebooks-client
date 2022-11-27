import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { MdReport, MdVerified } from 'react-icons/md';
import Loading from '../../Shared/Loading/Loading';

const SingleBook = ({ books, setBookData }) => {
  const { name, condition, description, location, original_price, phone_number, photo, posting_time, resell_price, seller_name, year_of_purchase, year_of_use } = books;

  const {data: onlySellers, isloading} = useQuery({
    queryKey: ['sellers'],
    queryFn: async () =>{
      const res = await fetch('http://localhost:5000/users/only-sellers');
      const data = await res.json()
      return data;
    }
  });

  if(isloading){
    return <Loading/>
  }

  console.log(onlySellers);

  const handleReportItem = id =>{

  }

  return (
    <div className='my-5 w-11/12 md:w-full mx-auto md:mx-0'>
      <div className="card card-side bg-base-100 shadow-xl flex-col-reverse md:flex-row">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{seller_name} <MdVerified className='inline-block text-blue-600' /></p>
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
            <button className='btn btn-warning'><MdReport className='inline-block mr-1'/> Report to Admin</button>
          </div>
        </div>
        <figure className='w-auto rounded-xl p-4'><img className='rounded-lg md:w-[430px] md:h-[220px]' src={photo} alt="Movie" /></figure>
      </div>
    </div>
  );
};

export default SingleBook;