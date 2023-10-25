import profile from '../assets/img/guriman.jpg';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { uiActions } from '../store/ui-slice';
import SubToolBar from './SubToolBar';
import { useEffect } from 'react';

const SideToolBar = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const dispatch = useDispatch();
  const location = useLocation();   // 현재 경로 가져오기
  const isMainActive = location.pathname === '/' || location.pathname === '/main' ;
  const isSubToolBarActive = location.pathname.startsWith('/approval')
  
  const toggleSideBar = () => {
    dispatch(uiActions.toggle());
  };

  const toggleSubBar = () => {
    dispatch(uiActions.setSubToolBar(isSubToolBarActive));
  };

  useEffect(()=>{
    toggleSubBar();
  },[location.pathname])
  

  const classNames = {
    wrapper: `side-bar-wrapper ${isSidebarOpen ? 'active' : ''}`,
    container: `side-bar-container ${isSidebarOpen ? 'active' : ''}`,
    menus: `side-bar-menus ${isSidebarOpen ? 'active' : ''}`,
    listWrapper: `side-bar-list-wrapper ${isSidebarOpen ? 'active' : ''}`,
    menuIcon: `menu-icon ${isSidebarOpen ? 'active' : ''}`,
  };

  const menuItems = [
    { to: '/main', iconClass: 'fa-solid fa-house', label: '메인페이지', title: '메인페이지' },
    { to: '/notice', iconClass: 'fa-regular fa-heart', label: '전사공지', title: '전사공지' },
    { to: '/approval', iconClass: 'fa-regular fa-pen-to-square', label: '전자결재', title:'전자결재' },
    { to: '/booking', iconClass: 'fa-regular fa-calendar', label: '회의예약', title:'회의예약' },
    { to: '/todoList', iconClass: 'fa-regular fa-circle-check', label: 'ToDo+', title:'ToDo' },
    { to: '/request', iconClass: 'fa-regular fa-paper-plane', label: '요청사항', title:'요청사항' },
    { to: '/address', iconClass: 'fa-regular fa-address-book', label: '사내연락망', title:'사내연락망' },
  ];

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.container}>
        <div className={classNames.menus}>
          <button onClick={toggleSideBar}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div className={`side-bar-1200 ${isSidebarOpen ? 'active' : ''}`}>
          <div className="side-bar-profile-wrapper side-sm">
            <img src={profile} alt="Profile" />
          </div>
          <div className="side-bar-profile">
            <h3>
              <span>사원</span>
            </h3>
            <p>KM팀</p>
          </div>
        </div>
        <div className={classNames.listWrapper}>
          <ul className={classNames.menuIcon}>
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink 
                  to={item.to} 
                  className={item.to === '/main' ? isMainActive ? 'active' : '' : ''}>
                  <i 
                    className={`${item.iconClass} ${classNames.menuIcon}`} 
                    title={`${item.title}`}>
                  </i>
                  <span 
                    className={classNames.menuIcon}>
                      {item.label}
                  </span>
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
