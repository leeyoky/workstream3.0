import React, { useEffect, useState } from 'react';
import classes from '../../../pages/Approval/Approval.module.css';
import logoSmall from '../../../assets/img/logo.png';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import SignatureEdit from './SignatureEdit';
import { useParams } from 'react-router-dom';
import { useResinationData } from '../../../hooks/Approval/useResinationData';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';
import { userAction } from '../../../store/User/user-slice';

type ResinationDetailProps = {
  temp: boolean;
  setTemp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResinationDetail: React.FC<ResinationDetailProps> = ({ temp, setTemp }) => {
  
  const { id = ''} = useParams<string>();
  const { data } = useResinationData(id);
  const [ dataState, setDataState] = useState(data); 
  const isEdit = useSelector((state:RootState) => state.approval.isEditMode);
  const dispatch = useDispatch();

  const [ ssnFront, setSSNFront ] = useState('');
  const [ ssnBack, setSSNBack ] = useState('');
  const [ userAddress, setUserAddress ] = useState('');
  const [ reasonRetirement, setReasonRetirement ] = useState(''); 
  const [ homePhone, setHomePhone ] = useState('');
  const [ mobilePhone, setMobilePhone ] = useState('');

  const deleteHypenFront = data?.resignation.identityNo?.split('-')[0];
  const deleteHypenBack = data?.resignation.identityNo?.split('-')[1];
  const stateUserAddress = data?.resignation.address;
  const stateReason = data?.resignation.reasons;
  const stateHomeContact = data?.resignation.homeContact;
  const stateMobileContact = data?.resignation.mobileContact;


  const initializeData = () => {
    console.log('temp', temp);

    if(data) {
      setDataState(data);
      setSSNFront(deleteHypenFront || '');
      setSSNBack(deleteHypenBack || '');
      setUserAddress(stateUserAddress || '');
      setReasonRetirement(stateReason || '');
      setHomePhone(stateHomeContact || '');
      setMobilePhone(stateMobileContact || '');
  
      if (isTempStorage()) {
        setTemp(true);
        dispatch(selectedActions.setIsEditMode(true));
      } else {
        setTemp(false);
        dispatch(selectedActions.setIsEditMode(false));
      }

    }
  }
  
  useEffect(()=> {
    initializeData();
  },[isEdit, data])
  
  useEffect(()=> {
    dispatch(selectedActions.setIsDetailMode(true));
  }, [dataState, dispatch])

    // 임시저장 여부 확인
    const isTempStorage = () => {
      return dataState?.resignation.state === 'TEMP';
    };

  const userSSNchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const ssnFrontPattern = /^\d{0,6}$/;
    const ssnBackPattern = /^\d{0,7}$/;
  
    if (name === 'ssnFront' && ssnFrontPattern.test(value)) {
      setSSNFront(value);
      dispatch(userAction.setSSN(`${value}-${ssnBack}`));
    } else if (name === 'ssnBack' && ssnBackPattern.test(value)) {
      setSSNBack(value);
      dispatch(userAction.setSSN(`${ssnFront}-${value}`));
    }
  };

  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userAddress = e.target.value;
    setUserAddress(userAddress)
    dispatch(userAction.setAddress(userAddress));
  }

  const homePhoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    setHomePhone(phoneValue);
    dispatch(userAction.setHomePhone(phoneValue));
  };

  const mobilePhoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    setMobilePhone(phoneValue);
    dispatch(userAction.setMobilePhone(removeHyphen(phoneValue)));
  }

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return phoneNumber;
  };

  const removeHyphen = (phoneNumber: string) => phoneNumber.replace(/-/g, '');

  const exitChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reasonRetirement = e.target.value;
    setReasonRetirement(reasonRetirement)
    dispatch(selectedActions.setReasonRitire(reasonRetirement));
  }

  return (
    <React.Fragment>
      <form>
        <header className={classes['header-type']}>
          <div className={classes['header-logo']}>
            <img src={logoSmall} alt="Logo" />
          </div>
          <div className={classes['header-box__wrapper']}>
            <div className={classes['header__left']}>
              <h1>사 직 원</h1>
              <p> - 그 동안의 노고에 감사드립니다 - </p>
            </div>
            <SignatureEdit/>
          </div>
          <table className={classes['header-info']}>
            <tbody>
              <tr>
                <th className={classes['body-table__150']}>부 서 명</th>
                <td colSpan={2} className={classes['body-table__300']}>
                {dataState?.resignation.regUsrDeptNm}
                </td>
                <th className={classes['body-table__150']}>직책/직위</th>
                <td colSpan={2}>
                {dataState?.resignation.rankNm}
                </td>
              </tr>
              <tr>
                <th>성 명</th>
                <td colSpan={2}>
                {dataState?.resignation.regUsrNm}
                </td>
                <th>주민 번호</th>
                <td colSpan={2}>
                  {isEdit? (
                    <>
                      <input 
                      className={`${classes['body-table__input']} ${classes['RRnumber']}`} 
                      type="text" 
                      placeholder='●●●●●●'
                      name='ssnFront'
                      value={ssnFront}
                      onChange={userSSNchangeHandler}
                      />
                      <span className={classes['hyphen']}> - </span> 
                      <input 
                        className={`${classes['body-table__input']} ${classes['RRnumber']}`} 
                        type="text" 
                        placeholder='●●●●●●●'
                        name='ssnBack'
                        value={ssnBack}
                        onChange={userSSNchangeHandler}
                        />
                    </>
                  ): (
                    dataState?.resignation.identityNo
                  )}
                </td>
              </tr>
              <tr>
                <th>입사 일자</th>
                <td colSpan={2}>
                  {dataState?.resignation.enterDate}
                </td>
                <th>퇴사 일자</th>
                <td colSpan={2}>
                  {dataState?.resignation.resignationDate}
                </td>
              </tr>
              <tr>
                <th>현재 주소</th>
                <td colSpan={2}>
                  {isEdit? (
                    <input 
                    className={classes['body-table__input']} 
                    type="text" 
                    onChange={addressChangeHandler}
                    value={userAddress}
                    />
                  ): (
                  dataState?.resignation.address
                  )}
                </td>
                <th rowSpan={2}>연 락 처</th>
                <th className={classes['body-table__100']}>집</th>
                <td>
                  {isEdit? (
                    <input
                    className={classes['body-table__input']}
                    type="text"
                    onChange={homePhoneChangeHandler}
                    value={homePhone}
                  />
                  ): (
                  dataState?.resignation.homeContact
                  )}
                </td>
              </tr>
              <tr>
                <th>퇴직 사유</th>
                <td colSpan={2}>
                  { isEdit? (
                    <input 
                    className={classes['body-table__input']} 
                    type="text"
                    onChange={exitChangeHandler}
                    value={reasonRetirement} />
                  ) : (
                    dataState?.resignation.reasons
                  )}
                </td>
                <th>휴대폰</th>
                <td>
                  {isEdit? (
                    <input
                    className={classes['body-table__input']}
                    type="text"
                    onChange={mobilePhoneChangeHandler}
                    value={formatPhoneNumber(mobilePhone)}
                  />
                  ): (
                    dataState?.resignation.mobileContact
                  )}
                </td>
              </tr>
            </tbody>
          </table>

        {/* 사직자 준수사항 및 현업 부서장 및 업무인수자 준수사항 */}
        <table className={classes['text-table']}>
          <tbody>
            <td>
              <div className={classes['text-wrapper']}>
                <div>
                  <strong>1. 사직자 준수사항</strong>
                  <p className={classes['first-paragraph']}>① 상기자 본인은 후임자에게 업무인계를 성실히 이행하겠습니다.</p>
                  <p>② 상기자 본인은 부정경쟁방지법 제11조 및 12조의 규정과 회사의 비밀 관리 규정을 준수하여, 
                    근무 중 인지한 경영, 재정, 영업, 기술, 마케팅 등 
                    <br />&emsp; 회사기밀에 해당하는 내용을 타사 및 기타 방법으로 절대 이용치 않을 것이며, 
                    경쟁사에 사전 허가 없이 누설 혹은 유출 시 회사에 발생한
                    <br />&emsp; 유,무형의 손실에 대해 전적으로 민형사상 책임을 지겠습니다.
                  </p>
                  <p>③ 퇴직 후에도 회사의 명예를 훼손시키는 언행을 절대 하지 않겠습니다.</p>
                </div>
                <div className={classes['second-paragraph']}>
                  <strong>2. 현업 부서장 및 업무인수자 준수사항</strong>
                  <p className={classes['first-paragraph']}>① 현업 부서장은 부서원이 사직할 경우 업무적인 인수인계 부분을 최종적으로 확인한다.
                    (부서장이 퇴사할 경우 차 하위직원이 확인) </p>
                  <p>② 현업 부서장은 사직에 관련된 제반 첨부서류 내용을 최종적으로 확인한다.</p>
                  <p>③ 현업 부서장은 사직원 결재란에 최종 결재하면서 사직자와 회사 사이에 발생한 채권, 채무 관계를 마무리하여야 하며, 
                    이러한 관리를 소홀히
                    <br />&emsp; 하였을 때는 업무태만으로 간주하여 민, 형사상 책임을 진다.</p>
                </div>
              </div>
              <div className={classes['date_wrapper']}>
                <span>{dataState?.resignation.resignationDate}</span>
              </div>
              <div className={classes['user-sign']}>
                <div className={classes['user-sign-box']}>
                  <span>작성자: </span>
                  <span>{dataState?.resignation.regUsrNm}</span>
                  <span>(서명)</span>
                </div>
              </div>
              <div className={classes['attachment-warpper']}>
                <div>첨부</div>
                <div>
                <p><span className={classes['attachment-item']}>1. 업무인수인계 확인서 1부.</span></p>
                <p><span>2. 업무인수인계 세부내역서 1부.</span></p>
                <p><span>3. 퇴직서약서 1부.</span></p>
                </div>
              </div>
            </td>
          </tbody>
        </table>
      </header>
      <footer>
        <p className={classes['footer']}>주식회사 데이터스트림즈</p>
      </footer>
    </form>
  </React.Fragment>
  );
};

export default ResinationDetail;