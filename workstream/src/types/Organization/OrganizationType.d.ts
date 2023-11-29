export type OrganizationItem = {
  deptCd: string;
  deptNm: string;
  deptOrder: number;
  deptType: string;
  isFinal: string;
  level: number;
  modDate: string;
  modUsr: string;
  regDate: string;
  regUsr: string;
  upDeptCd: string;
  upDeptNm: string;
};
export type EmployeeItem = {
  boss: string;
  deptCd: string;
  deptNm: string;
  email: string;
  empNm: string;
  empNo: string;
  loginId: string;
  officeDuty: string;
  officeDutyNm: string;
  rank: string;
  rankNm: string;
}

export type loginUserItem = {
  deptCd: string;
  deptNm: string;
  empNm: string;
  empNo: string;
}