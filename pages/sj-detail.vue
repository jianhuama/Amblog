<template>
  <div>
    <div :style="{backgroundImage:'url('+data.subject.mainimg+')'}" class="top-bg" align="center">

      <div class="container">
        <h2>{{data.subject.title}}</h2>
        <p>{{data.subject.detail}}</p>
        <span>{{data.subject.articlecount}}篇文章</span>
      </div>

    </div>
    <el-container class="el-content">
      <el-main class="main">


        <!--文章的开始-->
        <article-item :data="data.articleList"></article-item>
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
  </div>
</template>

<script>
  import articleItem from '~/components/home/article-item.vue';
  import asideSubjectItem from '~/components/home/asideSubject.vue';
  import asideHotOther from '~/components/home/asideHotOther.vue';
  import http from '~/assets/ServerUtil.js';

  export default {
    name: "subjectArticle",
    layout: 'mainLayout',
    components: {
      articleItem,
      asideSubjectItem,
      asideHotOther
    },
    async asyncData(params) {
      let id = parseInt(params.query.id);
      let page = parseInt(params.query.page);
      if (!id) {
        params.error({statusCode: 404, message: '这篇主题可能已经离开地球'});
      }
      if (!page) {
        page = 1;
      }
      let subjectReq = await http.req.get(http.baseURL + '/get-subject-id?id=' + id);
      let subject = subjectReq.data.data;

      let articleList = subject.articlelist;

      //当获取的文章列表不是空的时候再去请求API
      let articleData = {};
      if (articleList != null && articleList.length != 0) {
        let articleReq = await http.req.get(http.baseURL + '/get-article-ids' + http.qs({
          ids: articleList,
          isSplit: true,
          page: page,
          size: http.Const.pageSize
        }));
        articleData = articleReq.data.data;
      }
      console.log(JSON.stringify(articleData) + " :数据");
      return {
        id: id,
        currentPage: page,
        total: articleData.total,
        data: {
          articleList: articleData.list,
          subject: subject
        }
      }
    },
    data() {
      return {
        id: NaN,
        count: http.Const.pageSize,
        total: 0,
        currentPage: 0,
        data: {
          articleList: [],
          subject: {}
        }
      }
    },
    head() {
      return {
        title: this.data.subject.title
      }
    },
    methods: {
      pageChange(val) {
        window.location.href = '/sj-detail' + http.qs({
          id: this.id,
          page: val
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import 'element-ui/lib/theme-chalk/display.css'
  .top-bg::before
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.45)

  .top-bg
    position: relative
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    height: 281px
    .container
      color: white
      position: relative
      top: 50%

  .el-content
    margin-top: 10px
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
      margin-top: 5%
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
