import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { uiActions } from "../store/ui-slice";
import { selectedActions } from "../store/Approval/approval-slice";

import ApprovalCreate from "../components/Approval/ApprovalCreate";
import Button from "./Button";

const SubToolBar = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const menuItems = [
    { to: '/approval/temporary', label: '임시보관함', title: '임시보관함' },
    { to: '/approval/document', label: '전체문서함', title: '전체문서함' },
    { to: '/approval/pending', label: '결재대기함', title: '결재대기함' },
    { to: '/approval/in-progress', label: '결재진행함', title: '결재진행함' },
    { to: '/approval/completed', label: '완료문서함', title: '완료문서함' },
    { to: '/approval/rejected', label: '반려문서함', title: '반려문서함' },
    { to: '/approval/signatures', label: '서명관리', title: '서명관리' },
    { to: '/approval/delegation', label: '위임관리', title: '위임관리' },
  ];

  // 클릭한 메뉴 디스패치
  const menuClickHandler = (to: string | null) => {
    dispatch(uiActions.selectMenu(to));
    dispatch(uiActions.resetPage())
    if(to){
      navigate(to)
    }
  }

  // 모달 열기 이벤트 핸들러
  const handleShowModal = () => {
    setIsModalOpen(true);
    dispatch(selectedActions.resetArray())
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
              <NavLink 
                to={item.to} 
                onClick={() => menuClickHandler(item.to)}
                >
                {item.label}</NavLink>
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
          {renderMenuItems(menuItems.slice(1, 6))}
        </div>
        <div className="sub-toolbar-menu-box">
          <strong>관리</strong>
          {renderMenuItems(menuItems.slice(6))}
        </div>
      </div>
    </div>
  )
}

export default SubToolBar;
