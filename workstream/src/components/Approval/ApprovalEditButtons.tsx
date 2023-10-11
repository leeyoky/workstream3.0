import { useNavigate } from 'react-router-dom';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../store/Approval/approval-slice';
import React, { useState } from 'react';
import ApprovalCreate from './ApprovalCreate';
const ApprovalEditButtons: React.FC = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const goBackPage = () => {
    const isCancle = window.confirm('작업한 모든 문서의 정보를 잃게됩니다. 취소하시겠습니까?')
    if(isCancle){
      navigate(-1)
      dispatch(selectedActions.resetArray());
    }
  }

  return (
    <div className={classes['btn-group']}>
      <button className="btn btn-red" onClick={goBackPage}>
        <span>취소</span>
      </button>
      <button className="btn" onClick={handleShowModal}>
        <span>결재자편집</span>
        <i className="fa-solid fa-user-pen"></i>
      </button>
        {isModalOpen && <ApprovalCreate onClose={handleCloseModal} isEdit={true}/>}
      <button className="btn">
        <span>임시저장</span>
        <i className="fa-solid fa-floppy-disk"></i>
      </button>
      <button className="btn">
        <span>결재요청</span>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
    </div>
  )
}

export default ApprovalEditButtons