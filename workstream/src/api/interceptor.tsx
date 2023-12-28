import axios from 'axios';
import store from '../store';
import { authActions } from '../store/auth-slice';

const baseURL = '/api/';

const setAuthorizationHeader = () => {
  return `Bearer ${localStorage.getItem('token')}`;
};

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: setAuthorizationHeader(),
    },
    withCredentials: true,
  });

  // 요청 전달 전 작업 수행
  instance.interceptors.request.use(
    config => {
      config.headers.Authorization = setAuthorizationHeader();
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const originalConfig = error.config;
      if (error.response && error.response.status === 401) {
        const newAccessToken = error.response.headers.authorization;
        if (newAccessToken) {
          localStorage.removeItem('token');
          localStorage.setItem('token', newAccessToken.replace('Bearer ', ''));
          originalConfig.headers = {
            Authorization: 'Bearer ' + newAccessToken,
          };
          return await axios(originalConfig);
        } else if (newAccessToken === null || newAccessToken === undefined) {
          // console.log('리프레시토큰 만료 ', newAccessToken);
          localStorage.removeItem('token');
          alert('토큰 만료로 인해 로그아웃 되었습니다.');
          store.dispatch(authActions.logout());
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const instance = createAxiosInstance();
