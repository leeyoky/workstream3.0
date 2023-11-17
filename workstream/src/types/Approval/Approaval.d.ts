/* approval-slice */
export interface Employee {
  empNo: string; /* approver */
  name: string; /* approverNm */
  duty: string; /* officeDutyNm */
  rankName: string; /* rankNm */
  approvalType: string; /* apprType */
  modDate?: string;
  index: number;  /* order */
  approvedYn?: string;
}


export interface ApprovalState {
  isEditMode: boolean;
  isDetailMode: boolean;
  documentType: string;   // 품의서 종류
  selectedOption: string;   // 결재방식 선택
  agreementType: string;    // 힙의방식 선택
  approvers: Employee[];
  content: string;
  title: string;
  executeDate: string;
  comment: string;
  pendingCnt: string;
}

/* -------------------- */

export type ApprovalListItem = {
  contents: string;
  docType: string;
  executeDate: null;
  id: string;
  lineType: string;
  modDate: string;
  regDate: string;
  regUsr: string;
  regUsrNm: string;
  regUsrDeptNm: string;
  state: string;
  submitDate: null;
  title: string;
  index: number;
}

export interface SearchBoxOption {
  label: string;
  value: string;
}

export interface SearchBoxProps {
  tags: { 
    label: string; 
    name: string; 
    type?: string; 
    options?: SearchBoxOption[] 
  }[];
}

export interface docData {
  title: string;
  executeDate: string;
  docType: string;
  line: { apprType: string; approver: string; order: number; }[];
  contents: string;
  state: string;
}

export interface fetchCommentData {
  apprId : string;
  comment : string;
}

export interface CommentItem {
  id: number;
  regUsrNm: string;
  rankNm: string;
  deptNm: string;
  comment: string;
  regDate: string;
}

export interface commentData {
  id : number;
  comment : string;
}

export interface editApprovalLine {
  index: number;
  empNo: string;
  name: string;
  duty: string;
  rankName: string;
  approvalType: string;
  approvedYn: string;
}

export interface ArrpovalLine {
  id: number,
  approver : string,
  approverNm: string,
  apprType: string,
  approvedYn: string,
  modDate: string;
  deptNm: string;
  officeDutyNm: string,
  order: 1,
  rankNm: string;
}

export type ApprovalData = {
  approval: {
    contents : string;
    docType: string;
    executeDate: null;
    id: string;
    lineType: string;
    modDate: string;
    regDate: string;
    regUsr: string;
    regUsrDeptNm: string;
    regUsrNm: string;
    state: string;
    submitDate: null;
    title: string;
  },
  ccDept: [
    {
      id: number;
      deptCd: string;
      deptNm: string;
    }
  ],
  ccUser: [
    {
      deptNm: string;
      empNm: string;
      empNo : string;
      id: number;
      officeDutyNm: null;
      rankNm: string;
    }
  ],
  comment: [
    {
      id: number;
      comment: string;
      regUsr: string;
      regUsrNm : string;
      deptNm: string;
      rankNm: string;
      officeDutyNm: null;
      modDate: string;
      regDate: string;
    }
  ],
  line: [
    {
      id: number;
      order: number;
      apprType: string;
      approvedYn: string;
      approver: string;
      approverNm: string;
      modDate: string;
      deptNm: string;
      officeDutyNm: string;
      rankNm: string;
    }
  ],
  files: [
    {
      docNumber: string;
      docType: string;
      fileExtension: string;
      fileName: string;
      fileSize: number;
      id: number;
    }
  ]
}