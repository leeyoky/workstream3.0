import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userAction } from '../../store/User/user-slice';

/**
 * @description 전화번호 유효성 검사를 위한 커스텀 훅
 * @returns 전화번호 상태, 유효성 검사 함수, 오류 메시지를 포함하는 객체
 */

const usePhoneValidation = () => {
  const dispatch = useDispatch();

  const [mobilePhone, setMobilePhone] = useState('');
  const [homePhone, setHomePhone] = useState('');

  const getLengthWithoutHyphen = (value: string) => {
    return value.replace(/-/g, '').length;
  };

  /* 휴대폰 번호 정규식 */
  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);

    if (cleaned.length > 11) {
      alert('휴대폰 번호는 11자리 이하로 입력해주세요.');
      return phoneNumber.substring(0, 11)
      .replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`);;

    } else if (cleaned.length === 11) {
      if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
      }
    }
      return phoneNumber;
  };

  const mobilePhoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    const phoneFilterNumber = phoneValue.replace(/\D/g, '');
  
    const formattedPhone = formatPhoneNumber(phoneFilterNumber);
  
    setMobilePhone(formattedPhone)
    dispatch(userAction.setMobilePhone(formattedPhone));
  };

  /* 집 전화번호 정규식 */

  const homePhoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    const phoneFilterNumber = phoneValue.replace(/\D/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

    if(getLengthWithoutHyphen(phoneFilterNumber) > 11){
      alert('전화번호부 양식이 맞지 않습니다.')
      return phoneValue.substring(0, 11).replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    }
  
    setHomePhone(phoneFilterNumber)
  
    dispatch(userAction.setHomePhone(phoneFilterNumber));
  };

  return {
    mobilePhone,
    homePhone,
    mobilePhoneChangeHandler,
    homePhoneChangeHandler,
  };
};

export default usePhoneValidation;
