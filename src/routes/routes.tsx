import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/login";
import Signup from "../pages/signup/Signup";
import BookLayout from "../pages/dashboard/Allbooks/BookLayout";
import Addbook from "../pages/dashboard/Addbook/Addbook";
import SalesHistory from "../pages/dashboard/sales/SalesHistory";
import ProtectedRoute from "./ProtectedRoute";
import Checkout from "../pages/dashboard/Cart/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <BookLayout />,
      },
      {
        path: "/addbook",
        element: <Addbook />,
      },
      {
        path: "/saleshistory",
        element: <SalesHistory />,
      },
      {
        path: "/cart",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

export default router;
