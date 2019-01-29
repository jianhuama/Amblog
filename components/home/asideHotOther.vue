<template>
  <ul>
    <li class="aside-hot-other"
        v-for="item in data"
        v-if="!item.article.top"
        :key="item.article.id">
      <el-row>
        <el-col :span="7">
          <nuxt-link :to="{name:'article',query:{id:item.article.id}}" target="_blank">
            <img class="aside-hot-other-img" v-if="item.article.mainimg.length!=0" :src="item.article.mainimg"/>
          </nuxt-link>
        </el-col>

        <el-col :span="16" :push="1" class="aside-hot-other-content">
          <div class="content">
            <nuxt-link :to="{name:'article',query:{id:item.article.id}}" target="_blank">
              {{item.article.title}}
            </nuxt-link>
          </div>
          <span class="time"><i style="margin-right: 5px"
                                class="iconfont">&#xe600;</i>{{item.article.createtime}}</span>
        </el-col>
      </el-row>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "asideHotOther",
    props: {},
    data() {
      return {
        data: []
      }
    },
    created() {
      this.data = this.$store.state.hotArticleList;
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  .aside-hot-other
    height: 75px
    position: relative
    overflow: hidden
    margin-top: 15px
    padding-bottom: 20px
    border-bottom: 0.5px solid #E4E7ED
    .aside-hot-other-img
      width: 100px
      height: auto
      max-height: 75px
      position: relative
    .aside-hot-other-content
      height: 75px
      position: relative
      overflow: hidden
      align-content: start
      .content
        font-size: 13px
        overflow: hidden
        text-overflow: ellipsis
        -webkit-box-orient: vertical
        display: -webkit-box
        -webkit-line-clamp: 2
      .time
        position: absolute
        bottom: 0
        font-size: 12px
        color: #9A9A9A
</style>
