/* Weather */
export interface WeatherData {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  fcstValue: string;
}

/* Notice */

export interface NoticeList {
  id: string;
  type: string;
  title: string;
  content: string;
  regUsr: string;
  regDate: string;
  modUsr: string;
  modDate: string;
}
