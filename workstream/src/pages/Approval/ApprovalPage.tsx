import React, { useEffect, useState, useMemo } from 'react';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { columns, searchTags, progressSearchTags } from './ApprovalSearchTag';
import { selectedActions } from '../../store/Approval/approval-slice';
import { useApprovalList } from '../../hooks/Approval/useApprovalList';
import IndexPage from '../IndexPage';
import {
  DOCUMENT_TYPES,
  MENU_PATHS,
  STATUS_LABELS,
  COLUMN_SORT_ATTRIBUTES,
} from '../../constants/constants';

const ApprovalPage: React.FC = () => {
  const [sortValue, setSortValue] = useState<string>('');
  const [sortDirections, setSortDirections] = useState<Record<string, 'asc' | 'desc' | ''>>(
    columns.reduce(
      (acc, column) => {
        acc[column.name] = column.name === '기안일자' ? 'desc' : '';
        return acc;
      },
      {} as Record<string, 'asc' | 'desc' | ''>,
    ),
  );
  const [currentSortColumn, setCurrentSortColumn] = useState<string | null>(null);

  const selectMenu = useSelector((state: RootState) => state.ui.selectMenu || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/approval/document');
    setSortValue('modDate,desc');
  }, []);

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

  const toggleSortDirection = (column: string) => {
    setSortDirections(prevSortDirections => {
      const newSortDirections = { ...prevSortDirections };

      // 현재 정렬 중인 컬럼 이외의 나머지 컬럼을 모두 초기값으로 리셋
      Object.keys(newSortDirections).forEach(key => {
        if (key !== column) {
          newSortDirections[key] = '';
        }
      });

      // 현재 컬럼 토글
      newSortDirections[column] =
        newSortDirections[column] === ''
          ? 'asc'
          : newSortDirections[column] === 'asc'
          ? 'desc'
          : '';

      // Set currentSortColumn state
      setCurrentSortColumn(column);

      return newSortDirections;
    });
  };

  /* 정렬 함수 */
  const sortHandler = (column: string) => {
    // 현재 정렬 중인 열이 다른 열을 클릭한 경우, 초기값을 설정
    if (currentSortColumn && currentSortColumn !== column) {
      setSortDirections(prevSortDirections => ({
        ...prevSortDirections,
        [column]: '',
      }));

      setSortValue(`${COLUMN_SORT_ATTRIBUTES[column]},desc`);
      toggleSortDirection(column);
    } else {
      let newSortValue = '';

      if (sortDirections[column] === 'desc') {
        newSortValue = 'modDate,desc';
      } else {
        // 컬럼별 정렬 방향 설정
        const sortOrder =
          sortDirections[column] === '' ? 'asc' : sortDirections[column] === 'asc' ? 'desc' : '';

        // 선택된 컬럼에 따라 새로운 정렬 방향 설정
        newSortValue = `${COLUMN_SORT_ATTRIBUTES[column]},${sortOrder}`;
      }

      setSortValue(newSortValue);
      toggleSortDirection(column);
    }
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
            className="approval-list-title left-align"
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
            <span>{item.executeDate ? item.executeDate : '-'}</span>
          </td>
          <td>
            {item.lineType === '순차' || item.lineType === '병렬' ? (
              <span>결재+합의</span>
            ) : (
              <span>결재</span>
            )}
          </td>
          <td>
            <span>{item.commentCount}</span>
          </td>
          <td>
            {item.fileCount > 0 && (
              <span className="approval-list__paperclip">
                <i className="fa-solid fa-paperclip"></i>
              </span>
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
                  <span
                    className={`table-title-header ${
                      currentSortColumn === column.name && sortDirections[column.name] !== ''
                        ? `sorted-${sortDirections[column.name]}`
                        : ''
                    }`}
                    onClick={() => sortHandler(column.name)}>
                    <span>{column.name}</span>
                    {index !== 0 && column.sort === true && (
                      <i
                        className={`fa-solid ${
                          sortDirections[column.name] === ''
                            ? 'fa-sort'
                            : sortDirections[column.name] === 'asc'
                            ? 'fa-sort-up'
                            : 'fa-sort-down'
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
                <td colSpan={12}>작성된 글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </IndexPage>
  );
};

export default ApprovalPage;
