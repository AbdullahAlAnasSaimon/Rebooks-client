import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import ShopLayout from "../../Layout/ShopLayout/ShopLayout";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
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
    path: '/shop',
    element: <ShopLayout></ShopLayout>,
    children: [
      {
        path: '/shop',
        element: <Shop></Shop>
      },
      {
        path: '/shop/category/:id',
        element: <Products></Products>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: '/dashboard',
        element: <AllSellers></AllSellers>
      },
      {
        path: '/dashboard/all-buyers',
        element: <AllBuyers></AllBuyers>
      },
      {
        path: '/dashboard/my-orders',
        element: <MyOrders></MyOrders>
      },
      {
        path: '/dashboard/add-a-product',
        element: <AddProduct></AddProduct>
      }
    ]
  }
])