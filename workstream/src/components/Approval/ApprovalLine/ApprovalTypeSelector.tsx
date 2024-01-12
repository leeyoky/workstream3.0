import React, { useEffect, useState } from 'react';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';
import { RootState } from '../../../store';
import { Employee } from '../../../types/Approval/Approaval';
interface ApprovalTypeSelectorProps {
  index: number;
  name: string;
}
/**
 * 결재자 결과창에 보여지는 사원의 결재타입을 선택하는 문서
 * 결재/합의 버튼을 눌러 타입을 선택한다.
 *
 * @param param0
 * @returns
 */
const ApprovalTypeSelector: React.FC<ApprovalTypeSelectorProps> = ({ index, name }) => {
  // State
  const [isApproveActive, setIsApproveActive] = useState(true);
  const [isAgreeActive, setIsAgreeActive] = useState(false);

  const approverEmps = useSelector((state: RootState) => state.approval.approvers);
  const dispatch = useDispatch();
  const approvers = useSelector(
    (state: RootState) =>
      state.approval.approvers.filter((employee: Employee) => employee.approvalType === 'APPROVER')
        .length,
  );
  const agreements = useSelector(
    (state: RootState) =>
      state.approval.approvers.filter(employee => employee.approvalType === 'CONSENSUAL').length,
  );
  const selectedOpton = useSelector((state: RootState) => state.approval.selectedOption);
  const initialApprovalType = useSelector(
    (state: RootState) => state.approval.approvers[index].approvalType,
  );

  // Effect

  useEffect(() => {
    const isLastIndex = index === approverEmps.length - 1;

    if (isLastIndex) {
      setIsApproveActive(true);
      setIsAgreeActive(false);
      dispatch(
        selectedActions.updateApprovers({
          indexes: [index],
          approvalType: 'APPROVER',
        }),
      );
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
      alert('최종결재권자는 결재권한만 행사할 수 있습니다.');
    } else if (currentApproversCount >= 6) {
      alert('결재자는 기안자와 최종결재자가 포함된 최대 6명까지 선택 가능합니다.');
    } else {
      setIsApproveActive(true);
      setIsAgreeActive(false);
      dispatch(
        selectedActions.updateApprovers({
          indexes: [index],
          approvalType: 'APPROVER',
        }),
      );
    }
  };

  const agreeClickHandler = (index: number) => {
    const currentAgreementsCount = agreements;

    if (index === approverEmps.length - 1) {
      alert('최종결재권자는 결재권한만 행사할 수 있습니다.');
    } else if (currentAgreementsCount >= 7) {
      alert('합의는 최대 7명까지 선택 가능합니다.');
    } else {
      setIsAgreeActive(true);
      setIsApproveActive(false);
      dispatch(
        selectedActions.updateApprovers({
          indexes: [index],
          approvalType: 'CONSENSUAL',
        }),
      );
    }
  };

  const deleteEmp = () => {
    dispatch(selectedActions.removeEmp(name));
  };

  let approveButtons = null;

  const displayStyle =
    selectedOpton === 'approval' || index === approverEmps.length - 1 ? 'none' : '';
  approveButtons = (
    <div className={classes['button-box__buttons']} style={{ display: displayStyle }}>
      <button
        className={`${classes['active-button']} ${isApproveActive ? classes.active : ''}`}
        onClick={() => approveClickHandler(index)}>
        결재
      </button>
      <button
        className={`${classes['active-button']} ${isAgreeActive ? classes.active : ''}`}
        onClick={() => agreeClickHandler(index)}>
        합의
      </button>
    </div>
  );

  let lastApproveButtons = null;
  if (index === approverEmps.length - 1) {
    lastApproveButtons = (
      <div className={classes['last-approver']}>
        <div className={classes['button-box__buttons']}>
          <button className={classes['last']}>최종 결재</button>
        </div>
        <span className={classes['button-delete']} onClick={deleteEmp}>
          <i className="fa-regular fa-trash-can"></i>
        </span>
      </div>
    );
  }

  let deleteButton: JSX.Element | null = (
    <span className={classes['button-delete']} onClick={deleteEmp}>
      <i className="fa-regular fa-trash-can"></i>
    </span>
  );

  if (index === approverEmps.length - 1) {
    deleteButton = null;
  }

  return (
    <div className={classes['button-box']}>
      {approveButtons}
      {lastApproveButtons}
      {deleteButton}
    </div>
  );
};

export default ApprovalTypeSelector;
