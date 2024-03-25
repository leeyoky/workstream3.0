import { useEffect, useState } from 'react';
import { getNoticeList } from '../../api/endpoints/notice';
import { NoticeList } from '../../types/Main/Main';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const useNoticeList = (sortValue: string) => {
  const [noticeData, setNoticeData] = useState<NoticeList[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const getPageSize = useSelector((state: RootState) => state.ui.selectPageSize);
  const getPage = useSelector((state: RootState) => state.ui.selectPage);
  const selectMenu = useSelector((state: RootState) => state.ui.selectMenu);
  const getSearchInput = useSelector((state: RootState) => state.ui.searchInput);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.resetPage());
  }, [selectMenu]);

  useEffect(() => {
    fetchNoticeList();
  }, [getPage, getPageSize, selectMenu, getSearchInput, sortValue, dispatch]);

  const fetchNoticeList = async () => {
    try {
      const { category, title, regUsrNm, regDateGoe, regDateLoe } = getSearchInput;
      let noticeState = '';
      let categoryCode = '';

      if (selectMenu === '/notice/temp') {
        noticeState = 'TEMP';
      } else {
        noticeState = 'SAVE';
        if (selectMenu === '/notice/document' || selectMenu === '/notice') {
          categoryCode = 'NOTICE01';
        }
        if (selectMenu === '/notice/personelOrder') {
          categoryCode = 'NOTICE02';
        }
        if (selectMenu === '/notice/familyEvent') {
          categoryCode = 'NOTICE03';
        }
      }

      const response = await getNoticeList({
        page: getPage,
        size: getPageSize,
        state: noticeState,
        category: categoryCode ? categoryCode : category,
        title,
        regUsrNm,
        regDateGoe,
        regDateLoe,
        orderBy: sortValue,
      });

      const data = response.data;

      console.log(data.data);

      const popupData = data.data.filter((item: NoticeList) => item.popupYn === 'Y');

      if (popupData.length > 0) {
        dispatch(uiActions.setPopupData(popupData));
      }

      const getTotalElemnets = data.totalCount;

      setTotalItems(getTotalElemnets);
      dispatch(uiActions.setTotalItems(getTotalElemnets));
      setNoticeData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { noticeData, fetchNoticeList, totalItems };
};

export default useNoticeList;
