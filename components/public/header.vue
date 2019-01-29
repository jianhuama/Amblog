<template>
  <el-header v-show="!$store.state.header_search_show" id="nav-header" class="header-navigation">
    <!--普通大屏幕下的-->
    <el-row style="height: 100%;" type="flex" justify="center" class="hidden-xs-only">
      <el-col :span="4" align="right" class="nav-img">
        <img src="~/static/img/logo.png" alt="Logo" @click="skipIndex" style="cursor:pointer;"/>
      </el-col>

      <el-col :span="17" :push="2" style="height: 100%; position: relative;" align="center">
        <h-menu :mode="'horizontal'" class="nav-menu"></h-menu>
      </el-col>

      <el-col :span="1" class="nav-search" algin="center">
        <span @click="showMenu" class="iconfont">&#xe627;</span>
      </el-col>
    </el-row>


    <!--手机下的Row-->
    <div style="height: 100%;" class="phone-div hidden-sm-and-up">
      <div align="center" class="phone-title">
        <img src="~/static/img/logo.png" alt="Logo"/>
      </div>

      <el-row class="do-menu-phone">
        <el-col :span="5" style="max-height: 50px">
          <span class="iconfont" @click="menuShow= !menuShow">&#xe790;</span>
        </el-col>

        <el-col :span="5" :offset="14" algin="center" style="height: 50px">
          <span @click="showMenu" class="iconfont"
                style="float: right;padding-right: 5px;">&#xe627;</span>
        </el-col>
      </el-row>

      <el-collapse-transition>
        <div style="width: 100%" v-show="menuShow" align="center">
          <h-menu :mode="'vertical'" @close="menuShow = false"></h-menu>
        </div>
      </el-collapse-transition>
    </div>
  </el-header>
</template>

<script>
  import hMenu from './header-menu.vue';

  export default {
    name: "mHeader",
    components: {
      hMenu
    },
    data() {
      return {
        menuShow: false,  //手机下的menu控制显示
        new_scroll_position: 0,
        last_scroll_position: 0,

      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      showMenu() {  //触发这个方法 来控制搜索框的显示和隐藏
        this.$store.commit('handlerSearchVis');
      },
      handleScroll() {
        this.last_scroll_position = window.scrollY;
        let header = document.getElementById("nav-header");
        // 向下滚动
        if (this.new_scroll_position < this.last_scroll_position && this.last_scroll_position > 80) {
          header.classList.remove("slideDown");
          header.classList.add("slideUp");

          // 向上滚动
        } else if (this.new_scroll_position > this.last_scroll_position) {
          header.classList.remove("slideUp");
          header.classList.add("slideDown");
        }

        this.new_scroll_position = this.last_scroll_position;
      },
      skipIndex() {
        window.location.href = '/index';
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style lang="stylus" scoped>
  @import 'element-ui/lib/theme-chalk/display.css'

  /*导航菜单向上滑动*/
  .slideUp
    -webkit-transform: translateY(-100px)
    -ms-transform: translateY(-100px)
    -o-transform: translateY(-100px)
    transform: translateY(-100px)
    -webkit-transition: transform .5s ease-out
    -o-transition: transform .5s ease-out
    transition: transform .5s ease-out

  /*导航菜单向下滑动*/
  .slideDown
    -webkit-transform: translateY(0)
    -ms-transform: translateY(0)
    -o-transform: translateY(0)
    transform: translateY(0)
    -webkit-transition: transform .5s ease-out
    -o-transition: transform .5s ease-out
    transition: transform .5s ease-out

  .header-navigation
    width: 100%
    height: 80px !important
    background-color: white
    position: fixed
    z-index: 10
    top: 0
    line-height: 90px
    box-shadow: 0 1px 22px rgba(0, 0, 0, 0.25), 0 1px 10px rgba(0, 0, 0, 0.22)

    .nav-img
      height: 100%
      padding-top: 5px
      padding-bottom: 5px

      img
        max-height: 100%

    .nav-menu
      position: absolute
      height: 50px
      line-height: 80px
      top: 0
      bottom: 0
      margin: auto
      font-weight: bold
    .nav-search
      color: black
      height: 100%
      position: relative
      span
        font-size: 25px
        position: absolute
        cursor: pointer

  @media screen and (max-width: 768px)
    .header-navigation
      width: 100%
      height: auto !important
      padding-bottom: 5px
      .phone-title
        height: 30px
        margin-bottom: 3px
        img
          height: 100%
      .do-menu-phone
        padding-bottom: 6px
        span
          font-size: 20px
          color: black
          cursor: pointer

</style>

