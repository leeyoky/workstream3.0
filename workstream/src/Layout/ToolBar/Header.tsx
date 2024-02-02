import { useNavigate } from 'react-router-dom';
import logoSmall from '../../assets/img/logo.png';
import favicon from '../../assets/img/favicon.png';
import { useAuthActions } from '../../store/actions/authActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const Header = () => {
  const isDarkMode: boolean = useSelector((state: RootState) => state.ui.isDarkMode);
  const { logout } = useAuthActions();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let lastClickTime = 0;

  const logoClickHandler = () => {
    navigate('/main');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 재빠르게 누르면 작동 하지 않는 현상
   */
  const modeChangeHandler = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime > 100) {
      // 클릭 간격이 300ms 이상인 경우에만 처리
      lastClickTime = currentTime;
      dispatch(uiActions.setDarkMode());
    }
  };

  return (
    <div className={`header ${isDarkMode ? 'darkMode' : ''}`}>
      <div className="header-logo margin-right" onClick={logoClickHandler}>
        <img src={logoSmall} alt="로고" className="md-1023" />
        <img src={favicon} alt="로고" className="media-1200" />
      </div>
      <div className="header-logo">
        <ul className="toolbar-menus underline">
          <li className="toolbar-menu underline">
            <span className="flex align-center justify-center">
              <a href="http://">프로젝트</a>
            </span>
          </li>
          <li className="toolbar-menu underline">
            <span className="flex align-center justify-center">
              <a href="http://">CRM</a>
            </span>
          </li>
          <li className="toolbar-menu underline">
            <span className="flex align-center justify-center">
              <a href="http://">지식</a>
            </span>
          </li>
          <li className="toolbar-menu underline">
            <span className="flex align-center justify-center">
              <a href="http://">제품</a>
            </span>
          </li>
          <li className="toolbar-menu underline">
            <span className="flex align-center justify-center">
              <a href="http://">영업</a>
            </span>
          </li>
          <li className="toolbar-menu underline">
            <div className="flex align-center justify-center">
              <span className="flex align-center justify-center">
                <a href="http://">인사</a>
              </span>
            </div>
            <ul className="toolbar-dropdown">
              <li>
                <span>인사발령</span>
              </li>
              <li>
                <span> 인사정보 </span>
              </li>
              <li>
                <span> 인사평가</span>
              </li>
              <li>
                <span> 사내활동</span>
              </li>
              <li>
                <span> 근태관리</span>
              </li>
              <li>
                <span> 휴가관리</span>
              </li>
            </ul>
          </li>
          <li className="toolbar-menu underline">
            <span className="flex align-center justify-center">
              <a href="http://">총무</a>
            </span>
          </li>
          <li className="toolbar-menu underline">
            <span className="flex align-center justify-center">
              <a href="http://">재무</a>
            </span>
          </li>
          <li className="toolbar-menu underline">
            <span className="flex align-center justify-center">
              <a href="http://">통계</a>
            </span>
          </li>
          <li className="toolbar-menu underline">
            <span className="flex align-center justify-center">
              <a href="http://">관리자</a>
            </span>
          </li>
        </ul>
      </div>

      <div className="sidebar-right margin-left">
        <div className="dark-mode-box">
          <input type="checkbox" id="lightModeSwitch" hidden></input>
          <label htmlFor="lightModeSwitch" className="light-toggle">
            <span className="lightToggleButton" onClick={modeChangeHandler}></span>
          </label>
        </div>
        <span className="sidebar-right-divr">
          <i className="fa-regular fa-circle-question"></i>
        </span>
        <div className="sidebar-right-divr"></div>
        <ul className="toolbar-menus">
          <li className="toolbar-menu">
            <span className="sidebar-right-divr">
              <i className="fa-solid fa-user"></i>
            </span>
            <ul className="toolbar-dropdown my-page">
              {/*               <li className="toolbar-menu underline">
                <div> 내 정보 </div>
              </li> */}
              <li>
                <a onClick={handleLogout}> 로그아웃 </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
