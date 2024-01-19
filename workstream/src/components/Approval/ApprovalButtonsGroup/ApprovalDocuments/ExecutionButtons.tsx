import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import DocumentRequestButton from '../ButtonItem/DocumentRequestButton';
import PdfDownloadButton from '../ButtonItem/PdfDownloadButton';

const ExecutionButtons = () => {
  const isEditMode = useSelector((state: RootState) => state.approval.isEditMode);
  const isDetailMode = useSelector((state: RootState) => state.approval.isDetailMode);
  // 시행문만 isCreate 예외
  const isCreate = isEditMode === false && isDetailMode === false;
  const isDetail = isEditMode === false && isDetailMode === true;
  return (
    <div>
      {isCreate && (
        <>
          <DocumentRequestButton />
        </>
      )}
      {isDetail && (
        <>
          <PdfDownloadButton />
        </>
      )}
    </div>
  );
};

export default ExecutionButtons;
