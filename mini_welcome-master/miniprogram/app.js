//app.js
App({
  //全局数据
  globalData: {
    //用户ID
    userId: '',
    //用户信息
    userInfo: null,
    //openid
    openid:'',
    //授权状态
    auth: {
      'scope.userInfo': false
    },
    //登录状态
    logged: false
  },
  /**
   * 检查云开发环境并初始化
   */
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'wintest-9454e'
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  }
})