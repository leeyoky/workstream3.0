import { useSelector } from 'react-redux';
import classes from '../../../pages/Approval/Approval.module.css';
import { RootState } from '../../../store';
import { useMemo } from 'react';
/* 최초 create */
const Signature = () => {
  // Redux 결재자 정보 및 사용자 정보
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  // Memoizaion 최적화
  const memoizedApprovers = useMemo(() => {
    const approvalApprovers = approvers.filter((approver) => approver.approvalType === 'APPROVER');
    const agreementApprovers = approvers.filter((approver) => approver.approvalType === 'CONSENSUAL');
    return { approvalApprovers, agreementApprovers };
  }, [approvers]);

  const { approvalApprovers, agreementApprovers } = memoizedApprovers;

  const MIN_APPROVAL = 4;
  const MIN_AGREEMENT = 4;
  const MAX_APPROVAL = 6;
  const MAX_AGREEMENT = 7;

  // 실제로 표시할 열의 수
  const approvalColumnCount = Math.min(MAX_APPROVAL, approvalApprovers.length + 1);
  const agreementColumnCount = Math.min(MAX_AGREEMENT, agreementApprovers.length);

  // 열의 헤더
  const renderHeader = (label: string, approverIndex: number) => (
    <th className={classes['header-table__approval-th']}>
      <span className={classes['approver-index']}>
        {approverIndex !== -1 ? (
          <div>{approverIndex + 2}</div>
          ): ''}
      </span>
        {label}
    </th>
  );
  // 셀 헤더
  const renderContent = (content: any, index: number) => (
    <td key={index} className={classes['approver-content']}>
      {content}
    </td>
  );

  return (
    <div className={classes['header__right']}>
    <table className={classes['header-table']}>
      <tbody>
        <tr>
          {renderHeader('결재', -1)}
          {Array.from({ length: Math.min(MAX_APPROVAL, Math.max(MIN_APPROVAL, approvalColumnCount)) - 1 }).map((_, index) => {
            const approverIndex = index < approvalApprovers.length ? approvers.indexOf(approvalApprovers[index]) : -1;
            return renderHeader('결재', approverIndex);
          })}
        </tr>
        <tr>
          {renderContent(userInfo?.empNm, 0)}
          {Array.from({ length: Math.min(MAX_APPROVAL, Math.max(MIN_APPROVAL, approvalColumnCount)) - 1 }).map((_, index) => (
            renderContent(index < approvalApprovers.length ? approvalApprovers[index].name : '', index + 1)
          ))}
        </tr>
        
        <tr>
          {Array.from({ length: Math.min(MAX_AGREEMENT, Math.max(MIN_AGREEMENT, agreementColumnCount)) }).map((_, index) => {
            const approverIndex = index < agreementApprovers.length ? approvers.indexOf(agreementApprovers[index]) : -1;
            return renderHeader('합의', approverIndex);
          })}
        </tr>
        <tr>
          {Array.from({ length: Math.min(MAX_AGREEMENT, Math.max(MIN_AGREEMENT, agreementColumnCount))}).map((_, index) => (
            renderContent(index < agreementApprovers.length ? agreementApprovers[index].name : '', index + 1)
          ))}
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default Signature