import classes from '../../../pages/Approval/Approval.module.css';
import logoSmall from '../../../assets/img/logo.png';
import { ReactNode } from 'react';

interface ApprovalHeaderProps {
  children?: ReactNode;
}
const ApprovalHeader: React.FC<ApprovalHeaderProps> = props => {
  return (
    <header>
      <div className={classes['header-logo']}>
        <img src={logoSmall} alt="Logo" />
      </div>
      <div className={classes['header-title']}>
        <b>{props.children}</b>
      </div>
    </header>
  );
};

export default ApprovalHeader;
