import classes from '../../../pages/Approval/Approval.module.css';
import logoSmall from '../../../assets/img/logo.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import SignatureApprovalSection from '../ApprovalSign/SignatureApprovalSection';
import DatePick from '../../DatePick';
import { useState } from 'react';

const TransportationCreate = () => {
  const today = new Date();
  const getDate = today.toISOString().slice(0, 10);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [rows, setRows] = useState<
    Array<{
      date: Date | null;
      reason: string;
      section: string;
      transportation: string;
      amount: string;
    }>
  >([
    {
      date: null,
      reason: '',
      section: '',
      transportation: '',
      amount: '',
    },
  ]);

  const addRow = () => {
    setRows(prevRows => [
      ...prevRows,
      {
        date: null,
        reason: '',
        section: '',
        transportation: '',
        amount: '',
      },
    ]);
  };
  const handleInputChange = (index: number, field: string, value: string) => {
    setRows(prevRows => {
      const newRows = [...prevRows];
      newRows[index] = {
        ...newRows[index],
        [field]: value,
      };
      return newRows;
    });
  };

  const handleDateChange = (index: number, date: Date | null) => {
    setRows(prevRows => {
      const newRows = [...prevRows];
      newRows[index] = {
        ...newRows[index],
        date: date,
      };
      return newRows;
    });
  };

  return (
    <form className={classes['transporm-form']}>
      <header>
        <div className={classes['header-logo']}>
          <img src={logoSmall} alt="Logo" />
        </div>
        <div className={classes['header-title']}>
          <b>대중교통비 사용 지급신청서</b>
        </div>
      </header>
      <div className={classes['header-table-wrapper']}>
        <table className={classes['header-info-table']}>
          <tr>
            <th>부서명</th>
            <td>{userInfo.deptNm}</td>
          </tr>
          <tr>
            <th>신청자</th>
            <td>{userInfo.empNm}</td>
          </tr>
          <tr>
            <th>신청일자</th>
            <td>{getDate}</td>
          </tr>
          <tr>
            <th>지출총액</th>
            <td></td>
          </tr>
        </table>
        <table>
          <SignatureApprovalSection />
        </table>
      </div>
      <div className={classes['transportation__btn-wrapper']}>
        <button type="button" className="btn btn-primary" onClick={addRow}>
          +
        </button>
      </div>
      <table className={classes['transportation__table_content']}>
        <thead>
          <tr>
            <th>일자</th>
            <th>사유</th>
            <th>구간</th>
            <th>교통편</th>
            <th>건별금액</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <DatePick
                  placeholderText="일자선택"
                  dateFormat="yyyy-MM-dd"
                  selected={row.date}
                  onChange={date => handleDateChange(index, date)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.reason}
                  onChange={e => handleInputChange(index, 'reason', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.section}
                  onChange={e => handleInputChange(index, 'section', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.transportation}
                  onChange={e => handleInputChange(index, 'transportation', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.amount}
                  onChange={e => handleInputChange(index, 'amount', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className={classes['content-table']}></table>
    </form>
  );
};

export default TransportationCreate;
