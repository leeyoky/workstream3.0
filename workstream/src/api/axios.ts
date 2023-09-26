import axios from "axios";

const baseURL = "http://192.168.1.70:8081/"

  export const instance = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

export function login(userData: any) {
  return instance.post("login", userData)
}

export function getUsersInfo() {
  return instance.get("users")
}

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(token);
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios
