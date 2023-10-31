import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';

interface SearchBoxOption {
  label: string;
  value: string;
}
interface SearchBoxProps {
  tags: { label: string; name: string; type?: string; options?:SearchBoxOption[] }[];
}

const SearchBox: React.FC<SearchBoxProps> = ({ tags }) => {
  const [localSearchInput, setLocalSearchInput] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string) => {
    const inputValue = e.target.value;
    setLocalSearchInput((prevSearchInput) => ({ ...prevSearchInput, [name]: inputValue }));
  }

  const searchHandler = () => {
    // 검색어 객체를 복제
    const updatedSearchInput = { ...localSearchInput };
  
    // 각 검색어 필드를 검사하고 비어 있는 필드를 삭제
    for (const key in updatedSearchInput) {
      if (updatedSearchInput[key] === '') {
        delete updatedSearchInput[key];
      }
    }
  
    // 수정된 검색어 객체를 사용하여 쿼리를 서버로 보냄
    dispatch(uiActions.searchInput(updatedSearchInput));
  
    // 서버로 보내기 전에 검색어 확인
    console.log('검색어:', updatedSearchInput);
  }

  return (
    <div className="board-search-wrapper">
      <div className="board-search">
        {tags.map((tag, index: number) => (
          <div key={index.toString()} className="board-search-tag">
            <label>{tag.label}</label>
            {tag.type === 'select' ? ( 
              <select
                name={tag.name}
                value={localSearchInput[tag.name] || ''}
                onChange={(e) => inputChangeHandler(e, tag.name)}
              >
              {tag.options?.map((option, optionIndex) => (
                <option key={optionIndex} value={option.value}>
                  {option.label}
                </option>
              ))}
              </select>
            ) : (
              <input
                type="text"
                name={tag.name}
                placeholder={tag.label}
                value={localSearchInput[tag.name] || ''}
                onChange={(e) => inputChangeHandler(e, tag.name)}
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
