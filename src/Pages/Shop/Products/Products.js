import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SingleBook from '../SingleBook/SingleBook';


const Products = () => {
  const products = useLoaderData();
  console.log(products);

  return (
    <div>
      {
        products.length > 0 ?
        <>
          <h2 className='text-3xl font-bold text-center my-10'>{products[0]?.category_name}</h2>
          <div className=''>
            {
              products.map(book => <SingleBook
                key={book._id}
                book={book}
              ></SingleBook>)
            }
          </div>
        </>
        : <p className='flex justify-center items-center min-h-[400px] text-3xl text-gray-300 font-bold'>No Data Found</p>
      }
    </div>
  );
};

export default Products;