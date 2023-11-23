import React, { useEffect, useState } from 'react'
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';
import { RootState } from '../../../store';
import { Employee } from '../../../types/Approval/Approaval';

interface ApprovalTypeSelectorProps{
  index: number;
  name: string;
}

const ApprovalTypeSelector:React.FC<ApprovalTypeSelectorProps> = ({ index, name }) => {
  // State
  const [isApproveActive, setIsApproveActive] = useState(true);
  const [isAgreeActive, setIsAgreeActive] = useState(false);
  const approverEmps = useSelector((state: RootState) =>
    state.approval.approvers);
  const dispatch = useDispatch();
  const approvers = useSelector((state: RootState) => 
    state.approval.approvers.filter(
      (employee:Employee) => employee.approvalType === 'APPROVER').length
      );
  const agreements = useSelector((state: RootState) => 
    state.approval.approvers.filter(
      employee => employee.approvalType === 'CONSENSUAL').length
      );
  const selectedOpton = useSelector((state: RootState) => 
    state.approval.selectedOption
    );
  const initialApprovalType = useSelector((state: RootState) => 
    state.approval.approvers[index].approvalType
    );

  // Effect

  useEffect(() => {
    const isLastIndex = index === approverEmps.length - 1;
  
    if (isLastIndex) {
      setIsApproveActive(true);     // Always set to true
      setIsAgreeActive(false);      // Always set to false
      dispatch(selectedActions.updateApprovers({ 
        indexes: [index], 
        approvalType: 'APPROVER'   // Set approvalType to 'APPROVER'
      }));
    }
  
  }, [index, approverEmps.length]);

  useEffect(() => {
    if (initialApprovalType === 'APPROVER') {
      setIsApproveActive(true);
      setIsAgreeActive(false);
    } else if (initialApprovalType === 'CONSENSUAL') {
      setIsApproveActive(false);
      setIsAgreeActive(true);
    }
  }, [initialApprovalType]);

  // Event Handlers
  const approveClickHandler = (index: number) => {
    const currentApproversCount = approvers;
  
    if (index === approverEmps.length - 1) {
      alert('마지막 결재자는 결재만 선택할 수 있습니다.');
    } else if (currentApproversCount >= 6) {
      alert('결재자는 기안자와 최종결재자가 포함된 최대 6명까지 선택 가능합니다.');
    } else {
      setIsApproveActive(true);
      setIsAgreeActive(false);
      dispatch(selectedActions.updateApprovers({ 
        indexes: [index], 
        approvalType: 'APPROVER' 
      }));
    }
  };
  
  const agreeClickHandler = (index: number) => {
    const currentAgreementsCount = agreements;
  
    if (index === approverEmps.length - 1) {
      alert('마지막 결재자는 결재만 선택할 수 있습니다.');
    } else if (currentAgreementsCount >= 7) {
      alert('합의는 최대 7명까지 선택 가능합니다.');
    } else {
      setIsAgreeActive(true);
      setIsApproveActive(false);
      dispatch(selectedActions.updateApprovers({ 
        indexes: [index], 
        approvalType: 'CONSENSUAL' 
      }));
    }
  };

  const deleteEmp = () => {
    dispatch(selectedActions.removeEmp(name))
  }

  let approveButtons = null;

  if (selectedOpton === 'addAgreement') {
    approveButtons = (
      <div className={classes['button-box__buttons']}>
        <button
          className={`${classes['active-button']} ${isApproveActive ? 
            classes.active : ''}`}
          onClick={() => approveClickHandler(index)}>
          결재
        </button>
        <button
          className={`${classes['active-button']} ${isAgreeActive ? 
            classes.active : ''}`}
          onClick={() => agreeClickHandler(index)}>
          합의
        </button>
      </div>
    );
  }
  return (
    <div className={classes['button-box']}>
      {approveButtons}
      <span 
        className={classes['button-delete']}
        onClick={deleteEmp}
      >
        <i className="fa-regular fa-trash-can"></i>
      </span>
    </div>
)}

export default ApprovalTypeSelector