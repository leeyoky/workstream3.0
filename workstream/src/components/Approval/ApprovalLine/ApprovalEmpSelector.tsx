import React, { useState, useEffect } from 'react';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';

import ApprovalLineSelect from './ApprovalEmpLineSelect';
import ApprovalEmpResult from './ApprovalEmpResult';
import { uiActions } from '../../../store/ui-slice';
import ApprovalSelectRef from '../ApprovalReference/ApprovalSelectRef';
import ApprovalResultRef from '../ApprovalReference/ApprovalResultRef';
import { Employee } from '../../../types/Approval/Approaval';
import { getOrderForApprovers } from '../../../helpers/getOrderForApprovers';

interface ApprovalEmpSelectorProps {
  isEdit?: boolean;
}
/**
 * 결재자 지정 버튼을 누르면 나타나는 모달의 우측에 위치한
 * 결재라인방식 선택 컴포넌트
 * @param props
 * @returns
 */

const ApprovalEmpSelector: React.FC<ApprovalEmpSelectorProps> = props => {
  const [updateApprovers, setUpdateApprovers] = useState<Employee[]>([]);
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const selectedOption = useSelector((state: RootState) => state.approval.selectedOption);
  const selectedAgreeOption = useSelector((state: RootState) => state.approval.agreementType);
  const isReference = useSelector((state: RootState) => state.approval.isReference);
  const dispatch = useDispatch();

  // 합의라인 방식 선택
  const selectChangeAgreementHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectedActions.updateSelectedAgreementOption(e.target.value));
  };

  // 합의 라인 방식 선택에 따른 order부여
  useEffect(() => {
    const updatedApprovers = getOrderForApprovers(approvers, selectedAgreeOption);
    setUpdateApprovers(updatedApprovers);
    console.log('updatedApprovers', updatedApprovers);
    dispatch(selectedActions.updateNewApprover(updatedApprovers));
  }, [selectedAgreeOption, approvers]);

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
              selectChangeAgreementHandler={selectChangeAgreementHandler}
              selectedAgreeOption={selectedAgreeOption}
              removeAllHandler={removeAllHandler}
            />
            <ApprovalEmpResult selectedOption={selectedOption} updateApprovers={updateApprovers} />
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
