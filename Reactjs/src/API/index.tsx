import Axios, { Method } from "axios";

interface ApiProps {
  method: Method;
  fetchApiUrl: string;
  data?: any;
  params?: any;
}

function Api({ method, fetchApiUrl, data, params }: ApiProps) {
  const token = localStorage.getItem("login") ?? "";

  return new Promise((res, rej) => {
    Axios({
      method, // Method like GET, POST, DELETE, PUT ...
      url: `${process.env.REACT_APP_API_URL}${fetchApiUrl}`,
      headers: {
        Authorization: token, // sending the token for the verification
      },
      data, // data passed
      params,
    })
      .then((response) => {
        console.log(response);
        res(response);
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  });
}

export default Api;
