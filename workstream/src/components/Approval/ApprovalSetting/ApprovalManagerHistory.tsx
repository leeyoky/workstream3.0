import { useState } from 'react';
import classes from '../../../pages/Approval/ApprovalMagager.module.css';
import { data } from '../../../pages/Approval/data';

/**
 * 전자결재 > 위임관리 History 컴포넌트
 * default 5개의 최근 내역만 보여주기
 * 검색 필터에서 기간 설정하기
 * TODO: 설정 모달 만들기
 * @returns
 */
const ApprovalManagerHistory = () => {
  const [isContentOpen, setIsContentOpen] = useState(true);
  const openContentHandler = () => {
    setIsContentOpen(true);
  };
  const closeContentHandler = () => {
    setIsContentOpen(false);
  };
  return (
    <div className={classes['card']}>
      <div className={classes['card_title']}>
        <span className={classes['hisory-header']}>
          <i className="fa-solid fa-list"></i>
          <span>History</span>
          <span className={classes['date-bage-box']}>
            <span># 2024</span>
          </span>
        </span>

        {isContentOpen ? (
          <button className="btn" onClick={closeContentHandler}>
            접기
            <i className="fa-solid fa-minus"></i>
          </button>
        ) : (
          <button className="btn btn-secondary-light" onClick={openContentHandler}>
            열기
            <i className="fa-solid fa-plus"></i>
          </button>
        )}
      </div>
      {isContentOpen && (
        <>
          {data.map((item, index) => (
            <div className={`${classes['card-content']} ${classes['history']}`} key={index}>
              <div className={classes['user-wrapper']}>
                <i className="fa-solid fa-user-check"></i>
                <span>대결 완료</span>
              </div>
              <div className={classes['card-content_left']}>
                <div className={classes['content-wrapper']}>
                  <span className={classes['content-title']}>기간</span>
                  <div className={classes['date-wrapper']}>
                    <i className="fa-regular fa-calendar"></i>
                    <span>{item.startDate}</span>~<span>{item.endData}</span>
                  </div>
                </div>
                <div className={classes['content-wrapper']}>
                  <span className={classes['content-title']}>대결자</span>
                  <div className={classes['emp-result-wrapper']}>
                    <span>[{item.deptNm}]</span>
                    <span>{item.empNm}</span>
                    <span>{item.rankNm}</span>
                  </div>
                </div>
              </div>
              <div className={classes['reason-box']}>
                <span className={classes['content-title']}>사유</span>
                <div className={classes['reason-wrapper']}>
                  <span className={classes['reason']}>{item.reason}</span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ApprovalManagerHistory;
