import { useNavigate } from 'react-router-dom';
import logoSmall from '../assets/img/logo.png'
import { useAuthActions } from '../store/actions/authActions';

const Header = () => {

  const { logout } = useAuthActions();
  const navigate = useNavigate();

  const logoClickHandler = () => {
    navigate('/main')
  }

  const handleLogout = async () => {
    try {
      await logout();
      console.log("LOGOUT");
      navigate('/login')
    } catch(error) {
      console.log("ERROR");
      
    }
  }
 
  return (
    <div className="header">
    <div className="header-logo margin-right" onClick={logoClickHandler}>
      <img src={logoSmall} alt="로고"/>
    </div>
    <div className="header-logo">
      <ul className="toolbar-menus underline">
        <li className="toolbar-menu underline">
          <span className="flex align-center justify-center"
          >
            <a href="http://">프로젝트</a></span>
        </li>
        <li className="toolbar-menu underline">
        <span className="flex align-center justify-center"
          >
            <a href="http://">CRM</a></span>
        </li>
        <li className="toolbar-menu underline">
        <span className="flex align-center justify-center"
          >
            <a href="http://">지식</a></span>
        </li>
        <li className="toolbar-menu underline">
        <span className="flex align-center justify-center"
          >
            <a href="http://">제품</a></span>
        </li>
        <li className="toolbar-menu underline">
        <span className="flex align-center justify-center"
          >
            <a href="http://">영업</a></span>
        </li>
        <li className="toolbar-menu underline">
          <div className="flex align-center justify-center"> 
            <span className="flex align-center justify-center">
              <a href="http://">인사</a>
            </span>
            </div>
          <ul className="toolbar-dropdown">
            <li>
              <div>
                인사발령
              </div>
            </li>
            <li><span> 인사정보 </span></li>
            <li><span> 인사평가</span></li>
            <li><span> 사내활동</span></li>
            <li><span> 근태관리</span></li>
            <li><span> 휴가관리</span></li>
          </ul>
        </li>
      </ul>
    </div>

    <div className="sidebar-right margin-left">
      <span className="sidebar-right-divr">
        <i className="fa-regular fa-circle-question"></i>
      </span>
      <div className="sidebar-right-divr">
        <i className="fa-solid fa-house" onClick={logoClickHandler}></i>
      </div>
      <ul className="toolbar-menus padding-0">
        <li className="toolbar-menu">
          <span className="sidebar-right-divr">
            <i className="fa-solid fa-user"></i>
          </span>
          <ul className="toolbar-dropdown my-page">
            <li><div> 내 정보 </div></li>
            <li>
              <button onClick={handleLogout}> 로그아웃 </button>  
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default Header