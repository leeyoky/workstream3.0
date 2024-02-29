import { useEffect, useState } from 'react';
import { NoticeList } from '../../types/Main/Main';
import { deleteNotice, getNoticeData, updateNoticeData } from '../../api/endpoints/notice';

const useNoticeRequest = (noticeId: string, onNoticeUpdated: () => void) => {
  const [noticeData, setNoticeData] = useState<NoticeList | null>(null);
  const [popupYn, setPopupYn] = useState<string>('');

  useEffect(() => {
    getData();
  }, [noticeId]);

  // 공지사항의 특정 글의 data를 가지고오는 api
  const getData = async () => {
    try {
      const response = await getNoticeData(noticeId);
      const data = response.data;
      setNoticeData(data);
      setPopupYn(data?.popupYn);
    } catch (error) {
      console.error(error);
    }
  };

  // 공지사항 특정 글을 update하는 api
  const updateData = async (id: string, formData: NoticeList) => {
    try {
      const response = await updateNoticeData(id, formData);
      const data = response;
      console.log(data);
      onNoticeUpdated();
    } catch (error) {
      console.log(error);
    }
  };

  // 공지사항 글을 삭제시키는 api
  const removeNotice = async (id: string) => {
    try {
      const response = await deleteNotice(id);
      console.log(response);
      if (response.status === 200) {
        alert('삭제가 완료되었습니다.');
        // props.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    noticeData,
    setNoticeData,
    popupYn,
    setPopupYn,
    getData,
    updateData,
    removeNotice,
  };
};

export default useNoticeRequest;
