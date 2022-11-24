import LogIn from "../../Pages/LogIn/LogIn";
import Shop from "../../Pages/Shop/Shop";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

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
        path: '/shop',
        element: <PrivateRoute><Shop></Shop></PrivateRoute>
      }
    ]
  }
])