import React, { useEffect } from 'react';
import ApprovalModalInstruction from '../ApprovalInstruction/ApprovalModalInstruction';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

type ApprovalButtonProps = {
  isApprover: boolean;
  isEdit: boolean;
  approvedYn: string | undefined;
  isLastApprover: boolean;
  isPreviousApproved: boolean;
  isFinishedDocumnt: boolean;
  handleShowInstModal: () => void;
  handleCloseInstModal: () => void;
  isInstModalOpen: boolean;
  approveDocumentHandler: (matchingId: number, action: 'Y' | 'R') => void;
  matchingId: number;
  userLineData: any; // Update the type accordingly
  updateApprovalHandler: (id: number) => void;
};

const ApprovalButtons: React.FC<ApprovalButtonProps> = ({
  isApprover,
  isEdit,
  approvedYn,
  isLastApprover,
  isPreviousApproved,
  isFinishedDocumnt,
  isInstModalOpen,
  userLineData,
  updateApprovalHandler,
  handleCloseInstModal,
  handleShowInstModal,
}) => {
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  useEffect(() => {}, [isEdit]);

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

    if (isNextApprover && isPreviousApproved && !isFinishedDocumnt) {
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
    if (
      (!isLastApprover || isPreviousApproved) &&
      !isFinishedDocumnt &&
      !(documentType === 'EXECUTION')
    ) {
      return (
        <button
          className="btn btn-red"
          onClick={() => userLineData && updateApprovalHandler(userLineData.id)}>
          <span>{userLineData?.apprType === 'APPROVER' ? '결재 취소' : '합의 취소'}</span>
        </button>
      );
    }
  }

  return null;
};

export default ApprovalButtons;
