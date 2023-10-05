import classes from '../../pages/Approval/ApprovalSelect.module.css';
import OrganizationAccordion from './OrganizationAccordion';

const ApprovalSelectOrganization = () => {

  return (
    <div className={classes['organization-selector__input-wrapper']}>
      <div className={classes['card']}>
        <div className={classes['card-header']}>
          <p>조직도</p>
          <hr />
        </div>
        <div className={classes['card-search']}>
          <input type="text" placeholder="조직, 사원을 검색해주세요" />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <OrganizationAccordion/>

      </div>
    </div>
  );
};

export default ApprovalSelectOrganization;
