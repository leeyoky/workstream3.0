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
  state: string;
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
  fileCount: number;
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

/* Address */
export interface AddressData {
  deptNm: string;
  empNm: string;
  officeDuty: string;
  rank: string;
  extNum: string;
  dirNum: string;
  email: string;
  skypeId: string;
  cellphone: string;
  tel: string;
  enterDate: number;
  birth: string;
  affgrp: string;
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
  orderBy?: string;
}
