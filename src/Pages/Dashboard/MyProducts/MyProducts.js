import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthPrivider';
import useTitle from '../../../Hooks/useTitle';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';




const MyProducts = () => {
  useTitle('My Products');
  const { user } = useContext(AuthContext);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const { data: myProducts, isLoading, refetch } = useQuery({
    queryKey: ['my-products', user?.email],
    queryFn: async () => {
      const res = await fetch(`https://ebooks-server.vercel.app/my-products?email=${user?.email}`, {
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

  const closeModal = () =>{
    setDeletingProduct(null);
  }

  const handleDelete = modalData =>{
    fetch(`https://ebooks-server.vercel.app/products/${modalData._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => res.json())
    .then(data =>{
      if(data.deletedCount > 0){
        toast.success(`${modalData.name} Deleted Successfully`);
        refetch();
      }
    })
  }

  const handleAdvertise = advertise =>{
    fetch(`https://ebooks-server.vercel.app/products/${advertise}`, {
      method: 'PUT',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => res.json())
    .then(data =>{
      if(data.modifiedCount > 0){
        toast.success('Product is Advertising');
        refetch();
      }
    })
  }

  return (
    <div>
      <h2 className='text-2xl my-5 font-bold text-center md:text-left'>My products</h2>
      <div>
        {
          myProducts.length > 0 ? <div className="overflow-x-auto w-full">
          <table className="table table-compact w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>S/N</th>
                <th>Product</th>
                <th>Info</th>
                <th>Sell Price</th>
                <th>Availablity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                myProducts.map((product, i) => <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={product?.photo} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product?.name.length > 16 ? product?.name.slice(0, 15) + '...' : product?.name}</div>
                        <div className="text-[11px] opacity-70">{product?.category_name}</div>
                      </div>
                    </div>
                    <span className="badge badge-ghost badge-sm">{product?.condition}</span>
                  </td>
                  <td>
                    {product?.description.slice(0, 20)+"..."}
                    <br />
                    <span className="badge badge-ghost badge-sm">{product?.posting_time.slice(0, 24)}</span>
                  </td>
                  <td>{product?.resell_price} $</td>
                  <td>{product?.paid ? <p><small className='bg-red-200 py-1 px-4 rounded-full'>Sold</small></p> : <p><small className='bg-blue-200 py-1 px-2 rounded-full'>Available</small></p> } </td>
                  <th>
                    {product?.advertisement ? <p className='text-center -mb-4 font-semibold italic'><small className='bg-gray-200 py-1 px-3 rounded-full'>Advertising</small></p> : <button onClick={() => handleAdvertise(product?._id)} className="btn btn-primary btn-xs mb-2 w-full" disabled={product.paid}>Advertise</button>}
                    <br />
                    <label onClick={() => setDeletingProduct(product)} htmlFor="my-modal" className="btn btn-error btn-xs w-full">Delete</label>
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
      message={`If you delete once ${deletingProduct.name} It can not be undone.`}
      buttonName={`Delete`}
      closeModal={closeModal}
      handleDelete={handleDelete}
      modalData={deletingProduct}
      ></ConfirmationModal>}
    </div>
  );
};

export default MyProducts;