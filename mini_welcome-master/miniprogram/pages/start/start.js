const app = getApp();
Page({
  data: {
    PageCur: 'home',
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onLoad:function(){
    wx.cloud.callFunction({
      name: 'get_setmineInfo',
      data: {},
      success: res => {
        console.log('[云函数] [get_setmineInfo] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [get_setmineInfo] 调用失败', err)
      }
    })
  }
})