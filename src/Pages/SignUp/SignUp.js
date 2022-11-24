import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const handleSignUp = data => {
    console.log(data);
  }

  return (
    <div className='h-[600px] flex justify-center items-center my-10'>
      <div className="w-96 p-7 border-2 border-blue-300 rounded-lg">
        <h2 className='text-3xl font-bold'>Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
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
              minLength: { value: 6, message: 'Password must be 6 character or longer' }
            })} type="password" placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
            {errors.password && <p className="text-red-500"><small>*{errors?.password?.message}</small></p>}
            <label className="label"><span className="label-text">Forget Password</span></label>
          </div>
          <input className='btn btn-primary w-full my-3' type="submit" value='Sign Up' />
        </form>
        <p>Already Have an Account? <Link to='/login' className='text-blue-500 underline'>Log In</Link></p>
        <div className="divider">OR</div>
        <button className='w-full btn btn-outline'>Continue With Google</button>
      </div>
    </div>
  );
};

export default SignUp;