import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../Shared/Loading/Loading';
import BookingModal from './SingleBook/BookingModal/BookingModal';
import SingleBook from './SingleBook/SingleBook';

const Shop = () => {
  const [bookData, setBookData] = useState({});
  
  const { data: allBooks, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('https://ebooks-server.vercel.app/products', {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className=''>
        {
          allBooks.map(books => <SingleBook
            key={books._id}
            books={books}
            setBookData={setBookData}
          ></SingleBook>)
        }
      </div>

      <BookingModal
        bookData={bookData}
      ></BookingModal>
    </div>
  );
};

export default Shop;