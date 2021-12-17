import {
  BrowserRouter as Router,
  Route,
  Routes as ReactRoutes,
} from "react-router-dom";
import AddProductPage from "../AdminPages/AddProductPage";
import ProductUpdateRemove from "../AdminPages/ProductUpdateRemove";
import NavbarComponent from "../component/Navbar";
import ProtectedRoute from "../context/ProtectedRoutes";
import Homepage from "../pages/Homepage";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import EmailVerification from "./EmailVerification";

function Routes() {
  return (
    <Router>
      <NavbarComponent />
      <ReactRoutes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/addadminproducts" element={<AddProductPage />} />
          <Route
            path="/productupdateremove"
            element={<ProductUpdateRemove />}
          />
        </Route>
        <Route
          path="/verifyemail/:authtoken"
          element={<EmailVerification />}
        ></Route>
      </ReactRoutes>
    </Router>
  );
}

export default Routes;
