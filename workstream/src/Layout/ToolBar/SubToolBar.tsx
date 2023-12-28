import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { uiActions } from '../../store/ui-slice';
import { approvalMenuItems } from '../../types/Menu/SubMenus';

import ApprovalCreate from '../../components/Approval/ApprovalCreate';
import Button from '../Button';
import { DocumentCounts, SubMenu } from '../../types/Approval/Approaval';

const SubToolBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
  const [documentCnt, setDocumentCnt] = useState<DocumentCounts | undefined>();
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const getDocumentCnt = useSelector((state: RootState) => state.approval.documentCnt) as any;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setDocumentCnt(getDocumentCnt);
    console.log('documentCnt', documentCnt);
  }, [getDocumentCnt, dispatch]);

  // 클릭한 메뉴 디스패치
  const menuClickHandler = (to: string | null) => {
    dispatch(uiActions.selectMenu(to));
    dispatch(uiActions.resetPage());
    if (to) {
      navigate(to);
    }
  };

  // 모달 열기 이벤트 핸들러
  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 이벤트 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderSubMenu = (subMenus: SubMenu[]) => {
    return (
      <ul className="submenu">
        {subMenus.map((submenu, index) => (
          <li key={index}>
            <NavLink to={submenu.to} onClick={() => menuClickHandler(submenu.to)}>
              <span>
                <i className="fa-solid fa-chevron-right"></i>
                <span className="submenu-sub-title">{submenu.label}</span>
              </span>
              <span className="badge badge-accent">
                <div className="badge badge-count-box">
                  {getBadgeCountByLabel(submenu.label) !== null &&
                    getBadgeCountByLabel(submenu.label) !== undefined && (
                      <span className={`badge-item ${'sub'} ${submenu.state?.toLowerCase()}`}>
                        {(() => {
                          const badgeCount = getBadgeCountByLabel(submenu.label);
                          /* console.log(`Badge Count for ${submenu.label}:`, badgeCount); */
                          return badgeCount;
                        })()}
                      </span>
                    )}
                </div>
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  const renderMenuItems = (items: SubMenu[]) => {
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.to ? (
              <>
                <NavLink to={item.to} onClick={() => menuClickHandler(item.to)}>
                  <span>{item.label}</span>
                  <span className="badge badge-accent">
                    <div className="badge badge-count-box">
                      {getBadgeCountByLabel(item.label) !== undefined && (
                        <span className={`badge-item ${'sub'}`}>
                          {getBadgeCountByLabel(item.label) === undefined
                            ? null
                            : getBadgeCountByLabel(item.label)}
                        </span>
                      )}
                    </div>
                  </span>
                </NavLink>
                {item.subMenus && renderSubMenu(item.subMenus)}
              </>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const getBadgeCountByLabel = (label: string) => {
    if (label === '반려문서함' && documentCnt) {
      return documentCnt.rejectedCount !== 0 ? documentCnt.rejectedCount : undefined;
    } else if (label === '임시보관함' && documentCnt) {
      return documentCnt.tempCount !== 0 ? documentCnt.tempCount : undefined;
    } else if (label === '결재대기중' && documentCnt) {
      return documentCnt.pendingCount !== 0 ? documentCnt.pendingCount : undefined;
    } else if (label === '결재진행함' && documentCnt) {
      return documentCnt.proceedingCount !== 0 ? documentCnt.proceedingCount : undefined;
    } else if (label === '완료문서함' && documentCnt) {
      return documentCnt.approvedCount !== 0 ? documentCnt.approvedCount : undefined;
    } else if (label === '전체문서함' && documentCnt) {
      const totalCount =
        documentCnt.rejectedCount +
        documentCnt.tempCount +
        documentCnt.proceedingCount +
        documentCnt.approvedCount;
      return totalCount !== 0 ? totalCount : undefined;
    }

    return undefined;
  };

  return (
    <div className={`sub-toolbar-wrapper ${!isSidebarOpen ? 'active' : ''}`}>
      <div className="sub-toolbar-menu-wrapper">
        <div className="sub-toolbar-menu-box">
          <Button onShowModal={handleShowModal}>문서 상신</Button>
          {isModalOpen && <ApprovalCreate isCreate={true} onClose={handleCloseModal} />}
        </div>
        {/*         <div className="sub-toolbar-menu-box">
          <strong>작성</strong>
          {renderMenuItems([approvalMenuItems[0]])}
        </div> */}
        <div className="sub-toolbar-menu-box">
          <strong>문서함</strong>
          {renderMenuItems(approvalMenuItems.slice(0, 5))}
        </div>
        {/*         <div className="sub-toolbar-menu-box">
          <strong>관리</strong>
          {renderMenuItems(approvalMenuItems.slice(6))}
        </div> */}
      </div>
    </div>
  );
};

export default SubToolBar;
