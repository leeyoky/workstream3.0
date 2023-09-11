import { useContext } from 'react'
import profile from '../assets/img/guriman.jpg'
import AuthContext from '../store/auth-context';

const SideToolBar = () => {
  const { onActive, toggleActive, sideBarClass } =useContext(AuthContext);


  return (
    <div className={`side-bar-wrapper ${sideBarClass}`}>
      <div className={`side-bar-container ${sideBarClass}`}>
        <div className={`side-bar-menus ${sideBarClass}`}>
          <button onClick={toggleActive}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div className={`side-bar-1200 ${sideBarClass}`}>
          <div className="side-bar-profile-wrapper side-sm">
            <img src={profile}/>
          </div>
          <div className="side-bar-profile">
            <h3>
              <span>사원</span>
            </h3>
            <p>KM팀</p>
          </div>
        </div>
        <div className={`side-bar-list-wrapper ${sideBarClass}`}>
          <ul className={`menu-icon ${sideBarClass}`}>
            <li>
              <a href="/notice">
                <i className={`fa-regular fa-heart ${sideBarClass}`}></i>
                <span className={`${sideBarClass}`}>전사공지</span>
              </a>
            </li>
            <li>
              <a href="/approval">
                <i className="fa-regular fa-pen-to-square"></i>
                <span>전자결재</span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fa-regular fa-calendar"></i>
                <span>회의예약</span>
              </a>
            </li>
            <li>
              <a href="/todoList">
                <i className="fa-regular fa-circle-check"></i>
                <span>ToDo+</span>
              </a>
            </li>
            <li>
              <a href="/request">
                <i className="fa-regular fa-paper-plane"></i>
                <span>요청사항</span>
              </a>
            </li>
            <li>
              <a href="/address">
                <i className="fa-regular fa-address-book"></i>
                <span>사내연락망</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideToolBar