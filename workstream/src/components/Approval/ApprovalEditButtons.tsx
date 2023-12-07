import classes from '../../pages/Approval/ApprovalSelect.module.css';
import ApprovalModalEmpEdit from './ApprovalLine/ApprovalModalEmpEdit';
import useApprovalRequest from '../../hooks/Approval/useApprovalRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import React, { useEffect, useMemo } from 'react';
import { useDocumentData } from '../../hooks/Approval/useDocumentData';
import { ApprovalData, ResinationData } from '../../types/Approval/Approaval';

type ApprovalEditButtonsProps = {
  temp: boolean;
};

const ApprovalEditButtons: React.FC<ApprovalEditButtonsProps> = ({ temp }) => {
  const {
    id,
    isModalOpen,
    isRefModalOpen,
    approvedYn,
    setApprovedYn,
    handleShowModal,
    handleCloseModal,
    handleCloseRefModal,
    handleShowRefModal,
    goBackPage,
    deleteDocumentHandler,
    approveDocumentHandler,
    requestApprovalType,
    requestTempDocument,
    recallDocument,
    pdfDownloadHandler
  } = useApprovalRequest();

  const isDetail = useSelector((state: RootState) => state.approval.isDetailMode);
  const selectMenu = useSelector((state: RootState) => state.ui.selectMenu);
  const userData = useSelector((state: RootState) => state.auth.userInfo?.empNo);
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const documentData = useDocumentData(documentType, id)?.data;

  const memoizedValues = useMemo(() => {
    return { isDetail, selectMenu, userData, approvedYn };
  }, [isDetail, selectMenu, userData, approvedYn]);

  useEffect(()=>{
    setApprovedYn(approvedYn)
  },[approvedYn, setApprovedYn, documentData])

  const matchingId = documentData?.line?.find(approval => approval.approver === userData)?.id || 0;

  
  const renderApprovalButtons = () => {
    const isApprover = documentData?.line.some(approval => approval.approver === userData);
    const userOrder = documentData?.line.find(a => a.approver === userData)?.order!;
  
    if (isApprover) {
      /* 첫번째 결재자 일때 */
      const isFirstApprover =
        userOrder === 1 &&
        documentData?.line.find(approval => approval.order === 1)?.approvedYn === 'N';
      /* 자기 뒤의 결재자가 아직 승인 하지 않았고 */
      const isLastApprover =
        documentData?.line.find(approval => approval.order === documentData.line.length)?.approvedYn === 'N';
      /* 자기 앞의 결재자가 승인했을때 */
      const isPreviousApproved =
      documentData?.line.find(approval => approval.order === userOrder - 1)?.approvedYn === 'Y';
  
      if (isFirstApprover || (isLastApprover && isPreviousApproved)) {
        return (
          <>
            <button className="btn btn-blue" onClick={() => approveDocumentHandler(matchingId, 'Y')}>
              <span>승인</span>
            </button>
            <button className="btn btn-red" onClick={() => approveDocumentHandler(matchingId, 'R')}>
              <span>반려</span>
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
      {!(documentType === 'RESIGNATION') &&
        <button className='btn'
        onClick={handleShowRefModal}>
          <span>참조자/부서</span>
          <i className="fa-solid fa-users"></i>
        </button>}
      {isRefModalOpen && <ApprovalModalEmpEdit onClose={handleCloseRefModal} isEdit={true}/>}
      {isModalOpen && <ApprovalModalEmpEdit onClose={handleCloseModal} isEdit={true} />}
      <button className="btn" onClick={() => requestApprovalType(documentType, 'TEMP')}>
        <span>임시저장</span>
        <i className="fa-solid fa-floppy-disk"></i>
      </button>
      <button className="btn btn-blue" onClick={() => requestApprovalType(documentType, 'PROCEEDING')}>
        <span>결재요청</span>
        <i className="fa-solid fa-pen-nib"></i>
      </button>

    </>
  );

  const isApprovalData = (data: any): data is ApprovalData => {
    return data && 'approval' in data;
  };
  
  const isResinationData = (data: any): data is ResinationData => {
    return data && 'resignation' in data;
  };

  

  /* 문서별 작성자의 no를 가져옴 */
  const regUsrNo =
    documentType === 'APPROVAL_COMMON'
      ? isApprovalData(documentData)? documentData.approval.regUsr
      : documentData?.resignation.regUsr || '' 
      : isResinationData(documentData)? documentData.resignation.regUsr: '';

  /* 결재자가 Y가 있는지 */
  const approverYn = documentType === 'APPROVAL_COMMON'
    ? isApprovalData(documentData)
    ? documentData.line.some(approval => approval.approvedYn === 'Y')
    : documentData?.line.some(approval => approval.approvedYn === 'Y')
    : documentData?.line.some(approval => approval.approvedYn === 'Y');

  const renderDetailButtons = () => (
    <>
    {/* 임시 저장이 아닐 때 */}

      {/* renderApprovalButtons 호출 */}
      {matchingId !== 0 && documentData && documentData.line && renderApprovalButtons()}

      {temp &&
        memoizedValues.isDetail && (
          <>
            <button className="btn" onClick={handleShowModal}>
              <span>결재자지정</span>
              <i className="fa-solid fa-user-pen"></i>
            </button>
            {isModalOpen && <ApprovalModalEmpEdit onClose={handleCloseModal} isEdit={true} />}
            {!(documentType === 'RESIGNATION') &&
              <button className='btn'
              onClick={handleShowRefModal}>
              <span>참조자/부서</span>
              <i className="fa-solid fa-users"></i>
            </button>}
            <button className="btn" onClick={() => requestTempDocument(documentType, 'TEMP')}>
              <span>임시저장</span>
              <i className="fa-solid fa-floppy-disk"></i>
            </button>
            <button className="btn btn-blue" onClick={() => requestTempDocument(documentType, 'PROCEEDING')}>
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
          {!approverYn && regUsrNo === memoizedValues.userData &&(
            <button
              className="btn"
              onClick={() => {
                  recallDocument(id);
              }}
            >
              <span>문서회수</span>
              <i className="fa-solid fa-rotate-left"></i>
            </button>
            )}
            <button 
              className="btn btn-green-line"
              onClick={pdfDownloadHandler}>
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
