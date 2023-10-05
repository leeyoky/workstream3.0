export const organization = [
  { name: '영업본부' , class: 'depth1', type:'dept', children: [
    {name: '영업1그룹', class: 'depth2', type:'dept',},
    {name: '영업2그룹', class: 'depth2', type:'dept',},
  ]},
  {
    name: '제품사업본부', class:'depth1', type:'dept',
    children: [
      {name: 'PPC그룹', class: 'depth2', type:'dept',},
      {name: 'Expert그룹', class: 'depth2' , type:'dept',},
      {
        name: '품질테스트팀', class: 'depth2', type:'dept', children: [
          {
            name: 'DI', class: 'depth3', type:'dept', children: [
              { name: '김승현', class: 'depth4', type:'emp' },
              { name: '박재욱', class: 'depth4', type:'emp' },
              { name: '안수현', class: 'depth4', type:'emp' },
              { name: '이중호', class: 'depth4', type:'emp' },
            ]
          },
          {
            name: 'DG', class: 'depth3', type:'dept', children: [
              { name: '곽민재', class: 'depth4', type:'emp' },
              { name: '구상현', class: 'depth4', type:'emp' },
              { name: '윤영석', class: 'depth4', type:'emp' },
              { name: '이현', class: 'depth4', type:'emp' },
              { name: '조혜림', class: 'depth4', type:'emp' },
              { name: '홍승수', class: 'depth4', type:'emp' },
            ]
          },
        
        ]
      },
      {
        name: '기술지원팀', class: 'depth2', children: [
          { name: 'DI', class: 'depth3' },
          { name: 'DG', class: 'depth3' },
          { name: 'Bigdata파트', class: 'depth3'},
        ]
      },
    ],
  },
  { name: 'AI전략사업본부',class:'depth1', children:[
    {name: 'AI사업기획팀', class: 'depth2'},
    {name: 'AI사업지원팀', class: 'depth2'},
    {name: 'AI기술지원팀', class: 'depth2'},
    {name: 'AI전략그룹', class: 'depth2'},
    {name: 'AI컨설팅그룹', class: 'depth2'},
    {name: 'VP그룹', class: 'depth2'},
  ]},
  { name: '사업수행본부',class:'depth1', },
  { name: '기술연구소',class:'depth1', },
  { name: '혁신경영본부',class:'depth1', 
    children: [
      { name: 'KM팀', class:'depth2', children:[
        { name: '김동휘', class: 'depth3', type:'emp' },
        { name: '김원봉', class: 'depth3', type:'emp' },
        { name: '이관우', class: 'depth3', type:'emp' },
        { name: '이영경', class: 'depth3', type:'emp' },
        { name: '최성남', class: 'depth3', type:'emp' },
      ]},
      { name: '혁신업무팀', class:'depth2'},
      { name: '재경팀', class:'depth2'},
      { name: '인사총무팀', class:'depth2'}
    ]},
];