import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthPrivider';
import Loading from '../../Shared/Loading/Loading';

const AddProduct = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const imgHostKey = process.env.REACT_APP_IMGBB_KEY;
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
    const time = new Date().toString();
    const idOfCategory = categories.find(cid => data.category_name === cid.category_name);
    const image = data.photo[0];
    const formData = new FormData();
    formData.append('image', image);
    fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imageData => {
        console.log(imageData);
        if (imageData.success) {
          const bookData = {
            name: data.name,
            category_name: data.category_name,
            categoryId: idOfCategory._id,
            photo: imageData.data.url,
            seller_name: user?.displayName,
            condition: data.condition,
            phone_number: data.phone_number,
            location: data.location,
            year_of_purchase: data.year_of_purchase,
            year_of_use: data.year_of_use,
            seller_email: user?.email,
            resell_price: data.resell_price,
            original_price: data.original_price,
            availablity: true,
            posting_time: time,
            description: data.description
          };

          fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(bookData)
          })
          .then(res => res.json())
          .then(data =>{
            if(data.acknowledged){
              toast.success('Product added Successfully');
              navigate('/dashboard/my-products');
            }
          })

        }
      })
  }


  return (
    <div className=''>
      <h2 className='text-3xl font-bold my-5'>Add Product</h2>
      <div className='m-5'>
        <form onSubmit={handleSubmit(handleAddProduct)}>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-5'>
            <div className="form-control">
              <label className="label"><span className="label-text">Product Name</span> </label>
              <input {...register("name", { required: "Name is required" })} type="name" placeholder="Product Name" className="input input-bordered " />
              {errors.name && <p className="text-red-500"><small>*{errors?.name?.message}</small></p>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Photo</span></label>
              <input {...register("photo")} type="file" className="file-input file-input-bordered" />
              {/* {errors.file && <p className="text-red-500"><small>*{errors?.file?.message}</small></p>} */}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Select Category</span> </label>
              <select {...register("category_name")} className="select select-bordered">
                {
                  categories.map(category => <option key={category._id}>{category.category_name}</option>)
                }
              </select>
              {/* {errors.role && <p className="text-red-500"><small>*{errors?.role?.message}</small></p>} */}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-5'>
            <div className="form-control">
              <label className="label"><span className="label-text">Contact Number</span> </label>
              <input {...register("phone_number")} type="number" placeholder="Contact Number" className="input input-bordered " />
              {/* {errors.name && <p className="text-red-500"><small>*{errors?.name?.message}</small></p>} */}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Location</span> </label>
              <input {...register("location")} type="text" placeholder="Location" className="input input-bordered " />
              {/* {errors.name && <p className="text-red-500"><small>*{errors?.name?.message}</small></p>} */}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Condition</span> </label>
              <select {...register("condition")} className="select select-bordered">
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Low</option>
              </select>
              {/* {errors.role && <p className="text-red-500"><small>*{errors?.role?.message}</small></p>} */}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mb-5'>
            <div className="form-control">
              <label className="label"><span className="label-text">Purchase Year</span> </label>
              <input {...register("year_of_purchase")} type="text" placeholder="Purchase Year" className="input input-bordered " />
              {/* {errors.name && <p className="text-red-500"><small>*{errors?.name?.message}</small></p>} */}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Product Used Duration</span> </label>
              <input {...register("year_of_use")} type="text" placeholder="Used Duration" className="input input-bordered " />
              {/* {errors.name && <p className="text-red-500"><small>*{errors?.name?.message}</small></p>} */}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Original Price</span> </label>
              <input {...register("original_price")} type="text" placeholder="Original Price" className="input input-bordered " />
              {/* {errors.name && <p className="text-red-500"><small>*{errors?.name?.message}</small></p>} */}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Resell Price</span> </label>
              <input {...register("resell_price")} type="text" placeholder="Resell Price" className="input input-bordered " />
              {/* {errors.name && <p className="text-red-500"><small>*{errors?.name?.message}</small></p>} */}
            </div>

          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Description</span> </label>
            <textarea {...register("description")} className="textarea textarea-bordered" placeholder="Bio"></textarea>
            {/* {errors.name && <p className="text-red-500"><small>*{errors?.name?.message}</small></p>} */}
          </div>

          <input className='btn btn-primary w-full my-5' type="submit" value='Add A Product' />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;