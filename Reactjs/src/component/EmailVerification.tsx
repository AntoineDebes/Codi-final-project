import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    <div>
      <div className="wrapper__content__verification-email">
        <div>
          <h3>Thank you for validating your email address.</h3>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <div>
            <p>Your account has been activated.</p>
          </div>
          <div>
            <p>Please Proceed to Login</p>
          </div>
        </div>
        <div>
          <button onClick={NavigateToSignIn}>CONTINUE</button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
