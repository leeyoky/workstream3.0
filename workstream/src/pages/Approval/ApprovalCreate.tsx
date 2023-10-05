import React from 'react';
import Modal from "../../UI/Modal";
import classes from './ApprovalSelect.module.css';
import ApprovalLineSelector from '../../components/Approval/ApprovalLineSelector';
import ApprovalSelectOrganization from '../../components/Approval/ApprovalSelectOrganization';

interface ApprovalCreateProps {
  onClose: () => void; // 모달 닫기 핸들러
}

const ApprovalCreate: React.FC<ApprovalCreateProps> = (props) => {

  return (
    <Modal isOpen={true} onClose={props.onClose}>
      <div className={classes['approval-container']}>
        <div className={classes['organizaion-selector-wrapper']}>
          <div className={classes['document-selector-wrapper']}>
            <div className={classes['card']}>
              <div className={classes['card-header']}>
                <p>문서양식 선택</p>
                <hr />
              </div>
              <div className={classes['card-search']}>
                <input type="text" placeholder="문서 양식을 검색해주세요." />
                <button>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>

              <div className={classes['document-item-wrapper']}>

              </div>

              <div className={classes['document-list']}>
                <div className={classes['document-item']}>
                  <i className="fa-regular fa-file"></i>
                  <span>기본 품의서</span>
                </div>
                <div className={classes['document-item']}>
                  <i className="fa-regular fa-file"></i>
                  <span>사직원</span>
                </div>
              </div>
{/*               <div className={classes['document-bookmark']}>
              </div> */}
            </div>
          </div>

          <ApprovalSelectOrganization/>
          <ApprovalLineSelector/>

        </div>
      </div>
    </Modal>
  );
}

export default ApprovalCreate;
