import classes from '../../pages/Approval/ApprovalSelect.module.css';

const ApprovalAgreement = () => {
  return (
    <div className={classes['emp-list__agreement']}>
    <div className={classes['emp-item-wrapper']}>
      <p>합의</p>
      <div className={classes['emp-item']}>
        <i className="fa-solid fa-user"></i>
      </div>
    </div>
    <div className={classes['emp-item-wrapper']}>
      <p>합의</p>
      <div className={classes['emp-item']}>
        <i className="fa-solid fa-user"></i>
      </div>
    </div>
  </div>
  )
}

export default ApprovalAgreement