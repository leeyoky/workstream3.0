import classes from '../../../pages/Approval/ApprovalSelect.module.css';

const ApprovalSelectRef = () => {
  
  const removeAllHandler = () => {
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
  )
}

export default ApprovalSelectRef