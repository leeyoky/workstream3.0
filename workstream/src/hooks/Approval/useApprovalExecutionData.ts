import { useEffect, useState } from 'react';
import { executiondocData } from '../../types/Approval/Approaval';
import { getExecutionData } from '../../api/axios';

const useApprovalExecutionData = (id: string) => {
  const [data, setData] = useState<executiondocData>();

  const fetchExecutionData = async (id: string) => {
    try {
      const response = await getExecutionData(id);
      const data = response.data;
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExecutionData(id);
    }
  }, [id]);

  return { data };
};

export default useApprovalExecutionData;
