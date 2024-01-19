import React, { useEffect, useState } from 'react';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';
import { RootState } from '../../../store';
import { Employee } from '../../../types/Approval/Approaval';
import ApprovalTypeCheckBox from './ApprovalTypeCheckBox';
interface ApprovalTypeSelectorProps {
  index: number;
  name: string;
  approvedYn?: string;
}
/**
 * 결재자 결과창에 보여지는 사원의 결재타입을 선택하는 문서
 * 결재/합의 버튼을 눌러 타입을 선택한다.
 *
 * @param param0
 * @returns
 */

const ApprovalTypeSelector: React.FC<ApprovalTypeSelectorProps> = ({ index, name, approvedYn }) => {
  // State
  const [isApproveActive, setIsApproveActive] = useState(true);
  const [isAgreeActive, setIsAgreeActive] = useState(false);
  // 후결
  const [isDeferredCheck, setIsDeferredCheck] = useState(false);
  // 전결
  const [isOverrideChecked, setIsOverrideChecked] = useState(false);
  const isOverrideActive = useSelector(
    (state: RootState) => state.approval.overrideIndex === index,
  );
  const approvers = useSelector(
    (state: RootState) =>
      state.approval.approvers.filter((employee: Employee) => employee.approvalType === 'APPROVER')
        .length,
  );
  const agreements = useSelector(
    (state: RootState) =>
      state.approval.approvers.filter(employee => employee.approvalType === 'CONSENSUAL').length,
  );
  const initialApprovalType = useSelector(
    (state: RootState) => state.approval.approvers[index].approvalType,
  );

  const approverEmps = useSelector((state: RootState) => state.approval.approvers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialApprovalType === 'APPROVER') {
      setIsApproveActive(true);
      setIsAgreeActive(false);
    } else if (initialApprovalType === 'CONSENSUAL') {
      setIsApproveActive(false);
      setIsAgreeActive(true);
    }
  }, [initialApprovalType]);

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
      dispatch(
        selectedActions.updateApproverCheckBox({
          indexes: [index],
          deferredYn: 'N',
          overrideYn: 'N',
        }),
      );
    }
  }, [index, approverEmps.length]);

  // 결재 선택 버튼
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
  // 합의 선택 버튼
  const agreeClickHandler = (index: number) => {
    const currentAgreementsCount = agreements;

    if (index === approverEmps.length - 1) {
      alert('최종결재권자는 결재권한만 행사할 수 있습니다.');
    } else if (currentAgreementsCount >= 7) {
      alert('합의는 최대 7명까지 선택 가능합니다.');
    } else {
      setIsAgreeActive(true);
      setIsApproveActive(false);
      if (isOverrideChecked) {
        alert('합의가 선택된 상태에서는 전결을 선택할 수 없습니다.');
        dispatch(selectedActions.setSelectedPreliminaryIndex(null));
        return;
      }
      // 전결 체크 해제
      dispatch(
        selectedActions.updateApprovers({
          indexes: [index],
          approvalType: 'CONSENSUAL',
        }),
      );
      dispatch(
        selectedActions.updateApproverCheckBox({
          indexes: [index],
          deferredYn: isDeferredCheck ? 'N' : 'Y',
          overrideYn: 'N',
        }),
      );
    }
  };
  // 전결 선택 버튼
  const handleCheckboxChange = (isChecked: boolean, overrideValue: string) => {
    setIsOverrideChecked(isChecked);
    dispatch(selectedActions.setSelectedPreliminaryIndex(isChecked ? index : null));
    dispatch(
      selectedActions.updateApproverCheckBox({
        indexes: [index],
        deferredYn: isDeferredCheck ? 'Y' : 'N',
        overrideYn: overrideValue,
      }),
    );
  };
  // 후결 선택 버튼
  const deferClickHandler = () => {
    if (isOverrideActive) {
      alert('전결자는 후결자일 수 없습니다');
      return;
    }
    setIsDeferredCheck(preState => !preState);
    dispatch(
      selectedActions.updateApproverCheckBox({
        indexes: [index],
        overrideYn: isOverrideChecked ? 'Y' : 'N',
        deferredYn: isDeferredCheck ? 'Y' : 'N',
      }),
    );
  };
  // 전결 checkBox 여부
  const overrideClickHandler = () => {
    if (isAgreeActive) {
      // 합의가 선택된 상태에서는 전결 선택 불가
      alert('합의가 선택된 상태에서는 전결을 선택할 수 없습니다.');
      return;
    }
    if (isDeferredCheck) {
      alert('전결자는 후결자일 수 없습니다.');
      return;
    }
    const isChecked = !isOverrideActive;
    handleCheckboxChange(isChecked, isChecked ? 'Y' : 'N');
  };

  const deleteEmp = () => {
    dispatch(selectedActions.removeEmp(name));
  };

  let approveButtons = null;

  const displayStyle = index === approverEmps.length - 1 ? 'none' : '';
  approveButtons = (
    <div className={classes['button-box__buttons']} style={{ display: displayStyle }}>
      <button
        className={`${classes['active-button']} ${isApproveActive ? classes.approvalType : ''}`}
        onClick={() => approveClickHandler(index)}>
        결재
      </button>
      <button
        className={`${classes['active-button']} ${isAgreeActive ? classes.approvalType : ''}`}
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
      </div>
    );
  }

  const deleteButton: JSX.Element | null = (
    <span className={classes['button-delete']} onClick={deleteEmp}>
      <i className="fa-regular fa-trash-can"></i>
    </span>
  );

  return (
    <div className={classes['button-box']}>
      {approveButtons}
      {lastApproveButtons}
      <ApprovalTypeCheckBox
        approvedYn={approvedYn || ''}
        index={index}
        isDeferredCheck={isDeferredCheck}
        isOverrideActive={isOverrideActive}
        deferClickHandler={deferClickHandler}
        overrideClickHandler={overrideClickHandler}
      />
      {approvedYn !== 'Y' && deleteButton}
    </div>
  );
};

export default ApprovalTypeSelector;
