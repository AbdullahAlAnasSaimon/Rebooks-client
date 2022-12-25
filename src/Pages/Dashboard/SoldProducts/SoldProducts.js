import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';

const SoldProducts = () => {

  const {data: soldItems = [], isLoading, refetch} = useQuery({
    queryKey: ['solditem'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/sold-products`);
      const data = res.json();
      return data;
    }
  })

  if(isLoading){
    return <Loading/>
  }

  console.log(soldItems);

  return (
    <div>
      <h2 className='text-2xl font-bold my-5 text-center md:text-left'>Sold Products</h2>
      <div>
        {
          soldItems.length > 0 ? <div className="overflow-x-auto w-full">
          <table className="table w-full">
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
                soldItems.map((item, i) => <tr key={item._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item?.photo} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item?.name.length > 16 ? item?.name.slice(0, 15) + '...' : item?.name}</div>
                        <div className="text-[11px] opacity-70">{item?.category_name}</div>
                      </div>
                    </div>
                    <span className="badge badge-ghost badge-sm">{item?.condition}</span>
                  </td>
                  <td>
                    {item?.description.slice(0, 20)+"..."}
                    <br />
                    <span className="badge badge-ghost badge-sm">{item?.posting_time.slice(0, 24)}</span>
                  </td>
                  <td>{item?.resell_price} $</td>
                  <td>{item?.paid ? <p><small className='bg-red-200 py-1 px-4 rounded-full'>Sold</small></p> : <p><small className='bg-blue-200 py-1 px-2 rounded-full'>Available</small></p> } </td>
                  <th>
                    <label htmlFor="my-modal" className="btn btn-error btn-xs w-full">Delete</label>
                  </th>
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

export default SoldProducts;