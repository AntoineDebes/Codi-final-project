interface ApiErrorHandlingProps {
  errorResponse: string;
  setResponseErrorMessage: Function;
}

function ApiErrorHandling({
  errorResponse,
  setResponseErrorMessage,
}: ApiErrorHandlingProps) {
  if (errorResponse.indexOf("users.user_name") > -1) {
    setResponseErrorMessage({ userNameDuplicate: "This Username is taken" });
  } else if (errorResponse.indexOf("users.email") > -1) {
    setResponseErrorMessage({ emailDuplicate: "This Email is taken" });
  } else if (errorResponse.indexOf("users.phone") > -1) {
    setResponseErrorMessage({ phoneDuplicate: "This Phone is taken" });
  }
  return <> </>;
}

export default ApiErrorHandling;
