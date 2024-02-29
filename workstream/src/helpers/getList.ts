import axios from 'axios';

interface GetListParams {
  [key: string]: any;
}

const NODE_API_SERVER = 'http://localhost:5500';

/**
 * @description get요청 시 query를 담아 보내는 함수
 * @date 2024-02-29
 * @author Yeongkyung Lee
 */

export const getList = (endpoint: string, params: GetListParams) => {
  // params가 null 또는 undefined이면 빈 객체로 설정.
  if (params === null || params === undefined) {
    params = {};
  }

  const queryString = Object.keys(params)
    .filter(key => params[key] !== undefined)
    .map(key => `${key}=${params[key]}`)
    .join('&');

  console.log('queryString', queryString);

  return axios.get(`${NODE_API_SERVER}/${endpoint}?${queryString}`);
};
