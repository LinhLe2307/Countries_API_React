import axios from "axios";

const getAll = (baseURL) => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

export { getAll };
