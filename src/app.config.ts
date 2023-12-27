export default defineAppConfig({
  pages: [
      'pages/index/index', // 首页
      'pages/my/index', // 个人页面
      'pages/login/index', // 登录页面
      'pages/search/index', // 搜索页面
      'pages/myOrder/index', // 我的订单
      'pages/commodityDetails/index', // 商品详情
  ],
    tabBar:{
      list:[
          {
              pagePath:'pages/index/index',
              iconPath:'assets/image/png/home_active.png',
              selectedIconPath:'assets/image/png/home_active.png',
              text:'首页'
          },
          {
              pagePath:'pages/my/index',
              iconPath:'assets/image/png/home_active.png',
              selectedIconPath:'assets/image/png/home_active.png',
              text:'我的'
          },

      ]
    },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  }
})
