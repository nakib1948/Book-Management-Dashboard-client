import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/login";
import Signup from "../pages/signup/Signup";

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
]);

export default router;
