import classes from '../../../pages/Approval/ApprovalMagager.module.css';
import { data } from '../../../pages/Approval/data';
import { useState } from 'react';
import SettingDelegationEdit from '../ApprovalModals/SettingDelegationEdit';

const ApprovalManagerProceed = () => {
  const [openDelegationModal, setOpenDelegationModal] = useState(false);

  const openSettingModal = () => {
    setOpenDelegationModal(preState => !preState);
  };

  const stopDelegationHandler = () => {
    const result = window.confirm('현재 진행 중인 대결을 해제하시겠습니까?');
    if (result) {
      console.log('대결을 해제하였습니다');
    }
  };

  return (
    <div className={classes['card']}>
      <div className={classes['card_title']}>
        <span>
          <i className="fa-solid fa-pen"></i>
          진행 내역
        </span>
      </div>
      {data.map((item, index) => (
        <div
          className={`${classes['card-content']} ${
            item.state === 'PROCEEDING' ? classes['proceed'] : classes['pending']
          }`}
          key={index}>
          <div className={classes['user-wrapper']}>
            {item.state === 'PROCEEDING' ? (
              <span className={classes['icon-wrapper']}>
                <i className="fa-solid fa-user-clock"></i>
                <span>대결 중</span>
              </span>
            ) : (
              <span className={classes['icon-wrapper']}>
                <i className="fa-solid fa-user-clock"></i>
                <span>대결 예정</span>
              </span>
            )}
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
            <button className="btn btn-red" onClick={stopDelegationHandler}>
              해제
              <i className="fa-solid fa-user-slash"></i>
            </button>
            <button className="btn" onClick={openSettingModal}>
              설정
              <i className="fa-solid fa-gear"></i>
            </button>
            {openDelegationModal && <SettingDelegationEdit onClose={openSettingModal} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApprovalManagerProceed;
