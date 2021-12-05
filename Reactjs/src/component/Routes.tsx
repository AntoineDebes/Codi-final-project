import {
  BrowserRouter as Router,
  Route,
  Routes as ReactRoutes,
} from "react-router-dom";
import NavbarComponent from "../component/Navbar";
import ProtectedRoute from "../context/ProtectedRoutes";
import Homepage from "../pages/Homepage";
import Signin from "./Signin";
import Signup from "./Signup";

function Routes() {
  return (
    <Router>
      <NavbarComponent />
      <ReactRoutes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<ProtectedRoute />}></Route>
        <Route path="/signup" element={<Signup />} />
      </ReactRoutes>
    </Router>
  );
}

export default Routes;
