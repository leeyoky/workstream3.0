import { useEffect } from 'react';
import dsValue from '../assets/img/dsvalue.png';
import BirthdayCard from '../components/Main/BirthdayCard';
import CalendarCard from '../components/Main/Calendar/CalendarCard';
import DocumentCard from '../components/Main/DocumentCard';
import Leadership from '../components/Main/Leadership';
import NewestEmp from '../components/Main/NewestEmp';
import NoticeCard from '../components/Main/NoticeCard';
import Performance from '../components/Main/Performance';
import WeatherCard from '../components/Main/Weather/WeatherCard';
import { uiActions } from '../store/ui-slice';
import { useDispatch } from 'react-redux';

const MainPage = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.setSubToolBar(false));
  }, []);

  return (
    <div className="main-wrapper">
      {/* 핵심가치 */}
      <div className="dsvalue-wrapper _card">
        <img src={dsValue} alt="데이터스트림즈 핵심가치" />
      </div>
      <Leadership />
      <NewestEmp />
      <NoticeCard />
      <div className="cost-wrapper _card this-month">
        <div className="inner-box">
          <div className="inner-box__title">
            <span>309,200K</span>
            <div className="_product">제품 256,400K</div>
            <p>2월 수주실적</p>
          </div>
          <div className="won__icon">
            <i className="fa-solid fa-won-sign"></i>
          </div>
        </div>
      </div>
      <div className="cost-wrapper _card">
        <div className="inner-box">
          <div className="inner-box__title">
            <span>1,478,020K</span>
            <div className="_product">제품 961,380K</div>
            <p>총 누적실적</p>
          </div>
          <div className="won__icon">
            <i className="fa-solid fa-won-sign"></i>
          </div>
        </div>
      </div>
      <div className="cost-wrapper _card">
        <div className="inner-box">
          <div className="inner-box__title">
            <span>99,999,999K</span>
            <div className="_product">제품 99,999,999K</div>
            <p>2024년 연간 목표</p>
          </div>
          <div className="won__icon">
            <i className="fa-solid fa-won-sign"></i>
          </div>
        </div>
      </div>

      <DocumentCard />
      <BirthdayCard />
      <Performance month={currentMonth} />
      <WeatherCard />
      <CalendarCard />
      <div className="news-wrapper _card">
        <div className="inner-box">
          <div className="inner-box__title">
            <i className="fa-solid fa-bell"></i>
            알림
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
