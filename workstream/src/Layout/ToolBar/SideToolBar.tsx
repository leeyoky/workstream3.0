/* import profile from '../../assets/img/test1.jpg'; */
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { uiActions } from '../../store/ui-slice';
import SubToolBar from './SubToolBar';
import { useEffect } from 'react';
import { useAuthActions } from '../../store/actions/authActions';
import useApprovalDocumentCnt from '../../hooks/Approval/useApprovalDocumentCnt';
import { menuItems } from './SideToolBarItem';

const SideToolBar = () => {
  const { fetchEmployee } = useAuthActions();
  const { documentCnt } = useApprovalDocumentCnt();
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const loginUserInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();
  const location = useLocation(); // 현재 경로 가져오기
  const isMainActive = location.pathname === '/' || location.pathname === '/main';
  const isSubToolBarActive = location.pathname.startsWith('/approval');

  useEffect(() => {
    if (!loginUserInfo || Object.keys(loginUserInfo).length === 0) {
      fetchEmployee();
    }
  }, [loginUserInfo]);

  const toggleSideBar = () => {
    dispatch(uiActions.toggle());
  };

  const toggleSubBar = () => {
    dispatch(uiActions.setSubToolBar(isSubToolBarActive));
  };

  const updatePath = (to: string) => {
    dispatch(uiActions.selectMenu(to));
  };

  useEffect(() => {
    toggleSubBar();
  }, [location.pathname]);

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
            {/* <img src={profile} alt="Profile" /> */}
            <i className="fa-solid fa-user-tie"></i>
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
              <li key={index}>
                <NavLink
                  to={item.to}
                  className={`${item.to === '/main' ? (isMainActive ? 'active' : '') : ''} ${
                    isSubToolBarActive && item.to === '/approval/document' ? 'active' : ''
                  }`}
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
            ))}
          </ul>
        </div>
      </div>
      {isSubToolBarActive && <SubToolBar />}
    </div>
  );
};

export default SideToolBar;
