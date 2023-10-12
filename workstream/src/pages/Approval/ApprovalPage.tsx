import React, {useState} from 'react';
import SearchForm from "../../Layout/SearchBox"
import Button from "../../Layout/Button"
import ApprovalCreate from '../../components/Approval/ApprovalCreate';
import Pagination from '../../Layout/Pagination';
import BoardTitle from '../../Layout/BoardTitle';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../store/Approval/approval-slice';

const ApprovalPage: React.FC = (props) => {
  const boardTitle = {
    title: '전자결재'
  }

  const searchForm = {
    writeDate: '기안일',
    form: '결재양식',
    important:'중요도',
    title:'제목',
    status:'결재상태',
    writer:'기안자',
  }

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
  const dispatch = useDispatch();

  // 모달 열기 이벤트 핸들러
  const handleShowModal = () => {
    setIsModalOpen(true);
    dispatch(selectedActions.resetArray());
  }

  // 모달 닫기 이벤트 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <BoardTitle title={boardTitle.title}/>
    <div className="index-box">
      <SearchForm 
        writer={searchForm.writer}
        writeDate={searchForm.writeDate} 
        form={searchForm.form}
        important={searchForm.important}
        title={searchForm.title}
        status ={searchForm.status}
        />
        <Button onShowModal={handleShowModal}>
          새 결재 작성
        </Button>
          {/* 모달 열기 이벤트 전달 */}
          {isModalOpen && <ApprovalCreate onClose={handleCloseModal} isEdit={false}/>}
        {/* 모달이 열려 있을 때 ApprovalCreate 컴포넌트를 렌더링하고, 닫기 이벤트 핸들러 전달 */}
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
            <th>첨부파일</th>
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