import { useDispatch } from 'react-redux';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import { selectedActions } from '../../../store/Approval/approval-slice';

/**
 * 참조자/부서 버튼을 클릭하면 나타나는 모달의 header부분
 * @returns
 */
const ApprovalSelectRef = () => {
  const dispatch = useDispatch();
  const removeAllHandler = () => {
    dispatch(selectedActions.removeRef());
  };

  return (
    <div className={classes['card-header']}>
      <p>참조자/부서 선택</p>
      <hr />
      <div className={classes['emp-list__result-select-wrapper__ref']}>
        <div className={classes['control-button-group']}>
          <button className="btn-red btn" onClick={removeAllHandler}>
            전체삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalSelectRef;
