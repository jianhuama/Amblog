<template>

  <div>
    <!--顶部header容器-->
    <m-header></m-header>

    <!--主要插槽内容-->

    <nuxt v-show="!$store.state.header_search_show"/>

    <!--底部footer容器-->
    <m-footer></m-footer>

    <!--搜索框-->
    <transition name="el-fade-in-linear">
      <div v-show="$store.state.header_search_show" class="search-div">
        <el-button class="search-div-close" @click="$store.commit('handlerSearchVis')" icon="el-icon-close"
                   circle></el-button>
        <br/><br/>
        <div class="search-input">
          <el-input v-model="searchInput" placeholder="键入搜索关键字" clearable>
            <el-button slot="append" icon="el-icon-search" @click="submitEvent"></el-button>
          </el-input>
          <br>
          <p>
            大家都在搜
          </p>
          <div style="width: 100%">

            <div class="search-labels"
                 v-for="item in searchLabelList"
                 :key="item"
                 @click="keyClickEvent(item)">
              <el-tag type="success">{{item}}</el-tag>
            </div>

          </div>
        </div>
      </div>
    </transition>

    <button class="material-scrolltop" type="button"></button>
  </div>

</template>

<script>
  import mHeader from '~/components/public/header.vue';
  import mFooter from '~/components/public/footer.vue';

  export default {
    name: "mainLayout",
    components: {
      mHeader,
      mFooter
    },
    mounted() {
      mScrollTop($('body'), {
        revealElement: 'header',
        revealPosition: 'bottom',
        duration: 1200
      })
    },
    data() {
      return {
        searchLabelList: this.$store.state.hotSearchKeyWord,
        searchInput: ''
      }
    },
    methods: {
      keyClickEvent(key) {
        this.requestApi(key)
      },
      submitEvent() {
        if (this.searchInput.length == 0) {
          this.$message({
            showClose: true,
            message: '是不是忘记了输入呀！',
            type: 'warning'
          });
        } else {
          this.requestApi(this.searchInput)
        }
      },
      requestApi(key) {
        this.$store.commit('handlerSearchVis');
        window.open('/search?key=' + key);
      }
    }
  }
</script>

<style lang="stylus">
  body
    margin: 0px
    background: #f2f2f2
    font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "微软雅黑", Arial, sans-serif
    a
      text-decoration: none
      color: #666
    a:hover
      color: #409EFF

    ul, li, ol
      list-style: none
      margin: 0
      padding: 0

    .el-content //让所有的子布局的根布局向上间隔距离
      margin-top: 80px

  html, body, #__nuxt, #__layout
    height: 100%

  .search-div //搜索框的
    position: fixed
    background-color: white
    top: 0
    right: 0
    left: 0
    bottom: 0
    padding-left: 20%
    padding-right: 20%
    padding-top: 10%
    .search-input
      position: relative
      top: 20%
      .search-labels
        display: inline-block
        padding: 10px
        left: 0
        position: relative
        cursor: pointer
    button
      font-size: 100%
      float: right
      right: 10%
      position: relative

  @media screen and (max-width: 768px)
    .search-div
      text-align: center
      .search-div-close
        display: block
        position: absolute
        left: 50%
        right: 50%
        margin-bottom: 15px
      .search-input
        display: block
</style>
