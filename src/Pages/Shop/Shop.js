import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {Link, useLocation} from "react-router-dom";
import useTitle from '../../Hooks/useTitle';
import Loading from '../Shared/Loading/Loading';
import BookingModal from './SingleBook/BookingModal/BookingModal';
import SingleBook from './SingleBook/SingleBook';

const Shop = () => {
  const [bookData, setBookData] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState(null);
  const location = useLocation()
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

  useEffect(() => {
    setBreadcrumb(location.pathname.split("/").filter(item => item));
  }, [location.pathname])

  if (isLoading) {
    return <Loading />
  }



  refetch();


  return (
    <div>
      <div className='my-5'>Home/{breadcrumb?.map((item, index) => <span key={index}><Link className='underline text-blue-600' to={`/${item}`}>{item === "category" && "All Books"}</Link></span>)}</div>
      <div>
        {
          allBooks?.map(books => <SingleBook
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