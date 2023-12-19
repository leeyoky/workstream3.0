import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApprovalListItem } from '../../types/Approval/Approaval';
import { RootState } from '../../store';
import { uiActions } from '../../store/ui-slice';
import { countDoucumentType, getApprovalList } from '../../api/axios';
import { selectedActions } from '../../store/Approval/approval-slice';
import { useNavigate } from 'react-router-dom';

export function useApprovalList(sortValue: string) {
  const [listData, setListData] = useState<ApprovalListItem[]>([]);
  const [documentCnt, setDocuemntCnt] = useState();
  const [totalItems, setTotalItems] = useState(0);
  const selectMenu = useSelector((state: RootState) => state.ui.selectMenu);
  const getPageSize = useSelector((state: RootState) => state.ui.selectPageSize);
  const getPage = useSelector((state: RootState) => state.ui.selectPage);
  const getSearchInput = useSelector((state: RootState) => state.ui.searchInput);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(uiActions.resetPage());
    dispatch(selectedActions.resetArray());
  }, [selectMenu]);

  const fetchApprovalList = async () => {
    try {
      const { id, title, deptCd, docType, regUsrNm, state, regDateGoe, regDateLoe } =
        getSearchInput;

      let pendingApproval = '';
      let selectedState = state;

      if (state === 'PENDING') {
        selectedState = '';
        pendingApproval = 'Y';
      } else {
        if (selectMenu === '/approval/document') {
          selectedState = state || '';
        } else if (selectMenu === '/approval/temporary') {
          selectedState = 'TEMP';
        } else if (selectMenu === '/approval/in-progress') {
          selectedState = 'PROCEEDING';
        } else if (selectMenu === '/approval/completed') {
          selectedState = 'APPROVED';
        } else if (selectMenu === '/approval/rejected') {
          selectedState = 'REJECTED';
        } else if (selectMenu === '/approval/pending') {
          pendingApproval = 'Y';
        }
      }

      const response = await getApprovalList({
        id,
        page: getPage,
        size: getPageSize,
        state: selectedState,
        pendingApproval: pendingApproval,
        title: title,
        deptCd: deptCd,
        docType: docType,
        regUsrNm: regUsrNm,
        sort: sortValue + 'modDate,desc',
        regDateGoe: regDateGoe,
        regDateLoe: regDateLoe,
      });

      const data = response.data.content.map((item: any, index: number) => {
        // 각 항목에 'index' 속성을 추가합니다.
        return { ...item, index: getPage * getPageSize + index + 1 };
      });
      const getTotalElements = response.data.totalElements;

      setListData(data);
      console.log(data);

      setTotalItems(getTotalElements);
      dispatch(uiActions.setTotalItems(getTotalElements));
    } catch (error) {
      console.log('Error fetching approval list:', error);
    }
  };

  const fetchDocumentCount = async () => {
    try {
      const response = await countDoucumentType();
      const data = response.data;
      console.log(data);
      setDocuemntCnt(data);
      dispatch(selectedActions.setDocumentCnt(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApprovalList();
    fetchDocumentCount();
  }, [getPage, getPageSize, selectMenu, getSearchInput, sortValue, location.pathname]);

  const menuClickHandler = (to: string | null) => {
    dispatch(uiActions.selectMenu(to));
    dispatch(uiActions.resetPage());
    if (to) {
      navigate(to);
    }
  };

  return {
    listData,
    totalItems,
    documentCnt,
    menuClickHandler,
  };
}
