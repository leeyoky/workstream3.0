import { useState, useEffect } from 'react';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import OrganizationAccordion from '../../Organization/OrganizationAccordion';

/**
 * 결재자 지정 버튼을 누르면 나타나는 모달의 좌측에 위치한 조직도 컴포넌트
 * 사원 검색 및 조직도를 아코디언 방식으로 열고 닫기 가능.
 *
 * @returns {React.ReactElement} - OrganizationAccordion
 */
const ApprovalOrganization = () => {
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {}, [searchText]);

  return (
    <div className={classes['organization-selector__input-wrapper']}>
      <div className={classes['card']}>
        <div className={classes['card-header']}>
          <p>조직도</p>
          <hr />
        </div>
        <div className={classes['card-search']}>
          <input
            type="text"
            placeholder="사원을 검색해주세요"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <OrganizationAccordion searchText={searchText} />
      </div>
    </div>
  );
};

export default ApprovalOrganization;
