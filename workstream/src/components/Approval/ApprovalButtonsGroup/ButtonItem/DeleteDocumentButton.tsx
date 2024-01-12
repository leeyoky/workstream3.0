import useApprovalRequest from '../../../../hooks/Approval/useApprovalRequest';

/**
 * 문서 삭제 버튼
 * @returns
 */
const DeleteDocumentButton = () => {
  const { id, deleteDocumentHandler } = useApprovalRequest();
  return (
    <button className="btn btn-red" onClick={() => deleteDocumentHandler(id)}>
      <span>문서삭제</span>
      <i className="fa-solid fa-xmark"></i>
    </button>
  );
};

export default DeleteDocumentButton;
