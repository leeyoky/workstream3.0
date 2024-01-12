import useApprovalRequest from '../../../../hooks/Approval/useApprovalRequest';
import ApprovalModalEmpEdit from '../../ApprovalModals/ApprovalModalEmpEdit';

/**
 * 참조자/부서 선택 버튼
 * @returns
 */
const SelectCCButton = () => {
  const { handleShowRefModal, isRefModalOpen, handleCloseRefModal } = useApprovalRequest();
  return (
    <>
      <button className="btn" onClick={handleShowRefModal}>
        <span>참조자/부서</span>
        <i className="fa-solid fa-users"></i>
      </button>
      {isRefModalOpen && <ApprovalModalEmpEdit onClose={handleCloseRefModal} isEdit={true} />}
    </>
  );
};

export default SelectCCButton;
