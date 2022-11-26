import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import ShopLayout from "../../Layout/ShopLayout/ShopLayout";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import LogIn from "../../Pages/LogIn/LogIn";
import Products from "../../Pages/Shop/Products/Products";
import Shop from "../../Pages/Shop/Shop";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
        element: <PrivateRoute><AllSellers></AllSellers></PrivateRoute>
      },
      {
        path: '/dashboard/all-buyers',
        element: <PrivateRoute><AllBuyers></AllBuyers></PrivateRoute>
      },
      {
        path: '/dashboard/my-orders',
        element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
      },
      {
        path: '/dashboard/add-a-product',
        element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
      },
      {
        path: '/dashboard/my-products',
        element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
      }
    ]
  }
])