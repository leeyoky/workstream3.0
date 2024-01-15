import React, { useState, useRef, useCallback } from 'react';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { selectedActions } from '../../../store/Approval/approval-slice';
import { uiActions } from '../../../store/ui-slice';
import ApprovalTypeSelector from './ApprovalTypeSelector';
import { Employee } from '../../../types/Approval/Approaval';
interface ApprovalEmpResultProps {
  selectedOption: string;
  updateApprovers: Employee[];
}

/**
 * 결재라인 방식 선택 중
 * 결재자 추가/삭제 및 직원의 결재자의 순서 편집이 가능한 컴포넌트
 * @returns
 */
const ApprovalEmpResult: React.FC<ApprovalEmpResultProps> = () => {
  const [isDragging, setIsDragging] = useState(false);
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const approvalApprovers = approvers.filter(approver => approver.approvalType === 'APPROVER');
  const isReference = useSelector((state: RootState) => state.approval.isReference);
  const userLoginInfo = useSelector((state: RootState) => state.auth.userInfo);
  const selectedOption = useSelector((state: RootState) => state.approval.selectedOption);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();

  // dragStartIndex를 ref로 관리
  const dragStartIndex = useRef(-1);
  const handleDragStart = useCallback(
    (
      e: React.DragEvent<HTMLDivElement>,
      empNo: string,
      empNm: string,
      rankNm: string,
      officeDutyNm: string,
      index: number,
    ) => {
      const empInfo = {
        dragIndex: index,
        empNo,
        name: empNm,
        rankName: rankNm,
        duty: officeDutyNm,
        approvalType: '',
        index,
      };

      // 시작 인덱스 업데이트
      dragStartIndex.current = index;

      setIsDragging(true);
      const empInfoString = JSON.stringify(empInfo);

      e.dataTransfer.setData('empName', empInfoString);
      dispatch(uiActions.setDraggingItem(empInfo));
    },
    [],
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 드롭 허용
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const empNameData = e.dataTransfer.getData('empName');
    const draggedData = JSON.parse(empNameData);
    e.preventDefault();

    if (!isDragging) {
      /* 자기 자신을 드롭할때  */
      if (draggedData.empNo === userLoginInfo?.empNo) {
        return;
      }

      if (approvalApprovers.length < 5) {
        // Accordion에서 가져온 드래그 앤 드롭
        dispatch(selectedActions.addEmp(draggedData));
        dispatch(uiActions.setDropTarget(draggedData));
      } else {
        alert('결재자는 기안자와 최종결재자를 포함한 최대 6명까지 선택 가능합니다.) ');
      }
    } else {
      const startIndex = dragStartIndex.current;
      const dropTarget = (e.target as HTMLElement).closest(
        `.${classes['emp-index']}`,
      ) as HTMLElement;

      if (dropTarget) {
        const dropIndex = parseInt(dropTarget.getAttribute('data-index') || '-1', 10); // data-index 속성을 구문 분석합니다.

        if (startIndex !== dropIndex) {
          // 배열에서 요소 재배열
          const reorderedApprovers = [...approvers];
          // 드래그한 요소를 배열에서 제거
          const [draggedItem] = reorderedApprovers.splice(startIndex, 1);
          // 드래그한 요소를 드롭한 위치로 삽입
          reorderedApprovers.splice(dropIndex, 0, draggedItem);

          const isLastIndex = dropIndex === reorderedApprovers.length - 1;

          // 만약 합의인 사람을 마지막 결재권자로 지정했을때
          const updatedApprovers = reorderedApprovers.map((approver, index) => {
            if (isLastIndex && index === dropIndex && selectedOption === 'addAgreement') {
              alert('최종결재권자는 [결재]로 자동선택 됩니다');
              return { ...approver, approvalType: 'APPROVER' };
            } else {
              return approver;
            }
          });
          // 새로운 순서로 업데이트
          dispatch(selectedActions.setApprovers(updatedApprovers));
        }
      }
    }
    setIsDragging(false); // 드래그 상태 초기화
  };

  const employeeElements: JSX.Element[] = [];

  approvers.forEach((employee, index) => {
    employeeElements.push(
      <div
        className={classes['emp-index']}
        key={index}
        draggable="true"
        data-index={index}
        data-emp-info={JSON.stringify(employee)}
        onDragStart={e =>
          handleDragStart(e, employee.empNo, employee.name, employee.rankName, employee.duty, index)
        }>
        <div className={classes['approver-item']}>
          <div className={classes['approver-item__items']}>
            <span>{index + 2}</span>
            <span>{employee.name}</span>
            <span>{employee.rankName || ''}</span>
            <span>{employee.duty}</span>
          </div>
          {/* 인덱스 값을 하위 컴포넌트에 전달 */}
          {isReference === false ? (
            <ApprovalTypeSelector index={index} name={employee.name} />
          ) : null}
        </div>
      </div>,
    );
  });

  return (
    <div className={classes['emp-list__result']} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className={classes['emp-item-wrapper']}>
        <div className={classes['emp-index-default']}>
          <div className={classes['approver-item-index']}>
            <div className={classes['approver-item-th']}>
              <span></span>
              <span>이름</span>
              <span>직급</span>
              <span>직책</span>
              <span>결재타입</span>
              <span>후결</span>
              <span>전결</span>
              <span>삭제</span>
            </div>
          </div>
          <div className={classes['approver-item']}>
            <div className={classes['approver-item__items']}>
              <span>{1}</span>
              <span>{userLoginInfo?.empNm}</span>
              <span>{userInfo?.rankNm}</span>
              <span>{userInfo?.officeDutyNm || ''}</span>
            </div>
          </div>
        </div>
        {approvers.length > 0 ? (
          employeeElements
        ) : (
          <div className={classes['emp-index__drag__wrapper']}>
            <span className={classes['emp-item__drag']}>직원을 드래그해주세요</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalEmpResult;
