/**
 * 공지사항 게시판 API ( NODEJS SERVER)
 */

import axios from 'axios';

export const getNoticeList = () => {
  return axios.get('http://localhost:5500/notice');
};

export const fetchNotice = formData => {
  return axios.post('http://localhost:5500/notice', formData);
};

export const getNoticeData = (id: string) => {
  return axios.get(`http://localhost:5500/notice/${id}`);
};
