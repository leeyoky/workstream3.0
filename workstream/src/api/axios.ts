import instance from "./interceptor";

export function login(userData: string) {
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
// 기본 품의서 등록
export function fetchApprovalData(formData: string) {
  return instance.post("approval", formData)
}
// 사직원 등록
export function fetchResinationData(formData: string) {
  return instance.post("approval", formData)
}

export function getApprovalList(params: {
  page?: number;
  pageSize?: number;
  state?: string;
  pending?: string;
  title?: string;
  deptCd?: string;
  docType?: string;
  regUsrNm?: string;
}) {
  const queryString = Object.keys(params as Record<string, any>)
    .filter((key) => (params as Record<string, any>)[key] !== undefined)
    .map((key) => `${key}=${(params as Record<string, any>)[key]}`)
    .join('&');
  console.log('queryString', queryString);
  
  return instance.get(`approval?${queryString}`);
}

