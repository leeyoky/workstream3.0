import instance from "./interceptor";
import { docData, commentData, fetchCommentData } from "../types/Approval/Approaval";

export function login(userData: { loginId: string; password: string }) {
  return instance.post("login", userData);
}

export function getUsersInfo() {
  return instance.get("users");
}

export function getDepartment() {
  return instance.get("dept");
}
// 모든 유저 정보 
export function getEmployeeInfo() {
  return instance.get("emp?size=300")
}
/* Create */

// 기본 품의서 등록
export function fetchApprovalData(formData: docData) {
  return instance.post("approval", formData)
}
// 사직원 등록
export function fetchResinationData(formData: string) {
  return instance.post("approval", formData)
}

/* Read */

// 품의서 정보 가져오기
export function getApprovalData(id:string) {
  return instance.get(`approval/${id}`)
}

/* File */

// 첨부파일 등록
export function fetchFileData(formData: FormData) {
  return instance.post("file",formData)
}

// 첨부파일 다운로드
export function getFileData(fileId: number) {
  return instance.get(`approval/file/${fileId}`)
}

// 첨부파일 삭제
export function deleteFileData(fileId: number) {
  return instance.delete(`file/${fileId}`)
}

/* Comment */

// 댓글 작성
export function fetchComment(commentData: fetchCommentData) {
  return instance.post('approval/comment', commentData);
}

// 댓글 수정
export function updateComment(commentData: commentData) {
  return instance.patch('approval/comment', commentData )
}

// 댓글 삭제
export function deleteComment(commentId: number) {
  return instance.delete(`approval/comment/${commentId}`)
}

/* Update */
// 문서 회수 ( 상태를 임시저장으로 ) 
export function fetchRecallDocument(id:string) {
  return instance.patch(`approval/cancel/${id}`)
}
// 임시저장상태에서 수정
export function updateDocument(formData: docData) {
  return instance.patch('approval', formData)
}

/* Delete */
export function deleteDocument(id:string) {
  return instance.delete(`approval/${id}`)
}

/* 결재건 개수 */
export function countDoucumentType(){
  return instance.get('approval/count')
}

export function getApprovalList(params: {
  page?: number;
  size?: number;
  state?: string;
  pendingApproval?: string;
  title?: string;
  deptCd?: string;
  docType?: string;
  regUsrNm?: string;
  sort?: string;
}) {

  const queryString = Object.keys(params as Record<string, any>)
    .filter((key) => (params as Record<string, any>)[key] !== undefined)
    .map((key) => `${key}=${(params as Record<string, any>)[key]}`)
    .join('&');

  console.log('queryString', queryString);
  
  return instance.get(`approval?${queryString}`);
}

