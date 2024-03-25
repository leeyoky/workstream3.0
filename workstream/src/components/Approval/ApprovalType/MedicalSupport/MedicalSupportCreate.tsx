import { useSelector } from 'react-redux';
import classes from '../../../../pages/Approval/Approval.module.css';
import ApprovalHeader from '../../ApprovalLayout/ApprovalHeader';
import Signature from '../../ApprovalSign/Signature';
import { RootState } from '../../../../store';

const MedicalSupportCreate = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  return (
    <form className={`${classes['medical-support-form']} ${classes['purchase-form']}`}>
      <ApprovalHeader />
      <div className={classes['header-box__wrapper']}>
        <div className={classes['header__left']}>
          <h1>
            건강검진·의료비 <br />
            지원금 신청서
          </h1>
        </div>
        <Signature />
      </div>
      <div className={classes['medical-head__1']}>1. 신청자</div>
      <table className={classes['medical-table__1']}>
        <tr>
          <th>이름</th>
          <td>{userInfo.empNm}</td>
          <th>부서</th>
          <td>{userInfo.deptNm}</td>
        </tr>
        <tr>
          <th>직책/직위</th>
          <td>{userInfo.rankNm}</td>
          <th>연락처</th>
          <td></td>
        </tr>
      </table>
      <div className={classes['medical-head__1']}>2. 진료(검진) 내역 및 지원금 신청 내역</div>
      <table className={classes['medical-table__2']}>
        <tr>
          <th rowSpan={5}>진료/검진내역</th>
          <th>구분</th>
          <th>일반진료</th>
          <th>치과진료</th>
          <th>건강검진</th>
        </tr>
        <tr>
          <th>예약일자</th>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <th>진료기간</th>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <th>진료내역</th>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <th>병원명</th>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <th rowSpan={6}>신청내역</th>
        </tr>
        <tr>
          <th>진료비총액</th>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <th>보험자부담</th>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <th>환자부담액</th>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <th>회사지원금</th>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <th>실부담액</th>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <td colSpan={5}>
            <div className={classes['medical-textarea__1']}>
              * 일반/치과 진료 지원금 신청서 제출 시 진료사항을 상세히 기입하세요.
              <textarea spellCheck={false}></textarea>
            </div>
          </td>
        </tr>
      </table>
      <div>
        주1. 신청내역은 주관부서에서 내역서(진료계산서 또는 관련 내역서 등)를 확인 후 작성하므로
        증빙서류를 첨부하여 제출할 것
      </div>
    </form>
  );
};

export default MedicalSupportCreate;
