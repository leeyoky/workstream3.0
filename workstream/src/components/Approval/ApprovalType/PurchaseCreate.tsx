import { useSelector } from 'react-redux';
import classes from '../../../pages/Approval/Approval.module.css';
import ApprovalHeader from '../ApprovalLayout/ApprovalHeader';
import { RootState } from '../../../store';
import Signature from '../ApprovalSign/Signature';
import { formatCurrency } from '../../../helpers/utils';
import { useState } from 'react';

const PurchaseCreate = () => {
  const today = new Date();
  const getDate = today.toISOString().slice(0, 10);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [rows, setRows] = useState<
    Array<{
      type: string;
      title: string;
      quantity: string;
      unitPrice: string;
      total: string;
    }>
  >([{ type: '', title: '', quantity: '', unitPrice: '', total: '' }]);

  /* 분류 선택 */

  const handleTypeChange = (index: number, type: string) => {
    const newRows = [...rows];
    newRows[index].type = type;
    setRows(newRows);

    if (type === 'BOOK') {
      alert('도서의 경우 비고란에 ISBN번호를 꼭 기재해야 합니다.');
    }
  };

  /* 수량 조절 */
  const handleQuantityChange = (index: number, quantity: string) => {
    const newRows = [...rows];
    newRows[index].quantity = quantity;
    newRows[index].total = calculateRowTotal(quantity, newRows[index].unitPrice);
    setRows(newRows);
  };

  /* 단가 조절 */
  const handleUnitPriceChange = (index: number, unitPrice: string) => {
    const newRows = [...rows];
    newRows[index].unitPrice = unitPrice;
    newRows[index].total = calculateRowTotal(newRows[index].quantity, unitPrice);
    setRows(newRows);
  };

  /* row 금액 합산 */
  const calculateRowTotal = (quantity: string, unitPrice: string) => {
    const parsedQuantity = parseFloat(quantity.replace(/,/g, ''));
    const parsedUnitPrice = parseFloat(unitPrice.replace(/,/g, ''));
    const total = parsedQuantity * parsedUnitPrice;
    const formattedTotal = total.toString().split('.')[0];
    return isNaN(total) ? '' : formatCurrency(formattedTotal);
  };

  /* 수량 합산 */
  const calculateTotalQuantity = () => {
    return rows.reduce((total, row) => {
      const quantity = parseFloat(row.quantity.replace(/,/g, '') || '0');
      return total + quantity;
    }, 0);
  };

  /* 총 금액 합계 */
  const calculateTotalAmount = () => {
    return rows.reduce((total, row) => {
      const amount = parseFloat(row.total.replace(/,/g, '') || '0');
      return total + amount;
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

  // const handleInsertComma = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.target.value = formatCurrency(e.target.value);
  // };

  const addRow = () => {
    if (rows.length >= 15) {
      alert('최대 15개의 행까지만 추가할 수 있습니다.');
      return;
    }
    setRows(prevRows => [
      ...prevRows,
      {
        type: '',
        title: '',
        quantity: '',
        unitPrice: '',
        total: '',
      },
    ]);
  };

  return (
    <form className={classes['purchase-form']}>
      <ApprovalHeader>구 매 기 안 서</ApprovalHeader>
      <div className={classes['header-table-wrapper']}>
        <table className={classes['header-info-table']}>
          <tr>
            <th>문서번호</th>
            <td>DS -</td>
          </tr>
          <tr>
            <th>부서명</th>
            <td>{userInfo.deptNm}</td>
          </tr>
          <tr>
            <th>기안자</th>
            <td>{userInfo.empNm}</td>
          </tr>
          <tr>
            <th>기안일자</th>
            <td>{getDate}</td>
          </tr>
        </table>
        <Signature />
      </div>
      <div className={classes['button-control-box']}>
        <button className="btn" type="button" onClick={addRow}>
          항목 추가
        </button>
      </div>
      <table className={classes['content_table']}>
        <thead>
          <th>종류</th>
          <th>제목</th>
          <th>수량</th>
          <th>단가</th>
          <th>금액</th>
          <th>비고</th>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <>
              <tr key={index}>
                <td>
                  <select onChange={e => handleTypeChange(index, e.target.value)}>
                    <option></option>
                    <option value={'BOOK'}>도서</option>
                    <option value={'PRODUCT'}>물품</option>
                    <option value={'ETC'}>기타</option>
                  </select>
                </td>
                <td>
                  <input type="text"></input>
                </td>
                <td>
                  <input
                    type="number"
                    min={0}
                    className="text-align-center"
                    onChange={e => handleQuantityChange(index, e.target.value)}></input>
                </td>
                <td>
                  <input
                    type="text"
                    className="text-align-right"
                    value={row.unitPrice}
                    onChange={e => handleUnitPriceChange(index, e.target.value)}></input>
                </td>
                <td>
                  <input type="text" className="text-align-right" value={row.total}></input>
                </td>
                <td>
                  <input type="text"></input>
                </td>
                <i className="fa-solid fa-trash-can" onClick={() => handleRowDelete(index)}></i>
              </tr>
            </>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>합계</th>
            <td className="text-align-center">
              <span>{formatCurrency(calculateTotalQuantity().toString())}</span>
            </td>
            <th></th>
            {/* 금액 Total */}
            <td className="text-align-right">
              <span>{formatCurrency(calculateTotalAmount().toString())}</span>
            </td>
            <th></th>
          </tr>
          <tr>
            <th colSpan={1}>구매사유</th>
            <td colSpan={5}>
              <div>
                <textarea spellCheck={false}></textarea>
              </div>
            </td>
          </tr>
          <tr>
            <th colSpan={1}>산출근거</th>
            <td colSpan={5}>
              <textarea spellCheck={false}></textarea>
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  );
};

export default PurchaseCreate;
