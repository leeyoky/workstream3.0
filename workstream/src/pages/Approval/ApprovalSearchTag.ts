export const searchTags = [
  {label:'문서명', name: 'title'},
  {label:'기안부서', name: 'deptCd', type: 'select', class:'col-4', options: [
    {label:'영업본부' , name: "2009000005"},
    {label:'제품사업본부' , name: "2017002275"},
    {label:'사업전력본부' , name: "2023002349"},
    {label:'사업수행본부' , name: "2013002111"},
    {label:'기술연구소' , name: "2011000627"},
    {label:'혁신경영본부' , name: "2013002118"},
  ]},
  {label:'기안자', name: 'regUsrNm'},
  {label:'문서종류', name: 'docType', type: 'select', options: [
    {label: '품의서', value: 'APPROVAL_COMMON'},
    {label: '사직서', value: 'RESIGNATION'},
  ]},
  {label:'등록일', name: 'regDate'},
]

export const progressSearchTags = [
  { label: '진행현황', name: 'state', type: 'select', options: [
    { label: '결재대기', value: 'PENDING' },
    { label: '진행중', value: 'PROCEEDING' },
    { label: '완료', value: 'APPROVED' },
    { label: '반려', value: 'REJECTED' },
    { label: '임시저장', value: 'TEMP' }
  ]}
];

export const columns = [
  '구분',
  '문서명',
  '문서종류',
  '기안부서',
  '기안자',
  '등록일',
  '결재유형',
  '진행현황'
];