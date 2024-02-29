export const searchTags = [
  { label: '분류', name: 'title', class: 'col-7', type: 'select' },
  { label: '제목', name: 'title', class: 'col-7' },
  { label: '작성자', name: 'title', class: 'col-7' },
  { label: '작성일', name: 'title', class: 'col-7', type: 'date' },
];

export const columns = [
  { name: '분류' },
  { name: '제목' },
  { name: '작성자' },
  { name: '작성일' },
  { name: '첨부파일' },
];

export const noticeCategories = [
  { code: 'NOTICE01', value: '공지사항' },
  { code: 'NOTICE02', value: '안내' },
  { code: 'NOTICE03', value: '인사' },
  { code: 'NOTICE04', value: '부고' },
  { code: 'NOTICE05', value: '결혼' },
  { code: 'NOTICE10', value: '기타' },
];

export const getCategoryLabel = (categoryCode: string | undefined) => {
  switch (categoryCode) {
    case 'NOTICE01':
      return '공지사항';
    case 'NOTICE02':
      return '안내';
    case 'NOTICE03':
      return '인사';
    case 'NOTICE04':
      return '부고';
    case 'NOTICE05':
      return '결혼';
    case 'NOTICE10':
      return '기타';
    default:
      return '공지사항';
  }
};
