import ApprovalModalEmpEdit from '../../ApprovalModals/ApprovalModalEmpEdit';
import useApprovalRequest from '../../../../hooks/Approval/useApprovalRequest';

/**
 * 결재자 지정 버튼
 * @returns
 */
const SelectApproverButton = () => {
  const { isModalOpen, handleShowModal, handleCloseModal } = useApprovalRequest();
  return (
    <>
      <button className="btn" onClick={handleShowModal}>
        <span>결재자지정</span>
        <i className="fa-solid fa-user-pen"></i>
      </button>
      {isModalOpen && <ApprovalModalEmpEdit onClose={handleCloseModal} isEdit={true} />}
    </>
  );
};

export default SelectApproverButton;
