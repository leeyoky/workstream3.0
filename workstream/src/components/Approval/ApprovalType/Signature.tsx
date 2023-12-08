import { useSelector } from 'react-redux';
import classes from '../../../pages/Approval/Approval.module.css';
import { RootState } from '../../../store';
import { useEffect, useMemo, useState } from 'react';
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
  const [renderedEmpNm, setRenderedEmpNm] = useState<string | undefined>('');

  useEffect(() => {
    // 최초 렌더링 시에는 값을 비우고, approvalApprovers 또는 agreementApprovers가 변경될 때에만 값을 업데이트
    if (approvalApprovers.length > 0 || agreementApprovers.length > 0) {
      setRenderedEmpNm(userInfo?.empNm || '');
    }
  }, [approvalApprovers, agreementApprovers]);

  const MIN_APPROVAL = 4;
  const MIN_AGREEMENT = 4;
  const MAX_APPROVAL = 6;
  const MAX_AGREEMENT = 7;

  // 실제로 표시할 열의 수
  const approvalColumnCount = Math.min(MAX_APPROVAL, approvalApprovers.length + 1);
  const agreementColumnCount = Math.min(MAX_AGREEMENT, agreementApprovers.length);

  // 셀 헤더 
  const renderHeader = (content: any, index: number) => (
    <th key={index} className={classes['header-table__approval-th']}>
      {content}
    </th>
  );

  // 열의 헤더  
  const renderContent = (label: string, approverIndex: number) => (
    <td className={classes['approver-content']}>
      <div>
      <span className={classes['approver-index']}>
        {approverIndex !== -1 ? (
          <div>{approverIndex + 2}</div>
          ): ''}
      </span>
      <span>
        {label}
      </span>
      </div>
    </td>
  );


  return (
    <div className={classes['header__right']}>
    <table className={classes['header-table']}>
      <tbody>
        <tr key='header-approval'>
          <th rowSpan={2}>결재</th>
          {renderHeader(renderedEmpNm, 0)}
          {Array.from({ length: Math.min(MAX_APPROVAL, Math.max(MIN_APPROVAL, approvalColumnCount)) - 1 }).map((_, index) => (
            renderHeader(index < approvalApprovers.length ? approvalApprovers[index].name : '', index + 1)
          ))}
        </tr>
        <tr key="content-approval">
          {renderContent('', -1)}
          {Array.from({ length: Math.min(MAX_APPROVAL, Math.max(MIN_APPROVAL, approvalColumnCount)) - 1 }).map((_, index) => {
            const approverIndex = index < approvalApprovers.length ? approvers.indexOf(approvalApprovers[index]) : -1;
            return renderContent('', approverIndex);
          })}
        </tr>
        
        <tr key="header-agreement">
          <th rowSpan={2}>합의</th>
          {Array.from({ length: Math.min(MAX_AGREEMENT, Math.max(MIN_AGREEMENT, agreementColumnCount))}).map((_, index) => (
            renderHeader(index < agreementApprovers.length ? agreementApprovers[index].name : '', index + 1)
          ))}
        </tr>
        <tr key="content-agreement">
          {Array.from({ length: Math.min(MAX_AGREEMENT, Math.max(MIN_AGREEMENT, agreementColumnCount)) }).map((_, index) => {
            const approverIndex = index < agreementApprovers.length ? approvers.indexOf(agreementApprovers[index]) : -1;
            return renderContent('', approverIndex);
          })}
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default Signature