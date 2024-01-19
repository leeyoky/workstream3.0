import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import useApprovalRequest from '../../../hooks/Approval/useApprovalRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import React, { useEffect } from 'react';
import { useDocumentData } from '../../../hooks/Approval/useDocumentData';
import { isApprovalData, isResignationData } from '../../../helpers/approval';
import ApprovalButtons from './ButtonItem/ApprovalActionButtons';
import useApprovalAction from '../../../hooks/Approval/useApprovalAction';
import ApprovalCommonButtons from './ApprovalDocuments/ApprovalCommonButtons';
import ResignationButtons from './ApprovalDocuments/ResignationButtons';
import ExecutionButtons from './ApprovalDocuments/ExecutionButtons';
import CommentButton from './ButtonItem/CommentButton';

type ApprovalEditButtonsProps = {
  temp: boolean;
  className?: string;
  type: string;
  targetRef?: React.RefObject<any>;
};

/**
 * 전자결재 문서 오른쪽 상단에 위치한 버튼을
 * 문서 타입에 따라 관리하는 컴포넌트
 * @param param0
 * @returns
 */

const ApprovalEditButtons: React.FC<ApprovalEditButtonsProps> = ({ className, type }) => {
  const { id, goBackPage } = useApprovalRequest();
  const {
    isInstModalOpen,
    approvedYn,
    setApprovedYn,
    handleShowInstModal,
    handleCloseInstModal,
    approveDocumentHandler,
    updateApprovalHandler,
  } = useApprovalAction();

  const isEdit = useSelector((state: RootState) => state.approval.isEditMode);
  const userData = useSelector((state: RootState) => state.auth.userInfo?.empNo);
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const documentData = useDocumentData(documentType, id)?.data;

  const buttonsLocation = type === 'bottom' ? className : '';

  useEffect(() => {
    setApprovedYn(prev => {
      return prev; // 또는 새로운 값으로 업데이트
    });
  }, [approvedYn, setApprovedYn, documentData]);

  const isApproved = documentData
    ? documentType === 'APPROVAL_COMMON'
      ? isApprovalData(documentData)
        ? documentData.approval.state
        : ''
      : isResignationData(documentData)
      ? documentData.resignation.state
      : ''
    : '';

  const renderApprovalButtons = () => {
    if (!documentData?.line) {
      return null;
    }
    const isFinishedDocumnt = isApproved === 'APPROVED' || isApproved === 'REJECTED';
    const matchingId =
      documentData?.line?.find(approval => approval.approver === userData)?.id || 0;
    const isApprover = documentData?.line.some(approval => approval.approvedYn === 'N') ?? false;
    const userLineData = documentData?.line.find(approval => approval.approver === userData);
    const userOrder = documentData?.line.find(a => a.approver === userData)?.order!;
    const nextApprover = documentData?.line.find(approval => approval.order === userOrder + 1);
    const previousApprover = documentData?.line.find(approval => approval.order === userOrder - 1);
    const isPreviousApproved = !(previousApprover?.approvedYn === 'N');

    const approvedYn = userLineData?.approvedYn;
    const isLastApprover = !nextApprover;

    return (
      <ApprovalButtons
        isApprover={isApprover}
        isEdit={isEdit}
        approvedYn={approvedYn}
        isLastApprover={isLastApprover}
        isPreviousApproved={isPreviousApproved}
        isFinishedDocumnt={isFinishedDocumnt}
        handleShowInstModal={handleShowInstModal}
        isInstModalOpen={isInstModalOpen}
        approveDocumentHandler={approveDocumentHandler}
        handleCloseInstModal={handleCloseInstModal}
        matchingId={matchingId}
        userLineData={userLineData}
        updateApprovalHandler={updateApprovalHandler}
      />
    );
  };

  return (
    <div className={`${classes['btn-group']} ${buttonsLocation}`}>
      <CommentButton type={type} />
      {!isEdit && renderApprovalButtons()}
      {documentType === 'APPROVAL_COMMON' && <ApprovalCommonButtons />}
      {documentType === 'RESIGNATION' && <ResignationButtons />}
      {documentType === 'EXECUTION' && <ExecutionButtons />}
      <button className="btn btn-border" onClick={goBackPage}>
        <span>문서함이동</span>
      </button>
    </div>
  );
};

export default ApprovalEditButtons;
