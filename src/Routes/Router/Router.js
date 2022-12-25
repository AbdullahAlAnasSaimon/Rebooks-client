import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import ShopLayout from "../../Layout/ShopLayout/ShopLayout";
import Blog from "../../Pages/Blog/Blog";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import MyBuyers from "../../Pages/Dashboard/MyBuyers/MyBuyers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import MyProfile from "../../Pages/Dashboard/MyProfile/MyProfile";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import ReportedItems from "../../Pages/Dashboard/ReportedItems/ReportedItems";
import LogIn from "../../Pages/LogIn/LogIn";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import Products from "../../Pages/Shop/Products/Products";
import Shop from "../../Pages/Shop/Shop";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main/Main");
const { default: Home } = require("../../Pages/Home/Home/Home");

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <LogIn></LogIn>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/blog',
        element: <Blog></Blog>
      },
    ]
  },
  {
    path: '/category',
    element: <PrivateRoute><ShopLayout></ShopLayout></PrivateRoute>,
    children: [
      {
        path: '/category',
        element: <PrivateRoute><Shop></Shop></PrivateRoute>
      },
      {
        path: '/category/:id',
        loader: ({params}) => fetch(`https://ebooks-server.vercel.app/category/${params.id}`,{
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        }),
        element: <PrivateRoute><Products></Products></PrivateRoute>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: '/dashboard',
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
      {
        path: '/dashboard/my-orders',
        element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
      },
      {
        path: '/dashboard/payment/:id',
        loader: ({params}) => fetch(`https://ebooks-server.vercel.app/my-orders/${params.id}`),
        element: <BuyerRoute><Payment></Payment></BuyerRoute>
      },
      {
        path: '/dashboard/all-sellers',
        element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
      },
      {
        path: '/dashboard/all-buyers',
        element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
      },
      {
        path: '/dashboard/reported-items',
        element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
      },
      {
        path: '/dashboard/add-a-product',
        element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
      },
      {
        path: '/dashboard/my-products',
        element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
      },
      {
        path: '/dashboard/my-buyers',
        element: <SellerRoute><MyBuyers></MyBuyers></SellerRoute>
      }
    ]
  },
  {
    path: '*',
    element: <DisplayError></DisplayError>
  }
])