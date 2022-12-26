import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthPrivider';
import useAdmin from '../../Hooks/useAdmin';
import useBuyer from '../../Hooks/useBuyer';
import useSeller from '../../Hooks/useSeller';
import Footer from '../../Pages/Shared/Footer/Footer';
import Header from '../../Pages/Shared/Header/Header';
import Loading from '../../Pages/Shared/Loading/Loading';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);

  if(isAdminLoading || isSellerLoading || isBuyerLoading){
    return <Loading/>
  }

  return (
    <div>
      <Header></Header>
      <div className="drawer drawer-mobile">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content z-1">
          {/* <!-- Page content here --> */}
          <Outlet></Outlet>
        </div>
        {
          <div className="drawer-side z-1">
            <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-base-100 md:bg-base-100/0 text-base-content">
              {/* <!-- admin route --> */}
              <li><Link to='/dashboard'>Dashboard</Link></li>
              {
                isBuyer && <>
                <li><NavLink to='/dashboard/my-orders'>My Orders</NavLink></li>
                <li><NavLink to='/dashboard/wishlist'>Wish List</NavLink></li>
                </>
              }
              {
                isAdmin && <>
                  <li><NavLink to='/dashboard/all-sellers'>All Sellers</NavLink></li>
                  <li><NavLink to='/dashboard/all-buyers'>All Buyers</NavLink></li>
                  <li><NavLink to='/dashboard/sold-products'>Sold Products</NavLink></li>
                  <li><NavLink to='/dashboard/reported-items'>Reported Items</NavLink></li>
                </>
              }
              {
                isSeller && <>
                  <li><NavLink to='/dashboard/add-a-product'>Add A Product</NavLink></li>
                  <li><NavLink to='/dashboard/my-products'>My Products</NavLink></li>
                  <li><NavLink to='/dashboard/my-buyers'>My Buyers</NavLink></li>
                </>
              }
            </ul>
          </div>
        }
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;