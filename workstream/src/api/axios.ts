import axios from "axios";

const baseURL = "http://192.168.1.70:8089/"

export default axios.create({
  baseURL: baseURL,
});


/* LOGIN */

// 로그인 API


// 신규 입사 API
// ID 중복체크 API