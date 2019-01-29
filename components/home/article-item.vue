<template>
  <div>
    <el-card class="card-info-item" shadow="hover"
             v-for="item in data"
             v-if="!item.article.top"
             :key="item.article.id">

      <el-row>
        <el-col :span="7" :xs="24" class="card-info-item-img-col">
          <nuxt-link :to="{name:'article',query:{id:item.article.id}}" target="_blank">
            <img v-if="item.article.mainimg.length!=0" :src="item.article.mainimg"/>
          </nuxt-link>
        </el-col>

        <el-col :span="16" :xs="24" :push="1" class="card-info-item-detail">
          <h4 style="color: #303133;">
            <nuxt-link :to="{name:'article',query:{id:item.article.id}}" target="_blank">
              {{item.article.title}}
            </nuxt-link>
          </h4>

          <nuxt-link :to="{name:'article',query:{id:item.article.id}}" target="_blank">
            <div class="card-info-item-content" v-html="htmlContent(item.article.content)">
            </div>
          </nuxt-link>

          <div class="card-info-item-bottom">
            <ul>
              <li><i class="iconfont">&#xe62f;</i>{{$store.state.admin.name}}</li>
              <li><i class="iconfont">&#xe650;</i>{{item.article.sortName}}</li>
              <li><i class="iconfont">&#xe600;</i>{{item.article.createtime}}</li>
              <li><i class="iconfont">&#xe634;</i>{{item.commentCount}}</li>
              <li><i class="iconfont">&#xe60e;</i>{{item.article.readcount}}</li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "article-item",
    props: {
      data: {
        type: Array
      }
    },
    methods: {
      htmlContent(html) {
        html = html.replace(/<\/?.+?>/g, "");
        html = html.replace(/ /g, "");//dds为得到后的内容
        let str = html;
        if (str != null && str.length != 0) {
          let count = str.length > 100 ? 100 : str.length;
          return str.substring(0, count) + "...";
        } else {
          return '...';
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .card-info-item //这个是 文章每一项的样式
    margin-top: 12px
    padding: 8px
    position: relative
    .card-info-item-detail
      height: 180px
      .card-info-item-content
        font-size: 14px
        margin-bottom: 0
        color: #606266
        overflow: hidden
        text-overflow: ellipsis
        -webkit-box-orient: vertical
        display: -webkit-box
        -webkit-line-clamp: 2
      .card-info-item-bottom
        position: absolute
        color: #909399
        font-size: 13px
        bottom: 0px
        ul, li
          list-style: none
          display: inline
          margin: 0
          padding: 0
          li
            margin-right: 13px
            i
              margin-right: 3px
    .card-info-item-img-col
      overflow: hidden
      position: relative
      img
        position: relative
        float: left
        height: 180px
        width: 100%
        overflow: hidden

  @media screen and (max-width: 768px)
    .card-info-item
      .card-info-item-detail
        .card-info-item-bottom
          position: relative
          margin-top: 10px
          margin-bottom: 5px
          bottom: 0px
</style>
