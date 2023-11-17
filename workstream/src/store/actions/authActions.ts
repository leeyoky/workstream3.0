import { useDispatch } from 'react-redux';
import { authActions } from "../auth-slice";
import { login } from '../../api/axios' 
import { useNavigate } from 'react-router-dom';

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* LOGIN  */
  const loginUser = async (username: string, password: string) => {
    try {
      const userData = {
        loginId: username,
        password: password,
      };

      const response = await login(userData); 

      if (response.status === 201) {

        // const bearerToken = response.headers.authorization;
        // const token = bearerToken.replace(/^Bearer\s+/, '');
        dispatch(authActions.login());
        // dispatch(authActions.setToken(token));
        // localStorage.setItem('token', token);
        navigate('/main');

      }else{
        throw new Error('로그인 실패')
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      throw error;
    }
  };

  /* LOGOUT */
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('token');
  };

  return { login: loginUser, logout };
};
