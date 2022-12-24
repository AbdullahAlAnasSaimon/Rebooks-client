import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../Hooks/useTitle';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const AllSellers = () => {
  useTitle('All Sellers');
  const [deleting, setDeleting] = useState(null);
  const { data: allSeller, isLoading, refetch } = useQuery({
    queryKey: ['my-products'],
    queryFn: async () => {
      const res = await fetch('https://ebooks-server.vercel.app/users/all-seller', {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
      const data = await res.json();
      return data;
    }
  })

  
  const handleVerifySeller = seller => {
    console.log(seller.email);
    fetch(`https://ebooks-server.vercel.app/users/${seller.email}`,{
      method: 'PUT',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => res.json())
    .then(data =>{
      if(data.modifiedCount > 0){
        toast.success(`${seller.name} is now verified seller`);
      }
    })
  }

  const closeModal = () =>{
    setDeleting(null);
  }
  
  const handleDelete = seller =>{
    fetch(`https://ebooks-server.vercel.app/users/${seller._id}`, {
      method: 'DELETE',
      // headers: {
        //   authorization: `bearer ${localStorage.getItem('accessToken')}`
        // }
    })
    .then(res => res.json())
    .then(data =>{
      if(data.deletedCount > 0){
        toast.success(`${seller.name} Deleted Successfully`);
        refetch();
      }
    })
  }
  
  if (isLoading) {
    return <Loading />
  }
  
  return (
    <div>
      <h2 className='text-2xl text-center md:text-left font-bold my-5'>All sellers</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Verification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                allSeller.map((seller, i) => <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>{seller.verified ? <p><small className='font-semibold bg-blue-300 px-4 py-1 rounded-full'>Verified</small></p> : <button onClick={() => handleVerifySeller(seller)} className='btn btn-primary btn-xs'>Verify</button>}</td>
                  <td><label onClick={() => setDeleting(seller)} htmlFor="my-modal" className='btn btn-error btn-xs'>Delete</label></td>
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

export default AllSellers;