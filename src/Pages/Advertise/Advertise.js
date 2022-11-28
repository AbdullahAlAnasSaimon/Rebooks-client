import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../Shared/Loading/Loading';
import BookingModal from '../Shop/SingleBook/BookingModal/BookingModal';
import SingleBook from '../Shop/SingleBook/SingleBook';

const Advertise = () => {
  const [bookData, setBookeData] = useState({});

  const { data: advertised, isLoading } = useQuery({
    queryKey: ['advertise'],
    queryFn: async () => {
      const res = await fetch('https://ebooks-server.vercel.app/advertise');
      const data = await res.json();
      console.log(data);
      return data;
    }
  })

  if (isLoading) {
    return <Loading />
  }

  console.log(advertised);

  return (
    <>
      {
        advertised?.length > 0 &&
        <div>
          <h2 className='text-3xl font-bold text-center my-10'>Advertise</h2>
          <div className='w-11/12 mx-auto'>
            {
              advertised.map(books => <SingleBook
              key={books._id}
              books={books}
              setBookData={setBookeData}
              ></SingleBook>)
            }
          </div>
          <BookingModal
          bookData={bookData}
          ></BookingModal>
        </div>
      }
    </>
  );
};

export default Advertise;