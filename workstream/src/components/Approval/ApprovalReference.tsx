import { useSelector } from 'react-redux';
import classes from '../../pages/Approval/Approval.module.css';
import { RootState } from '../../store';
import { Employee, ccDept } from '../../types/Approval/Approaval';
import { useDocumentData } from '../../hooks/Approval/useDocumentData';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { selectedActions } from '../../store/Approval/approval-slice';
import { useDispatch } from 'react-redux';

const ApprovalReference = () => {
  const [ccdept, setCcdept] = useState<
    {
      id: number;
      deptCd: string;
      deptNm: string;
    }[]
  >([]);
  const [ccUser, setCcUser] = useState<
    {
      deptNm: string;
      empNm: string;
      empNo: string;
      id: number;
      officeDutyNm: string | null | undefined;
      rankNm: string;
    }[]
  >([]);
  const referenceDept = useSelector((state: RootState) => state.approval.ccDept);
  const referenceEmp = useSelector((state: RootState) => state.approval.ccUser);
  const { id = '' } = useParams<string>();
  const isEdit = useSelector((state: RootState) => state.approval.isEditMode);
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const dispatch = useDispatch();

  const data = useDocumentData(documentType, id)?.data;

  // data 받은 값 redux에 넣기
  useEffect(() => {
    if (data) {
      const updatedCcDept = data.ccDept.map(ccdept => ({
        id: ccdept.id,
        deptCd: ccdept.deptCd,
        deptNm: ccdept.deptNm,
      }));
      setCcdept(updatedCcDept);

      const updatedCcUser = data.ccUser.map(ccUser => ({
        deptNm: ccUser.deptNm,
        empNm: ccUser.empNm,
        empNo: ccUser.empNo,
        id: ccUser.id,
        officeDutyNm: ccUser.officeDutyNm,
        rankNm: ccUser.rankNm,
      }));
      setCcUser(updatedCcUser);
    }
  }, [data]);

  useEffect(() => {
    dispatch(selectedActions.setRefDepCd(ccdept));
    dispatch(selectedActions.setRefEmp(ccUser));
  }, [ccdept, ccUser]);

  // 직원 마지막 요소에서 콤마 제거
  const addComma = (item: string, index: number, array: Employee[]) => {
    return index === array.length - 1 ? item : `${item}, `;
  };

  const addCommaForDept = (item: string, index: number, array: ccDept[]) => {
    return array.length === 1 ? `${item}, ` : index === array.length - 1 ? item : `${item}, `;
  };

  const renderRef = () => {
    if (!isEdit) {
      return (
        <>
          {data?.ccUser.map((emp, index) => <span key={index}>{emp.empNm},</span>)}
          {data?.ccDept.map((dept, index) => <span key={index}>{dept.deptNm}</span>)}
        </>
      );
    } else {
      return (
        <>
          {referenceDept.map((dept, index) => (
            <span key={index}>{addCommaForDept(dept.deptNm, index, referenceDept)}</span>
          ))}
          {referenceEmp.map((emp, index) => (
            <span key={index}>{addComma(emp.name, index, referenceEmp)}</span>
          ))}
        </>
      );
    }
  };

  return (
    <div className={classes['reference-table']}>
      <div className={classes['reference-table-th']}>
        <div>참조자/부서</div>
      </div>
      <div className={classes['reference-table-td']}>{renderRef()}</div>
    </div>
  );
};

export default ApprovalReference;
