import React, { useState } from 'react';
import { SearchBoxOption } from '../../../types/Approval/Approaval';
import DatePick from '../../../components/DatePick';

interface DatePickerSearchProps {
  tag: {
    label: string;
    name: string;
    class?: string;
    options?: SearchBoxOption[];
  };
  localSearchInput: { [key: string]: string };
  setLocalSearchInput: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const DatePickerSearch: React.FC<DatePickerSearchProps> = ({ setLocalSearchInput }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const formatToYMD = (date: Date | null) => {
    if (!date) {
      return '';
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    updateLocalSearchInput(date, endDate);
  };

  const handleEndDateChange = (date: Date | null) => {
    if (startDate && date && date < startDate) {
      // 종료일이 시작일보다 빠른 경우
      alert('종료일은 시작일 이후여야 합니다.');
      setEndDate(null);
    } else {
      setEndDate(date);
      updateLocalSearchInput(startDate, date);
    }
  };

  const updateLocalSearchInput = (start: Date | null, end: Date | null) => {
    setLocalSearchInput((prev) => ({
      ...prev,
      regDateGoe: formatToYMD(start),
      regDateLoe: formatToYMD(end),
    }));
  };

  return (
    <div className='datepicker-searchbox__wrapper'>
      <DatePick
        placeholderText='시작일'
        selected={startDate}
        onChange={(date) => handleStartDateChange(date)}
      />
      <span>~</span>
      <DatePick
        placeholderText='종료일'
        selected={endDate}
        onChange={(date) => handleEndDateChange(date)}
      />
    </div>
  );
};

export default DatePickerSearch;
