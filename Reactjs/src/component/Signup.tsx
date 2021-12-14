import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Api from "../API";
import {
  UserRegisterModel,
  ResponseErrorMessageModel,
} from "../Models/FormModels/Signup.model";
import "./Signup.css";
import RegisterVerification from "../component/RegisterVerification";

interface SignupProps {
  setIsRegisterOpen: Function;
  setIsLoginOpen: Function;
  domNode: any;
}

function Signup({ setIsRegisterOpen, setIsLoginOpen, domNode }: SignupProps) {
  const [conditionAndTermsAgree, setConditionAndTermsAgree] =
    useState<boolean>(false);
  const [isEmailVerificationOpen, setIsEmailVerificationOpen] = useState(false);

  const [
    { userNameDuplicate, phoneDuplicate, emailDuplicate },
    setResponseErrorMessage,
  ] = useState<ResponseErrorMessageModel>({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserRegisterModel>();

  const password = useRef({});
  password.current = watch("password", "");

  const handleTermsAndConditions = () => {
    setConditionAndTermsAgree(!conditionAndTermsAgree);
  };

  const onSubmit: SubmitHandler<UserRegisterModel> = (data) => {
    setResponseErrorMessage({});
    let params: UserRegisterModel = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      phone: data.phone,
      address: data.address,
    };
    Api({
      method: "post",
      fetchApiUrl: "userRegister",
      data: params,
    })
      .then((res: any) => {
        if (res.status === 200) {
          // setIsLoginOpen(false);
          setIsEmailVerificationOpen(true);
        }
        setTimeout(() => {
          setIsRegisterOpen(false);
          setIsEmailVerificationOpen(false);
        }, 10000);
      })
      .catch((err) => {
        const errorMessage = err.response.data;
        setResponseErrorMessage(errorMessage);
      });
  };
  return !isEmailVerificationOpen ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="wrapper__signup__form"
      ref={domNode}
    >
      <div
        className="wrapper__form__go-back__btn"
        onClick={() => setIsRegisterOpen(false)}
      >
        <i className="fas fa-long-arrow-alt-left" />
      </div>
      <div
        className="wrapper__form__go-exit__btn"
        onClick={() => setIsLoginOpen(false)}
      >
        <i className="fas fa-times" />
      </div>
      <div>
        <div>
          <div>
            <label>First name</label>
            <div className="wrapper__signin__form__input__container">
              <input
                type="text"
                {...register("firstName", { required: true })}
              />
            </div>
            <div>
              {errors.firstName && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
          </div>

          <div>
            <label>Last name</label>
            <div className="wrapper__signin__form__input__container">
              <input
                type="text"
                {...register("lastName", { required: true })}
              />
            </div>
            <div>
              {errors.lastName && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
          </div>

          <div>
            <label>Username</label>
            <div className="wrapper__signin__form__input__container">
              <input
                type="text"
                {...register("userName", { required: true })}
              />
            </div>
            <div>
              {errors.userName && (
                <span className="text-danger">This field is required</span>
              )}
              {userNameDuplicate && (
                <span className="text-danger">{userNameDuplicate}</span>
              )}
            </div>
          </div>

          <div>
            <label>Email</label>
            <div className="wrapper__signin__form__input__container">
              <input
                type="text"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
            </div>
            <div>
              {errors.email && (
                <span className="text-danger">This field is required</span>
              )}
              {emailDuplicate && (
                <span className="text-danger">{emailDuplicate}</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <div>
            <label>Phone</label>
            <div className="wrapper__signin__form__input__container">
              <input
                type="text"
                {...register("phone", {
                  required: true,
                  pattern: {
                    value: /^\d{5,}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
            </div>
            <div>
              {errors.phone && errors.phone.type === "required" && (
                <span className="text-danger">This field is required</span>
              )}
              {errors.phone && errors.phone.type === "pattern" && (
                <span className="text-danger">{errors.phone.message}</span>
              )}
              {phoneDuplicate && (
                <span className="text-danger">{phoneDuplicate}</span>
              )}
            </div>
          </div>

          <div>
            <label>Address</label>
            <div className="wrapper__signin__form__input__container">
              <input
                type="text"
                {...register("address", {
                  required: true,
                })}
              />
            </div>
            <div>
              {errors.address && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
          </div>

          <div>
            <label>Password</label>
            <div className="wrapper__signin__form__input__container">
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true, minLength: 8 })}
              />
            </div>
            <div>
              {errors.password && errors.password.type === "required" && (
                <span className="text-danger">This field is required</span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className="text-danger">
                  Password must be at least 8 characters
                </span>
              )}
            </div>
          </div>

          <div>
            <label>Confirm password</label>
            <div className="wrapper__signin__form__input__container">
              <input
                type="password"
                placeholder="Password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
            </div>
            <div>
              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "validate" && (
                  <span className="text-danger">Passwords do not match</span>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper__signup__terms">
        <input type="checkbox" onClick={handleTermsAndConditions} />
        <p>
          I have read and agree to the
          <span style={{ color: "var(--primary-color)", fontWeight: 600 }}>
            Terms and Conditions
          </span>
        </p>
      </div>
      <button
        disabled={!conditionAndTermsAgree}
        type="submit"
        className="button__submit__signup"
      >
        Submit
      </button>
    </form>
  ) : (
    <RegisterVerification setIsLoginOpen={setIsLoginOpen} />
  );
}

export default Signup;
