import React, { ReactNode } from "react"
import SearchBox from "../Layout/BoardLayout/SearchBox/SearchBox"
import BoardTitle from "../Layout/BoardLayout/BoardTitle";
import PageSizing from "../Layout/BoardLayout/Pagination/PageSizing";
import Pagination from "../Layout/BoardLayout/Pagination/Pagination";
interface SearchTag {
  label: string;
  name: string;
}
interface IndexPageProps {
  children? : ReactNode;
  boardTitle : string;
  searchTags : SearchTag[];
}

const IndexPage:React.FC<IndexPageProps> = (props) => {


  return (
      <div className='page-wrapper'>
        <BoardTitle title={props.boardTitle}/>
        <div className="index-box">
          <SearchBox tags={props.searchTags} />
          <PageSizing />
            {props.children}
        </div>
          <Pagination />
      </div>
  )
}

export default IndexPage