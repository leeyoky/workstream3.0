import { useSelector } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import { RootState } from '../../../store';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';

import logoSmall from '../../../assets/img/logo.png';
import classes from '../../../pages/Approval/Approval.module.css';
import TextEditor from '../../TextEditor';
import Signature from './Signature';
import ApprovalReference from '../ApprovalReference';
import { fileActions } from './../../../store/file-slice';
import DatePick from '../../DatePick';
import { formatDateOnly } from '../../../helpers/formatDateTime';

const CommonCreate = () => {

  const today = new Date();
  const getDate = today.toISOString().slice(0,10);
  const [executeDate, setExecuteDate] = useState<Date | null>(null);
  const userInfo = useSelector((state:RootState) => state.auth.userInfo);
  const executionDateRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();
  
  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    dispatch(selectedActions.setTitle(newTitle));
  }
  const dataChangeHandler = (date: Date | null) => {

    const currentDate = new Date();

    // 현재 날짜보다 앞선 경우
    if (date && date < currentDate) {
      alert("과거 날짜를 선택할 수 없습니다.");
    } else {
      setExecuteDate(date);
      dispatch(selectedActions.setDate(formatDateOnly(date?.toISOString() || '')));
    }
  }

  useEffect(()=>{
    if(executionDateRef.current) {
      executionDateRef.current.focus();
    }
    dispatch(fileActions.resetFiles());
    dispatch(selectedActions.resetDocument());
    dispatch(selectedActions.setIsEditMode(true));
    dispatch(selectedActions.setIsDetailMode(false));
    
  },[executionDateRef.current?.value]);

  
  return (
    <form>
      <header className={classes['header-type']}>
        <div className={classes['header-logo']}>
          <img src={logoSmall} alt="Logo" />
        </div>
        <div className={classes['header-box__wrapper']}>
          <div className={classes['header__left__common']}>
            <table className={classes['header-table__common']}>
              <tbody>
              <tr>
                <td className={classes['header-table__approval-th']}>문서번호</td>
                <td className={classes['header-table__approval-td']}>
                  <span>DS_새품의서_</span>
                </td>
              </tr>
              <tr>
                <td className={classes['header-table__approval-th']}>품의일자</td>
                <td>{getDate}</td>
              </tr>
              <tr>
                <td className={classes['header-table__approval-th']}>시행일자</td>
                <td>
                  <DatePick
                    placeholderText='시행일자'
                    selected={executeDate}
                    onChange={(date) => dataChangeHandler(date)}
                    dateFormat="yyyy-MM-dd"
                    />
                </td>
              </tr>
              <tr>
                <td className={classes['header-table__approval-th']}>부서명</td>
                <td>
                  <span>{userInfo?.deptNm}</span>
                </td>
              </tr>
              <tr>
                <td className={classes['header-table__approval-th']}>기안자</td>
                <td>
                  <span>{userInfo?.empNm}</span>
                </td>
              </tr>
              <tr>
                <td className={classes['header-table__approval-th']}>제목</td>
                <td>
                  <input 
                    type="text" 
                    name="title"
                    onChange={titleChangeHandler}
                    ref={titleRef}
                  />
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <Signature />
        </div>
      </header>
        <ApprovalReference />
        <TextEditor />
      <footer>
        <div className={classes['footer-text']}>
          <span>위와 같이 품의하오니 검토 후 재가바랍니다.</span>
        </div>
        <p className={classes['footer']}>주식회사 데이터스트림즈</p>
      </footer>
  </form>
  )
}

export default CommonCreate