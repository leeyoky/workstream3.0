import React from 'react';
import Modal from '../../../Layout/Modal/Modal';
import classes from '../../../pages/Approval/ApprovalMagager.module.css';

interface SettingDelegationEditProps {
  onClose: () => void;
}
const SettingDelegationEdit: React.FC<SettingDelegationEditProps> = props => {
  const handleCloseModal = () => {
    props.onClose();
  };
  return (
    <Modal isOpen={true} onClose={props.onClose} className="delegation-setting-modal">
      <div className={classes['setting-modal-page-wrapper']}>
        <div className={classes['modal-title']}>
          <p>위임 편집</p>
          <hr />
        </div>
        <div className={classes['modal-content']}></div>
        <button className="btn btn-red">대결 해제</button>
        <button className="btn" onClick={handleCloseModal}>
          취소
        </button>
      </div>
    </Modal>
  );
};

export default SettingDelegationEdit;
