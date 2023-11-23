import React, { useState, useEffect } from 'react';
import './DatePick.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { ko } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';

const DatePick: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const dispatch = useDispatch();
  const formatDate = (date: Date | null) => {
    if (!date) {
      return '';
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}${month}${day}`;
  };

  
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  
  useEffect(()=>{
    const formattedDate = formatDate(selectedDate);
    dispatch(uiActions.setDate(formattedDate));
  },[selectedDate])


  const isPrevMonthDay = (date: Date) => {
    const today = new Date();
    return date.getMonth() < today.getMonth() || date.getFullYear() < today.getFullYear();
  };

  const isNextMonthDay = (date: Date) => {
    const today = new Date();
    return date.getMonth() > today.getMonth() || date.getFullYear() > today.getFullYear();
  };


  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
      isClearable
      placeholderText="Select a date"
      locale={ko}
      dayClassName={(date) =>
        `${isPrevMonthDay(date) ? 'prev-month-day' : ''} ${isNextMonthDay(date) ? 'next-month-day' : ''}`
      }
    />
  );
};

export default DatePick;
