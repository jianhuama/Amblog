<template>
  <el-card :body-style="{padding: '15px'}">
    <h4>热门标签</h4>
    <div class="aside-labels">
      <el-tag :type="colorRandom()" v-for="item in sortList" :key="item.id">
        <a href="#">{{item.name}}</a>
      </el-tag>
    </div>
  </el-card>
</template>

<script>

  export default {
    name: "hotSort",
    data() {
      return {
        sortList: []
      }
    },
    created() {
      this.sortList = this.$store.state.hotTagList;
    },
    methods: {
      colorRandom() { //此方法是随机返回tag标签的颜色属性
        let arr = ['success', 'info', 'warning', 'danger', ''];
        let index = Math.round(Math.random() * (arr.length - 1));
        return arr[index];
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .aside-labels //热门标签
    span
      margin: 5px
      color: #909399
</style>
