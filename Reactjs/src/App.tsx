import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IsAuthContextProvider } from "./context/IsAuth";
import Routes from "./component/Routes";
import Axios from "axios";
import { BounceLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./context/AppContext";
import Api from "./API";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  Axios.interceptors.request.use((res: any) => {
    if (res.url.match(/userLogin$/)) return res;
    setIsLoading(true);
    return res;
  });

  Axios.interceptors.response.use(
    (res: any) => {
      if (res || res.status !== 200) {
        setTimeout(()=>{
          setIsLoading(false);
        },1000)    
      }
      return res;
    },
    (err: any) => {
      setTimeout(()=>{
        setIsLoading(false);
      },1000)
      return Promise.reject(err);
    }
  );

  return (
    <IsAuthContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isLoading && (
        <div className="loading__popup__container">
          <BounceLoader loading={isLoading} size={150} color="var(--primary-color)" />
        </div>
      )}

      <div className="wrapper" id="wrapper">
        <Routes />
      </div>
    </IsAuthContextProvider>
  );
}

export default App;
