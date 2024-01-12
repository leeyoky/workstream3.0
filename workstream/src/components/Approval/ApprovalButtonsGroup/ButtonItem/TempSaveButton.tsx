import useApprovalRequest from '../../../../hooks/Approval/useApprovalRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

/**
 * 임시저장 버튼
 * @returns
 */
const TempSaveButton = () => {
  const { requestApprovalType } = useApprovalRequest();
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  return (
    <button className="btn" onClick={() => requestApprovalType(documentType, 'TEMP')}>
      <span>임시저장</span>
      <i className="fa-solid fa-floppy-disk"></i>
    </button>
  );
};

export default TempSaveButton;
