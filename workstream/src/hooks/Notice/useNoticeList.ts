import { useEffect, useState } from 'react';
import { getNoticeList } from '../../api/endpoints/notice';
import { NoticeList } from '../../types/Main/Main';

const useNoticeList = () => {
  const [noticeData, setNoticeData] = useState<NoticeList[]>([]);

  // const selectMenu = useSelector((state: RootState) => state.ui.selectMenu);

  const fetchNoticeList = async () => {
    try {
      const response = await getNoticeList();
      const data = response.data;
      console.log(data);
      setNoticeData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNoticeList();
  }, []);

  return { noticeData, fetchNoticeList };
};

export default useNoticeList;
