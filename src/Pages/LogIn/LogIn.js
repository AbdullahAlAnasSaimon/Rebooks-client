import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const { register, handleSubmit } = useForm();

  const handleLogIn = data =>{
    console.log(data);
  }

  return (
    <div className='h-[500px] flex justify-center items-center'>
      <div className="w-96 p-7">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit(handleLogIn)}>
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Email</span> </label>
            <input {...register("email")} type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Password</span></label>
            <input {...register("password")} type="password" placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
            <label className="label"><span className="label-text">Forget Password</span></label>
          </div>
          <input className='btn btn-primary w-full my-3' type="submit" value='Log In'/>
        </form>
        <p>New to eBooks? <Link to='/signup' className='text-blue-500 underline'>Create An Account</Link></p>
        <div className="divider">OR</div>
        <button className='w-full btn btn-outline'>Continue With Google</button>
      </div>
    </div>
  );
};

export default LogIn;