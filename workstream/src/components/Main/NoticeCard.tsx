const NoticeCard = () => {
  return (
  <div className='notice-wrapper _card'>
    <div className='inner-box inner-box_notice'>
      <div className='inner-box__title'>
      <i className="fa-solid fa-bullhorn"></i>
      공지사항
      </div>
      <div className="inner-box__content inner-box__content_notice">
        <ul className="notice-card__table">
          <li>[인사발령] 강이지 사원 신규 입사</li>
          <li>2023-10-10</li>
          <li>김춘배</li>
          <li>80</li>
        </ul>
        <ul className="notice-card__table">
          <li>[인사발령] 김영철 과장 소속 변경 발령</li>
          <li>2023-10-10</li>
          <li>김춘배</li>
          <li>12</li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default NoticeCard