import { useSelector } from 'react-redux';
import classes from '../../../pages/Approval/Approval.module.css';
import { RootState } from '../../../store';
import { useDocumentData } from '../../../hooks/Approval/useDocumentData';
import { useParams } from 'react-router-dom';

const ApprovalInstructions = () => {
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const isEdit = useSelector((state: RootState) => state.approval.isEditMode);
  // const isRevise = useSelector((state: RootState) => state.approval.isReviseMode);
  const { id = '' } = useParams<string>();
  const data = useDocumentData(documentType, id)?.data;
  const lastApprover = data?.line[data?.line.length - 1]?.approver || '';
  const lastCommentObj = data?.comment.find(comment => comment.regUsr === lastApprover);
  const lastComment = lastCommentObj ? lastCommentObj.comment : '';

  return (
    <div className={classes['reference-table']}>
      <div className={classes['instruction-table-th']}>
        <div>지시사항</div>
      </div>
      <div className={classes['reference-table-td']}>
        <input
          type="text"
          readOnly={true}
          placeholder="최종결재 결재 후 표시됩니다."
          value={!isEdit ? (lastComment ? lastComment : ' - ') : ''}
        />
      </div>
    </div>
  );
};

export default ApprovalInstructions;
