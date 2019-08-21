const cloud = require('wx-server-sdk')
const md5 = require('md5-node')

//cloud.init()
cloud.init({
  traceUser: true,
  env: 'wintest-9454e'
})
const db = cloud.database()
const usersTable = db.collection("users")
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //更新当前信息
  if (event.getSelf == true) {
    //获取当前用户信息
    try {
      return await usersTable.doc(md5(wxContext.OPENID)).field({
        _id: md5(wxContext.OPENID),
        openid: wxContext.OPENID,
      }).get()
    } catch (e) {
      console.error(e)
    }
  } else if (event.setSelf == true) {
    //添加当前用户信息
    try {
      return await usersTable.add({
        data: {
          _id: md5(wxContext.OPENID),
          openid: wxContext.OPENID,
          userData: event.userData
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }

}
