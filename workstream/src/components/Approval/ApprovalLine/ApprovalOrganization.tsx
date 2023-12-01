import { useState, useEffect } from 'react';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import OrganizationAccordion from '../../Organization/OrganizationAccordion';

const ApprovalOrganization = () => {
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
  }, [searchText]);

  const performSearch = () => {
    console.log('Searching for:', searchText);
  };

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
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={performSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <OrganizationAccordion searchText={searchText}/>
      </div>
    </div>
  );
};

export default ApprovalOrganization;
