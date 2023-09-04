interface SearchFormProps {
  writeDate: string;
  form: string;
  important: string;
  title: string;
  status: string;
  writer: string;
  attach: string;
}

const SearchForm: React.FC<SearchFormProps> = (props) => {
  const { writeDate, form, important, title, status, writer } = props;
  return (
    <div className="board-search-wrapper">
      <div className="board-search">
        <div className="board-search-tag">
          <label>{writeDate}</label>
          <input
            type="text"
            name={writeDate}
            placeholder={writeDate}
          />
        </div>
        <div className="board-search-tag">
          <label>{form}</label>
          <input
            type="text"
            name="department"
            placeholder={form}
          />
        </div>
        <div className="board-search-tag">
          <label>{important}</label>
          <input
            type="text"
            name="department"
            placeholder={important}
          />
        </div>

        <div className="board-search-tag">
          <label>{title}</label>
          <input
            type="text"
            name="email"
            placeholder={title}
          />
        </div>
        <div className="board-search-tag">
          <label>{status}</label>
          <input
            type="text"
            name="phone"
            placeholder={status}
          />
        </div>
        <div className="board-search-tag">
          <label>{writer}</label>
          <input
            type="text"
            name="phone"
            placeholder={writer}
          />
        </div>
        <div className="board-search-tag">
          <button className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchForm