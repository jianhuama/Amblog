<template>
  <el-form ref="commentForm"
           :model="commentModel"
           :rules="rules"
           size="small"
           status-icon
           :inline="true"
           label-position="top">

    <el-form-item label="昵称" prop="name">
      <el-input v-model="commentModel.name"></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input type="email" v-model="commentModel.email"></el-input>
    </el-form-item>
    <br/>
    <el-form-item prop="detail" style="width: 60%;">
      <el-input placeholder="说点什么吧" type="textarea"
                autosize
                clearable
                :maxlength="100"
                v-model="commentModel.detail"></el-input>
    </el-form-item>
    <br/>
    <el-form-item prop="checkCode">
      <el-input type="text" v-model="commentModel.checkCode"
                placeholder="输入验证码"></el-input>
      <check-code ref="checkResult"></check-code>

    </el-form-item>
    <br/>
    <el-form-item>
      <el-button type="primary" @click="submitForm('commentForm')">发表评论</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  import checkCode from '~/components/public/checkCode.vue';

  export default {
    name: "myComment",
    components: {
      checkCode
    },
    data() {
      var checkCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入不能为空'));
        }
        let result = this.$refs.checkResult.result;
        if (value != result) {
          this.$refs.checkResult.createRadom();
          callback(new Error('验证码输入错误'));
        } else {
          callback();
        }
      };
      return {
        commentModel: {   //评论输入框对象
          name: '',
          email: '',
          detail: '',
          checkCode: ''
        },
        rules: {  //表单验证规则
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          email: [
            {type: 'email', required: true, message: '邮箱不能为空', trigger: 'blur'},
            {min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur'}

          ],
          detail: [
            {required: true, message: '评论不能为空', trigger: 'blur'},
            {min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur'}
          ],
          checkCode: [
            {required: true, validator: checkCode, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(domFrom) {  //这里进行评论的操作
        this.$refs[domFrom].validate((valid) => {
          if (valid) {
            this.$emit("success", this.commentModel);
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.commentForm.resetFields();
        this.$refs.checkResult.createRadom();
      }
    }
  }
</script>

<style scoped>

</style>
