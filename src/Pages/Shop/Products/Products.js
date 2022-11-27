import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../SingleBook/BookingModal/BookingModal';
import SingleBook from '../SingleBook/SingleBook';


const Products = () => {
  const [bookData, setBookData] = useState({});
  const products = useLoaderData();

  return (
    <div>
      {
        products.length > 0 ?
          <>
            <h2 className='text-3xl font-bold text-center my-10'>{products[0]?.category_name}</h2>
            <div className=''>
              {
                products.map(books => <SingleBook
                  key={books._id}
                  books={books}
                  setBookData={setBookData}
                ></SingleBook>)
              }
            </div>
            <BookingModal
              bookData={bookData}
            ></BookingModal>
          </>
          : <p className='flex justify-center items-center min-h-[400px] text-3xl text-gray-300 font-bold'>No Data Found</p>
      }
    </div>
  );
};

export default Products;