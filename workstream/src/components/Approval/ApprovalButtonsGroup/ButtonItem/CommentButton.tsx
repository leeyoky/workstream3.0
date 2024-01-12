import { useDocumentData } from '../../../../hooks/Approval/useDocumentData';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useParams } from 'react-router-dom';

type CommentButtonProps = {
  type: string;
};

/**
 * 의견 갯수 알림 버튼
 * @param param0
 * @returns
 */
const CommentButton: React.FC<CommentButtonProps> = ({ type }) => {
  const { id = '' } = useParams();
  const isEdit = useSelector((state: RootState) => state.approval.isEditMode);
  const isRevise = useSelector((state: RootState) => state.approval.isReviseMode);
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const documentData = useDocumentData(documentType, id)?.data;

  // 버튼을 누르면 의견 화면으로 스크롤 해줌
  const goComment = () => {
    const targetElement = document.getElementById('approval-comment');
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    type !== 'bottom' &&
    !isEdit &&
    !isRevise &&
    !(documentType === 'EXECUTION') && (
      <button className="btn btn-secondary-blue-line first-child" onClick={goComment}>
        <span>
          <span> {documentData?.comment.length}개</span>의 의견
        </span>
        <i className="fa-regular fa-comments"></i>
      </button>
    )
  );
};

export default CommentButton;
