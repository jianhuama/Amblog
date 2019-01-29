<template>
  <el-container class="el-content">
    <el-main class="main">

      <h4>类别: {{sortName}}</h4>

      <!--文章的开始-->
      <article-item :data="list"></article-item>
      <!--文章的结尾-->
      <br/>

      <!--底部页码-->
      <div align="center" class="page-sty">
        <el-pagination
          @current-change="pageChange"
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="count"
          :total="total">
        </el-pagination>
      </div>

    </el-main>

    <!--****************************************************************************************-->

    <el-aside class="hidden-xs-only aside">

      <!--推荐专题-->
      <el-card :body-style="{padding: '15px'}" class="aside-subject">
        <h4>推荐专题</h4>
        <aside-subject-item></aside-subject-item>
      </el-card>

      <br/>

      <el-card class="aside-hot-card" :body-style="{padding: '15px'}">
        <h4>最热文章</h4>
        <aside-hot-other></aside-hot-other>
      </el-card>
      <!--热门文章结尾-->

    </el-aside>
  </el-container>
</template>

<script>
  import articleItem from '~/components/home/article-item.vue';
  import asideSubjectItem from '~/components/home/asideSubject.vue';
  import asideHotOther from '~/components/home/asideHotOther.vue';
  import http from '~/assets/ServerUtil.js';

  export default {
    name: "search",
    layout: 'mainLayout',
    components: {
      articleItem,
      asideSubjectItem,
      asideHotOther
    },
    asyncData(params) {
      let id = params.query.id;
      let page = parseInt(params.query.page);
      if (!id || id == null) {
        params.error({statusCode: 404, message: '现在还没有你想要的结果'});
      }
      if (!page || params == null) {
        page = 1;
      }

      let sortName = '';
      let sortListData = params.store.state.sortListAll;
      if (sortListData.length != 0) {
        sortListData.forEach(item => {
          if (item.sort.id == id) {
            sortName = item.sort.name;
            return;
          }
        })
      }

      return http.req.get(http.baseURL + '/get-article-sort-id' + http.qs({
        id: id,
        isSplit: true,
        page: page,
        size: http.Const.pageSize
      }))
        .then(res => {
          let data = res.data;
          if (data.code != 0) {
            //Success
            return {
              total: data.data.total,
              currentPage: page,
              key: id,
              list: data.data.list,
              sortName: sortName
            }
          } else {
            params.error({statusCode: 404, message: '现在还没有你想要的结果'});
          }
        }).catch(error => {
          params.error({statusCode: 404, message: '出错啦！' + error.status});
        })
    },
    data() {
      return {
        count: http.Const.pageSize,
        total: 0,
        key: '',
        sortName: '',
        currentPage: 0,
        list: []
      }
    },
    head() {
      return {
        title: this.sortName
      }
    },
    methods: {
      pageChange(val) {
        window.location.href = '/search' + http.qs({
          key: this.key,
          page: val
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import 'element-ui/lib/theme-chalk/display.css'
  .el-content
    padding-left: 9%
    padding-right: 9%
    .main
      padding-left: 5%
      padding-right: 30px
      .page-sty
        width: 100%
        overflow: hidden
    .aside
      width: 400px !important
      padding-right: 25px
      align-content: space-around
      align-items: center
      margin-top: 6%
      margin-bottom: 100px

  li
    margin-top: 25px

  @media screen and (max-width: 768px)
    .el-content
      padding-left: 0px
      padding-right: 0px
      .main
        padding-left: 0px
        padding-right: 0px
</style>
