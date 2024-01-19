import ApprovalModalEmpEdit from '../../ApprovalModals/ApprovalModalEmpEdit';
import useApprovalRequest from '../../../../hooks/Approval/useApprovalRequest';

/**
 * 결재자 지정 버튼
 * @returns
 */
const SelectApproverButton = ({ title = '결재자지정' }) => {
  const { isModalOpen, handleShowModal, handleCloseModal } = useApprovalRequest();
  return (
    <>
      <button className="btn" onClick={handleShowModal}>
        <span>{title}</span>
        <i className="fa-solid fa-user-pen"></i>
      </button>
      {isModalOpen && <ApprovalModalEmpEdit onClose={handleCloseModal} isEdit={true} />}
    </>
  );
};

export default SelectApproverButton;
