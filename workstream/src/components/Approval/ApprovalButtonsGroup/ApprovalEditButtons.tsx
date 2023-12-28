import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import ApprovalModalEmpEdit from '../ApprovalLine/ApprovalModalEmpEdit';
import useApprovalRequest from '../../../hooks/Approval/useApprovalRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import React, { useEffect, useMemo } from 'react';
import { useDocumentData } from '../../../hooks/Approval/useDocumentData';
import { isApprovalData, isResignationData } from '../../../helpers/approval';
import ApprovalButtons from './ApprovalButtons';
import useApprovalAction from '../../../hooks/Approval/useApprovalAction';
import usePdfDownload from '../../../hooks/Approval/usePdfDownload';

type ApprovalEditButtonsProps = {
  temp: boolean;
  className?: string;
  type: string;
  targetRef?: React.RefObject<any>;
};
const ApprovalEditButtons: React.FC<ApprovalEditButtonsProps> = ({ className, temp, type }) => {
  const {
    id,
    isModalOpen,
    isRefModalOpen,

    handleShowModal,
    handleShowRefModal,
    handleCloseModal,
    handleCloseRefModal,
    goBackPage,
    deleteDocumentHandler,
    changeTempModeHandler,
    requestApprovalType,
    requestTempDocument,
    recallDocument,
  } = useApprovalRequest();
  const { pdfDownloadHandler } = usePdfDownload();
  const {
    isInstModalOpen,
    approvedYn,
    setApprovedYn,
    handleShowInstModal,
    handleCloseInstModal,
    approveDocumentHandler,
    updateApprovalHandler,
  } = useApprovalAction();

  const isDetail = useSelector((state: RootState) => state.approval.isDetailMode);
  const isEdit = useSelector((state: RootState) => state.approval.isEditMode);
  const isRevise = useSelector((state: RootState) => state.approval.isReviseMode);
  const selectMenu = useSelector((state: RootState) => state.ui.selectMenu);
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

  const memoizedValues = useMemo(
    () => ({ isDetail, selectMenu, userData, approvedYn }),
    [isDetail, selectMenu, userData, approvedYn],
  );

  /* 문서별 작성자의 no를 가져옴 */
  const regUsrNo =
    documentType === 'APPROVAL_COMMON'
      ? isApprovalData(documentData)
        ? documentData.approval.regUsr
        : documentData?.resignation.regUsr || ''
      : isResignationData(documentData)
      ? documentData.resignation.regUsr
      : '';

  /* 버튼을 누르면 의견 화면으로 스크롤 해줌  */
  const goComment = () => {
    const targetElement = document.getElementById('approval-comment');
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const isFinishedDocumnt = isApproved === 'APPROVED' || isApproved === 'REJECTED';
  const matchingId = documentData?.line?.find(approval => approval.approver === userData)?.id || 0;
  const isApprover = documentData?.line.some(approval => approval.approvedYn === 'N') ?? false;
  const userLineData = documentData?.line.find(approval => approval.approver === userData);
  const userOrder = documentData?.line.find(a => a.approver === userData)?.order!;
  const nextApprover = documentData?.line.find(approval => approval.order === userOrder + 1);
  // const isNextApprover = nextApprover?.approvedYn === 'N';
  const previousApprover = documentData?.line.find(approval => approval.order === userOrder - 1);
  const isPreviousApproved = !(previousApprover?.approvedYn === 'N');

  const renderApprovalButtons = () => {
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

  const renderGeneralButtons = () => (
    <>
      <button className="btn" onClick={handleShowModal}>
        <span>결재자지정</span>
        <i className="fa-solid fa-user-pen"></i>
      </button>
      {isModalOpen && <ApprovalModalEmpEdit onClose={handleCloseModal} isEdit={true} />}
      {!(documentType === 'RESIGNATION') && (
        <button className="btn" onClick={handleShowRefModal}>
          <span>참조자/부서</span>
          <i className="fa-solid fa-users"></i>
        </button>
      )}
      {isRefModalOpen && <ApprovalModalEmpEdit onClose={handleCloseRefModal} isEdit={true} />}
      <button className="btn" onClick={() => requestApprovalType(documentType, 'TEMP')}>
        <span>임시저장</span>
        <i className="fa-solid fa-floppy-disk"></i>
      </button>
      <button
        className="btn btn-blue"
        onClick={() => requestApprovalType(documentType, 'PROCEEDING')}>
        <span>결재요청</span>
        <i className="fa-solid fa-pen-nib"></i>
      </button>
    </>
  );

  /* 결재자가 Y가 있는지 */
  const approverYn =
    documentType === 'APPROVAL_COMMON'
      ? isApprovalData(documentData)
        ? documentData.line.some(approval => approval.approvedYn === 'N')
        : documentData?.line.some(approval => approval.approvedYn === 'N')
      : documentData?.line.some(approval => approval.approvedYn === 'N');

  const renderDetailButtons = () => (
    <>
      {/* 임시 저장이 아닐 때 */}

      {matchingId !== 0 && documentData && documentData.line && renderApprovalButtons()}
      {temp && memoizedValues.isDetail && (
        <>
          <button className="btn" onClick={handleShowModal}>
            <span>결재자지정</span>
            <i className="fa-solid fa-user-pen"></i>
          </button>
          {isModalOpen && <ApprovalModalEmpEdit onClose={handleCloseModal} isEdit={true} />}
          {!(documentType === 'RESIGNATION') && (
            <button className="btn" onClick={handleShowRefModal}>
              <span>참조자/부서</span>
              <i className="fa-solid fa-users"></i>
            </button>
          )}
          {isRefModalOpen && <ApprovalModalEmpEdit onClose={handleCloseRefModal} isEdit={true} />}
          <button className="btn" onClick={() => requestTempDocument(documentType, 'TEMP')}>
            <span>임시저장</span>
            <i className="fa-solid fa-floppy-disk"></i>
          </button>
          <button
            className="btn btn-blue"
            onClick={() =>
              isRevise
                ? requestApprovalType(documentType, 'PROCEEDING')
                : requestTempDocument(documentType, 'PROCEEDING')
            }>
            <span>결재요청</span>
            <i className="fa-solid fa-pen-nib"></i>
          </button>

          <button className="btn btn-red" onClick={() => deleteDocumentHandler(id)}>
            <span>문서삭제</span>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </>
      )}
      {!temp && (
        <>
          {/* 결재 프로세스가 진행되지 않았고, 작성자 본인 일때 */}
          {approverYn && regUsrNo === memoizedValues.userData && !isFinishedDocumnt && (
            <button
              className="btn"
              onClick={() => {
                recallDocument(id);
              }}>
              <span>문서회수</span>
              <i className="fa-solid fa-rotate-left"></i>
            </button>
          )}

          {isFinishedDocumnt &&
            regUsrNo === memoizedValues.userData &&
            documentType === 'APPROVAL_COMMON' && (
              <button className="btn btn-green" onClick={() => changeTempModeHandler('Y')}>
                <span>재기안</span>
              </button>
            )}
          <button className="btn btn-green-line" onClick={pdfDownloadHandler}>
            <span>PDF다운</span>
            <i className="fa-solid fa-file-pdf"></i>
          </button>
        </>
      )}
    </>
  );

  return (
    <div className={`${classes['btn-group']} ${buttonsLocation}`}>
      {type !== 'bottom' && !isEdit && !isRevise && (
        <button className="btn btn-secondary-blue-line first-child" onClick={goComment}>
          <span>
            <span> {documentData?.comment.length}개</span>의 의견
          </span>
          <i className="fa-regular fa-comments"></i>
        </button>
      )}
      {!memoizedValues.isDetail ? renderGeneralButtons() : renderDetailButtons()}
      <button className="btn btn-border" onClick={goBackPage}>
        <span>문서함이동</span>
      </button>
    </div>
  );
};

export default ApprovalEditButtons;
