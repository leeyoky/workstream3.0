import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  getCurrentTime,
  getDayOfWeek,
  getToday,
  getWeatherDataOnTime,
  removeHyphens,
} from '../../../helpers/formatDateTime';
import { WeatherData } from '../../../types/Main/Main';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');
  const currentDate = getToday();
  const today = removeHyphens(currentDate);
  const baseTime = getWeatherDataOnTime();
  const getDay = getDayOfWeek();

  // 현재 시간을 업데이트하는 함수
  const updateCurrentTime = () => {
    const currentTimeString = getCurrentTime();
    setCurrentTime(currentTimeString);
  };

  /**
   * @description 오픈 소스 API를 통해 기상청에서 단기예보를 가져오는 API
   * API 제공시간 : 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${
            import.meta.env.VITE_REACT_APP_WEATHER_KEY
          }&numOfRows=12&pageNo=1&dataType=JSON&base_date=${today}&base_time=${baseTime}&nx=61&ny=125`,
        );
        console.log(response.data.response.body.items.item);
        setWeatherData(response.data.response.body.items.item);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(); // 데이터 업데이트

    const intervalId = setInterval(fetchData, 60000); // 1분마다 갱신

    // 컴포넌트가 언마운트되면 interval 해제
    return () => clearInterval(intervalId);
  }, [today, baseTime]);

  /**
   * @description 현재 시간을 1초마다 업데이트 시켜주는 함수
   * @leeyoky 2024-02-02
   */

  useEffect(() => {
    // 초기 렌더링 시 현재 시간 업데이트
    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);
    // 컴포넌트가 언마운트되면 interval 해제
    return () => clearInterval(intervalId);
  }, []);

  const getWeatherString = (value: string) => {
    switch (value) {
      case '1':
        return '맑음';
      case '3':
        return '구름 많음';
      case '4':
        return '흐림';
      default:
        return null;
    }
  };

  const getPTYString = (value: string) => {
    switch (value) {
      case '0':
        return '';
      case '1':
        return '비';
      case '2':
        return '비/눈';
      case '3':
        return '눈';
      case '4':
        return '소나기';
      default:
        return null;
    }
  };

  const skyData = weatherData.find(item => item.category === 'SKY');
  const tmpData = weatherData.find(item => item.category === 'TMP');
  const ptyData = weatherData.find(item => item.category === 'PTY');

  let weatherString: string | null = null;

  // 만약 강수량의 값이 1 이상이면 강수량 결과 값을 보여주고,
  // 0인경우엔 날씨 값을 보여줌
  if (ptyData && parseInt(ptyData.fcstValue, 10) >= 1) {
    weatherString = getPTYString(ptyData.fcstValue);
  } else if (skyData) {
    weatherString = getWeatherString(skyData.fcstValue);
  }

  let backgroundImage = '';
  let weatherIconClass = 'fa-sun';

  switch (weatherString) {
    case '맑음':
      backgroundImage = 'sunny2.jpg';
      weatherIconClass = 'fa-sun';
      break;
    case '구름 많음':
      backgroundImage = 'cloud.jpg';
      weatherIconClass = 'fa-smog';
      break;
    case '흐림':
      backgroundImage = 'cloudy2.jpg';
      weatherIconClass = 'fa-cloud';
      break;
    case '비/눈':
      backgroundImage = 'rainny.jpg';
      weatherIconClass = 'fa-cloud-showers-heavy';
      break;
    case '비':
      backgroundImage = 'rainny.jpg';
      weatherIconClass = 'fa-cloud-showers-heavy';
      break;
    case '눈':
      backgroundImage = 'shower.jpg';
      weatherIconClass = 'fa-snowflake';
      break;
    case '소나기':
      backgroundImage = 'rain2.jpg';
      weatherIconClass = 'fa-cloud-sun-rain';
      break;
    default:
      break;
  }

  return (
    <div
      className="weather-wrapper _card"
      style={{
        backgroundImage: `url(/weather/${backgroundImage})`,
      }}>
      <div className="inner-box">
        <div className="weather-main">
          <div className="weather-card-left">
            {/* 원하는 카테고리만 사용 */}
            {skyData && (
              <div className="whether-info-box _left">
                <span>
                  <i className={`fa-solid ${weatherIconClass}`}></i>
                  <span className="weather-sky-fcstValue">{weatherString}</span>
                </span>
                {tmpData && (
                  <div className="whether-temp-items">
                    <span className="weather-tmp-fcstValue">
                      {tmpData.fcstValue}
                      <span>°</span>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="weather-card-right">
            <div className="weather__time-date">
              <div className="weather__time">
                <span>{currentTime}</span>
              </div>
              <div className="weather__day">
                <span>{getDay}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
