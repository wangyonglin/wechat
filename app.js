
//app.js
var login = require("login.js");
App({
  data: {
    currentCity: "ing...",
    servsers: "http://192.168.0.253:3000",
    userInfo: {},

  },
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    login.login();

  },
  globalData: {
  //  userInfo: {},
    phones: '18261779960',
  },

  location: function (callback) {

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {

        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=ozsMPb7mOZGVeRYtWqcZkHzUkvfvQ9Gk&location=' + res.latitude + ',' + res.longitude + '&output=json',
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res.data.result);
            try {
              wx.setStorageSync('GPS', res.data.result);
            } catch (e) {
              console.log("设置百度定位数据成功")
            }
            typeof callback == "function" && callback(res.data.result);   
          },
          fail: function () {
            console.log("读取百度定位数据失败")
          },

        })
      }
    })
  },
  calling: function (phone) {
    wx.makePhoneCall({
      phoneNumber: phone, //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },


  FormatTime: function (number) {
    var date = new Date(number);
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },
  service: function () {
    console.log("suo eventing...");
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //获取用户getinfo事件
  infoListener:function(e){
    console.count("infoListener:run...");
  }

})