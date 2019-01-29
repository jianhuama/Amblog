<template>
  <el-container class="el-content">
    <el-main class="main">
      <el-card shadow="hover">
        <header class="detail-head">
          <h1>{{data.article.title}}</h1>
          <div>
            <span><i class="iconfont">&#xe650;</i>{{data.article.sortName}}</span>
            <span><i class="iconfont">&#xe60e;</i>{{data.article.readcount}}</span>
            <span><i class="iconfont">&#xe600;</i>{{data.article.createtime}}</span>
          </div>
        </header>

        <!--这个是文章的开始-->
        <div v-html="data.article.content" class="article-content">
        </div>
        <!--这个是文章的结尾-->

        <div style="background-color: #DCDFE6;margin-top: 50px;height: 1px; margin-left: 10%;margin-right: 10%;"></div>

        <!--个人说明展示-->
        <div class="bottom-my">
          <img :src="admin.mainimg"/>

          <div class="title">
            <el-tag size="mini" :hit="false">站长</el-tag>
            <div style="display: inline-block;margin-left: 6px;">{{admin.name}}</div>
          </div>

        </div>

        <div class="bottom-tip">
          未经允许不得转载 - 转载请联系站长
        </div>

        <!--文章标签-->
        <div class="labels">
          <label>文章标签:</label>
          <el-tag type="success" size="small" v-for="item in data.tags" :key="item.id">
            {{item.name}}
          </el-tag>
        </div>
      </el-card>

      <br/>

      <!--文章查看评论开始-->
      <el-card shadow="hover">
        <div slot="header" class="comment-header">
          <h4>全部评论</h4> <span>{{data.commentCount}}条</span>
        </div>

        <ol style="display: block;">
          <my-commit-list v-for="(item,index) in comment.list"
                          :data="item"
                          :articleId="id"
                          :key="index" @replySuccess="replyCommentSuccess"></my-commit-list>
        </ol>

        <div align="center">
          <el-pagination
            small
            layout="prev, pager, next ,total"
            @current-change="pageChange"
            :page-size="comment.pageSize"
            :total="comment.total">
          </el-pagination>
        </div>
      </el-card>
      <!--查看全部评论的结尾-->
      <br/>
      <el-card shadow="hover">
        <div slot="header" class="comment-header">
          <h4>发表评论</h4> <span>抢沙发</span>
        </div>

        <my-comment @success="commitSuccess"></my-comment>

      </el-card>
    </el-main>

    <el-aside class="hidden-xs-only aside">

      <el-card class="aside-hot-card" :body-style="{padding: '15px'}">
        <h4>最热文章</h4>
        <aside-hot-other></aside-hot-other>
      </el-card>
      <!--热门文章结尾-->

      <br/>
      <my-sort></my-sort>
      <!--热门标签结尾-->
    </el-aside>

  </el-container>
</template>

<script>
  import myComment from '~/components/content/myComment.vue';
  import http from '~/assets/ServerUtil.js';
  import asideHotOther from '~/components/home/asideHotOther.vue';
  import myCommitList from '~/components/content/myCommitList.vue';
  import mySort from '~/components/home/hotSort.vue';
  import cookies from 'js-cookie';

  export default {
    name: "Article",
    layout: 'mainLayout',
    components: {
      asideHotOther,
      myComment,
      myCommitList,
      mySort
    },
    data() {
      return {
        data: {},
        comment: {
          list: [],
          pageSize: 5,
          currentPage: 0,
          total: 0
        },
        id: -1,
        admin: {}
      }
    },
    created() {
      this.admin = this.$store.state.admin;
    },
    async asyncData(params) {
      let id = parseInt(params.query.id);
      if (!id) {
        //文章的ID没有传入进来
        params.error({statusCode: 404, message: '这篇文章可能去了火星'});
      }
      return http.dataUtil.getArticleDetail(id)
        .then(data => {
          return {
            data: data,
            id: id
          }
        }).catch(error => {
          params.error({statusCode: 404, message: '这边文章可能去了火星'});
        });
    },
    mounted() {
      this.requestApi(1);
      let isRead = cookies.get("Article_Read:" + this.id);
      if (isRead == null || !isRead || isRead.length == 0) {
        cookies.set("Article_Read:" + this.id, "YES");
        http.req.get('api/update-article-read' + http.qs({id: this.id}));
      }
    },
    head() {
      return {
        title: this.data.article.title
      }
    },
    methods: {
      commitSuccess(model) {   //提交评论验证成功进行的操作
        //验证成功了进行的操作
        let article = this.id;
        let data = {
          username: model.name,
          email: model.email,
          content: model.detail,
          parentid: -100,
          status: false,
          articleid: article
        };
        http.req.get('api/reply-comment' + http.qs(data))
          .then(data => {
            let code = data.data.code;
            if (code != 0) {
              this.$message.success("评论成功");
              this.requestApi(1);
            } else {
              this.$message.error("评论失败");
            }
          })
          .catch(error => {
            this.$message.error("服务器异常:" + error.status);
          })
      },
      requestApi(page) {  //请求评论列表的API
        this.comment.list.length == 0;
        let data = {
          isSplit: true,
          size: this.comment.pageSize,
          page: page,
          id: this.id
        };
        http.req.get('api/get-comment-article' + http.qs(data))
          .then(res => {
            let data = res.data;
            if (data.code != 0) {
              let dat = data.data;
              this.comment.list = dat.list;
              this.comment.total = dat.total;
              this.comment.currentPage = dat.pageNum;
            } else {
              this.$message.error('评论信息获取失败:' + data.msg);
            }
          }).catch(error => {
          this.$message.error('评论信息获取失败:' + error);
        })
      },
      pageChange(page) {  //页码切换跳转的操作
        console.log(page + " 切换页码");
        this.requestApi(page);
      },
      replyCommentSuccess() {  //子组件评论成功的回调方法
        this.requestApi(1);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import 'element-ui/lib/theme-chalk/display.css'
  .el-content
    padding-left: 5%
    padding-right: 5%
    i
      margin-right: 5px
    .main
      .detail-head
        margin-bottom: 20px
        padding: 25px 0
        border-bottom: 1px solid #eee
        text-align: center
        span
          margin-right: 20px
      .bottom-tip
        background-color: #eee
        font-size: 12px
        margin-top: 10px
        padding: 8px 30px
        border-radius: 2px
        color: #aaa
        text-align: center
        margin-bottom: 18px
      .bottom-tip:hover
        background-color: #409EFF
        color: white
      .bottom-my
        height: 50px
        margin-top: 20px
        margin-left: 20px
        overflow: hidden
        display: inline-block
        position: relative
        img
          width: 35px
          height: 35px
          border-radius: 50%
          display: inline
          border: 1px solid #eee
          vertical-align: middle
          box-sizing: border-box
        .title
          margin-left: 12px
          max-height: 50px
          vertical-align: middle
          display: inline-block
          font-size: 13px
          color: #909399
        .title:hover
          color: #409EFF
          cursor: pointer
      .labels
        text-align: center
        margin-bottom: 25px
        label
          font-size: 12px
          color: #909399
        span
          margin-left: 10px
          margin-top: 5px
      .comment-header
        h4
          font-size: 16px
          color: #303133
          display: inline
        span
          margin-left: 10px
          font-size: 12px
          color: #909399

    //侧边的导航
    .aside
      width: 400px !important
      padding-right: 25px
      align-content: space-around
      align-items: center
      margin-top: 20px
      margin-bottom: 100px

  @media screen and (max-width: 768px)
    .el-content
      padding-left: 0px
      padding-right: 0px
      .main
        padding-left: 0px
        padding-right: 0px
</style>

<style lang="stylus">
  @media screen and (max-width: 768px)
    .article-content
      img
        max-width: 100%
</style>
