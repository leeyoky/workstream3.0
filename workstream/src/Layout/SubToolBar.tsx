import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import Button from "./Button";
import ApprovalCreate from "../components/Approval/ApprovalCreate";
import { NavLink } from "react-router-dom";

const SubToolBar = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태

  const menuItems = [
    { to: '/approval/temporary', label: '임시보관함', title: '임시보관함' },
    { to: '/approval', label: '전체문서함', title: '전체문서함' },
    { to: '/approval/pending', label: '결재대기함', title: '결재대기함' },
    { to: '/approval/in-progress', label: '결재진행함', title: '결재진행함' },
    { to: '/approval/completed', label: '완료문서함', title: '완료문서함' },
    { to: '/approval/rejected', label: '반려문서함', title: '반려문서함' },
    { to: '/approval/signatures', label: '서명관리', title: '서명관리' },
    { to: '/approval/delegation', label: '위임관리', title: '위임관리' },
  ];

  // 모달 열기 이벤트 핸들러
  const handleShowModal = () => {
    setIsModalOpen(true);
  }

  // 모달 닫기 이벤트 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const renderMenuItems = (items:{ to: string | null, label: string }[]) => {
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.to ? (
              <NavLink to={item.to}>{item.label}</NavLink>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`sub-toolbar-wrapper ${isSidebarOpen ? 'active' : ''}`}>
      <div className='sub-toolbar-menu-wrapper'>
        <div className="sub-toolbar-menu-box">
          <Button onShowModal={handleShowModal}>
            새 결재 작성
          </Button>
          {isModalOpen && <ApprovalCreate onClose={handleCloseModal} />}
        </div>
        <div className="sub-toolbar-menu-box">
          <strong>작성</strong>
          {renderMenuItems([menuItems[0]])}
        </div>
        <div className="sub-toolbar-menu-box">
          <strong>결제</strong>
          {renderMenuItems(menuItems.slice(1, 5))}
        </div>
        <div className="sub-toolbar-menu-box">
          <strong>관리</strong>
          {renderMenuItems(menuItems.slice(5))}
        </div>
      </div>
    </div>
  )
}

export default SubToolBar;
