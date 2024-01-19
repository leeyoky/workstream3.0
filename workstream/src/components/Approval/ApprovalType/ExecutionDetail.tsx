import TextEditor from '../../TextEditor';
import classes from '../../../pages/Approval/Approval.module.css';
import logoSmall from '../../../assets/img/logo.png';
import tamp from '../../../assets/img/tamp.png';

import { useEffect, useState } from 'react';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectedActions } from '../../../store/Approval/approval-slice';
import { executiondocData } from '../../../types/Approval/Approaval';

import useApprovalExecutionData from '../../../hooks/Approval/useApprovalExecutionData';

type ExecutionDetailProps = {
  temp: boolean;
  setTemp: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExecutionDetail: React.FC<ExecutionDetailProps> = ({ setTemp, temp }) => {
  const [recipient, setRecipient] = useState('');

  const { id = '' } = useParams<string>();
  const { data } = useApprovalExecutionData(id);
  const isEdit = useSelector((state: RootState) => state.approval.isEditMode);
  const isDetail = useSelector((state: RootState) => state.approval.isDetailMode);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('data', data);

    initializeData();

    dispatch(selectedActions.setCcId(data?.execution.ccId));
  }, [isEdit, data?.execution.state]);

  /**
   * api 요청에 따른 document의 state가 임시저장 상태인지
   * @param data
   * @returns
   */
  const isTempStorage = (data: executiondocData | undefined): data is executiondocData => {
    return data !== undefined && data.execution.state === 'TEMP';
  };

  /**
   * 로드한 문서의 임시저장 상태에 따라 editMode설정
   */
  const initializeData = () => {
    if (isTempStorage(data)) {
      setTemp(true);
      dispatch(selectedActions.setIsEditMode(false));
      dispatch(selectedActions.setIsDetailMode(false));
      setData();
    } else {
      setTemp(false);
      dispatch(selectedActions.setIsEditMode(false));
      dispatch(selectedActions.setIsDetailMode(true));
    }
    console.log('temp', temp);
  };

  /**
   * api 요청 결과를 state에 저장
   */
  const setData = () => {
    if (data) {
      // 시행일자 세팅
      dispatch(selectedActions.setDate(data.execution.executeDate));
      // 제목 세팅
      dispatch(selectedActions.setTitle(data.execution.title));
      setRecipient(data.execution.recipient?.toString() || '');
    }
  };

  /**
   * 수신 수정 핸들러
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @returns
   * @throws {Error} 50자 초과 시 alert
   */
  const updateRecipient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRecipient = e.target.value;
    const inputLength = newRecipient.length;

    if (inputLength > 50) {
      alert('50자를 초과할 수 없습니다.');
      return;
    }
    setRecipient(newRecipient);
    dispatch(selectedActions.setRecipient(newRecipient));
  };

  console.log('data', data);

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
              :<span className={classes['execution-table__defalut']}>{data?.execution.id}</span>
            </div>
          </div>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>시행일자</span>
            </div>
            <div className={classes['execution-table-td']}>
              :
              <span className={classes['execution-table__defalut']}>
                {data?.execution.executeDate}
              </span>
            </div>
          </div>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>수 신</span>
            </div>
            <div className={classes['execution-table-td']}>
              :
              {!isDetail ? (
                <span>
                  <input
                    className={classes['update-input']}
                    type="text"
                    placeholder="수신처를 입력해주세요"
                    value={recipient}
                    onChange={updateRecipient}
                  />
                </span>
              ) : (
                <span className={classes['execution-table__defalut']}>
                  {data?.execution.recipient}
                </span>
              )}
            </div>
          </div>

          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>제 목</span>
            </div>
            <div className={classes['execution-table-td']}>
              : <span className={classes['execution-table__defalut']}>{data?.execution.title}</span>
            </div>
          </div>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>참조 문서</span>
            </div>
            <div className={classes['execution-table-td']}>
              :<span className={classes['execution-table__defalut']}>{data?.execution.ccId}</span>
            </div>
          </div>
        </div>
      </div>
      <TextEditor textValue={data?.execution.contents} />
      <footer>
        <div className={classes['footer-text']}>
          <span>주식회사 데이터스트림즈</span>
        </div>
        <p className={classes['footer']}>
          <span>대 표 이 사</span>
          <span>이 영 상</span>
          <img src={tamp} alt="Logo" />
        </p>
      </footer>
    </form>
  );
};

export default ExecutionDetail;
