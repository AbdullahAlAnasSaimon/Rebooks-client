import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Shared/Loading/Loading';
import SingleBook from './SingleBook/SingleBook';

const Shop = () => {

  const {data: allBooks, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: async () =>{
      const res = await fetch('http://localhost:5000/products');
      const data = await res.json();
      return data;
    }
  })

  if(isLoading){
    return <Loading/>
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
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