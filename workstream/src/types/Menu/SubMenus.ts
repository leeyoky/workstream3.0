import { SubMenu } from "../Approval/Approaval";

export const approvalMenuItems: SubMenu[] = [
  { to: '/approval/document', label: '전체문서함', title: '전체문서함', type: 'document' },
  { to: '/approval/temporary', label: '임시보관함', title: '임시보관함', type: 'document' },
  { to: '/approval/in-progress', label: '결재진행함', title: '결재진행함', type: 'document', subMenus: [
    { to: '/approval/pending', label: '결재대기중', title: '결재대기중', type: 'document', state: 'pending' },
  ]},
  { to: '/approval/completed', label: '완료문서함', title: '완료문서함', type: 'document' },
  { to: '/approval/rejected', label: '반려문서함', title: '반려문서함', type: 'document' },
  { to: '/approval/signatures', label: '서명관리', title: '서명관리' },
  { to: '/approval/delegation', label: '위임관리', title: '위임관리' },
];