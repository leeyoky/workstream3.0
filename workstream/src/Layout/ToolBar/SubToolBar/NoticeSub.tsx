import { useState } from 'react';
import SubToolBar from '../SubToolBar';
import Button from '../../Button';
import CreateNoticeModal from '../../../components/Notice/CreateNoticeModal';
import { NavLink, useNavigate } from 'react-router-dom';
import { noticeMenuItems } from '../../../types/Menu/SubMenus';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { SubMenu } from '../../../types/Approval/Approaval';

const NoticeSub = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 모달 열기 이벤트 핸들러
  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 이벤트 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const menuClickHandler = (to: string | null) => {
    dispatch(uiActions.selectMenu(to));
    dispatch(uiActions.resetPage());
    if (to) {
      navigate(to);
    }
  };

  const renderMenuItems = (items: SubMenu[]) => {
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <NavLink to={item.to} onClick={() => menuClickHandler(item.to)}>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <SubToolBar>
      <div className="sub-toolbar-menu-box">
        <Button onShowModal={handleShowModal}>공지 작성</Button>
        {isModalOpen && <CreateNoticeModal onClose={handleCloseModal} />}
      </div>
      <div className="sub-toolbar-menu-box notice-sub-menus">
        <strong>메인</strong>
        {renderMenuItems([noticeMenuItems[0]])}
      </div>
      <div className="sub-toolbar-menu-box notice-sub-menus">
        <strong>작성</strong>
        {renderMenuItems(noticeMenuItems.slice(1, 3))}
      </div>

      <div className="sub-toolbar-menu-box notice-sub-menus">
        <strong>보관함</strong>
        {renderMenuItems(noticeMenuItems.slice(3))}
      </div>
    </SubToolBar>
  );
};

export default NoticeSub;
