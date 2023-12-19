import React from 'react';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';

import ApprovalLineSelect from './ApprovalEmpLineSelect';
import { useEffect } from 'react';
import ApprovalEmpResult from './ApprovalEmpResult';
import { uiActions } from '../../../store/ui-slice';
import ApprovalSelectRef from '../ApprovalReference/ApprovalSelectRef';
import ApprovalResultRef from '../ApprovalReference/ApprovalResultRef';

interface ApprovalEmpSelectorProps {
  onClose: () => void; // 모달 닫기 핸들러
  isEdit?: boolean;
}

const ApprovalEmpSelector: React.FC<ApprovalEmpSelectorProps> = props => {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state: RootState) => state.approval.selectedOption);
  const selectedAgreeOption = useSelector((state: RootState) => state.approval.agreementType);
  const isReference = useSelector((state: RootState) => state.approval.isReference);
  // 결재라인 방식 선택
  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectedActions.updateSelectedOption(e.target.value));
    if (e.target.value === 'addAgreement') {
      dispatch(selectedActions.updateSelectedAgreementOption('sequential'));
    }
  };
  // 합의라인 방식 선택
  const selectChangeAgreementHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectedActions.updateSelectedAgreementOption(e.target.value));
  };

  useEffect(() => {
    if (selectedOption === '') {
      dispatch(selectedActions.updateSelectedOption('approval'));
    }
  }, [props.isEdit]);

  // 결재 직원을 전체 삭제
  const removeAllHandler = () => {
    dispatch(selectedActions.removeAllEmps());
    dispatch(uiActions.resetDropTarget());
  };

  return (
    <div className={classes['organization-selector__result-wrapper']}>
      <div className={classes['card']}>
        {!isReference ? (
          <>
            <ApprovalLineSelect
              selectedOption={selectedOption}
              selectChangeHandler={selectChangeHandler}
              selectChangeAgreementHandler={selectChangeAgreementHandler}
              selectedAgreeOption={selectedAgreeOption}
              removeAllHandler={removeAllHandler}
            />
            <ApprovalEmpResult selectedOption={selectedOption} />
          </>
        ) : (
          <>
            <ApprovalSelectRef />
            <ApprovalResultRef />
          </>
        )}
      </div>
    </div>
  );
};

export default ApprovalEmpSelector;
