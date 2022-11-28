import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthPrivider';
import useTitle from '../../../Hooks/useTitle';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {
  useTitle('My Orders');
  const [deleting, setDeleting] = useState(null);
  const { user } = useContext(AuthContext);
  const { data: myBooking, isloading, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(`https://ebooks-server.vercel.app/my-orders?email=${user?.email}`);
      const data = await res.json();
      return data;
    }
  })

  if (isloading) {
    return <Loading />
  }

  const closeModal = () => {
    setDeleting(null);
  }

  const handleDelete = product => {
    fetch(`https://ebooks-server.vercel.app/my-orders/${product._id}`, {
      method: 'DELETE',
      // headers: {
      //   authorization: `bearer ${localStorage.getItem('accessToken')}`
      // }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          toast.success(`${product.name} Deleted Successfully`);
          refetch();
        }
      })
  }


  return (
    <div>
      <h2 className='text-3xl font-bold my-5 text-center md:text-left'>My orders</h2>
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
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={booked.product_photo} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{booked.product_name}</div>
                        </div>
                      </div>
                    </td>
                    <td>$ {booked.product_price}</td>
                    <td>
                      {
                        booked.product_price && !booked.paid && <Link to={`/dashboard/payment/${booked._id}`}>
                          <button className='btn btn-primary btn-xs'>Pay</button>
                        </Link>
                      }
                      {
                        booked.product_price && booked.paid && <span className='bg-blue-200 px-3 py-1 rounded-full'><small>Paid</small></span>
                      }
                    </td>
                    <td><label onClick={() => setDeleting(booked)} htmlFor="my-modal" className='btn btn-error btn-xs'>Delete</label></td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      {deleting && <ConfirmationModal
        title={`Are you sure? You want to delete?`}
        message={`If you delete once ${deleting.product_name} It can not be undone.`}
        buttonName={`Delete`}
        closeModal={closeModal}
        handleDelete={handleDelete}
        modalData={deleting}
      ></ConfirmationModal>}
    </div>
  );
};

export default MyOrders;