import { useEffect, useMemo, useState } from 'react';
import { COLUMN_LIMITS } from '../../../constants/constants';
import classes from '../../../pages/Approval/Approval.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

/**
 * 결재 문서의 우측 상단에 위치한 결재 컴포넌트 중
 * 결재라인 컴포넌트
 * @returns
 */
const SignatureApprovalSection = () => {
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [renderedEmpNm, setRenderedEmpNm] = useState<string | undefined>('');

  // Memoizaion
  const memoizedApprovers = useMemo(() => {
    const approvalApprovers = approvers.filter(approver => approver.approvalType === 'APPROVER');
    return { approvalApprovers };
  }, [approvers]);

  const { approvalApprovers } = memoizedApprovers;

  useEffect(() => {
    // 최초 렌더링 시에는 값을 비우고, approvalApprovers 또는 agreementApprovers가 변경될 때에만 값을 업데이트
    if (approvalApprovers.length > 0) {
      setRenderedEmpNm(`${userInfo?.empNm} ${userInfo?.rankNm || ''}`);
    }
  }, [approvalApprovers]);

  const renderHeader = (content: any, index: number, order: any) => {
    return (
      <th className={classes['header-table__approval-th']} key={index}>
        <div>
          <span className={classes['approver-index']}>
            {order !== undefined && approvers.length > 0 ? <div>{order + 1}</div> : null}
          </span>
          {content}
        </div>
      </th>
    );
  };

  const renderContent = () => (
    <td className={classes['approver-content']}>
      <div>
        <span className={classes['approver-index']}></span>
      </div>
    </td>
  );

  const approvalColumnCount = Math.min(COLUMN_LIMITS.MAX_APPROVAL, approvers.length + 1);

  return (
    <>
      <tr key="header-approval">
        <th rowSpan={2}>결재</th>
        {renderHeader(renderedEmpNm, 0, 0)}
        {Array.from({
          length:
            Math.min(
              COLUMN_LIMITS.MAX_APPROVAL,
              Math.max(COLUMN_LIMITS.MIN_APPROVAL, approvalColumnCount),
            ) - 1,
        }).map((_, index) =>
          renderHeader(
            index < approvalApprovers.length
              ? `${approvalApprovers[index].name} ${approvalApprovers[index].rankName}`
              : '',
            index + 1,
            approvers[index]?.order,
          ),
        )}
      </tr>
      <tr key="content-approval">
        {renderContent()}
        {Array.from({
          length:
            Math.min(
              COLUMN_LIMITS.MAX_APPROVAL,
              Math.max(COLUMN_LIMITS.MIN_APPROVAL, approvalColumnCount),
            ) - 1,
        }).map(() => {
          return renderContent();
        })}
      </tr>
    </>
  );
};

export default SignatureApprovalSection;
