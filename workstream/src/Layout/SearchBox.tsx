interface SearchBoxProps {
  writeDate?: string;
  form: string;
  important: string;
  title: string;
  status: string;
  writer: string;
  attach?: string;
  name?: string;
}

const SearchBox: React.FC<SearchBoxProps> = (props) => {
  const { writeDate, form, important, title, status, writer, attach, name } = props;

  const tags = [
    { label: writeDate, name: 'writeDate' },
    { label: form, name: 'department' },
    { label: important, name: 'department' },
    { label: title, name: 'email' },
    { label: status, name: 'phone' },
    { label: name, name: 'phone' },
  ];

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
