import classes from '../../../pages/Approval/Approval.module.css';
import logoSmall from '../../../assets/img/logo.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const CondolenceCreate = () => {
  const today = new Date();
  const getDate = today.toISOString().slice(0, 10);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  return (
    <form className={classes['condolence-form']}>
      <header>
        <div className={classes['header-logo']}>
          <img src={logoSmall} alt="Logo" />
        </div>
        <div className={classes['header-title']}>
          <b>사우회 경조사비 신청서</b>
        </div>
      </header>
      <table className={classes['header-info-table']}>
        <tr>
          <th>신청인</th>
          <td>{userInfo?.empNm}</td>
          <th>부서명</th>
          <td>{userInfo.deptNm}</td>
        </tr>
        <tr>
          <th>신청일자</th>
          <td>{getDate}</td>
          <th>경조일자</th>
          <td></td>
        </tr>
      </table>
      <table className={classes['content-table']}>
        <tr className={classes['content-table-tr']}>
          <th colSpan={2}>경조내역</th>
          <th>대상자</th>
          <th>지급액</th>
          <th>해당사항</th>
        </tr>
        <tr>
          <th rowSpan={7}>경사</th>

          <th rowSpan={2}>결혼</th>
          <td>본인</td>
          <td>200,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <td>자녀</td>
          <td>200,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <th rowSpan={2}>회갑</th>
          <td>부모</td>
          <td>100,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <td>배우자 부모</td>
          <td>100,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <th rowSpan={2}>고희</th>
          <td>부모</td>
          <td>200,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <td>배우자 부모</td>
          <td>200,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <th>돌</th>
          <td>본인 자녀(부서원 전체 초대 시)</td>
          <td>100,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <th rowSpan={6} colSpan={2}>
            조사
          </th>
          <td>본인</td>
          <td>500,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <td>배우자, 자녀</td>
          <td>300,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <td>부모</td>
          <td>200,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <td>배우자 부모</td>
          <td>200,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <td>형제, 자매</td>
          <td>100,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <td>배우자 형제, 자매</td>
          <td>100,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <th rowSpan={3} colSpan={2}>
            퇴직시
          </th>
          <td>5년 이상 근속</td>
          <td>200,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <td>10년 이상 근속</td>
          <td>400,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
        <tr>
          <td>15년 이상 근속</td>
          <td>600,000</td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
      </table>
      <p>* 해당 경조사항 증빙서류 첨부.</p>
    </form>
  );
};

export default CondolenceCreate;
