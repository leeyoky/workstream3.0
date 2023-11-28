import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { RootState } from '../../../store';

const Pagination = () => {
  const activePage = useSelector((state: RootState) => state.ui.selectPage);
  const totalItems = useSelector((state: RootState) => state.ui.totalItems);
  const pageSize = useSelector((state: RootState) => state.ui.selectPageSize);
  const totalPages = Math.ceil(totalItems / pageSize);
  const dispatch = useDispatch();

  const handlePageClick = (page: number) => {
    dispatch(uiActions.selectPage(page));
  };

  // 페이지 이동 함수
  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      handlePageClick(page);
    }
  }

  // 페이지 버튼을 동적으로 생성
  const pages = Array.from({ length: totalPages }, (_, index) => index);

  return (
    <div className="pagination">
      <button className="previous" onClick={() => goToPage(0)}>
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <button className="previous" onClick={() => goToPage(activePage - 1)}>
        <i className="fa-solid fa-angle-left"></i>
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`page ${activePage === page ? 'active' : ''}`}
          onClick={() => goToPage(page)}
        >
          {page + 1}
        </button>
      ))}
      <button className="next" onClick={() => goToPage(activePage + 1)}>
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <button className="next" onClick={() => goToPage(totalPages - 1)}>
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
