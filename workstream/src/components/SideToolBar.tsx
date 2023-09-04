import { useState } from 'react'
import profile from '../img/guriman.jpg'
import { Link } from 'react-router-dom'

const SideToolBar = () => {

  const [onActive, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!onActive);
  }
  const activeClass = onActive? 'active' : '';
  return (
    <div className={`side-bar-wrapper ${activeClass}`}>
      <div className={`side-bar-container ${activeClass}`}>
        <div className={`side-bar-menus ${activeClass}`}>
          <button onClick={toggleActive}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div className={`side-bar-1200 ${activeClass}`}>
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
        <div className={`side-bar-list-wrapper ${activeClass}`}>
          <ul className={`menu-icon ${activeClass}`}>
            <li>
              <a href="/notice">
                <i className={`fa-regular fa-heart ${activeClass}`}></i>
                <span className={`${activeClass}`}>전사공지</span>
              </a>
            </li>
            <li>
              <Link to="/approval">
                <i className="fa-regular fa-pen-to-square"></i>
                <span>전자결재</span>
              </Link>
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
              <Link to="/address">
                <i className="fa-regular fa-address-book"></i>
                <span>사내연락망</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideToolBar