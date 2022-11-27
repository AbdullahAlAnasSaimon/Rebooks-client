import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import ShopLayout from "../../Layout/ShopLayout/ShopLayout";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import MyProfile from "../../Pages/Dashboard/MyProfile/MyProfile";
import LogIn from "../../Pages/LogIn/LogIn";
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
        loader: ({params}) => fetch(`http://localhost:5000/category/${params.id}`),
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
        path: '/dashboard/all-sellers',
        element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
      },
      {
        path: '/dashboard/all-buyers',
        element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
      },
      {
        path: '/dashboard/add-a-product',
        element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
      },
      {
        path: '/dashboard/my-products',
        element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
      }
      
    ]
  }
])