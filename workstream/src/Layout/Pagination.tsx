import { useState } from 'react';

const Pagination = () => {
  const [activePage, setActivePage] = useState(1);

  const handlePageClick = (page: number) => {
    setActivePage(page);
  };

  const renderPage = (page:number, text:string) => (
    <a
      href="#"
      className={`page ${activePage === page ? 'active' : ''}`}
      onClick={() => handlePageClick(page)}
    >
      {text}
    </a>
  );

  return (
    <div className="pagination">
      <a href="#" className="previous">
        <i className="fa-solid fa-angles-left"></i>
      </a>
      <a href="#" className="previous">
        <i className="fa-solid fa-angle-left"></i>
      </a>
      {renderPage(1, '1')}
      {renderPage(2, '2')}
      {renderPage(3, '3')}
      {renderPage(4, '4')}
      {renderPage(5, '5')}
      <a href="#" className="next">
        <i className="fa-solid fa-angle-right"></i>
      </a>
      <a href="#" className="next">
        <i className="fa-solid fa-angles-right"></i>
      </a>
    </div>
  );
};

export default Pagination;
