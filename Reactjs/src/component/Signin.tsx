import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./Signin.css";
import API from "../API";
import Signup from "./Signup";
import { useClickOutside } from "../context/ClickOutside";

interface UserLoginModel {
  email: string;
  password: string;
}
interface SigninProps {
  setIsLoginOpen: Function;
}

function Signin({ setIsLoginOpen }: SigninProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginModel>();

  const domNode = useClickOutside(() => {
    setIsLoginOpen(false);
  });

  const onSubmit: SubmitHandler<UserLoginModel> = (data) => {
    let params: UserLoginModel = {
      email: data.email,
      password: data.password,
    };
    API({ method: "post", fetchApiUrl: "userLogin", data: params }).then(
      (res: any) => {
        if (res.status === 200) {
          localStorage.setItem("userCredentials", res.data);
          setIsLoginOpen(false);
        }
      }
    );
  };
  return (
    <>
      <div className="wrapper__signin__container">
        {isRegisterOpen ? (
          <Signup
            setIsRegisterOpen={setIsRegisterOpen}
            setIsLoginOpen={setIsLoginOpen}
            domNode={domNode}
          />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="wrapper__signin__form"
            ref={domNode}
          >
            <div
              className="wrapper__form__go-exit__btn"
              onClick={() => setIsLoginOpen(false)}
            >
              <i className="fas fa-times" />
            </div>
            <div>
              <label>Email address</label>
              <div className="wrapper__signin__form__input__container">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>
            </div>
            <div>
              {errors.email && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div>
              <label>Password</label>
              <div className="wrapper__signin__form__input__container">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
            <div>
              {errors.password && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="wrapper__signin__form__register__container">
              <p>Don't have an account? </p>
              <p
                onClick={() => setIsRegisterOpen(true)}
                className="links--dom gradient-color-link"
              >
                Register
              </p>
            </div>
            <button type="submit">Login</button>
          </form>
        )}
      </div>
    </>
  );
}

export default Signin;
