import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthPrivider';
import Loading from '../../Shared/Loading/Loading';

const MyProducts = () => {
  const {user} = useContext(AuthContext);

  const {data: myProducts, isLoading} = useQuery({
    queryKey: ['my-products', user?.email],
    queryFn: async () =>{
      const res = await fetch(`http://localhost:5000/my-products?email=${user?.email}`)
      const data = await res.json();
      return data;
    }
  })

  if(isLoading){
    return <Loading/>
  }

  console.log(myProducts);

  return (
    <div>
      <h2>My products</h2>
    </div>
  );
};

export default MyProducts;