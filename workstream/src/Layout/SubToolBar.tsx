import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { uiActions } from "../store/ui-slice";
import { approvalMenuItems } from "../types/Menu/SubMenus";

import ApprovalCreate from "../components/Approval/ApprovalCreate";
import Button from "./Button";

const SubToolBar = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

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
                {item.label}
                <span className="badge badge-accent">
                  <span>15</span>
                </span>
                </NavLink>
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
            문서 상신
          </Button>
          {isModalOpen && <ApprovalCreate isCreate={true} onClose={handleCloseModal} />}
        </div>
{/*         <div className="sub-toolbar-menu-box">
          <strong>작성</strong>
          {renderMenuItems([approvalMenuItems[0]])}
        </div> */}
        <div className="sub-toolbar-menu-box">
          <strong>문서함</strong>
          {renderMenuItems(approvalMenuItems.slice(0, 6))}
        </div>
        <div className="sub-toolbar-menu-box">
          <strong>관리</strong>
          {renderMenuItems(approvalMenuItems.slice(6))}
        </div>
      </div>
    </div>
  )
}

export default SubToolBar;
