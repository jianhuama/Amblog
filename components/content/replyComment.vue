<template>
  <div>
    <!--弹出对话框 这个是弹出回复评论的对话框-->
    <commit-alert ref="alert"></commit-alert>


    <ul style="padding: 10px 0 0 0" v-for="commit of data" :key="commit.id">
      <li class="children-list">
        <div class="comment-avatar">
          <img :src="isAdmin(commit.status)" height="96" width="96"/>
        </div>
        <div class="comment-body">
          <div class="comment_author">
            <el-tag style="margin-left: 5px" type="danger" size="mini" v-if="commit.status">站长回复</el-tag>
            <span v-else>{{commit.username}}</span>
            <em>{{commit.createtime}}</em>
          </div>

          <div class="comment-text">
            <p>
              {{commit.content}}
            </p>
          </div>

          <div class="comment_reply">
                  <span>
                    <!--目前禁止掉了多级回复-->
                    <el-button v-if="false" type="text" @click="$refs.alert.isShow = true">回复</el-button>
                  </span>
          </div>

        </div>

        <!--这里进行自己调用自己 递归操作
        <reply-comment :data="commit.reply"></reply-comment>-->

      </li>

    </ul>
  </div>
</template>

<script>
  import commitAlert from '~/components/content/commitAlert.vue';

  export default {
    name: "replyComment",
    components: {
      commitAlert
    },
    props: {
      data: {
        type: Array
      }
    },
    data() {
      return {
      }
    },
    methods: {
      isAdmin(state) {
        if (state) {
          let adminImg = this.$store.state.admin.mainimg;
          if (adminImg.length != 0) {
            return adminImg;
          }
        }
        return '/img/head1.png'
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
