// ApprovalSelect.tsx
import React from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';

interface ApprovalSelectProps {
  selectedOption: string;
  selectedAgreeOption: string;
  selectChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectChangeAgreementHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  removeAllHandler: () => void;
}

const ApprovalEmpLineSelect: React.FC<ApprovalSelectProps> = ({
  selectedOption,
  selectedAgreeOption,
  selectChangeHandler,
  selectChangeAgreementHandler,
  removeAllHandler,
}) => {

  const dispatch = useDispatch();
  const lineSelector = useSelector((state: RootState) => state.approval.selectedOption);


  return (
    <div className={classes['card-header']}>
      <p>결재라인 방식 선택</p>
      <hr />
      <div className={classes['emp-list__result-select-wrapper']}>
        <div className={classes['line-select_select-box']}>
          <select
            className={classes['emp-list__result-select']}
            value={selectedOption}
            onChange={selectChangeHandler}
          >
            <option value="approval">결재</option>
            <option value="addAgreement">결재+합의</option>
          </select>
          { lineSelector === 'addAgreement' && (
            <select
            className={classes['emp-list__result-select__agr']}
            value={selectedAgreeOption}
            onChange={selectChangeAgreementHandler}
          >
            <option value="sequential">합의 순차방식</option>
            <option value="parallel">합의 병렬방식</option>
          </select>
          )}
        </div>
        <div className={classes['control-button-group']}>
          <button className="btn-red btn" onClick={removeAllHandler}>
            전체삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalEmpLineSelect;
