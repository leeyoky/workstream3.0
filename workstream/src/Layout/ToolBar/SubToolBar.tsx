import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface SubToolBarProps {
  children?: ReactNode;
}

const SubToolBar: React.FC<SubToolBarProps> = props => {
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);

  return (
    <div className={`sub-toolbar-wrapper ${!isSidebarOpen ? 'active' : ''}`}>
      <div className="sub-toolbar-menu-wrapper">{props.children}</div>
    </div>
  );
};

export default SubToolBar;
