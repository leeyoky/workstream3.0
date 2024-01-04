import { instance } from './interceptor';
import {
  docData,
  commentData,
  fetchCommentData,
  approveResultData,
  resinationDocData,
  executiondocData,
} from '../types/Approval/Approaval';
import { AxiosResponse } from 'axios';

/* AUTH */
export function login(formData: FormData) {
  return instance.post('login', formData);
}

export function logoutUser() {
  return instance.delete('logout');
}

export function getUsersInfo() {
  return instance.get('users');
}

export function getDepartment() {
  return instance.get('dept');
}

// 모든 유저 정보
export function getEmployeeInfo() {
  return instance.get('emp?size=300');
}

// 특정 유저 정보
export function getUserInfo(empNo: string) {
  return instance.get(`emp?empNo=${empNo}`);
}

// 로그인한 유저 정보 가져오기
export function getLoginUserInfo() {
  return instance.get('user');
}

// 유저 입사정보 가져오기
export function getEnteredDate(empNo: string) {
  return instance.get(`emp/enter-date/${empNo}`);
}
/* Create */

// 기본 품의서 등록
export function fetchApprovalData(formData: docData) {
  return instance.post('approval', formData);
}
// 사직원 등록
export function fetchResignationData(formData: resinationDocData) {
  return instance.post('approval/resignation', formData);
}

export function fetchExecutionData(formData: executiondocData) {
  return instance.post('approval/execution', formData);
}

/* Read */

// 품의서 정보 가져오기
export function getApprovalData(id: string) {
  return instance.get(`approval/${id}`);
}

// 사직원 정보 가져오기
export function getResignationData(id: string) {
  return instance.get(`approval/resignation/${id}`);
}

// 시행문 정보 가져오기
export function getExecutionData(id: string) {
  return instance.get(`approval/execution/${id}`);
}

/* File */

// 첨부파일 등록
export function fetchFileData(formData: FormData) {
  return instance.post('file', formData);
}

// 첨부파일 다운로드
export function getFileData(fileId: number): Promise<AxiosResponse<Blob>> {
  return instance.get(`approval/file/${fileId}`, { responseType: 'blob' });
}

// 첨부파일 삭제
export function deleteFileData(fileId: number) {
  return instance.delete(`file/${fileId}`);
}

/* Comment */

// 댓글 작성
export function fetchComment(commentData: fetchCommentData) {
  return instance.post('approval/comment', commentData);
}

// 댓글 수정
export function updateComment(commentData: commentData) {
  return instance.patch('approval/comment', commentData);
}

// 댓글 삭제
export function deleteComment(commentId: number) {
  return instance.delete(`approval/comment/${commentId}`);
}

/* Update */
// 문서 회수 ( 상태를 임시저장으로 )
export function fetchRecallDocument(id: string) {
  return instance.patch(`approval/cancel/${id}`);
}

// 임시저장상태에서 수정 ( 기본 품의서 )
export function updateDocument(formData: docData) {
  return instance.patch('approval', formData);
}

// 임시저장상태에서 수정 ( 사직원 )
export function updateResignation(formData: resinationDocData) {
  return instance.patch('approval/resignation', formData);
}

// 임시저장상태에서 수정 ( 시행문 )
export function updatedExecution(formData: executiondocData) {
  return instance.patch('approval/execution', formData);
}

/* Delete */
export function deleteDocument(id: string) {
  return instance.delete(`approval/${id}`);
}

/* 결재건 개수 */
export function countDoucumentType() {
  return instance.get('approval/count');
}

/* 결재 */
// 결재 승인/반려
export function fetchApproveDocument(resultData: approveResultData) {
  return instance.patch('approval-line', resultData);
}
// 결재 승인/반려 취소
export function updateApproveDocument(id: number) {
  return instance.patch(`approval-line/${id}`);
}

export function getApprovalList(params: {
  id: string;
  page?: number;
  size?: number;
  state?: string;
  pendingApproval?: string;
  title?: string;
  deptCd?: string;
  docType?: string;
  regUsrNm?: string;
  orderBy?: string;
  regDateGoe: string /* 시작일 */;
  regDateLoe: string /* 종료일 */;
  executeDateGoe: string /* 시행일자 시작일 */;
  executeDateLoe: string /* 시행일자 종료일 */;
}) {
  const queryString = Object.keys(params as Record<string, any>)
    .filter(key => (params as Record<string, any>)[key] !== undefined)
    .map(key => `${key}=${(params as Record<string, any>)[key]}`)
    .join('&');

  console.log('queryString', queryString);

  return instance.get(`approval?${queryString}`);
}
