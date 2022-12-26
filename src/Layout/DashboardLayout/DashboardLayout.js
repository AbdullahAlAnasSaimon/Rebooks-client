import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthPrivider';
import useAdmin from '../../Hooks/useAdmin';
import useBuyer from '../../Hooks/useBuyer';
import useSeller from '../../Hooks/useSeller';
import Footer from '../../Pages/Shared/Footer/Footer';
import Header from '../../Pages/Shared/Header/Header';
import Loading from '../../Pages/Shared/Loading/Loading';
import dashIcon from '../../images/icons/dashboard-5481.svg';

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
          <img src={dashIcon} alt="" className='w-6 h-6'/>
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
                  <li><NavLink className='md:h-[35px] md:my-1' to='/dashboard/add-a-product'>Add Product</NavLink></li>
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