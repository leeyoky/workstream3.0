import { ReactNode } from "react"
import Pagination from "../Layout/Pagination"
import SearchForm from "../Layout/SearchBox"
import BoardTitle from "../Layout/BoardTitle";

interface IndexPageProps {
  children? : ReactNode;
  boardTitle : string;
  searchForm : string;
}

const IndexPage:React.FC<IndexPageProps> = (props) => {
  return (
      <>
        <BoardTitle title={props.boardTitle}/>
        <div className="index-box">
          <SearchForm form={props.searchForm} />
            {props.children}
          <Pagination />
        </div>
      </>
  )
}

export default IndexPage