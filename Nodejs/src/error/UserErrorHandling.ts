interface UserRegisterErrorHandlingProps {
  error: {
    message: string;
  };
}

function UserRegisterErrorHandling({ error }: UserRegisterErrorHandlingProps) {
  let message = {};
  if (error.message.indexOf("users.user_name") > -1) {
    return (message = { userNameDuplicate: "This Username is taken" });
  } else if (error.message.indexOf("users.email") > -1) {
    return (message = { emailDuplicate: "This Email is taken" });
  } else if (error.message.indexOf("users.phone") > -1) {
    return (message = { phoneDuplicate: "This Phone is taken" });
  }
}

export default UserRegisterErrorHandling;
