const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    checkButton:false,
    openid: '',
  },
  /**
   * 页面加载函数
   */
  attached() {
    this.setData({
      openid: app.globalData.openid
    })
    console.log("openid", this.data.openid)
   //切换到当前页面先执行该函数
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('userInfo').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        if (res.data.length != 0 && res.errMsg =="collection.get:ok"){
         this.setData({
           checkButton: true
         })
         console.log('[数据库] [查询记录] 成功: ', res)
       }else{
          this.setData({
            checkButton: false
          })
          console.log('[数据库] [查询记录] 失败: ', res)
       }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

  },
  methods: {
    register:function(){
      wx.navigateTo({
        url: '/pages/register/register',
      })
    }
  }
})