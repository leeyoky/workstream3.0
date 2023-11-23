import classes from '../../../pages/Approval/ApprovalSelect.module.css';

const ApprovalResultRef = () => {
  return (
    <div className={classes['emp-list__result']}>
      <div className={classes['emp-item-wrapper']}>
        <div className ={classes['emp-index-default']}> 


        </div>
      </div>
      <div className={classes['emp-index__drag__wrapper']}>
        <span className={classes['emp-item__drag']}>직원을 드래그해주세요</span>
      </div>
    </div>
  )
}

export default ApprovalResultRef