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
};