import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';
import classes from '../../../pages/Approval/Approval.module.css';
import logoSmall from '../../../assets/img/logo.png';
import tamp from '../../../assets/img/tamp.png';
import TextEditor from '../../TextEditor';
import { useLocation } from 'react-router-dom';
import ExecutionModalCCDoc from '../ApprovalModals/ExecutionModalCCDoc';
import { ApprovalData } from '../../../types/Approval/Approaval';
import { uiActions } from '../../../store/ui-slice';

/**
 * 시행문 생성
 * @param 수신
 * @returns
 */
const ExecutionCreate = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const [isCCDocListModalOpen, setCCDocListModalOpen] = useState(false);
  const [ccDocData, setCCdocData] = useState<ApprovalData[]>([]);
  const [title, setTitle] = useState('');
  const [executeDate, setExecuteDate] = useState(null);
  const [documentId, setDocumentId] = useState('');
  const [content, setContent] = useState('');

  /* Detail mode 설정 */
  useEffect(() => {
    dispatch(selectedActions.setIsEditMode(false));
    dispatch(selectedActions.setIsDetailMode(false));
  }, [isCCDocListModalOpen]);

  useEffect(() => {
    if (state) {
      setExecuteDate(state.executeDate);
      setTitle(state.title);
      setDocumentId(state.documentId);
      setContent(state.content);
    }
    setReduxData();
  }, []);

  const handleShowCCDocListModal = () => {
    setCCDocListModalOpen(true);
    dispatch(uiActions.selectMenu('completed'));
  };
  const handleCloseCCDocListModal = () => {
    setCCDocListModalOpen(false);
  };

  useEffect(() => {
    setReduxData();
    console.log('ccDocData', ccDocData);
  }, [ccDocData]);

  const setReduxData = () => {
    dispatch(selectedActions.setCcId(state.documentId ? state.documentId : documentId));
    dispatch(selectedActions.setContent(state.content ? state.content : content));
    dispatch(selectedActions.setTitle(state.title ? state.title : title));
    dispatch(selectedActions.setDate(state.executeDate ? state.executeDate : executeDate));
  };

  const resetDocument = () => {
    const result = window.confirm('문서를 삭제하시겠습니까?');
    if (result) {
      setCCdocData([]);
      setTitle('');
      setExecuteDate(null);
      setDocumentId('');
      setContent('');
    }
  };

  /* 수신처 입력 */
  const receiptorChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const receiptor = e.target.value;
    dispatch(selectedActions.setRecipient(receiptor));
  };
  /* 데이터 싣기 */
  const setData = (data: ApprovalData[]) => {
    setCCdocData(data);
    setTitle(data[0].approval.title);
    setExecuteDate(data[0].approval.executeDate);
    setDocumentId(data[0].approval.id);
    setContent(data[0].approval.contents);
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
              :<span className={classes['execution-table__defalut']}>{executeDate}</span>
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
                  className={classes['update-input']}
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
              :<span className={classes['execution-table__defalut']}>{title}</span>
            </div>
          </div>
          <div className={classes['execution-table-tr']}>
            <div className={classes['execution-table-th']}>
              <span>참조 문서</span>
            </div>
            <div className={classes['execution-table-td']}>
              :
              <span className={classes['execution-table__defalut']}>
                {documentId ? (
                  <>
                    {documentId}
                    <i className="fa-regular fa-trash-can" onClick={resetDocument}></i>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary-light"
                      onClick={handleShowCCDocListModal}>
                      Select
                    </button>
                    {isCCDocListModalOpen && (
                      <ExecutionModalCCDoc onClose={handleCloseCCDocListModal} onData={setData} />
                    )}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <TextEditor textValue={state.content || content} />
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

export default ExecutionCreate;
