import "./App.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { Login } from "./admin/Login";
import { HomeAdmin } from "./admin/HomeAdmin";
import { AddProduct } from "./admin/AddProduct";
import { ShowAllProds } from "./admin/ShowAllProds";
import { GetProdById } from "./admin/GetProdById";
// import Dash from "./sidebar/Dash";
function App() {
  // axios.defaults.baseURL = "https://bookmycloth-mern.onrender.com/api/";
  axios.defaults.baseURL = "http://localhost:9999/api/";

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin/home" element={<HomeAdmin />}></Route>

        <Route path="/admin/addproduct" element={<AddProduct />}></Route>
        <Route path="/admin/showallproduct" element={<ShowAllProds />}></Route>
        <Route path="/admin/getprodbyid/:_id" element={<GetProdById />}></Route>

        {/* <Route path="/" element={<Login />}></Route> */}
        {/* <Route path="/admin/home" element={<Homeadmin />}></Route>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<SideBarEx1 />}></Route>
        <Route path="/dash" element={<Dash />}></Route> */}
      </Routes>
    </div>
    // <div>
    //   <SideNav/>
    // </div>
  );
}

export default App;
