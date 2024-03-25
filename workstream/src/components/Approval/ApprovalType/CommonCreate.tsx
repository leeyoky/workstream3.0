import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';
import { RootState } from '../../../store';
import { selectedActions } from '../../../store/Approval/approval-slice';
import { fileActions } from './../../../store/file-slice';
import logoSmall from '../../../assets/img/logo.png';
import classes from '../../../pages/Approval/Approval.module.css';
import TextEditor from '../../TextEditor';
import Signature from '../ApprovalSign/Signature';
import ApprovalReference from '../ApprovalLayout/ApprovalReference';
import ApprovalInstructions from '../ApprovalInstruction/ApprovalInstructions';

const CommonCreate = () => {
  const today = new Date();
  const getDate = today.toISOString().slice(0, 10);
  const getTitle = useSelector((state: RootState) => state.approval.title);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const executionDateRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useDispatch();

  const titleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newTitle = e.target.value.slice(0, 50);
    if (e.target.value.length > 50) {
      alert('제목은 50자를 초과할 수 없습니다.');
      newTitle = newTitle.slice(0, 50);
    }
    dispatch(selectedActions.setTitle(newTitle));
  };
  useEffect(() => {
    dispatch(selectedActions.resetDocument());
  }, []);

  useEffect(() => {
    if (executionDateRef.current) {
      executionDateRef.current.focus();
    }
    dispatch(fileActions.resetFiles());
    dispatch(selectedActions.setIsEditMode(true));
    dispatch(selectedActions.setIsDetailMode(false));
  }, []);

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
                  <td></td>
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
                    <textarea
                      className={classes['update-input']}
                      placeholder="제목을 입력해주세요."
                      name="title"
                      onChange={titleChangeHandler}
                      ref={titleRef}
                      value={getTitle}
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
      <ApprovalInstructions />
      <TextEditor />
      <footer>
        <div className={classes['footer-text']}>
          <span>위와 같이 품의하오니 검토 후 재가바랍니다.</span>
        </div>
        <p className={classes['footer']}>주식회사 데이터스트림즈</p>
      </footer>
    </form>
  );
};

export default CommonCreate;
