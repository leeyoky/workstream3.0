import React, { useEffect } from 'react';
import './DatePick.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { ko } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';

interface DatePickProps {
  placeholderText: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  dateFormat: string;
}

const DatePick: React.FC<DatePickProps> = ({ placeholderText, selected, onChange }) => {
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
    onChange(date);
  };

  const customHeader = ({ date, decreaseMonth, increaseMonth }: any) => {
    return (
      <div className="custom-header">
        <button onClick={decreaseMonth}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <span>{date.toLocaleDateString(ko, { month: 'long', year: 'numeric' })}</span>
        <button onClick={increaseMonth}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    );
  };

  useEffect(() => {
    const formattedDate = formatDate(selected);
    dispatch(uiActions.setDate(formattedDate));
  }, [selected]);

  return (
    <DatePicker
      selected={selected}
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
      isClearable
      placeholderText={placeholderText}
      locale={ko}
      renderCustomHeader={customHeader}
    />
  );
};

export default DatePick;
