import { useState } from 'react';
import classes from './ApprovalMagager.module.css';
import { data } from './data';

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
        <span>
          <i className="fa-solid fa-list"></i>
          History
        </span>
        {isContentOpen ? (
          <button className="btn btn-red-light" onClick={closeContentHandler}>
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
