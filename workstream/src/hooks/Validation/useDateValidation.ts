import { useState } from 'react';
import { formatDateOnly, getToday } from '../../helpers/formatDateTime';

/**
 * @description param과 오늘 날짜를 비교하여 과거 날짜를 선택할 수 없게 만든 함수
 * @param initialDate
 * @returns
 */

function useDateValidation(initialDate: Date | null) {
  const [validatedDate, setValidatedDate] = useState<Date | null>(initialDate);
  const validateDate = (date: Date | null) => {
    const formattedDate = date ? formatDateOnly(date.toISOString()) : '';
    const today = getToday();
    const formattedToday = formatDateOnly(today);

    // 현재 날짜보다 앞선 경우
    if (formattedDate < formattedToday) {
      alert('과거 날짜를 선택할 수 없습니다.');
      return;
    } else {
      setValidatedDate(date);
    }
  };

  return { validatedDate, validateDate };
}

export default useDateValidation;
