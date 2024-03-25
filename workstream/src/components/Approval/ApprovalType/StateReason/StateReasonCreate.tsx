import { useSelector } from 'react-redux';
import classes from '../../../../pages/Approval/Approval.module.css';
import ApprovalHeader from '../../ApprovalLayout/ApprovalHeader';
import Signature from '../../ApprovalSign/Signature';
import { RootState } from '../../../../store';

const StateReasonCreate = () => {
  const today = new Date();
  const getDate = today.toISOString().slice(0, 10);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  return (
    <form className={`${classes['state-reason-form']} ${classes['purchase-form']}`}>
      <ApprovalHeader></ApprovalHeader>
      <div className={classes['header-box__wrapper']}>
        <div className={classes['header__left']}>
          <h1>사 유 서</h1>
        </div>
        <Signature />
      </div>
      <table className={`${classes['content_table']} ${classes['state-reason-table']}`}>
        <thead>
          <tr>
            <th>작성자</th>
            <td>
              <span>{userInfo.empNm}</span>
            </td>
            <th>작성일자</th>
            <td>
              <span>{getDate}</span>
            </td>
          </tr>
          <tr>
            <th>부서/직급</th>
            <td>
              <span>{userInfo.deptNm}</span>
              <span>{userInfo.rankNm}</span>
            </td>
            <th>책임자</th>
            <td>
              <input type="text" spellCheck={false}></input>
            </td>
          </tr>
          <tr>
            <th>제목</th>
            <td>
              <input type="text" spellCheck={false}></input>
            </td>
            <th>손실 내역</th>
            <td>
              <input type="text" spellCheck={false}></input>
            </td>
          </tr>
        </thead>
      </table>
      <table className={classes['content_table']}>
        <tr className="text-align-left">
          <th>1. 사건발생 경과 및 담당자별 책임 규명</th>
        </tr>
        <tr>
          <td className={classes['reason-state-1']}>
            <textarea
              spellCheck={false}
              defaultValue={`1. 발생경과\n2. 사건진행결과\n3. 주요 책임 판단 기준\n4. 담당자별 책임규명`}></textarea>
          </td>
        </tr>
      </table>
      <table className={classes['content_table']}>
        <tr className="text-align-left">
          <th>2. 개선 및 해결방안</th>
        </tr>
        <tr>
          <td className={classes['reason-state-2']}>
            <textarea></textarea>
          </td>
        </tr>
      </table>
    </form>
  );
};

export default StateReasonCreate;
