import { useState, useEffect } from 'react';
import { getApprovalData } from '../../api/axios';
import { ApprovalData } from '../../types/Approval/Approaval';

export const useApprovalData = (id: string ) => {
  const [data, setData] = useState<ApprovalData>();

  const fetchData = async (id: string) => {
    try {
      const response = await getApprovalData(id);
      const data = response.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return data;
};