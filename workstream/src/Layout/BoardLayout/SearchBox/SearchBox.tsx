import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { SearchBoxProps } from '../../../types/Approval/Approaval'; 
import SelectBox from './SelectBox';
import DatePickerSearch from './DatePickerSearch';

const SearchBox: React.FC<SearchBoxProps> = ({ tags }) => {
  const [localSearchInput, setLocalSearchInput] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string) => {
    const inputValue = e.target.value;
    setLocalSearchInput((prevSearchInput) => ({ ...prevSearchInput, [name]: inputValue }));
  }

  const searchHandler = () => {
    const updatedSearchInput = { ...localSearchInput };

    for (const key in updatedSearchInput) {
      if (updatedSearchInput[key] === '') {
        delete updatedSearchInput[key];
      }
    }
    // 수정된 검색어 객체를 사용하여 쿼리를 서버로 보냄
    dispatch(uiActions.searchInput(updatedSearchInput));
    dispatch(uiActions.selectPage(0));
  }

  /* 엔터키로 검색 */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  }

  return (
    <div className="board-search-wrapper">
      <div className="board-search">
        {tags.map((tag: any, index: number) => (
          <div 
            key={index.toString()} 
            className='board-search-tag'>
            <label>{tag.label}</label>
            {tag.type === 'select' ? (
              <SelectBox tag={tag} localSearchInput={localSearchInput} setLocalSearchInput={setLocalSearchInput} />
            ) : tag.type === 'date' ? (
              <DatePickerSearch
                tag={tag}
                localSearchInput={localSearchInput}
                setLocalSearchInput={setLocalSearchInput}
              />
            ) : (
              <input
                type="text"
                name={tag.name}
                placeholder={tag.label}
                value={localSearchInput[tag.name] || ''}
                onChange={(e) => inputChangeHandler(e, tag.name)}
                onKeyDown={handleKeyPress}
              />
            )}
          </div>
        ))}
        <div className="board-search-tag">
          <button className="search-btn" onClick={searchHandler}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
