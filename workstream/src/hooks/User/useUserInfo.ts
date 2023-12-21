import { useState, useEffect } from 'react';
import { getEnteredDate } from '../../api/axios';

interface UserData {
  enterData: string;
}

const useUserInfo = (userId: string) => {
  const [enterDate, setEnterDate] = useState<UserData | null>(null);

  const fetchEnterDate = async (userId: string) => {
    try {
      const response = await getEnteredDate(userId);
      const data = response.data;
      setEnterDate(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchEnterDate(userId);
    }
  }, [userId]);

  return enterDate;
};

export default useUserInfo;
