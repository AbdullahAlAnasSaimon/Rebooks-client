import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const AllSellers = () => {
  const [deleting, setDeleting] = useState(null);
  const { data: allSeller, isLoading, refetch } = useQuery({
    queryKey: ['my-products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/users/all-seller', {
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

  const handleVerifySeller = id => {
    console.log(id);
  }

  const closeModal = () =>{
    setDeleting(null);
  }

  const handleDelete = seller =>{
    fetch(`http://localhost:5000/users/${seller._id}`, {
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
                <th>Verify</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                allSeller.map((seller, i) => <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td><button onClick={() => handleVerifySeller(seller._id)} className='btn btn-primary btn-xs'>Verify</button></td>
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