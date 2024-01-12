// 결재 상태 approvedYn의 값
export const APPROVAL_STATUS = {
  APPROVED: 'Y',
  REJECTED: 'R',
  PENDING: 'P',
};
// 결재자 수 최대 값
export const COLUMN_LIMITS = {
  MIN_APPROVAL: 4,
  MAX_APPROVAL: 6,
  MIN_AGREEMENT: 4,
  MAX_AGREEMENT: 7,
};
// 메뉴 URL
export const MENU_PATHS = {
  TEMPORARY: '/approval/temporary',
  DOCUMENT: '/approval/document',
  PENDING: '/approval/pending',
  IN_PROGRESS: '/approval/in-progress',
  COMPLETED: '/approval/completed',
  REJECTED: '/approval/rejected',
};
// 결재 상태
export const STATUS_LABELS: Record<string, string> = {
  APPROVED: '완료',
  PROCEEDING: '진행중',
  REJECTED: '반려',
  TEMP: '임시저장',
};
// 품의서 종류
export const DOCUMENT_TYPES: Record<string, string> = {
  APPROVAL_COMMON: '품의서',
  RESIGNATION: '사직서',
  EXECUTION: '시행문',
};

// 컬럼 정렬 속성 상수 정의
export const COLUMN_SORT_ATTRIBUTES: Record<string, string> = {
  문서번호: 'id',
  문서명: 'title',
  문서종류: 'docType',
  기안자: 'regUsrNm',
  기안일자: 'modDate',
  시행일자: 'executeDate',
  진행현황: 'state',
};
// alert 메세지
export const ALERT_MESSAGES = {
  SELF_REFERENCE: '자기 자신을 참조자로 추가할 수 없습니다.',
  MAX_REF_EXCEEDED: '참조자는 최대 10명까지 추가 가능합니다.',
};
