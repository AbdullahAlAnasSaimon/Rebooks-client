import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthPrivider';
import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {
  const {user} = useContext(AuthContext);
  const { data: myBooking, isloading} = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/my-orders?email=${user?.email}`);
      const data = await res.json();
      return data;
    }
  })

  if (isloading) {
    return <Loading />
  }


  return (
    <div>
      <h2>My orders</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Book Name</th>
                <th>Price</th>
                <th>Payment State</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                myBooking?.map((booked, i) => 
                  <tr key={booked._id}>
                    <th>{i + 1}</th>
                    <td>{booked.product_name}</td>
                    <td>$ {booked.product_price}</td>
                    <td><button className='btn btn-primary btn-xs'>Pay</button></td>
                    <td><button className='btn btn-error btn-xs'>Delete</button></td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;