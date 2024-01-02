import { useDispatch } from 'react-redux';
import { authActions } from '../auth-slice';
import { getLoginUserInfo, getUserInfo, login, logoutUser } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../User/user-slice';
import { log } from 'console';

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* LOGIN  */
  const loginUser = async (username: string, password: string) => {
    try {
      const formData = new FormData();
      formData.append('loginId', username);
      formData.append('password', password);

      const response = await login(formData);
      const setToken = response.headers.authorization;
      const trimmedToken = setToken.replace(/Bearer\s*/i, '');

      if (response.status === 201) {
        localStorage.setItem('token', trimmedToken);
        dispatch(authActions.login());
        dispatch(authActions.setToken(trimmedToken));
        navigate('/main');
        fetchEmployee();
      } else {
        throw new Error('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      throw error;
    }
  };

  /* LOGOUT */
  const logout = async () => {
    try {
      await logoutUser();
      dispatch(authActions.logout());
      dispatch(authActions.deleteToken());
      localStorage.clear();
    } catch (error) {
      console.error();
    }

    //localStorage.removeItem('token');
  };

  /* GET LOGINUSER INFO */

  const fetchEmployee = async () => {
    try {
      const response = await getLoginUserInfo();
      const data = response.data;
      dispatch(authActions.setUserInfo(data));

      fetchUserInfo(response.data.empNo);
    } catch (error) {
      console.log('서버 통신 오류', error);
    }
  };

  const fetchUserInfo = async (userId: string) => {
    try {
      const response = await getUserInfo(userId);
      const data = response.data.content[0];
      dispatch(userActions.setUserInfo(data));
      console.log('fetchUserInfo');
    } catch (error) {
      console.log(error);
    }
  };

  return { login: loginUser, logout, fetchEmployee };
};
