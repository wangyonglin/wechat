// pages/mine/me/me.js
Page({
  /** 
   * 页面的初始数据 
   */
  data: {
    scrollTop: 20,
    srollHeight: 500, //随便给的一个初始高度
    jumpView:'wechat',
  },

  onLoad: function (options) {
    console.log("get pages:"+options.toView);
    let that = this;
    that.setData({
      toView: options.toView
    })
  },
  onShow:function(){
    console.log('onShowed')
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var height = res.windowHeight - footerpannelheight;   //footerpannelheight为底部组件的高度
        that.setData({
          srollHeight: height
        });
      }
    })
  }
}) 