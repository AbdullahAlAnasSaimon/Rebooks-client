import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const handleLogIn = data => {
    console.log(data);
  }

  return (
    <div className='flex justify-center items-center my-10'>
      <div className="w-96 p-7 border-2 border-blue-300 rounded-lg">
        <h2 className='text-3xl font-bold'>Log In</h2>
        <form onSubmit={handleSubmit(handleLogIn)}>
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
              minLength: {value: 6, message: 'Password must be 6 character or longer'}
              })} type="password" placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
            {errors.password && <p className="text-red-500"><small>*{errors?.password?.message}</small></p>}
            <label className="label"><span className="label-text">Forget Password</span></label>
          </div>
          <input className='btn btn-primary w-full my-3' type="submit" value='Log In' />
        </form>
        <p>New to eBooks? <Link to='/signup' className='text-blue-500 underline'>Create An Account</Link></p>
        <div className="divider">OR</div>
        <button className='w-full btn btn-outline'>Continue With Google</button>
      </div>
    </div>
  );
};

export default LogIn;