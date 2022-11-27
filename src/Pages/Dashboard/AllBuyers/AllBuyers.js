import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';

const AllBuyers = () => {
  const { data: allBuyer, isLoading } = useQuery({
    queryKey: ['my-products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/users/all-buyer', {
        // headers: {
        //   authorization: `bearer ${localStorage.getItem('accessToken')}`
        // }
      })
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) {
    return <Loading />
  }

  console.log(allBuyer);

  return (
    <div>
      <h2>all Buyers</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                allBuyer.map((buyer, i) => <tr key={buyer._id}>
                  <th>{i + 1}</th>
                  <td>{buyer.name}</td>
                  <td>{buyer.email}</td>
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

export default AllBuyers;