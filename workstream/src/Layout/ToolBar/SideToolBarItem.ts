/* SideBar의 메뉴를 정리 */

export interface MenuItem {
  id: string;
  to: string;
  parentId: string;
  label: string;
  title: string;
  subMenes?: MenuItem[];
}

export const menuItems = [
  {
    id: '001',
    to: '/main',
    iconClass: 'fa-solid fa-house',
    parentId: null,
    menu: 'main',
    label: '메인페이지',
    title: '메인페이지',
    subMenus: [],
  },
  {
    id: '002',
    to: '/notice',
    iconClass: 'fa-regular fa-heart',
    parentId: null,
    menu: 'notice',
    label: '전사공유',
    title: '전사공유',
    subMenus: [],
  },
  {
    id: '003',
    to: '/approval',
    iconClass: 'fa-regular fa-pen-to-square',
    parentId: null,
    menu: 'approval',
    label: '전자결재',
    title: '전자결재',
    subMenus: [
      {
        id: '003001',
        to: '/approval/temporary',
        parentId: '003',
        label: '임시보관함',
        title: '임시보관함',
      },
      {
        id: '003002',
        to: '/approval/document',
        parentId: '003',
        label: '전체문서함',
        title: '전체문서함',
      },
      {
        id: '003003',
        to: '/approval/in-progress',
        parentId: '003',
        label: '결재진행함',
        title: '결재진행함',
      },
      {
        id: '003004',
        to: '/approval/pending',
        parentId: '003',
        label: '결재대기중',
        title: '결재대기중',
      },
      {
        id: '003005',
        to: '/approval/completed',
        parentId: '003',
        label: '완료문서함',
        title: '완료문서함',
      },
      {
        id: '003006',
        to: '/approval/rejected',
        parentId: '003',
        label: '반려문서함',
        title: '반려문서함',
      },
      {
        id: '003007',
        to: '/approval',
        parentId: '003',
        label: '수신참조함',
        title: '수신참조함',
      },
      {
        id: '003008',
        to: '/approval',
        parentId: '003',
        label: '부서참조함',
        title: '부서참조함',
      },
      {
        id: '003009',
        to: '/approval',
        parentId: '003',
        label: '서명관리',
        title: '서명관리',
      },
      {
        id: '003010',
        to: '/approval/delegation',
        parentId: '003',
        label: '위임관리',
        title: '위임관리',
      },
    ],
  },
  {
    id: '004',
    to: '/booking',
    iconClass: 'fa-regular fa-calendar',
    parentId: null,
    menu: 'booking',
    label: '회의예약',
    title: '회의예약',
    subMenus: [],
  },
  {
    id: '005',
    to: '/todoList',
    iconClass: 'fa-regular fa-circle-check',
    parentId: null,
    menu: 'todoList',
    label: 'ToDo+',
    title: 'ToDo',
    subMenus: [],
  },
  {
    id: '006',
    to: '/request',
    iconClass: 'fa-regular fa-paper-plane',
    parentId: null,
    menu: 'request',
    label: '요청사항',
    title: '요청사항',
    subMenus: [],
  },
  {
    id: '007',
    to: '/address',
    iconClass: 'fa-regular fa-address-book',
    parentId: null,
    menu: 'address',
    label: '사내연락망',
    title: '사내연락망',
    subMenus: [],
  },
];
