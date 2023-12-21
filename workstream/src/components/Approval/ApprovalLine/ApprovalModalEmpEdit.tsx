import React from 'react';
import Modal from '../../../Layout/Modal/Modal';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import ApprovalEmpSelector from './ApprovalEmpSelector';
import ApprovalOrganization from './ApprovalOrganization';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';
interface ApprovalCreateProps {
  onClose: () => void; // 모달 닫기 핸들러
  isEdit?: boolean; // 편집
}

const ApprovalModalEmpEdit: React.FC<ApprovalCreateProps> = props => {
  const newUpdateApprovers = useSelector((state: RootState) => state.approval.updateApprovers);
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    props.onClose();
    dispatch(selectedActions.setApprovers(newUpdateApprovers));
  };

  return (
    <Modal isOpen={true} isEdit={props.isEdit} onClose={props.onClose}>
      <div className={classes['approval-container']}>
        <div className={classes['organizaion-selector-wrapper']}>
          <React.Fragment>
            <ApprovalOrganization />
            <ApprovalEmpSelector isEdit={props.isEdit} />
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
};

export default ApprovalModalEmpEdit;
