var wxSearchApp = require("../../template/search/wxSearch.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items_search: [],
    text:'',
    numberOfElements:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      text:options.search
    });
    wxSearchApp.inputValues(that,options.search);
    wxSearchApp.wxSearch(that, function (result) {
      that.setData({
        items_search: result.content,
        numberOfElements: result.numberOfElements
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    wxSearchApp.wxSearch(that, function (result) {
      that.setData({
        items_search: result.content,
        numberOfElements: result.numberOfElements
      });
     
    });
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})