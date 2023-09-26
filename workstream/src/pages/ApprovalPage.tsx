import SearchForm from "../UI/SearchForm"
import BoardTitle from "../UI/BoardTitle"
import Modal from "../UI/Modal"

const ApprovalPage: React.FC = (props) => {
  const boardTitle = {
    title: '전자결재'
  }

  const searchForm = {
    writeDate: '기안일',
    form: '결재양식',
    important:'중요도',
    title:'제목',
    status:'진행상태',
    writer:'기안자',
    attach: '첨부파일'
  }

  return (
    <>
      <BoardTitle title={boardTitle.title}/>
    <div className="index-box">
      <SearchForm 
        writeDate={searchForm.writeDate} 
        form={searchForm.form}
        important={searchForm.important}
        title={searchForm.title}
        status ={searchForm.status}
        writer={searchForm.writer}
        attach={searchForm.attach}/>

      <Modal onClick={props.hideModalHandler}/>

      <div className="board-wrapper">
      <table className="table-board">
        <thead>
          <tr className="bg-grey-lighten-5">
            <th>기안일</th>
            <th>결재양식</th>
            <th>중요도</th>
            <th>제목</th>
            <th>결재상태</th>
            <th>기안자</th>
            <th>첨부</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-hover">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    </>
  )
}

export default ApprovalPage