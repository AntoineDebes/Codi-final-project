import NavbarComponent from "../component/Navbar";
import Signin from "../component/Signin";
import Signup from "../component/Signup";

function Homepage(): JSX.Element {
  return (
    <div className="wrapper__navbar__footer">
      <NavbarComponent />
      {/* <Signin /> */}
      {/* <Signup /> */}
    </div>
  );
}

export default Homepage;
