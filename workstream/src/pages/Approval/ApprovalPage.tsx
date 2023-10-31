import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getApprovalList } from './../../api/axios';
import { ApprovalListItem } from './ApprovalType';
import IndexPage from '../IndexPage';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const ApprovalPage: React.FC = () => {
  const [listData, setListData] = useState<ApprovalListItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const selectMenu = useSelector((state:RootState) => state.ui.selectMenu);
  const getPageSize = useSelector((state:RootState) => state.ui.selectPageSize);
  const getPage = useSelector((state:RootState) => state.ui.selectPage);
  const getSearchInput = useSelector((state:RootState) => state.ui.searchInput);
  const dispatch = useDispatch();

  
  const fetchApprovalList = async () => {
    try {
      const { title, deptCd, docType, regUsrNm, state } = getSearchInput;
      const pending = selectMenu === '/approval/pending' ? 'Y' : '';
      console.log('state : ' , getSearchInput);
      
      const response = await getApprovalList({
        page: getPage,
        pageSize: getPageSize,
        state: state,
        pending: pending,
        title: title,
        deptCd: deptCd,
        docType: docType,
        regUsrNm: regUsrNm,
      });

      const data = response.data.content;
      const getTotalElements = response.data.totalElements;

      setListData(data);
      setTotalItems(getTotalElements);

      dispatch(uiActions.setTotalItems(getTotalElements));

    } catch (error) {
      console.log('Error fetching approval list:', error);
    }
  }

  useEffect(() => {
    
    let state = '';
    let pending = '';

    if (selectMenu === '/approval/temporary') {
      state = 'TEMP';
    } else if (selectMenu === '/approval/in-progress') {
      state = 'PROCEEDING';
    } else if (selectMenu === '/approval/completed') {
      state = 'APPROVED';
    } else if (selectMenu === '/approval/rejected') {
      state = 'REJECTED';
    } else if (selectMenu === '/approval/pending') {
      pending = "Y";
    }

    // API 호출
    fetchApprovalList();
  }, [getPage, getPageSize, selectMenu, getSearchInput]);

  let boardTitle = {
    title: ''
  }

  if (selectMenu === '/approval/temporary') {
    boardTitle.title = '전자결재 > 임시보관함';
  } else if (selectMenu === '/approval/document') {
    boardTitle.title = '전자결재 > 전체문서함';
  } else if (selectMenu === '/approval/pending') {
    boardTitle.title = '전자결재 > 결재대기함';
  } else if (selectMenu === '/approval/in-progress') {
    boardTitle.title = '전자결재 > 결재진행함';
  } else if (selectMenu === '/approval/completed') {
    boardTitle.title = '전자결재 > 완료문서함';
  } else if (selectMenu === '/approval/rejected') {
    boardTitle.title = '전자결재 > 반려문서함';
  }

  const searchTags = [
    {label:'문서명', name: 'title'},
    {label:'기안부서', name: 'deptCd', type: 'select', options: [
      {label : '전체' , value: ''},
      {label : 'KM팀' , value: '2016002252'},
      {label : '전체' , value: ''},
    ]},
    {label:'기안자', name: 'regUsrNm'},
    {label:'문서종류', name: 'type'},
    {label:'등록일', name: 'regDate'},    /* 추후 수정 */
    {label:'진행현황', name: 'state', type: 'select', options: [
      { label: '전체' , value: ''},
      { label: '결재대기' , value: ''},
      { label: '진행중' , value: ''},
      { label: '완료' , value: ''},
      { label: '반려' , value: ''},
      { label: '임시저장' , value: ''}
    ]},
  ]

  const columns = [
    '구분',
    '문서명',
    '문서종류',
    '기안부서',
    '기안자',
    '등록일',
    '결재유형',
    '진행현황',
  ];

  return (
    <IndexPage boardTitle={boardTitle.title} searchTags={searchTags}>
      <div className="board-wrapper approval-page-wrapper">
        <table className="table-board">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listData.length > 0 ? (
              listData.map((item, index) => {
                let statusLabel;
                if (item.state === 'APPROVED') {
                  statusLabel = '완료';
                } else if (item.state === 'PROCEEDING') {
                  statusLabel = '진행중';
                } else if (item.state === 'REJECTED') {
                  statusLabel = '반려';
                } else if (item.state === 'TEMP') {
                  statusLabel = '임시저장';
                } else {
                  statusLabel = '결재대기';
                }

                let documentType;
                if (item.docType === 'APPROVAL_COMMON') {
                  documentType = '품의서';
                } else if (item.docType === 'RESIGNATION') {
                  documentType = '사직서';
                }

                // regDate를 가공
                const regDate = new Date(item.regDate);
                const formattedRegDate = regDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식

                return (
                  <tr className="table-hover" key={index}>
                    <td><span>{index + 1}</span></td>
                    <td>
                      <span>{item.title}</span>
                    </td>
                    <td><span>{documentType}</span></td>
                    <td><span>{item.regUsrDeptNm}</span></td>
                    <td><span>{item.regUsrNm}</span></td>
                    <td><span>{formattedRegDate}</span></td>
                    <td><span>결재+합의</span></td>
                    <td>
                      <div>
                        <span 
                          className={`badge ${statusLabel === '진행중' ? 'badge-info' : 
                          statusLabel === '완료' ? 'badge-success' : 
                          statusLabel === '반려' ? 'badge-warning' : 
                          statusLabel === '결재대기' ? 'badge-primary' : 
                          ''
                          }`}>
                          {statusLabel}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="table-not-exist">
                <td colSpan={8}>
                  작성 된 글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </IndexPage>
  )
}

export default ApprovalPage;
