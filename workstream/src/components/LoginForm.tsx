import React, { useState, useRef } from 'react';
import { useAuthActions } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [msg, setMsg] = useState<string>("");

  const { login } = useAuthActions();
  const navigate = useNavigate();
  
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnChange = (
      e: React.ChangeEvent<HTMLInputElement>, 
      setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
      setter(e.target.value);
      setMsg('');
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    /* Validation Check */
    if(!username){
      setMsg('아이디가 입력되지 않았습니다.')
      usernameInputRef.current?.focus();
      return;
    }else if(!password){
      setMsg('비밀번호가 입력되지 않았습니다')
      passwordInputRef.current?.focus();
      return;
    }
    setMsg('');

  try {
    await login(username, password);
    // 로그인 성공 시 페이지 이동
    navigate('/main');
  } catch (error) {
    setMsg('아이디 혹은 비밀번호가 잘못되었습니다.');
  }
}
  return ( 
    <form className="login-form" onSubmit={handleLogin}>
      <div className="account-container login-box">
        <h2>WorkStream</h2>
        {/* USER ID */}
        <div className="account-box account">
          <div className="bar"></div>
          <label htmlFor='username'>
            <span>ID</span><br />
            <input
              type="text"
              className="username"
              placeholder="ID"
              onChange={(e) => handleOnChange(e, setUsername)}
              value={username}
              ref={usernameInputRef}
            />
          </label>
        </div>

        {/* USER PASSWORD */}
        <div className="account-box pw">
          <div className="bar"></div>
          <label htmlFor="password">
            <span>Password</span><br />
            <input
              type="password"
              className="password"
              placeholder="password"
              onChange={(e) => handleOnChange(e, setPassword)}
              value={password}
              ref={passwordInputRef}
            />
          </label>
        </div>
        {/* REMEMBER ME */}
        <div className="remember-me">
          <input
            className="remember-me-input"
            type="checkbox"
          />
          <label className="remember-me-label">Remember me</label>
        </div>
      </div>

      <p className="logMessage">{msg}</p>

    <div className="account-container login-btn-box">
      <button className="custom-btn login-btn" type="submit">
        <span>Login</span>
      </button>
      <button className="forgot-pw-btn">Forgot Password?</button>
    </div>
  </form>
  )
  }

export default LoginForm