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
import Footer from "./Footer";

function Routes() {
  return (
    <Router>
      <NavbarComponent />
      <ReactRoutes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products />} />
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
        <Route path="/cart" element={<Cart />} />
      </ReactRoutes>
      <Footer />
    </Router>
  );
}

export default Routes;
