import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';
import classes from '../../../pages/Approval/Approval.module.css';
import logoSmall from '../../../assets/img/logo.png';
import TextEditor from '../../TextEditor';
import { useLocation } from 'react-router-dom';

const ExecutionCreate = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;

  console.log(state);

  /* create mode 설정 */
  useEffect(() => {
    dispatch(selectedActions.setIsEditMode(true));
    dispatch(selectedActions.setIsDetailMode(false));
  }, []);

  /* 제목 */
  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newTitle = e.target.value.slice(0, 50);
    if (e.target.value.length > 50) {
      alert('제목은 50자를 초과할 수 없습니다.');
      newTitle = newTitle.slice(0, 50);
    }
    dispatch(selectedActions.setTitle(newTitle));
  };

  /* 수신처 입력 */
  const receiptorChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const receiptor = e.target.value;
    dispatch(selectedActions.setRecipient(receiptor));
  };

  return (
    <form className={classes['approval-execution']}>
      <header className={classes['execution-header']}>
        <div className={classes['header-logo']}>
          <img src={logoSmall} alt="Logo" />
        </div>
        <div className={classes['header-title']}>
          <b>주식회사 데이터스트림즈</b>
          <p>
            서울시 서초구 사임당로 28, 청호나이스빌딩 6F
            <span>T(02)3473-9077 F(02)3473-9084</span>
          </p>
        </div>
      </header>
      <div className={classes['execution-table']}>
        <div className={classes['']}>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>문서번호</span>
            </div>
            <div className={classes['execution-table-td']}>
              :<span className={classes['execution-table__defalut']}>DS-</span>
            </div>
          </div>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>시행일자</span>
            </div>
            <div className={classes['execution-table-td']}>
              :<span className={classes['execution-table__defalut']}>{state.executeDate}</span>
            </div>
          </div>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>수 신</span>
            </div>
            <div className={classes['execution-table-td']}>
              :
              <span>
                <input
                  type="text"
                  placeholder="수신처를 입력해주세요"
                  onChange={receiptorChangeHandler}
                />
              </span>
            </div>
          </div>

          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>제 목</span>
            </div>
            <div className={classes['execution-table-td']}>
              :
              <span>
                <input
                  type="text"
                  placeholder="제목을 입력해주세요"
                  onChange={titleChangeHandler}
                  name="title"
                />
              </span>
            </div>
          </div>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>참 조</span>
            </div>
            <div className={classes['execution-table-td']}>
              :<span className={classes['execution-table__defalut']}></span>
            </div>
          </div>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>참조 문서</span>
            </div>
            <div className={classes['execution-table-td']}>
              :<span className={classes['execution-table__defalut']}>{state.documentId}</span>
            </div>
          </div>
        </div>
      </div>
      <TextEditor />
      <footer>
        <div className={classes['footer-text']}>
          <span>주식회사 데이터스트림즈</span>
        </div>
        <p className={classes['footer']}>
          <span>대 표 이 사</span>
          <span>이 영 상</span>
        </p>
      </footer>
    </form>
  );
};

export default ExecutionCreate;
