import { Toaster } from "react-hot-toast";
import Login from "./pages/login/login";
import { Outlet } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
