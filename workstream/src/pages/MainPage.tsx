import { useEffect, useState } from 'react';
import { uiActions } from '../store/ui-slice';
import { useDispatch } from 'react-redux';

import dsValue from '../assets/img/dsvalue.png';
import BirthdayCard from '../components/Main/BirthdayCard';
import CalendarCard from '../components/Main/Calendar/CalendarCard';
import DocumentCard from '../components/Main/DocumentCard';
import Leadership from '../components/Main/Leadership';
import NewestEmp from '../components/Main/NewestEmp';
import NoticeCard from '../components/Main/Notice/NoticeCard';
import Performance from '../components/Main/Performance';
import WeatherCard from '../components/Main/Weather/WeatherCard';
import PopupModal from '../components/Main/Notice/PopupModal';
import { getPopupList } from '../api/endpoints/notice';

const MainPage = () => {
  const [popupStates, setPopupStates] = useState<boolean[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [popupList, setPopupList] = useState([]);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const dispatch = useDispatch();

  // subToolbar 유무
  useEffect(() => {
    dispatch(uiActions.setSubToolBar(false));
    dispatch(uiActions.selectMenu(''));
    getPopupData();
    console.log(isPopupOpen);
  }, []);

  // useEffect(() => {
  //   const storedPopupStates = localStorage.getItem('popupStates');
  //   if (storedPopupStates) {
  //     setPopupStates(JSON.parse(storedPopupStates));
  //   }
  // }, []);

  // 모달 닫기 이벤트 핸들러
  const handleCloseModal = () => {
    setIsPopupOpen(false);
  };

  const handle7DaysClose = (index: number) => {
    const updatedPopupStates = [...popupStates];
    updatedPopupStates[index] = true;
    setPopupStates(updatedPopupStates);

    // localStorage.setItem('popupStates', JSON.stringify(updatedPopupStates));
  };

  const getPopupData = async () => {
    try {
      const response = await getPopupList();
      const popupData = response.data;
      const initialPopupStates = popupData.map(() => false);
      setPopupStates(initialPopupStates);
      setPopupList(popupData);
    } catch (error) {
      console.log(error);
    }
  };

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
      {popupList.map((popup, index) => (
        <PopupModal
          key={index}
          data={popup}
          onClose={handleCloseModal}
          on7DaysClose={() => handle7DaysClose(index)}
          className={`main_popup_modal md-idx${index}`}
        />
      ))}
    </div>
  );
};

export default MainPage;
