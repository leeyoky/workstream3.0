import { useEffect, useState } from 'react';
import { ApprovalData, ResignationData } from '../../types/Approval/Approaval';
import { getApprovalData, getExecutionData, getResignationData } from '../../api/axios';

type DocumentData = ApprovalData | ResignationData;
/**
 * 기본 품의서와 사직원 공용
 * @param documentType
 * @param id
 * @returns
 */
export const useDocumentData = (documentType: string, id: string) => {
  const [data, setData] = useState<DocumentData | undefined>();

  const fetchData = async () => {
    try {
      if (documentType === 'APPROVAL_COMMON') {
        const response = await getApprovalData(id);
        setData(response.data);
      } else if (documentType === 'RESIGNATION') {
        const response = await getResignationData(id);
        setData(response.data);
      } else if (documentType === 'EXECUTION') {
        const response = await getExecutionData(id);
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [documentType, id]);

  return { data };
};
