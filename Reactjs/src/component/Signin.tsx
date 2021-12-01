import { useForm, SubmitHandler } from "react-hook-form";
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email address</label>
        <input
          type="email"
          placeholder="Enter email"
          {...register("email", { required: true })}
        />
      </div>
      <div>
        {errors.email && (
          <span className="text--danger">This field is required</span>
        )}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
      </div>
      <div>
        {errors.password && (
          <span className="text--danger">This field is required</span>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Signin;
