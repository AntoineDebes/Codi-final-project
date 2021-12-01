import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ApiErrorHandling from "../API/ApiErrorHandling";
import Api from "../API";
import {
  UserRegisterModel,
  ResponseErrorMessageModel,
} from "../Models/FormModels/Signup.model";

function Signup() {
  const [conditionAndTermsAgree, setConditionAndTermsAgree] =
    useState<boolean>(false);

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
      fetchApiUrl: "users",
      data: params,
    })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        ApiErrorHandling({
          errorResponse: err.response.data.message,
          setResponseErrorMessage,
        });
        console.log(err.response.data);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First name</label>
        <input type="text" {...register("firstName", { required: true })} />
      </div>
      <div>
        {errors.firstName && (
          <span className="text-danger">This field is required</span>
        )}
      </div>
      <div>
        <label>Last name</label>
        <input type="text" {...register("lastName", { required: true })} />
      </div>
      <div>
        {errors.lastName && (
          <span className="text-danger">This field is required</span>
        )}
      </div>
      <div>
        <label>Username</label>
        <input type="text" {...register("userName", { required: true })} />
      </div>
      <div>
        {errors.userName && (
          <span className="text-danger">This field is required</span>
        )}
        {userNameDuplicate && (
          <span className="text-danger">{userNameDuplicate}</span>
        )}
      </div>
      <div>
        <label>Email</label>
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
      <div>
        <label>Phone</label>
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
      <div>
        <label>Address</label>
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
      <div>
        <label>Password</label>
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
      <div>
        <label>Confirm password</label>
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
      <input type="checkbox" onClick={handleTermsAndConditions} />
      <button disabled={!conditionAndTermsAgree} type="submit">
        Submit
      </button>
    </form>
  );
}

export default Signup;
