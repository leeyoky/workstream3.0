import React from 'react';
import Pagination from '../../Layout/Pagination';
import BoardTitle from '../../Layout/BoardTitle';
import SearchBox from '../../Layout/SearchBox';

const ApprovalPage: React.FC = () => {

  const boardTitle = {
    title: '전체문서함'
  }
  
  const searchTags = [
    {label:'문서명', name: 'title'},
    {label:'기안부서', name: 'department'},
    {label:'기안자', name: 'writer'},
    {label:'문서종류', name: 'type'},
    {label:'등록일', name: 'regDate'},
    {label:'결재유형', name: 'approvalType'},
    {label:'진행현황', name: 'status'},
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
    <>
      <BoardTitle title={boardTitle.title}/>
    <div className="index-box">
      <SearchBox tags={searchTags}
        />
      <div className="board-wrapper approval-page-wrapper">
      <table className="table-board">
        <thead>
          <tr className="bg-grey-lighten-5">
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="table-hover">
          </tr>
        </tbody>
      </table>
    </div>
      <Pagination />
    </div>
    </>
  )
}

export default ApprovalPage