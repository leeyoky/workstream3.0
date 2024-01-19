import logoSmall from '../../../assets/img/logo.png';
import classes from '../../../pages/Approval/Approval.module.css';
import { useApprovalData } from '../../../hooks/Approval/useApprovalData';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { ApprovalData } from '../../../types/Approval/Approaval';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';
import { formatDateOnly, getToday } from './../../../helpers/formatDateTime';
import TextEditor from '../../TextEditor';
import SignatureEdit from '../ApprovalSign/SignatureEdit';
import ApprovalReference from '../ApprovalReference';
import ApprovalInstructions from '../ApprovalInstruction/ApprovalInstructions';

type CommonDetailProps = {
  temp: boolean;
  setTemp: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommonDetail: React.FC<CommonDetailProps> = ({ setTemp }) => {
  const [executeDate, setExecuteDate] = useState<Date | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);
  const isEdit = useSelector((state: RootState) => state.approval.isEditMode);
  const isRevise = useSelector((state: RootState) => state.approval.isReviseMode);
  const finalExecuteDate = useSelector((state: RootState) => state.approval.executeDate);
  const { id = '' } = useParams<string>();
  const { data } = useApprovalData(id);
  const dispatch = useDispatch();
  const formattedDate = formatDateOnly(data?.approval.regDate!);

  useEffect(() => {
    dispatch(selectedActions.setIsReviseMode(false));
  }, []);

  useEffect(() => {
    initializeData();
  }, [isEdit, data, isRevise]);

  useEffect(() => {
    const formattedDate = formatDateOnly(executeDate?.toISOString() || '');
    dispatch(selectedActions.setTitle(title));
    dispatch(selectedActions.setDate(formattedDate));
    dispatch(selectedActions.setContent(content));
    dispatch(selectedActions.setIsDetailMode(true));
  }, [title, executeDate]);

  // 데이터 초기화
  const initializeData = () => {
    if (data) {
      setTitle(data.approval.title || '');
      setExecuteDate(data.approval.executeDate ? new Date(data.approval.executeDate) : null);
      setContent(data.approval.contents || '');

      if (isTempStorage(data)) {
        setTemp(true);
        dispatch(selectedActions.setIsEditMode(true));
      } else {
        if (isRevise) {
          setTemp(true);
          dispatch(selectedActions.setIsEditMode(true));
        } else {
          setTemp(false);
          dispatch(selectedActions.setIsEditMode(false));
        }
      }
      if (isSequentialOrParallel(data)) {
        dispatch(selectedActions.updateSelectedOption('addAgreement'));
      }
      if (!isEdit && titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }
  };

  // 임시저장 여부 확인
  const isTempStorage = (data: ApprovalData) => {
    return data.approval.state === 'TEMP';
  };

  // 순차/병렬 여부 확인
  const isSequentialOrParallel = (data: ApprovalData) => {
    return data.approval.lineType === '순차' || data.approval.lineType === '병렬';
  };

  // 제목 변경 핸들러
  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const newLength = newTitle.length;

    // 200자를 초과하면 알림 표시
    if (newLength > 50) {
      alert('제목은 50자를 초과할 수 없습니다.');
      return;
    }
    setTitle(newTitle);
    dispatch(selectedActions.setTitle(newTitle));
  };

  const renderTitleField = () => {
    if (!isEdit) {
      return <span>{data?.approval.title}</span>;
    } else {
      return (
        <input
          placeholder="제목을 입력해주세요."
          className={classes['update-input']}
          type="text"
          name="title"
          value={title}
          onChange={titleChangeHandler}
          ref={titleInputRef}
        />
      );
    }
  };

  return (
    <form id="approval">
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
                    <span>{isRevise ? 'DS_새품의서_' : id}</span>
                  </td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>품의일자</th>
                  {isEdit ? <td>{getToday()}</td> : <td>{formattedDate}</td>}
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>시행일자</th>

                  <td> {finalExecuteDate ? finalExecuteDate : '-'} </td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>부서명</th>
                  <td>
                    <span>{data?.approval.regUsrDeptNm}</span>
                  </td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>기안자</th>
                  <td>
                    <span>{data?.approval.regUsrNm}</span>
                  </td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>제목</th>
                  <td>{renderTitleField()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <SignatureEdit />
        </div>
      </header>
      <ApprovalReference />
      <ApprovalInstructions />
      <TextEditor textValue={data?.approval.contents} />
      <footer>
        <div className={classes['footer-text']}>
          <span>위와 같이 품의하오니 검토 후 재가바랍니다.</span>
        </div>
        <p className={classes['footer']}>주식회사 데이터스트림즈</p>
      </footer>
    </form>
  );
};

export default CommonDetail;
