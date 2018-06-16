function RemoteInfo(encryptedData, iv, code) {
  wx.request({
    url: 'https://data.redname.com/wechat/user',
    method: 'POST',
    data: {
      encryptedData: encryptedData,
      iv: iv,
      code: code
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (e) {
      console.log("OPENID:" + e.data.userInfo.openId)
      try {
        wx.setStorageSync('userInfo', e.data)
      } catch (e) {
      }
    },
    fail: function () {
      console.log('get remove user info json fail')
    }
  })
}
function login(){
  wx.login({
    success: function (r) {
      console.log('登陆成功')
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          console.log('已授权')
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                console.log('获取头像昵称 成功')
                console.count("encryptedData:" + res.encryptedData)
                console.count("iv:" + res.iv)
                console.count("code:" + r.code)
                //3.解密用户信息 获取unionId
                RemoteInfo(res.encryptedData, res.iv, r.code);
              },
              fail: function () {
                console.log('未获取头像昵称')
              }
            });

          }
        },
        fail: function () {
          console.log('未授权')
        }
      })
    },
    fail: function (err) {
      console.log('登陆失败')
     // reject(err)
    }
  })
}
function relogin(){
  if (!wx.getStorageSync("userinfo")) {
    //是否登录
    console.log("请重新登陆")
  }
}
module.exports = {
  login: login,
  relogin: relogin,
}