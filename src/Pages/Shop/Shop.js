import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useTitle from '../../Hooks/useTitle';
import Loading from '../Shared/Loading/Loading';
import BookingModal from './SingleBook/BookingModal/BookingModal';
import SingleBook from './SingleBook/SingleBook';

const Shop = () => {
  const [bookData, setBookData] = useState(null);
  useTitle('Shop')
  const { data: allBooks, isLoading, refetch } = useQuery({
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

  refetch();

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

      {
        bookData && (<BookingModal
          bookData={bookData}
          setBookData={setBookData}
        ></BookingModal>
        )}
    </div>
  );
};

export default Shop;