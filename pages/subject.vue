<template>
  <el-container class="el-content">
    <el-main class="main">
      <header class="header">
        <div class="header-body">
          <h2 class="header-title">专题</h2>
          <p class="header-description">精选好文</p>
        </div>
      </header>
      <!--头部图片结尾-->
      <el-row class="sub-list" align="middle">
        <el-col
          :md="{span:5,offset:1}"
          :xs="{span:24}"
          class="item"
          v-for="item in data"
          :style="{backgroundImage:'url(' + item.mainimg+')'}"
          :key="item.id">

          <nuxt-link target="_blank" :to="{name:'sj-detail',query:{id:item.id}}">
            <div class="overlay"></div>

            <div class="title">
              <h2>{{item.detail}}</h2>
              <div class="meta">{{item.articlecount}}篇文章</div>
            </div>

            <div class="tag"><span>#{{item.title}}</span></div>
          </nuxt-link>

        </el-col>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
  import http from '~/assets/ServerUtil.js';

  export default {
    name: "subject",
    layout: 'mainLayout',
    data() {
      return {
        data: []
      }
    },
    head() {
      return {
        title: '主题-Aimao'
      }
    },
    async asyncData() {
      return new Promise((resolve, reject) => {
        http.get('/get-subject-all', null, success => {
          resolve(success);
        }, error => {
          reject(error);
        })
      }).then(data => {
        return {
          data: data
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .el-content
    .main
      min-height: 100%
      padding: 0
    .header::before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(0, 0, 0, 0.45)
    .header
      background-image url(/img/subjectHeader.jpg)
      position: relative
      background-position: center
      background-repeat: no-repeat
      background-size: cover
      margin-bottom: 20px

      .header-body
        padding: 100px 0 80px 0
        position: relative
        z-index: 2
        text-align: center
        .header-title
          color: #FFF
          font-size: 28px
          line-height: 1.6
          margin-bottom: 5px
        .header-description
          color: #FFF
          font-size: 16px
          margin-bottom: 5px
    /******头部图片样式结尾***************/
    .sub-list
      padding-left: 7%
      padding-right: 7%
      .item
        margin-bottom: 20px
        position: relative
        background-position: center
        background-repeat: no-repeat
        background-size: cover
        height: 200px
        .overlay
          width: 100%
          height: 100%
          background: #000
          -webkit-transition: opacity .4s ease-in-out
          transition: opacity .4s ease-in-out
          position: absolute
          opacity: .5
        .title
          position: absolute
          bottom: 0
          left: 0
          right: 0
          padding: 15px
          color: #FFF
          .meta
            font-size: 12px
            margin-top: 5px
        .tag
          position: absolute
          right: 15px
          top: 15px
          span
            border-radius: 25px
            padding: 6px
            background-color: black
            color: white
            font-size: 10px

  @media screen and (max-width: 768px)
    .sub-list
      text-align: center
      padding-left: 0 !important
      padding-right: 0 !important
      .item
        .title
          h2
            font-size: 13px

</style>
