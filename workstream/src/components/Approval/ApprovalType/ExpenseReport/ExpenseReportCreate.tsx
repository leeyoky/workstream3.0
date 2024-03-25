import { useSelector } from 'react-redux';
import classes from '../../../../pages/Approval/Approval.module.css';
import ApprovalHeader from '../../ApprovalLayout/ApprovalHeader';
import { RootState } from '../../../../store';
import Signature from '../../ApprovalSign/Signature';
import { useState } from 'react';
import { formatCurrency, numberToKorean } from '../../../../helpers/utils';

const ExpenseReportCreate = () => {
  const today = new Date();
  const year = today.getFullYear(); // 연도
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월
  const day = String(today.getDate()).padStart(2, '0'); // 일
  const getDate = `${year}년 ${month}월 ${day}일`;

  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const [rows, setRows] = useState<
    Array<{
      title: string;
      price: string;
      detail: string;
      total: string;
    }>
  >([{ title: '', price: '', detail: '', total: '' }]);

  // 행 추가
  const addRow = () => {
    if (rows.length >= 10) {
      alert('최대 10개의 행까지만 추가할 수 있습니다.');
      return;
    }
    setRows(prevRows => [
      ...prevRows,
      {
        title: '',
        price: '',
        detail: '',
        total: '',
      },
    ]);

    // 새로운 행이 추가된 후에 해당 행의 첫 번째 input 요소에 포커스를 줌
    setTimeout(() => {
      const newRow = document.querySelector(
        `.${classes['expense-report-table']} tbody tr:last-child`,
      );
      if (newRow) {
        const input = newRow.querySelector('input');
        if (input) {
          input.focus();
        }
      }
    }, 0);
  };

  // 행 삭제
  const handleRowDelete = (index: number) => {
    const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (shouldDelete) {
      const newRows = [...rows];
      newRows.splice(index, 1); // 클릭된 행 삭제
      setRows(newRows);
    }
  };

  // 금액 입력란에 사용자가 입력한 값을 포맷팅하여 입력값을 업데이트하는 함수
  const handlePriceChange = (index: number, value: string) => {
    const formattedValue = formatCurrency(value);
    setRows(prevRows => {
      const newRows = [...prevRows];
      newRows[index].price = formattedValue.replace(/,/g, ''); // 콤마 제거
      return newRows;
    });
  };

  // 모든 금액을 계산하여 소계를 표시하는 함수
  const calculateTotal = () => {
    let total = 0;
    rows.forEach(row => {
      total += parseInt(row.price || '0', 10); // 빈 문자열이나 null을 0으로 처리
    });
    return formatCurrency(total.toString());
  };

  return (
    <form className={`${classes['expense-report-form']} ${classes['purchase-form']}`}>
      <ApprovalHeader></ApprovalHeader>
      <div className={classes['header-box__wrapper']}>
        <div className={classes['header__left']}>
          <h1>지출결의서</h1>
          <p>지출결의서 결제 시 이름과 날짜를 정확히 기입해주세요.</p>
        </div>
        <Signature />
      </div>
      <div className={classes['header-info-msg']}>
        <div>
          일금
          <span className={`${classes['total-cost']} text-align-right`}>
            {numberToKorean(parseInt(calculateTotal().replace(/,/g, '')))}
          </span>
          원
        </div>
        <div>
          ₩{' '}
          <span className={classes['total-cost']}>
            {formatCurrency(calculateTotal().toString())}
          </span>
        </div>
      </div>

      <div className={classes['button-control-box']}>
        <button className="btn" type="button" onClick={addRow}>
          추가
        </button>
      </div>
      <table className={`${classes['content_table']} ${classes['expense-report-table']}`}>
        <thead>
          <tr>
            <th>내 용</th>
            <th>금 액</th>
            <th>상 세</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, index) => (
            <tr key={index}>
              <td>
                <input type="text" className="text-align-center"></input>
              </td>
              <td>
                <input
                  type="text"
                  className="text-align-right"
                  onChange={e => handlePriceChange(index, e.target.value)}></input>
              </td>
              <td>
                <input type="text"></input>
              </td>
              <i className="fa-solid fa-trash-can" onClick={() => handleRowDelete(index)}></i>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>소 계</th>
            <td className="text-align-right">{formatCurrency(calculateTotal().toString())}</td>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <div className={classes['foot-info-msg']}>
        <div>
          <span>위 금액을 청구 합니다.</span>
          <span>{getDate}</span>
        </div>
      </div>
      <div className={classes['reg-info-box']}>
        <div>
          <span>소 속 :</span>
          <span>{userInfo.deptNm}</span>
        </div>
        <div>
          <span>직 위 :</span>
          <span>{userInfo.rankNm}</span>
        </div>
        <div className={classes['user-sign-box']}>
          <span>성 명 :</span>
          <span>{userInfo.empNm}</span>
          <button type="button">서명</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseReportCreate;
