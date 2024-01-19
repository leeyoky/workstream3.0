import Modal from '../../Layout/Modal/Modal';
import ApprovalOrganization from '../../components/Approval/ApprovalLine/ApprovalOrganization';
import classes from '../../pages/Approval/ApprovalSelect.module.css';

interface OrganizationModalProps {
  onClose: () => void; // 모달 닫기 핸들러
  className?: string;
}
const OrganizationModal: React.FC<OrganizationModalProps> = props => {
  const closeModalHandler = () => {
    props.onClose();
  };

  return (
    <Modal isOpen={true} onClose={props.onClose} className="modal__organization">
      <ApprovalOrganization />
      <div className={classes['button--box']}>
        <button className={classes['button--complete']} onClick={closeModalHandler}>
          완료
        </button>
      </div>
    </Modal>
  );
};

export default OrganizationModal;
