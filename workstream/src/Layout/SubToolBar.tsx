import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { uiActions } from "../store/ui-slice";
import { approvalMenuItems } from "../types/Menu/SubMenus";

import ApprovalCreate from "../components/Approval/ApprovalCreate";
import Button from "./Button";
import { countDoucumentType } from "../api/axios";

interface DocumentCounts {
  tempCount: number;
  rejectedCount: number;
  pendingCount: number;
  proceedingCount: number;
  approvedCount: number;
}

const SubToolBar = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [documentCnt, setDocuemntCnt] = useState<DocumentCounts | undefined>();
  
  const fetchDocumentCount = async() => {
    try {
      const response = await countDoucumentType();
      const data = response.data;
      console.log(data);
      setDocuemntCnt(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(()=>{
    console.log('documentCnt', documentCnt);
    
    fetchDocumentCount();
  },[])
  

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

  const renderMenuItems = (items: { to: string | null, label: string }[]) => {
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.to ? (
              <NavLink to={item.to} onClick={() => menuClickHandler(item.to)}>
                {item.label}
                <span className="badge badge-accent">
                  <div className="badge badge-count-box">
                  {getBadgeCountByLabel(item.label) !== undefined && (
                    <span className={`badge-item ${item.type === 'document' && item.label === '결재예정문서' ? '' : 'zero-count'}`}>
                    {getBadgeCountByLabel(item.label)}
                    </span>
                  )}
                  </div>
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

  const getBadgeCountByLabel = (label: string ) => {
    if (label === '반려문서함' && documentCnt) {
      return documentCnt.rejectedCount;
    } else if (label === '임시보관함' && documentCnt) {
      return documentCnt.tempCount;
    } else if (label === '결재예정문서' && documentCnt) {
      return documentCnt.pendingCount;
    } else if (label === '결재진행함' && documentCnt) {
      return documentCnt.proceedingCount;
    } else if (label === '완료문서함' && documentCnt) {
      return documentCnt.approvedCount;
    }
  };

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
