import SearchForm from "../components/SearchForm"

const AddressPage = () => {
  return (
    <>
    <div className="board-title">
      <p>주소록</p>
      <hr />
    </div>
  <div className="index-box">
    <SearchForm />
    <div className="board-wrapper">
      <table className="table-board">
        <thead>
          <tr className="bg-grey-lighten-5">
            <th>이름</th>
            <th>부서</th>
            <th>직책</th>
            <th>직위</th>
            <th>내선</th>
            <th>핸드폰</th>
            <th>Email</th>
            <th>자택번호</th>
            <th>입사일</th>
            <th>생일</th>
            <th>소속그룹</th>
            <th>현재프로젝트</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-hover">
            <td>
            </td>
            <td></td>
            <td></td>
            <td></td>
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

export default AddressPage