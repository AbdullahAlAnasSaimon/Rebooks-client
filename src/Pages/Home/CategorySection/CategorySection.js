import React from 'react';
import { Link } from 'react-router-dom';

const CategorySection = ({ category }) => {
  return (
    <Link to={`/category/${category?._id}`}><div className='bg-blue-100 hover:bg-blue-200 duration-300 py-3 border-2 border-blue-300 rounded-lg'>
      <p>{category?.category_name}</p>
    </div></Link>
  );
};

export default CategorySection;