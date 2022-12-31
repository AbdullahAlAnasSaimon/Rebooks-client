import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthPrivider';
import Loading from '../../Shared/Loading/Loading';

const MyBuyers = () => {
  const { user } = useContext(AuthContext);
  // const [deleting, setDeleting] = useState(null);
  const { data: myBuyers, isLoading, refetch } = useQuery({
    queryKey: ['myBuyer'],
    queryFn: async () => {
      const res = await fetch(`https://ebooks-server.vercel.app/my-buyers?email=${user?.email}`);
      const data = await res.json();
      return data;
    }
  })



  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <h2 className='text-2xl my-5 text-center md:text-left font-bold'>My Buyers</h2>
      <div>
        {
          myBuyers.length > 0 ? <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Contact No.</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                myBuyers.map((myBuyer, i) => <tr key={myBuyer._id}>
                  <th>{i + 1}</th>
                  <td>{myBuyer.user_name}</td>
                  <td>{myBuyer.user_email}</td>
                  <td>{myBuyer.user_location}</td>
                  <td>{myBuyer.user_number}</td>
                  <td><label className='btn btn-warning btn-xs'>Report</label></td>
                </tr>)
              }
            </tbody>
          </table>
        </div> : <p className='mt-20 text-center font-bold text-2xl text-gray-200'>No Data Found</p>
        }
      </div>
    </div>
  );
};

export default MyBuyers;