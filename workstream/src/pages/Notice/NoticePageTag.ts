export const searchTags = [
  {
    label: '분류',
    name: 'category',
    class: 'col-4',
    type: 'select',
    options: [
      { label: '공지사항', value: 'NOTICE01' },
      { label: '인사', value: 'NOTICE02' },
      { label: '경조사', value: 'NOTICE03' },
    ],
  },
  { label: '제목', name: 'title', class: 'col-7' },
  { label: '작성자', name: 'regUsrNm', class: 'col-7' },
  { label: '작성일', name: 'regDate', type: 'date' },
];

export const columns = [
  { name: '분류', sort: false },
  { name: '제목', sort: true },
  { name: '작성자', sort: true },
  { name: '작성일', sort: true },
  { name: '팝업게시', sort: true },
  { name: '첨부파일', sort: false },
];

export const noticeCategories = [
  { code: 'NOTICE01', value: '공지사항' },
  { code: 'NOTICE02', value: '인사' },
  { code: 'NOTICE03', value: '경조사' },
];

export const getCategoryLabel = (categoryCode: string | undefined) => {
  switch (categoryCode) {
    case 'NOTICE01':
      return '공지사항';
    case 'NOTICE02':
      return '인사';
    case 'NOTICE03':
      return '경조사';
    default:
      return '공지사항';
  }
};
