import { useSelector } from 'react-redux';
import classes from '../../../pages/Approval/Approval.module.css';
import { RootState } from '../../../store';
import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formatDateMinutes } from '../../../helpers/formatDateTime';
import { selectedActions } from '../../../store/Approval/approval-slice';
import useApprovalRequest from '../../../hooks/Approval/useApprovalRequest';
import { useDocumentData } from '../../../hooks/Approval/useDocumentData';
import { ApprovalData, ResignationData } from '../../../types/Approval/Approaval';
import { APPROVAL_STATUS, COLUMN_LIMITS } from '../../../constants/constants';
const SignatureEdit = () => {
  const [newApprovers, setNewApprovers] = useState<
    {
      index: number;
      empNo: string;
      name: string;
      duty: string;
      rankName: string;
      approvalType: string;
      approvedYn: string;
    }[]
  >([]);

  const { id = '' } = useParams<string>();
  const { approvedYn } = useApprovalRequest();
  const dispatch = useDispatch();
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const getApproverIndex = (approver: any) => approvers.indexOf(approver);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isDetailMode = useSelector((state: RootState) => state.approval.isDetailMode);
  const data = useDocumentData(documentType, id)?.data;
  const isEditMode = useSelector((state: RootState) => state.approval.isEditMode);

  // 타입가드
  const isApprovalData = (data: any): data is ApprovalData => {
    return data && 'approval' in data;
  };

  const isResignationData = (data: any): data is ResignationData => {
    return data && 'resignation' in data;
  };

  useEffect(() => {}, [approvedYn, data]);

  useEffect(() => {
    if (data && data.line) {
      const updatedApprovers = data.line.map(employee => ({
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
  }, [data, data?.line]);

  useEffect(() => {
    dispatch(selectedActions.setApprovers(newApprovers));
  }, [newApprovers]);

  const memoizedApprovers = useMemo(() => {
    const approvalApprovers = approvers.filter(approver => approver.approvalType === 'APPROVER');
    const agreementApprovers = approvers.filter(approver => approver.approvalType === 'CONSENSUAL');

    const specialName =
      documentType === 'APPROVAL_COMMON'
        ? isApprovalData(data)
          ? data.approval.regUsrNm
          : ''
        : isResignationData(data)
        ? data.resignation.regUsrNm
        : '';

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

  const getApprovalResultClass = (approvedYn: string) => {
    switch (approvedYn) {
      case APPROVAL_STATUS.APPROVED:
        return classes['approver-result-blue'];
      case APPROVAL_STATUS.REJECTED:
        return classes['approver-result-red'];
      default:
        return classes['approver-result-gray'];
    }
  };

  const renderContent = (content: any, index: number) => {
    if (isDetailMode && content) {
      const { approvedYn, modDate, approvalType } = content;

      if (index === 0) {
        const specialModDate =
          documentType === 'APPROVAL_COMMON'
            ? isApprovalData(data)
              ? formatDateMinutes(data.approval.regDate as string)
              : ''
            : isResignationData(data)
            ? formatDateMinutes(data.resignation.resignationDate as string)
            : '';

        return (
          <td className={classes['approver-content']}>
            <div className={classes['approver-content-item-container']}>
              <div className={classes['approver-complete-container']}>
                {!isEditMode && (
                  <>
                    <span className={getApprovalResultClass('Y')}>승 인</span>
                    <span className={classes['approver-complete-date']}>{specialModDate}</span>
                  </>
                )}
              </div>
            </div>
          </td>
        );
      }
      const resultText =
        approvalType === 'CONSENSUAL'
          ? approvedYn === 'Y'
            ? '찬 성'
            : approvedYn === 'R'
            ? '반 대'
            : '대 기'
          : approvedYn === 'Y'
          ? '승 인'
          : approvedYn === 'R'
          ? '반 려'
          : '대 기';

      return (
        <td className={classes['approver-content']}>
          <div className={classes['approver-content-item-container']}>
            <div className={classes['approver-complete-container']}>
              {!isEditMode && (
                <span className={getApprovalResultClass(approvedYn)}>{resultText}</span>
              )}
              {(approvedYn === 'Y' || approvedYn === 'R') && (
                <span className={classes['approver-complete-date']}>
                  {formatDateMinutes(modDate)}
                </span>
              )}
            </div>
          </div>
        </td>
      );
    } else {
      return <td className={classes['approver-content']}>{content}</td>;
    }
  };

  const renderHeader = (content: any, index: number, approverIndex: number) => {
    if (isDetailMode && content) {
      const { name } = content;

      if (index === 0) {
        const specialName =
          documentType === 'APPROVAL_COMMON'
            ? isApprovalData(data)
              ? data.approval.regUsrNm
              : ''
            : isResignationData(data)
            ? data.resignation.regUsrNm
            : '';

        return (
          <th className={classes['header-table__approval-th']}>
            <div>
              <span className={classes['approver-index']}>
                {approverIndex !== -1 ? <div>{approverIndex + 2}</div> : <div>1</div>}
              </span>
              {specialName}
            </div>
          </th>
        );
      }
      return (
        <th className={classes['header-table__approval-th']}>
          <div>
            <span className={classes['approver-index']}>
              {approverIndex !== -1 ? <div>{approverIndex + 2}</div> : ''}
            </span>
            {name}
          </div>
        </th>
      );
    } else {
      return (
        <th className={classes['header-table__approval-th']}>
          <div>
            <span>{content}</span>
          </div>
        </th>
      );
    }
  };

  return (
    <div className={classes['header__right']}>
      <table className={classes['header-table']}>
        <tbody>
          <tr>
            <th rowSpan={2}>결재</th>
            {renderHeader(userInfo?.empNm, 0, -1)}
            {Array.from({
              length: Math.min(MAX_APPROVAL, Math.max(MIN_APPROVAL, approvalColumnCount)) - 1,
            }).map((_, index) =>
              renderHeader(
                index < approvalApprovers.length ? approvalApprovers[index] : '',
                index + 1,
                getApproverIndex(approvalApprovers[index]),
              ),
            )}
          </tr>
          <tr>
            {renderContent(userInfo?.empNm, 0)}
            {Array.from({
              length: Math.min(MAX_APPROVAL, Math.max(MIN_APPROVAL, approvalColumnCount)) - 1,
            }).map((_, index) =>
              renderContent(
                index < approvalApprovers.length ? approvalApprovers[index] : null,
                index + 1,
              ),
            )}
          </tr>

          <tr>
            <th rowSpan={2}>합의</th>
            {Array.from({
              length: Math.min(MAX_AGREEMENT, Math.max(MIN_AGREEMENT, agreementColumnCount)),
            }).map((_, index) =>
              renderHeader(
                index < agreementApprovers.length ? agreementApprovers[index] : null,
                index + 1,
                getApproverIndex(agreementApprovers[index]),
              ),
            )}
          </tr>
          <tr>
            {Array.from({
              length: Math.min(MAX_AGREEMENT, Math.max(MIN_AGREEMENT, agreementColumnCount)),
            }).map((_, index) =>
              renderContent(
                index < agreementApprovers.length ? agreementApprovers[index] : null,
                index + 1,
              ),
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SignatureEdit;
