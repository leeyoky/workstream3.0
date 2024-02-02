import React from 'react';
import ApprovalModalInstruction from '../../ApprovalModals/ApprovalModalInstruction';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

type ApprovalActionButtonsProps = {
  isApprover: boolean;
  isEdit: boolean;
  approvedYn: string | undefined;
  isLastApprover: boolean;
  isPreviousApproved: boolean;
  isFinishedDocumnt: boolean;
  isOverride: boolean;
  handleShowInstModal: () => void;
  handleCloseInstModal: () => void;
  isInstModalOpen: boolean;
  approveDocumentHandler: (matchingId: number, action: 'Y' | 'R') => void;
  matchingId: number;
  userLineData: any; // Update the type accordingly
  updateApprovalHandler: (id: number, result: 'N') => void;
};

/**
 * 결재 요청과 관련 된 버튼
 * @param param0
 * @returns
 */
const ApprovalActionButtons: React.FC<ApprovalActionButtonsProps> = ({
  isApprover,
  isEdit,
  approvedYn,
  isLastApprover,
  isPreviousApproved,
  isFinishedDocumnt,
  isInstModalOpen,
  isOverride,
  userLineData,
  updateApprovalHandler,
  handleCloseInstModal,
  handleShowInstModal,
}) => {
  const documentType = useSelector((state: RootState) => state.approval.documentType);

  if (isApprover && !isEdit && approvedYn === 'N') {
    const isNextApprover = !isLastApprover && isPreviousApproved && !isFinishedDocumnt;

    if (isLastApprover && isPreviousApproved && !isFinishedDocumnt) {
      return (
        <>
          <button className="btn btn-blue" onClick={handleShowInstModal}>
            <span>최종결재</span>
          </button>
          {isInstModalOpen && (
            <ApprovalModalInstruction
              onClose={handleCloseInstModal}
              isLastApprover={isLastApprover}
            />
          )}
        </>
      );
    }

    if ((isNextApprover && isPreviousApproved && !isFinishedDocumnt) || isOverride) {
      return (
        <>
          <button className="btn btn-blue" onClick={handleShowInstModal}>
            {userLineData?.apprType === 'APPROVER' ? <span>결재</span> : <span>찬성</span>}
          </button>
          <button className="btn btn-red" onClick={handleShowInstModal}>
            {userLineData?.apprType === 'APPROVER' ? <span>반려</span> : <span>반대</span>}
          </button>
          {isInstModalOpen && (
            <ApprovalModalInstruction
              onClose={handleCloseInstModal}
              isLastApprover={isLastApprover}
            />
          )}
        </>
      );
    }
  }

  if ((isApprover && !isEdit && approvedYn === 'R') || approvedYn === 'Y') {
    if ((!isLastApprover || isPreviousApproved) && !(documentType === 'EXECUTION')) {
      return (
        <button
          className="btn btn-red"
          onClick={() => userLineData && updateApprovalHandler(userLineData.id, 'N')}>
          <span>{userLineData?.apprType === 'APPROVER' ? '결재 취소' : '합의 취소'}</span>
        </button>
      );
    }
  }

  return null;
};

export default ApprovalActionButtons;
