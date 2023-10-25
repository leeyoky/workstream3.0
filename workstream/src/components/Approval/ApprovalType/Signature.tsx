import { useSelector } from 'react-redux';
import classes from '../../../pages/Approval/Approval.module.css';
import { RootState } from '../../../store';
import { useEffect } from 'react';

const Signature = () => {

  const approvers = useSelector((state: RootState) => state.approval.approvers);

  useEffect(() =>{
    console.log('approvers:', approvers);
  }, [approvers]);

  const approvalApprovers = approvers.filter((approver) => approver.approvalType === 'approve');
  const agreementApprovers = approvers.filter((approver) => approver.approvalType === 'agree');

  return (
    <div className={classes['header__right']}>
    <table className={classes['header-table']}>
      <tbody>
        <tr>
          <th rowSpan={4} style={{ width: '30px' }}>결재</th>
          <th className={classes['header-table__approval-th']}>결재</th>
          <th className={classes['header-table__approval-th']}>결재</th>
          <th className={classes['header-table__approval-th']}>결재</th>
          <th className={classes['header-table__approval-th']}>결재</th>
        </tr>
        <tr>
        {
          Array.from({ length: 4 }).map((_, index) => (
            <td className={classes['approver-content']} key={index}>
              {index < approvalApprovers.length ? approvalApprovers[index].name : ''}
            </td>
          ))
        }
        </tr>
      <tr>
        <th className={classes['header-table__approval-th']}>합의</th>
        <th className={classes['header-table__approval-th']}>합의</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        {Array.from({ length: 4 }).map((_, index) => (
          <td className={classes['agreement-content']} key={index}>
            {index < agreementApprovers.length ? agreementApprovers[index].name : ''}
          </td>
        ))}
      </tr>
      </tbody>
    </table>
  </div>
  )
}

export default Signature