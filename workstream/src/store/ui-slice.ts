import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState : { 
    isSidebarOpen : true,
    isSubbarOpen: false,
    draggingItem: null,
    dropTarget: null,
    selectMenu: null,
    selectPageSize: 10,
    selectPage: 0,
    totalItems: 0,
    searchInput: {
      title: '',
      deptCd: '',
      docType: '',
      regUsrNm: '',
      state: '',
      regDateGoe: '',
      regDateLoe: '',
    },
    date: '',
  },
  reducers: {
    // Side Bar 
    toggle(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    // Sub Bar
    setSubToolBar(state, action) {
      state.isSubbarOpen = action.payload;
    },
    // Dragging
    setDraggingItem(state, action) {
      state.draggingItem = action.payload;
    },
    // Drop
    setDropTarget(state,action) {
      state.dropTarget = action.payload;
    },
    resetDropTarget(state) {
      state.dropTarget = null;
    },
    // Recent Menu
    selectMenu(state, action) {
      state.selectMenu = action.payload;
    },
    // PageSize
    selectPageSize(state,action) {
      state.selectPageSize = action.payload;
    },
    // Page
    selectPage(state,action) {
      state.selectPage = action.payload;
    },
    // totalItem
    setTotalItems (state,action) {
      state.totalItems = action.payload;
    },
    // resetData
    resetPage (state) {
      state.selectPageSize = 10;
      state.selectPage = 0;
      state.totalItems = 0;
      state.searchInput.title = '';
      state.searchInput.deptCd = '';
      state.searchInput.docType = '';
      state.searchInput.regUsrNm = '';
      state.searchInput.state = '';
      state.searchInput.regDateGoe = '',
      state.searchInput.regDateLoe = ''
    },
    // search
    searchInput(state, action) {
      state.searchInput = action.payload;
    },
    // date
    setDate(state, action) {
      state.date = action.payload;
    }
  }
})

export const uiActions = uiSlice.actions;

export default uiSlice;