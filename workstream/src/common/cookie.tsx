import { Cookies } from 'react-cookie';

const cookies = new Cookies();

/** Key, Value를 받아 Cookie 생성 후 저장
 *
 * @param {string} username
 * @param {string} password
 */

export const setCookie = (username: string, password: string) => {
  return cookies.set(username, password, { path: '/' });
};

/** Key를 받아 Value를 반환
 *
 * @param username
 * @returns {string}
 */

export const getCookie = (username: string) => {
  return cookies.get(username);
};
/** Key를 받아 쿠키 삭제
 *
 * @param {string} username
 */

export const removeCookie = (username: string) => {
  return cookies.remove(username);
};

export default setCookie;
