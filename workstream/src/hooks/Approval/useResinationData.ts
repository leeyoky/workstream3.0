import { useState, useEffect } from 'react';
import { ResinationData } from '../../types/Approval/Approaval';
import { getResignationData } from '../../api/axios';

export const useResinationData = (id: string) => {
  const [data, setData] = useState<ResinationData>();

  const fetchResinationData = async (id: string) => {
    try {
      const response = await getResignationData(id);
      const data = response.data;
      setData(data);
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(()=> {
    if(id){
      fetchResinationData(id);
    }
  },[id]);

  return { data };
}
