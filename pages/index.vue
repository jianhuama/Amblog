<template>

  <el-container class="el-content">
    <el-main class="main">

      <el-carousel v-show="carouselShow" indicator-position="outside" class="carousel" :interval="intervalTime"
                   height="250px">
        <el-carousel-item v-for="item in data.slideUrlList" :key="item">
          <img :src="item"/>
        </el-carousel-item>

      </el-carousel>

      <!--轮播结束-->
      <br/>

      <el-card shadow="hover" v-show="carouselShow" v-if="data.articleTop!=null">
        <h2>
          <span style="color: red">【最新最热】</span>
          <nuxt-link target="_blank" :to="{name:'article',query:{id:data.articleTop.id}}">
            {{data.articleTop.title}}
          </nuxt-link>
        </h2>
        <nuxt-link target="_blank" :to="{name:'article',query:{id:data.articleTop.id}}">
          <div class="hot-card-p" v-html="htmlContent(data.articleTop.content)">
          </div>
        </nuxt-link>
      </el-card>

      <h4>最新发布</h4>

      <!--文章的开始-->
      <article-item :data="data.articleList.list"></article-item>
      <!--文章的结尾-->
      <br/>

      <!--底部页码-->
      <div align="center" class="page-sty">
        <el-pagination
          background
          @current-change="pageChange"
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="count"
          :total="data.articleList.total">
        </el-pagination>
      </div>

    </el-main>

    <!--侧边说明-->
    <el-aside class="hidden-xs-only aside">

      <el-card class="aside-self-card" :body-style="{padding: '5px'}">
        <div class="as-self-head">
          <img :src="data.admin.mainimg"/>
        </div>

        <div class="as-self-name">
          <label>{{data.admin.name}}</label>
          <el-tag>博主</el-tag>
          <br/>
          <div class="about">
            <i class="iconfont">&#xe67f;</i>
            我们的交流群号: <span style="color: #67C23A;font-family: 黑体">676436122</span>
          </div>
          <div class="about">
            <i class="el-icon-message"></i>
            联系邮箱: <span style="color: #67C23A;font-family: 黑体">postmaster@uychen.com</span>
          </div>
        </div>
      </el-card>
      <!--我的简介-->
      <br/>

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

      <br/>
      <hot-sort></hot-sort>
      <!--热门标签结尾-->

    </el-aside>
  </el-container>

</template>

<script>
  import articleItem from '~/components/home/article-item.vue';
  import asideHotOther from '~/components/home/asideHotOther.vue';
  import asideSubjectItem from '~/components/home/asideSubject.vue';
  import hotSort from '~/components/home/hotSort.vue';
  import http from '~/assets/ServerUtil.js';

  export default {
    name: 'index',
    layout: 'mainLayout',
    components: {
      articleItem,
      asideHotOther,
      asideSubjectItem,
      hotSort
    },
    head() {
      return {
        title: 'Aimao'
      }
    },
    async asyncData(params) {
      let page = parseInt(params.query.page);
      if (!page) {
        page = 1;
      }
      let [top, articleList, slideList] = await Promise.all([
        http.req.get(http.baseURL + '/get-top-article'),
        http.dataUtil.getArticleNewAll(page, http.Const.pageSize),
        http.req.get(http.selfUrl + "/slideConfig.json")
      ]);

      let topdata;
      if (top.data.code == 1) {
        topdata = top.data.data;
      }

      return {
        currentPage: page,
        data: {
          admin: params.store.state.admin,
          articleTop: topdata != null ? topdata.article : null,
          articleList: articleList,
          slideUrlList: JSON.parse(JSON.stringify(slideList.data))
        }
      }
    },
    data() {
      return {
        currentPage: 0,
        intervalTime: 5000,  //轮播图的自动滚动延迟时间,
        carouselShow: true, //轮播图的的是否显示控制变量,
        count: http.Const.pageSize,
        data: {
          admin: {},
          articleTop: {},
          sortList: [],
          articleList: [],
          slideUrlList: []  //这个是轮播图的集合 通过slideConfig.json来配置
        }
      }
    },
    created() {
      //下面的if进行控制轮播图在第一页显示 否则就是隐藏起来
      if (this.currentPage != 1) {
        this.carouselShow = false;
      } else {
        this.carouselShow = true;
      }
    },
    methods: {
      pageChange(val) {
        window.location.href = '/index?page=' + val
      },
      htmlContent(html) {
        html = html.replace(/<\/?.+?>/g, "");
        html = html.replace(/ /g, "");//dds为得到后的内容
        let str = html;
        if (str != null && str.length != 0) {
          let count = str.length > 100 ? 100 : str.length;
          return str.substring(0, count) + "...";
        } else {
          return '...';
        }
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

      //这个是首页最热门的Card样式
      .hot-card-p
        text-indent: 28px
      .carousel
        width: 100%
        border-radius: 10px
        *
          border-radius: 10px
        overflow: hidden
        img
          height: 250px
          width: 100%

    .aside
      width: 400px !important
      padding-right: 25px
      align-content: space-around
      align-items: center
      padding-top: 20px
      .aside-self-card
        //height: 280px
        min-height: 280px
        padding-bottom: 10px
        .as-self-head
          //background: url("http://grace.wpbyg.com/wp-content/themes/2018030117190543/img/img_usercard_bg.jpg") center center no-repeat
          background-color: #dbe1ec
          position: relative
          background-size: cover
          height: 140px
          img
            width: 84px
            height: 84px
            border-radius: 50px
            overflow: hidden
            position: absolute
            left: 50%
            bottom: -42px
            border: 2px solid rgba(255, 255, 255, 0.25)
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.2)
            margin-left: -42px
        .as-self-name
          font-size: 18px
          display: block
          margin-bottom: 10px
          text-align: center
          position: relative
          top: 50px
          .about
            color: #606266
            font-size: 12px
            text-align: left
            margin-left: 8px
            margin-right: 8px
            margin-top: 12px
          label
            cursor: pointer
            color: #666
          label:hover
            color: #409EFF
          span
            height: 20px
            line-height: 20px
            border: 0
            margin-left: 8px

  @media screen and (max-width: 768px)
    .el-content
      padding: 0px
      .main
        padding-left: 0px
        padding-right: 0px

</style>


