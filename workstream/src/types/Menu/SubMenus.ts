/* 전사공지 */
export const noticeMenuItems = [
  { to: '/notice/document', label: '공지사항', title: '공지사항', type: 'document' },
  { to: '/notice/temp', label: '임시저장', title: '임시저장', type: 'document' },
  { to: '/notice/mail', label: '공지메일', title: '공지메일', type: 'document' },
  { to: '/sent-mails', label: '보낸메일함', title: '보낸메일함', type: 'document' },
];
/* 전자결재 */
export const approvalMenuItems = [
  { to: '/approval/temporary', label: '임시보관함', title: '임시보관함', type: 'document' },
  { to: '/approval/document', label: '전체문서함', title: '전체문서함', type: 'document' },
  {
    to: '/approval/in-progress',
    label: '결재진행함',
    title: '결재진행함',
    type: 'document',
    subMenus: [
      {
        to: '/approval/pending',
        label: '결재대기중',
        title: '결재대기중',
        type: 'document',
        state: 'pending',
      },
    ],
  },
  { to: '/approval/completed', label: '완료문서함', title: '완료문서함', type: 'document' },
  { to: '/approval/rejected', label: '반려문서함', title: '반려문서함', type: 'document' },
  { to: '/approval/cc', label: '수신참조함', title: '수신참조함' },
  { to: '/approval/cc', label: '부서참조함', title: '부서참조함' },
  { to: '/approval/signatures', label: '서명관리', title: '서명관리' },
  { to: '/approval/delegation', label: '위임관리', title: '위임관리' },
];
