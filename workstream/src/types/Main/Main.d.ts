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
  status: string;
  category: string;
  title: string;
  content: string;
  regUsr: string;
  regUsrNm: string;
  modUsr: string;
  regDate: string;
  modDate: string;
  popupYn: string;
  popupStart: string;
  popupEnd: string;
}

export interface NoticeData {
  title: string;
  category: string;
  content: string;
  regUsr: string;
  popupYn: string;
  popupStart: Date | null;
  popupEnd: Date | null;
}

/* params */

export interface GetNoticeListParams {
  page?: number;
  size?: number;
  state?: string;
  category?: string;
  title?: string;
  regUsrNm?: string;
  regDateGoe?: string;
  regDateLoe?: string;
}
