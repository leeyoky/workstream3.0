import dsValue from '../assets/img/dsvalue.png';
import BirthdayCard from '../components/Main/BirthdayCard';
import DocumentCard from '../components/Main/DocumentCard';
import Leadership from '../components/Main/Leadership';
import NewestEmp from '../components/Main/NewestEmp';
import NoticeCard from '../components/Main/NoticeCard';
import Performance from '../components/Main/Performance';
import WeatherCard from '../components/Main/Weather/WeatherCard';

const MainPage = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  return (
    <div className="main-wrapper">
      {/* 핵심가치 */}
      <div className="dsvalue-wrapper _card">
        <img src={dsValue} alt="데이터스트림즈 핵심가치" />
      </div>

      <Leadership />

      <NewestEmp />
      {/* 날씨 */}

      <WeatherCard />

      {/* 수주실적 */}
      <Performance month={currentMonth} />

      <NoticeCard />

      {/* 알림 */}
      <div className="news-wrapper _card">
        <div className="inner-box">
          <div className="inner-box__title">
            <i className="fa-solid fa-bell"></i>
            알림
          </div>
        </div>
      </div>

      {/* 일정 */}
      <div className="calender-wrapper _card">
        <div className="inner-box">
          <div className="inner-box__title">
            <i className="fa-regular fa-calendar"></i>
            일정
          </div>
        </div>
      </div>

      <DocumentCard />

      {/* 최신문서 */}
      <BirthdayCard />
    </div>
  );
};

export default MainPage;
