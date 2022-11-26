import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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

  const handleAddProduct = () =>{

  }

  return (
    <div className=''>
        <h2 className='text-3xl font-bold my-5'>Add Product</h2>
      <div className='m-5'>
        <form onSubmit={handleSubmit(handleAddProduct)}>

          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Name</span> </label>
            <input {...register("name", {
              required: 'Name is required'
            })} type="name" placeholder="Your Name" className="input input-bordered w-full max-w-xs" />
            {errors.name && <p className="text-red-500"><small>*{errors?.name?.message}</small></p>}
          </div>


          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Email</span> </label>
            <input {...register("email", {
              required: 'Email Address is required'
            })} type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
            {errors.email && <p className="text-red-500"><small>*{errors?.email?.message}</small></p>}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Password</span></label>
            <input {...register("password", {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be 6 character or longer' },
              pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password should contain 1 Uppercase, 1 number, 1 special character' }
            })} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
            {errors.password && <p className="text-red-500"><small>*{errors?.password?.message}</small></p>}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Select Account Type</span> </label>
            <select {...register("role", {
              required: true
            })} className="select select-bordered w-full max-w-xs">
              {}
            </select>
            {errors.role && <p className="text-red-500"><small>*{errors?.role?.message}</small></p>}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Photo</span></label>
            <input {...register("file")} type="file" className="file-input file-input-bordered w-full max-w-xs" />
            {/* {errors.file && <p className="text-red-500"><small>*{errors?.file?.message}</small></p>} */}
          </div>

          <input className='btn btn-primary w-full my-5 max-w-xs' type="submit" value='Add A Product' />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;