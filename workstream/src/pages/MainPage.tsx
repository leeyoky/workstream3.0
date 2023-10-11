import dsValue from '../assets/img/dsvalue.png'
import DocumentCard from '../components/Main/DocumentCard';
import Leadership from '../components/Main/LeaderShip';
import NewestEmp from '../components/Main/NewestEmp';
import NoticeCard from '../components/Main/NoticeCard';
const MainPage = () => {
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  
  return (
    <div className='main-wrapper'>
      {/* 핵심가치 */}
      <div className='dsvalue-wrapper _card'>
        <img src={dsValue} alt="데이터스트림즈 핵심가치" />
      </div>

      <Leadership />

      <NoticeCard />

      {/* 수주실적 */}
      <div className='orderPerformance-wrapper _card'>
        <div className='inner-box'>
          <div className='inner-box__title'>
            <i className="fa-solid fa-star"></i>
          {currentMonth}월의 수주실적
          </div>
        </div>
      </div>

      <NewestEmp />

      {/* 알림 */}
      <div className='news-wrapper _card'>
        <div className='inner-box'>
          <div className='inner-box__title'>
            <i className="fa-solid fa-bell"></i>
          알림
          </div>
        </div>
      </div>



      {/* 일정 */}
      <div className='calender-wrapper _card'>
        <div className='inner-box'>
          <div className='inner-box__title'>
            <i className="fa-regular fa-calendar"></i>
          일정
          </div>
        </div>
      </div>

      <DocumentCard />

      {/* 최신문서 */}
      <div className='birthday-wrapper _card'>
        <div className='inner-box'>
          <div className='inner-box__title'>
            <i className="fa-solid fa-gift"></i>
          생일자
          </div>
        </div>
      </div>

    </div>

    
  )
}

export default MainPage