import classes from '../../pages/Approval/ApprovalSelect.module.css';
import ApprovalModalEmpEdit from './ApprovalLine/ApprovalModalEmpEdit';
import useApprovalRequest from '../../hooks/Approval/useApprovalRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import React, { useEffect, useMemo } from 'react';
import { useDocumentData } from '../../hooks/Approval/useDocumentData';
import { ApprovalData, ResignationData } from '../../types/Approval/Approaval';
import ApprovalModalInstruction from './ApprovalInstruction/ApprovalModalInstruction';
import { isApprovalData, isResignationData } from '../../helpers/Approval';

type ApprovalEditButtonsProps = {
  temp: boolean;
};
const ApprovalEditButtons: React.FC<ApprovalEditButtonsProps> = ({ temp }) => {
  const {
    id,
    isModalOpen,
    isRefModalOpen,
    isInstModalOpen,
    approvedYn,
    setApprovedYn,
    handleShowModal,
    handleShowRefModal,
    handleShowInstModal,
    handleCloseModal,
    handleCloseRefModal,
    handleCloseInstModal,
    goBackPage,
    deleteDocumentHandler,
    approveDocumentHandler,
    updateApprovalHandler,
    changeTempModeHandler,
    requestApprovalType,
    requestTempDocument,
    recallDocument,
    pdfDownloadHandler,
  } = useApprovalRequest();
  const isDetail = useSelector((state: RootState) => state.approval.isDetailMode);
  const isEdit = useSelector((state: RootState) => state.approval.isEditMode);
  const isRevise = useSelector((state: RootState) => state.approval.isReviseMode);
  const selectMenu = useSelector((state: RootState) => state.ui.selectMenu);
  const userData = useSelector((state: RootState) => state.auth.userInfo?.empNo);
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const documentData = useDocumentData(documentType, id)?.data;

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

  const isFinishedDocumnt = isApproved === 'APPROVED' || isApproved === 'REJECTED';
  const matchingId = documentData?.line?.find(approval => approval.approver === userData)?.id || 0;
  const isApprover = documentData?.line.some(approval => approval.approver === userData);
  const userLineData = documentData?.line.find(approval => approval.approver === userData);
  const userOrder = documentData?.line.find(a => a.approver === userData)?.order!;
  const nextApprover = documentData?.line.find(approval => approval.order === userOrder + 1);
  const isNextApprover = nextApprover?.approvedYn === 'N';
  const previousApprover = documentData?.line.find(approval => approval.order === userOrder - 1);
  const isPreviousApproved = !(previousApprover?.approvedYn === 'N');

  const renderApprovalButtons = () => {
    const approvedYn = userLineData?.approvedYn;

    /* 결재라인에 본인이 있고, 편집상태가 아니며, 결재를 진행하지 않은 상태. */
    if (isApprover && !isEdit && approvedYn === 'N') {
      const isLastApprover = !nextApprover;

      /* 마지막 결재자이며, 앞 사람이 결재를 했고, 상태가 완료이거나 반려상태가 아닐 때 */
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
      /* 앞사람이 결재를 하거나, 뒷사람이 아직 결재를 하지 않은 상태 && 완료된 문서가 아닐때 */
      if (isNextApprover && isPreviousApproved && !isFinishedDocumnt) {
        return (
          <>
            <button
              className="btn btn-blue"
              onClick={() => approveDocumentHandler(matchingId, 'Y')}>
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
      if ((!isNextApprover || isPreviousApproved) && !isFinishedDocumnt) {
        return (
          /* 결재 취소 / 합의 취소 */
          <>
            <button
              className="btn btn-red"
              onClick={() => userLineData && updateApprovalHandler(userLineData.id)}>
              <span>{userLineData?.apprType === 'APPROVER' ? '결재 취소' : '합의 취소'}</span>
            </button>
          </>
        );
      }
    }

    return null; // If the conditions are not met, return null or an empty fragment
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
          {isFinishedDocumnt && regUsrNo === memoizedValues.userData && (
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
    <div className={classes['btn-group']}>
      {!memoizedValues.isDetail ? renderGeneralButtons() : renderDetailButtons()}
      <button className="btn btn-border" onClick={goBackPage}>
        <span>문서함이동</span>
      </button>
    </div>
  );
};

export default ApprovalEditButtons;
