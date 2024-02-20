import IndexPage from '../IndexPage';
import { columns, searchTags } from './NoticePageTag';
import classes from './NoticePage.module.css';
import { getNoticeList } from '../../api/endpoints/notice';
import { useEffect, useState } from 'react';
import { NoticeList } from '../../types/Main/Main';
import { formatDateOnly } from '../../helpers/formatDateTime';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import DetailNoticeModal from '../../components/Notice/DetailNoticeModal';

const NoticePage = () => {
  const [noticeData, setNoticeData] = useState<NoticeList[]>([]);
  const [goDetail, setGoDetail] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string>('');
  const boardTitle = '전사공지';
  const searchTag = [...searchTags];
  const dispatch = useDispatch();

  useEffect(() => {
    fetchNoticeList();
  }, []);

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
    dispatch(uiActions.setSubToolBar(true));
  }, []);

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
                  <td
                    className="approval-list-title left-align"
                    onClick={() => goDetailPage(item.id)}>
                    <span>{item.title}</span>
                  </td>
                  <td>
                    <span>{item.regUsr}</span>
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
