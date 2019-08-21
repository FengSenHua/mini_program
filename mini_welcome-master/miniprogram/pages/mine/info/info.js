const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    username:'',
    avatarUrl:'',
    school:'',
    images:[],
    phone:'',
    gender:'',
    birthday:'',
    address:[]
  },
  attached() {
    console.log("success")
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    wx.hideLoading()
    const db = wx.cloud.database()
    // 查询当前用户的 userInfo
    db.collection('userInfo').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log(res.data[0].image_fileID)
        this.setData({
          avatarUrl: app.globalData.userInfo.avatarUrl,
          username: res.data[0].username,
          school: res.data[0].school,
          images: res.data[0].image_fileID,
          phone: res.data[0].phone,
          gender: res.data[0].gender,
          birthday: res.data[0].birthday,
          address: res.data[0].address,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    // console.log("username:",this.data.username)
  },
  methods: {
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    ViewImage(e) {
      wx.previewImage({
        urls: this.data.images,
        current: e.currentTarget.dataset.url
      });
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
  }
})