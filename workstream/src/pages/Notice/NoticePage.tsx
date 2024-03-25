import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { formatDateOnly } from '../../helpers/formatDateTime';
import { uiActions } from '../../store/ui-slice';
import { columns, getCategoryLabel, searchTags } from './NoticePageTag';

import classes from './NoticePage.module.css';
import IndexPage from '../IndexPage';
import DetailNoticeModal from '../../components/Notice/DetailNoticeModal';
import useNoticeList from './../../hooks/Notice/useNoticeList';
import DataNotExist from '../Common/DataNotExist';
import { NOTICE_COLUMN_SORT_ATTRIBUTES } from '../../constants/constants';
import useSortColumn from '../../hooks/Common/useSortColumn';

const NoticePage = () => {
  const [goDetail, setGoDetail] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string>('');
  const searchTag = [...searchTags];
  const dispatch = useDispatch();
  const { sortValue, sortDirections, currentSortColumn, sortHandler } = useSortColumn(
    'regDate',
    'desc',
    NOTICE_COLUMN_SORT_ATTRIBUTES,
  );
  const { fetchNoticeList, noticeData } = useNoticeList(sortValue);

  const boardTitle = '공지사항';

  useEffect(() => {
    dispatch(uiActions.setSubToolBar(true));
    fetchNoticeList();
  }, [goDetail]);

  const goDetailPage = (id: string) => {
    setSelectedNoticeId(id);
    setGoDetail(prevState => !prevState);
  };

  // 모달 닫기 이벤트 핸들러
  const handleCloseModal = () => {
    setGoDetail(prevState => !prevState);
    fetchNoticeList();
  };

  return (
    <IndexPage boardTitle={boardTitle} searchTags={searchTag}>
      <div className="board-wrapper">
        <table className="table-board">
          <thead>
            <tr>
              {columns.map((columns, index) => (
                <th key={index}>
                  <span
                    className={`table-title-header ${
                      currentSortColumn === columns.name && sortDirections[columns.name] !== ''
                        ? `sorted-${sortDirections[columns.name]}`
                        : ''
                    }`}
                    onClick={() => sortHandler(columns.name)}>
                    <span>{columns.name}</span>
                    {index !== 0 && columns.sort === true && (
                      <i
                        className={`fa-solid ${
                          sortDirections[columns.name] === ''
                            ? 'fa-sort'
                            : sortDirections[columns.name] === 'asc'
                            ? 'fa-sort-up'
                            : 'fa-sort-down'
                        }`}></i>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={classes['notice-tbody']}>
            {noticeData.length > 0 ? (
              noticeData.map((item, index) => (
                <tr className="table-hover" key={index}>
                  <td>
                    <span>{getCategoryLabel(item.category)}</span>
                  </td>
                  <td
                    className="approval-list-title left-align"
                    onClick={() => goDetailPage(item.id)}>
                    <span>{item.title}</span>
                  </td>
                  <td>
                    <span>{item.regUsrNm}</span>
                  </td>
                  <td>
                    <span>{formatDateOnly(item.regDate)}</span>
                  </td>
                  <td>
                    <span>{item.popupYn}</span>
                  </td>
                  <td>
                    {item.fileCount > 0 && (
                      <span className="approval-list__paperclip">
                        <i className="fa-solid fa-paperclip"></i>
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <DataNotExist />
            )}
            {goDetail && (
              <DetailNoticeModal noticeId={selectedNoticeId} onClose={handleCloseModal} />
            )}
          </tbody>
        </table>
      </div>
    </IndexPage>
  );
};

export default NoticePage;
