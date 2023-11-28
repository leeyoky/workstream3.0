import { useDispatch } from "react-redux";
import React from "react"
import { uiActions } from "../../../store/ui-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const PageSizing:React.FC = () => {
  const pageSize = useSelector((state: RootState) => state.ui.selectPageSize);
  const dispatch = useDispatch();

  const pageSizeOptions = [10,20,30]

  const onPageSizeChange = (pageSize:number) => {
    dispatch(uiActions.selectPageSize(pageSize))
  }
  
  return (
    <div className="page-size-wrapper">
      <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}개
          </option>
        ))}
      </select>
    </div>
  )
}

export default PageSizing