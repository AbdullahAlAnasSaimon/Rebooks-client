import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthPrivider';
import useTitle from '../../../Hooks/useTitle';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const Wishlist = () => {
  useTitle('Wish List');
  const { user } = useContext(AuthContext);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const { data: myWishList = [], isLoading, refetch } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/add-to-wishlist?email=${user?.email}`);
      const data = res.json();
      return data;
    }
  })


  if (isLoading) {
    return <Loading />
  }

  const closeModal = () => {
    setDeletingProduct(null);
  }

  const handleDelete = modalData => {
    fetch(`http://localhost:5000/add-to-wishlist/${modalData._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          toast.success(`${modalData.product_name} Deleted Successfully`);
          refetch();
        }
      })
  }


  return (
    <div>
      <h2 className='text-2xl font-bold my-5 text-center md:text-left'>Wish List</h2>
      <div>
        {
          myWishList?.length > 0 ? <div className="overflow-x-auto w-full">
            <table className="table w-full">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Product</th>
                  <th>Seller Name</th>
                  <th>Sell Price</th>
                  <th>Availablity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  myWishList.map((mylist, i) => <tr key={mylist._id}>
                    <th>{i + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={mylist?.photo} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{mylist?.product_name.length > 16 ? mylist?.product_name.slice(0, 15) + '...' : mylist?.product_name}</div>
                          <div className="text-[11px] opacity-70">{mylist?.category_name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{mylist?.seller_name}</td>
                    <td>{mylist?.resell_price} $</td>
                    <td>{mylist?.availablity ? <p><small className='bg-blue-200 py-1 px-2 rounded-full'>Available</small></p> : <p><small className='bg-red-300 py-1 px-2 rounded-full'>Unavailable</small></p>} </td>
                    <th>
                      <Link to={`/category/${mylist?.categoryId}`} className="btn bg-blue-500 hover:bg-blue-600 duration-300 border-0 btn-xs mb-2 w-full" disabled={!mylist?.availablity}>Buy Now</Link>
                      <br />
                      <label onClick={() => setDeletingProduct(mylist)} htmlFor="my-modal" className="btn btn-error btn-xs w-full">Remove</label>
                    </th>
                  </tr>)
                }
              </tbody>
            </table>
          </div> : <p className='mt-20 text-center font-bold text-2xl text-gray-200'>No Data Found</p>
        }
      </div>
      {deletingProduct && <ConfirmationModal
        title={`Are you sure? You want to delete?`}
        message={`If you delete once ${deletingProduct.product_name} It can not be undone.`}
        buttonName={`Delete`}
        closeModal={closeModal}
        handleDelete={handleDelete}
        modalData={deletingProduct}
      ></ConfirmationModal>}
    </div>
  );
};

export default Wishlist;