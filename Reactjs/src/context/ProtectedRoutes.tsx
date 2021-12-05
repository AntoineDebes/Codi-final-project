import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthContext } from "../context/IsAuth";

function ProtectedRoute() {
  const { isUserLogedIn } = useIsAuthContext();
  console.log(isUserLogedIn);

  return isUserLogedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
