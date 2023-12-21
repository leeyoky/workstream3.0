import React, { useEffect } from 'react';
import ApprovalModalInstruction from '../ApprovalInstruction/ApprovalModalInstruction';

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
  approveDocumentHandler,
  matchingId,
  userLineData,
  updateApprovalHandler,
  handleCloseInstModal,
  handleShowInstModal,
}) => {
  useEffect(() => {
    console.log(isInstModalOpen);
  }, []);

  if (isApprover && !isEdit && approvedYn === 'N') {
    const isNextApprover = !isLastApprover && isPreviousApproved && !isFinishedDocumnt;

    if (isLastApprover && isPreviousApproved && !isFinishedDocumnt) {
      return (
        <>
          <button className="btn btn-blue" onClick={handleShowInstModal}>
            <span>최종결재</span>
          </button>
          {isInstModalOpen && <ApprovalModalInstruction onClose={handleCloseInstModal} />}
        </>
      );
    }

    if (isNextApprover && isPreviousApproved && !isFinishedDocumnt) {
      return (
        <>
          <button className="btn btn-blue" onClick={() => approveDocumentHandler(matchingId, 'Y')}>
            {userLineData?.apprType === 'APPROVER' ? <span>결재</span> : <span>찬성</span>}
          </button>
          <button className="btn btn-red" onClick={() => approveDocumentHandler(matchingId, 'R')}>
            {userLineData?.apprType === 'APPROVER' ? <span>반려</span> : <span>반대</span>}
          </button>
        </>
      );
    }
  }

  if ((isApprover && !isEdit && approvedYn === 'R') || approvedYn === 'Y') {
    if ((!isLastApprover || isPreviousApproved) && !isFinishedDocumnt) {
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
