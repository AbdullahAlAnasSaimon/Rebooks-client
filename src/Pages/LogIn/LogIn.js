import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthPrivider';
import useTitle from '../../Hooks/useTitle';
import useToken from '../../Hooks/useToken';

const LogIn = () => {
  useTitle('Log In');
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { userLogIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [token] = useToken(loginUserEmail);

  const from = location?.state?.from?.pathname || '/';

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, token]);

  const handleLogIn = data => {
    setProcessing(true);
    userLogIn(data.email, data.password)
      .then(result => {
        // const user = result.user;
        // console.log(user);
        setLoginUserEmail(data.email);
        setProcessing(false);
        toast.success('Log In Successfull');
      })
      .catch(err => {
        toast.error(err.message)
        setProcessing(false);
      });
  }

  const saveUserToDb = (name, email, role = 'Buyer') => {
    const userInfo = { name, email, role };
    console.log(userInfo);
    fetch('https://ebooks-server.vercel.app/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(email, data);
        setLoginUserEmail(email);
      })
  }

  const handleGoogleLogIn = () => {
    googleSignIn(googleProvider)
      .then(result => {
        const user = result.user;
        saveUserToDb(user?.displayName, user?.email);
        toast.success('Log In Successfull');
      })
      .catch(err => toast.error(err.message));
  }

  return (
    <div className='flex justify-center items-center my-10'>
      <div className="w-96 p-7 border-2 border-blue-300 rounded-lg">
        <h2 className='text-3xl font-bold mb-5'>Log In</h2>
        <form onSubmit={handleSubmit(handleLogIn)}>
          <div className="form-control w-full">
            <label className="label"><span className="label-text">Email</span> </label>
            <input {...register("email", {
              required: 'Email Address is required'
            })} type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
            {errors.email && <p className="text-red-500"><small>*{errors?.email?.message}</small></p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Password</span></label>
            <input {...register("password", { required: 'Password is required' })} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
            {errors.password && <p className="text-red-500"><small>*{errors?.password?.message}</small></p>}
            <label className="label"><span className="label-text">Forget Password</span></label>
          </div>

          <button className='btn bg-blue-500 hover:bg-blue-600 text-white border-0 w-full my-5' type="submit" disabled={processing}>{processing ? <>
            <svg class="animate-spin -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#8d8df0" stroke-width="4"></circle>
              <path class="opacity-75" fill="rgb(59, 130, 246)" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </> : 'Log In'}</button>

        </form>
        <p className='text-center'>New to ReBooks? <Link to='/signup' className='text-blue-500 underline'>Create An Account</Link></p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleLogIn} className='w-full btn btn-outline'>Continue With Google</button>
      </div>
    </div>
  );
};

export default LogIn;