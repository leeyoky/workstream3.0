import { useSelector } from 'react-redux';
import classes from '../../../../pages/Approval/Approval.module.css';
import ApprovalHeader from '../../ApprovalLayout/ApprovalHeader';
import { RootState } from '../../../../store';
import Signature from '../../ApprovalSign/Signature';

export const EquipmentConfirmCreate = () => {
  const today = new Date();
  const getDate = today.toISOString().slice(0, 10);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  return (
    <form className={`${classes['equipment-form']} ${classes['purchase-form']}`}>
      <ApprovalHeader>회사장비/비품 반출 확인서</ApprovalHeader>
      <div className={classes['header-table-wrapper']}>
        <table className={classes['header-info-table']}>
          <tr>
            <th>문서번호</th>
            <td>DS-</td>
          </tr>
          <tr>
            <th>신청일자</th>
            <td>{getDate}</td>
          </tr>
          <tr>
            <th>반출부서</th>
            <td>{userInfo.deptNm}</td>
          </tr>
          <tr>
            <th>반출자</th>
            <td>{userInfo.empNm}</td>
          </tr>
        </table>
        <Signature />
      </div>
      <div className={classes['header-info-msg']}>
        아래와 같이 회사장비 및 비품을 반출코자 합니다.
      </div>
      <table className={`${classes['content_table']} ${classes['equipment-table']}`}>
        <tr>
          <th>반출사유</th>
          <td></td>
        </tr>
        <tr>
          <th>반출장비 및 비품 리스트</th>
          <td></td>
        </tr>
        <tr>
          <th>반출 기간</th>
          <td></td>
        </tr>
        <tr>
          <th>반환예정일</th>
          <td></td>
        </tr>
        <tr>
          <th>반출처</th>
          <td></td>
        </tr>
      </table>
      <div className={classes['equipment-warning']}>
        <span>
          상기와 같이 회사장비, 비품 등을 반출하여 사용함에 아래사항을 준수할 것을 서약합니다.
        </span>
        <span>
          1. 업무상 회사장비 및 비품을 반출함에 반출부터 반환까지 장비 및 비품에 하자가 발생하지
          않도록 주의를 기울이고
          <span></span>
          <span>
            반환예정일에 필히 반환토록 하겠으며, 부득이하게 반출기간을 연장 할 경우에는 재 승인을
            받도록 하겠습니다.
          </span>
        </span>
        <span>
          2. 반출하여 사용 도중 파손, 훼손, 도난으로 인해 발생하는 문제에 대해서는 반출자가 책임을
          지고 수리 및 구매를 통해
          <span></span>
          <span>원상 복귀토록 하겠습니다.</span>
        </span>
        <span>
          3. 명시되지 않은 사항에 대해서는 반출 주관부서와 협의하고 경영진의 승인을 받아 처리토록
          하겠습니다.
        </span>
      </div>
      <div className={classes['user-sign']}>
        <div className={classes['user-sign-box']}>
          <span>반출신청자: </span>
          <span></span>
          <button type="button">서명</button>
        </div>
      </div>
    </form>
  );
};
