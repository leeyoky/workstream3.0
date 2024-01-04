import { useState, useEffect } from 'react';
import { ResignationData } from '../../types/Approval/Approaval';
import { getResignationData } from '../../api/axios';

/**
 * 사직원 Data API data
 * @param id
 * @returns
 */

export const useResignationData = (id: string) => {
  const [data, setData] = useState<ResignationData | undefined>();

  const fetchResignationData = async (id: string) => {
    try {
      const response = await getResignationData(id);
      const data = response.data;
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // 상태업데이트
  const updateData = (newData: ResignationData) => {
    setData(newData);
  };

  useEffect(() => {
    if (id) {
      fetchResignationData(id);
    }
  }, [id]);

  return { data, updateData };
};
