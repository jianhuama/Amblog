const resolve = require('path').resolve
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Aimao',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
      {hid: 'description', name: 'description', content: 'AimaoBlog'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: '/backTop/material-scrolltop.css'}
    ],
    script: [
      {src: '/js/jquery-3.3.1.min.js'},
      {src: '/backTop/material-scrolltop.js'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['axios', 'element-ui']
  },
  css: [
    {
      src: 'element-ui/lib/theme-chalk/index.css',
      ssr: false
    },
    {
      src: './assets/iconfont/iconfont.css',
      ssr: true
    }
  ],
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/baidu', ssr: false }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    [
      '/api',
      {
        target: 'http://127.0.0.1:8080', // api主机
        pathRewrite: {'^/api': '/front'}
      }
    ]
  ],
  router: {
    middleware: 'dataInit',  //设置在每个路由切换你的时候执行这个中间件
    extendRoutes(routes) {
      routes.push({
          name: 'Index',
          path: '/index',
          component: resolve(__dirname, 'pages/index.vue')
        }
      );
    }
  }
}
