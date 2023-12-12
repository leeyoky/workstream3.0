/* Menus */
export type SubMenu = {
  to: string;
  label: string;
  title: string;
  type?: string;
  state?: string;
  subMenus?: SubMenu[];
};

/* approval-slice */
export interface Employee {
  empNo: string /* approver */;
  name: string /* approverNm */;
  duty: string /* officeDutyNm */;
  rankName: string /* rankNm */;
  approvalType: string /* apprType */;
  modDate?: string;
  index: number /* order */;
  approvedYn?: string;
}

export interface DocumentCounts {
  tempCount: number;
  rejectedCount: number;
  pendingCount: number;
  proceedingCount: number;
  approvedCount: number;
}
export interface ccDept {
  deptCd: string;
  deptNm: string;
}

export interface ApprovalState {
  documentCnt: string;
  isEditMode: boolean;
  isDetailMode: boolean;
  isReference: boolean;
  documentType: string; // 품의서 종류
  selectedOption: string; // 결재방식 선택
  agreementType: string; // 힙의방식 선택
  approvers: Employee[];
  ccDept: ccDept[];
  ccUser: Employee[];
  content: string;
  title: string;
  executeDate: string;
  comment: string;
  pendingCnt: string;
  reasonRetire: string;
  finalSign: boolean;
  retireDate: string;
}

/* -------------------- */

export type ApprovalListItem = {
  contents: string;
  docType: string;
  executeDate: null;
  id: string;
  lineType: string;
  pendingApproval: string;
  modDate: string;
  regDate: string;
  regUsr: string;
  regUsrNm: string;
  regUsrDeptNm: string;
  state: string;
  submitDate: null;
  title: string;
  index: number;
};

export interface SearchBoxOption {
  label: string;
  value: string;
}

export interface SearchBoxProps {
  tags: {
    label: string;
    name: string;
    type?: string;
    options?: SearchBoxOption[];
  }[];
}

export interface docData {
  ccDept: string[];
  ccUser: string[];
  contents: string;
  docType: string;
  executeDate: string;
  line: { apprType: string; approver: string; order: number }[];
  state: string;
  title: string;
}

export interface resinationDocData {
  address: string;
  homeContact: string;
  identityNo: number | null;
  line: { apprType: string; approver: string; order: number }[];
  mobileContact: string;
  reasons: string;
  resignationDate: string;
  state: string;
}

export interface fetchCommentData {
  apprId: string;
  comment: string;
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
  id: number;
  comment: string;
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
  id: number;
  approver: string;
  approverNm: string;
  apprType: string;
  approvedYn: string;
  modDate: string;
  deptNm: string;
  officeDutyNm: string;
  order: 1;
  rankNm: string;
}

export interface approveResultData {
  id: number;
  approvedYn: string;
}

type CommonData = {
  ccDept: { id: number; deptCd: string; deptNm: string }[];
  ccUser: {
    deptNm: string;
    empNm: string;
    empNo: string;
    id: number;
    officeDutyNm?: string | null;
    rankNm: string;
  }[];
  comment: {
    id: number;
    comment: string;
    regUsr: string;
    regUsrNm: string;
    deptNm: string;
    rankNm: string;
    officeDutyNm?: string | null;
    modDate: string;
    regDate: string;
  }[];
  files: {
    docNumber: string;
    docType: string;
    fileExtension: string;
    fileName: string;
    fileSize: number;
    id: number;
  }[];
  line: {
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
  }[];
};

export type ApprovalData = CommonData & {
  approval: {
    contents: string;
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
  };
};

export type ResignationData = CommonData & {
  resignation: {
    address: string;
    docType: string;
    enterDate: string;
    homeContact: string;
    id: string;
    identityNo: string;
    lineType: string;
    mobileContact: string;
    officeDutyNm: string;
    rankNm: string;
    reasons: string;
    regUsr: string;
    regUsrDeptNm: string;
    regUsrNm: string;
    resignationDate: string;
    state: string;
  };
};
