import axios from 'axios';
import { NoticeData, NoticeList } from '../../types/Main/Main';

/**
 * 공지사항 게시판 API ( NODEJS SERVER)
 */

const NODE_API_SERVER = 'http://localhost:5500';

export const getNoticeList = () => {
  return axios.get(`${NODE_API_SERVER}/notice`);
};

// export const getNoticeList = (params: GetNoticeListParams) => {
//   return getList('notice', params);
// };

export const fetchNotice = (formData: NoticeData) => {
  return axios.post(`${NODE_API_SERVER}/notice`, formData);
};

export const getNoticeData = (id: string) => {
  return axios.get(`${NODE_API_SERVER}/notice/${id}`);
};

export const updateNoticeData = (id: string, formData: NoticeList) => {
  return axios.patch(`${NODE_API_SERVER}/notice/${id}`, formData);
};

export const deleteNotice = (id: string) => {
  return axios.delete(`${NODE_API_SERVER}/notice/${id}`);
};
