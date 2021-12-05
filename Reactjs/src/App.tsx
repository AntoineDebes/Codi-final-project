import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IsAuthContextProvider } from "./context/IsAuth";
import Routes from "./component/Routes";
function App() {
  return (
    <IsAuthContextProvider>
      <div className="wrapper" id="wrapper">
        <Routes />
      </div>
    </IsAuthContextProvider>
  );
}

export default App;
