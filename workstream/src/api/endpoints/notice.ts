import axios from 'axios';
import { GetNoticeListParams, NoticeData, NoticeList } from '../../types/Main/Main';
import { getList } from '../../helpers/getList';

/**
 * 공지사항 게시판 API ( NODEJS SERVER)
 */

const NODE_API_SERVER = 'http://localhost:5500';

// 모든 notice list data를 가져옴
export const getNoticeList = (params: GetNoticeListParams) => {
  return getList('notice', params);
};

// 공지사항을 등록함
export const fetchNotice = (formData: NoticeData) => {
  return axios.post(`${NODE_API_SERVER}/notice`, formData);
};

// 첨부파일 가져오기
export const fetchFileList = (id: string) => {
  return axios.get(`${NODE_API_SERVER}/file/${id}`);
};

// 공지사항 중 id로 해당 공지사항을 가져옴
export const getNoticeData = (id: string) => {
  return axios.get(`${NODE_API_SERVER}/notice/${id}`);
};

// 글 수정, 임시저장 -> 저장/ 임시저장
export const updateNoticeData = (id: string, formData: NoticeList) => {
  return axios.patch(`${NODE_API_SERVER}/notice/${id}`, formData);
};

// 글 삭제
export const deleteNotice = (id: string) => {
  return axios.delete(`${NODE_API_SERVER}/notice/${id}`);
};

// 팝업 게시물 Y인 list를 가져옴
export const getPopupList = () => {
  return axios.get(`${NODE_API_SERVER}/popup`);
};
