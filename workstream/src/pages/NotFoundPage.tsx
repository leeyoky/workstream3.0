import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="notFound-page">
    <div className="notFound-page-container">
      <span className="notFound-404">404</span>
      <span className="notFound-text"> Page not found :-&#40; </span>
      <span className="notFound-kor"
        >주소가 잘못되었거나 제공되지 않는 페이지입니다.
      </span>
      <Link to="/main" className="notFound-routers"
        >메인 화면으로 이동
      </Link>
    </div>
  </div>
  )
}

export default NotFoundPage