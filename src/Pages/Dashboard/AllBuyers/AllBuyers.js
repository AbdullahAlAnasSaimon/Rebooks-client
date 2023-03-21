import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../Hooks/useTitle';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const AllBuyers = () => {
  useTitle('All buyers');
  const [deleting, setDeleting] = useState(null);

  const { data: allBuyer, isLoading, refetch } = useQuery({
    queryKey: ['my-products'],
    queryFn: async () => {
      const res = await fetch('https://ebooks-server.vercel.app/users/all-buyer', {
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

  const handleDelete = buyer =>{
    fetch(`https://ebooks-server.vercel.app/users/${buyer._id}`, {
      method: 'DELETE',
      // headers: {
      //   authorization: `bearer ${localStorage.getItem('accessToken')}`
      // }
    })
    .then(res => res.json())
    .then(data =>{
      if(data.deletedCount > 0){
        toast.success(`${buyer.name} Deleted Successfully`);
        refetch();
      }
    })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <h2 className='text-2xl text-center md:text-left font-bold my-5'>All Buyers</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
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
                  <td><label onClick={() => setDeleting(buyer)} htmlFor="my-modal" className='btn btn-error btn-xs'>Delete</label></td>
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

export default AllBuyers;