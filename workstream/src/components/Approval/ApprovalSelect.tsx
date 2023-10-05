import React from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';

interface ApprovalSelectProps {
  selectedOption: string;
  selectChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  undoHandler: () => void;
  removeAllHandler: () => void;
}

const ApprovalSelect:React.FC<ApprovalSelectProps> = ({
  selectedOption,
  selectChangeHandler,
  undoHandler,
  removeAllHandler,
}) => {
  
  return (
    <div className={classes['card-header']}>
      <p>결재라인 방식 선택</p>
      <hr />
      <div className={classes['emp-list__result-select-wrapper']}>
        <select
          className={classes['emp-list__result-select']}
          value={selectedOption}
          onChange={selectChangeHandler}
        >
          <option value="">-- 선택 --</option>
          <option value="approval">결재만</option>
          <option value="addAgreement">결재+합의</option>
        </select>
        <div className={classes['control-button-group']}>
          <button className={classes['emp-list__undo-btn']} onClick={undoHandler}>
            <i className="fa-solid fa-rotate-left"></i>
          </button>
          <button className='btn-red' onClick={removeAllHandler}>전체삭제</button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalSelect;
