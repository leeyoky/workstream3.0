import React, { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { columns, searchTags, progressSearchTags } from './ApprovalSearchTag';
import { selectedActions } from '../../store/Approval/approval-slice';
import { useApprovalList } from '../../hooks/Approval/useApprovalList';
import IndexPage from '../IndexPage';
import { DOCUMENT_TYPES, MENU_PATHS, STATUS_LABELS } from '../../constants/constants';

const ApprovalPage: React.FC = () => {
  // sort 값 상태 관리 state
  const [sortValue , setSortValue] = useState<string>('');
  // sort icon 정렬 방향 관리 state
  const [sortDirections, setSortDirections] = useState<Record<string, 'asc' | 'desc'>>(columns.reduce((acc, column) => {
    acc[column] = 'asc';
    return acc;
  }, {} as Record<string, 'asc' | 'desc'>));
  
  // 선택한 메뉴 정보
  const selectMenu = useSelector((state: RootState) => state.ui.selectMenu || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{},[location.pathname])

  // 메뉴 제목
  const getMenuTitle = (menuPath: string): string => {
    const menuTitles: Record<string, string> = {
      [MENU_PATHS.TEMPORARY]: '임시보관함',
      [MENU_PATHS.DOCUMENT]: '전체문서함',
      [MENU_PATHS.PENDING]: '결재대기함',
      [MENU_PATHS.IN_PROGRESS]: '결재진행함',
      [MENU_PATHS.COMPLETED]: '완료문서함',
      [MENU_PATHS.REJECTED]: '반려문서함',
    };
    return menuTitles[menuPath] || '';
  };

  // 아이콘 변경
  const toggleSortDirection = (column: string) =>
  setSortDirections((prevSortDirections) => ({
    ...prevSortDirections,
    [column]: prevSortDirections[column] === 'asc' ? 'desc' : 'asc',
  }));

  // 테이블 헤더 클릭 시 아이콘 변경 및 api 전달 값 설정
  const sortHandler = (column: string) => {
    let newSortValue = '';
    // 각 열에 따라 새로운 정렬 값을 설정
    if (column === '문서명') {
      newSortValue = sortDirections[column] === 'asc' ? 'title,asc&' : 'title,desc&';
    }
    if (column === '문서종류') {
      newSortValue = sortDirections[column] === 'asc' ? 'docType,desc&' : 'docType,asc&';
    }
    if (column === '기안자') {
      newSortValue = sortDirections[column] === 'asc' ? 'regUsr,desc&' : 'regUsr,asc&';
    }
    if (column === '등록일') {
      newSortValue = sortDirections[column] === 'asc' ? 'regDate,desc&' : 'regDate,asc&';
    }
    if (column === '진행현황') {
      newSortValue = sortDirections[column] === 'asc' ? 'state,desc&' : 'state,asc&';
    }
    setSortValue(newSortValue);
    toggleSortDirection(column);
  };

  const { listData, totalItems } = useApprovalList(sortValue);

  // 검색 태그 설정
  const searchTagsToUse = selectMenu === '/approval/document' ? [...searchTags, ...progressSearchTags] : searchTags;
  const boardTitle = `전자결재 > ${getMenuTitle(selectMenu)} (${totalItems})`;

  const goDetailPage = (isDetail: boolean, id: string, docType: string) => {
    navigate(`/approval/detail/${id}`, { state: { isDetail } });
    console.log('docType', isDetail, id, docType);
    
    dispatch(selectedActions.updateDocumentType(docType));
  };

  return (
    <IndexPage boardTitle={boardTitle} searchTags={searchTagsToUse}>
      <div className="board-wrapper approval-page-wrapper">
        <table className="table-board">
          <thead>
            <tr>
            {columns.map((column, index) => (
            <th key={index}>
              <span className='table-title-header' onClick={()=> sortHandler(column)}>
                <span>{column}</span>
                {index !== 0 && (
                  <i className={`fa-solid fa-sort-${sortDirections[column] === 'asc' ? 'down' : 'up'}`}></i>
                )}
              </span>
            </th>
            ))}
            </tr>
          </thead>
          <tbody>
            {listData.length > 0 ? (
              listData.map((item, index) => {
                const regDate = new Date(item.regDate);
                const formattedRegDate = regDate.toISOString().split('T')[0];
                const documentType = DOCUMENT_TYPES[item.docType] || '';
                const statusLabel = STATUS_LABELS[item.state] || '결재대기';
                const isProceedingWithPending = item.state === 'PROCEEDING' && item.pendingApproval === 'Y';

                return (  
                  <tr 
                    className="table-hover" 
                    key={index} 
                  >
                    <td><span>{item.index}</span></td>
                    <td>
                      <span className="approval-list-title" onClick={() => goDetailPage(true, item.id, item.docType)}>
                        {item.title}
                      </span>
                    </td>
                    <td><span>{documentType}</span></td>
                    <td><span>{item.regUsrDeptNm}</span></td>
                    <td><span>{item.regUsrNm}</span></td>
                    <td><span>{formattedRegDate}</span></td>
                    <td>{item.lineType === '순차' || item.lineType === '병렬' ? (
                      <span>결재+합의</span>
                    ) : (
                      <span>결재</span>
                    )}</td>
                    <td>
                      <div>
                        <span 
                          className={`status-badge ${
                            isProceedingWithPending ? 'badge-warning' : 
                            statusLabel === '진행중' ? 'badge-success' : 
                            statusLabel === '완료' ? 'badge-info' : 
                            statusLabel === '반려' ? 'badge-accent' : 
                            statusLabel === '임시' ? 'badge-temp' : 
                            ''
                          }`}
                        >
                          {isProceedingWithPending ? '결재대기' : statusLabel}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="table-not-exist">
                <td colSpan={8}>
                  작성된 글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </IndexPage>
  );
}

export default ApprovalPage;
