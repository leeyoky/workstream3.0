import { useDispatch } from 'react-redux';
import { authActions } from "../auth-slice";
import { login } from '../../api/axios' 

export const useAuthActions = () => {
  const dispatch = useDispatch();

  /* LOGIN  */
  const loginUser = async (username: string, password: string) => {
    try {
      const userData = {
        username: username,
        password: password,
      };

      const response = await login(userData); 

      if (response.status === 201) {
        const bearerToken = response.headers.authorization;
        const token = bearerToken.replace(/^Bearer\s+/, '');
        dispatch(authActions.login());
        dispatch(authActions.setToken(token));
        localStorage.setItem('token', token);
      } 
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  /* LOGOUT */
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('token');
  };

  return { login: loginUser, logout };
};
