import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';

const AllSellers = () => {
  const { data: allSeller, isLoading } = useQuery({
    queryKey: ['my-products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/users/all-seller', {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) {
    return <Loading />
  }

  console.log(allSeller);

  return (
    <div>
      <h2>all sellers</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Verify</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                allSeller.map((seller, i) => <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td><button className='btn btn-primary btn-xs'>Verify</button></td>
                  <td><button className='btn btn-error btn-xs'>Delete</button></td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSellers;