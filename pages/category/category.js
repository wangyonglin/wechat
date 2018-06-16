Page({
  data: {
    cateItems: [],
    curNav: 1,
    curIndex: 0
  },
  onLoad: function (option){
    let that = this;
    wx.showLoading({
      title: '加载数据。。。',
    })
    wx.request({
      url: 'https://data.redname.com/config/category',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res){ 
        wx.hideLoading();
        that.setData({
          cateItems:res.data
        });
        console.count("D:"+res.data);
      }
    })
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  }
})  