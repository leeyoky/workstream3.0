export const searchTags = [
  { label: '문서번호', name: 'id', class: 'col-7' },
  { label: '문서명', name: 'title', class: 'col-7' },
  {
    label: '기안부서',
    name: 'deptCd',
    type: 'select',
    class: 'col-7',
    options: [
      { label: '전체' },
      { label: '영업본부', name: '2009000005' },
      { label: '제품사업본부', name: '2017002275' },
      { label: '사업전력본부', name: '2023002349' },
      { label: '사업수행본부', name: '2013002111' },
      { label: '기술연구소', name: '2011000627' },
      { label: '혁신경영본부', name: '2013002118' },
    ],
  },
  {
    label: '문서종류',
    name: 'docType',
    type: 'select',
    class: 'col-4',
    options: [
      { label: '품의서', value: 'APPROVAL_COMMON' },
      { label: '사직서', value: 'RESIGNATION' },
    ],
  },
  { label: '기안자', name: 'regUsrNm', class: 'col-7' },
  { label: '기안일자', name: 'regDate', type: 'date' },
  { label: '시행일자', name: 'executeDate', type: 'date' },
];

export const progressSearchTags = [
  {
    label: '진행현황',
    name: 'state',
    type: 'select',
    class: 'col-4',
    options: [
      { label: '결재대기', value: 'PENDING' },
      { label: '진행중', value: 'PROCEEDING' },
      { label: '완료', value: 'APPROVED' },
      { label: '반려', value: 'REJECTED' },
      { label: '임시저장', value: 'TEMP' },
    ],
  },
];

export const columns = [
  { name: '구분', sort: true },
  { name: '문서번호', sort: true },
  { name: '문서명', sort: true },
  { name: '문서종류', sort: true },
  { name: '기안부서', sort: false },
  { name: '기안자', sort: true },
  { name: '기안일자', sort: true },
  { name: '시행일자', sort: true },
  { name: '결재유형', sort: false },
  { name: '의견', sort: false },
  { name: '첨부', sort: false },
  { name: '진행현황', sort: true },
];
