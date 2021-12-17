import { useEffect } from "react";
import { useIsAuthContext } from "../context/IsAuth";

export default function Cart() {
  const {
    isUserLogedIn: { isAdmin, isUserAuth },
    setIsUserLogedIn,
  } = useIsAuthContext();
  useEffect(() => {
    if (isUserAuth) {
      // Do api call
    } else {
      // get things from localstorage
    }
  }, []);

  return <div>This is Cart {isAdmin ? "Admin" : "Not logged in"}</div>;
}
