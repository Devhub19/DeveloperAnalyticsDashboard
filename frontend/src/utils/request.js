import axios from "axios";

export const request = async ({ method, params, url, userData }) => {
  const queryParams = params ? params : "";
  const response = await axios({
    method,
    params: queryParams,
    url: `${process.env.REACT_APP_API_BASE_URL}${url}`,
    data: userData,
  });
  return response.data;
};
