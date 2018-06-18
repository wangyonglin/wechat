// pages/homeHtml/homeHtml.js
var wxm = require("../../template/menu/wxMenu.js");
var rc = require("../../utils/requestClassify.js");

var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    audioData: [],
    currentCity: '',
    progress: 100,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    videos: [],
    items_search: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TShirt:[],//T恤
    Sweater:[],//毛衣



  },
  search_navigateTo: function (e) {
    wx.navigateTo({
      url: '../searchBar/searchBar',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log("Fail search_navigateTo " + res);
      }
    })

    console.log("suo eventing...");

  },
  /**
   * 打开打电话功能
   */
  calling: function () {
    console.log("calling eventing...");
    app.calling(app.globalData.phones);

  },
  /**
   * 打开定位系统
   */
  locationButton: function () {
    wxm.location();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.location(function (res) {
      that.setData({ currentCity: res.addressComponent.city });
    });



    that.setData({
      audioData: wxm.audio_data,


    });
    
    that.UtilsAction(that);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  MusicPlayerEx: function (e) {
    wxm.MusicPlayer();
  },
  /**
   * 公告进度条
   */
  MusicStart: function (e) {
    var that = this;
    wxm.MusicStart(that, e);


  },
  UtilsAction:function(that){
    rc.RequestClassify("T恤", 0, 4, function (e) {
      console.log("RequestClassify:" + e);
      that.setData({
        TShirt: e.content
      });
    });

    rc.RequestClassify("毛衣", 0, 4, function (e) {
      console.log("RequestClassify:" + e);
      that.setData({
        Sweater: e.content
      });
    });
  },
  //下拉事件
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    that.UtilsAction(that);

      // 隐藏导航栏加载框  
      wx.hideNavigationBarLoading();
      // 停止下拉动作  
      wx.stopPullDownRefresh();
    
  },
  //获取头像事件
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      app.onLaunch();
    } else {
      //用户按了拒绝按钮
    }

  },
  btn:function(){
    wx.navigateTo({
      url: "../../pages/authorization/authorization",
    })
  }
})