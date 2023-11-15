import classes from '../../pages/Approval/Approval.module.css';

const ApprovalReference = () => {
  return (
    <table className={classes['reference-table']}>
      <th className={classes['reference-table-th']}>
        <div>
          참조자/부서
        </div>
      </th>
      <td>
        <input type="text" />
      </td>
    </table>
  )
}

export default ApprovalReference