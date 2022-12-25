import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../Pages/Shared/Footer/Footer';
import Header from '../../Pages/Shared/Header/Header';
import Loading from '../../Pages/Shared/Loading/Loading';

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
        <div className="drawer drawer-mobile h-auto relative md:w-[95%] mx-auto">
          <input id="category-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content z-0">
            {/* <!-- Page content here --> */}
            <Outlet></Outlet>
            {/* <label htmlFor="category-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

          </div>
          <div className="drawer-side z-1 md:sticky md:top-[0rem] md:max-h-[100vh - 1rem] md:overflow-y-scroll md:inline-block">
            <label htmlFor="category-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-base-100 lg:bg-base-100/0 text-base-content">
              {/* <!-- Sidebar content here --> */}
              <li><Link to={`/category`}>All Books</Link></li>
              { !isLoading &&
                categories.map(category => <li key={category._id}><Link to={`/category/${category?._id}`}>{category?.category_name}</Link></li>)
              }
            </ul>
          </div>
        </div>
        <Footer></Footer>
      </div>
  );
};

export default ShopLayout;