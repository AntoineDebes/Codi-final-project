import "./RegisterVerification.css";

interface RegisterVerificationProps {
  setIsLoginOpen: Function;
}

function RegisterVerification({ setIsLoginOpen }: RegisterVerificationProps) {
  return (
    <div className="email__verification__container">
      <div
        className="wrapper__form__go-exit__btn"
        onClick={() => setIsLoginOpen(false)}
      >
        <i className="fas fa-times" />
      </div>
      <h1>Please verify your email address</h1>
    </div>
  );
}

export default RegisterVerification;
    