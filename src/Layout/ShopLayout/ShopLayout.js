import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Footer from '../../Pages/Shared/Footer/Footer';
import Header from '../../Pages/Shared/Header/Header';
import Loading from '../../Pages/Shared/Loading/Loading';
import dashIcon from '../../images/icons/dashboard-5481.svg';

const ShopLayout = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    axios.get('https://ebooks-server.vercel.app/category')
    .then(data => {
      setCategories(data.data);
      setIsLoading(false);
    });
  }, [])

  if(isLoading){
    return <Loading/>
  }
  

  return (
      <div>
        <Header></Header>
        <div className='w-11/12 mx-auto'>
        <label htmlFor="category-drawer" tabIndex={1} className={`btn btn-ghost btn-square lg:hidden float-right`}>
          <img src={dashIcon} alt="" className='w-6 h-6'/>
        </label>
      </div>
        <div className="drawer drawer-mobile h-auto relative md:w-[95%] mx-auto overflow-visible">
          <input id="category-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content z-0">
            {/* <!-- Page content here --> */}
            <Outlet></Outlet>
            {/* <label htmlFor="category-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

          </div>
          <div className="drawer-side z-1 md:sticky md:top-[55px] md:max-h-[100vh - 1rem] md:overflow-y-scroll md:inline-block">
            <label htmlFor="category-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-72 bg-base-100 lg:bg-base-100/0 text-base-content">
            <div className='md:my-1 font-semibold pl-4'>Books Categories</div>
              {/* <!-- Sidebar content here --> */}
              <li><Link className='md:h-[35px] md:my-1' to={`/category`}>All Books</Link></li>
              { !isLoading &&
                categories.map(category => <li key={category._id}><NavLink className='md:h-[35px] md:my-1' to={`/category/${category?._id}`}>{category?.category_name}</NavLink></li>)
              }
            </ul>
          </div>
        </div>
        <Footer></Footer>
      </div>
  );
};

export default ShopLayout;