import profile from '../../assets/img/example.jpg';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { uiActions } from '../../store/ui-slice';
import React, { useEffect } from 'react';
import { useAuthActions } from '../../store/actions/authActions';
import useApprovalDocumentCnt from '../../hooks/Approval/useApprovalDocumentCnt';
import { menuItems } from './SideToolBarItem';
import ApprovalSub from './SubToolBar/ApprovalSub';
import NoticeSub from './SubToolBar/NoticeSub';

const SideToolBar = () => {
  const { fetchEmployee } = useAuthActions();
  const { documentCnt } = useApprovalDocumentCnt();
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const loginUserInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();
  const selectMenu = useSelector((state: RootState) => state.ui.selectMenu);

  useEffect(() => {
    if (!loginUserInfo || Object.keys(loginUserInfo).length === 0) {
      fetchEmployee();
    }
  }, [loginUserInfo]);

  const toggleSideBar = () => {
    dispatch(uiActions.toggle());
  };

  const updatePath = (to: string) => {
    dispatch(uiActions.selectMenu(to));
    // 2024-02-28 SubMenu 여러 번 Click 시, subToolBar가 false상태로 바뀌어 UI가 깨지는 현상
    // dispatch(uiActions.setSubToolBar(false));
  };

  const classNames = {
    wrapper: `side-bar-wrapper ${!isSidebarOpen ? 'active' : ''}`,
    container: `side-bar-container ${!isSidebarOpen ? 'active' : ''}`,
    menus: `side-bar-menus ${!isSidebarOpen ? 'active' : ''}`,
    listWrapper: `side-bar-list-wrapper ${!isSidebarOpen ? 'active' : ''}`,
    menuIcon: `menu-icon ${!isSidebarOpen ? 'active' : ''}`,
  };

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.container}>
        <div className={classNames.menus}>
          <button onClick={toggleSideBar}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div className={`side-bar-1200 ${!isSidebarOpen ? 'active' : ''}`}>
          <div className="side-bar-profile-wrapper side-sm">
            <img src={profile} alt="Profile" />
          </div>
          <div className="side-bar-profile">
            <h3>
              <span>{loginUserInfo?.empNm}</span>
              <span>{loginUserInfo.rankNm}</span>
            </h3>
            <p>{loginUserInfo?.deptNm}</p>
          </div>
        </div>
        <div className={classNames.listWrapper}>
          <ul className={classNames.menuIcon}>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <li key={index} className="menus-li">
                  <NavLink
                    className="sideToolbar_navLink"
                    to={item.to}
                    onClick={() => updatePath(item.to)}>
                    <i
                      className={`${item.iconClass} ${classNames.menuIcon}`}
                      title={`${item.title}`}></i>
                    <span className={classNames.menuIcon}>{item.label}</span>
                    {item.label === '전자결재' && (
                      <span
                        className={`badge-item ${
                          documentCnt?.pendingCount === null || documentCnt?.pendingCount === 0
                            ? 'none'
                            : 'main'
                        }`}>
                        {documentCnt?.pendingCount}
                      </span>
                    )}
                  </NavLink>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
      {selectMenu &&
        typeof selectMenu === 'string' &&
        (selectMenu as string).startsWith('/approval') && <ApprovalSub />}
      {selectMenu &&
        typeof selectMenu === 'string' &&
        (selectMenu as string).startsWith('/notice') && <NoticeSub />}
    </div>
  );
};

export default SideToolBar;
