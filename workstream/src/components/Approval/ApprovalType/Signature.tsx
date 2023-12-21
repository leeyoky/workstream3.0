import { useSelector } from 'react-redux';
import classes from '../../../pages/Approval/Approval.module.css';
import { RootState } from '../../../store';
import { useEffect, useMemo, useState } from 'react';
import { COLUMN_LIMITS } from '../../../constants/constants';
/* 최초 create */
const Signature = () => {
  // Redux 결재자 정보 및 사용자 정보
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  // Memoizaion 최적화
  const memoizedApprovers = useMemo(() => {
    const approvalApprovers = approvers.filter(approver => approver.approvalType === 'APPROVER');
    const agreementApprovers = approvers.filter(approver => approver.approvalType === 'CONSENSUAL');
    return { approvalApprovers, agreementApprovers };
  }, [approvers]);

  const { approvalApprovers, agreementApprovers } = memoizedApprovers;
  const [renderedEmpNm, setRenderedEmpNm] = useState<string | undefined>('');

  useEffect(() => {
    // 최초 렌더링 시에는 값을 비우고, approvalApprovers 또는 agreementApprovers가 변경될 때에만 값을 업데이트
    if (approvalApprovers.length > 0 || agreementApprovers.length > 0) {
      setRenderedEmpNm(`${userInfo?.empNm} ${userInfo?.rankNm || ''}`);
    }
  }, [approvalApprovers, agreementApprovers]);

  // 실제로 표시할 열의 수
  const approvalColumnCount = Math.min(COLUMN_LIMITS.MAX_APPROVAL, approvalApprovers.length + 1);
  const agreementColumnCount = Math.min(COLUMN_LIMITS.MAX_AGREEMENT, agreementApprovers.length);

  // 셀 헤더
  const renderHeader = (content: any, index: number, order: any) => {
    console.log(`Rendering header for index ${index}, order ${order}`);
    return (
      <th className={classes['header-table__approval-th']} key={index}>
        <div>
          <span className={classes['approver-index']}>
            {order !== undefined ? <div>{order + 1}</div> : null}
          </span>
          {content}
        </div>
      </th>
    );
  };

  // 콘텐츠
  const renderContent = () => (
    <td className={classes['approver-content']}>
      <div>
        <span className={classes['approver-index']}></span>
      </div>
    </td>
  );

  return (
    <div className={classes['header__right']}>
      <table className={classes['header-table']}>
        <tbody>
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
                approvalApprovers[index]?.order,
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

          <tr key="header-agreement">
            <th rowSpan={2}>합의</th>
            {Array.from({
              length: Math.min(
                COLUMN_LIMITS.MAX_AGREEMENT,
                Math.max(COLUMN_LIMITS.MIN_AGREEMENT, agreementColumnCount),
              ),
            }).map((_, index) =>
              renderHeader(
                index < agreementApprovers.length
                  ? `${agreementApprovers[index].name} ${agreementApprovers[index].rankName}`
                  : '',
                index + 1,
                agreementApprovers[index]?.order,
              ),
            )}
          </tr>
          <tr key="content-agreement">
            {Array.from({
              length: Math.min(
                COLUMN_LIMITS.MAX_AGREEMENT,
                Math.max(COLUMN_LIMITS.MIN_AGREEMENT, agreementColumnCount),
              ),
            }).map(() => {
              return renderContent();
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Signature;
