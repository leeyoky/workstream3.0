import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import SelectApproverButton from '../ButtonItem/SelectApproverButton';
import TempSaveButton from '../ButtonItem/TempSaveButton';
import DocumentRequestButton from '../ButtonItem/DocumentRequestButton';
import DeleteDocumentButton from '../ButtonItem/DeleteDocumentButton';
import DocumentActionButtons from '../ButtonItem/DocumentActionButtons';
import PdfDownloadButton from '../ButtonItem/PdfDownloadButton';

const ResignationButtons = () => {
  const isEditMode = useSelector((state: RootState) => state.approval.isEditMode);
  const isDetailMode = useSelector((state: RootState) => state.approval.isDetailMode);
  const isCreate = isEditMode === true && isDetailMode === false;
  const isEdit = isEditMode === true && isDetailMode === true;
  const isDetail = isEditMode === false && isDetailMode === true;
  return (
    <div>
      {isCreate && (
        <>
          <SelectApproverButton />
          <TempSaveButton />
          <DocumentRequestButton />
        </>
      )}
      {isEdit && (
        <>
          <SelectApproverButton />
          <TempSaveButton />
          <DocumentRequestButton />
          <DeleteDocumentButton />
        </>
      )}
      {isDetail && (
        <>
          <DocumentActionButtons />
          <PdfDownloadButton />
        </>
      )}
    </div>
  );
};

export default ResignationButtons;
