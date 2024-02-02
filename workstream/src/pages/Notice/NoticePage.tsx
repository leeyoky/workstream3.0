import IndexPage from '../IndexPage';
import { columns, data, searchTags } from './NoticePageTag';
import classes from './NoticePage.module.css';

const NoticePage = () => {
  const boardTitle = '전사공지';
  const searchTag = [...searchTags];
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
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr className="table-hover" key={index}>
                  <td>
                    <span>{item.id}</span>
                  </td>
                  <td>
                    <span>{item.category}</span>
                  </td>
                  <td className="approval-list-title left-align">
                    <span>{item.title}</span>
                  </td>
                  <td>
                    <span>{item.regUsr}</span>
                  </td>
                  <td>
                    <span>{item.regDate}</span>
                  </td>
                  <td>
                    <span>{item.file}</span>
                  </td>
                </tr>
              ))
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

export default NoticePage;
