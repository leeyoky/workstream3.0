import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import SelectCCButton from '../ButtonItem/SelectCCButton';
import TempSaveButton from '../ButtonItem/TempSaveButton';
import RequestButton from '../ButtonItem/DocumentRequestButton';
import DocumentActionButtons from '../ButtonItem/DocumentActionButtons';
import PdfDownloadButton from '../ButtonItem/PdfDownloadButton';
import SelectApproverButton from '../ButtonItem/SelectApproverButton';
import DeleteDocumentButton from '../ButtonItem/DeleteDocumentButton';

/**
 * 기본 품의서 버튼 렌더링 컴포넌트
 * @returns
 */
const ApprovalCommonButtons = () => {
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
          <SelectCCButton />
          <TempSaveButton />
          <RequestButton />
        </>
      )}
      {isEdit && (
        <>
          <SelectApproverButton />
          <SelectCCButton />
          <TempSaveButton />
          <RequestButton />
          <DeleteDocumentButton />
        </>
      )}
      {isDetail && (
        <>
          <SelectApproverButton title="결재자편집" />
          {/* <SelectCCButton /> */}
          <DocumentActionButtons />
          <PdfDownloadButton />
        </>
      )}
    </div>
  );
};

export default ApprovalCommonButtons;
