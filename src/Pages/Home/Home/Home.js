import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useTitle from '../../../Hooks/useTitle';
import Advertise from '../../Advertise/Advertise';
import Loading from '../../Shared/Loading/Loading';
import Banner from '../Banner/Banner';
import CategorySection from './CategorySection/CategorySection';

const Home = () => {
  useTitle('Home');

  const { data: categories, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await fetch('https://ebooks-server.vercel.app/category');
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <Banner></Banner>
      <div className='my-20'>
        <h2 className='text-3xl font-bold text-center my-10'>Categories</h2>
        <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center my-10'>
          {
            categories.map(category => <CategorySection
              key={category._id}
              category={category}
            ></CategorySection>)
          }
        </div>
      </div>
      <Advertise></Advertise>
    </div>
  );
};

export default Home;