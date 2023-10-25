import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../store/Approval/approval-slice';
import Modal from "../../Layout/Modal";
import ApprovalDocumentType from './ApprovalModalDocument';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
interface ApprovalCreateProps {
  onClose: () => void; // 모달 닫기 핸들러
  isEdit?: boolean; // 편집
}

const ApprovalCreate: React.FC<ApprovalCreateProps> = (props) => {
  const [documentType, setDocumentType] = useState(''); // 부모 컴포넌트에서 상태를 관리
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const closeModalHandler = () => {
    props.onClose();
  }

  const goEdit = () => {
    if (documentType === '') {
      alert('작성할 문서가 선택되지 않았습니다.')
      return
    }
    dispatch(selectedActions.updateDocumentType(documentType));
    props.onClose();
    navigate('/approval/edit');
  }

  const handleDocumentTypeChange = (newDocumentType: string) => {
    setDocumentType(newDocumentType); // 자식 컴포넌트로부터 선택된 문서 양식 값을 받아서 상태 변경
  }

  return (
    <Modal isOpen={true} isEdit={props.isEdit} >
      <div className={classes['approval-container']}>
        <div className={classes['organizaion-selector-wrapper']}>
          <ApprovalDocumentType onChange={handleDocumentTypeChange} />
        </div>
        <div className={classes['button--box']}>
          <button className={classes['button--complete']} onClick={goEdit}>
            완료
          </button>
          <button className={classes['button--alt']} onClick={closeModalHandler}>
            닫기
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ApprovalCreate;
