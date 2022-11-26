import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthPrivider';
import useAdmin from '../../Hooks/useAdmin';
import useSeller from '../../Hooks/useSeller';
import Footer from '../../Pages/Shared/Footer/Footer';
import Header from '../../Pages/Shared/Header/Header';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

  return (
    <div>
      <Header></Header>
      <div className="drawer drawer-mobile h-auto">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content z-1">
          {/* <!-- Page content here --> */}
          <Outlet></Outlet>

        </div>
        <div className="drawer-side z-1">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- admin route --> */}
            <li><Link to='/dashboard'>Dashboard</Link></li>
            <li><Link to='/dashboard/my-orders'>My Orders</Link></li>

            {
              isAdmin && <>
                <li><Link to='/dashboard/all-sellers'>All Sellers</Link></li>
                <li><Link to='/dashboard/all-buyers'>All Buyers</Link></li>
                <li><Link to='/dashboard/reported-items'>Reported Items</Link></li>
              </>
            }
            {/* buyer route have to remove dashboard */}
            {/* seller route have to remove dashboard */}
            {
              isSeller && <>
                <li><Link to='/dashboard/my-products'>My Products</Link></li>
                <li><Link to='/dashboard/add-a-product'>Add A Product</Link></li>
              </>
            }
          </ul>

        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;