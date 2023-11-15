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

export function getToday() {
  const today = new Date();
  const getDate = today.toISOString().slice(0,10);

  return getDate;
}

export default formatDateTime;
