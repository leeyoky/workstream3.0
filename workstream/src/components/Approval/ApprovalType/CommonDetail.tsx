import logoSmall from '../../../assets/img/logo.png';
import classes from '../../../pages/Approval/Approval.module.css';
import { useApprovalData } from '../../../hooks/Approval/useApprovalData';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import TextEditor from '../../TextEditor';
import { ApprovalData } from '../../../types/Approval/Approaval';
import SignatureEdit from './SignatureEdit';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';
import { getToday } from './../../../helpers/formatDateTime';
import ApprovalReference from '../ApprovalReference';

type CommonDetailProps = {
  temp: boolean;
  setTemp: React.Dispatch<React.SetStateAction<boolean>>;
  setData:  React.Dispatch<React.SetStateAction<ApprovalData | undefined>>;
};

const CommonDetail: React.FC<CommonDetailProps> = ({ setTemp, setData }) => {
  const [executeDate, setExecuteDate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);
  const isEdit = useSelector((state:RootState) => state.approval.isEditMode);
  const { id = ''} = useParams<string>();
  const {data} = useApprovalData(id);
  const dispatch = useDispatch();

  // 데이터 초기화
  const initializeData = () => {
    if (data) {
      setData(data);
      setTitle(data.approval.title || '');
      setExecuteDate(data.approval.executeDate || '');
      setContent(data.approval.contents || '');

      if (isTempStorage(data)) {
        setTemp(true);
        dispatch(selectedActions.setIsEditMode(true));
      } else {
        setTemp(false);
        dispatch(selectedActions.setIsEditMode(false));
      }

      if (isSequentialOrParallel(data)) {
        dispatch(selectedActions.updateSelectedOption('addAgreement'));
      }

      if (!isEdit && titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }
  };

  useEffect(() => {
    initializeData();
  }, [isEdit, data]);
  
  useEffect(() => {
    dispatch(selectedActions.setTitle(title));
    dispatch(selectedActions.setDate(executeDate));
    dispatch(selectedActions.setContent(content));
    dispatch(selectedActions.setIsDetailMode(true));
  }, [title, executeDate]);

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
    setTitle(newTitle)
    dispatch(selectedActions.setTitle(newTitle));
  }
  
  // 시행일자 변경 핸들러
  const dataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setExecuteDate(newDate)
    dispatch(selectedActions.setDate(newDate));
  }

  const renderTitleField = () => {
    if (!isEdit) {
      return (
        <span>{data?.approval.title}</span>
      );
    } else {
      return (
        <input
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

  const renderDateField = () => {
    if (!isEdit) {
      return (
        <span>{data?.approval.executeDate}</span>
      );
    } else {
      return (
        <input
          className={classes['update-input']}
          type="text"
          name="executionDate"
          value={executeDate}
          onChange={dataChangeHandler}
        />
      );
    }
  };

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
                    <span>{id}</span>
                  </td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>품의일자</th>
                    <td>{getToday()}</td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>시행일자</th>
                    <td>
                    {renderDateField()}
                  </td>
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
                  <td>
                    {renderTitleField()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
            <SignatureEdit />
        </div>
      </header>
      <ApprovalReference />
        <TextEditor textValue={data?.approval.contents}
        />
      <footer>
        <div className={classes['footer-text']}>
          <span>위와 같이 품의하오니 검토 후 재가바랍니다.</span>
        </div>
        <p className={classes['footer']}>주식회사 데이터스트림즈</p>
      </footer>
  </form>
  )
}

export default CommonDetail