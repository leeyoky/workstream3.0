import { useSelector } from 'react-redux';
import classes from '../../pages/Approval/Approval.module.css';
import { RootState } from '../../store';
import { Employee, ccDept } from '../../types/Approval/Approaval';
import { useDocumentData } from '../../hooks/Approval/useDocumentData';
import { useParams } from 'react-router-dom';

const ApprovalReference = () => {
  const referenceDept = useSelector((state:RootState) => state.approval.ccDept);
  const referenceEmp = useSelector((state:RootState) => state.approval.ccUser);

  const { id = '' } = useParams<string>();
  const isDetail = useSelector((state:RootState) => state.approval.isDetailMode);
  const documentType = useSelector((state: RootState) => state.approval.documentType);

  const data = useDocumentData(documentType, id)?.data;

  // 마지막 요소에서 콤마 제거
  const addComma = (item: string, index: number, array: Employee[]) => {
    return index === array.length - 1 ? item : `${item}, `;
  };

  const addCommaForDept = (item: string, index: number, array: ccDept[]) => {
    return index === array.length - 1 ? item : `${item}, `;
  };


  return (
    <div className={classes['reference-table']}>
      <div className={classes['reference-table-th']}>
        <div>
          참조자/부서
        </div>
      </div>
      <div className={classes['reference-table-td']}>
      {isDetail ? (
          <>
            {data?.ccDept.map((dept, index) => (
              <span key={index}>{dept.deptNm},</span>
            ))}
            {data?.ccUser.map((emp, index) => (
              <span key={index}>
                {emp.empNm}
                {index !== data.ccUser.length - 1 && ','}
              </span>
            ))}
          </>
        ) : (
          <>
          {referenceDept.map((dept, index) => (
            <span key={index}>{addCommaForDept(dept.deptNm, index, referenceDept)}</span>
          ))}
          {referenceEmp.map((emp, index) => (
            <span key={index}>{addComma(emp.name, index, referenceEmp)}</span>
          ))}
          </>
        )}
      </div>
    </div>
  )
}

export default ApprovalReference