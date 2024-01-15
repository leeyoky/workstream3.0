import { useState } from 'react';
import BoardTitle from '../../Layout/BoardLayout/BoardTitle';
import DatePick from '../../components/DatePick';
import classes from './ApprovalMagager.module.css';
import ApprovalManagerProceed from './ApprovalManagerProceed';
import ApprovalManagerHistory from './ApprovalManagerHistory';

const ApprovalManager = () => {
  const boardTitle = '전자결재 > 위임관리';
  const [isContentOpen, setIsContentOpen] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const openContentHandler = () => {
    setIsContentOpen(true);
  };
  const closeContentHandler = () => {
    setIsContentOpen(false);
  };
  const dateChangeHandler = (date: Date | null, type: string) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };
  return (
    <div className="page-wrapper setting-page">
      <BoardTitle title={boardTitle} />
      <div className={classes['setting-page-wrapper']}>
        <div className={classes['card']}>
          <div className={classes['card_title']}>
            <span>
              <i className="fa-solid fa-gear"></i>
              Setting
            </span>
            {isContentOpen ? (
              <button className="btn" onClick={closeContentHandler}>
                접기
                <i className="fa-solid fa-minus"></i>
              </button>
            ) : (
              <button className="btn btn-secondary-light" onClick={openContentHandler}>
                추가
                <i className="fa-solid fa-plus"></i>
              </button>
            )}
          </div>
          {isContentOpen && (
            <>
              <div className={classes['card-content']}>
                <div className={classes['icon-wrapper']}>
                  <i className="fa-solid fa-user-plus"></i>
                  <span>대결자지정</span>
                </div>
                <div className={classes['card-content_left']}>
                  <div className={classes['content-wrapper']}>
                    <span className={classes['content-title']}>기간</span>
                    <div className={classes['datepick-wrapper']}>
                      <DatePick
                        placeholderText="시작일자"
                        selected={startDate}
                        onChange={date => dateChangeHandler(date, 'start')}
                        dateFormat="yyyy-MM-dd"
                      />
                      <span>~</span>
                      <DatePick
                        placeholderText="종료일자"
                        selected={endDate}
                        onChange={date => dateChangeHandler(date, 'end')}
                        dateFormat="yyyy-MM-dd"
                      />
                    </div>
                  </div>
                  <div className={classes['content-wrapper']}>
                    <span className={classes['content-title']}>대결자</span>
                    <div className={classes['emp-select-wrapper']}>
                      <button className="btn btn-border">선택</button>
                    </div>
                  </div>
                </div>

                <div className={classes['reason-box']}>
                  <span className={classes['content-title']}>사유</span>
                  <div className={classes['reason-wrapper']}>
                    <textarea spellCheck={false}></textarea>
                  </div>
                </div>
                <div className={classes['button-wrapper']}>
                  <button className="btn btn-secondary">등록</button>
                </div>
              </div>
            </>
          )}
        </div>
        <ApprovalManagerProceed />
        <ApprovalManagerHistory />
      </div>
    </div>
  );
};

export default ApprovalManager;
