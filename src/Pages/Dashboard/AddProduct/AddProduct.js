import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const AddProduct = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('https://ebooks-server.vercel.app/category');
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) {
    return <Loading />
  }

  const handleAddProduct = (data) => {
    console.log(data);
    const id = categories.find(cId => data.role === cId.category_name);
    console.log(id._id)
  }

  return (
    <div className=''>
      <h2 className='text-3xl font-bold my-5'>Add Product</h2>
      <div className='m-5'>
        <form onSubmit={handleSubmit(handleAddProduct)}>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div className="form-control">
              <label className="label"><span className="label-text">Product Name</span> </label>
              <input {...register("name")} type="name" placeholder="Product Name" className="input input-bordered " />
              {/* {errors.name && <p className="text-red-500"><small>*{errors?.name?.message}</small></p>} */}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Photo</span></label>
              <input {...register("file")} type="file" className="file-input file-input-bordered" />
              {/* {errors.file && <p className="text-red-500"><small>*{errors?.file?.message}</small></p>} */}
            </div>

            <div className="form-control">
            <label className="label"><span className="label-text">Select Category</span> </label>
            <select {...register("role")} className="select select-bordered">
              {
                categories.map(category => <option key={category._id}>{category.category_name}</option>)
              }
            </select>
            {errors.role && <p className="text-red-500"><small>*{errors?.role?.message}</small></p>}
          </div>
          </div>


          

          <input className='btn btn-primary w-full my-5 max-w-xs' type="submit" value='Add A Product' />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;