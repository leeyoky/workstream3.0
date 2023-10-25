import axios from "axios";

// const baseURL = "http://192.168.1.70:8081/";
const baseURL = "http://192.168.1.70:8888/"

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

instance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJFTVBOTSI6Iuq5gOybkOu0iSIsIkRFUFROTSI6IktN7YyAIiwic3ViIjoiMjAyMjAwMTQ1MyIsImlhdCI6MTY5NzA3NTU0NSwiZXhwIjoxNzY5MDc1NTQ1fQ.VXBXbnhmF9x2N7xpxgViCclrPPBxlizw5feMrbWWdnA'
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
