import mainImg from '../img/main.jpg'
import logo from '../img/logo.png'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  return (
    <div className="wrapper">
        <div className="login-main-wrapper">
          <img src={mainImg} alt="mainImg" /> 
        </div>
        <div className="login-wrapper">
            <div className="login-selectBox">
                <select className="login-selectBox lang-select" name="" id="" >
                    <option value="">Language</option>
                    <option value="">Korean</option>
                    <option value="">English</option>
                </select>
            </div>
              <LoginForm />
            <div className="login-wrapper-img">
                <img src={logo} alt="logo" />
            </div>
        </div>
    </div>
  )
}

export default LoginPage