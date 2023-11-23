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
    handleShowModal,
    handleCloseModal,
    handleShowRefModal,
    handleCloseRefModal,
    goBackPage,
    deleteDocumentHandler,
    approveDocumentHandler,
    requestApprovalType,
    requestTempDocument,
    recallDocument
  } = useApprovalRequest();

  const isDetail = useSelector((state: RootState) => state.approval.isDetailMode);
  const selectMenu = useSelector((state: RootState) => state.ui.selectMenu);
  const userData = useSelector((state: RootState) => state.auth.empNo);
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const documentData = useDocumentData(documentType, id)?.data;

  useEffect(() => {
  }, [documentData]);

  const memoizedValues = useMemo(() => {
    return { isDetail, selectMenu, userData };
  }, [isDetail, selectMenu, userData]);

  const matchingId = documentData?.line?.find(approval => approval.approver === userData)?.id || 0;

  const renderApprovalButtons = () => (
    <>
      <button className="btn btn-darken-5" onClick={() => approveDocumentHandler(matchingId, 'Y')}>
        <span>승인</span>
      </button>
      <button className="btn btn-border" onClick={() => approveDocumentHandler(matchingId, 'R')}>
        <span>반려</span>
      </button>
    </>
  );

  const renderGeneralButtons = () => (
    <>
      <button className="btn" onClick={handleShowModal}>
        <span>결재자지정</span>
        <i className="fa-solid fa-user-pen"></i>
      </button>
      <button className='btn' onClick={handleShowRefModal}>
        <span>참조자/부서</span>
        <i className="fa-solid fa-users"></i>
      </button>
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

  const renderDetailButtons = () => (
    <>
      {!temp && (
      <>
        <button
          className="btn"
          onClick={() => {
            const regUsrNm =
              documentType === 'APPROVAL_COMMON'
                ? isApprovalData(documentData)? documentData.approval.regUsrNm
                : documentData?.resignation.regUsrNm || '' 
                : isResinationData(documentData)? documentData.resignation.regUsrNm: '';

            if (regUsrNm === memoizedValues.userData) {
              recallDocument(id);
            }
          }}
        >
          <span>문서회수</span>
        </button>
        <button className="btn btn-green-line">
          <span>PDF다운</span>
          <i className="fa-solid fa-file-pdf"></i>
        </button>
      </>
      )}
      {matchingId !== 0 &&
        documentData &&
        documentData.line && (
          <>
            {documentData.line.some(approval => approval.approver === userData) &&
              documentData.line.find(approval => approval.order === 2)?.approvedYn === 'N' &&
              renderApprovalButtons()
            }

            {documentData.line.find(approval => approval.approver === userData)?.order === documentData.line.length &&
              documentData.line.find(approval => approval.order === documentData.line.length - 1)?.approvedYn === 'Y' &&
              renderApprovalButtons()
            }

            {documentData.line.some(approval => approval.approver === userData) &&
              documentData.line.find(approval => approval.order === documentData.line.find(a => a.approver === userData)?.order - 1)?.approvedYn === 'Y' &&
              documentData.line.find(approval => approval.order === documentData.line.find(a => a.approver === userData)?.order + 1)?.approvedYn === 'N' &&
              renderApprovalButtons()
            }
          </>
        )}

      {temp &&
        memoizedValues.isDetail && (
          <>
            <button className="btn" onClick={handleShowModal}>
              <span>결재자지정</span>
              <i className="fa-solid fa-user-pen"></i>
            </button>
            {isModalOpen && <ApprovalModalEmpEdit onClose={handleCloseModal} isEdit={true} />}
            <button className='btn'>
              <span>참조자/부서</span>
              <i className="fa-solid fa-users"></i>
            </button>
            <button className="btn" onClick={() => requestTempDocument(documentType, 'TEMP')}>
              <span>임시저장</span>
              <i className="fa-solid fa-floppy-disk"></i>
            </button>
            <button className="btn btn-red" onClick={() => deleteDocumentHandler(id)}>
              <span>문서삭제</span>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <button className="btn btn-blue" onClick={() => requestTempDocument(documentType, 'PROCEEDING')}>
              <span>결재요청</span>
              <i className="fa-solid fa-pen-nib"></i>
            </button>
          </>
        )}
    </>
  );

  return (
    <div className={classes['btn-group']}>
      <button className="btn btn-border" onClick={goBackPage}>
        <span>문서함이동</span>
      </button>

      {!memoizedValues.isDetail ? renderGeneralButtons() : renderDetailButtons()}
    </div>
  );
};

export default ApprovalEditButtons;
