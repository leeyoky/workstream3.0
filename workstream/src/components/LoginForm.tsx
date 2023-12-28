import React, { useState, useRef } from 'react';
import { useAuthActions } from '../store/actions/authActions';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [msg, setMsg] = useState<string>('');

  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const { login } = useAuthActions();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setter(e.target.value);
    setMsg('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    /* Validation Check */
    if (!username) {
      setMsg('아이디가 입력되지 않았습니다.');
      usernameInputRef.current?.focus();
      return;
    } else if (!password) {
      setMsg('비밀번호가 입력되지 않았습니다');
      passwordInputRef.current?.focus();
      return;
    }
    setMsg('');

    try {
      await login(username, password);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.message === '자격 증명에 실패하였습니다.') {
          setMsg('아이디 또는 비밀번호를 잘못 입력했습니다.');
        }
        /* 비밀번호 5회 이상 오류 시, 계정 입력 5회 오류로 인해 계정이 잠금되었습니다 */
      } else {
        setMsg('서버 통신 오류가 발생했습니다.');
      }
    }
  };
  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="account-container login-box">
        <h2>WorkStream</h2>
        {/* USER ID */}
        <div className="account-box account">
          <div className="bar"></div>
          <label htmlFor="username">
            <span>ID</span>
            <br />
            <input
              type="text"
              className="username"
              placeholder="ID"
              onChange={e => handleOnChange(e, setUsername)}
              value={username}
              ref={usernameInputRef}
            />
          </label>
        </div>

        {/* USER PASSWORD */}
        <div className="account-box pw">
          <div className="bar"></div>
          <label htmlFor="password">
            <span>Password</span>
            <br />
            <input
              type="password"
              className="password"
              placeholder="password"
              onChange={e => handleOnChange(e, setPassword)}
              value={password}
              ref={passwordInputRef}
            />
          </label>
        </div>
        {/* REMEMBER ME */}
        <div className="remember-me">
          <input className="remember-me-input" type="checkbox" />
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
  );
};

export default LoginForm;
