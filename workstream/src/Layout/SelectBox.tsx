import React, { useState, useRef, useEffect } from 'react';
import { SearchBoxOption } from '../types/Approval/Approaval';
import { getDepartment } from '../api/axios';

const SelectBox: React.FC<{
  tag: {
    label: string;
    name: string;
    class?: string;
    options?: SearchBoxOption[];
  };
  localSearchInput: { [key: string]: string };
  setLocalSearchInput: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}> = ({ tag, localSearchInput, setLocalSearchInput }) => {

  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

  const toggleOptions = async() => {

    setShowOptions(!showOptions);
    console.log(tag.name);

    setIsLoading(true);

    if (tag.name === 'deptCd') {
        try {
          const response = await getDepartment();
          const data = response.data;

          // API에서 받은 데이터를 옵션으로 설정합니다.
          const deptOptions = data.map((dept: any) => ({
            label: dept.deptNm,
            value: dept.deptCd,
          }));

          tag.options = deptOptions;
          
          console.log('옵션 : ' , deptOptions);
          setIsLoading(false);
          
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
    }
  };

  const handleOptionClick = (option: string) => {
    // 디스패치할 때 option의 value를 사용
    setLocalSearchInput((prevSearchInput) => ({ 
      ...prevSearchInput, 
      [tag.name]: option,
    }));
    setShowOptions(false);
  };

  const handlerOutsideHandler = (e: MouseEvent) => {
    if (selectBoxRef.current && !selectBoxRef.current.contains(e.target as Node)) {
      setShowOptions(false);
    }
  }

  // 모달 외부를 클릭할 때 이벤트 리스너를 추가
  useEffect(() => {
    document.addEventListener('mousedown', handlerOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', handlerOutsideHandler);
    };
  }, []);

  return (
    <div 
      ref={selectBoxRef} 
      className={`select-box ${tag.class === 'col-4' ? 'col-4' : ''}`} 
      onClick={toggleOptions}
      >
      <label className={`${showOptions ? "setData" : ""}`}>
        <span>{tag.options?.find((option) => option.value === localSearchInput[tag.name])?.label || "전체"}</span>
        <i className={`fa-solid ${showOptions ? "fa-caret-up" : "fa-caret-down"}`}>
        </i>
      </label>
      <ul className={`options ${showOptions ? "show" : ""}`}>
        <li
          onClick={() => handleOptionClick('')}
          className={localSearchInput[tag.name] === '' ? 'active' : ''}
        >
          전체
        </li>
        {tag.options?.map((option) => (
          <li
            key={option.label}
            onClick={() => handleOptionClick(option.value)}
            className={localSearchInput[tag.name] === option.value ? 'active' : ''}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectBox;
