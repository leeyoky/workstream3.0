import React from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { selectedActions } from '../../store/Approval/approval-slice';

import ApprovalLineSelect from './ApprovalEmpLineSelect';
import { useEffect } from 'react';
import ApprovalEmpResult from './ApprovalEmpResult';
import { uiActions } from '../../store/ui-slice';

interface ApprovalEmpSelectorProps {
  onClose: () => void; // 모달 닫기 핸들러
  isEdit?: boolean;
}

const ApprovalEmpSelector:React.FC<ApprovalEmpSelectorProps> = (props) => {
  
  const dispatch = useDispatch();
  const selectedOption = useSelector((state: RootState) => state.approval.selectedOption);
  const selectedAgreeOption = useSelector((state: RootState) => state.approval.agreementType)
  
  // 결재라인 방식 선택
  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectedActions.updateSelectedOption(e.target.value));
  };
  // 합의라인 방식 선택
  const selectChangeAgreementHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectedActions.updateSelectedAgreementOption(e.target.value))
  }

  useEffect(() => {
    if (props.isEdit) {
      dispatch(selectedActions.updateSelectedOption(selectedOption));
      dispatch(selectedActions.updateSelectedAgreementOption(selectedAgreeOption));
    }
  }, [props.isEdit, selectedOption,selectedAgreeOption, dispatch]);

  // 결재 직원을 전체 삭제
  const removeAllHandler = () => {
    dispatch(selectedActions.removeAllEmps());
    dispatch(uiActions.resetDropTarget());
  };

  return (
    <div className={classes['organization-selector__result-wrapper']}>
      <div className={classes['card']}>
        <ApprovalLineSelect
          selectedOption={selectedOption}
          selectChangeHandler={selectChangeHandler}
          selectChangeAgreementHandler={selectChangeAgreementHandler}
          selectedAgreeOption={selectedAgreeOption}
          removeAllHandler={removeAllHandler}
          
        />
        <ApprovalEmpResult 
          selectedOption={selectedOption}
          />
      </div>
    </div>
  );
};

export default ApprovalEmpSelector;