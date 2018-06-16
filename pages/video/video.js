//index.js
var app = getApp();


function jsonRequery(that, src) {
  wx.request({
    url: src,
    success: function (res) {
      for (var i = 0; i < res.data.result.length; i++) {

        res.data.result[i].datetime = app.FormatTime(res.data.result[i].datetime)

      }
      console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
      that.setData({
        items: res.data.result,
      })


    },
    fail: function (err) {
      console.log("Fail videoLoad api");

    },//请求失败
  })
}
Page({
  data: {
 
    video_classify_data_1: [],
    video_classify_data_2: [],
    video_classify_data_3: [],
    // 页面配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
  },


  
  
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://data.redname.com/video/classify?classify=1&page=0&size=20',
      success: function (res) {
        for (var i = 0; i < res.data.result.length; i++) {
          res.data.result[i].datetime = app.FormatTime(res.data.result[i].datetime)
        }
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          video_classify_data_1: res.data.result,
        })
      },
      fail: function (err) {
        console.log("Fail videoLoad api");

      },
    });
    wx.request({
      url: 'https://data.redname.com/video/classify?classify=2&page=0&size=20',
      success: function (res) {
        for (var i = 0; i < res.data.result.length; i++) {
          res.data.result[i].datetime = app.FormatTime(res.data.result[i].datetime)
        }
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          video_classify_data_2: res.data.result,
        })
      },
      fail: function (err) {
        console.log("Fail videoLoad api");

      },
    });
    wx.request({
      url: 'https://data.redname.com/video/classify?classify=3&page=0&size=20',
      success: function (res) {
        for (var i = 0; i < res.data.result.length; i++) {
          res.data.result[i].datetime = app.FormatTime(res.data.result[i].datetime)
        }
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          video_classify_data_3: res.data.result,
        })
      },
      fail: function (err) {
        console.log("Fail videoLoad api");

      },
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
        console.count("winWidth " + that.data.winWidth);
        console.count("winHeight "+that.data.winHeight);
      }
    });

  
  },
  // 滑动切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  // 点击tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }

})
