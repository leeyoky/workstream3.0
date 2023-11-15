import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../store/Approval/approval-slice';
import Modal from "../../Layout/Modal";
import ApprovalDocumentType from './ApprovalModalDocument';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
interface ApprovalCreateProps {
  onClose: () => void; // 모달 닫기 핸들러
  isEdit?: boolean; // 편집
  isCreate: boolean;
}

const ApprovalCreate: React.FC<ApprovalCreateProps> = (props) => {
  const [documentType, setDocumentType] = useState(''); // 부모 컴포넌트에서 상태를 관리
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEditMode = useSelector((state:RootState) => state.approval.isEditMode);

  // 결재라인 초기화
  useEffect(()=>{
    if(!isEditMode) {
      dispatch(selectedActions.resetDocument());
    }
  },[isEditMode, dispatch])
  
  const closeModalHandler = () => {
    props.onClose();
  }

  const goCreatePage = () => {
    if (documentType === '') {
      alert('작성할 문서가 선택되지 않았습니다.')
      return
    }
    dispatch(selectedActions.updateDocumentType(documentType));
    props.onClose();
    navigate('approval/create' , {state : {isCreate : true}})
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
        <button className={classes['button--complete']} onClick={() => goCreatePage()}>
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
