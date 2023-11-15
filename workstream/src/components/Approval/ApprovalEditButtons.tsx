import classes from '../../pages/Approval/ApprovalSelect.module.css';
import ApprovalModalEmpEdit from './ApprovalModalEmpEdit';
import useApprovalRequest from '../../hooks/Approval/useApprovalRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type ApprovalEditButtonsProps = {
  temp: boolean;
};

const ApprovalEditButtons: React.FC<ApprovalEditButtonsProps> = ({ temp }) => {
  const {
    id,
    isModalOpen,
    handleShowModal,
    handleCloseModal,
    goBackPage,
    requestApprovalHandler,
    updateDocumentHandler,
    deleteDocumentHandler,
    recallDocument,
  } = useApprovalRequest();

  const isDetail = useSelector((state:RootState) => state.approval.isDetailMode);
    

  return (
    <div className={classes['btn-group']}>
      <button className="btn btn-border" onClick={goBackPage}>
        <span>문서함이동</span>
      </button>
      {/* CREATE */}
      {!isDetail ? (
        <div>
          <button className="btn" onClick={handleShowModal}>
            <span>결재자지정</span>
            <i className="fa-solid fa-user-pen"></i>
          </button>
          {isModalOpen && <ApprovalModalEmpEdit onClose={handleCloseModal} isEdit={true} />}
          <button className="btn" onClick={() => requestApprovalHandler('TEMP')}>
            <span>임시저장</span>
            <i className="fa-solid fa-floppy-disk"></i>
          </button>
          <button className="btn btn-blue" onClick={() => requestApprovalHandler('PROCEEDING')}>
            <span>결재요청</span>
            <i className="fa-solid fa-pen-nib"></i>
          </button>
        </div>
      ) : (
        <div>
          {!temp ? (
            <>
              <button className="btn" onClick={() => recallDocument(id)}>
                <span>문서회수</span>
              </button>
              <button className="btn btn-green">
                <span>PDF다운</span>
                <i className="fa-solid fa-file-pdf"></i>
              </button>
            </>
          ) : null}
          {temp && isDetail && (
            <>
              <button className="btn" onClick={handleShowModal}>
                <span>결재자지정</span>
                <i className="fa-solid fa-user-pen"></i>
              </button>
              {isModalOpen && <ApprovalModalEmpEdit onClose={handleCloseModal} isEdit={true} />}
              <button className="btn" onClick={updateDocumentHandler}>
                <span>임시저장</span>
                <i className="fa-solid fa-floppy-disk"></i>
              </button>
              <button className="btn btn-red" onClick={()=>deleteDocumentHandler(id)}>
                <span>문서삭제</span>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <button className="btn btn-blue" onClick={() => requestApprovalHandler('PROCEEDING')}>
                <span>결재요청</span>
                <i className="fa-solid fa-pen-nib"></i>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ApprovalEditButtons;
