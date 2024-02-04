import { Outlet } from "react-router-dom";
import Navbarr from "./shared/Navbar";


function App() {
  return (
    <div>
      <Navbarr/>
      <Outlet/>
    </div>
  );
}

export default App;
