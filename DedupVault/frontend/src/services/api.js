import axios from "axios";

// create a reusable Axios instance

const api = axios.create({

  // backend API's base address.
  baseURL: "http://127.0.0.1:8000/api/v1",

  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config)=>{
    // Retrieve JWT token from browser storage
    const token =
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token');

    // Attach token to request headers
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api;
