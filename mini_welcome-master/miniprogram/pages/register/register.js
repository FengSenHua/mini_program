const app = getApp();
Page({
  data: {
    //用户属性
    username: "",
    gender: "",
    birthday: "",
    phone: "",
    school: "",
    address: "",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker: ['男', '女'],
    multiIndex: [0, 0, 0],
    date: '2008-08-08',
    region: ['广东省', '广州市', '海珠区'],
    files: [],
    images_fileID: [],
    modalName: null
  },
  /**
   * 选择本地照片
   */
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.files.length != 0) {
          this.setData({
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            files: this.data.files.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            files: res.tempFilePaths
          })
        }
      }
    });
  },
  /**
   * 获取表单数据
   */
  getForm: function(e) {
    var that = this;
    var formdata = e.detail.value;
    var imageFiles = that.data.files;
    wx.cloud.init();
    const db = wx.cloud.database(); //初始化数据库
    //for循环进行图片上传
    for (var i = 0; i < imageFiles.length; i++) {
      var imageUrl = imageFiles[i].split("/");
      var name = imageUrl[imageUrl.length - 1]; //得到图片的名称
      var image_fileID = that.data.images_fileID //得到data中的images_fileID
      wx.cloud.uploadFile({
        cloudPath: "images/" + name, //云存储路径
        filePath: imageFiles[i],
        success: res => {
          image_fileID.push(res.fileID);
          that.setData({
            images_fileID: image_fileID//更新data中的fileID
          })
          if (image_fileID.length === imageFiles.length) {
            //对数据库进行操作
            db.collection("userInfo").add({
              data: {
                username: formdata.username,
                gender: formdata.gender,
                address: formdata.address,
                birthday: formdata.birthday,
                phone: formdata.phone,
                school: formdata.school,
                images:imageFiles,
                image_fileID:that.data.images_fileID
              },
              success:res=>{
                wx.navigateTo({
                  url: '/pages/start/start',
                })
                that.loadModal();
              },
              fail:res=>{
                console.log(res)
              }
            })
          }
        }
      })
    }
  },
  loadModal() {
    this.setData({
      loadModal: true
    })
    setTimeout(() => {
      this.setData({
        loadModal: false
      })
    }, 4000)
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      content: '确定要取消上传该照片吗？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  }
})