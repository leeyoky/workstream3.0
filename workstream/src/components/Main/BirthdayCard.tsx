const BirthdayCard = () => {
  return (
    <div className="birthday-wrapper _card">
      <div className="inner-box">
        <div className="inner-box__title">
          <i className="fa-solid fa-gift"></i>
          생일
        </div>
        <div className="inner-box__content inner-box__content_notice">
          <ul className="notice-card__table">
            <li>
              <span>2/7(양)</span>
              <span>김광수 사원</span>
              <span>기술지원DI파트</span>
            </li>
          </ul>
          <ul className="notice-card__table">
            <li>
              <span>2/18(음)</span>
              <span>김종기 이사</span>
              <span>사업수행본부</span>
            </li>
          </ul>
          <ul className="notice-card__table">
            <li>
              <span>2/20(양)</span>
              <span>박성민 주임</span>
              <span>Agile제품파트</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCard;
