import axios from 'axios';

const NODE_API_SERVER = 'http://localhost:5500';

// 공지사항을 등록함
export const fetchAddress = () => {
  return axios.get(`${NODE_API_SERVER}/address`);
};
