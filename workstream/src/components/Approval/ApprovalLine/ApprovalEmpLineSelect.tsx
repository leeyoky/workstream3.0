// ApprovalSelect.tsx
import React from 'react';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface ApprovalSelectProps {
  selectedOption: string;
  selectedAgreeOption: string;
  selectChangeAgreementHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  removeAllHandler: () => void;
}

/**
 * 결재자 지정 버튼을 눌렀을 때 나타나는 모달 우측의
 * 결재라인 방식 선택 컴포넌트
 * 결재, 결재+합의 및 합의 순차, 합의 병렬을 선택할 수 있음
 * @param param0
 * @returns
 */
const ApprovalEmpLineSelect: React.FC<ApprovalSelectProps> = ({
  selectedAgreeOption,
  selectChangeAgreementHandler,
  removeAllHandler,
}) => {
  const isReference = useSelector((state: RootState) => state.approval.isReference);

  return (
    <div className={classes['card-header']}>
      <p>결재라인 방식 선택</p>
      <hr />
      <div
        className={`${classes['emp-list__result-select-wrapper']} ${
          isReference ? classes['emp-list__result-select-wrapper__ref'] : ''
        }`}>
        <div className={classes['line-select_select-box']}>
          <select
            className={classes['emp-list__result-select__agr']}
            value={selectedAgreeOption}
            onChange={selectChangeAgreementHandler}>
            <option value="sequential">합의 순차방식</option>
            <option value="parallel">합의 병렬방식</option>
          </select>
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
