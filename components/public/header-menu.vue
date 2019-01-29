<template>
  <el-menu :default-active="currentIndex"
           background-color="#fff"
           text-color="#606266"
           :mode="mode"
           :router="true"
           @select="select"
           active-text-color="#409EFF">
    <el-menu-item index="/index"><i class="iconfont">&#xe653;</i>首页</el-menu-item>
    <el-menu-item :index="setPath('生活')"><i class="iconfont">&#xe604;</i>生活</el-menu-item>
    <el-menu-item :index="setPath('软件')"><i class="iconfont">&#xe6fc;</i>软件</el-menu-item>
    <el-submenu index="4">
      <template slot="title"><i class="iconfont">&#xe69f;</i>技术教程</template>
      <el-menu-item :index="setPath('后端技术')">后端技术</el-menu-item>
      <el-menu-item :index="setPath('前端技术')">前端技术</el-menu-item>
      <el-menu-item :index="setPath('其他技术')">其他技术</el-menu-item>
    </el-submenu>
    <el-menu-item index="/subject"><i class="iconfont">&#xe7a0;</i>主题</el-menu-item>
    <el-menu-item :index="setPath('其他')"><i class="iconfont">&#xe629;</i>其他</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "header-menu",
    props: ['mode'],
    data() {
      return {
        currentIndex: '1',
        data: []
      }
    },
    created() {
      this.data = this.$store.state.sortListAll;
    },
    methods: {
      select(index, indexPath) {
        this.$emit("close");
        if (index != null && index.length != 0) {
          window.location.href = index;
        }
      },
      setPath(name) {
        let data = this.data;
        let id = '';
        if (data.length == 0) {
          return '';
        }
        data.forEach(item => {
          if (item.sort.name === name) {
            id = item.sort.id;
            return;
          }
        });
        return '/sort-list?id=' + id;
      }
    }
  }
</script>

<style lang="stylus" scoped>
  li
    line-height: 16px;
    font-size: 16px
    border-bottom-width: 0px !important
    i
      margin-right: 5px

</style>
