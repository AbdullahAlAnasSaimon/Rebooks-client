import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthPrivider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';




const MyProducts = () => {
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

  const handleDeleteProduct = modalData =>{
    fetch(`http://localhost:5000/products/${modalData._id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data =>{
      if(data.deletedCount > 0){
        toast.success(`${modalData.name} Deleted Successfully`);
        refetch();
      }
    })
    
  }

  return (
    <div>
      <h2>My products</h2>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>S/N</th>
                <th>Product</th>
                <th>Info</th>
                <th>Sell Price</th>
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
                        <div className="font-bold">{product?.name}</div>
                        <div className="text-[11px] opacity-50">{product?.category_name}</div>
                      </div>
                    </div>
                    <span className="badge badge-ghost badge-sm">{product?.condition}</span>
                  </td>
                  <td>
                    {product?.description.slice(0, 30)+"..."}
                    <br />
                    <span className="badge badge-ghost badge-sm">{product?.posting_time.slice(0, 24)}</span>
                  </td>
                  <td>{product?.resell_price} $</td>
                  <th>
                    <button className="btn btn-primary btn-xs mb-2 w-full">Advertise</button>
                    <br />
                    <label onClick={() => setDeletingProduct(product)} htmlFor="my-modal" className="btn btn-error btn-xs w-full">Delete</label>
                  </th>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
      {deletingProduct && <ConfirmationModal
      title={`Are you sure? You want to delete?`}
      message={`If you delete once ${deletingProduct.name} It can not be undone.`}
      closeModal={closeModal}
      handleDeleteProduct={handleDeleteProduct}
      modalData={deletingProduct}
      ></ConfirmationModal>}
    </div>
  );
};

export default MyProducts;