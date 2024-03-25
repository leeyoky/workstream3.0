/**
 * 숫자만 입력 받게 하는 함수
 * @param {number} value
 * @returns
 */

export const numberValidation = (value: string): string => {
  console.log('onlyNumber:', value);

  if (!/^\d*\.?\d*$/.test(value)) {
    alert('숫자만 입력해 주세요');
    return value.replace(/[^\d.]/g, '');
  }
  return value;
  // return value.replace(/[^\d.]/g, '');
};

/**
 * 숫자를 화폐 단위로 포맷팅하는 함수
 * @param {number} value 포맷팅할 숫자
 * @returns {string} 화폐 단위로 포맷팅된 문자열
 */
export const formatCurrency = (value: string) => {
  const numericValue = value.replace(/[^\d.]/g, ''); // 숫자 이외의 문자 제거
  const formattedValue = numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 화폐 단위로 포맷팅
  return formattedValue;
};

/**
 * 숫자를 한글로 변환하는 함수
 * @param {number} num 한글로 변환할 숫자
 * @returns {string} 한글로 변환된 문자열
 */
export const numberToKorean = (num: number) => {
  const units = [
    '',
    '십',
    '백',
    '천',
    '만',
    '십만',
    '백만',
    '천만',
    '억',
    '십억',
    '백억',
    '천억',
    '조',
    '십조',
    '백조',
    '천조',
  ];
  const numbers = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];

  const numArray = num.toString().split('').map(Number);
  const resultArray = [];

  for (let i = 0; i < numArray.length; i++) {
    if (numArray[i] !== 0) {
      resultArray.push(numbers[numArray[i]]);
      resultArray.push(units[numArray.length - i - 1]);
    }
  }

  return resultArray.join('');
};
