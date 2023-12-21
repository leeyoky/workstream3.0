import { useState, useEffect } from 'react';
import { getApprovalData } from '../../api/axios';
import { ApprovalData } from '../../types/Approval/Approaval';

export const useApprovalData = (id: string) => {
  const [data, setData] = useState<ApprovalData | undefined>();

  const fetchData = async (id: string) => {
    try {
      const response = await getApprovalData(id);
      const data = response.data;
      setData(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // 상태업데이트
  const updateData = (newData: ApprovalData) => {
    setData(newData);
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return { data, updateData };
};
