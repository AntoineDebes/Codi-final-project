import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EmailVerification.css";
import Api from "../API";

function EmailVerification(props: any) {
  const { authtoken } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    Api({
      method: "post",
      fetchApiUrl: "emailverification",
      tokenProp: authtoken,
    }).then((res) => {
      if (res) {
        console.log("yes");
      }
    });
  }, []);
  function NavigateToSignIn() {
    navigate("/", { replace: true });
  }
  return (
    <div className="wrapper__content__verification-email__container--before">
      <div className="wrapper__content__verification-email">
        <h3 className="test">Thank you for validating your email address.</h3>
        <div className="wrapper__content__verification-email__container">
          <p>Your account has been activated.</p>
          <p>Please Proceed to Login</p>
        </div>
        <button className="button__submit__signup" onClick={NavigateToSignIn}>
          CONTINUE
        </button>
      </div>
    </div>
  );
}

export default EmailVerification;
