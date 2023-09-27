import React from 'react';
import Modal from "../../UI/Modal";
import classes from './ApprovalSelect.module.css';

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
            </div>
          </div>

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

              <div id="accordion">
              </div>

              <div className={classes['emp-list']}>

              </div>
            </div>
          </div>

          <div className={classes['organization-selector__result-wrapper']}>
            <div className={classes['card']}>
              <div className={classes['card-header']}>
                <p>결재라인 방식선택</p>
                <hr />
                <div className={classes['emp-list__result-select-wrapper']}>
                  <select className={classes['emp-list__result-select']}>
                    <option value="">-- 선택 --</option>
                    <option value="">결재만</option>
                    <option value="">결재+합의</option>
                  </select>
                  <div>
                    <button className={classes['emp-list__undo-btn']}>
                      <i className="fa-solid fa-rotate-left"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className={classes['emp-list__result']}>

                <div className={classes['emp-list__1']}>
                  <div className={classes['emp-item-wrapper']}>
                    <p>결재1</p>
                    <div className={classes['emp-item']}>
                      <i className="fa-solid fa-user"></i>
                      <span>김고등어</span>
                    </div>
                  </div>
                  <div className={classes['emp-item-wrapper']}>
                    <p>결재2</p>
                    <div className={classes['emp-item']}>
                      <i className="fa-solid fa-user"></i>
                      <span>김멸치</span>
                    </div>
                  </div>
                  <div className={classes['emp-item-wrapper']}>
                    <p>결재3</p>
                    <div className={classes['emp-item']}>
                      <i className="fa-solid fa-user"></i>
                      <span>김아귀</span>
                    </div>
                  </div>
                  <div className={classes['emp-item-wrapper']}>
                    <p>결재4</p>
                    <div className={classes['emp-item']}>
                      <i className="fa-solid fa-user"></i>
                      <span>박문어</span>
                    </div>
                  </div>
                </div>

                <div className={classes['emp-list__agreement']}>
                  <div className={classes['emp-item-wrapper']}>
                    <p>합의</p>
                    <div className={classes['emp-item']}>
                      <i className="fa-solid fa-user"></i>
                      <span>최고래</span>
                    </div>
                  </div>
                  <div className={classes['emp-item-wrapper']}>
                    <p>합의</p>
                    <div className={classes['emp-item']}>
                      <i className="fa-solid fa-user"></i>
                      <span>박상어</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes['emp-list-result__btn-wrapper']}>
                <button>반영</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ApprovalCreate;
