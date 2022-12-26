import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../Shared/Loading/Loading';
import BookingModal from '../Shop/SingleBook/BookingModal/BookingModal';
import AdvertiseBook from './AdvertiseBook/AdvertiseBook';

const Advertise = () => {
  const [bookData, setBookeData] = useState({});

  const { data: advertised, isLoading } = useQuery({
    queryKey: ['advertise'],
    queryFn: async () => {
      const res = await fetch('https://ebooks-server.vercel.app/advertise');
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) {
    return <Loading />
  }


  return (
    <>
      {
        advertised?.length > 0 &&
        <div>
          <h2 className='text-3xl font-bold text-center my-10'>Advertise</h2>
          <div className='w-11/12 mx-auto'>
            {
              advertised.map(books => <AdvertiseBook
              key={books._id}
              books={books}
              setBookData={setBookeData}
              ></AdvertiseBook>)
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