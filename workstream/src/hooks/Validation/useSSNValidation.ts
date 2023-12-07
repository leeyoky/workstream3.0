import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/User/user-slice';

/**
 * @description 주민등록 번호 유효성 검사 커스텀 훅
 * @returns 
 */

const useSSNValidation = () => {
  const dispatch = useDispatch();

  const [ssnFront, setSSNFront] = useState('');
  const [ssnBack, setSSNBack] = useState('');

  useEffect(() => {
    dispatch(userActions.setSSN(`${ssnFront}-${ssnBack}`));
  }, [dispatch, ssnFront, ssnBack]);

  const handleSSNChange = (name: string, value: string) => {
    const ssnFrontPattern = /^\d{0,6}$/;
    const ssnBackPattern = /^\d{0,7}$/;

    if (name === 'ssnFront') {
      if (!ssnFrontPattern.test(value)) {
        alert('주민등록번호 앞자리의 경우 6자리 숫자만 입력 가능합니다.');
        return;
      }
      setSSNFront(value);
    } else if (name === 'ssnBack') {
      if (!ssnBackPattern.test(value)) {
        alert('주민등록번호 뒷자리의 경우 7자리 숫자만 입력 가능합니다.');
        return;
      }
      setSSNBack(value);
    }
  };

  return {
    ssnFront,
    ssnBack,
    handleSSNChange,
  };
  };

export default useSSNValidation;
