import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { RootState } from '../../../store';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';

import logoSmall from '../../../assets/img/logo.png';
import classes from '../../../pages/Approval/Approval.module.css';
import TextEditor from '../../TextEditor';
import Signature from './Signature';
import ApprovalReference from '../ApprovalReference';

const CommonCreate = () => {

  const today = new Date();
  const getDate = today.toISOString().slice(0,10);
  const getDateRemoveBar = today.toISOString().slice(0,10).replace(/-/g, '');
  const userInfo = useSelector((state:RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const executionDateRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  
  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    dispatch(selectedActions.setTitle(newTitle));
  }
  const dataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    dispatch(selectedActions.setDate(newDate));
  }

  useEffect(()=>{
    if(executionDateRef.current) {
      executionDateRef.current.focus();
    }
    dispatch(selectedActions.resetDocument());
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
                  <th className={classes['header-table__approval-th']}>문서번호</th>
                  <td className={classes['header-table__approval-td']}>
                    <span>DS_품의서_{userInfo?.deptNm}_{getDateRemoveBar}_</span>
                  </td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>품의일자</th>
                    <td>{getDate}</td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>시행일자</th>
                  <td>
                    <input 
                      type="text"
                      name="executionDate"
                      onChange={dataChangeHandler}
                      ref={executionDateRef}
                    />
                  </td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>부서명</th>
                  <td>
                    <span>{userInfo?.deptNm}</span>
                  </td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>기안자</th>
                  <td>
                    <span>{userInfo?.empNm}</span>
                  </td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>제목</th>
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