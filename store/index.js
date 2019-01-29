import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    header_search_show: false,  //这个是搜索标签的控制显示控制变量
    admin: NaN,
    hotArticleList: [],
    hotSubjectList: [],
    hotTagList: [],
    hotSearchKeyWord: [],
    sortListAll: []
  },
  mutations: {
    handlerSearchVis(state) {  //这个方法是控制搜索标签是否显示的控制
      state.header_search_show = !state.header_search_show;
    },
    setAdmin(state, ad) {
      state.admin = ad;
    },
    setHotArticleList(state, list) {
      state.hotArticleList = list;
    },
    setHotSubjectList(state, list) {
      state.hotSubjectList = list;
    },
    setHotTagList(state, list) {
      state.hotTagList = list;
    },
    setHotSearchKeyWord(state, list) {
      state.hotSearchKeyWord = list;
    },
    setSortAll(state, list) {
      state.sortListAll = list;
    }
  },
  actions: {}
});

export default store
