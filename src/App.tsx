

import "./App.css";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/login";

function App() {
  return (
    <div>
      <Login/>
      <div><Toaster/></div>
    </div>
  );
}

export default App;
