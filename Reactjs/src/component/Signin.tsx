import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Signin.css";
import API from "../API";

interface userLoginModel {
  email: string;
  password: string;
}

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginModel>();

  const onSubmit: SubmitHandler<userLoginModel> = (data) => {
    let params: userLoginModel = {
      email: data.email,
      password: data.password,
    };
    API({ method: "post", fetchApiUrl: "userLogin", data: params }).then(
      (res) => {
        console.log(res);
      }
    );
  };
  return (
    <div className="wrapper__signin__container">
      <form onSubmit={handleSubmit(onSubmit)} className="wrapper__signin__form">
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
            <span className="text--danger">This field is required</span>
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
            <span className="text--danger">This field is required</span>
          )}
        </div>
        <div className="wrapper__signin__form__register__container">
          <p>Don't have an account? </p>
          <Link to="/signup" className="links--dom gradient-color-link">
            Register
          </Link>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signin;
