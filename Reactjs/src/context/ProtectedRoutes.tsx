import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthContext } from "../context/IsAuth";

function ProtectedRoute() {
  const {
    isUserLogedIn: { isAdmin },
  } = useIsAuthContext();
  console.log(isAdmin);

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
