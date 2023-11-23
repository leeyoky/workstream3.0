import { useSelector } from 'react-redux';
import classes from '../../../pages/Approval/Approval.module.css';
import { RootState } from '../../../store';
import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formatDateOnly } from '../../../helpers/formatDateTime';
import { selectedActions } from '../../../store/Approval/approval-slice';
import useApprovalRequest from '../../../hooks/Approval/useApprovalRequest';
import { useDocumentData } from '../../../hooks/Approval/useDocumentData';
import { ApprovalData, ResinationData } from '../../../types/Approval/Approaval';
import { APPROVAL_STATUS, COLUMN_LIMITS } from '../../../constants/constants';
const SignatureEdit = () => {
  const [newApprovers, setNewApprovers] = useState<{
    index: number;
    empNo: string;
    name: string;
    duty: string;
    rankName: string;
    approvalType: string;
    approvedYn: string;
  }[]>([]);
  
  const { id = '' } = useParams<string>();
  const { approvedYn } = useApprovalRequest();
  const dispatch = useDispatch();
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isDetailMode = useSelector((state: RootState) => state.approval.isDetailMode);
  const data = useDocumentData(documentType, id)?.data;

  // 타입가드
  const isApprovalData = (data: any): data is ApprovalData => {
    return data && 'approval' in data;
  };

  const isResinationData = (data: any): data is ResinationData => {
    return data && 'resignation' in data;
  };

  useEffect(()=> {
  },[approvedYn, data]);
  
  useEffect((
    ) => {
    console.log('useDocumentData Hook', data);
    if (data && data.line) {
      const updatedApprovers = data.line.map((employee) => ({
        index: employee.order,
        empNo: employee.approver,
        name: employee.approverNm,
        duty: employee.officeDutyNm,
        modDate: employee.modDate,
        rankName: employee.rankNm,
        approvalType: employee.apprType,
        approvedYn: employee.approvedYn,
      }));
      setNewApprovers(updatedApprovers);
    }
  }, [data, data?.line ]);
  
  useEffect(()=> {
    dispatch(selectedActions.setApprovers(newApprovers));
  },[newApprovers])
  
  const memoizedApprovers = useMemo(() => {
    const approvalApprovers = approvers.filter((approver) => approver.approvalType === 'APPROVER');
    const agreementApprovers = approvers.filter((approver) => approver.approvalType === 'CONSENSUAL');
    
    const specialName = documentType === 'APPROVAL_COMMON'
      ? isApprovalData(data) ? data.approval.regUsrNm : ''
      : isResinationData(data) ? data.resignation.regUsrNm : '';
    
    return { approvalApprovers, agreementApprovers, specialName };
  }, [approvers]);

  const { approvalApprovers, agreementApprovers } = memoizedApprovers;

  const MIN_APPROVAL = COLUMN_LIMITS.MIN_APPROVAL;
  const MAX_APPROVAL = COLUMN_LIMITS.MAX_APPROVAL;
  const MIN_AGREEMENT = COLUMN_LIMITS.MIN_AGREEMENT;
  const MAX_AGREEMENT = COLUMN_LIMITS.MAX_AGREEMENT;

  // 실제로 표시할 열의 수
  const approvalColumnCount = Math.min(MAX_APPROVAL, approvalApprovers.length + 1);
  const agreementColumnCount = Math.min(MAX_AGREEMENT, agreementApprovers.length);

  const getApprovalResultClass = (approvedYn:string) => {

  switch (approvedYn) {
      case APPROVAL_STATUS.APPROVED:
        return classes['approver-result-blue'];
      case APPROVAL_STATUS.REJECTED:
        return classes['approver-result-red'];
      default:
        return classes['approver-result-gray'];
    }
  };

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

  const renderContent = (content: any, index: number) => {
    if (isDetailMode && content) {
      const { name, approvedYn, modDate, approvalType } = content;
  
      if (index === 0) {
        const specialName = documentType === 'APPROVAL_COMMON' ? 
          isApprovalData(data) ? data.approval.regUsrNm : '' : 
          isResinationData(data) ? data.resignation.regUsrNm : '';
        const specialModDate = documentType === 'APPROVAL_COMMON' ? 
          isApprovalData(data) ? formatDateOnly(data.approval.regDate as string) : '' : 
          isResinationData(data) ? formatDateOnly(data.resignation.resignationDate as string) : '';
  
        return (
          <td className={classes['approver-content']} key={index}>
            <div className={classes['approver-content-item-container']}>
              <div className={classes['approver-complete-container']}>
                <span>{specialName}</span>
                <span className={getApprovalResultClass('Y')}>
                  승 인
                </span>
                <span className={classes['approver-complete-date']}>
                  {specialModDate}
                </span>
              </div>
            </div>
          </td>
        );
      }
      const resultText = approvalType === 'CONSENSUAL'
      ? (approvedYn === 'Y' ? '찬 성' : approvedYn === 'R' ? '반 대' : '대 기')
      : (approvedYn === 'Y' ? '승 인' : approvedYn === 'R' ? '반 려' : '대 기');
  
      return (
        <td className={classes['approver-content']} key={index}>
          <div className={classes['approver-content-item-container']}>
            <div className={classes['approver-complete-container']}>
              <span>{name}</span>
              <span className={getApprovalResultClass(approvedYn)}>
                {resultText}
              </span>
              {(approvedYn === 'Y' || approvedYn === 'R') && (
                <span className={classes['approver-complete-date']}>
                  {formatDateOnly(modDate)}
                </span>
              )}
            </div>
          </div>
        </td>
      );
    } else {
      return (
        <td className={classes['approver-content']} key={index}>
          { content }
        </td>
      );
    }
  };

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
            renderContent(index < approvalApprovers.length ? approvalApprovers[index] : null, index + 1)
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
            renderContent(index < agreementApprovers.length ? agreementApprovers[index] : null, index + 1)
          ))}
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default SignatureEdit