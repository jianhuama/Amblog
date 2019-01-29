<template>
  <li class="comment-list">
    <!--主评论-->
    <div>
      <div class="comment-avatar">
        <img src="~/static/img/head1.png" height="96" width="96"/>
      </div>
      <div class="comment-body">
        <div class="comment_author">
          <span>{{data.main.username}}</span>
          <em>{{data.main.createtime}}</em>
        </div>

        <div class="comment-text">
          <p>
            {{data.main.content}}
          </p>
        </div>

        <div class="comment_reply">
                  <span>
                    <el-button type="text" @click="$refs.alert.isShow = true">回复</el-button>
                  </span>
        </div>

      </div>
    </div>
    <!--主评论-->

    <reply-comment :data="data.reply"></reply-comment>

    <!--弹出对话框 这个是弹出回复评论的对话框-->
    <commit-alert ref="alert" :commitData="commitData" @success="successCall"></commit-alert>
  </li>
</template>

<script>
  import replyComment from '~/components/content/replyComment.vue';
  import commitAlert from '~/components/content/commitAlert.vue';

  export default {
    name: "myCommitList",
    components: {
      replyComment,
      commitAlert
    },
    props: {
      data: {
        type: Object
      },
      articleId: {
        type: Number
      }
    },
    data() {
      return {
        showCommitDialog: false,
        commitData: {
          parentId: this.data.main.id,
          articleId: this.articleId
        }
      }
    },
    methods: {
      successCall() {
        this.$emit("replySuccess");
      }
    }
  }
</script>

<style lang="stylus" scoped>

  //评论的样式
  .comment-list
    margin: 15px 0
    border-bottom: 1px solid #eceef1
    margin-left: 65px
    position: relative
    padding-bottom: 5px
    margin-bottom: 20px
    .comment-avatar
      position: absolute
      left: -65px
      img
        width: 50px
        height: 50px
        -webkit-border-radius: 3px
        border-radius: 3px
        -moz-border-radius: 3px
    .comment-body
      .comment_author
        position: relative
        span
          font-size: 15px
          color: #303133
        em
          margin-left: 10px
          font-size: 12px
          color: #C0C4CC
      .comment-text
        padding: 10px 0
        color: #606266
        font-size: 14px
      .comment_reply
        display: block
        text-align: right
        margin: 0
        font-size: 12px
        color: #757e91

  .children-list
    margin-left: 0
    padding: 12px
    border-bottom-width: 0
    border: 1px solid #E4E4E4
    border-radius: 2px
    background-color: #fbfbfb
    margin-bottom: 10px
    margin-top: 0
    .comment-avatar
      position: relative
      left: initial
      float: left
    .comment-body
      border-bottom-width: 0
      margin: 0 0 0 55px
      padding: 0 0 10px
      position: relative
</style>
