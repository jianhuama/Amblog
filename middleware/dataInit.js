import http from '~/assets/ServerUtil.js';

export default async function (params) {
  //保存博主信息的
  if (!params.store.state.admin) {
    let admin = await http.dataUtil.getAdmin();
    params.store.commit('setAdmin', admin);  //保存状态
  }
  //保存热门文章的
  if (params.store.state.hotArticleList.length == 0) {
    let hotArticleList = await http.dataUtil.getArticleNewAll(1, 5);
    params.store.commit('setHotArticleList', hotArticleList.list);
  }
  //保存推荐主题的
  if (params.store.state.hotSubjectList.length == 0) {
    let hotSubject = await http.dataUtil.getHotSubject();
    params.store.commit('setHotSubjectList', hotSubject);
  }
  //保存热门标签Tag的
  if (params.store.state.hotTagList.length == 0) {
    let hotSort = await http.dataUtil.getTagHot();
    params.store.commit('setHotTagList', hotSort);
  }
  //保存获取的热门搜索的关键字
  if (params.store.state.hotSearchKeyWord.length == 0) {
    let key = await http.dataUtil.getHotKeyWord();
    params.store.commit('setHotSearchKeyWord', key);
  }
  //保存获取的所有分类list
  if (params.store.state.sortListAll.length == 0) {
    let sortList = await http.dataUtil.getSortAll();
    params.store.commit('setSortAll', sortList.list);
  }
}
