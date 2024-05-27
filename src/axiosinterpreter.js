import axios from 'axios';
//import axiosInstance from "./apiFallback";
import handle404Error from "./apiFallback";
console.log('in axiosinterpreter')

//https://axios-http.com/docs/interceptors
axios.interceptors.response.use(
  response => {
    return response;
  },
  //https://axios-http.com/docs/handling_errors
  error => {
    if (error.response && error.response.status === 404) {
      console.log('404 error detected in mock server and therefore trying fetching response from lh - 8000');
      return handle404Error(error);
    }
    return Promise.reject(error);
  }
);
