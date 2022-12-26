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

  if (isAdminLoading || isSellerLoading || isBuyerLoading) {
    return <Loading />
  }

  return (
    <div>
      <Header></Header>
      <div className='w-11/12 mx-auto'>
        <label htmlFor="dashboard-drawer" tabIndex={1} className={`btn btn-ghost btn-square lg:hidden float-right`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#1569f2" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1569f2" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
          </svg>
        </label>
      </div>
      <div className="drawer drawer-mobile">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content z-1">
          {/* <!-- Page content here --> */}
          <Outlet></Outlet>
        </div>
        {
          <div className="drawer-side z-1">
            <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-72 bg-base-100 lg:bg-base-100/0 text-base-content">
              {/* <!-- admin route --> */}
              <li><Link className='md:h-[35px] md:my-1' to='/dashboard'>Dashboard</Link></li>
              {
                isBuyer && <>
                  <li><NavLink className='md:h-[35px] md:my-1' to='/dashboard/my-orders'>My Orders</NavLink></li>
                  <li><NavLink className='md:h-[35px] md:my-1' to='/dashboard/wishlist'>Wish List</NavLink></li>
                </>
              }
              {
                isAdmin && <>
                  <li><NavLink className='md:h-[35px] md:my-1' to='/dashboard/all-sellers'>All Sellers</NavLink></li>
                  <li><NavLink className='md:h-[35px] md:my-1' to='/dashboard/all-buyers'>All Buyers</NavLink></li>
                  <li><NavLink className='md:h-[35px] md:my-1' to='/dashboard/sold-products'>Sold Products</NavLink></li>
                  <li><NavLink className='md:h-[35px] md:my-1' to='/dashboard/reported-items'>Reported Items</NavLink></li>
                </>
              }
              {
                isSeller && <>
                  <li><NavLink className='md:h-[35px] md:my-1' to='/dashboard/add-a-product'>Add A Product</NavLink></li>
                  <li><NavLink className='md:h-[35px] md:my-1' to='/dashboard/my-products'>My Products</NavLink></li>
                  <li><NavLink className='md:h-[35px] md:my-1' to='/dashboard/my-buyers'>My Buyers</NavLink></li>
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