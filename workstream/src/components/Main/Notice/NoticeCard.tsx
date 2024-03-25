import useNoticeList from '../../../hooks/Notice/useNoticeList';
const NoticeCard = () => {
  const { noticeData } = useNoticeList('regDate,desc');

  // 최대 5개의 공지사항만 가져오기
  const limitedNotices = noticeData.slice(0, 5);

  return (
    <div className="notice-wrapper _card">
      <div className="inner-box inner-box_notice">
        <div className="inner-box__title">
          <i className="fa-solid fa-bullhorn"></i>
          공지사항
        </div>
        <div className="inner-box__content inner-box__content_notice">
          {limitedNotices.map(item => (
            <ul className="notice-card__table" key={item.id}>
              <li>{item.title}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
