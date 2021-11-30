import Axios from "axios";

interface ApiProps {
  method: any;
  fetchApiUrl: string;
  selectedIds?: {} | [];
}

function Api({ method, fetchApiUrl, selectedIds }: ApiProps) {
  const token = localStorage.getItem("login") ?? "";

  return new Promise((res, rej) => {
    Axios({
      method: method, // Method like GET, POST, DELETE, PUT ...
      url: `${process.env.REACT_APP_API_URL}${fetchApiUrl}`,
      headers: {
        Authorization: token, // sending the token for the verification
      },
      data: {
        // This section is for the deleted ids it sends in the body
        ids: selectedIds,
      },
    })
      .then((response) => {
        res(response);
      })
      .catch((e) => {
        localStorage.clear();
        rej(e);
      });
  });
}

export default Api;
