<template>
  <ul>
    <li class="aside-subject-item" v-for="item in data" :key="item.id">
      <a :href="'/sj-detail?id='+item.id">
        <div class="overlay"></div>
        <div class="image"
             :style="{backgroundImage:setStyleImg(item.mainimg)}"></div>
        <div class="title">
          <h4 v-text="item.title">
          </h4>
          <div class="meta">
            <el-button size="mini" round>查看专题</el-button>
          </div>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "asideSubject",
    data() {
      return {
        data: []
      }
    },
    created() {
      this.data = this.$store.state.hotSubjectList;
    },
    methods: {
      setStyleImg(url) {
        return 'url(' + url + ')';
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .aside-subject-item
    margin-top: 25px
    a
      color: white
    a:hover
      color: #F56C6C
    height: 180px
    position: relative
    .overlay
      width: 100%
      height: 100%
      background: #000
      -webkit-transition: opacity .4s ease-in-out
      transition: opacity .4s ease-in-out
      position: absolute
      opacity: .5
    .image
      background-position: center
      background-repeat: no-repeat
      background-size: cover
      height: 180px
    .title
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      position: absolute
      top: 0
      left: 10%
      transition: all .5s
      width: 80%
      height: 100%
      z-index: 2
      .meta
        margin-top: 10px
</style>
