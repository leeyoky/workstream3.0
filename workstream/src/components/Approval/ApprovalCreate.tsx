import React from 'react';
import Modal from "../../Layout/Modal";
import ApprovalEmpSelector from './ApprovalEmpSelector';
import ApprovalSelectOrganization from './ApprovalSelectOrganization';

import classes from '../../pages/Approval/ApprovalSelect.module.css';
import ApprovalDocumentType from './ApprovalDocumentType';

interface ApprovalCreateProps {
  onClose: () => void; // 모달 닫기 핸들러
  isEdit?: boolean; // 편집
}

const ApprovalCreate: React.FC<ApprovalCreateProps> = (props) => {

  console.log(props.isEdit);
  

  const resetArray = () => {
    props.onClose();
  }

  return (
    <Modal isOpen={true} onClose={resetArray} isEdit={props.isEdit}>
      <div className={classes['approval-container']}>
        <div className={classes['organizaion-selector-wrapper']}>
          {!props.isEdit && <ApprovalDocumentType />}
          <ApprovalSelectOrganization />
          <ApprovalEmpSelector onClose={resetArray}/>
        </div>
      </div>
    </Modal>
  );
}

export default ApprovalCreate;
