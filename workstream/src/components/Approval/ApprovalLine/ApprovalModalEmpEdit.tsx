import React from 'react';
import Modal from "../../../Layout/Modal/Modal";
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import ApprovalEmpSelector from './ApprovalEmpSelector';
import ApprovalOrganization from './ApprovalOrganization';
interface ApprovalCreateProps {
  onClose: () => void; // 모달 닫기 핸들러
  isEdit?: boolean; // 편집
}

const ApprovalModalEmpEdit: React.FC<ApprovalCreateProps> = (props) => {

  const closeModalHandler = () => {
    props.onClose();
  }

  return (
    <Modal isOpen={true} isEdit={props.isEdit} >
      <div className={classes['approval-container']}>
        <div className={classes['organizaion-selector-wrapper']}>
          <React.Fragment>
            <ApprovalOrganization />
            <ApprovalEmpSelector 
                onClose={closeModalHandler} 
                isEdit={props.isEdit}
                />
          </React.Fragment>
        </div>
          <div className={classes['button--box']}>
            <button className={classes['button--complete']} onClick={closeModalHandler}>
              완료
            </button>
          </div>
      </div>
    </Modal>
  );
}

export default ApprovalModalEmpEdit;
