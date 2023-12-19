import React, { useEffect, useState, useMemo } from 'react';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { columns, searchTags, progressSearchTags } from './ApprovalSearchTag';
import { selectedActions } from '../../store/Approval/approval-slice';
import { useApprovalList } from '../../hooks/Approval/useApprovalList';
import IndexPage from '../IndexPage';
import { DOCUMENT_TYPES, MENU_PATHS, STATUS_LABELS } from '../../constants/constants';

const ApprovalPage: React.FC = () => {
  const [sortValue, setSortValue] = useState<string>('');
  const [sortDirections, setSortDirections] = useState<Record<string, 'asc' | 'desc'>>(
    columns.reduce(
      (acc, column) => {
        acc[column] = 'asc';
        return acc;
      },
      {} as Record<string, 'asc' | 'desc'>,
    ),
  );

  const selectMenu = useSelector((state: RootState) => state.ui.selectMenu || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [location.pathname, selectMenu]);

  const getMenuTitle = (menuPath: string): string => {
    const menuTitles: Record<string, string> = {
      [MENU_PATHS.TEMPORARY]: '임시보관함',
      [MENU_PATHS.DOCUMENT]: '전체문서함',
      [MENU_PATHS.PENDING]: '결재대기중',
      [MENU_PATHS.IN_PROGRESS]: '결재진행함',
      [MENU_PATHS.COMPLETED]: '완료문서함',
      [MENU_PATHS.REJECTED]: '반려문서함',
    };
    return menuTitles[menuPath] || '';
  };

  const toggleSortDirection = (column: string) =>
    setSortDirections(prevSortDirections => ({
      ...prevSortDirections,
      [column]: prevSortDirections[column] === 'asc' ? 'desc' : 'asc',
    }));

  const sortHandler = (column: string) => {
    let newSortValue = '';
    if (column === '문서번호') {
      newSortValue = sortDirections[column] === 'asc' ? 'id,asc&' : 'id,desc&';
    }
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
      newSortValue = sortDirections[column] === 'asc' ? 'modDate,desc&' : 'modDate,asc&';
    }
    if (column === '진행현황') {
      newSortValue = sortDirections[column] === 'asc' ? 'state,desc&' : 'state,asc&';
    }
    setSortValue(newSortValue);

    toggleSortDirection(column);
  };

  const { listData, totalItems } = useApprovalList(sortValue);

  const searchTagsToUse =
    selectMenu === '/approval/document' ? [...searchTags, ...progressSearchTags] : searchTags;
  const boardTitle = `전자결재 > ${getMenuTitle(selectMenu)} (${totalItems})`;

  const goDetailPage = (isDetail: boolean, id: string, docType: string) => {
    navigate(`/approval/detail/${id}`, { state: { isDetail } });
    dispatch(selectedActions.updateDocumentType(docType));
  };

  const memoizedList = useMemo(() => {
    return listData.map((item, index) => {
      const modDate = new Date(item.modDate);
      const formattedRegDate = modDate.toISOString().split('T')[0];
      const documentType = DOCUMENT_TYPES[item.docType] || '';
      const statusLabel = STATUS_LABELS[item.state] || '결재대기';
      const isProceedingWithPending = item.state === 'PROCEEDING' && item.pendingApproval === 'Y';

      return (
        <tr className="table-hover" key={index}>
          <td>
            <span>{item.index}</span>
          </td>
          <td>
            <span>{item.id}</span>
          </td>
          <td
            className="approval-list-title"
            onClick={() => goDetailPage(true, item.id, item.docType)}>
            <span>{item.title}</span>
          </td>
          <td>
            <span>{documentType}</span>
          </td>
          <td>
            <span>{item.regUsrDeptNm}</span>
          </td>
          <td>
            <span>{item.regUsrNm}</span>
          </td>
          <td>
            <span>{formattedRegDate}</span>
          </td>
          <td>
            {item.lineType === '순차' || item.lineType === '병렬' ? (
              <span>결재+합의</span>
            ) : (
              <span>결재</span>
            )}
          </td>
          <td>
            <div>
              <span
                className={`status-badge ${
                  isProceedingWithPending
                    ? 'badge-warning'
                    : statusLabel === '진행중'
                    ? 'badge-success'
                    : statusLabel === '완료'
                    ? 'badge-info'
                    : statusLabel === '반려'
                    ? 'badge-denger'
                    : statusLabel === '임시저장'
                    ? 'badge-temp'
                    : ''
                }`}>
                {isProceedingWithPending ? '결재대기' : statusLabel}
              </span>
            </div>
          </td>
        </tr>
      );
    });
  }, [listData]);

  return (
    <IndexPage boardTitle={boardTitle} searchTags={searchTagsToUse}>
      <div className="board-wrapper approval-page-wrapper">
        <table className="table-board">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>
                  <span className="table-title-header" onClick={() => sortHandler(column)}>
                    <span>{column}</span>
                    {index !== 0 && (
                      <i
                        className={`fa-solid fa-sort-${
                          sortDirections[column] === 'asc' ? 'down' : 'up'
                        }`}></i>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {memoizedList.length > 0 ? (
              memoizedList
            ) : (
              <tr className="table-not-exist">
                <td colSpan={8}>작성된 글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </IndexPage>
  );
};

export default ApprovalPage;
