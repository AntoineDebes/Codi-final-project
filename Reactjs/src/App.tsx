import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IsAuthContextProvider } from "./context/IsAuth";
import Routes from "./component/Routes";
import Axios from "axios";
import { BounceLoader } from "react-spinners";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  Axios.interceptors.request.use((res) => {
    setIsLoading(true);
    return res;
  });

  Axios.interceptors.response.use((res) => {
    setIsLoading(false);

    return res;
  });

  return (
    <IsAuthContextProvider>
      {isLoading && (
        <div className="loading__popup__container">
          <BounceLoader loading={isLoading} size={150} color="purple" />
        </div>
      )}

      <div className="wrapper" id="wrapper">
        <Routes />
      </div>
    </IsAuthContextProvider>
  );
}

export default App;
