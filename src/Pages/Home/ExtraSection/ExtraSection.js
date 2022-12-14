import React from 'react';
import { Link } from 'react-router-dom';

const ExtraSection = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold">Create An Account for the books you love</h1>
          <p className="py-6">It is indeed the biggest online bookshop or bookstore in Bangladesh that helps you save time and money. You can buy books online with a few clicks.</p>
          <Link to='/signup'><button className="btn bg-blue-500 hover:bg-blue-600 text-white border-0">Create An Account</button></Link>
        </div>
      </div>
    </div>
  );
};

export default ExtraSection;