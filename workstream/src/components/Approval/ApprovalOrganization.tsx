import { ChangeEvent, useState } from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import OrganizationAccordion from './OrganizationAccordion';

const ApprovalOrganization = () => {

  const [searchText, setSearchText] = useState('');
  const searchChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    console.log(searchText);
    setSearchText(searchText);
  }

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
            placeholder="조직, 사원을 검색해주세요"
            value={searchText}
            onChange={searchChangeHandler} />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <OrganizationAccordion /* searchText={searchText} *//>

      </div>
    </div>
  );
};

export default ApprovalOrganization;
