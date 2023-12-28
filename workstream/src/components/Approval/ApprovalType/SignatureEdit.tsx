import { useSelector } from 'react-redux';
import classes from '../../../pages/Approval/Approval.module.css';
import { RootState } from '../../../store';
import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formatDateMinutes } from '../../../helpers/formatDateTime';
import { selectedActions } from '../../../store/Approval/approval-slice';
/* import useApprovalRequest from '../../../hooks/Approval/useApprovalRequest'; */
import { useDocumentData } from '../../../hooks/Approval/useDocumentData';
import { APPROVAL_STATUS, COLUMN_LIMITS } from '../../../constants/constants';
import { getUserInfo } from '../../../api/axios';
import { isApprovalData, isResignationData } from '../../../helpers/approval';
const SignatureEdit = () => {
  const [newApprovers, setNewApprovers] = useState<
    {
      index: number;
      empNo: string;
      name: string;
      duty: string;
      rankName: string;
      approvalType: string;
      modDate?: string | undefined;
      approvedYn?: string | undefined;
    }[]
  >([]);
  const [regUserinfo, setRegUserInfo] = useState();
  const { id = '' } = useParams<string>();
  const dispatch = useDispatch();
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const agreementType = useSelector((state: RootState) => state.approval.agreementType);
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const isDetailMode = useSelector((state: RootState) => state.approval.isDetailMode);
  const isEditMode = useSelector((state: RootState) => state.approval.isEditMode);
  const isRevise = useSelector((state: RootState) => state.approval.isReviseMode);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const data = useDocumentData(documentType, id)?.data;

  useEffect(() => {
    if (agreementType === 'parallel') {
      const modifiedApprovers = [];
      let consecutiveConsensualCount = 0;

      for (let i = 0; i < approvers.length; i++) {
        const currentApprover = approvers[i];
        const previousApprover = i > 0 ? approvers[i - 1] : null;

        if (
          currentApprover &&
          previousApprover &&
          currentApprover.approvalType === 'CONSENSUAL' &&
          previousApprover.approvalType === 'CONSENSUAL'
        ) {
          consecutiveConsensualCount++;
        } else {
          consecutiveConsensualCount = 0; // 연속이 끊기면 초기화
        }

        modifiedApprovers.push({
          ...currentApprover,
          index: i - consecutiveConsensualCount, // 인덱스 계산 수정
        });
      }
      setNewApprovers(modifiedApprovers);
    }
  }, [agreementType]);

  /**
   * @description regUser의 Id를 전달하여 regUser의 직급을 가져옴
   */
  const fetchUserInfo = async () => {
    try {
      let userId;
      if (documentType === 'APPROVAL_COMMON' && isApprovalData(data)) {
        userId = data.approval.regUsr;
      } else if (documentType === 'SOMETHING_ELSE' && isResignationData(data)) {
        userId = data.resignation.regUsr;
      }

      if (userId) {
        const response = await getUserInfo(userId);
        const userData = response.data.content[0].rankNm;
        setRegUserInfo(userData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [documentType, data]);

  /* api요청으로 받은 데이터 store에 저장 */
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
        order: employee.order,
      }));
      setNewApprovers(updatedApprovers);
    }
  }, [data, data?.line, agreementType]);

  useEffect(() => {
    dispatch(selectedActions.setApprovers(newApprovers));
  }, [newApprovers]);

  const memoizedApprovers = useMemo(() => {
    const approvalApprovers = approvers.filter(approver => approver.approvalType === 'APPROVER');
    const agreementApprovers = approvers.filter(approver => approver.approvalType === 'CONSENSUAL');

    const specialName =
      documentType === 'APPROVAL_COMMON'
        ? isApprovalData(data)
          ? `${data.approval.regUsrNm} ${regUserinfo || ''}`
          : ''
        : isResignationData(data)
        ? `${data.resignation.regUsrNm} ${regUserinfo || ''}`
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
                    <span className={getApprovalResultClass('Y')}>결 재</span>
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
            ? '합 의'
            : approvedYn === 'R'
            ? '반 대'
            : '대 기'
          : approvedYn === 'Y'
          ? '결 재'
          : approvedYn === 'R'
          ? '반 려'
          : '대 기';

      const documentState =
        documentType === 'APPROVAL_COMMON'
          ? isApprovalData(data)
            ? `${data.approval.state}`
            : ''
          : isResignationData(data)
          ? `${data.resignation.state}`
          : '';

      /* 반려상태인 경우 대기 중인 뒷 결재자들의 상태를 표시하지 않음 */
      const shouldRenderResultText =
        documentState !== 'REJECTED' || (documentState === 'REJECTED' && resultText !== '대 기');

      return (
        <td className={classes['approver-content']}>
          <div className={classes['approver-content-item-container']}>
            <div className={classes['approver-complete-container']}>
              {!isEditMode && !isRevise && shouldRenderResultText && (
                /* documentState ===  */
                <span className={getApprovalResultClass(approvedYn)}>{resultText}</span>
              )}
              {(approvedYn === 'Y' || approvedYn === 'R') && !isRevise && (
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

  const renderHeader = (content: any, index: number, order: any) => {
    if (isDetailMode && content) {
      const { name, rankName } = content;

      if (index === 0) {
        const specialName =
          documentType === 'APPROVAL_COMMON'
            ? isApprovalData(data)
              ? `${data.approval.regUsrNm} ${regUserinfo || ''}`
              : ''
            : isResignationData(data)
            ? `${data.resignation.regUsrNm} ${regUserinfo || ''}`
            : '';

        return (
          <th className={classes['header-table__approval-th']}>
            <div>
              <span className={classes['approver-index']}>
                <div>{1}</div>
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
              {order !== undefined ? <div>{order + 1}</div> : null}
            </span>
            {name} {rankName}
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
            <th rowSpan={2}>승 인</th>
            {renderHeader(userInfo?.empNm, 0, -1)}
            {Array.from({
              length: Math.min(MAX_APPROVAL, Math.max(MIN_APPROVAL, approvalColumnCount)) - 1,
            }).map((_, index) =>
              renderHeader(
                index < approvalApprovers.length ? approvalApprovers[index] : '',
                index + 1,
                approvalApprovers[index]?.order,
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
                agreementApprovers[index]?.order,
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
