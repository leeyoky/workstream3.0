import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { isApprovalData, isResignationData } from '../../../../helpers/approval';
import { useDocumentData } from '../../../../hooks/Approval/useDocumentData';
import useApprovalRequest from '../../../../hooks/Approval/useApprovalRequest';

/**
 * 문서회수, 재기안, 시행문 생성
 * @returns
 */
const DocumentActionButtons = () => {
  const { id, recallDocument, changeTempModeHandler, goCreateExecution } = useApprovalRequest();
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const userData = useSelector((state: RootState) => state.auth.userInfo?.empNo);
  const documentData = useDocumentData(documentType, id)?.data;

  /* 문서별 작성자의 no를 가져옴 */
  const regUsrNo =
    documentType === 'APPROVAL_COMMON'
      ? isApprovalData(documentData)
        ? documentData.approval.regUsr
        : documentData?.resignation.regUsr || ''
      : isResignationData(documentData)
      ? documentData.resignation.regUsr
      : '';

  /* 결재 진행 여부 */
  const approverYn =
    documentType === 'APPROVAL_COMMON'
      ? isApprovalData(documentData)
        ? documentData.line.some(approval => approval.approvedYn === 'N')
        : documentData?.line.some(approval => approval.approvedYn === 'N')
      : documentData?.line.some(approval => approval.approvedYn === 'N');

  /* 완료문서 여부 */
  const isApproved = documentData
    ? documentType === 'APPROVAL_COMMON'
      ? isApprovalData(documentData)
        ? documentData.approval.state
        : ''
      : isResignationData(documentData)
      ? documentData.resignation.state
      : ''
    : '';

  const isFinishedDocumnt = isApproved === 'APPROVED' || isApproved === 'REJECTED';

  return (
    <>
      {approverYn && regUsrNo === userData && !isFinishedDocumnt && (
        <button
          className="btn"
          onClick={() => {
            recallDocument(id);
          }}>
          <span>문서회수</span>
          <i className="fa-solid fa-rotate-left"></i>
        </button>
      )}
      {isFinishedDocumnt && regUsrNo === userData && documentType === 'APPROVAL_COMMON' && (
        <button className="btn" onClick={() => changeTempModeHandler('Y')}>
          <span>재기안</span>
          <i className="fa-solid fa-arrow-up-from-bracket"></i>
        </button>
      )}
      {isFinishedDocumnt && !(documentType === 'EXECUTION' || documentType === 'RESIGNATION') && (
        <button className="btn btn-green" onClick={() => goCreateExecution(id)}>
          <span>시행문 생성</span>
          <i className="fa-solid fa-file-export"></i>
        </button>
      )}
    </>
  );
};

export default DocumentActionButtons;
