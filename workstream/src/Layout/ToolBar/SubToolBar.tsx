import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uiActions } from '../../store/ui-slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import NoticeSub from './SubToolBar/NoticeSub';
import ApprovalSub from './SubToolBar/ApprovalSub';

interface SubToolBarProps {
  children?: ReactNode;
}

const SubToolBar: React.FC<SubToolBarProps> = props => {
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectMenu = useSelector((state: RootState) => state.ui.selectMenu);

  // 클릭한 메뉴 디스패치
  const menuClickHandler = (to: string | null) => {
    dispatch(uiActions.selectMenu(to));
    dispatch(uiActions.resetPage());
    if (to) {
      navigate(to);
    }
  };

  return (
    <div className={`sub-toolbar-wrapper ${!isSidebarOpen ? 'active' : ''}`}>
      <div className="sub-toolbar-menu-wrapper">{props.children}</div>
    </div>
  );
};

export default SubToolBar;
