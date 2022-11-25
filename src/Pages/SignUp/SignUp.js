import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthPrivider';
import useTitle from '../../Hooks/useTitle/useTitle';

const SignUp = () => {
  useTitle('Sign Up');
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { createUser, updateUser, googleSignIn, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleSignUp = data => {
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        // logOut();
        toast.success('Account Created Successfully');
        const userProfile = {
          displayName: data?.name
        }

        updateUser(userProfile)
        .then(() => { 
          saveUserToDb(data?.name, data?.email, data?.role);
        })
        .catch(err => toast.error(err.message))
      })
      .catch(err => toast.error(err.message));
  }

  const saveUserToDb = (name, email, role = 'Buyer') =>{
    const userInfo = {name, email, role};
    console.log(userInfo);
    fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userInfo)
        })
        .then(res => res.json())
        .then(data =>{
          getUserToken(email);
        })
  }

  const handleGoogleSignUp = () => {
    googleSignIn(googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        saveUserToDb(user?.displayName, user?.email)
        toast.success('Log In Successfull');
      })
      .catch(err => toast.error(err.message));
  }

  // jwt step 2
  const getUserToken = email =>{
    fetch(`http://localhost:5000/jwt?email=${email}`)
    .then(res => res.json())
    .then(data => {
      if(data.accessToken){
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/login');
      }
    })
  }

  return (
    <div className=' flex justify-center items-center my-10'>
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
              <option>Buyer</option>
              <option>Seller</option>
            </select>
            {errors.role && <p className="text-red-500"><small>*{errors?.role?.message}</small></p>}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Photo</span></label>
            <input {...register("file")} type="file" className="file-input file-input-bordered w-full max-w-xs" />
            {/* {errors.file && <p className="text-red-500"><small>*{errors?.file?.message}</small></p>} */}
          </div>

          <input className='btn btn-primary w-full my-5' type="submit" value='Sign Up' />
        </form>
        <p className='text-center'>Already Have an Account? <Link to='/login' className='text-blue-500 underline'>Log In</Link></p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSignUp} className='w-full btn btn-outline'>Continue With Google</button>
      </div>
    </div>
  );
};

export default SignUp;