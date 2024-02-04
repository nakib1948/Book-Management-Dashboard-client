import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/login";
import Signup from "../pages/signup/Signup";
import Allbooks from "../pages/dashboard/Allbooks/Allbooks";
import BookLayout from "../pages/dashboard/Allbooks/BookLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
     
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
  {
    path: "allbooks",
    element: <BookLayout />,
  },
]);

export default router;
