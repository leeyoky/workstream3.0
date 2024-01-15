import classes from './ApprovalMagager.module.css';
import { data } from './data';
const ApprovalManagerProceed = () => {
  return (
    <div className={classes['card']}>
      <div className={classes['card_title']}>
        <span>
          <i className="fa-solid fa-pen"></i>
          진행 중
        </span>
      </div>
      {data.map((item, index) => (
        <div className={`${classes['card-content']} ${classes['proceed']}`} key={index}>
          <div className={classes['user-wrapper']}>
            <i className="fa-solid fa-user-clock"></i>
            <span>대결 중</span>
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
          <div className={classes['button-wrapper']}>
            <button className="btn btn-red">
              해제
              <i className="fa-solid fa-user-slash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApprovalManagerProceed;
