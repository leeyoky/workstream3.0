import React from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectedActions } from '../../store/Approval/approval-slice';

import ApprovalLineSelect from './ApprovalLineSelect';
import { useEffect } from 'react';
import ApprovalEmpResult from './ApprovalEmpResult';

interface ApprovalEmpSelectorProps {
  onClose: () => void; // 모달 닫기 핸들러
  isEdit?: boolean;
}

const ApprovalEmpSelector:React.FC<ApprovalEmpSelectorProps> = (props) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const selectedOption = useSelector((state: RootState) => state.approval.selectedOption);
  const approvers = useSelector((state: RootState) => state.approval.approvers)
  const agreements = useSelector((state: RootState) => state.approval.agreements);
  
  // 결재라인 방식 선택
  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const previousOption = selectedOption;
    
    dispatch(selectedActions.updateSelectedOption(e.target.value));

    if (previousOption === 'addAgreement' && e.target.value !== 'addAgreement') {
      dispatch(selectedActions.removeAgreements());
    }
  };

  useEffect(() => {
    if (props.isEdit) {
      dispatch(selectedActions.updateSelectedOption(selectedOption));
    }
  }, [props.isEdit, selectedOption, dispatch]);

  // 결재 직원을 전체 삭제
  const removeAllHandler = () => {
    dispatch(selectedActions.removeAllEmps());
  };

  // undo기능
  const undoHandler = () => {
    if (agreements.length > 0) {
      dispatch(selectedActions.undoAgreement());
    } else {
      dispatch(selectedActions.undoEmp());
    }
  };

  const goEdit = () => {
    if(!props.isEdit){
      if(documentType === ''){
        alert('작성할 문서가 선택되지 않았습니다.')
        return
      }
      if(selectedOption === ''){
        alert('결재라인 방식이 선택되지 않았습니다.')
        return
      }
      if(approvers.length === 0){
        const isContinue = window.confirm('결재자가 선택되지 않았습니다. 건너뛰겠습니까?');
        if(!isContinue){
          return
        }
      }
    }
    
    if(props.isEdit){
      console.log("에딧모드 디스패치");
      dispatch(selectedActions.updateApprovers(approvers));
      dispatch(selectedActions.updateAgreements(agreements));
    }
    
    props.onClose();
    navigate('/approval/edit')
  }

  return (
    <div className={classes['organization-selector__result-wrapper']}>
      <div className={classes['card']}>
        <ApprovalLineSelect
          selectedOption={selectedOption}
          selectChangeHandler={selectChangeHandler}
          undoHandler={undoHandler}
          removeAllHandler={removeAllHandler}
        />
        <ApprovalEmpResult 
          selectedOption={selectedOption}
          />
        <div className={classes['emp-list-result__btn-wrapper']}>
          <button onClick={goEdit}>완료</button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalEmpSelector;