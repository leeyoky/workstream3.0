import { useSelector } from 'react-redux';
import classes from '../../../pages/Approval/Approval.module.css';
import { RootState } from '../../../store';
import { useDocumentData } from '../../../hooks/Approval/useDocumentData';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { isApprovalData, isResignationData } from '../../../helpers/approval';

/**
 * 문서 지시사항 컴포넌트
 * @returns
 */
const ApprovalInstructions = () => {
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const isEdit = useSelector((state: RootState) => state.approval.isEditMode);
  const { id = '' } = useParams<string>();
  const data = useDocumentData(documentType, id)?.data;
  const documentData = useDocumentData(documentType, id)?.data;

  const lastApprover = data?.line[data?.line.length - 1]?.approver || '';
  const lastCommentObj = data?.comment.find(comment => comment.regUsr === lastApprover);
  const lastComment = lastCommentObj ? lastCommentObj.comment : '';

  const isApproved =
    documentData &&
    (documentType === 'APPROVAL_COMMON'
      ? isApprovalData(documentData)
        ? documentData.approval.state
        : ''
      : isResignationData(documentData)
      ? documentData.resignation.state
      : '');

  const displayValue =
    isApproved === 'APPROVED'
      ? lastComment || '-'
      : isEdit
      ? '최종결재 후 표시됩니다.'
      : '최종결재 후 표시됩니다.';

  useEffect(() => {}, []);

  return (
    <div className={classes['reference-table']}>
      <div className={classes['instruction-table-th']}>
        <div>지시사항</div>
      </div>
      <div className={classes['reference-table-td']}>
        <input
          type="text"
          readOnly={true}
          placeholder={displayValue}
          value={!isEdit ? lastComment : ''}
        />
      </div>
    </div>
  );
};

export default ApprovalInstructions;
