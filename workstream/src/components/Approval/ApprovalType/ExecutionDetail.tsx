import TextEditor from '../../TextEditor';
import classes from '../../../pages/Approval/Approval.module.css';
import logoSmall from '../../../assets/img/logo.png';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { selectedActions } from '../../../store/Approval/approval-slice';
import useApprovalExecutionData from '../../../hooks/Approval/useApprovalExecutionData';

const ExecutionDetail = () => {
  const { id = '' } = useParams<string>();
  const { data } = useApprovalExecutionData(id);
  const isEdit = useSelector((state: RootState) => state.approval.isEditMode);
  const dispatch = useDispatch();

  console.log('data', data);

  useEffect(() => {
    dispatch(selectedActions.setIsEditMode(false));
    dispatch(selectedActions.setIsDetailMode(true));
    dispatch(selectedActions.setIsReviseMode(false));
  }, []);

  return (
    <form id="approval" className={classes['approval-execution']}>
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
              :<span className={classes['execution-table__defalut']}>{data?.id}</span>
            </div>
          </div>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>시행일자</span>
            </div>
            <div className={classes['execution-table-td']}>
              :<span className={classes['execution-table__defalut']}>{data?.executeDate}</span>
            </div>
          </div>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>수 신</span>
            </div>
            <div className={classes['execution-table-td']}>
              :
              {isEdit ? (
                <span>
                  <input type="text" placeholder="수신처를 입력해주세요" />
                </span>
              ) : (
                <span className={classes['execution-table__defalut']}>{data?.recipient}</span>
              )}
            </div>
          </div>

          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>제 목</span>
            </div>
            <div className={classes['execution-table-td']}>
              :
              {isEdit ? (
                <span>
                  <input type="text" placeholder="제목을 입력해주세요" name="title" />
                </span>
              ) : (
                <span className={classes['execution-table__defalut']}>{data?.title}</span>
              )}
            </div>
          </div>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>참 조</span>
            </div>
            <div className={classes['execution-table-td']}>
              :<span></span>
            </div>
          </div>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>참조 문서</span>
            </div>
            <div className={classes['execution-table-td']}>
              :<span className={classes['execution-table__defalut']}>{data?.ccId}</span>
            </div>
          </div>
        </div>
      </div>
      <TextEditor textValue={data?.contents} />
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

export default ExecutionDetail;
