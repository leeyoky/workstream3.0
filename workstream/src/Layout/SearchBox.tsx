import React from 'react';

interface SearchBoxProps {
  tags: { label: string, name: string }[];
}

const SearchBox: React.FC<SearchBoxProps> = ({ tags }) => {
  return (
    <div className="board-search-wrapper">
      <div className="board-search">
        {tags.map((tag, index) => (
          <div key={index} className="board-search-tag">
            <label>{tag.label}</label>
            <input
              type="text"
              name={tag.name}
              placeholder={tag.label}
            />
          </div>
        ))}
        <div className="board-search-tag">
          <button className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
