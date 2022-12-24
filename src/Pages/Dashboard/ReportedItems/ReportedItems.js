import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../Hooks/useTitle';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ReportedItems = () => {
  useTitle('Reported Items');
  const [deleting, setDeleting] = useState(null);
  const { data: reportedItems, isLoading, refetch } = useQuery({
    queryKey: ['my-products'],
    queryFn: async () => {
      const res = await fetch('https://ebooks-server.vercel.app/reported-product', {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
      const data = await res.json();
      return data;
    }
  })

  
  const closeModal = () =>{
    setDeleting(null);
  }

  const handleDelete = item =>{
    fetch(`https://ebooks-server.vercel.app/products/${item._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => res.json())
    .then(data =>{
      if(data.deletedCount > 0){
        toast.success(`${item.name} Deleted Successfully`);
        refetch();
      }
    })
  }
  
  
  if (isLoading) {
    return <Loading />
  }

  refetch();

  return (
    <div>
      <h2 className='text-2xl font-bold text-center md:text-left my-5'>Reported Items</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Product Id</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { reportedItems && 
                reportedItems.map((product, i) => <tr key={product._id}>
                  <th>{i + 1}</th>
                  <th>{product._id}</th>
                  <td>{product.name}</td>
                  <td><label onClick={() => setDeleting(product)} htmlFor="my-modal" className='btn btn-error btn-xs'>Delete</label></td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
      {deleting && <ConfirmationModal
        title={`Are you sure? You want to delete?`}
        message={`If you delete once ${deleting.name} It can not be undone.`}
        buttonName={`Delete`}
        closeModal={closeModal}
        handleDelete={handleDelete}
        modalData={deleting}
      ></ConfirmationModal>}
    </div>
  );
};

export default ReportedItems;