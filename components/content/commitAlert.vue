<template>
  <el-dialog
    title="回复"
    :visible.sync="isShow"
    class="commentAlert">

    <my-comment @success="successEvent" class="commentBody"></my-comment>

  </el-dialog>

</template>

<script>
  import myComment from '~/components/content/myComment.vue';
  import http from '~/assets/ServerUtil.js';

  export default {
    name: "commitAlert",
    components: {
      myComment
    },
    props: {
      commitData: {   //传入回复数据
        type: Object
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      successEvent(model) {
        //验证成功了进行的操作
        let parentId = this.commitData.parentId;
        let article = this.commitData.articleId;
        let data = {
          username: model.name,
          email: model.email,
          content: model.detail,
          parentid: parentId,
          status: false,
          articleid: article
        };
        http.req.get('api/reply-comment' + http.qs(data))
          .then(data => {
            let code = data.data.code;
            if (code != 0) {
              this.$message.success("回复成功");
              this.isShow = false;
              this.$emit("success");
            } else {
              this.isShow = false;
              this.$message.error("回复失败");
            }
          })
          .catch(error => {
            this.isShow = false;
            this.$message.error("服务器异常:" + error.status);
          })
      }
    }
  }
</script>

<style lang="stylus">
  .commentAlert
    .el-dialog
      width: 40% !important

    .commentBody
      padding: 20px

  @media screen and (max-width: 768px)
    .commentAlert
      .el-dialog
        width: 100% !important
</style>
