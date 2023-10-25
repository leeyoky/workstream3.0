import React, { useEffect, useState } from 'react'
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectedActions } from './../../store/Approval/approval-slice';
import { RootState } from '../../store';

interface ApprovalTypeSelectorProps{
  index: number;
  name: string;
}

const ApprovalTypeSelector:React.FC<ApprovalTypeSelectorProps> = ({ index, name }) => {
  // State
  const [isApproveActive, setIsApproveActive] = useState(true);
  const [isAgreeActive, setIsAgreeActive] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const approvers = useSelector((state: RootState) => 
    state.approval.approvers.filter(
      employee => employee.approvalType === 'approve').length
      );
  const agreements = useSelector((state: RootState) => 
    state.approval.approvers.filter(
      employee => employee.approvalType === 'agree').length
      );
  const selectedOpton = useSelector((state: RootState) => 
    state.approval.selectedOption
    );
  const initialApprovalType = useSelector((state: RootState) => 
    state.approval.approvers[index].approvalType
    );

  // Effect
  useEffect(() => {
    if (initialApprovalType === 'approve') {
      setIsApproveActive(true);
      setIsAgreeActive(false);
    } else if (initialApprovalType === 'agree') {
      setIsApproveActive(false);
      setIsAgreeActive(true);
    }
  }, [initialApprovalType]);

  // Event Handlers
  const approveClickHandler = ( index : number ) => {
    const currentApproversCount = approvers;
    if(currentApproversCount >= 6){
      alert('결재자는 기안자와 최종결재자가 포함된 최대 6명까지 선택 가능합니다.')
    }else{
      setIsApproveActive(true);
      setIsAgreeActive(false);
      dispatch(selectedActions.updateApprovers({ 
        indexes: [index], 
        approvalType: 'approve' 
      }));
    }
  };
  
  const agreeClickHandler = ( index : number ) => {
    const currentAgreementsCount = agreements;
    if(currentAgreementsCount >= 7){
      alert('합의는 최대 7명까지 선택 가능합니다.')
    }else{
      setIsAgreeActive(true);
      setIsApproveActive(false);
      dispatch(selectedActions.updateApprovers({ 
        indexes: [index], 
        approvalType: 'agree' 
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
)
}

export default ApprovalTypeSelector