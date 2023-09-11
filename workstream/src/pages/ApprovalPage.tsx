import { useState } from "react"
import SearchForm from "../components/SearchForm"

const ApprovalPage: React.FC = () => {

  const [modalActive, setModalActive] = useState(false);

  const modalHandler = () => {
    setModalActive(!modalActive);
  }
  const activeClass = modalActive? '' : 'hidden';

  return (
    <>
      <div className="board-title">
        <p>전자결재</p>
        <hr />
      </div>
    <div className="index-box">
      <SearchForm 
        writeDate="기안일" 
        form="결재양식"
        important="중요도"
        title="제목"
        status ="진행상태"
        writer="기안자"
        attach="첨부파일"/>
      <div className="button-box">
        <button className="write-btn" onClick={modalHandler}>결재 작성</button>
      </div>

      <div className={`modal ${activeClass}`}>
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <h1>modal~~~~~~~~~~~~~~~~~</h1>
          <button onClick={modalHandler}>x</button>
        </div>
      </div>

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