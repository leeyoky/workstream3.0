import { useDispatch } from 'react-redux';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { selectedActions } from '../../../store/Approval/approval-slice';

const ApprovalResultRef = () => {
  const referenceDept = useSelector((state: RootState) => state.approval.ccDept);
  const referenceEmp = useSelector((state: RootState) => state.approval.ccUser);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo?.empNo);
  const dispatch = useDispatch();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 드롭 허용
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const empData = e.dataTransfer.getData('empName');
    const draggedData = JSON.parse(empData);
    e.preventDefault();

    if (draggedData.empNo === userInfo) {
      alert('자기 자신을 참조자로 추가할 수 없습니다.');
      return;
    }

    if (referenceEmp.length < 10) {
      dispatch(selectedActions.addRefEmp(draggedData));
    } else {
      alert('참조자는 최대 10명까지 추가 가능합니다.');
    }
  };

  const deleteRefHandler = (type: string, cd: string) => {
    if (type === 'DEPT') {
      dispatch(selectedActions.removeRefDept(cd));
    } else {
      dispatch(selectedActions.removeRefEmp(cd));
    }
  };

  return (
    <div className={classes['emp-list__result']}>
      <div className={classes['emp-item-wrapper']}>
        <div className={classes['emp-index-default']}>
          <div className={classes['emp-index--ref']}>
            <div className={classes['reference-item']}>
              <div className={classes['approver-item__items']}>
                <strong>[참조부서]</strong>
              </div>
            </div>
          </div>
        </div>
        <div className={classes['emp-index-default']}>
          <div className={classes['emp-index--ref']}>
            <div
              className={classes['reference-item--dept']}
              onDragOver={handleDragOver}
              onDrop={handleDrop}>
              {referenceDept.length > 0 ? (
                <div className={classes['approver-item__items']}>
                  {referenceDept.map((dept, index) => (
                    <>
                      <span key={index}>
                        <i className="fa-solid fa-folder"></i>
                        {dept.deptNm}
                        <button onClick={() => deleteRefHandler('DEPT', dept.deptCd)}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </span>
                    </>
                  ))}
                </div>
              ) : (
                <strong className={classes['emp-item__drag']}>부서를 추가(+) 해주세요 </strong>
              )}
            </div>
          </div>
        </div>
        <div className={classes['emp-index-default']}>
          <div className={classes['emp-index--ref']}>
            <div className={classes['reference-item']}>
              <div className={classes['approver-item__items']}>
                <strong>[참조자]</strong>
              </div>
            </div>
          </div>
        </div>
        <div className={classes['emp-index-default']}>
          <div className={classes['emp-index--ref']}>
            <div
              className={classes['reference-item--emp']}
              onDragOver={handleDragOver}
              onDrop={handleDrop}>
              {referenceEmp.length > 0 ? (
                <div className={classes['approver-item__items']}>
                  {referenceEmp.map((emp, index) => (
                    <span key={index}>
                      <i className="fa-solid fa-user"></i>
                      {emp.name}
                      <button onClick={() => deleteRefHandler('EMP', emp.empNo)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <strong className={classes['emp-item__drag']}>직원을 드래그 해주세요</strong>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalResultRef;
