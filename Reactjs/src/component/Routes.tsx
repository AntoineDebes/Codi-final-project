import {
  BrowserRouter as Router,
  Route,
  Routes as ReactRoutes,
} from "react-router-dom";
import NavbarComponent from "../component/Navbar";
import ProtectedRoute from "../context/ProtectedRoutes";
import Homepage from "../pages/Homepage";
import Products from "../pages/Products";

function Routes() {
  return (
    <Router>
      <NavbarComponent />
      <ReactRoutes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products />} />
        <Route element={<ProtectedRoute />}></Route>
      </ReactRoutes>
    </Router>
  );
}

export default Routes;
