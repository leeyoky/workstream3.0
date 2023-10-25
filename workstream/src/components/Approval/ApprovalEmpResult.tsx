import React, { useState, useRef, useCallback } from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectedActions } from '../../store/Approval/approval-slice';
import { uiActions } from '../../store/ui-slice';
import ApprovalTypeSelector from './ApprovalTypeSelector';
interface ApprovalEmpResultProps {
  selectedOption: string;
}

const ApprovalEmpResult: React.FC<ApprovalEmpResultProps> = () => {
  const [isDragging, setIsDragging] = useState(false);
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  
  const dispatch = useDispatch();

  // dragStartIndex를 ref로 관리
  const dragStartIndex = useRef(-1);
  const handleDragStart = useCallback(
    (
      e: React.DragEvent<HTMLDivElement>,
      empNo: number,
      empNm: string,
      rankNm: string,
      officeDutyNm: string,
      index: number
    ) => {
      const empInfo = {
        empNo,
        name: empNm,
        rankName: rankNm,
        duty: officeDutyNm,
        approvalType: '',
      };

      // 시작 인덱스 업데이트
      dragStartIndex.current = index;
      setIsDragging(true);
      const empInfoString = JSON.stringify(empInfo);

      e.dataTransfer.setData('empName', empInfoString);
      dispatch(uiActions.setDraggingItem(empNm));
    },
    []
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 드롭 허용
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const empNameData = e.dataTransfer.getData('empName');
    const draggedData = JSON.parse(empNameData);
    e.preventDefault();

    if (!isDragging) {

      // Accordion에서 가져온 드래그 앤 드롭
      dispatch(selectedActions.addEmp(draggedData));
      dispatch(uiActions.setDropTarget(draggedData));

    } else {

      const startIndex = dragStartIndex.current;
      const dropTarget = (e.target as HTMLElement).closest(`.${classes['emp-index']}`) as HTMLElement;
      const parentElement = dropTarget.parentElement;

      if (parentElement) {
        const dropIndex = Array.from(parentElement.children).indexOf(dropTarget);
        // 배열에서 요소 재배열
        const reorderedApprovers = [...approvers];

        // 드래그한 요소와 드롭한 요소를 서로 교환
        const [draggedItem] = reorderedApprovers.splice(startIndex, 1);
        reorderedApprovers.splice(dropIndex, 0, draggedItem);

        // 새로운 순서로 업데이트
        dispatch(selectedActions.setApprovers(reorderedApprovers));
      } 
    }
    setIsDragging(false); // 드래그 상태 초기화
  };

  const employeeElements: JSX.Element[] = [];
  approvers.forEach((employee, index) => {
    const isFirstEmployee = index === 0; // 첫 번째 요소 여부 확인
    const isLastEmployee = index === approvers.length - 1; // 마지막 요소 여부 확인
    
    const classNames = `${classes['emp-index']} ${isFirstEmployee ? classes['first-employee'] : ''} ${isLastEmployee ? classes['last-employee'] : ''}`;

    
    employeeElements.push(
      <div
        className={classNames}
        key={index}
        draggable="true"
        onDragStart={(e) => handleDragStart(
          e, employee.empNo, employee.name, employee.rankName, employee.duty, index)}
      >
        <div className={classes['approver-item']}
        >
          <div className={classes['approver-item__items']}>
            <span>{index + 1}</span>
            <span>{employee.name}</span>
            <span>{employee.duty}</span>
            <span>{employee.rankName || ''}</span>
          </div>
          {/* 인덱스 값을 하위 컴포넌트에 전달 */}
          <ApprovalTypeSelector
            index={index}
            name={employee.name} />
        </div>
      </div>
    );
  });

  return (
    <div className={classes['emp-list__result']} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className={classes['emp-item-wrapper']}>
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
