/**
 * 연-월-일 시:분:초 반환 함수
 * 
 * @param datetimeString 
 * @returns 
 */
export function formatDateTime(datetimeString: string): string {
  // 'T'를 공백으로 교체
  datetimeString = datetimeString.replace('T', ' ');

  const date = new Date(datetimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}

/**
 * 연-월-일 시:분 반환함수
 * 
 * @param datetimeString 
 * @returns 
 */
export function formatDateMinutes(datetimeString: string): string {
  // 'T'를 공백으로 교체
  datetimeString = datetimeString.replace('T', ' ');

  const date = new Date(datetimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const formatDateMinutes = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formatDateMinutes;
}

/**
 * 연-월-일 반환 함수
 * 
 * @param datetimeString 
 * @returns 
 */
export function formatDateOnly(datetimeString: string): string {
  if (!datetimeString) {
    return ''; // 빈 문자열 또는 다른 기본값을 반환하거나 오류 처리를 수행
  }
  
  // 'T'를 공백으로 교체
  datetimeString = datetimeString.replace('T', ' ');

  const date = new Date(datetimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

/**
 * 오늘 날짜를 연-월-일 형식을 선택하거나, 연.월.일로 변환하는 함수
 * param을 아무것도 넘기지 않으면 default hyphen
 * 
 * @param format 
 * @returns 
 */
export function getToday(format: 'hyphen' | 'dot' = 'hyphen') {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  let separator: string;

  if (format === 'dot') {
    separator = '.';
  } else {
    separator = '-';
  }

  const getDate = `${year}${separator}${month}${separator}${day}`;

  return getDate;
}

export default formatDateTime;
