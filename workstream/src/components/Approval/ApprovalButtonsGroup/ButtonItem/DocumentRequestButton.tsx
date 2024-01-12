import useApprovalRequest from '../../../../hooks/Approval/useApprovalRequest';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';

/**
 * post 요청 Buttons
 * @returns
 */
const DocumentRequestButton = () => {
  const { requestApprovalType } = useApprovalRequest();
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  return (
    <>
      {documentType === 'EXECUTION' ? (
        <button
          className="btn btn-secondary"
          onClick={() => requestApprovalType(documentType, 'APPROVED')}>
          <span>작성완료</span>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      ) : (
        <button
          className="btn btn-secondary"
          onClick={() => requestApprovalType(documentType, 'PROCEEDING')}>
          <span>결재요청</span>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      )}
    </>
  );
};

export default DocumentRequestButton;
