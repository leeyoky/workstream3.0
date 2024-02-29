import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { formatDateOnly } from '../../helpers/formatDateTime';
import { uiActions } from '../../store/ui-slice';
import { columns, getCategoryLabel, searchTags } from './NoticePageTag';

import classes from './NoticePage.module.css';
import IndexPage from '../IndexPage';
import DetailNoticeModal from '../../components/Notice/DetailNoticeModal';
import useNoticeList from './../../hooks/Notice/useNoticeList';

const NoticePage = () => {
  const [goDetail, setGoDetail] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string>('');
  const { fetchNoticeList, noticeData } = useNoticeList();
  const searchTag = [...searchTags];
  const dispatch = useDispatch();

  const boardTitle = '전사공지';

  useEffect(() => {
    dispatch(uiActions.setSubToolBar(true));
  }, []);

  useEffect(() => {
    fetchNoticeList();
  }, [goDetail]);

  const goDetailPage = (id: string) => {
    setSelectedNoticeId(id);
    setGoDetail(prevState => !prevState);
  };

  // 모달 닫기 이벤트 핸들러
  const handleCloseModal = () => {
    setGoDetail(false);
  };

  return (
    <IndexPage boardTitle={boardTitle} searchTags={searchTag}>
      <div className="board-wrapper">
        <table className="table-board">
          <thead>
            <tr>
              {columns.map((columns, index) => (
                <th key={index}>
                  <span>{columns.name}</span>
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
                    <span></span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="table-not-exist">
                <td colSpan={12}>작성된 글이 없습니다.</td>
              </tr>
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
