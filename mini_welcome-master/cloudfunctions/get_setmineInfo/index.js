// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()
cloud.init({
  traceUser: true,
  env: 'wintest-9454e'
})
const db = cloud.database()
const userInfo = db.collection("userInfo")
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}