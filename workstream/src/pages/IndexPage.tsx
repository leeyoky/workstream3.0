import React, { ReactNode } from "react"
import Pagination from "../Layout/Pagination"
import SearchBox from "../Layout/SearchBox"
import BoardTitle from "../Layout/BoardTitle";
import PageSizing from "../Layout/PageSizing";
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