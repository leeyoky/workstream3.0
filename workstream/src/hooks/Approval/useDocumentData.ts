// useDocumentData.ts
import { useEffect, useState } from 'react';
import { ApprovalData, ResinationData } from '../../types/Approval/Approaval';
import { getApprovalData, getResignationData } from '../../api/axios';

type DocumentData = ApprovalData | ResinationData;

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
      console.log("훅 : " , data);
      
    }
  }, [documentType, id]);


  return { data };
};
