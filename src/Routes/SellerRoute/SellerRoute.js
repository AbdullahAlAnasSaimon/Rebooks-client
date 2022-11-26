import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthPrivider';
import useSeller from '../../Hooks/useSeller';
import Loading from '../../Pages/Shared/Loading/Loading';

const SellerRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const [isSeller] = useSeller(user?.email);
  const location = useLocation()

  if (loading) {
    return <Loading />
  }

  if (user && isSeller) {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default SellerRoute;