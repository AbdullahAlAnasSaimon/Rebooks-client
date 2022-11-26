import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Shared/Loading/Loading';
import SingleBook from './SingleBook/SingleBook';

const Shop = () => {

  const {data: allBooks, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: async () =>{
      const res = await fetch('https://ebooks-server.vercel.app/products');
      const data = await res.json();
      return data;
    }
  })

  if(isLoading){
    return <Loading/>
  }

  return (
    <div className=''>
      {
        allBooks.map(book => <SingleBook
        key={book._id}
        book={book}
        ></SingleBook>)
      }
    </div>
  );
};

export default Shop;