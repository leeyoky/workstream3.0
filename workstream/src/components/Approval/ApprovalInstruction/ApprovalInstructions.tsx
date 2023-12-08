import { useSelector } from 'react-redux';
import classes from '../../../pages/Approval/Approval.module.css';
import { RootState } from '../../../store';
import { useDocumentData } from '../../../hooks/Approval/useDocumentData';
import { useParams } from 'react-router-dom';

const ApprovalInstructions = () => {

  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const isEdit = useSelector((state:RootState) => state.approval.isEditMode);
  const { id = '' } = useParams<string>();
  const data = useDocumentData(documentType, id)?.data;
  const lastComment = data?.comment[data?.comment.length - 1]?.comment || '';

  return (
    <div className={classes['reference-table']}>
      <div className={classes['reference-table-th']}>
        <div>
          지시사항
        </div>
      </div>
      <div className={classes['reference-table-td']}>
        {!isEdit}
        <div>
          {lastComment}
        </div>
      </div>
    </div>
  )
}

export default ApprovalInstructions