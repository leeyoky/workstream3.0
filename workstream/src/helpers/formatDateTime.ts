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

export const getCurrentTime = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

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

/**
 * 현재 날짜와 요일을 반환하는 함수
 *
 */

export const getDayOfWeek = () => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const today = new Date();
  const dayOfMonth = today.getDate();
  const dayOfWeekIndex = today.getDay();
  const dayOfWeek = daysOfWeek[dayOfWeekIndex];

  const month = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.

  return `${month}/${dayOfMonth} ${dayOfWeek}`;
};

/**
 * @description 하이픈 제거 함수
 * @param dateString
 * @returns
 */

export const removeHyphens = (dateString: string): string => {
  return dateString.replace(/-/g, '');
};

/**
 * @description 기상청 api 시간에 맞게 호출하는 함수
 * @returns {string} API 호출에 사용할 base_time 값 (HHMM 형식)
 */

export const getWeatherDataOnTime = () => {
  const currentTime = new Date();
  const apiTimes = ['02:10', '05:10', '08:10', '11:10', '14:10', '17:10', '20:10', '23:10'];

  let closestApiTime: Date | null = null;
  let closestApiDiff = Infinity;

  for (const apiTime of apiTimes) {
    const [apiHour, apiMinute] = apiTime.split(':');
    const apiDateTime = new Date(currentTime);
    apiDateTime.setHours(Number(apiHour), Number(apiMinute), 0, 0);

    const timeDifference = Math.abs(apiDateTime.getTime() - currentTime.getTime());

    if (timeDifference < closestApiDiff) {
      closestApiDiff = timeDifference;
      closestApiTime = apiDateTime;
    }
  }
  // 최근 API 시간을 찾지 못한 경우 null 반환
  if (closestApiTime === null) {
    return null;
  }

  // 가장 최근의 API 시간을 문자열로 반환 (HHMM 형식).
  const formattedApiTime =
    closestApiTime.getHours().toString().padStart(2, '0') +
    closestApiTime.getMinutes().toString().padStart(2, '0');

  return formattedApiTime;
};

export default formatDateTime;
