import React from 'react';
import { Link } from 'react-router-dom';

const CategorySection = ({ category }) => {
  return (
    <Link to={`/category/${category?._id}`}><div className='bg-blue-100 py-3 border-2 border-blue-400'>
      <p>{category?.category_name}</p>
    </div></Link>
  );
};

export default CategorySection;