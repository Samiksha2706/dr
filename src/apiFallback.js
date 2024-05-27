
/*
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 404) {
      const originalRequest = error.config;
      //only put
      return axios.put(`http://localhost:8000${originalRequest.url}`)
        .then(response => {
          return response;
        })
        .catch(error => {
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
*/
/*
import axios from 'axios';

const handle404Error = (error) => {
  if (error.response && error.response.status === 404) {
    const originalRequest = error.config;
    //only delete 
    return axios.delete(`http://localhost:8000${originalRequest.url}`)
      .then(response => {
       
        return response;
      })
      .catch(error => {
        // Reject with the error from the original API
        return Promise.reject(error);
      });
  }
  return Promise.reject(error);
};

export default handle404Error;
*/
import axios from 'axios';
console.log('in apifallback.js')
const handle404Error = (error) => {
  if (error.response && error.response.status === 404) {
    const originalRequest = error.config;
    const { method, url, data } = originalRequest;

    let fallbackRequest;

    switch (method.toLowerCase()) {
      case 'post':
        console.log('case - post');
        fallbackRequest = axios.post(`http://localhost:8000${url}`, data);
        break;
      case 'put':
        console.log('case - put');
        fallbackRequest = axios.put(`http://localhost:8000${url}`, data);
        break;
      case 'delete':
        console.log('case - delete');
        fallbackRequest = axios.delete(`http://localhost:8000${url}`);
        break;
      default:

        fallbackRequest = axios.get(`http://localhost:8000${url}`);
    }
    //fallback request
    return fallbackRequest
      .then(response => {
        console.log('fallback accepted')
        return response;
        
      })
      .catch(error => {
        console.log('fallback rejected')
        return Promise.reject(error);
        
      });
  }

  return Promise.reject(error);
};

export default handle404Error;

